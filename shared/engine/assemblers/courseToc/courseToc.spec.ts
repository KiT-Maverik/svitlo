import assert from 'node:assert/strict';
import { test } from 'node:test';

import { assembleCourseToc } from './courseToc';

const id = (n: number) => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const base = {
  id: id(1),
  type: 'course',
  languages: ['en', 'uk'],
  children: ['module', 'again', 'review'],
  module: {
    id: id(2),
    type: 'module',
    children: ['first'],
    first: { id: id(3), type: 'lesson' },
  },
  again: { id: id(3), type: 'lesson', label: 'Second placement' },
  review: { id: id(4), type: 'assessment', label: 'Review' },
};
const uk = { label: 'Курс', module: { label: 'Модуль', first: { label: 'Урок' } } };

test('sparse translation preserves direct slugs, order, and reused Lesson UUIDs', () => {
  const tree = assembleCourseToc(base, uk, id(1), 'uk');
  assert.deepEqual(tree.children, ['module', 'again', 'review']);
  assert.equal((tree.module as { label: string }).label, 'Модуль');
  assert.equal((tree.again as { label: string }).label, 'Second placement');
  assert.equal((tree.module as { first: { label: string } }).first.label, 'Урок');
});

test('rejects missing labels, changed order, changed identity and unsafe keys', () => {
  assert.throws(() => assembleCourseToc(base, undefined, id(1), 'en'), /Missing localized/);
  assert.throws(
    () => assembleCourseToc(base, { ...uk, children: ['again', 'module', 'review'] }, id(1), 'uk'),
    /order changed/,
  );
  assert.throws(
    () => assembleCourseToc(base, { ...uk, module: { ...uk.module, id: id(55) } }, id(1), 'uk'),
    /identity changed/,
  );
  assert.throws(() => assembleCourseToc(base, uk, id(1), 'pl'), /requested language/);
  assert.throws(() => assembleCourseToc(base, JSON.parse('{"__proto__":{"label":"unsafe"}}'), id(1), 'uk'), /Unsafe/);
});

test('draft activities are previews, never production navigation entries', () => {
  const pending = structuredClone(base);
  Object.assign(pending.review, { label: 'Not implemented', draft: true });
  assert.throws(() => assembleCourseToc(pending, uk, id(1), 'uk'), /Draft TOC/);
  const preview = assembleCourseToc(pending, uk, id(1), 'uk', 'draft');
  assert.equal((preview.review as { draft: true }).draft, true);
});

test('rejects hidden, duplicate and reserved placements', () => {
  assert.throws(
    () => assembleCourseToc({ ...base, extra: { id: id(99), type: 'lesson' } }, uk, id(1), 'uk'),
    /Unaddressed/,
  );
  assert.throws(
    () => assembleCourseToc({ ...base, children: ['module', 'module', 'review'] }, uk, id(1), 'uk'),
    /order/,
  );
  assert.throws(() => assembleCourseToc({ ...base, children: ['module', 'content', 'review'] }, uk, id(1), 'uk'));
});
