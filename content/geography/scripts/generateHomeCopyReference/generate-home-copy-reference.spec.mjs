import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  readHomeCopyReference,
  renderHomeCopyReference,
  generateHomeCopyReviewArtifacts,
} from './generate-home-copy-reference.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const registry = 'shared/engine/schemas/languages.schemas.ts';
const content = 'content/geography/data/homeCopy.ts';

function fixture(callback) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-geography-reference-'));
  try {
    for (const relative of [registry, content]) {
      const filename = path.join(temporary, relative);
      fs.mkdirSync(path.dirname(filename), { recursive: true });
      fs.copyFileSync(path.join(root, relative), filename);
    }
    // Italian is already registered. Simulate missing localized content only
    // in the disposable fixture, without mutating canonical language keys.
    const file = path.join(temporary, content);
    const source = fs.readFileSync(file, 'utf8');
    const italian = /^  it: \[[^\n]*\],\r?\n/m;
    assert.match(source, italian, 'Expected canonical Italian geography fields');
    fs.writeFileSync(file, source.replace(italian, ''));
    callback(temporary);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

test('renders deterministic Code-derived geography home-copy reference', () => {
  const info = readHomeCopyReference({ locale: 'en' });
  assert.equal(info.missing, 0);
  assert.deepEqual(
    info.fields.map(item => item.key),
    ['title', 'description'],
  );
  const one = renderHomeCopyReference({ locale: 'uk' });
  assert.equal(one, renderHomeCopyReference({ locale: 'uk' }));
  assert.match(one, /Canonical source:/);
  assert.doesNotMatch(one, /%%MISSING%%/);
});

test('Italian preview contains two explicit missing fields; strict mode rejects them', () =>
  fixture(temp => {
    assert.throws(() => readHomeCopyReference({ root: temp, locale: 'it' }), /missing \[it\]/);
    const info = readHomeCopyReference({ root: temp, locale: 'it', allowMissing: true });
    assert.equal(info.missing, 2);
    const view = renderHomeCopyReference({ root: temp, locale: 'it', allowMissing: true });
    assert.match(view, /Missing translations: 2/);
    assert.match(view, /it: %%MISSING%%/);
    assert.match(view, /English: Geography/);
    const manifest = { generated: [], failures: [] };
    const output = path.join(temp, 'temp/agent-reference-library');
    fs.mkdirSync(output, { recursive: true });
    const result = generateHomeCopyReviewArtifacts({
      root: temp,
      output,
      languages: ['en', 'it'],
      manifest,
      saveManifest: () => {},
      allowMissing: true,
    });
    assert.deepEqual(result, { generated: 2, failures: 0 });
    assert.deepEqual(
      manifest.generated.map(x => [x.locale, x.missing, x.reviewReady]),
      [
        ['en', 0, true],
        ['it', 2, false],
      ],
    );
  }));

test('reserved marker is never accepted as an authored locale string', () =>
  fixture(temp => {
    const file = path.join(temp, content);
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace("'Geography'", "'%%MISSING%%'"));
    assert.throws(() => readHomeCopyReference({ root: temp, locale: 'en', allowMissing: true }), /canonical English/);
  }));
