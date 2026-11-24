import { materializeCourse } from './materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from '../chapter/materialize.mjs';
import { materializeEpisode } from '../episode/materialize.mjs';
import { materializeLessonDraft } from './lessonDraft.mjs';
import { buildPlacementInventory } from './placementInventory.mjs';
import { deriveCourseEntityId } from './deriveCourseEntityId.mjs';
import { materializeAssessmentPlaceholder } from './materializeAssessmentPlaceholder.mjs';

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
 * @param {import('../../../types/workflow/courseWorkflow.types').CourseWorkflowStage3} input
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
    throw new Error('Expected canonical reviewed CourseWorkflowStage3');
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
  const source = options.source;
  if (!record(source) || source.sourcePath !== expectedSource || !sha.test(source.sourceBlobSha ?? ''))
    throw new Error('Stage 5 requires verified source path and blob SHA');
  // Do not trust a TypeScript "satisfies" assertion as an authorization signal.
  if (typeof options.verifySource !== 'function' || options.verifySource({ input, source, textbookRoot }) !== true)
    throw new Error('Stage 5 source was not independently verified');
  const newIds = new Set([rootId]),
    knownExistingIds = new Set();
  const diagnostics = [];
  const parentIndex = directory => {
    const parts = directory.split('/');
    const parent = (parts.at(-2) === 'content' ? parts.slice(0, -2) : parts.slice(0, -1)).join('/');
    return root + '/' + (parent ? parent + '/' : '') + 'index.ts';
  };
  const deriveId = (kind, directory) => {
    const relative = directory.replace(/^content\//, '');
    if (relative === directory || !relative) throw new Error('Unexpected Course child placement: ' + directory);
    const id = deriveCourseEntityId(rootId, kind, relative);
    if (newIds.has(id) || knownExistingIds.has(id))
      throw new Error('Duplicate/reserved generated UUID at ' + directory);
    newIds.add(id);
    return id;
  };
  /** Validate real upstream Lesson slots in reviewed Course traversal order.
   * Cross-Module/Chapter references work by actual placement path; a reused
   * Lesson UUID must be unique so a repeated placement is unambiguous.
   * This is production-only readiness, never runtime learner progression.
   */
  const resolvedAssessments = new Map();
  {
    const previousLessons = new Map();
    const priorById = new Map();
    function inspect(owner, parent) {
      for (const key of owner.config.content.order) {
        const child = owner.config.content.items[key];
        const kind = child?.config?.type;
        const path = parent ? parent + (kind === 'assessment' ? '/content/' : '/') + key : 'content/' + key;
        if (kind === 'module' || kind === 'chapter') {
          inspect(child, path);
        } else if (kind === 'lesson') {
          previousLessons.set(path, { path, id: child.production?.existing?.id });
          const id = child.production?.existing?.id;
          if (id) priorById.set(id, [...(priorById.get(id) ?? []), path]);
        } else if (kind === 'assessment') {
          const deps = child.production?.lessonDependencies;
          if (!Array.isArray(deps) || !deps.length)
            throw Error(path + ': Assessment requires upstream Lesson dependencies');
          const resolved = deps.map(value => {
            const found = previousLessons.get(value);
            if (found) return found.path;
            const matches = priorById.get(value) ?? [];
            if (matches.length !== 1)
              throw Error(path + ': unresolved, forward or ambiguous upstream Lesson dependency ' + value);
            return matches[0];
          });
          if (new Set(resolved).size !== resolved.length) throw Error(path + ': duplicated upstream Lesson dependency');
          resolvedAssessments.set(path, resolved);
        } else if (kind !== 'episode') {
          throw Error(path + ': unexpected Course placement type ' + kind);
        }
      }
    }
    inspect(input, '');
  }

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
        reviewedSourceSha: source.sourceBlobSha,
      });
      recordPlacement(context.directory, {
        type: 'lesson',
        id: lessonId,
        slug: node.config.slug,
        kind: 'new',
        status: 'pending-lesson-stage1',
        sourcePath: result.files[0].path,
        placementSourcePath: parentIndex(context.directory),
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
      !record(production.source) ||
      typeof production.sourceExportName !== 'string'
    )
      throw new Error(context.directory + ': verified existing Lesson matching and direct source import required');
    // The final reviewed invocation supplies its imported Lesson directly.
    // No AST import decoder, special bundler or Props-to-Config reconstruction.
    const imported = production.source;
    const lesson = {
      id: existing.id,
      sourceSha: match.sourceSha,
      importPath: '#lessonsData/' + existing.id.at(-1) + '/' + existing.id + '/index',
      exportName: production.sourceExportName,
      languages: imported.config?.base?.params?.languages,
      configurator: imported,
      rawPatch: production.sourcePatch,
    };
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
    let patchSource;
    if (hasPatch) {
      if (!record(lesson.rawPatch) || !production.overrideRationale?.trim())
        throw new Error(
          context.directory +
            ': built sparse override requires verified original raw Build expression and editorial rationale',
        );
      const patchLanguages = [...new Set([sourceLanguage, ...Object.keys(existing.locale ?? {})])];
      if (patchLanguages.some(code => !planned.includes(code) || !lesson.languages.includes(code)))
        throw new Error(context.directory + ': override languages require reviewed Course/Lesson support');
      serialize(lesson.rawPatch);
      patchSource = JSON.stringify(lesson.rawPatch, null, 2);
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
      placementSourcePath: parentIndex(context.directory),
      sourceSha: lesson.sourceSha,
      sourceExportName: lesson.exportName,
    });
    return {
      id: existing.id,
      lessonId: existing.id,
      exportName: placementSlug,
      sourceExportName: lesson.exportName,
      importPath: lesson.importPath,
      ...(patchSource === undefined ? {} : { patchSource }),
      files: [],
      diagnostics: [],
    };
  };

  const context = {
    directory: '',
    courseId: rootId,
    reviewedCourseSourceBlobSha: source.sourceBlobSha,
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
        placementSourcePath: parentIndex(directory),
      });
      return result;
    },
    materializeAssessment(node, assessmentContext) {
      const directory = assessmentContext.directory;
      const dependencies = resolvedAssessments.get(directory);
      if (!dependencies) throw Error(directory + ': unreviewed Assessment placement');
      const result = materializeAssessmentPlaceholder(
        {
          ...node,
          production: { ...node.production, lessonDependencies: dependencies },
        },
        assessmentContext,
      );
      recordPlacement(directory, {
        type: 'assessment',
        id: result.id,
        slug: directory.split('/').at(-1),
        kind: 'new',
        status: 'pending-assessment-design',
        sourcePath: root + '/' + directory + '/draft.ts',
        placementSourcePath: parentIndex(directory),
        lessonDependencies: dependencies,
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
        languagesImport: '../'.repeat(sectionContext.directory.split('/').length) + 'constants',
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
    source.sourceBlobSha +
    '\n' +
    rootIndex.content;
  const languageSource =
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
    (planned.length > 1
      ? '// TODO (BLOCKER): Restore reviewed languages ' + JSON.stringify(planned) +
        ' only after their translations and independent review are complete.\n'
      : '') +
    'export const languages = ' + JSON.stringify([sourceLanguage]) +
    ' as const satisfies SupportedLanguages;\n' +
    'export type Languages = typeof languages;\n';
  files.push({ path: root + '/constants.ts', kind: 'typescript', content: languageSource });

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
    sourceBlobSha: source.sourceBlobSha,
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
