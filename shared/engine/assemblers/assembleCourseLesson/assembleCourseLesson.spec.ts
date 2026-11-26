import assert from 'node:assert/strict';
import test from 'node:test';

import { assembleCourseLesson, type AssembleCourseLessonInput } from './assembleCourseLesson';

const lessonId = '123e4567-e89b-42d3-a456-426614174001';
const courseId = '123e4567-e89b-42d3-a456-426614174002';
const moduleId = '123e4567-e89b-42d3-a456-426614174003';
const sectionA = { id: '123e4567-e89b-42d3-a456-426614174004', slug: 'intro', type: 'content' };
const sectionB = { id: '123e4567-e89b-42d3-a456-426614174005', slug: 'practice', type: 'practice' };
const sectionC = { id: '123e4567-e89b-42d3-a456-426614174006', slug: 'summary', type: 'content' };

const createInput = (): AssembleCourseLessonInput =>
  ({
    lessonId,
    courseId,
    language: 'uk',
    lesson: {
      base: {
        id: lessonId,
        type: 'lesson',
        slug: 'sampleLesson',
        skills: [],
        params: {
          quizRequiredForCompletion: false,
          languages: ['uk', 'en'],
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        locale: { title: 'Invariant lesson title' },
        section: [sectionA, sectionB],
      },
      locale: {
        uk: { locale: { title: 'Український урок' }, section: [sectionA, sectionB] },
        en: { locale: { title: 'English lesson' } },
      },
    },
    course: {
      base: {
        id: courseId,
        type: 'course',
        params: { languages: ['en', 'uk'] },
        content: {
          items: {
            laboratory: {
              id: moduleId,
              type: 'module',
              content: {
                items: { demo: { id: lessonId, type: 'lesson', overrides: {} } },
                order: ['demo'],
              },
            },
          },
          order: ['laboratory'],
        },
      },
    },
  }) as unknown as AssembleCourseLessonInput;

const baseLesson = (input: AssembleCourseLessonInput) =>
  (
    input.course.base.content.items.laboratory as unknown as {
      content: { items: { demo: { overrides: Record<string, unknown> } } };
    }
  ).content.items.demo.overrides;

const localeOverride = (overrides: Record<string, unknown>) => ({
  content: { items: { laboratory: { content: { items: { demo: { overrides } } } } } },
});

test('assembles a course-neutral Lesson when the Course has no patches', () => {
  const input = createInput();
  const snapshot = structuredClone(input);
  const result = assembleCourseLesson(input);

  assert.equal(result.id, lessonId);
  assert.equal(result.locale.title, 'Український урок');
  assert.deepEqual(
    result.section.map(entry => entry.slug),
    ['intro', 'practice'],
  );
  assert.deepEqual(input, snapshot, 'assembly must not mutate input publications');
  assert.notEqual(result.section, (input.lesson.base as { section: unknown }).section);
});

test('fixed four-layer precedence favors the selected Course locale', () => {
  const input = createInput();
  baseLesson(input).locale = { title: 'Invariant Course title' };
  baseLesson(input).params = { sections: { allowSkipping: false } };
  input.course.locale = {
    uk: localeOverride({ locale: { title: 'Назва від програми' } }),
    en: localeOverride({ locale: { title: 'Course title' } }),
  };

  const uk = assembleCourseLesson(input);
  assert.equal(uk.locale.title, 'Назва від програми');
  assert.equal(uk.params.sections.allowSkipping, false);
  assert.equal(uk.params.sections.allowNavigation, true);

  const en = assembleCourseLesson({ ...input, language: 'en' });
  assert.equal(en.locale.title, 'Course title');
});

test('Course base override takes precedence over original Lesson locale', () => {
  const input = createInput();
  baseLesson(input).locale = { title: 'One invariant Course title' };
  assert.equal(assembleCourseLesson(input).locale.title, 'One invariant Course title');
});

test('Course base replaces published arrays atomically and cannot resurrect deleted translated children', () => {
  const input = createInput();
  baseLesson(input).section = [sectionB];
  input.lesson.locale!.uk = { section: [sectionA, sectionB], locale: { title: 'Український урок' } } as never;
  const result = assembleCourseLesson(input);
  assert.deepEqual(
    result.section.map(entry => entry.id),
    [sectionB.id],
  );
});

test('Course localized override replaces an invariant collection rather than merging by index', () => {
  const input = createInput();
  baseLesson(input).section = [sectionB];
  input.course.locale = {
    uk: localeOverride({ section: [sectionC] }),
  };
  assert.deepEqual(
    assembleCourseLesson(input).section.map(section => section.slug),
    ['summary'],
  );
});

test('validates course membership, identities, duplicates and supported languages', () => {
  const input = createInput();
  assert.throws(() => assembleCourseLesson({ ...input, courseId: lessonId }), /Course publication ID mismatch/);
  assert.throws(
    () => assembleCourseLesson({ ...input, lessonId: courseId }),
    /Standalone Lesson publication ID\/type mismatch/,
  );

  const missing = createInput();
  (missing.course.base as unknown as { content: unknown }).content = { items: {}, order: [] };
  assert.throws(() => assembleCourseLesson(missing), /does not belong/);

  const duplicate = createInput();
  const content = duplicate.course.base.content as unknown as { items: Record<string, unknown>; order: string[] };
  content.items.duplicate = { id: lessonId, type: 'lesson', overrides: {} };
  content.order.push('duplicate');
  assert.throws(() => assembleCourseLesson(duplicate), /Duplicate Lesson ID/);

  const unsupported = createInput();
  assert.throws(() => assembleCourseLesson({ ...unsupported, language: 'pl' }), /does not support language/);
});

test('rejects forbidden identity patches and malformed final Props', () => {
  const input = createInput();
  baseLesson(input).id = courseId;
  assert.throws(() => assembleCourseLesson(input), /Forbidden base Lesson override field: id/);

  const languagePatch = createInput();
  baseLesson(languagePatch).params = { languages: ['uk'] };
  assert.throws(() => assembleCourseLesson(languagePatch), /cannot override Lesson supported languages/);

  const malformed = createInput();
  baseLesson(malformed).section = 'not-an-array';
  assert.throws(() => assembleCourseLesson(malformed), /Invalid assembled Course Lesson Props/);
});

test('rejects dangerous JSON keys and invalid Course JSON trees', () => {
  const input = createInput();
  const malicious = JSON.parse('{"__proto__":{"polluted":true}}') as Record<string, unknown>;
  baseLesson(input).params = malicious;
  assert.throws(() => assembleCourseLesson(input), /Unsafe published Props key/);
  assert.equal(({} as { polluted?: boolean }).polluted, undefined);

  const invalid = createInput();
  invalid.course.locale = {
    uk: { content: { items: { laboratory: { content: { invalid: true } } } } },
  } as never; // Intentionally malformed JSON: exercise runtime rejection, not the TS contract.
  assert.throws(() => assembleCourseLesson(invalid), /Invalid Course content/);
});

test('production Lesson assembly rejects draft stubs even when another completed Lesson is selected', () => {
  const unfinishedCourse = createInput();
  const module = unfinishedCourse.course.base.content.items.laboratory as unknown as {
    content: { items: Record<string, unknown>; order: string[] };
  };
  module.content.items.episodePreview = {
    id: '123e4567-e89b-42d3-a456-426614174070',
    slug: 'episodePreview',
    type: 'episode',
    draft: true,
    section: [],
  };
  module.content.order.push('episodePreview');
  assert.throws(() => assembleCourseLesson(unfinishedCourse), /Course draft stub cannot be assembled/);

  const localizedCourse = createInput();
  localizedCourse.course.locale = {
    uk: { content: { items: { laboratory: { content: { items: { demo: { draft: true } } } } } } },
  } as never;
  assert.throws(() => assembleCourseLesson(localizedCourse), /Localized Course draft stub/);

  const standaloneDraft = createInput();
  (standaloneDraft.lesson.base as unknown as Record<string, unknown>).draft = true;
  assert.throws(() => assembleCourseLesson(standaloneDraft), /Standalone Lesson draft/);
});

test('draft Course preview assembles completed Lesson with sibling Episode, Assessment and Lesson stubs', () => {
  const input = createInput();
  input.mode = 'draft';
  const laboratory = input.course.base.content.items.laboratory as unknown as {
    content: { items: Record<string, unknown>; order: string[] };
  };
  const unfinishedLesson = '123e4567-e89b-42d3-a456-426614174071';
  laboratory.content.items.pendingLesson = {
    id: unfinishedLesson,
    slug: 'pendingLesson',
    type: 'lesson',
    draft: true,
  };
  laboratory.content.order.unshift('pendingLesson');
  const root = input.course.base.content as unknown as { items: Record<string, unknown>; order: string[] };
  root.items.openingMission = {
    id: '123e4567-e89b-42d3-a456-426614174072',
    slug: 'openingMission',
    type: 'episode',
    draft: true,
  };
  root.items.finalAssessment = {
    id: '123e4567-e89b-42d3-a456-426614174073',
    slug: 'finalAssessment',
    type: 'assessment',
    draft: true,
  };
  root.order = ['openingMission', 'laboratory', 'finalAssessment'];
  const snapshot = structuredClone(input);
  const assembled = assembleCourseLesson(input);
  assert.equal(assembled.id, lessonId);
  assert.equal(assembled.locale.title, 'Український урок');
  assert.deepEqual(input, snapshot, 'preview must not mutate Course publications');
  assert.throws(
    () => assembleCourseLesson({ ...input, mode: 'production' }),
    /Course draft stub cannot be assembled/,
  );
});

test('draft preview cannot assemble a selected unfinished Lesson or malformed draft siblings', () => {
  const input = createInput();
  input.mode = 'draft';
  const laboratory = input.course.base.content.items.laboratory as unknown as {
    content: { items: Record<string, unknown>; order: string[] };
  };
  laboratory.content.items.demo = { id: lessonId, slug: 'demo', type: 'lesson', draft: true };
  assert.throws(() => assembleCourseLesson(input), /Selected Course draft Lesson cannot be assembled/);

  const malformed = createInput();
  malformed.mode = 'draft';
  const parent = malformed.course.base.content as unknown as { items: Record<string, unknown>; order: string[] };
  parent.items.invalid = { id: '123e4567-e89b-42d3-a456-426614174074', type: 'episode', draft: false };
  parent.order.push('invalid');
  assert.throws(() => assembleCourseLesson(malformed), /Course draft stub cannot be assembled/);
});
