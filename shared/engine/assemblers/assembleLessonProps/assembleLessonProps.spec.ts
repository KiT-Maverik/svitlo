import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assembleLessonData,
  type PublishedLessonDataOverride,
  type PublishedLessonDataResource,
} from './assembleLessonProps';

const lessonId = '663572e7-bd85-4516-86e2-3de07d209e03';
const firstId = '663572e7-bd85-4516-86e2-3de07d209e02';
const secondId = '663572e7-bd85-4516-86e2-3de07d209e04';
const thirdId = '663572e7-bd85-4516-86e2-3de07d209e05';

const first = {
  id: firstId,
  slug: 'intro',
  type: 'content' as const,
  params: {},
  locale: { title: 'Introduction', navigationLabel: '1' },
  children: [],
};
const second = {
  id: secondId,
  slug: 'practice',
  type: 'content' as const,
  params: {},
  locale: { title: 'Practice', navigationLabel: '2' },
  children: [],
};
const third = {
  id: thirdId,
  slug: 'review',
  type: 'content' as const,
  params: {},
  locale: { title: 'Review', navigationLabel: '3' },
  children: [],
};

function resource(): PublishedLessonDataResource {
  return {
    base: {
      id: lessonId,
      slug: 'testLesson',
      type: 'lesson',
      skills: [],
      params: {
        quizRequiredForCompletion: false,
        languages: ['en', 'uk'],
        sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
      },
      locale: { title: 'Shared title' },
      children: ['intro', 'practice'], intro: first, practice: second,
    },
    locale: {
      uk: {
        locale: { title: 'Українська назва' },
        intro: { locale: { title: 'Перекладений вступ' } },
      },
      en: { locale: { title: 'English title' } },
    },
  } as PublishedLessonDataResource;
}

test('Lesson assembler resolves only the requested language and preserves nested locale shape', () => {
  const data = resource();
  const uk = assembleLessonData(data, 'uk');
  const en = assembleLessonData(data, 'en');

  assert.equal(uk.locale.title, 'Українська назва');
  assert.equal(en.locale.title, 'English title');
  assert.deepEqual(
    uk.children,
    ['intro', 'practice'],
  );
  assert.equal((uk.intro as {locale:{title:string}}).locale.title, 'Перекладений вступ');
  assert.equal((en.intro as {locale:{title:string}}).locale.title, 'Introduction');
  assert.equal(data.locale?.uk?.locale?.title, 'Українська назва');

  (uk.intro as {slug:string}).slug = 'changed';
  assert.equal((assembleLessonData(data, 'uk').intro as {slug:string}).slug, 'intro');
});

test('resource locale -> override base -> override locale is the required precedence', () => {
  const patch: PublishedLessonDataOverride = {
    base: { locale: { title: 'New invariant title' }, params: { sections: { allowSkipping: true } } },
    locale: { uk: { locale: { title: 'Оновлена назва' } } },
  };

  assert.equal(assembleLessonData(resource(), 'uk', patch).locale.title, 'Оновлена назва');
  const en = assembleLessonData(resource(), 'en', patch);
  assert.equal(en.locale.title, 'New invariant title');
  assert.equal(en.params.sections.allowSkipping, true);
  assert.equal(resource().base.params.sections.allowSkipping, false);
});

test('removing a translated child does not resurrect it from the original locale array', () => {
  const patch: PublishedLessonDataOverride = { base: { children: ['practice'], intro: false } };
  const uk = assembleLessonData(resource(), 'uk', patch);
  assert.deepEqual(
    uk.children,
    ['practice'],
  );
  assert.equal((uk.practice as {locale:{title:string}}).locale.title, 'Practice');
  assert.equal(Object.hasOwn(uk, 'intro'), false);
  assert.deepEqual(
    assembleLessonData(resource(), 'en', patch).children,
    ['practice'],
  );
});

test('reordered and newly added children remain atomic per locale', () => {
  const patch: PublishedLessonDataOverride = {
    base: { children: ['review', 'practice', 'intro'], review: third },
    locale: { uk: { review: { locale: { title: 'Повторення' } } } },
  } as PublishedLessonDataOverride;
  for (const language of ['en', 'uk'] as const) {
    assert.deepEqual(
      assembleLessonData(resource(), language, patch).children,
      ['review', 'practice', 'intro'],
    );
  }
  assert.equal((assembleLessonData(resource(), 'uk', patch).review as {locale:{title:string}}).locale.title, 'Повторення');
});

test('assembler rejects identity changes, language scope changes and unsupported locales', () => {
  assert.throws(() => assembleLessonData(resource(), 'pl'), /does not support requested language/);
  assert.throws(
    () => assembleLessonData(resource(), 'uk', { base: { id: lessonId } } as never),
    /cannot override identity/,
  );
  assert.throws(
    () => assembleLessonData(resource(), 'uk', { locale: { uk: { type: 'other' } } } as never),
    /cannot override identity/,
  );
  assert.throws(
    () => assembleLessonData(resource(), 'uk', { base: { params: { languages: ['uk'] } } } as never),
    /cannot override params.languages/,
  );
});

test('assembler validates the final Data schema and rejects incomplete translations', () => {
  const noTitle = resource();
  delete noTitle.base.locale;
  noTitle.locale = undefined;
  assert.throws(() => assembleLessonData(noTitle, 'uk'), /Invalid assembled Lesson Data/);

  const badSection = resource();
  badSection.locale = { uk: { intro: { type: 'unknown' } } } as never;
  assert.throws(() => assembleLessonData(badSection, 'uk'), /Invalid assembled Lesson Data/);
});

test('plain-object merging is safe against prototype pollution', () => {
  const pollution = JSON.parse('{"params":{"sections":{"__proto__":{"polluted":true}}}}');
  assert.throws(() => assembleLessonData(resource(), 'uk', { base: pollution }), /Unsafe published Lesson property/);
  assert.equal(({} as { polluted?: boolean }).polluted, undefined);
});
