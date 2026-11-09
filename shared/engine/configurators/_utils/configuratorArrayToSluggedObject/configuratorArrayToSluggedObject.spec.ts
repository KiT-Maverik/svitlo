import assert from 'node:assert/strict';
import test from 'node:test';
import { configuratorArrayToSluggedObject } from './configuratorArrayToSluggedObject.utils';

test('indexes configurators by base slug without changing their values', () => {
  const first = { config: { base: { slug: 'first' as const } }, configure: () => 1 };
  const second = { config: { base: { slug: 'second' as const } }, configure: () => 2 };
  const result = configuratorArrayToSluggedObject([first, second]);

  assert.deepEqual(Object.keys(result), ['first', 'second']);
  assert.equal(result.first, first);
  assert.equal(result.second, second);
  assert.deepEqual(configuratorArrayToSluggedObject([]), {});
});

test('rejects duplicate slugs instead of overwriting a configurator', () => {
  const first = { config: { base: { slug: 'repeat' } } };
  const second = { config: { base: { slug: 'repeat' } } };
  assert.throws(() => configuratorArrayToSluggedObject([first, second]), /Duplicate configurator slug: repeat/);
});

test('preserves slugs that match object prototype property names', () => {
  const configurator = { config: { base: { slug: '__proto__' } } };
  const result = configuratorArrayToSluggedObject([configurator]);
  assert.equal(Object.hasOwn(result, '__proto__'), true);
  assert.equal(result.__proto__, configurator);
});
