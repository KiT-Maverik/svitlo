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
test('Stage 2 requires macrostructure and rejects Lesson slots', () => {
  assert.equal(checkPlan(plan(), '2').valid, false);
  const withLesson = { ...plan(), content: { items: { intro: lesson }, order: ['intro'] } };
  assert.equal(checkPlan(withLesson, '2').valid, false);
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
