import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  assembleCourseTree, courseActivities, findCourseActivityByPlacement,
  findCourseAssessment, findCourseEpisode, validateAssessmentRuntime,
} from './assembleCourseTree';

const id = (n: number) => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const section = (n: number, slug: string) => ({
  id: id(n), slug, type: 'content', params: {},
  locale: { title: 'Introduction', navigationLabel: 'Start' },
  children: ['message'],
  message: { id: id(n + 100), slug: 'message', type: 'text', params: {}, locale: { value: 'Hello' } },
});
const episode = (n: number, slug: string) => ({
  id: id(n), slug, type: 'episode', params: { languages: ['en', 'uk'] },
  locale: { title: 'Episode' }, children: ['intro'], intro: section(n + 10, 'intro'),
});
const quiz = {
  id: id(60), slug: 'quiz', type: 'quiz', params: {
    selection: { mode: 'all', questionIds: [id(80)] },
    layout: { mode: 'stack' }, feedbackMode: 'immediate',
    interaction: {
      retries: 0, showErrors: true, showCorrectAnswers: true, allowExplanations: true,
      allowDeferring: false, allowQuestionNavigation: true, skippable: false,
    },
    results: { visibility: 'immediate', showScore: true },
  },
  locale: { title: 'Quiz', navigationLabel: 'Quiz' }, children: [],
};
const assessment = (n: number, slug: string) => ({
  id: id(n), slug, type: 'assessment', params: { languages: ['en', 'uk'] },
  locale: { title: 'Review' }, before: { children: [] }, quiz, after: { children: [] },
});
const lesson = { id: id(90), type: 'lesson' };
const base = {
  id: id(1), slug: 'course', type: 'course',
  params: { languages: ['en', 'uk'] }, locale: { title: 'Course' },
  children: ['start', 'module', 'last'],
  start: episode(2, 'start'),
  module: {
    id: id(3), slug: 'module', type: 'module', params: {}, locale: { title: 'Module' },
    children: ['nested', 'repeat'],
    nested: {
      id: id(4), slug: 'nested', type: 'chapter', params: {}, locale: { title: 'Chapter' },
      children: ['lesson', 'end'],
      lesson, end: episode(5, 'end'),
    },
    repeat: lesson,
  },
  last: assessment(6, 'last'),
};

test('Course resolves direct ordered placements and localized nested Episode data', () => {
  const localized = assembleCourseTree(
    base, { start: { locale: { title: 'Оповідь' }, intro: { message: { locale: { value: 'Привіт' } } } } },
    id(1), 'uk',
  );
  assert.deepEqual(courseActivities(localized).map(value => value.placement), [
    'start', 'module/nested/lesson', 'module/nested/end', 'module/repeat', 'last',
  ]);
  assert.equal(findCourseEpisode(localized, id(2))?.locale.title, 'Оповідь');
  assert.equal(findCourseAssessment(localized, id(6))?.type, 'assessment');
  assert.equal(findCourseActivityByPlacement(localized, 'module/nested/lesson')?.node.id, id(90));
  assert.equal(findCourseActivityByPlacement(localized, 'module/unknown'), undefined);
  assert.throws(() => findCourseActivityByPlacement(localized, '../start'), /Unsafe/);
  assert.equal(base.start.intro.message.locale.value, 'Hello', 'published inputs stay unchanged');
});

test('localized Course, Episode and Assessment cannot mutate immutable language scopes', () => {
  for (const change of [
    { params: { languages: ['uk'] } },
    { start: { params: { languages: ['uk'] } } },
    { module: { nested: { end: { params: { languages: ['en'] } } } } },
    { last: { params: { languages: ['uk'] } } },
  ]) {
    assert.throws(
      () => assembleCourseTree(base, change, id(1), 'uk'),
      /Localized Course language scope changed/,
    );
  }
  const translated = assembleCourseTree(base, {
    locale: { title: 'Курс' },
    start: { locale: { title: 'Оповідь' } },
    last: { locale: { title: 'Перевірка' } },
  }, id(1), 'uk');
  assert.equal(translated.locale.title, 'Курс');
  assert.equal(findCourseEpisode(translated, id(2))?.locale.title, 'Оповідь');
  assert.equal(findCourseAssessment(translated, id(6))?.locale.title, 'Перевірка');
  assert.deepEqual(translated.params.languages, ['en', 'uk']);
});

test('validated direct placement paths use indexed membership, not order-array searches', () => {
  const course = assembleCourseTree(base, undefined, id(1), 'en');
  const module = course.module as { children: string[]; nested: { children: string[] } };
  for (const order of [course.children, module.children, module.nested.children]) {
    Object.defineProperty(order, 'includes', {
      value: () => { throw Error('navigation must never linearly scan siblings'); },
    });
  }
  assert.equal(findCourseActivityByPlacement(course, 'module/nested/lesson')?.node.id, id(90));
  assert.equal(findCourseActivityByPlacement(course, 'module/nested/missing'), undefined);
  assert.equal(findCourseActivityByPlacement(course, 'module/nested'), undefined);
  assert.throws(
    () => findCourseActivityByPlacement(structuredClone(course), 'module/nested/lesson'),
    /assembled, validated Course/,
  );
  const changed = assembleCourseTree(base, undefined, id(1), 'en');
  const changedModule = changed.module as { children: string[] };
  changedModule.children = [];
  assert.throws(
    () => findCourseActivityByPlacement(changed, 'module/nested/lesson'),
    /changed after validation/,
  );
});

test('rejects translation changing structure, identity or unsupported Episode events', () => {
  for (const patch of [
    { children: ['module', 'start', 'last'] },
    { start: { id: id(99) } },
    { start: { children: [] } },
    { start: { events: { branching: true } } },
    { start: { intro: { message: { id: id(99) } } } },
  ]) assert.throws(() => assembleCourseTree(base, patch, id(1), 'uk'));
});

test('Assessment has one enabled Quiz and explicit, independently ordered phases', () => {
  const course = assembleCourseTree(base, undefined, id(1), 'en');
  const selected = findCourseAssessment(course, id(6));
  assert.equal(selected?.type, 'assessment');
  const changed = structuredClone(base.last);
  changed.quiz.params.selection.questionIds = [id(81)];
  assert.doesNotThrow(() => validateAssessmentRuntime(changed, 'uk'));
  assert.throws(() => validateAssessmentRuntime({ ...changed, quiz: undefined }, 'uk'));
  assert.throws(() => validateAssessmentRuntime({
    ...changed, quiz: { ...quiz, params: { ...quiz.params, disabled: true } },
  }, 'uk'));
  assert.throws(() => validateAssessmentRuntime({ ...changed, before: { children: ['missing'] } }, 'uk'));
});

test('draft Assessment preview is permitted only in explicit draft assembly', () => {
  const preview = {
    id: id(70), slug: 'reserved', type: 'assessment', draft: true,
    params: { languages: ['en', 'uk'] }, locale: { title: 'Preview' },
    preview: {
      ...section(71, 'preview'), children: ['message'],
      message: { id: id(171), slug: 'message', type: 'text', params: {}, locale: { value: 'Not implemented' } },
    },
  };
  const pending = structuredClone(base) as Record<string, unknown>;
  pending.children = [...base.children, 'reserved'];
  pending.reserved = preview;
  assert.throws(() => assembleCourseTree(pending, undefined, id(1), 'uk'), /draft/i);
  const draft = assembleCourseTree(pending, undefined, id(1), 'uk', 'draft');
  assert.equal(findCourseActivityByPlacement(draft, 'reserved')?.node.type, 'assessment');
});

test('rejects duplicate Course-owned UUIDs, hidden children and noncompact Lesson payload', () => {
  assert.throws(() => assembleCourseTree({
    ...base, last: { ...base.last, id: id(2) },
  }, undefined, id(1), 'en'), /Duplicate/);
  assert.throws(() => assembleCourseTree({
    ...base, extra: { id: id(42), type: 'lesson' },
  }, undefined, id(1), 'en'), /Unaddressed/);
  assert.throws(() => assembleCourseTree({
    ...base, module: { ...base.module, repeat: { ...lesson, children: [] } },
  }, undefined, id(1), 'en'), /Noncompact/);
  assert.throws(() => assembleCourseTree({
    ...base, children: ['start', 'last'], module: base.module,
  }, undefined, id(1), 'en'), /Unaddressed/);
});
