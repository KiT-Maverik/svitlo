import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  assembleCourseTree,
  courseActivities,
  findCourseAssessment,
  findCourseEpisode,
  validateAssessmentRuntime,
} from './assembleCourseTree';

const id = (n: number) => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const episode = (n: number, slug: string) => ({
  id: id(n),
  slug,
  type: 'episode',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Episode' },
  section: [
    {
      id: id(n + 100),
      slug: 'intro',
      type: 'content',
      params: {},
      locale: { title: 'Intro', navigationLabel: 'Intro' },
      content: [{ id: id(n + 200), slug: 'text', type: 'text', params: {}, locale: { value: 'Hello' } }],
    },
  ],
});
const collection = (items: Record<string, unknown>, order: string[]) => ({ items, order });
const lesson = { id: id(30), type: 'lesson' };
const base = {
  id: id(1),
  type: 'course',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Course' },
  content: collection(
    {
      start: episode(2, 'start'),
      module: {
        id: id(3),
        type: 'module',
        locale: { title: 'Module' },
        content: collection(
          {
            middle: episode(4, 'middle'),
            nested: {
              id: id(5),
              type: 'chapter',
              locale: { title: 'Nested' },
              content: collection(
                {
                  story: episode(6, 'story'),
                  lesson,
                },
                ['story', 'lesson'],
              ),
            },
          },
          ['middle', 'nested'],
        ),
      },
      chapter: {
        id: id(7),
        type: 'chapter',
        locale: { title: 'Chapter' },
        content: collection({ end: episode(8, 'end') }, ['end']),
      },
      repeat: { ...lesson, overrides: { locale: { title: 'Context' } } },
    },
    ['start', 'module', 'chapter', 'repeat'],
  ),
};
test('localized atomic Sections and four-level mixed order preserve repeated Lesson placements', () => {
  const translated = episode(2, 'start');
  translated.locale.title = 'Оповідь';
  translated.section[0].content[0].locale.value = 'Привіт';
  const course = assembleCourseTree(
    base,
    { content: { items: { start: { locale: translated.locale, section: translated.section } } } },
    id(1),
    'uk',
  );
  assert.deepEqual(
    courseActivities(course).map(item => item.placement),
    ['start', 'module/middle', 'module/nested/story', 'module/nested/lesson', 'chapter/end', 'repeat'],
  );
  assert.equal(findCourseEpisode(course, id(2))?.locale.title, 'Оповідь');
  assert.equal(findCourseEpisode(course, id(30)), undefined);
  assert.equal(
    base.content.items.start && (base.content.items.start as ReturnType<typeof episode>).locale.title,
    'Episode',
  );
});
test('refuses unsupported events, invalid locale block and changed membership', () => {
  for (const start of [
    { events: { story: { branch: 'x' } } },
    { section: [] },
    { id: id(99) },
    {
      section: [
        { ...episode(2, 'start').section[0], content: [{ id: id(202), slug: 'text', type: 'text', params: {} }] },
      ],
    },
  ]) {
    assert.throws(() => assembleCourseTree(base, { content: { items: { start } } }, id(1), 'uk'));
  }
  assert.throws(() => assembleCourseTree(base, { content: { order: ['start'] } }, id(1), 'uk'));
});

const assessment = (n: number, slug: string) => ({
  id: id(n),
  slug,
  type: 'assessment',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Knowledge check' },
  section: [
    {
      id: id(n + 100),
      slug: 'quiz',
      type: 'quiz',
      params: {
        selection: { mode: 'all', questionIds: [id(n + 200)] },
        layout: { mode: 'stack' },
        feedbackMode: 'after-completion',
        interaction: {
          retries: 1,
          showErrors: true,
          showCorrectAnswers: true,
          allowExplanations: true,
          allowDeferring: false,
          allowQuestionNavigation: true,
          skippable: false,
        },
        results: { visibility: 'immediate', showScore: true },
      },
      locale: { title: 'Quiz', navigationLabel: 'Q' },
      content: [],
    },
  ],
});

test('completed Assessments are valid Course, Module and Chapter activities in exact order', () => {
  const tree = {
    id: id(1),
    type: 'course',
    params: { languages: ['en', 'uk'] },
    locale: { title: 'Course' },
    content: collection(
      {
        lesson,
        finalAssessment: assessment(60, 'finalAssessment'),
        module: {
          id: id(70),
          type: 'module',
          locale: { title: 'Module' },
          content: collection(
            {
              chapter: {
                id: id(71),
                type: 'chapter',
                locale: { title: 'Chapter' },
                content: collection(
                  {
                    chapterAssessment: assessment(62, 'chapterAssessment'),
                  },
                  ['chapterAssessment'],
                ),
              },
              moduleAssessment: assessment(61, 'moduleAssessment'),
            },
            ['chapter', 'moduleAssessment'],
          ),
        },
      },
      ['lesson', 'module', 'finalAssessment'],
    ),
  };
  const localized = assembleCourseTree(
    tree,
    {
      content: { items: { finalAssessment: { locale: { title: 'Підсумкова перевірка' } } } },
    },
    id(1),
    'uk',
  );
  assert.deepEqual(
    courseActivities(localized).map(item => item.placement),
    ['lesson', 'module/chapter/chapterAssessment', 'module/moduleAssessment', 'finalAssessment'],
  );
  assert.equal(findCourseAssessment(localized, id(60))?.locale.title, 'Підсумкова перевірка');
  assert.equal(findCourseAssessment(localized, id(62))?.type, 'assessment');
  assert.equal(findCourseEpisode(localized, id(62)), undefined);
});

test('Assessment runtime fails closed for missing/disabled quizzes and unknown sections', () => {
  const valid = assessment(80, 'test');
  assert.doesNotThrow(() => validateAssessmentRuntime(valid, 'en'));
  assert.throws(() => validateAssessmentRuntime({ ...valid, section: [] }, 'en'));
  assert.throws(() =>
    validateAssessmentRuntime(
      {
        ...valid,
        section: [{ ...valid.section[0], params: { ...valid.section[0]!.params, disabled: true } }],
      },
      'en',
    ),
  );
  assert.throws(() =>
    validateAssessmentRuntime(
      {
        ...valid,
        section: [{ ...valid.section[0], type: 'flashcards' }],
      },
      'en',
    ),
  );
});

test('Assessment rejects a duplicated Section identity even when the first Section is disabled', () => {
  const valid = assessment(95, 'duplicates');
  const supporting = {
    id: id(245),
    slug: 'explanation',
    type: 'content',
    params: {},
    locale: { title: 'Explanation', navigationLabel: 'Explanation' },
    content: [{ id: id(246), slug: 'message', type: 'text', params: {}, locale: { value: 'Text' } }],
  };
  const disabled = { ...supporting, params: { disabled: true } };
  assert.throws(
    () => validateAssessmentRuntime({ ...valid, section: [disabled, supporting, ...valid.section] }, 'en'),
    /Duplicate Assessment Section ID/,
  );
});

test('Course preview accepts a real draft Assessment Text block but rejects fake completion', () => {
  const draft = {
    id: id(120),
    slug: 'draftReview',
    type: 'assessment',
    draft: true,
    params: { languages: ['en', 'uk'] },
    locale: { title: 'Not implemented' },
    section: [
      {
        id: id(121),
        slug: 'preview',
        type: 'content',
        params: {},
        locale: { title: 'Preview', navigationLabel: 'Preview' },
        content: [
          {
            id: id(122),
            slug: 'message',
            type: 'text',
            params: {},
            locale: { value: 'Not implemented' },
          },
        ],
      },
    ],
  };
  const validated = validateAssessmentRuntime(draft, 'en');
  assert.equal('draft' in validated && validated.draft, true);
  const draftCourse = {
    id: id(1),
    type: 'course',
    params: { languages: ['en', 'uk'] },
    locale: { title: 'Course' },
    content: collection({ draftReview: draft }, ['draftReview']),
  };
  const course = assembleCourseTree(draftCourse, undefined, id(1), 'en', 'draft');
  assert.throws(
    () => assembleCourseTree(draftCourse, undefined, id(1), 'en'),
    /Course draft stub cannot be assembled for production/,
  );
  assert.throws(
    () => assembleCourseTree({ ...draftCourse, content: collection({ draft }, ['draft']) }, undefined, id(1), 'en', 'draft'),
    /Invalid Course stub placement/,
  );
  const found = findCourseAssessment(course, id(120));
  assert.equal(found !== undefined && 'draft' in found && found.draft, true);
  assert.throws(() => validateAssessmentRuntime({ ...draft, draft: undefined }, 'en'));
  assert.throws(() =>
    validateAssessmentRuntime(
      {
        ...draft,
        section: [{ ...draft.section[0], content: [] }],
      },
      'en',
    ),
  );
  assert.throws(() =>
    validateAssessmentRuntime(
      {
        ...draft,
        section: [{ ...draft.section[0], params: { disabled: true } }],
      },
      'en',
    ),
  );
});

test('a completed Assessment cannot have a second Quiz', () => {
  const valid = assessment(130, 'oneQuiz');
  const second = {
    ...valid.section[0],
    id: id(240),
    slug: 'anotherQuiz',
  };
  assert.throws(
    () => validateAssessmentRuntime({ ...valid, section: [...valid.section, second] }, 'en'),
    /Assessment|quiz/i,
  );
});
