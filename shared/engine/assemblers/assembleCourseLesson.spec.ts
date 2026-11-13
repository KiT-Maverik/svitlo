import assert from 'node:assert/strict';
import test from 'node:test';

import { assembleCourseLesson, type AssembleCourseLessonInput } from './assembleCourseLesson';

const lessonId = '123e4567-e89b-42d3-a456-426614174001';
const courseId = '123e4567-e89b-42d3-a456-426614174002';
const moduleId = '123e4567-e89b-42d3-a456-426614174003';
const sectionA = { id: '123e4567-e89b-42d3-a456-426614174004', slug: 'intro', type: 'content' };
const sectionB = { id: '123e4567-e89b-42d3-a456-426614174005', slug: 'practice', type: 'practice' };
const sectionC = { id: '123e4567-e89b-42d3-a456-426614174006', slug: 'summary', type: 'content' };

const createInput = (): AssembleCourseLessonInput => ({
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
        requireQuiz: false,
        languages: ['uk', 'en'],
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
      },
      locale: { title: 'Invariant lesson title' },
      section: [sectionA, sectionB],
      flashcards: [],
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
      content: [
        {
          id: moduleId,
          type: 'module',
          content: [{ id: lessonId, type: 'lesson', overrides: {} }],
        },
      ],
    },
  },
} as unknown as AssembleCourseLessonInput);

const baseLesson = (input: AssembleCourseLessonInput) =>
  ((input.course.base as unknown as { content: { content: { overrides: Record<string, unknown> }[] }[] }).content[0]
    .content[0].overrides);

test('assembles a course-neutral Lesson when the Course has no patches', () => {
  const input = createInput();
  const snapshot = structuredClone(input);
  const result = assembleCourseLesson(input);

  assert.equal(result.id, lessonId);
  assert.equal(result.locale.title, 'Український урок');
  assert.deepEqual(result.section.map(entry => entry.slug), ['intro', 'practice']);
  assert.deepEqual(input, snapshot, 'assembly must not mutate input publications');
  assert.notEqual(result.section, (input.lesson.base as { section: unknown }).section);
});

test('fixed four-layer precedence favors the selected Course locale', () => {
  const input = createInput();
  baseLesson(input).locale = { title: 'Invariant Course title' };
  baseLesson(input).params = { sections: { allowSkipping: false } };
  input.course.locale = {
    uk: {
      content: [
        {
          id: moduleId,
          type: 'module',
          content: [{ id: lessonId, type: 'lesson', overrides: { locale: { title: 'Назва від програми' } } }],
        },
      ],
    },
    en: {
      content: [
        {
          id: moduleId,
          type: 'module',
          content: [{ id: lessonId, type: 'lesson', overrides: { locale: { title: 'Course title' } } }],
        },
      ],
    },
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
  assert.deepEqual(result.section.map(entry => entry.id), [sectionB.id]);
});

test('Course localized override replaces an invariant collection rather than merging by index', () => {
  const input = createInput();
  baseLesson(input).section = [sectionB];
  input.course.locale = {
    uk: {
      content: [
        { id: lessonId, type: 'lesson', overrides: { section: [sectionC] } },
      ],
    },
  };
  assert.deepEqual(assembleCourseLesson(input).section.map(section => section.slug), ['summary']);
});

test('validates course membership, identities, duplicates and supported languages', () => {
  const input = createInput();
  assert.throws(
    () => assembleCourseLesson({ ...input, courseId: lessonId }),
    /Course publication ID mismatch/,
  );
  assert.throws(
    () => assembleCourseLesson({ ...input, lessonId: courseId }),
    /Standalone Lesson publication ID\/type mismatch/,
  );

  const missing = createInput();
  (missing.course.base as { content: unknown[] }).content = [];
  assert.throws(() => assembleCourseLesson(missing), /does not belong/);

  const duplicate = createInput();
  const content = (duplicate.course.base as { content: unknown[] }).content;
  content.push({ id: lessonId, type: 'lesson', overrides: {} });
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
    uk: { content: [{ id: moduleId, type: 'module', content: { invalid: true } }] },
  };
  assert.throws(() => assembleCourseLesson(invalid), /Invalid Course content/);
});
