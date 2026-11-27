import assert from 'node:assert/strict';
import test from 'node:test';
import { assembleCourseLesson, type AssembleCourseLessonInput } from './assembleCourseLesson';

const id = (n: number) => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const section = (n: number, slug: string) => ({ id: id(n), slug, type: 'content' as const });
const lessonId = id(1);
const courseId = id(2);

function fixture(): AssembleCourseLessonInput {
  return {
    courseId, lessonId, placement: 'laboratory/demo', language: 'uk',
    lesson: {
      base: {
        id: lessonId, slug: 'originalLesson', type: 'lesson', skills: [],
        params: {
          languages: ['en', 'uk'], quizRequiredForCompletion: false,
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        locale: { title: 'Original lesson' },
        children: ['intro', 'review'],
        intro: section(10, 'intro'), review: section(11, 'review'),
      },
      locale: {
        uk: { locale: { title: 'Український урок' }, intro: { locale: { title: 'Вступ' } } },
        en: { locale: { title: 'English lesson' } },
      },
    },
    course: {
      base: {
        id: courseId, slug: 'course', type: 'course',
        params: { languages: ['en', 'uk'] },
        children: ['laboratory'],
        laboratory: {
          id: id(3), slug: 'laboratory', type: 'module', params: {}, locale: { title: 'Laboratory' },
          children: ['demo'], demo: { id: lessonId, type: 'lesson', overrides: {} },
        },
      },
    },
  } as AssembleCourseLessonInput;
}

function courseSlot(input: AssembleCourseLessonInput): { overrides: Record<string, unknown> } {
  return (input.course.base.laboratory as {
    demo: { overrides: Record<string, unknown> };
  }).demo;
}
function localeSlot(overrides: Record<string, unknown>): object {
  return { laboratory: { demo: { overrides } } };
}

test('resolves selected Course placement without duplicating standalone Lesson Data', () => {
  const input = fixture();
  const snapshot = structuredClone(input);
  const value = assembleCourseLesson(input);
  assert.equal(value.id, lessonId);
  assert.equal(value.locale.title, 'Український урок');
  assert.deepEqual(value.children, ['intro', 'review']);
  assert.equal(value.intro.type, 'content');
  assert.deepEqual(input, snapshot, 'published inputs remain immutable');
});

test('four-layer precedence retains source languages but applies contextual locale patch', () => {
  const input = fixture();
  courseSlot(input).overrides = {
    params: { sections: { allowSkipping: false } },
    locale: { title: 'Invariant contextual title' },
  };
  input.course.locale = {
    uk: localeSlot({ locale: { title: 'Практика з тінями' } }),
    en: localeSlot({ locale: { title: 'Special practice' } }),
  };
  const uk = assembleCourseLesson(input);
  assert.equal(uk.locale.title, 'Практика з тінями');
  assert.equal(uk.params.sections.allowSkipping, false);
  const en = assembleCourseLesson({ ...input, language: 'en' });
  assert.equal(en.locale.title, 'Special practice');
  assert.deepEqual(en.params.languages, ['en', 'uk']);
});

test('structural base override removes translated children by tombstone, without recreating siblings', () => {
  const input = fixture();
  courseSlot(input).overrides = { children: ['review'], intro: false };
  const value = assembleCourseLesson(input);
  assert.deepEqual(value.children, ['review']);
  assert.equal(Object.hasOwn(value, 'intro'), false);
  assert.equal(value.review.id, id(11));
  assert.deepEqual(input.lesson.locale?.uk?.intro, { locale: { title: 'Вступ' } });
});

test('localized override can replace a complete ordered children array', () => {
  const input = fixture();
  input.course.locale = { uk: localeSlot({ children: ['intro'], review: false }) };
  const value = assembleCourseLesson(input);
  assert.deepEqual(value.children, ['intro']);
  assert.equal(Object.hasOwn(value, 'review'), false);
  assert.equal(value.intro.id, id(10));
});

test('repeated Lesson UUIDs require explicit placement and keep independent contextual overrides', () => {
  const input = fixture();
  input.course.base.children.push('second');
  input.course.base.second = { id: lessonId, type: 'lesson', overrides: { locale: { title: 'Second placement' } } };
  assert.equal(assembleCourseLesson(input).locale.title, 'Український урок');
  assert.equal(
    assembleCourseLesson({ ...input, placement: 'second' }).locale.title,
    'Second placement',
  );
  assert.throws(() => assembleCourseLesson({ ...input, placement: undefined }), /Ambiguous Lesson ID/);
});

test('rejects unknown, unsafe or disabled placement paths and mismatched identities', () => {
  const input = fixture();
  for (const placement of ['laboratory/unknown', 'laboratory/../demo', '__proto__/demo', 'laboratory', '/demo']) {
    assert.throws(() => assembleCourseLesson({ ...input, placement }));
  }
  input.course.base.children = [];
  assert.throws(() => assembleCourseLesson(input), /Unknown Course placement/);
  const different = fixture();
  different.lesson.base.id = id(99);
  assert.throws(() => assembleCourseLesson(different), /identity/i);
});

test('forbids identity and language changes through published placement override', () => {
  const input = fixture();
  courseSlot(input).overrides = { params: { languages: ['en'] } };
  assert.throws(() => assembleCourseLesson(input), /languages/);
  courseSlot(input).overrides = { id: id(99) };
  assert.throws(() => assembleCourseLesson(input), /identity|override/i);
});

test('rejects incomplete Lesson payloads and production draft references', () => {
  const input = fixture();
  (input.lesson.base as unknown as Record<string, unknown>).draft = true;
  assert.throws(() => assembleCourseLesson(input), /draft/i);
  const other = fixture();
  (other.course.base.laboratory as Record<string, unknown>).demo = {
    id: lessonId, type: 'lesson', draft: true,
  };
  assert.throws(() => assembleCourseLesson(other), /draft/i);
});
