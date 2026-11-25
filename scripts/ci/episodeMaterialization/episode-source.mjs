/** Inert Episode draft parsing and deterministic restoration of one reserved parent slot. */
import { isDeepStrictEqual } from 'node:util';
import { deriveCourseEntityId } from '../../../shared/engine/generators/materializers/course/deriveCourseEntityId.mjs';
import {
  replaceReservedParentSlot,
  readGeneratedCourseHandoff,
} from '../directMaterialization/reserved-parent-slot.mjs';

const record = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const nonempty = x => typeof x === 'string' && !!x.trim();
const same = (a, b) => isDeepStrictEqual(a, b);
const safe = x => typeof x === 'string' && slug.test(x) && !['constructor', 'prototype', '__proto__'].includes(x);

/** Read the immutable Course-generated Episode Stage 1 literal.
 * The shared TypeScript syntax reader accepts ordinary formatting but only
 * decodes inert literal data; authored code is never evaluated here.
 */
export function parseEpisodeHandoff(source) {
  const result = readGeneratedCourseHandoff(source, {
    variable: 'episodeStage1',
    contract: 'EpisodeWorkflowStage1Handoff',
  });
  if (
    !record(result) ||
    !record(result.config) ||
    !record(result.production) ||
    result.config.type !== 'episode' ||
    !safe(result.config.slug) ||
    !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(result.config.id ?? '') ||
    Object.keys(result.config).some(key => !['type', 'id', 'slug'].includes(key)) ||
    Object.keys(result.production).some(key => !['focus', 'purpose', 'languages'].includes(key)) ||
    !nonempty(result.production.focus) ||
    !nonempty(result.production.purpose) ||
    !record(result.production.languages) ||
    typeof result.production.languages.document !== 'string' ||
    !Array.isArray(result.production.languages.planned)
  )
    throw Error('Not a canonical Course-owned Episode handoff');
  return result;
}

export function verifyEpisodeHandoff(handoff, reviewed, meta) {
  const a = handoff.config,
    b = reviewed.config,
    p = handoff.production,
    q = reviewed.production;
  if (
    !safe(a.slug) ||
    !['id', 'slug', 'type'].every(key => a[key] === b[key]) ||
    Object.keys(a).some(key => !['id', 'slug', 'type'].includes(key)) ||
    meta.placement?.split('/').at(-1) !== a.slug ||
    meta.sourcePath !== meta.courseRoot + '/' + meta.placement + '/draft.ts' ||
    deriveCourseEntityId(meta.courseId, 'episode', meta.placement.slice('content/'.length)) !== a.id ||
    !nonempty(p.focus) ||
    !nonempty(p.purpose) ||
    !['focus', 'purpose', 'languages'].every(key => same(p[key], q[key]))
  )
    throw Error(
      'Reviewed Episode must preserve the exact allocated Course handoff identity, order, intent and locale scope',
    );
  const languages = q.languages;
  if (
    !Array.isArray(languages?.planned) ||
    !languages.planned.includes(languages.document) ||
    languages.planned.some(l => typeof l !== 'string' || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(l)) ||
    new Set(languages.planned).size !== languages.planned.length
  )
    throw Error('Invalid reviewed Episode locale plan');
  if (
    !record(q.scenario) ||
    ![
      'audience',
      'entrySituation',
      'exitSituation',
      'continuity',
      'sceneIntent',
      'interactionIntent',
      'accessibility',
      'narrativeConstraints',
    ].every(key => nonempty(q.scenario[key])) ||
    !nonempty(q.specification)
  )
    throw Error('Complete reviewed Episode scenario and specification required');
  if (
    Object.keys(b).some(key => !['id', 'slug', 'type', 'params', 'locale', 'section', 'events'].includes(key)) ||
    Object.keys(b.events ?? {}).length ||
    b.params?.languages !== undefined ||
    !record(b.section?.items) ||
    !Array.isArray(b.section.order) ||
    !b.section.order.length
  )
    throw Error('Complete Episode source Sections required; no Lesson-owned fields or publication language params');
  if (!nonempty(typeof b.locale?.title === 'string' ? b.locale.title : b.locale?.title?.[languages.document]))
    throw Error('Episode source-language title required');
  return true;
}

/** Replace only an existing, UUID-bound defineEpisodeStub at its actual
 * content.items[slug] and leave the parent's original content.order unchanged.
 * Neither TODO comments nor authored placement arrays establish ownership.
 */
export function restoreEpisodePlacement(parent, placement, exportName) {
  return replaceReservedParentSlot(parent, {
    kind: 'episode',
    id: placement.episodeId,
    slug: placement.slug,
    placement: placement.path,
    exportName,
  }).content;
}

/** Assemble only the exact generated Episode-owned files and one reserved parent
 * source change. The already-reviewed Episode entrypoint is executed ONLY by
 * the credential-free worker, not by this trusted composition helper.
 */
export function composeEpisodeDirectPlan(handoff, reviewed, meta, parentSource, output) {
  verifyEpisodeHandoff(handoff, reviewed, meta);
  if (
    !output ||
    output.publishable !== false ||
    output.episodeId !== reviewed.config.id ||
    output.episodeId !== handoff.config.id ||
    typeof output.exportName !== 'string' ||
    !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(output.exportName) ||
    !Array.isArray(output.files) ||
    !output.files.length ||
    !Array.isArray(output.diagnostics)
  )
    throw Error('Direct Episode worker returned an invalid source plan');
  const prefix = meta.courseRoot + '/';
  // Source materializers own Course-relative Episode modules and separately
  // UUID-scoped textbook Scenes. Their two path domains remain disjoint and
  // are independently allowlisted by the trusted Episode transaction.
  const files = output.files.map(file => ({
    ...file,
    path:
      typeof file.path === 'string' && file.path.startsWith(meta.textbookRoot + '/scenes/')
        ? file.path
        : prefix + file.path,
  }));
  const rootIndex = prefix + meta.placement + '/index.ts';
  if (!files.some(file => file.path === rootIndex)) throw Error('Direct Episode did not emit its allocated root index');
  const parent = restoreEpisodePlacement(
    parentSource,
    {
      path: meta.placement,
      slug: handoff.config.slug,
      episodeId: handoff.config.id,
    },
    output.exportName,
  );
  files.push({ path: meta.parentPath, kind: 'typescript', content: parent });
  return {
    files,
    diagnostics: output.diagnostics,
    episodeId: output.episodeId,
    sourceExportName: output.exportName,
    publishable: false,
  };
}
