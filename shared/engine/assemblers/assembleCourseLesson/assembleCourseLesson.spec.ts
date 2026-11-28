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
  assert.equal((value.intro as { type: string }).type, 'content');
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
  assert.equal((value.review as { id: string }).id, id(11));
  assert.deepEqual(input.lesson.locale?.uk?.intro, { locale: { title: 'Вступ' } });
});

test('localized override can replace a complete ordered children array', () => {
  const input = fixture();
  input.course.locale = { uk: localeSlot({ children: ['intro'], review: false }) };
  const value = assembleCourseLesson(input);
  assert.deepEqual(value.children, ['intro']);
  assert.equal(Object.hasOwn(value, 'review'), false);
  assert.equal((value.intro as { id: string }).id, id(10));
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

test('direct Lesson selection indexes validated order without scanning sibling arrays', () => {
  const input = fixture();
  const root = input.course.base;
  const module = root.laboratory as { children: string[] };
  for (const order of [root.children, module.children]) {
    Object.defineProperty(order, 'includes', {
      value: () => { throw Error('direct route must not search sibling order'); },
    });
  }
  const first = assembleCourseLesson(input);
  const second = assembleCourseLesson(input);
  assert.equal(first.id, lessonId);
  assert.equal(second.id, lessonId);
  assert.deepEqual(second.children, ['intro', 'review']);

  // A stale unlisted placement is never a valid route, even if its own key exists.
  const stale = fixture();
  stale.course.base.children = [];
  assert.throws(() => assembleCourseLesson(stale), /Unaddressed|disabled Course publication placement/);
  const changed = fixture();
  assert.equal(assembleCourseLesson(changed).id, lessonId);
  changed.course.base.children = [];
  assert.throws(() => assembleCourseLesson(changed), /Unaddressed or disabled Course publication placement/);
});

test('same-length in-place edits invalidate mutable Course publication membership', () => {
  const input = fixture();
  const slot = input.course.base.laboratory as {
    children: string[];
    demo: { id: string; type: string; overrides?: object };
    renamed?: { id: string; type: string; overrides?: object };
  };

  assert.equal(assembleCourseLesson(input).id, lessonId);
  slot.children[0] = 'renamed'; // same array identity and length; old Set is stale.
  assert.throws(
    () => assembleCourseLesson(input),
    /Unaddressed or disabled Course publication placement/,
  );
  slot.renamed = slot.demo;
  delete (slot as unknown as Record<string, unknown>).demo;
  assert.throws(
    () => assembleCourseLesson(input),
    /Unknown Course placement/,
  );
  assert.equal(
    assembleCourseLesson({ ...input, placement: 'laboratory/renamed' }).id,
    lessonId,
  );
  // Replacing a direct child without changing order must also be observed:
  // a cached snapshot of the old child would incorrectly resolve lessonId.
  slot.renamed = { id: id(99), type: 'lesson' };
  assert.throws(
    () => assembleCourseLesson({ ...input, placement: 'laboratory/renamed' }),
    /Lesson ID or kind mismatch/,
  );
});

test('frozen published Courses can reuse indexed navigation without owning the caller objects', () => {
  const input = fixture();
  const root = input.course.base;
  const module = root.laboratory as { children: string[]; demo: object };
  Object.freeze(module.children);
  Object.freeze(module.demo);
  Object.freeze(module);
  Object.freeze(root.children);
  Object.freeze(root);
  assert.equal(assembleCourseLesson(input).id, lessonId);
  assert.equal(assembleCourseLesson(input).id, lessonId);
  assert.throws(() => { module.children[0] = 'changed'; }, TypeError);
  assert.throws(() => { (module as unknown as Record<string, unknown>).demo = { id: id(99), type: 'lesson' }; }, TypeError);
  assert.equal(assembleCourseLesson(input).id, lessonId);
});

test('selected Course locale may not replace the publication language scope', () => {
  const input = fixture();
  input.course.locale = { uk: { params: { languages: ['uk'] } } };
  assert.throws(() => assembleCourseLesson(input), /cannot override params.languages/);
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
