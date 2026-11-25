import { renderBlockerTodo } from '../renderBlockerTodo.mjs';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const SAFE = /^[A-Za-z][A-Za-z0-9]*$/;
const apis = Object.freeze({
  lesson: 'defineLessonStub',
  episode: 'defineEpisodeStub',
  assessment: 'defineAssessmentStub',
});
const instructions = Object.freeze({
  lesson:
    'Complete the independently authorized Lesson workflow, verify the completed UUID-addressed Lesson and its Course integration, then replace this Lesson placement with that verified Configurator import and delete stub.ts with this marker. Lesson Stage 6 alone does not authorize parent mutation.',
  episode:
    'Complete the independently reviewed Episode and its trusted Stage 5 materialization, atomically replace the reserved parent import with the completed Episode and delete this stub.ts and marker.',
  assessment:
    'Complete the independently reviewed Assessment and its trusted Stage 4 materialization, atomically replace the reserved parent import with the completed Assessment and delete this stub.ts and marker.',
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
    !SAFE.test(slug ?? '') ||
    typeof directory !== 'string' ||
    directory.split('/').some(part => !SAFE.test(part)) ||
    directory.split('/').at(-1) !== slug
  )
    throw Error('Invalid pending Course child stub ownership or identity');
  return {
    path: directory + '/stub.ts',
    kind: 'typescript',
    content:
      "import { " + api + " } from '@svitlo/engine/build';\n" +
      renderBlockerTodo(instructions[kind]) +
      '\nexport const stub = ' + api +
      '({ id: ' + JSON.stringify(id) + ', slug: ' + JSON.stringify(slug) + ' });\n',
  };
}
