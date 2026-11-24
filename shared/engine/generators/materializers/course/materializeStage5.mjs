import ts from 'typescript';
import { materializeCourse } from './materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from '../chapter/materialize.mjs';
import { materializeEpisode } from '../episode/materialize.mjs';
import { materializeLessonDraft } from './lessonDraft.mjs';
import { buildPlacementInventory } from './placementInventory.mjs';
import { deriveCourseEntityId } from './deriveCourseEntityId.mjs';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const sha = /^[0-9a-f]{40}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const sourceKinds = new Set(['typescript', 'markdown', 'specification', 'code']);
const safePath = value =>
  typeof value === 'string' &&
  !value.startsWith('/') &&
  !value.includes('\\') &&
  !value.split('/').some(p => !p || p === '.' || p === '..') &&
  !value.split('/').some(p => ['__proto__', 'prototype', 'constructor'].includes(p));
const serialize = value => {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  )
    return;
  if (Array.isArray(value)) {
    for (const item of value) serialize(item);
    return;
  }
  if (
    !record(value) ||
    Object.getOwnPropertySymbols(value).length ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(value)) ||
    Object.keys(value).some(key => ['__proto__', 'prototype', 'constructor'].includes(key))
  )
    throw new Error('Course override must be JSON-safe Config patch, not a Configurator or built Props');
  for (const child of Object.values(value)) serialize(child);
};
const canonical = value => {
  if (Array.isArray(value)) return value.map(canonical);
  if (record(value))
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, child]) => child !== undefined)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, canonical(child)]),
    );
  return value;
};
const equal = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));

/**
 * Plan reviewed Course Stage 5 authored sources. The atomic writer consumes
 * draft.ts and creates index.ts; exact reviewed bytes remain in Git history.
 * Planning never overwrites a file. Emitted TypeScript must satisfy current
 * contracts; unfinished resources use valid typed placeholders and explicit
 * TODO (BLOCKER) markers where applicable, not invalid source.
 *
 * The trusted caller must pin the evaluated TS input to the exact Git blob,
 * verify independent review/authorization, and resolve each imported Lesson
 * from its verified source revision. This planner never reads YAML or writes.
 *
 * @param {import('../../../types/workflow/courseWorkflow.types').CourseWorkflowMaterializerInput} input
 * @param {object} options
 */
export function materializeCourseStage5(input, options = {}) {
  if (
    !record(input?.config) ||
    input.config.type !== 'course' ||
    !record(input.production) ||
    !uuid.test(input.config.id ?? '') ||
    !slug.test(input.config.slug ?? '')
  )
    throw new Error('Expected canonical reviewed CourseWorkflowMaterializerInput');
  const rootId = input.config.id.toLowerCase();
  const sourceLanguage = input.production.languages?.document;
  const planned = input.production.languages?.planned;
  if (
    !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(sourceLanguage ?? '') ||
    !Array.isArray(planned) ||
    !planned.length ||
    !planned.includes(sourceLanguage) ||
    new Set(planned).size !== planned.length
  )
    throw new Error('Course Stage 5 requires reviewed production.languages');
  const methodology = input.production.methodology;
  if (
    !record(methodology) ||
    ['purpose', 'audience', 'approach', 'depth', 'accessibility', 'scope', 'entryConditions', 'sourceNotes'].some(
      key => typeof methodology[key] !== 'string' || !methodology[key].trim(),
    ) ||
    !record(input.production.outcomes) ||
    typeof input.production.outcomes.explanation !== 'string' ||
    !input.production.outcomes.explanation.trim() ||
    !record(input.production.prerequisites) ||
    typeof input.production.prerequisites.explanation !== 'string' ||
    !input.production.prerequisites.explanation.trim() ||
    !Array.isArray(input.production.standardsAlignment) ||
    !record(input.production.openDecisions) ||
    !record(input.config.content) ||
    !record(input.config.content.items) ||
    !Array.isArray(input.config.content.order)
  )
    throw new Error('Incomplete reviewed Course Stage 3 hierarchy or required methodology');
  for (const alignment of input.production.standardsAlignment) {
    if (
      !record(alignment) ||
      !uuid.test(alignment.standardId ?? '') ||
      !['intended', 'partial', 'verified'].includes(alignment.status) ||
      typeof alignment.evidence !== 'string' ||
      !alignment.evidence.trim()
    )
      throw new Error('Course standardsAlignment requires real UUID, status and evidence');
  }
  const textbookRoot = options.textbookRoot;
  if (typeof textbookRoot !== 'string' || !/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot))
    throw new Error('Stage 5 requires canonical content/<book> textbook root');
  const root = textbookRoot + '/data/courses/' + rootId.at(-1) + '/' + rootId;
  const expectedSource = root + '/draft.ts';
  const materializedPath = root + '/index.ts';
  const review = options.review;
  if (
    !record(review) ||
    review.sourcePath !== expectedSource ||
    !sha.test(review.sourceBlobSha ?? '') ||
    !sha.test(review.reviewCommitSha ?? '') ||
    review.reviewVerdict !== 'accepted'
  )
    throw new Error('Stage 5 requires verified source path, blob SHA, accepted verdict and review commit evidence');
  // Do not trust a TypeScript "satisfies" assertion as an authorization signal.
  if (
    typeof options.verifyReviewedSource !== 'function' ||
    options.verifyReviewedSource({ input, review, textbookRoot }) !== true
  )
    throw new Error('Stage 5 reviewed source/provenance was not independently authorized');
  const newIds = new Set([rootId]),
    knownExistingIds = new Set();
  const overrides = new Map();
  const patchImports = new Set();
  const diagnostics = [];
  const deriveId = (kind, directory) => {
    const relative = directory.replace(/^content\//, '');
    if (relative === directory || !relative) throw new Error('Unexpected Course child placement: ' + directory);
    const id = deriveCourseEntityId(rootId, kind, relative);
    if (newIds.has(id) || knownExistingIds.has(id))
      throw new Error('Duplicate/reserved generated UUID at ' + directory);
    newIds.add(id);
    return id;
  };
  const addPatch = (directory, patchSource) => {
    const relative = directory.replace(/^content\//, '');
    if (relative === directory || !relative) throw new Error('Invalid Course override placement');
    const parts = relative.split('/');
    if (parts.some(part => !slug.test(part) || ['constructor', '__proto__', 'prototype'].includes(part)))
      throw new Error('Unsafe Course patch placement');
    if (overrides.has(relative)) throw new Error('Duplicate Course patch placement: ' + relative);
    overrides.set(relative, { parts, patchSource });
  };
  const singleExpression = expression => {
    if (typeof expression !== 'string' || !expression.trim())
      throw new Error('Reviewed Course patch expression must be nonempty TypeScript');
    const ast = ts.createSourceFile(
      'reviewedPatch.ts',
      'const reviewedPatch = (' + expression + ');',
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    if (
      ast.parseDiagnostics.length ||
      ast.statements.length !== 1 ||
      !ts.isVariableStatement(ast.statements[0]) ||
      ast.statements[0].declarationList.declarations.length !== 1 ||
      !ast.statements[0].declarationList.declarations[0].initializer
    )
      throw new Error('Reviewed Course patch is not a single valid TypeScript expression');
    return expression;
  };
  const renderPatchTree = () => {
    const tree = { children: new Map() };
    for (const { parts, patchSource } of overrides.values()) {
      let node = tree;
      for (const part of parts) {
        if (node.source !== undefined) throw new Error('Course patch placement overlaps an existing ancestor');
        if (!node.children.has(part)) node.children.set(part, { children: new Map() });
        node = node.children.get(part);
      }
      if (node.source !== undefined || node.children.size)
        throw new Error('Course patch placement overlaps another patch');
      node.source = patchSource;
    }
    const emit = node =>
      node.source !== undefined
        ? node.source
        : '{ content: { items: { ' +
          [...node.children].map(([key, child]) => JSON.stringify(key) + ': ' + emit(child)).join(', ') +
          ' } } }';
    return emit(tree);
  };
  const renderedPlacements = new Map();
  const recordPlacement = (directory, row) => {
    if (renderedPlacements.has(directory)) throw Error('Duplicate Course inventory placement: ' + directory);
    renderedPlacements.set(directory, row);
  };
  const resolvePlacement = (node, context) => {
    const production = node.production;
    if (production.kind === 'new') {
      const lessonId = deriveId('lesson', context.directory);
      const result = materializeLessonDraft(node, {
        lessonId,
        languageContext: input.production.languages,
        textbookRoot,
        reviewedSourceSha: review.sourceBlobSha,
      });
      recordPlacement(context.directory, {
        type: 'lesson',
        id: lessonId,
        slug: node.config.slug,
        kind: 'new',
        status: 'pending-lesson-stage1',
        sourcePath: result.files[0].path,
        placementSourcePath: result.files[0].path,
      });
      return result;
    }
    const existing = production.existing;
    const match = production.matching;
    if (
      !record(existing) ||
      !uuid.test(existing.id ?? '') ||
      !record(match) ||
      !sha.test(match.sourceSha ?? '') ||
      typeof match.methodologySourcePath !== 'string' ||
      !match.methodologySourcePath.trim() ||
      typeof match.matchingRationale !== 'string' ||
      !match.matchingRationale.trim() ||
      typeof match.languageEvidence !== 'string' ||
      !match.languageEvidence.trim() ||
      typeof options.resolveExistingLesson !== 'function'
    )
      throw new Error(context.directory + ': verified existing Lesson matching and resolver required');
    const lesson = options.resolveExistingLesson({
      id: existing.id,
      matching: match,
      placement: context.directory,
      languages: [sourceLanguage],
    });
    if (
      !record(lesson) ||
      lesson.id !== existing.id ||
      lesson.sourceSha !== match.sourceSha ||
      !record(lesson.configurator) ||
      lesson.configurator.id !== existing.id ||
      lesson.configurator.type !== 'lesson' ||
      !record(lesson.configurator.config?.base) ||
      lesson.configurator.config.base.id !== existing.id ||
      lesson.configurator.config.base.type !== 'lesson' ||
      !Array.isArray(lesson.configurator.config.base.skills) ||
      node.config.skills.some(
        skill =>
          !lesson.configurator.config.base.skills.some(
            actual => typeof actual === 'string' && actual.toLowerCase() === skill.toLowerCase(),
          ),
      ) ||
      !lesson.configurator.config.base.params?.languages?.includes(sourceLanguage) ||
      typeof lesson.configurator.build?.props !== 'function' ||
      typeof lesson.configurator.build?.overrides !== 'function' ||
      typeof lesson.exportName !== 'string' ||
      !slug.test(lesson.exportName) ||
      typeof lesson.importPath !== 'string' ||
      lesson.importPath !==
        '#lessonsData/' + existing.id.at(-1).toLowerCase() + '/' + existing.id.toLowerCase() + '/index' ||
      !Array.isArray(lesson.languages) ||
      !lesson.languages.includes(sourceLanguage)
    )
      throw new Error(context.directory + ': imported Lesson identity, SHA, Build API or source locale not verified');
    if (knownExistingIds.has(existing.id)) {
      // Repeat placements are permitted in different parents; the immutable
      // Lesson source is never rewritten or reallocated.
    }
    knownExistingIds.add(existing.id);
    if (newIds.has(existing.id)) throw new Error('Course generated/imported UUID collision');
    const hasPatch = existing.base !== undefined || existing.locale !== undefined;
    if (hasPatch) {
      if (!record(lesson.rawPatch) || !production.overrideRationale?.trim())
        throw new Error(
          context.directory +
            ': built sparse override requires verified original raw Build expression and editorial rationale',
        );
      const patchLanguages = [...new Set([sourceLanguage, ...Object.keys(existing.locale ?? {})])];
      if (patchLanguages.some(code => !planned.includes(code) || !lesson.languages.includes(code)))
        throw new Error(context.directory + ': override languages require reviewed Course/Lesson support');
      let patchSource;
      if (lesson.rawPatchSource === undefined) {
        serialize(lesson.rawPatch);
        patchSource = JSON.stringify(lesson.rawPatch, null, 2);
      } else {
        if (lesson.rawPatchSourceSha !== review.sourceBlobSha)
          throw new Error(
            context.directory + ': raw patch TypeScript expression is not pinned to reviewed Course source',
          );
        patchSource = singleExpression(lesson.rawPatchSource);
        if (!Array.isArray(lesson.rawPatchImports))
          throw new Error(context.directory + ': explicit reviewed TypeScript imports required for patch expression');
        for (const item of lesson.rawPatchImports) {
          const parsed = ts.createSourceFile('reviewedImport.ts', item, ts.ScriptTarget.Latest, true);
          if (
            parsed.parseDiagnostics.length ||
            parsed.statements.length !== 1 ||
            !ts.isImportDeclaration(parsed.statements[0]) ||
            !parsed.statements[0].importClause ||
            !ts.isStringLiteral(parsed.statements[0].moduleSpecifier) ||
            !item.trim().endsWith(';')
          )
            throw new Error(context.directory + ': invalid or side-effect-only patch import declaration');
          const specifier = parsed.statements[0].moduleSpecifier.text;
          if (!(
            specifier.startsWith('#') ||
            specifier.startsWith('@svitlo/') ||
            (/^\.\/[A-Za-z][\w/.-]*$/.test(specifier) && !specifier.includes('..'))
          ))
            throw new Error(context.directory + ': raw patch import must use reviewed package aliases');
          patchImports.add(item.trim());
        }
      }
      let built;
      try {
        built = lesson.configurator.build.overrides(lesson.rawPatch, { languages: patchLanguages });
      } catch (error) {
        throw new Error(context.directory + ': raw Lesson patch is invalid against real Build API', { cause: error });
      }
      if (!equal({ id: built.id, base: built.base, locale: built.locale }, existing))
        throw new Error(context.directory + ': original raw patch does not reproduce reviewed built sparse override');
      if (record(existing.locale) && Object.keys(existing.locale).some(code => !planned.includes(code)))
        throw new Error(context.directory + ': Lesson override uses an unplanned locale');
      addPatch(context.directory, patchSource);
    }
    const placementSlug = node.config.slug;
    recordPlacement(context.directory, {
      type: 'lesson',
      id: existing.id,
      slug: placementSlug,
      kind: hasPatch ? 'overridden' : 'reused',
      status: 'verified-reference',
      sourcePath:
        textbookRoot +
        '/data/lessons/' +
        existing.id.at(-1).toLowerCase() +
        '/' +
        existing.id.toLowerCase() +
        '/index.ts',
      placementSourcePath: root + '/' + context.directory + '/index.ts',
      sourceSha: lesson.sourceSha,
    });
    const exportName = ['class', 'default', 'export', 'import', 'const', 'new', 'return', 'let', 'var'].includes(
      placementSlug,
    )
      ? 'config_' + placementSlug
      : placementSlug;
    return {
      id: existing.id,
      lessonId: existing.id,
      exportName,
      files: [
        {
          path: context.directory + '/index.ts',
          kind: 'typescript',
          content:
            'export { ' +
            lesson.exportName +
            ' as ' +
            exportName +
            ' } from ' +
            JSON.stringify(lesson.importPath) +
            ';\n',
        },
      ],
      diagnostics: [],
    };
  };

  const context = {
    directory: '',
    courseId: rootId,
    reviewedCourseSourceBlobSha: review.sourceBlobSha,
    orderPath: [],
    sourceLanguage,
    plannedLanguages: planned,
    deriveId,
    materializeModule,
    materializeChapter,
    materializeEpisode(node, episodeContext) {
      const result = materializeEpisode(node, episodeContext);
      const directory = episodeContext.directory;
      const pending = result.diagnostics.some(d => d.code === 'pending-episode-scenario');
      const source =
        result.files.find(file => file.path === directory + '/draft.ts') ??
        result.files.find(file => file.path === directory + '/index.ts');
      if (!source) throw Error('Episode inventory requires emitted source: ' + directory);
      recordPlacement(directory, {
        type: 'episode',
        id: result.id,
        slug: node.config.slug,
        kind: 'new',
        status: pending ? 'pending-episode-scenario' : 'materialized-source',
        sourcePath: root + '/' + source.path,
        placementSourcePath: root + '/' + source.path,
      });
      return result;
    },
    materializeLessonPlacement: resolvePlacement,
    materializeSection(node, sectionContext) {
      // Must be the SAME concrete Section dispatcher used by standalone Lessons.
      if (typeof options.materializeSection !== 'function')
        throw new Error(sectionContext.directory + ': real Section materializer required');
      return options.materializeSection(node, {
        ...sectionContext,
        documentLanguage: sourceLanguage,
        languagesImport: '#coursesData/' + rootId.at(-1) + '/' + rootId + '/languages',
      });
    },
  };
  const materialized = materializeCourse(input, context);
  const files = [
    ...materialized.files.map(file =>
      file.path.startsWith(textbookRoot + '/data/lessons/') ? file : { ...file, path: root + '/' + file.path },
    ),
  ];
  const rootIndex = files.find(file => file.path === materializedPath);
  if (!rootIndex || rootIndex.kind !== 'typescript')
    throw new Error('Course Stage 5 failed to emit the canonical root source');
  // The Course publisher discovers UUID-root index.ts automatically.
  // Persist a fail-closed marker IN the generated source; returning a transient
  // {publishable:false} flag alone cannot stop an unrelated publication job.
  rootIndex.content =
    '// TODO (BLOCKER): Course Stage 5 source is not publication approval. ' +
    'Verify independent Lesson, Episode, locale, assessment and source-review gates before release.\n' +
    '// Reviewed Course source blob: ' +
    review.sourceBlobSha +
    '\n' +
    '// Independent Stage 4 review commit: ' +
    review.reviewCommitSha +
    '\n' +
    rootIndex.content;
  const languageSource =
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
    'export const languages = ' +
    JSON.stringify([sourceLanguage]) +
    ' as const satisfies SupportedLanguages;\n';
  files.push({ path: root + '/languages.ts', kind: 'typescript', content: languageSource });
  if (overrides.size) {
    files.push({
      path: root + '/authoredCourseOverrides.ts',
      kind: 'typescript',
      content:
        '// Reviewed raw Config expressions; independently replayed through the real Lesson Build API.\n' +
        [...patchImports].sort().join('\n') +
        '\n' +
        'export const authoredCourseOverrides = ' +
        renderPatchTree() +
        ';\n',
    });
    const indexFile = files.find(file => file.path === materializedPath);
    if (!indexFile) throw new Error('Course root module not generated');
    indexFile.content += "\nexport { authoredCourseOverrides } from './authoredCourseOverrides';\n";
  }

  const paths = new Set([expectedSource]);
  for (const file of files) {
    if (
      !record(file) ||
      !sourceKinds.has(file.kind) ||
      !safePath(file.path) ||
      typeof file.content !== 'string' ||
      paths.has(file.path)
    )
      throw new Error('Stage 5 generated duplicate, unsafe, colliding or invalid file: ' + String(file?.path));
    paths.add(file.path);
  }
  const allDiagnostics = [...(materialized.diagnostics ?? []), ...diagnostics];
  if (Object.keys(input.production.openDecisions ?? {}).length)
    allDiagnostics.push({
      path: root,
      code: 'pending-methodology-decisions',
      severity: 'blocker',
      message: 'Reviewed Course still contains unresolved openDecisions',
    });
  if (planned.length > 1)
    allDiagnostics.push({
      path: root,
      code: 'pending-locales',
      severity: 'blocker',
      message: 'Planned locales do not establish translated or reviewed source',
    });
  allDiagnostics.push({
    path: root,
    code: 'requires-publication-gates',
    severity: 'blocker',
    message:
      'Source materialization does not authorize Course publication or bypass unresolved Lesson, Episode, Scene, locale, bank and review gates',
  });
  return Object.freeze({
    sourcePath: expectedSource,
    materializedPath,
    sourceBlobSha: review.sourceBlobSha,
    reviewCommitSha: review.reviewCommitSha,
    courseId: rootId,
    root,
    files: Object.freeze(files),
    diagnostics: Object.freeze(allDiagnostics),
    inventory: buildPlacementInventory(input, renderedPlacements, root, files),
    placements: materialized.placements ?? [],
    pendingPlacements: materialized.pendingPlacements ?? [],
    pendingEpisodes: materialized.pendingEpisodes ?? [],
    publishable: false,
  });
}
