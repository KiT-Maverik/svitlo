import assert from 'node:assert/strict';
import { test } from 'node:test';

import { hashLessonReviewData, lessonReviewIdentifier } from './hashLessonReviewProps.utils';

const sample = () => ({
  base: {
    id: 'lesson',
    section: [
      { slug: 'intro', locale: { value: 'One' } },
      { slug: 'next', locale: { value: 'Two' } },
    ],
  },
  locale: { uk: { title: 'Світло' }, en: { title: 'Light' } },
});

test('Lesson Props digest is stable across key ordering and omitted undefined object fields', () => {
  const first = hashLessonReviewData(sample());
  const reordered = {
    locale: { en: { title: 'Light' }, uk: { title: 'Світло' } },
    base: {
      section: [
        { locale: { value: 'One' }, slug: 'intro' },
        { locale: { value: 'Two' }, slug: 'next' },
      ],
      id: 'lesson',
      ignored: undefined,
    },
  };
  assert.equal(hashLessonReviewData(reordered), first);
  assert.match(first, /^[a-f0-9]{20}$/);
});

test('Lesson Props digest changes for learning content, locale values and ordered Sections', () => {
  const first = hashLessonReviewData(sample());
  const changed = sample();
  changed.locale.en.title = 'Different';
  assert.notEqual(hashLessonReviewData(changed), first);
  const reversed = sample();
  reversed.base.section.reverse();
  assert.notEqual(hashLessonReviewData(reversed), first);
  assert.notEqual(hashLessonReviewData({ base: { ...sample().base, extra: 1 } }), first);
});

test('only JSON-like assembled Props are eligible for a revision digest', () => {
  assert.throws(() => hashLessonReviewData({ base: { fn: () => true } }), /serializable JSON/);
  assert.throws(() => hashLessonReviewData({ base: { n: Number.POSITIVE_INFINITY } }), /serializable JSON/);
  assert.throws(() => hashLessonReviewData({ base: new Date() }), /plain JSON/);
  assert.throws(() => hashLessonReviewData({} as { base: unknown }), /base object/);
});

test('digest identifiers use the hex value itself, except a TypeScript-safe leading underscore', () => {
  assert.equal(lessonReviewIdentifier('abcde000000000000000'), 'abcde000000000000000');
  assert.equal(lessonReviewIdentifier('12345000000000000000'), '_12345000000000000000');
  assert.throws(() => lessonReviewIdentifier('not-a-hash'), /lowercase hexadecimal/);
});
