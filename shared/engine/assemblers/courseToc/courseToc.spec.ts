import assert from 'node:assert/strict';
import { test } from 'node:test';

import { assembleCourseToc } from './courseToc';

const id = (n: number) => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const base = {
  id: id(1),
  type: 'course',
  languages: ['en', 'uk'],
  content: {
    order: ['module', 'again', 'review'],
    items: {
      module: {
        id: id(2),
        type: 'module',
        content: { order: ['first'], items: { first: { id: id(3), type: 'lesson' } } },
      },
      again: { id: id(3), type: 'lesson', label: 'Second placement' },
      review: { id: id(4), type: 'assessment', label: 'Review' },
    },
  },
};
const uk = {
  label: 'Курс',
  content: {
    items: {
      module: { label: 'Модуль', content: { items: { first: { label: 'Урок' } } } },
    },
  },
};

test('assembles a sparse locale on a stable ordered hierarchy with repeated Lesson IDs', () => {
  const tree = assembleCourseToc(base, uk, id(1), 'uk');
  assert.deepEqual(tree.content.order, ['module', 'again', 'review']);
  assert.equal(tree.content.items.module.label, 'Модуль');
  assert.equal(tree.content.items.again.label, 'Second placement');
});

test('fails closed on missing locale labels, changed identities, unsafe keys, and unsupported languages', () => {
  assert.throws(() => assembleCourseToc(base, undefined, id(1), 'en'), /Missing localized/);
  assert.throws(
    () =>
      assembleCourseToc(
        base,
        { ...uk, content: { items: { ...uk.content.items, again: { id: id(5) } } } },
        id(1),
        'uk',
      ),
    /identity changed/,
  );
  assert.throws(() => assembleCourseToc(base, uk, id(1), 'pl'), /requested language/);
  assert.throws(() => assembleCourseToc(base, { ['__proto__']: { label: 'X' } }, id(1), 'uk'), /./);
});

test('draft activity is preview-only and never produces a playable production TOC', () => {
  const pending = structuredClone(base);
  Object.assign(pending.content.items.review, { label: 'Not implemented', draft: true });
  assert.throws(() => assembleCourseToc(pending, uk, id(1), 'uk'), /Draft TOC/);
  assert.equal('draft' in assembleCourseToc(pending, uk, id(1), 'uk', 'draft').content.items.review, true);
});
