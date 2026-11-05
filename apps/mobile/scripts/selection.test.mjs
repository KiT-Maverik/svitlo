import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '../../..');
const catalog = JSON.parse(readFileSync(resolve(root, 'apps/mobile/textbooks.json'), 'utf8'));

test('Playground is explicitly selected from a build-time catalog', () => {
  assert.equal(catalog.playground.package, '@svitlo/playground');
  assert.equal(catalog.playground.directory, 'content/playground');
});

test('unknown textbook fails before generating or touching Web assets', () => {
  const result = spawnSync(process.execPath, ['apps/mobile/scripts/prepare.mjs'], {
    cwd: root,
    env: { ...process.env, SVITLO_TEXTBOOK: 'not-a-textbook' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown SVITLO_TEXTBOOK/);
});
