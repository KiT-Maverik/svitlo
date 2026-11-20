import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  webRoot,
  selectedPackageName,
  resolveSelectedTextbook,
  assertSelectedArtifacts,
} from './resolve-selected-textbook.mjs';

test('build selection is mandatory, accepts installed Svitlo identity and rejects paths', () => {
  assert.throws(() => selectedPackageName(''), /SVITLO_TEXTBOOK is required/);
  assert.equal(selectedPackageName('math'), '@svitlo/math');
  assert.equal(selectedPackageName('@svitlo/test-content'), '@svitlo/test-content');
  for (const unsafe of ['../playground', '../../etc', '/etc', '@other/book', 'math/../../../x', 'abc\\\\def', 'ABC', '']) {
    assert.throws(() => selectedPackageName(unsafe), /Unsafe|SVITLO_TEXTBOOK is required/);
  }
});

test('a non-installed, valid selection fails before any content generation', () => {
  const cli = fileURLToPath(new URL('./prepare-textbook.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [cli], {
    cwd: webRoot,
    env: { ...process.env, SVITLO_TEXTBOOK: 'not-installed-svitlo-fixture' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /not installed/);
});

test('missing explicit selection fails before generation and does not use Playground', () => {
  const cli = fileURLToPath(new URL('./prepare-textbook.mjs', import.meta.url));
  const env = { ...process.env };
  delete env.SVITLO_TEXTBOOK;
  const result = spawnSync(process.execPath, [cli], { cwd: webRoot, env, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /SVITLO_TEXTBOOK is required/);
  assert.doesNotMatch(result.stderr, /Selected.*playground/);
});

test('installed public contract recognizes Scene support as optional', t => {
  const temp = mkdtempSync(join(tmpdir(), 'svitlo-web-resolver-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const packages = join(temp, 'node_modules');
  function fixture(slug, exports, bin = './dist/publish.mjs') {
    const path = join(packages, '@svitlo', slug);
    mkdirSync(join(path, 'dist'), { recursive: true });
    const manifest = {
      name: '@svitlo/' + slug, version: '1.2.3',
      exports,
      bin: { ['svitlo-' + slug]: bin },
    };
    writeFileSync(join(path, 'package.json'), JSON.stringify(manifest));
    return { path, manifest };
  }
  const metadata = { types: './dist/textbook/index.d.ts', default: './dist/textbook/index.js' };
  const simple = fixture('fixture-one', { '.': metadata });
  const selected = resolveSelectedTextbook('fixture-one', [packages]);
  assert.equal(selected.name, simple.manifest.name);
  assert.equal(selected.hasScenes, false);
  assert.equal(selected.hasStyles, false);
  assert.throws(() => assertSelectedArtifacts(selected), /Missing or unsafe compiled/);
  for (const file of ['textbook/index.d.ts', 'textbook/index.js', 'publish.mjs']) {
    const path = join(simple.path, 'dist', file);
    mkdirSync(join(path, '..'), { recursive: true });
    writeFileSync(path, '');
  }
  assert.doesNotThrow(() => assertSelectedArtifacts(selected));

  const full = fixture('fixture-two', {
    '.': metadata,
    './scenes': { types: './dist/scenes/index.d.ts', default: './dist/scenes/index.js' },
    './styles': { default: './dist/styles.css' },
  });
  const scenes = resolveSelectedTextbook('fixture-two', [packages]);
  assert.equal(scenes.hasScenes, true);
  assert.equal(scenes.hasStyles, true);
  for (const file of ['textbook/index.d.ts', 'textbook/index.js', 'publish.mjs', 'scenes/index.d.ts', 'scenes/index.js', 'styles.css']) {
    const path = join(full.path, 'dist', file);
    mkdirSync(join(path, '..'), { recursive: true });
    writeFileSync(path, '');
  }
  assert.doesNotThrow(() => assertSelectedArtifacts(scenes));
});

test('invalid public exports and unsafe Publish CLI fail closed', t => {
  const temp = mkdtempSync(join(tmpdir(), 'svitlo-invalid-contract-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const packages = join(temp, 'node_modules');
  const path = join(packages, '@svitlo', 'unsafe');
  mkdirSync(path, { recursive: true });
  const write = manifest => writeFileSync(join(path, 'package.json'), JSON.stringify({ name: '@svitlo/unsafe', ...manifest }));
  write({ bin: { 'svitlo-unsafe': './dist/publish.mjs' }, exports: { '.': { default: '../src/index.js' } } });
  assert.throws(() => resolveSelectedTextbook('unsafe', [packages]), /unsafe public export/);
  write({ bin: { 'svitlo-unsafe': '../src/publish.mjs' }, exports: {
    '.': { default: './dist/index.js', types: './dist/index.d.ts' },
  } });
  assert.throws(() => resolveSelectedTextbook('unsafe', [packages]), /Publish CLI/);
  write({ bin: { 'svitlo-unsafe': './dist/publish.mjs' }, exports: {
    '.': { default: './dist/index.js', types: './dist/index.d.ts' },
    './styles': { default: './dist/styles.css' },
  } });
  assert.throws(() => resolveSelectedTextbook('unsafe', [packages]), /Scene styles without a Scene registry/);
});

test('Web source does not declare any experimental textbook dependency or catalog', async () => {
  const { readFileSync } = await import('node:fs');
  const manifest = JSON.parse(readFileSync(join(webRoot, 'package.json'), 'utf8'));
  assert.equal(manifest.dependencies?.['@svitlo/playground'], undefined);
  assert.equal(existsSync(join(webRoot, 'textbooks.json')), false);
});
