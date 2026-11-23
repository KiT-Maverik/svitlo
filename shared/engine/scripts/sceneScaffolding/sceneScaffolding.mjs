#!/usr/bin/env node
/**
 * @fileoverview Opt-in React Scene draft scaffolder.
 *
 * Reads only completed, materialized typed Lesson source modules and colocated
 * reviewed Scene specification.md files. It never imports candidate TypeScript,
 * mutates Lesson sources, validates/publishes Props or registers unfinished
 * React components. Lesson Stage 6.1 emits defineScene Config sources;
 * this Stage 6.3 helper emits optional executable Scene drafts.
 *
 * An existing Scene UUID directory is always SKIP (no merge/no overwrite).
 * Every newly created TS/TSX module parses, but unfinished components and
 * Storybook locale fixtures deliberately retain unresolved TypeScript names.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const repoRoot = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;

function noSymlinks(location) {
  let current = path.parse(path.resolve(location)).root;
  for (const part of path.resolve(location).slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Refusing symlink: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

/** Only the exact canonical, materialized Lesson root is a supported input. */
function resolveSource(source, repo) {
  if (typeof source !== 'string' || !source) throw new Error('Explicit Lesson source required');
  const location = path.resolve(repo, source);
  noSymlinks(location);
  const stat = fs.statSync(location);
  const root = stat.isDirectory() ? location : path.dirname(location);
  if (!stat.isDirectory() && (path.basename(location) !== 'index.ts' || !stat.isFile()))
    throw new Error('Expected the materialized Lesson index.ts or its directory');
  const relative = path.relative(repo, root).split(path.sep).join('/');
  const match = /^content\/((?:languages\/)?[a-z][a-z0-9-]*)\/data\/lessons\/([0-9a-f])\/([0-9a-f-]{36})$/.exec(
    relative,
  );
  if (!match || !uuid.test(match[3]) || match[2] !== match[3].at(-1))
    throw new Error('Lesson source must be in its canonical content/<book>/data/lessons/<bucket>/<UUID> directory');
  const bookRoot = path.join(repo, 'content', match[1]);
  for (const name of ['index.ts', 'workflow.stage2.ts', 'languages.ts']) {
    const filename = path.join(root, name);
    noSymlinks(filename);
    if (!fs.statSync(filename).isFile()) throw new Error('Missing materialized Lesson ' + name);
  }
  return { lessonRoot: root, bookRoot };
}

function parseSource(file) {
  noSymlinks(file);
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (source.parseDiagnostics.length) throw new Error('Invalid materialized TypeScript: ' + file);
  return source;
}

function unwrap(expression) {
  while (
    expression &&
    (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression) || ts.isParenthesizedExpression(expression))
  )
    expression = expression.expression;
  return expression;
}
function property(object, name) {
  if (!ts.isObjectLiteralExpression(object)) return undefined;
  const match = object.properties.filter(
    entry =>
      ts.isPropertyAssignment(entry) &&
      (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) &&
      entry.name.text === name,
  );
  if (match.length !== 1) return undefined;
  return unwrap(match[0].initializer);
}
function literal(expression) {
  return expression && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression))
    ? expression.text
    : undefined;
}
function sourceLanguage(lessonRoot) {
  const source = parseSource(path.join(lessonRoot, 'languages.ts'));
  const declarations = source.statements
    .filter(ts.isVariableStatement)
    .flatMap(entry => [...entry.declarationList.declarations])
    .filter(entry => ts.isIdentifier(entry.name) && entry.name.text === 'languages');
  const values = declarations.length === 1 ? unwrap(declarations[0].initializer) : undefined;
  if (!values || !ts.isArrayLiteralExpression(values) || values.elements.length !== 1)
    throw new Error('Scene scaffolding requires a single reviewed source language');
  const code = literal(values.elements[0]);
  if (!code || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(code))
    throw new Error('Invalid reviewed source language in Lesson languages.ts');
  return code;
}
/**
 * An executable Scene requires an actual textbook Scene registry and TSX
 * workspace support. Never silently introduce app-level dependencies.
 */
function assertSceneWorkspace(bookRoot) {
  noSymlinks(bookRoot);
  const manifest = JSON.parse(fs.readFileSync(path.join(bookRoot, 'package.json'), 'utf8'));
  const tsconfig = JSON.parse(fs.readFileSync(path.join(bookRoot, 'tsconfig.json'), 'utf8'));
  const includes = tsconfig.include ?? [];
  const covers = ext =>
    includes.some(
      value =>
        value === 'scenes/**/*' ||
        value === 'scenes/**' ||
        value === 'scenes/**/*.{' + (ext === 'ts' ? 'ts,tsx' : 'tsx,ts') + '}' ||
        value === 'scenes/**/*.' + ext,
    );
  if (
    !manifest.exports?.['./scenes'] ||
    !manifest.scripts?.['content:generate:scenes'] ||
    !fs.existsSync(path.join(bookRoot, 'scenes/createSceneRegistry.ts')) ||
    !fs.existsSync(path.join(bookRoot, 'scenes/sceneLoader.ts')) ||
    !covers('ts') ||
    !covers('tsx') ||
    !(manifest.dependencies?.react || manifest.devDependencies?.react) ||
    !(manifest.dependencies?.['@svitlo/engine'] || manifest.devDependencies?.['@svitlo/engine']) ||
    !(manifest.dependencies?.['@svitlo/ui-kit'] || manifest.devDependencies?.['@svitlo/ui-kit']) ||
    !(manifest.devDependencies?.vitest || manifest.dependencies?.vitest)
  ) {
    throw new Error(
      'Textbook is not Scene-ready: requires ./scenes export, registry/generator, ' +
        'TS/TSX tsconfig inclusion, React, Engine, UI Kit, and Vitest: ' +
        bookRoot,
    );
  }
}

/** PascalCase executable name; existing lowerCamelCase Config slugs remain usable. */
export function sceneComponentName(authoredSlug) {
  if (typeof authoredSlug !== 'string' || !slug.test(authoredSlug))
    throw new Error('Unsafe Scene slug (expected PascalCase or legacy lowerCamelCase): ' + String(authoredSlug));
  return authoredSlug[0].toUpperCase() + authoredSlug.slice(1);
}

/** Keep Configurator and executable component symbols distinct at the handoff. */
export function sceneSymbols(authoredSlug) {
  const component = sceneComponentName(authoredSlug);
  return { component, configurator: component + 'Config' };
}

/**
 * Discover actual defineScene Config source in the materialized Lesson tree.
 * It is parsed as inert TypeScript, never evaluated or imported.
 * Scene specifications are the colocated Stage 6.1 reviewed handoff.
 */
function readScenes(lessonRoot) {
  const documentLanguage = sourceLanguage(lessonRoot);
  const sections = path.join(lessonRoot, 'sections');
  noSymlinks(sections);
  if (!fs.statSync(sections).isDirectory()) throw new Error('Materialized Lesson Sections are missing');
  const scenes = [];
  let visited = 0;
  function walk(folder, depth = 0) {
    if (++visited > 1024 || depth > 20) throw new Error('Scene source tree exceeds safe discovery limits');
    noSymlinks(folder);
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const full = path.join(folder, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Refusing symlink: ' + full);
      if (entry.isDirectory()) {
        walk(full, depth + 1);
      } else if (entry.isFile() && entry.name === 'index.ts') {
        const ast = parseSource(full);
        const declarations = ast.statements
          .filter(ts.isVariableStatement)
          .flatMap(statement => [...statement.declarationList.declarations]);
        for (const declaration of declarations) {
          const call = unwrap(declaration.initializer);
          if (
            !call ||
            !ts.isCallExpression(call) ||
            !ts.isIdentifier(call.expression) ||
            call.expression.text !== 'defineScene'
          )
            continue;
          const config = unwrap(call.arguments[0]);
          const id = property(config, 'id');
          const slugValue = property(config, 'slug');
          const kind = property(config, 'type');
          if (literal(kind) !== 'scene' || !uuid.test(literal(id) ?? ''))
            throw new Error('Invalid Scene UUID/type in ' + full);
          const authoredSlug = literal(slugValue);
          const symbols = sceneSymbols(authoredSlug);
          const specPath = path.join(folder, 'specification.md');
          noSymlinks(specPath);
          const specification = fs.existsSync(specPath) ? fs.readFileSync(specPath, 'utf8') : undefined;
          scenes.push({ id: literal(id), slug: authoredSlug, ...symbols, specification, documentLanguage });
        }
      }
    }
  }
  walk(sections);
  const ids = new Set();
  const names = new Set();
  for (const scene of scenes) {
    if (ids.has(scene.id)) throw new Error('Duplicate Scene UUID: ' + scene.id);
    if (names.has(scene.component)) throw new Error('Colliding Scene component name: ' + scene.component);
    ids.add(scene.id);
    names.add(scene.component);
  }
  return scenes.sort((left, right) => left.id.localeCompare(right.id));
}

/**
 * Pure template rendering: no fabricated learning content, translations,
 * accessible labels, or test outcomes. The source specification is verbatim
 * apart from a single normalized final newline, as in Lesson Builder.
 */
export function renderSceneFiles(scene) {
  const { id, component: name, documentLanguage, specification } = scene;
  if (typeof specification !== 'string' || !specification.trim())
    throw new Error('Scene ' + id + ' needs production.specification; refusing to invent it');
  const rootTestId = 'scene-' + id;
  const files = new Map();
  files.set('specification.md', specification.trimEnd() + '\n');
  files.set('index.ts', 'export { ' + name + " as default } from './" + name + "';\n");
  files.set(
    name + '.constants.ts',
    ['export const testIds = {', '  root: ' + JSON.stringify(rootTestId) + ',', '} as const;', ''].join('\n'),
  );
  files.set(name + '.module.css', ['.root {', '  inline-size: 100%;', '  min-inline-size: 0;', '}', ''].join('\n'));
  files.set(
    name + '.tsx',
    [
      "'use client';",
      '',
      "import type { ContentBlock_Scene_Props } from '@svitlo/engine/runtime';",
      "import { testIds } from './" + name + ".constants';",
      "import styles from './" + name + ".module.css';",
      '',
      'export type ' + name + 'Props = {',
      "  locales: ContentBlock_Scene_Props['locale']['value'];",
      '};',
      '',
      'export function ' + name + '({ locales }: ' + name + 'Props) {',
      '  void locales;',
      '  // TODO(scene): implement the approved Scene specification and its accessible,',
      '  // source-language (' + documentLanguage + ') interactions before building this textbook.',
      '  // The unresolved identifier deliberately prevents an incomplete Scene from typechecking.',
      '  return <section className={styles.root} data-testid={testIds.root}>{sceneImplementationRequired}</section>;',
      '}',
      '',
    ].join('\n'),
  );
  files.set(
    name + '.stories.tsx',
    [
      "import type { ComponentProps } from 'react';",
      'import { ' + name + " } from './" + name + "';",
      '',
      'export default { title: ' + JSON.stringify('Scenes/' + name) + ', component: ' + name + ' };',
      '',
      'export const SourceLanguage = {',
      '  args: {',
      '    // TODO(i18n): use a verified ' + documentLanguage + ' fixture from the Lesson source, not invented copy.',
      '    locales: sceneSourceLocaleRequired,',
      '  },',
      '} satisfies { args: ComponentProps<typeof ' + name + '> };',
      '',
    ].join('\n'),
  );
  files.set(
    name + '.spec.tsx',
    [
      "import { describe, it } from 'vitest';",
      '',
      "describe('" + name + "', () => {",
      "  it.todo('implements the approved Scene interactions and state transitions');",
      "  it.todo('provides source-locale accessibility and keyboard/touch parity');",
      '});',
      '',
    ].join('\n'),
  );
  return files;
}

/**
 * Creation-only. check mode verifies handoff file presence, not byte identity:
 * implementation/stories/specification become human-owned after creation.
 */
export function runOne(source, mode = 'check', repo = repoRoot, selectedSceneId) {
  if (!['generate', 'check'].includes(mode)) throw new Error('Mode must be generate or check');
  const { lessonRoot, bookRoot } = resolveSource(source, repo);
  assertSceneWorkspace(bookRoot);
  if (selectedSceneId !== undefined && !uuid.test(selectedSceneId))
    throw new Error('Expected --scene-id to be a canonical Scene UUID');
  const all = readScenes(lessonRoot);
  const scenes = selectedSceneId === undefined ? all : all.filter(x => x.id === selectedSceneId);
  if (selectedSceneId && !scenes.length)
    throw new Error('Scene UUID is not present in this Lesson: ' + selectedSceneId);
  const plans = [];
  const results = [];
  // Validate all pending scenes before the first write.
  for (const scene of scenes) {
    const directory = path.join(bookRoot, 'scenes', scene.id.at(-1), scene.id);
    noSymlinks(directory);
    if (mode === 'generate' && fs.existsSync(directory)) {
      results.push({ id: scene.id, changed: 0, skipped: true });
      continue;
    }
    const files = renderSceneFiles(scene);
    for (const filename of files.keys()) noSymlinks(path.join(directory, filename));
    if (mode === 'check') {
      for (const filename of files.keys()) {
        const target = path.join(directory, filename);
        if (!fs.existsSync(target) || !fs.statSync(target).isFile())
          throw new Error('Missing Scene scaffold file: ' + target);
      }
      results.push({ id: scene.id, changed: 0, skipped: false });
    } else {
      plans.push({ scene, directory, files });
    }
  }
  if (mode === 'generate') {
    // One Scene is the atomic unit: prepare all files in a sibling directory,
    // then install it with one rename. Incomplete writes never create a
    // partially populated final UUID directory.
    for (const { scene, directory, files } of plans) {
      const parent = path.dirname(directory);
      fs.mkdirSync(parent, { recursive: true });
      noSymlinks(parent);
      const lease = path.join(parent, '.' + scene.id + '.lock');
      // Exclusive creation serializes competing scaffolders for this UUID.
      // A stale lease is an explicit failure, not permission to clobber.
      const handle = fs.openSync(lease, 'wx');
      let staged;
      try {
        if (fs.existsSync(directory)) {
          results.push({ id: scene.id, changed: 0, skipped: true });
          continue;
        }
        staged = fs.mkdtempSync(path.join(parent, '.' + scene.id + '.stage-'));
        for (const [filename, content] of files) fs.writeFileSync(path.join(staged, filename), content, { flag: 'wx' });
        // Recheck after staging; another writer may have created this
        // directory without participating in the Scene lease protocol.
        noSymlinks(directory);
        if (fs.existsSync(directory)) {
          results.push({ id: scene.id, changed: 0, skipped: true });
          continue;
        }
        fs.renameSync(staged, directory);
        staged = undefined;
        results.push({ id: scene.id, changed: files.size, skipped: false });
      } finally {
        if (staged !== undefined) fs.rmSync(staged, { recursive: true, force: true });
        fs.closeSync(handle);
        fs.unlinkSync(lease);
      }
    }
  }
  return results.sort((a, b) => a.id.localeCompare(b.id));
}

export function main(args = process.argv.slice(2), repo = repoRoot) {
  const [mode, ...rest] = args;
  if (!['generate', 'check'].includes(mode)) throw new Error('Expected generate|check');
  let source;
  let selectedSceneId;
  for (let i = 0; i < rest.length; i += 2) {
    if (rest[i] === '--source' && rest[i + 1] && source === undefined) source = rest[i + 1];
    else if (rest[i] === '--scene-id' && rest[i + 1] && selectedSceneId === undefined) selectedSceneId = rest[i + 1];
    else
      throw new Error(
        'Usage: sceneScaffolding.mjs generate|check --source content/<book>/data/lessons/<bucket>/<UUID>/index.ts [--scene-id UUID]',
      );
  }
  if (!source) throw new Error('Scene scaffolding needs an explicit --source materialized Lesson index.ts');
  const results = runOne(source, mode, repo, selectedSceneId);
  for (const result of results)
    console.log(
      result.skipped
        ? 'SKIP Scene ' + result.id + ': existing UUID directory; no files modified'
        : 'Scene ' +
            result.id +
            ': ' +
            (mode === 'check' ? 'scaffold files present' : result.changed + ' files written'),
    );
  console.log('Processed ' + results.length + ' Scene(s); registry not modified');
  return results;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
