import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const repoRoot = resolve(webRoot, '../..');
const source = join(repoRoot, 'shared/ui-kit/assets/flags');
const published = join(webRoot, 'public/flags');

test('common Web asset preparation copies canonical UI Kit flags independent of textbook selection', () => {
  const result = spawnSync(process.execPath, [join(webRoot, 'scripts/prepareAppAssets/prepare-app-assets.mjs')], {
    cwd: repoRoot,
    env: { ...process.env, SVITLO_TEXTBOOK: 'not-a-real-textbook' },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);

  const expected = readdirSync(source)
    .filter(name => name.endsWith('.svg'))
    .sort();
  const actual = readdirSync(published)
    .filter(name => name.endsWith('.svg'))
    .sort();
  assert(expected.length > 0);
  assert.deepEqual(actual, expected);
  for (const filename of expected) {
    assert.equal(readFileSync(join(published, filename), 'utf8'), readFileSync(join(source, filename), 'utf8'));
  }
  assert(existsSync(join(webRoot, 'public/flags')));
});
