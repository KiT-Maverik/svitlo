import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '../../../..');
const catalog = JSON.parse(readFileSync(resolve(root, 'apps/mobile/textbooks.json'), 'utf8'));

test('Playground is explicitly selected from a build-time catalog', () => {
  assert.equal(catalog.playground.package, '@svitlo/playground');
  assert.equal(catalog.playground.directory, 'content/playground');
});

test('unknown textbook fails before generating or touching Web assets', () => {
  const result = spawnSync(process.execPath, ['apps/mobile/scripts/prepareContent/prepare.mjs'], {
    cwd: root,
    env: { ...process.env, SVITLO_TEXTBOOK: 'not-a-textbook' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown SVITLO_TEXTBOOK/);
});


test('CI reuses prepared Mobile content for typechecking and preserves native coverage', () => {
  const scripts = JSON.parse(readFileSync(resolve(root, 'apps/mobile/package.json'), 'utf8')).scripts;
  const workflow = readFileSync(resolve(root, '.github/workflows/mobile.yml'), 'utf8');
  // The normal public typecheck still prepares content for independent invocation.
  assert.equal(scripts['precode:check:types'], 'node scripts/prepareContent/prepare.mjs');
  assert.equal(scripts['code:check:types:prepared'], scripts['code:check:types']);
  assert.doesNotMatch(scripts['code:lint:check'], /npm run code:check:types/);
  assert.match(workflow, /npm run app:build --workspace @svitlo\/mobile/);
  assert.match(workflow, /npm run code:check:types:prepared --workspace @svitlo\/mobile/);
  assert.doesNotMatch(workflow, /npm run code:check:types --workspace @svitlo\/mobile/);
  assert.match(workflow, /playwright install chromium --with-deps/);
  assert.match(workflow, /gradle\/actions\/setup-gradle@v4/);
  assert.match(workflow, /cap sync android/);
  assert.match(workflow, /gradlew assembleDebug --no-daemon/);
});
