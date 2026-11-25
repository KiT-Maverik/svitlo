import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { auditTextbookMedia, formatMediaAudit } from './auditTextbookMedia.mjs';

const usedImage = '550e8400-e29b-41d4-a716-446655440000.webp';
const unusedAudio = '550e8400-e29b-41d4-a716-446655440001.mp3';
const sceneImage = '550e8400-e29b-41d4-a716-446655440002.svg';
const nilImage = '00000000-0000-0000-0000-000000000000.png';

function inTextbook(fn) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-audit-media-'));
  function put(name, value = 'a') {
    const destination = join(root, name);
    mkdirSync(join(destination, '..'), { recursive: true });
    writeFileSync(destination, value);
  }
  try {
    return fn({ root, put });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('reports only unreferenced textbook-wide physical files, with byte totals', () => {
  inTextbook(({ root, put }) => {
    put('assets/images/' + usedImage, '1234');
    put('assets/audio/' + unusedAudio, '12');
    put('assets/images/' + sceneImage, '123');
    put('data/lessons/a/lesson/index.ts', `defineImage({ locale: { fileName: '${usedImage}' } });`);
    put('scenes/index.tsx', `const scene = '/textbooks/math/assets/images/${sceneImage}';`);
    put('data/lessons/a/lesson/specification.md', unusedAudio); // handoff is not usage
    put('generated/lessons/a/base.json', unusedAudio); // stale outputs are ignored
    put('data/lessons/a/lesson/index.spec.ts', unusedAudio); // test-only reference ignored
    const result = auditTextbookMedia(root);
    assert.equal(result.totalAssets, 3);
    assert.equal(result.referencedAssets, 2);
    assert.equal(result.unusedBytes, 2);
    assert.deepEqual(result.unused, [{ path: 'assets/audio/' + unusedAudio, bytes: 2 }]);
    assert.deepEqual(result.nonstandard, []);
    assert.match(formatMediaAudit(result), /Unreferenced candidates/);
  });
});

test('does not treat Nil UUID markers or documentation as resource usage', () => {
  inTextbook(({ root, put }) => {
    put('assets/images/' + nilImage, 'binary');
    put('assets/images/photo.webp', 'binary');
    put('README.md', `Mention ${nilImage} and photo.webp`);
    put('scenes/other.test.ts', `const img = '${nilImage}';`);
    const result = auditTextbookMedia(root);
    assert.equal(result.unused.length, 2);
    assert.deepEqual(result.nonstandard, ['assets/images/' + nilImage, 'assets/images/photo.webp']);
  });
});

test('can run on a package that has no assets directory', () => {
  inTextbook(({ root, put }) => {
    put('data/lessons/index.ts', `const missing = '${usedImage}';`);
    assert.equal(auditTextbookMedia(root).totalAssets, 0);
    assert.deepEqual(auditTextbookMedia(root).unused, []);
  });
});

test('refuses symlinks in the asset tree rather than following outside paths', () => {
  inTextbook(({ root, put }) => {
    put('assets/images/' + usedImage, 'binary');
    symlinkSync(join(root, 'assets/images', usedImage), join(root, 'assets/images', unusedAudio));
    assert.throws(() => auditTextbookMedia(root), /symbolic link/);
  });
});
