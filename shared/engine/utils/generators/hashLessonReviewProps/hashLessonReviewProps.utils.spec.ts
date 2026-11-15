import assert from 'node:assert/strict';
import { test } from 'node:test';

import { hashLessonReviewProps, lessonReviewIdentifier } from './hashLessonReviewProps.utils';

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
  const first = hashLessonReviewProps(sample());
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
  assert.equal(hashLessonReviewProps(reordered), first);
  assert.match(first, /^[a-f0-9]{20}$/);
});

test('Lesson Props digest changes for learning content, locale values and ordered Sections', () => {
  const first = hashLessonReviewProps(sample());
  const changed = sample();
  changed.locale.en.title = 'Different';
  assert.notEqual(hashLessonReviewProps(changed), first);
  const reversed = sample();
  reversed.base.section.reverse();
  assert.notEqual(hashLessonReviewProps(reversed), first);
  assert.notEqual(hashLessonReviewProps({ base: { ...sample().base, extra: 1 } }), first);
});

test('only JSON-like assembled Props are eligible for a revision digest', () => {
  assert.throws(() => hashLessonReviewProps({ base: { fn: () => true } }), /serializable JSON/);
  assert.throws(() => hashLessonReviewProps({ base: { n: Number.POSITIVE_INFINITY } }), /serializable JSON/);
  assert.throws(() => hashLessonReviewProps({ base: new Date() }), /plain JSON/);
  assert.throws(() => hashLessonReviewProps({} as { base: unknown }), /base object/);
});

test('digest identifiers use the hex value itself, except a TypeScript-safe leading underscore', () => {
  assert.equal(lessonReviewIdentifier('abcde000000000000000'), 'abcde000000000000000');
  assert.equal(lessonReviewIdentifier('12345000000000000000'), '_12345000000000000000');
  assert.throws(() => lessonReviewIdentifier('not-a-hash'), /lowercase hexadecimal/);
});
