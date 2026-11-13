import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';

const webRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const repoRoot = resolve(webRoot, '../..');

test('catalog entries are declared workspace packages with a public Scene registry', () => {
  const catalog = JSON.parse(readFileSync(join(webRoot, 'textbooks.json'), 'utf8'));
  const host = JSON.parse(readFileSync(join(webRoot, 'package.json'), 'utf8'));
  assert.ok(Object.keys(catalog).length > 0);
  for (const [id, entry] of Object.entries(catalog)) {
    assert.match(id, /^[a-z-]+$/);
    const textbook = JSON.parse(readFileSync(join(repoRoot, entry.directory, 'package.json'), 'utf8'));
    assert.equal(textbook.name, entry.package);
    assert.equal(host.dependencies[entry.package], textbook.version);
    assert.match(textbook.exports['./scenes']?.default ?? '', /^\.\/dist\//);
    assert.match(textbook.exports['.']?.default ?? '', /^\.\/dist\//);
    assert.equal(textbook.bin?.['svitlo-' + id], './dist/publish.mjs');
  }
});

test('unknown textbook fails before content generation', () => {
  const result = spawnSync(process.execPath, [join(webRoot, 'scripts/prepareTextbook/prepare-textbook.mjs')], {
    cwd: webRoot,
    env: { ...process.env, SVITLO_TEXTBOOK: 'unknown-textbook' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown SVITLO_TEXTBOOK "unknown-textbook"/);
});
