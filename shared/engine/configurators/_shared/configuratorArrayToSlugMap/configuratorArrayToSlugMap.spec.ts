import assert from 'node:assert/strict';
import test from 'node:test';
import { configuratorArrayToSlugMap } from './configuratorArrayToSlugMap.utils';

test('makes a typed slug-keyed map without changing configurators or their order', () => {
  const first = { slug: 'firstBlock' as const, config: { base: { slug: 'firstBlock' } } };
  const second = { slug: 'secondBlock' as const, config: { base: { slug: 'secondBlock' } } };
  const map = configuratorArrayToSlugMap([first, second]);
  assert.deepEqual(Object.keys(map), ['firstBlock', 'secondBlock']);
  assert.strictEqual(map.firstBlock, first);
  assert.strictEqual(map.secondBlock, second);
});

test('rejects duplicate or missing slugs instead of silently overwriting data', () => {
  assert.throws(() => configuratorArrayToSlugMap([{ slug: 'same' }, { slug: 'same' }]), /Duplicate configurator slug/);
  assert.throws(() => configuratorArrayToSlugMap([{ slug: '' }]), /nonempty slug/);
});
