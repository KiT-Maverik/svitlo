import assert from 'node:assert/strict';
import test from 'node:test';

import { mergeForValidation } from '../_shared__configurators';
import { defineText } from '../contentBlocks/primitive/defineText';
import { defineLesson } from '../lessons/defineLesson';
import { lesson_Completed_Data_Schema } from '../lessons/defineLesson/defineLesson.schemas';
import { defineContentSection } from '../sections/defineContentSection';
import { placeLesson } from './placeLesson';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const paragraph = defineText<'paragraph', ['en', 'uk']>({
  id: id('01'),
  slug: 'paragraph',
  type: 'text',
  params: {},
  locale: { value: { en: 'Original', uk: 'Оригінал' } },
});
const intro = defineContentSection<'intro', { paragraph: typeof paragraph }, ['en', 'uk']>({
  id: id('02'),
  slug: 'intro',
  type: 'content',
  params: {},
  locale: { title: 'Introduction', navigationLabel: 'Intro' },
  children: ['paragraph'],
  paragraph,
});
const lesson = defineLesson({
  id: id('03'),
  slug: 'sourceLesson',
  type: 'lesson',
  skills: [],
  params: {
    quizRequiredForCompletion: false,
    languages: ['en', 'uk'] as const,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
  },
  locale: { title: { en: 'Source', uk: 'Джерело' } },
  children: ['intro'],
  intro,
});
const extra = defineContentSection({
  id: id('04'),
  slug: 'extra',
  type: 'content',
  params: {},
  locale: { title: 'Extra', navigationLabel: 'Extra' },
  children: [],
});

type Built = ReturnType<typeof lesson.build.data>;
const effective = (publication: Built, code: 'en' | 'uk') =>
  mergeForValidation(publication.base, publication.locale?.[code] ?? {});
const paragraphValue = (publication: Built, code: 'en' | 'uk') => {
  const data = effective(publication, code) as { intro: { paragraph: { locale: { value: string } } } };
  return data.intro.paragraph.locale.value;
};

test('Course placements retain nested sparse edits and never mutate the source Lesson', () => {
  const first = placeLesson(lesson, {
    intro: { paragraph: { locale: { value: { uk: 'Перше розміщення' } } } },
  });
  const second = placeLesson(lesson, {
    intro: { paragraph: { locale: { value: { uk: 'Друге розміщення' } } } },
  });
  const firstPublished = first.build.data({ languages: ['uk'] });
  const secondPublished = second.build.data({ languages: ['uk'] });
  assert.equal(paragraphValue(firstPublished, 'uk'), 'Перше розміщення');
  assert.equal(paragraphValue(secondPublished, 'uk'), 'Друге розміщення');
  assert.equal(paragraphValue(lesson.build.data({ languages: ['uk'] }), 'uk'), 'Оригінал');
  assert.equal(first.id, lesson.id);
  assert.equal(first.slug, lesson.slug);
  assert.equal(first.placement.source, lesson);
  lesson_Completed_Data_Schema.parse(effective(firstPublished, 'uk'));
  lesson_Completed_Data_Schema.parse(effective(secondPublished, 'uk'));
});

test('Trusted added Section is published under its direct key and exact replacement order', () => {
  const placed = placeLesson(lesson, { children: ['intro', 'extra'], extra });
  const data = placed.build.data({ languages: ['en'] });
  assert.deepEqual(data.base.children, ['intro', 'extra']);
  assert.equal((data.base.extra as { type: string }).type, 'content');
  assert.deepEqual(lesson.build.data({ languages: ['en'] }).base.children, ['intro']);
  assert.equal(lesson.build.data({ languages: ['en'] }).base.extra, undefined);
  lesson_Completed_Data_Schema.parse(effective(data, 'en'));

  const patch = placed.build.overrides({ params: { sections: { allowNavigation: false } } }, { languages: ['en'] });
  assert.deepEqual(patch.base.children, ['intro', 'extra']);
  assert.equal(patch.base.params?.sections?.allowNavigation, false);
  assert.equal((patch.base.extra as { type: string }).type, 'content');
});

test('A later placement override reorders or removes an existing added Section without mutating it', () => {
  const placed = placeLesson(lesson, { children: ['intro', 'extra'], extra });

  const reordered = placed.build.overrides({ children: ['extra', 'intro'] }, { languages: ['en'] });
  assert.deepEqual(reordered.base.children, ['extra', 'intro']);
  assert.equal((reordered.base.extra as { type: string }).type, 'content');

  const removed = placed.build.overrides({ children: ['intro'], extra: false }, { languages: ['uk'] });
  assert.deepEqual(removed.base.children, ['intro']);
  assert.equal(removed.base.extra, undefined);

  // Calls are isolated: neither the original Lesson nor the placement is edited.
  assert.deepEqual(placed.build.data({ languages: ['en'] }).base.children, ['intro', 'extra']);
  assert.deepEqual(lesson.build.data({ languages: ['en'] }).base.children, ['intro']);

  const unknown = defineContentSection({
    id: id('07'),
    slug: 'unknown',
    type: 'content',
    params: {},
    locale: { title: 'Unknown', navigationLabel: 'Unknown' },
    children: [],
  });
  assert.throws(
    () =>
      Reflect.apply(placed.build.overrides, placed.build, [
        { children: ['intro', 'extra', 'unknown'], unknown },
        { languages: ['en'] },
      ]),
    /Unknown added Lesson Section in placement override: unknown/,
  );
});

test('A disabled Section is removed from completed Data, not published as a false tombstone', () => {
  const placed = placeLesson(lesson, { children: [], intro: false });
  const data = placed.build.data({ languages: ['en', 'uk'] });
  assert.deepEqual(data.base.children, []);
  assert.equal(data.base.intro, undefined);
  for (const language of ['en', 'uk'] as const) {
    const completed = effective(data, language);
    assert.equal(completed.intro, undefined);
    lesson_Completed_Data_Schema.parse(completed);
  }
  assert.deepEqual(lesson.build.data({ languages: ['en'] }).base.children, ['intro']);
});

test('Placed data is immune to caller edits of the exposed placement snapshot', () => {
  const placed = placeLesson(lesson, { children: ['intro', 'extra'], extra });
  (placed.placement.patch.children as string[] | undefined)?.push('unknown');
  const result = placed.build.data({ languages: ['en'] });
  assert.deepEqual(result.base.children, ['intro', 'extra']);
  assert.equal(result.base.unknown, undefined);
});

test('Invalid forged additions, stale children, identity edits and legacy envelopes are rejected', () => {
  const invoke = (patch: unknown) => Reflect.apply(placeLesson, undefined, [lesson, patch]);
  assert.throws(() => invoke({ id: id('05') }), /immutable Lesson placement field/);
  assert.throws(() => invoke({ section: { additionalItems: { extra } } }), /plain JSON Config/);
  assert.throws(
    () =>
      invoke({
        children: ['intro', 'fake'],
        fake: { id: id('06'), slug: 'fake', type: 'content' },
      }).build.data({ languages: ['en'] }),
    /Section/,
  );
  assert.throws(
    () => invoke({ children: ['missing'] }).build.data({ languages: ['en'] }),
    /Unknown slug: missing; Missing slug: intro/,
  );
  assert.throws(
    () =>
      invoke({
        locale: { title: () => 'untrusted' },
      }),
    /plain JSON Config/,
  );
});
