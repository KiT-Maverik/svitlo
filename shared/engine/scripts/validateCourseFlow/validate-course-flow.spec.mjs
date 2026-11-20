import test from 'node:test';
import assert from 'node:assert/strict';
import { checkPlan, parseYaml } from './validate-course-flow.mjs';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const skillId = 'd3048d21-8690-5255-b62c-984c69ac272c';
function plan() {
  return {
    id: courseId,
    documentLanguage: 'en',
    supportedLanguages: ['en', 'uk'],
    methodology: { purpose: 'Introduction', audience: 'All ages', approach: 'Progressive practice' },
    outcomes: { skills: [skillId], explanation: 'Learners describe the principle' },
  };
}
const lesson = { type: 'lesson', slug: 'intro', title: 'Start', objective: 'Explain the principle', skills: [skillId] };
test('Stage 1 accepts a complete editorial plan without structure', () => {
  assert.equal(checkPlan(plan(), '1').valid, true);
  assert.equal(checkPlan({ ...plan(), content: { items: {}, order: [] } }, '1').valid, false);
});
test('Stage 2 validates fully described Course hierarchy without prohibiting Lesson placements', () => {
  assert.equal(checkPlan(plan(), '2').valid, false);
  const withLesson = { ...plan(), content: { items: { intro: lesson }, order: ['intro'] } };
  assert.equal(checkPlan(withLesson, '2').valid, true);
  assert.equal(checkPlan(withLesson, '3').valid, true);
  assert.equal(checkPlan(withLesson, '3-complete').valid, false);
  assert.equal(
    checkPlan(
      { ...withLesson, content: { items: { intro: { ...lesson, lessonId: skillId } }, order: ['intro'] } },
      '3-complete',
    ).valid,
    true,
  );
});
test('reject invalid order keys, nested Modules and identity mismatch', () => {
  const nested = {
    ...plan(),
    content: {
      items: {
        science: {
          type: 'module',
          slug: 'science',
          title: 'Science',
          methodology: 'Explore',
          content: {
            items: { nested: { type: 'module', slug: 'nested', title: 'Wrong', methodology: 'Wrong' } },
            order: ['nested'],
          },
        },
      },
      order: ['science'],
    },
  };
  assert.equal(checkPlan(nested, '2').valid, false);
  assert.equal(checkPlan({ ...nested, content: { ...nested.content, order: [] } }, '2').valid, false);
});
test('safe YAML 1.2 parser rejects duplicate keys', () => {
  assert.equal(parseYaml('id: hello\n').id, 'hello');
  assert.throws(() => parseYaml('id: first\nid: second\n'), /duplicate|Map keys must be unique/i);
});

test('Stage 3 is complete for a fully specified planned Lesson without any UUID', () => {
  const planned = {
    ...lesson,
    methodology:
      '# Lesson educational methodology\n\nAccurate outcomes, concept sequence, misconceptions and assessment evidence.',
    quizRequired: false,
  };
  const source = { ...plan(), content: { items: { intro: planned }, order: ['intro'] } };
  const result = checkPlan(source, '3-complete');
  assert.equal(result.valid, true, result.errors.join('; '));
  assert.equal(result.plannedLessons, 1);
  assert.equal(result.unresolvedLessonIds, 0);
  assert.equal(
    checkPlan({ ...source, content: { items: { intro: { ...lesson } }, order: ['intro'] } }, '3-complete').valid,
    false,
  );
});
test('Fully specified Episodes are not forbidden at Stage 2, while TMP placeholders remain editorial only', () => {
  const episode = { type: 'episode', slug: 'story', title: 'Story', section: { items: {}, order: [] } };
  const source = { ...plan(), content: { items: { story: episode }, order: ['story'] } };
  assert.equal(checkPlan(source, '3-complete').valid, true);
  assert.equal(checkPlan(source, '3-complete').episodes, 1);
  assert.equal(checkPlan(source, '2').valid, true);

  // Final-schema validation is not a Stage 2 drafting gate; temporary keys have
  // no slug/title/methodology and must be replaced before Stage 3 completion.
  const temporary = {
    ...plan(),
    content: {
      items: {
        TMP_lesson_1: { type: 'lesson', skills: [skillId] },
        TMP_episode_1: { type: 'episode' },
      },
      order: ['TMP_lesson_1', 'TMP_episode_1'],
    },
  };
  assert.equal(checkPlan(temporary, '2').valid, false);
  assert.equal(checkPlan(temporary, '3-complete').valid, false);
});

