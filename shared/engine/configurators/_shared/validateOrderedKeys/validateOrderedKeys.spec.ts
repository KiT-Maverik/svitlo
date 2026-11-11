import assert from 'node:assert/strict';
import test from 'node:test';
import { validateOrderedKeys } from './validateOrderedKeys.utils';

test('validates order for ordinary question items, not only configurators', () => {
  assert.deepEqual(validateOrderedKeys({ items: { first: { answer: {} }, second: 5 }, order: ['second', 'first'] }), []);
});

test('reports invalid keys, missing, repeated, and unknown order slugs', () => {
  const issues = validateOrderedKeys({
    items: { first: {}, bad_slug: {} },
    order: ['first', 'first', 'missing'],
  }, { path: 'questions' });
  assert.ok(issues.some(issue => issue.check === 'slug' && issue.path === 'questions.items.bad_slug'));
  assert.ok(issues.some(issue => issue.message === 'Duplicate slug: first'));
  assert.ok(issues.some(issue => issue.message === 'Unknown slug: missing'));
  assert.ok(issues.some(issue => issue.message === 'Missing slug: bad_slug'));
});

test('filters disabled children from effective order only in overrides', () => {
  const value = { items: { first: {}, second: false }, order: ['first'] };
  assert.ok(validateOrderedKeys(value).some(issue => issue.message === 'Missing slug: second'));
  assert.deepEqual(validateOrderedKeys(value, { allowDisabled: true }), []);
});

test('supports empty Section collections but requires Checkpoint questions', () => {
  const empty = { items: {}, order: [] };
  assert.deepEqual(validateOrderedKeys(empty), []);
  assert.ok(validateOrderedKeys(empty, { requireNonEmpty: true }).some(issue => issue.check === 'collection'));
});
