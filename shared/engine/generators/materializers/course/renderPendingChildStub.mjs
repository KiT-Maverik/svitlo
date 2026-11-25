import { renderBlockerTodo } from '../renderBlockerTodo.mjs';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const SAFE = /^[A-Za-z][A-Za-z0-9]*$/;
const safe = value => SAFE.test(value) && !['constructor', 'prototype', '__proto__'].includes(value);
const apis = Object.freeze({
  lesson: 'defineLessonStub',
  episode: 'defineEpisodeStub',
  assessment: 'defineAssessmentStub',
});
const instructions = Object.freeze({
  lesson:
    'Complete and validate the independently authored Lesson Configurator, resources, banks, Scenes and locales; then a Coding Agent must replace the immediate parent stub import with the verified Lesson Configurator import and delete this stub.ts and blocker. Lesson source materialization alone does not activate the placement.',
  episode:
    'Complete and validate the Episode Configurator, resources, Scenes and locales after source materialization; then a Coding Agent must replace the immediate parent stub import with the verified Episode Configurator import and delete this stub.ts and blocker. Stage 5 materialization leaves both parent and stub unchanged.',
  assessment:
    'Complete and validate the Assessment Configurator, upstream Question Banks, resources and locales after source materialization; then a Coding Agent must replace the immediate parent stub import with the verified Assessment Configurator import and delete this stub.ts and blocker. Stage 4 materialization leaves both parent and stub unchanged.',
});

/** One owning, previewable draft-only Configurator per pending Course child.
 * The authored Lesson/Episode/Assessment draft is an independent handoff,
 * never imported into the parent. The emitted stub is not publishable.
 */
export function renderPendingChildStub({ directory, kind, id, slug }) {
  const api = apis[kind];
  if (
    !api ||
    !UUID.test(id ?? '') ||
    !safe(slug ?? '') ||
    typeof directory !== 'string' ||
    directory.split('/').some(part => !safe(part)) ||
    directory.split('/').at(-1) !== slug
  )
    throw Error('Invalid pending Course child stub ownership or identity');
  return {
    path: directory + '/stub.ts',
    kind: 'typescript',
    content:
      'import { ' +
      api +
      " } from '@svitlo/engine/build';\n" +
      renderBlockerTodo(instructions[kind]) +
      '\nexport const ' +
      slug +
      ' = ' +
      api +
      '({ id: ' +
      JSON.stringify(id) +
      ', slug: ' +
      JSON.stringify(slug) +
      ' });\n',
  };
}

/** Preview-only import with an actionable blocker immediately above it.
 * Shared by Course, Module and Chapter so nested child slots cannot diverge.
 */
export function renderPendingChildImport({ kind, slug, location }) {
  if (!apis[kind] || !safe(slug ?? '') || !['./', './content/'].includes(location))
    throw Error('Invalid pending Course child import');
  return (
    renderBlockerTodo(
      'Keep this pending ' +
        kind +
        ' stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.',
    ) +
    '\nimport { ' +
    slug +
    ' } from ' +
    JSON.stringify(location + slug + '/stub') +
    ';'
  );
}
