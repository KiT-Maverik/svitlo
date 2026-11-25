import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolve } from 'node:path';
import { resolvePackagedResource } from '../dist/resourcePath.js';

test('routes a locale-specific lesson to the bundled index', () => {
  assert.equal(resolvePackagedResource('/tmp/svitlo', 'svitlo://app/uk/lesson/abc'), resolve('/tmp/svitlo/index.html'));
});
test('retains lazy assets and published localized resources', () => {
  assert.equal(
    resolvePackagedResource('/tmp/svitlo', 'svitlo://app/data/uiKit/components/uk.json'),
    resolve('/tmp/svitlo/data/uiKit/components/uk.json'),
  );
  assert.equal(
    resolvePackagedResource('/tmp/svitlo', 'svitlo://app/assets/scene.js'),
    resolve('/tmp/svitlo/assets/scene.js'),
  );
});
test('denies other origins and escaped resource paths', () => {
  for (const url of [
    'file:///etc/passwd',
    'svitlo://other/asset.js',
    'svitlo://app/%2e%2e%5cprivate.js',
    'svitlo://app/one%2ftwo%5csecret.js',
  ]) {
    assert.throws(() => resolvePackagedResource('/tmp/svitlo', url));
  }
});
