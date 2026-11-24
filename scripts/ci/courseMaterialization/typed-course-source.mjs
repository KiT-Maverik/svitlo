#!/usr/bin/env node
/**
 * @fileoverview Read-only typed Course Stage 5 analyzer. Only trusted code runs:
 * the PR-authored TypeScript is parsed as a strictly inert Stage 3 object
 * literal; arbitrary expressions/imports are rejected, never evaluated.
 * This intentionally narrow first rollout cannot resolve executable Lesson
 * imports; those require an independently verified trusted resolver.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { gitBlob } from './course-gate.mjs';
import { parseTypedMetadata } from './typed-course-gate.mjs';
import { materializeCourseStage5 } from '../../../shared/engine/generators/materializers/course/materializeStage5.mjs';
import { materializeCourseEpisodeSection } from './typed-course-section.mjs';
import { createTrustedCourseLessonResolver } from './typed-course-lesson.mjs';
import { checkGeneratedCourseTypes } from './typed-course-semantics.mjs';

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const SHA = /^[0-9a-f]{40}$/;
const safePath = value =>
  typeof value === 'string' &&
  value.length < 300 &&
  !value.startsWith('/') &&
  !value.includes('\\') &&
  value
    .split('/')
    .every(
      part => !!part && part !== '.' && part !== '..' && !['__proto__', 'prototype', 'constructor'].includes(part),
    );
const sha256 = value => createHash('sha256').update(value).digest('hex');

function fail(node) {
  throw Error(
    'Non-literal or executable TypeScript is not accepted in trusted typed Course rollout (kind ' +
      ts.SyntaxKind[node.kind] +
      ')',
  );
}

/**
 * Decode reviewed Course AST without running candidate JavaScript. Value
 * imports are allowed ONLY for real, byte-verified trusted Lesson exports.
 * Their only executable operation is that trusted Configurator's real
 * build.overrides(rawPatch, {languages}) on inert literal arguments.
 */
export function decodeLiteral(node, declarations = new Map(), stack = new Set(), context = {}) {
  const next = child => decodeLiteral(child, declarations, stack, context);
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isTypeAssertionExpression(node)
  )
    return next(node.expression);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) {
    const number = Number(node.text);
    return Number.isFinite(number) ? number : fail(node);
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) {
    const value = next(node.operand);
    return typeof value === 'number' && Number.isFinite(value) ? -value : fail(node);
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(next);
  if (ts.isIdentifier(node)) {
    if (context.imports?.has(node.text)) return context.imports.get(node.text).configurator;
    if (!declarations.has(node.text) || stack.has(node.text)) return fail(node);
    return decodeLiteral(declarations.get(node.text), declarations, new Set([...stack, node.text]), context);
  }
  if (
    ts.isPropertyAccessExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.name.text === 'id' &&
    context.imports?.has(node.expression.text)
  )
    return context.imports.get(node.expression.text).configurator.id;
  if (ts.isCallExpression(node)) {
    const invoked = node.expression;
    const build = ts.isPropertyAccessExpression(invoked) && invoked.name.text === 'overrides' && invoked.expression;
    const imported =
      build && ts.isPropertyAccessExpression(build) && build.name.text === 'build' && ts.isIdentifier(build.expression)
        ? context.imports?.get(build.expression.text)
        : undefined;
    if (!imported || node.arguments.length !== 2) return fail(node);
    const rawPatch = next(node.arguments[0]);
    const selection = next(node.arguments[1]);
    if (
      !record(selection) ||
      Object.keys(selection).length !== 1 ||
      !Array.isArray(selection.languages) ||
      !selection.languages.length ||
      selection.languages.some(code => typeof code !== 'string') ||
      new Set(selection.languages).size !== selection.languages.length
    )
      throw Error('Trusted Lesson Build overrides require literal reviewed languages');
    const built = imported.configurator.build.overrides(rawPatch, selection);
    if (
      !record(built) ||
      built.id !== imported.configurator.id ||
      (built.base === undefined && built.locale === undefined)
    )
      throw Error('Trusted Lesson Build API returned invalid reviewed sparse patch');
    context.approvedBuilt?.add(built);
    context.patches?.push({
      lessonId: built.id,
      built,
      rawPatch,
      rawPatchSource: node.arguments[0].getText(context.ast),
      rawPatchImports: [imported.declaration],
    });
    return built;
  }
  if (!ts.isObjectLiteralExpression(node)) return fail(node);
  const object = Object.create(null);
  for (const property of node.properties) {
    if (ts.isSpreadAssignment(property)) {
      const value = next(property.expression);
      if (!record(value) || !context.approvedBuilt?.has(value))
        throw Error('Only a verified trusted Lesson Build result may be spread');
      for (const [key, child] of Object.entries(value)) {
        if (
          ['__proto__', 'prototype', 'constructor'].includes(key) ||
          (Object.hasOwn(object, key) && JSON.stringify(object[key]) !== JSON.stringify(child))
        )
          throw Error('Conflicting Course sparse override spread field: ' + key);
        object[key] = child;
      }
      continue;
    }
    if (!ts.isPropertyAssignment(property)) return fail(property);
    const key =
      ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)
        ? property.name.text
        : null;
    if (!key || ['__proto__', 'prototype', 'constructor'].includes(key) || Object.hasOwn(object, key))
      throw Error('Unsafe or duplicate typed Course key: ' + key);
    object[key] = next(property.initializer);
  }
  return object;
}

const materializerType = node => {
  while (ts.isAsExpression(node) || ts.isParenthesizedExpression(node) || ts.isTypeAssertionExpression(node))
    node = node.expression;
  return (
    ts.isSatisfiesExpression(node) &&
    ts.isTypeReferenceNode(node.type) &&
    node.type.typeName.getText() === 'CourseWorkflowMaterializerInput'
  );
};

/**
 * One reviewed Course Stage 3 object, explicitly satisfying the canonical
 * alias. Type-only imports and local aliases of inert objects are supported.
 * No JS import, call, function, dynamic property or side-effect statement.
 */
export function parseCanonicalCourseSource(source, options = {}) {
  if (typeof source !== 'string' || source.length > 2 * 1024 * 1024)
    throw Error('Typed Course source is missing or oversized');
  const ast = ts.createSourceFile('draft.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Typed Course source contains TypeScript parse errors');
  const declarations = new Map();
  const context = {
    ast,
    imports: new Map(),
    patches: [],
    approvedBuilt: new WeakSet(),
  };
  let reviewed;
  let reviewedExport;
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      if (!clause) return fail(statement);
      if (clause.isTypeOnly) {
        if (statement.moduleSpecifier.text !== '@svitlo/engine/build')
          throw Error('Only canonical Engine type imports are permitted');
        continue;
      }
      if (
        !clause.namedBindings ||
        !ts.isNamedImports(clause.namedBindings) ||
        clause.name ||
        statement.moduleSpecifier.text === '@svitlo/engine/build' ||
        typeof options.resolveImport !== 'function'
      )
        return fail(statement);
      for (const element of clause.namedBindings.elements) {
        if (element.isTypeOnly || !ts.isIdentifier(element.name)) return fail(statement);
        const name = element.propertyName?.text ?? element.name.text;
        const alias = element.name.text;
        if (context.imports.has(alias) || declarations.has(alias))
          throw Error('Duplicate Course Lesson import alias: ' + alias);
        const configurator = options.resolveImport(statement.moduleSpecifier.text, name);
        if (
          configurator?.type !== 'lesson' ||
          typeof configurator?.id !== 'string' ||
          typeof configurator?.build?.overrides !== 'function'
        )
          throw Error('Unverified trusted Lesson Configurator import');
        context.imports.set(alias, {
          configurator,
          declaration: statement.getText(ast),
        });
      }
      continue;
    }
    if (ts.isVariableStatement(statement) && (statement.declarationList.flags & ts.NodeFlags.Const) !== 0) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          !ts.isIdentifier(declaration.name) ||
          !declaration.initializer ||
          declarations.has(declaration.name.text) ||
          context.imports.has(declaration.name.text)
        )
          return fail(statement);
        declarations.set(declaration.name.text, declaration.initializer);
        if (materializerType(declaration.initializer)) {
          if (reviewed) throw Error('Ambiguous multiple CourseWorkflowMaterializerInput objects');
          reviewed = declaration.initializer;
          reviewedExport = statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
            ? declaration.name.text
            : null;
        }
      }
      continue;
    }
    if (
      ts.isExportDeclaration(statement) &&
      !statement.moduleSpecifier &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const element of statement.exportClause.elements) {
        const original = element.propertyName?.text || element.name.text;
        if (original !== reviewedExport && original !== 'reviewedInput' && original !== 'course')
          throw Error('Unexpected typed Course export');
        if (reviewed && original === 'reviewedInput' && declarations.has(original)) reviewedExport = original;
      }
      continue;
    }
    return fail(statement);
  }
  // Decode and reject all dormant expressions too, including unused consts.
  for (const declaration of declarations.values()) decodeLiteral(declaration, declarations, new Set(), context);
  if (!reviewed || !reviewedExport)
    throw Error('One exported CourseWorkflowMaterializerInput typed object is required');
  const result = decodeLiteral(reviewed, declarations, new Set(), context);
  if (!record(result?.config) || result.config.type !== 'course' || !record(result.production))
    throw Error('Reviewed literal is not a canonical Course Stage 3 object');
  // Duplicates arise when the exported object aliases earlier local constants.
  // They must describe the same trusted raw-patch operation and built result.
  if (options.patches) {
    const unique = new Map();
    for (const patch of context.patches) {
      const key = patch.lessonId + ':' + patch.rawPatchSource;
      const earlier = unique.get(key);
      if (earlier && JSON.stringify(earlier.built) !== JSON.stringify(patch.built))
        throw Error('Non-deterministic trusted Lesson Build result');
      unique.set(key, patch);
    }
    options.patches.push(...unique.values());
  }
  return result;
}

/** The original, raw sparse Build expression is never reconstructed from built Props. */
export function reviewedLessonPatchResolver(input, resolver, patches, sourceBlobSha) {
  if (typeof resolver !== 'function' || !Array.isArray(patches) || !SHA.test(sourceBlobSha))
    throw Error('Reviewed Lesson patch resolver requires trusted inputs');
  return argument => {
    const verified = resolver(argument);
    const segments = argument.placement.split('/').filter(key => key && key !== 'content');
    let current = input;
    for (const key of segments) {
      current = (current?.config ?? current)?.content?.items?.[key];
      if (!current) throw Error('Missing reviewed Course Lesson placement ' + argument.placement);
    }
    const existing = current.production?.existing;
    if (!existing || existing.id !== argument.id)
      throw Error('Existing Lesson matching not found in canonical Course Stage 3 source');
    if (existing.base === undefined && existing.locale === undefined) return verified;
    const matches = patches.filter(
      patch => patch.lessonId === argument.id && JSON.stringify(patch.built) === JSON.stringify(existing),
    );
    if (matches.length !== 1)
      throw Error('Course local override requires one verified original raw Lesson Build expression');
    const patch = matches[0];
    return {
      ...verified,
      rawPatch: patch.rawPatch,
      rawPatchSource: patch.rawPatchSource,
      rawPatchSourceSha: sourceBlobSha,
      rawPatchImports: patch.rawPatchImports,
    };
  };
}

/**
 * A TypeScript \`satisfies\` assertion is not itself sufficient: compile the
 * literal Stage 3 source against the trusted Engine Build contract, not the
 * potentially modified Engine version in the untrusted PR checkout.
 * Compilation is read-only and never emits/executes candidate JavaScript.
 */
export function checkCourseStage3Types(sourcePath) {
  const engineRoot = path.resolve(import.meta.dirname, '../../../shared/engine');
  const trustedRepoRoot = path.resolve(engineRoot, '../..');
  const scoped = sourcePath
    .replaceAll('\\', '/')
    .match(/\/content\/([a-z][a-z0-9-]*)\/data\/courses\/[0-9a-f]\/[0-9a-f-]{36}\/draft\.ts$/);
  if (!scoped) throw Error('Noncanonical Course source path for trusted TypeScript analysis');
  const tsconfig = ts.readConfigFile(path.join(engineRoot, 'tsconfig.json'), ts.sys.readFile);
  if (tsconfig.error) throw Error('Cannot load trusted Engine TS contract');
  const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, engineRoot);
  if (parsed.errors.length) throw Error('Invalid trusted Engine TS config');
  const options = {
    ...parsed.options,
    noEmit: true,
    incremental: false,
    composite: false,
    baseUrl: engineRoot,
    paths: {
      ...parsed.options.paths,
      '@svitlo/engine/build': ['build.ts'],
      '@svitlo/engine/runtime': ['runtime.ts'],
      '#lessonsData/*': [path.join(trustedRepoRoot, 'content', scoped[1], 'data/lessons/*')],
    },
  };
  const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([sourcePath], options));
  if (diagnostics.length) {
    const first = diagnostics[0];
    throw Error(
      'Reviewed Course Stage 3 does not typecheck against trusted Engine (' +
        'TS' +
        first.code +
        '): ' +
        ts.flattenDiagnosticMessageText(first.messageText, ' '),
    );
  }
}

/** Verify candidate is an exact clean and non-symlinked Git checkout. */
export function checkedSource(meta, checkout) {
  const root = fs.realpathSync(checkout);
  if (!fs.statSync(root).isDirectory() || !fs.existsSync(path.join(root, '.git')))
    throw Error('Required pinned candidate Git checkout is missing');
  const command = (...args) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    }).trim();
  if (command('rev-parse', 'HEAD') !== meta.head) throw Error('PR HEAD no longer matches the pinned Course review');
  if (command('status', '--porcelain=v1', '--untracked-files=all'))
    throw Error('Candidate data checkout must be clean before typed analysis');
  if (!safePath(meta.sourcePath) || !meta.sourcePath.startsWith(meta.textbookRoot + '/data/courses/'))
    throw Error('Noncanonical source path');
  const entries = command('ls-files', '-s', '--', meta.sourcePath).split('\n').filter(Boolean);
  if (entries.length !== 1 || !entries[0].startsWith('100644 '))
    throw Error('Reviewed source must be one ordinary tracked Git file');
  const filename = path.join(root, meta.sourcePath);
  if (!fs.existsSync(filename) || !fs.statSync(filename).isFile() || fs.lstatSync(filename).isSymbolicLink())
    throw Error('Reviewed source is absent or a symlink');
  let parent = path.dirname(filename);
  while (parent !== root) {
    if (fs.lstatSync(parent).isSymbolicLink()) throw Error('Symlink in Course source parent directories');
    parent = path.dirname(parent);
  }
  const source = fs.readFileSync(filename);
  if (gitBlob(source) !== meta.sourceBlobSha) throw Error('Course source Git blob differs from reviewed SHA');
  return { root, source: source.toString('utf8') };
}

/** Every file has an exact SHA256 and the manifest has no write capability. */
export function buildTypedCourseManifest(meta, plan) {
  if (
    !plan ||
    plan.sourcePath !== meta.sourcePath ||
    plan.sourceBlobSha !== meta.sourceBlobSha ||
    plan.courseId !== meta.courseId ||
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    !plan.files.length ||
    plan.files.length > 1500
  )
    throw Error('Invalid source-preserving typed Course Stage 5 plan');
  const entries = [];
  const seen = new Set();
  let size = 0;
  for (const file of plan.files) {
    if (
      !safePath(file.path) ||
      seen.has(file.path) ||
      typeof file.content !== 'string' ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind)
    )
      throw Error('Invalid or duplicate Course source plan file');
    seen.add(file.path);
    const bytes = Buffer.from(file.content, 'utf8');
    size += bytes.length;
    if (size > 32 * 1024 * 1024) throw Error('Typed Course plan exceeds 32 MiB');
    if (file.kind === 'typescript') {
      const ast = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      if (ast.parseDiagnostics.length) throw Error('Generated Course TypeScript has parse errors: ' + file.path);
    }
    entries.push({ path: file.path, kind: file.kind, sha256: sha256(bytes), data: bytes.toString('base64') });
  }
  if (
    seen.has(meta.sourcePath) ||
    !seen.has(plan.materializedPath) ||
    plan.materializedPath !== path.posix.dirname(meta.sourcePath) + '/index.ts'
  )
    throw Error('Course draft/output transition is missing');
  return {
    version: 2,
    operation: 'typed-course-stage5',
    repo: meta.repo,
    number: meta.number,
    head: meta.head,
    branch: meta.branch,
    actor: meta.actor,
    courseId: meta.courseId,
    textbookRoot: meta.textbookRoot,
    sourcePath: meta.sourcePath,
    sourceBlobSha: meta.sourceBlobSha,
    materializedPath: plan.materializedPath,
    publishable: false,
    diagnostics: plan.diagnostics,
    inventory: plan.inventory,
    pendingEpisodes: plan.pendingEpisodes,
    pendingPlacements: plan.pendingPlacements,
    entries: entries.sort((a, b) => a.path.localeCompare(b.path)),
  };
}

async function main() {
  if (process.argv[2] !== 'analyze' || process.argv.length !== 3) throw Error('Usage: typed-course-source.mjs analyze');
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN)
    throw Error('Untrusted Course data analysis must not receive a GitHub token');
  const meta = parseTypedMetadata(process.env.COURSE_TYPED_META_B64);
  const { source } = checkedSource(meta, process.env.COURSE_HEAD_ROOT);
  const resolver = createTrustedCourseLessonResolver({
    trustedRoot: path.resolve(import.meta.dirname, '../../..'),
    candidateRoot: process.env.COURSE_HEAD_ROOT,
    textbookRoot: meta.textbookRoot,
  });
  const patches = [];
  const input = parseCanonicalCourseSource(source, {
    resolveImport: resolver.loadImport,
    patches,
  });
  checkCourseStage3Types(path.join(process.env.COURSE_HEAD_ROOT, meta.sourcePath));
  const plan = materializeCourseStage5(input, {
    textbookRoot: meta.textbookRoot,
    source: {
      sourcePath: meta.sourcePath,
      sourceBlobSha: meta.sourceBlobSha,
    },
    verifySource: ({ input: candidate, source, textbookRoot }) =>
      candidate === input &&
      source.sourceBlobSha === meta.sourceBlobSha &&
      textbookRoot === meta.textbookRoot,
    // Existing-Lesson references are not executable/verified literals.
    // Stage 5 refuses them instead of fabricating Build API or import evidence.
    materializeSection: materializeCourseEpisodeSection,
    resolveExistingLesson: reviewedLessonPatchResolver(input, resolver, patches, meta.sourceBlobSha),
  });
  checkGeneratedCourseTypes(plan, meta.textbookRoot);
  const manifest = buildTypedCourseManifest(meta, plan);
  const output = process.env.COURSE_TYPED_REPORT;
  if (!output) throw Error('COURSE_TYPED_REPORT is required');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(manifest));
  console.log(
    'Read-only Course Stage 5 manifest: ' +
      manifest.entries.length +
      ' source files, ' +
      meta.sourceBlobSha +
      ', publication blocked',
  );
}

if (process.argv[1]?.endsWith('/typed-course-source.mjs')) {
  main().catch(error => {
    console.error('Typed Course analysis rejected:', error.message);
    process.exitCode = 1;
  });
}
