import { renderBlockerSpecification, renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { materializeCourse } from './materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from '../chapter/materialize.mjs';
import { materializeEpisode } from '../episode/materialize.mjs';
import { materializeLessonDraft } from './lessonDraft.mjs';
import { buildPlacementInventory } from './placementInventory.mjs';
import { deriveCourseEntityId } from './deriveCourseEntityId.mjs';
import { materializeAssessmentPlaceholder } from './materializeAssessmentPlaceholder.mjs';
import { bindCourseLessonPatch } from './bindCourseLessonPatch.mjs';
import { renderCourseLessonPatch } from './renderCourseLessonPatch.mjs';

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

/**
 * A Course Lesson override belongs to one placement, not the reusable Lesson
 * or durable Course methodology. Keep complete reviewed editorial context
 * after consuming the pinned Stage 3 draft. Each note names its owning path,
 * kind and UUID. Media implementation briefs stay with their own resources.
 */
function renderPlacementOverrideSpecification(production, patch) {
  const notes = ['Course Lesson placement override rationale:', production.overrideRationale];
  const nonEditorial = new Set(['pending', 'documentLanguage', 'methodologyIntegrated', 'runtimeStatus']);
  const resourceBriefFields = new Set(['specification', 'prompt', 'script', 'storyboard']);
  const resourceKinds = new Set(['image', 'video', 'audio', 'subtitles', 'scene', 'youtube']);
  const visit = (value, path, depth = 0) => {
    if (depth > 80) throw new Error('Course override editorial tree exceeds safe nesting depth');
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) visit(value[i], path + '[' + i + ']', depth + 1);
      return;
    }
    if (!record(value)) return;
    if (record(value.config) && typeof value.config.type === 'string') {
      const kind = value.config.type;
      const identity = kind + ' ' + value.config.id;
      if (record(value.production)) {
        for (const [field, note] of Object.entries(value.production).sort(([a], [b]) => a.localeCompare(b))) {
          if (
            nonEditorial.has(field) ||
            (resourceKinds.has(kind) && resourceBriefFields.has(field)) ||
            typeof note !== 'string' ||
            !note.trim()
          )
            continue;
          notes.push(path + ' (' + identity + ') production.' + field + ':\n' + note);
        }
      }
      visit(value.config, path + '.config', depth + 1);
      return;
    }
    for (const [key, child] of Object.entries(value).sort(([a], [b]) => a.localeCompare(b))) {
      if (key !== 'production') visit(child, path + '.' + key, depth + 1);
    }
  };
  for (const [sectionKey, entry] of Object.entries(patch.section?.additionalItems ?? {}).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    if (entry?.$create === 'course-section') visit(entry.source, 'section.additionalItems.' + sectionKey + '.source');
  }
  return notes.join('\n\n');
}

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
    Object.hasOwn(input.config, 'content') ||
    !Array.isArray(input.config.children)
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
    const parent = directory.split('/').slice(0, -1).join('/');
    return root + '/' + (parent ? parent + '/' : '') + 'index.ts';
  };
  const deriveId = (kind, directory) => {
    if (!directory) throw new Error('Unexpected Course child placement: ' + directory);
    const relative =
      kind === 'assessment' && directory.includes('/')
        ? directory.split('/').slice(0, -1).join('/') + '/content/' + directory.split('/').at(-1)
        : directory;
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
      for (const key of owner.config.children) {
        const child = owner.config[key];
        const kind = child?.config?.type;
        const path = [parent, key].filter(Boolean).join('/');
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
            const found = previousLessons.get(value) ?? previousLessons.get(value.replace(/^content\//, ''));
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
  const sceneScaffolds = [];
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
        placementSourcePath: parentIndex(context.directory, 'lesson'),
        stubSourcePath: root + '/' + context.directory + '/stub.ts',
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
      typeof production.sourceExportName !== 'string' ||
      !slug.test(production.sourceExportName) ||
      typeof options.resolveExistingLesson !== 'function'
    )
      throw new Error(context.directory + ': reviewed Lesson matching and trusted dependency resolver required');
    if (Object.keys(existing).some(key => key !== 'id'))
      throw new Error(context.directory + ': expected only {id}, never built Props');
    if (Object.hasOwn(production, 'source'))
      throw new Error(context.directory + ': a Course draft must not embed a live Lesson Configurator');
    const requested = {
      id: existing.id,
      sourceSha: match.sourceSha,
      importPath: '#lessonsData/' + existing.id.at(-1).toLowerCase() + '/' + existing.id.toLowerCase() + '/index',
      exportName: production.sourceExportName,
      placementPath: context.directory,
    };
    // The runner MUST attest the execution trust of this specific source.
    // A SHA alone only identifies bytes; it never authorizes code execution.
    const approved = options.resolveExistingLesson(requested);
    if (
      !record(approved) ||
      approved.approved !== true ||
      approved.id !== requested.id ||
      approved.sourceSha !== requested.sourceSha ||
      approved.importPath !== requested.importPath ||
      approved.exportName !== requested.exportName
    )
      throw new Error(context.directory + ': unapproved, stale or mismatched Lesson execution dependency');
    const imported = approved.configurator;
    const lesson = {
      id: existing.id,
      sourceSha: match.sourceSha,
      importPath: requested.importPath,
      exportName: requested.exportName,
      languages: imported?.config?.base?.params?.languages,
      configurator: imported,
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
      typeof lesson.configurator.build?.data !== 'function' ||
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
    const placementSlug = node.config.slug;
    const hasPatch = production.sourcePatch !== undefined;
    let patchSource;
    let extraImports = [];
    let placementFiles = [];
    let placementDiagnostics = [];
    if (hasPatch) {
      const rawPatch = production.sourcePatch;
      if (!record(rawPatch) || !Object.keys(rawPatch).length || !production.overrideRationale?.trim())
        throw new Error(context.directory + ': nonempty sparse Lesson patch requires an editorial rationale');
      serialize(rawPatch);
      // Restrict Build to reviewed Course languages which this exact Lesson
      // supports. Do not project Props or invent missing translations here.
      const patchLanguages = planned.filter(code => lesson.languages.includes(code));
      if (!patchLanguages.includes(sourceLanguage))
        throw new Error(context.directory + ': Lesson source locale is outside reviewed publication scope');
      // UUIDs authored in Course-owned Section/Block trees must be unique
      // across the entire Course, including its derived child allocations.
      // The concrete Section renderer independently validates the node schema.
      for (const candidate of Object.values(rawPatch.section?.additionalItems ?? {})) {
        if (candidate?.$create !== 'course-section') continue;
        const walk = (value, depth = 0) => {
          if (depth > 80) throw Error(context.directory + ': oversized Course-owned Section tree');
          if (Array.isArray(value)) {
            for (const item of value) walk(item, depth + 1);
            return;
          }
          if (!record(value)) return;
          if (record(value.config) && typeof value.config.id === 'string') {
            const id = value.config.id.toLowerCase();
            if (!uuid.test(id) || newIds.has(id) || knownExistingIds.has(id))
              throw Error(context.directory + ': duplicate/invalid Course-owned Section or Block UUID ' + id);
            newIds.add(id);
          }
          for (const child of Object.values(value)) walk(child, depth + 1);
        };
        walk(candidate.source);
      }
      // Convert only approved declarative additions to genuine Section
      // Configurators before invoking the unchanged nested Lesson Build.
      const binding = bindCourseLessonPatch(rawPatch, {
        placementPath: context.directory,
        resolveAddedSection: options.resolveAddedSection,
        renderAddedSection: options.renderAddedSection,
      });
      const created = Object.keys(binding.createdSections);
      if (created.length) {
        // The complete placement order is checked against immutable original
        // keys and both kinds of additions before any source is emitted.
        const originals = Object.keys(lesson.configurator.section.items);
        const disabled = Object.entries(rawPatch.section?.items ?? {})
          .filter(([, value]) => value === false)
          .map(([key]) => key);
        const expected = [
          ...originals.filter(key => !disabled.includes(key)),
          ...Object.keys(rawPatch.section?.additionalItems ?? {}),
        ];
        const order = rawPatch.section?.order;
        if (
          !Array.isArray(order) ||
          order.length !== expected.length ||
          new Set(order).size !== expected.length ||
          order.some(key => !expected.includes(key))
        )
          throw Error(context.directory + ': Course-owned Section order must include all and only active Sections');
      }
      placementDiagnostics = Object.values(binding.createdSections).flatMap(section => section.diagnostics ?? []);
      const layout = renderCourseLessonPatch({
        directory: context.directory,
        rawPatch,
        binding,
        sourceLesson: { importPath: lesson.importPath, exportName: lesson.exportName },
      });
      sceneScaffolds.push(...layout.sceneScaffolds);
      patchSource = layout.patchSource;
      extraImports = layout.imports;
      // All Course-specific fragments belong under the placement, never in
      // standalone Lesson source or the owning Course/Module/Chapter index.ts.
      placementFiles = [
        ...layout.files,
        {
          path: context.directory + '/index.ts',
          kind: 'typescript',
          content: [
            "import { placeLesson } from '@svitlo/engine/build';",
            'import { ' + lesson.exportName + ' } from ' + JSON.stringify(lesson.importPath) + ';',
            ...extraImports,
            '',
            'export const ' +
              placementSlug +
              ' = placeLesson(' +
              lesson.exportName +
              ', ' +
              patchSource +
              ' satisfies Parameters<typeof ' +
              lesson.exportName +
              '.build.overrides>[0]);',
            '',
            renderBlockerSpecification(
              'Implement, test and verify this entire Course-owned Lesson placement override and its resources; delete this temporary specification only after the whole override is complete.',
              renderPlacementOverrideSpecification(production, rawPatch),
            ),
            '',
          ].join('\n'),
        },
      ];
      try {
        // A newly authored Section does not exist as an executable Build
        // Configurator yet. Validate the exact existing-source portion through
        // the genuine Build API; the new Section subtree is independently Zod-
        // validated and rendered by trusted concrete Section/Block materializers.
        // Publication remains blocked until the generated sources are compiled.
        let checkedPatch = binding.patch;
        if (created.length) {
          const external = { ...binding.patch.section.additionalItems };
          for (const key of created) delete external[key];
          checkedPatch = {
            ...binding.patch,
            section: {
              ...binding.patch.section,
              additionalItems: external,
              order: binding.patch.section.order.filter(key => !created.includes(key)),
            },
          };
        }
        const built = lesson.configurator.build.overrides(checkedPatch, { languages: patchLanguages });
        if (built.id !== existing.id)
          throw new Error('Lesson Build override changed the independently owned Lesson identity');
      } catch (error) {
        throw new Error(context.directory + ': raw Lesson patch is invalid against real Build API', { cause: error });
      }
    } else if (production.overrideRationale !== undefined) {
      throw new Error(context.directory + ': override rationale without a Course-local patch');
    }
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
      placementSourcePath: parentIndex(context.directory, 'lesson'),
      ...(hasPatch ? { overrideSourcePath: root + '/' + context.directory + '/index.ts' } : {}),
      sourceSha: lesson.sourceSha,
      sourceExportName: lesson.exportName,
    });
    return {
      id: existing.id,
      lessonId: existing.id,
      exportName: placementSlug,
      sourceExportName: hasPatch ? placementSlug : lesson.exportName,
      importPath: hasPatch ? './' + placementSlug : lesson.importPath,
      files: placementFiles,
      diagnostics: placementDiagnostics,
    };
  };

  const context = {
    directory: '',
    courseId: rootId,
    textbookRoot,
    resolveSkill: options.resolveSkill,
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
        placementSourcePath: parentIndex(directory, 'episode'),
        ...(pending ? { stubSourcePath: root + '/' + directory + '/stub.ts' } : {}),
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
        placementSourcePath: parentIndex(directory, 'assessment'),
        stubSourcePath: root + '/' + directory + '/stub.ts',
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
  // Preserve the shared Section renderer's textbook-rooted Scene sources.
  // The trusted Course publisher separately restricts these UUID destinations.
  const sceneRoot = textbookRoot + '/scenes/';
  for (const file of sceneScaffolds) {
    const parts =
      typeof file?.path === 'string' && file.path.startsWith(sceneRoot)
        ? file.path.slice(sceneRoot.length).split('/')
        : [];
    const [bucket, id, filename] = parts;
    if (
      parts.length !== 3 ||
      !/^[0-9a-f]$/.test(bucket) ||
      !uuid.test(id ?? '') ||
      bucket !== id.at(-1) ||
      !/^(?:index\.ts|[A-Z][A-Za-z0-9]*(?:\.tsx|\.constants\.ts|\.module\.css|\.stories\.tsx|\.unit\.spec\.tsx))$/.test(
        filename ?? '',
      ) ||
      !['typescript', 'code'].includes(file.kind) ||
      typeof file.content !== 'string'
    )
      throw Error('Unsafe generated Scene output: ' + String(file?.path));
  }
  const files = [
    ...materialized.files.map(file =>
      file.path.startsWith(textbookRoot + '/data/lessons/') ? file : { ...file, path: root + '/' + file.path },
    ),
    ...sceneScaffolds,
  ];
  const rootIndex = files.find(file => file.path === materializedPath);
  if (!rootIndex || rootIndex.kind !== 'typescript')
    throw new Error('Course Stage 5 failed to emit the canonical root source');
  // The Course publisher discovers UUID-root index.ts automatically.
  // Persist a fail-closed marker IN the generated source; returning a transient
  // {publishable:false} flag alone cannot stop an unrelated publication job.
  rootIndex.content =
    renderBlockerTodo(
      'Course Stage 5 source is not publication approval. Complete and verify independent Lesson, Episode, Assessment, localization, resource, editorial-review and human QA gates, then remove this marker before release.',
    ) +
    '\n' +
    '// Reviewed Course source blob: ' +
    source.sourceBlobSha +
    '\n' +
    rootIndex.content;
  const languageSource =
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
    (planned.length > 1
      ? '// Planned languages (INACTIVE until complete and reviewed): ' +
        JSON.stringify(planned) +
        '\n' +
        renderBlockerTodo(
          'Complete and independently review every planned Course translation for ' +
            JSON.stringify(planned) +
            '; REPLACE the tuple in the single existing export const languages below with the verified active languages, then remove this marker.',
        ) +
        '\n'
      : '') +
    'export const languages = ' +
    JSON.stringify([sourceLanguage]) +
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
