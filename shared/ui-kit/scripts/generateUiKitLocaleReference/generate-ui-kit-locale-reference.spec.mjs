import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  uiKitComponents,
  readUiKitComponentReference,
  renderUiKitComponentReference,
  generateUiKitLocaleReviewArtifacts,
} from './generate-ui-kit-locale-reference.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const sourceDir = 'shared/ui-kit/data/locale';
const registry = 'shared/engine/schemas/languages.schemas.ts';

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-ui-kit-review-'));
  try {
    for (const relative of [
      registry,
      ...fs
        .readdirSync(path.join(repoRoot, sourceDir))
        .filter(name => name.endsWith('.ts'))
        .map(name => sourceDir + '/' + name),
    ]) {
      const destination = path.join(root, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(repoRoot, relative), destination);
    }
    // Keep the real 30-language registry; make only the copied Italian
    // UI Kit dictionaries incomplete to exercise strict and draft preview.
    for (const name of fs
      .readdirSync(path.join(root, sourceDir))
      .filter(name => name.endsWith('.ts') && !['index.ts', 'locale.types.ts'].includes(name))) {
      const file = path.join(root, sourceDir, name);
      const source = fs.readFileSync(file, 'utf8');
      const italian = /^  it,\r?\n/m;
      assert.match(source, italian, 'Missing Italian entry in fixture: ' + name);
      fs.writeFileSync(file, source.replace(italian, ''));
    }
    callback(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('generates every canonical UI Kit component from static localized Code with nested paths', () => {
  assert.equal(uiKitComponents().length, 10);
  for (const component of uiKitComponents()) {
    const english = readUiKitComponentReference({ component, locale: 'en' });
    assert.equal(english.missing, 0);
    assert.ok(english.fields.length);
    const first = renderUiKitComponentReference({ component, locale: 'en' });
    assert.equal(first, renderUiKitComponentReference({ component, locale: 'en' }));
    assert.doesNotMatch(first, /%%MISSING%%/);
    assert.ok(first.includes('Canonical source: ['));
  }
  const nested = readUiKitComponentReference({ component: 'image', locale: 'en' });
  assert.ok(nested.fields.some(field => field.key === 'carousel.fullscreen'));
});

test('missing Italian fields are visible in draft preview, not accepted in strict mode', () =>
  fixture(root => {
    assert.throws(() => readUiKitComponentReference({ root, component: 'audio', locale: 'it' }), /missing \[it\]/);
    const info = readUiKitComponentReference({ root, component: 'audio', locale: 'it', allowMissing: true });
    assert.equal(info.missing, info.fields.length);
    const markdown = renderUiKitComponentReference({ root, component: 'audio', locale: 'it', allowMissing: true });
    assert.match(markdown, /Missing translations: 11/);
    assert.match(markdown, /it: %%MISSING%%/);
    assert.match(markdown, /English: Play/);
    const all = { generated: [], failures: [] };
    const output = path.join(root, 'temp/agent-reference-library');
    fs.mkdirSync(output, { recursive: true });
    const stats = generateUiKitLocaleReviewArtifacts({
      root,
      output,
      languages: ['en', 'it'],
      manifest: all,
      saveManifest: () => {},
      allowMissing: true,
    });
    assert.deepEqual(stats, { generated: 20, failures: 0 });
    assert.equal(all.generated.filter(entry => entry.locale === 'it' && !entry.reviewReady).length, 10);
    assert.equal(all.generated.filter(entry => entry.locale === 'en' && entry.reviewReady).length, 10);
  }));

test('never interprets reserved marker or invalid source as authored translation', () =>
  fixture(root => {
    const file = path.join(root, sourceDir, 'audio.ts');
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace("play: 'Play'", "play: '%%MISSING%%'"));
    assert.throws(
      () =>
        readUiKitComponentReference({
          root,
          component: 'audio',
          locale: 'en',
          allowMissing: true,
        }),
      /Reserved marker/,
    );
  }));
