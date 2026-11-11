import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

import { resolveEntityPath } from '../../../../utils/entityPath/resolveEntityPath.utils';
import { validateLocalAssetPaths, validateSceneEntry } from './validateLocalAssets.utils';

const sceneId = '72d22bea-d787-4c6d-9a83-144830c6d325';

function withTextbook(run: (cwd: string, asset: string, sceneEntry: string) => void) {
  const repo = mkdtempSync(join(tmpdir(), 'svitlo-assets-'));
  const cwd = join(repo, 'content', 'example');
  const staticDir = join(cwd, 'static', 'media');
  const sceneEntry = join(cwd, 'scenes', resolveEntityPath(sceneId), 'index.ts');
  mkdirSync(join(repo, 'shared'), { recursive: true });
  mkdirSync(staticDir, { recursive: true });
  const asset = join(staticDir, 'existing.png');
  writeFileSync(asset, 'fixture');
  try {
    run(cwd, asset, sceneEntry);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
}

test('validates textbook media URLs against book-owned static and public resources', () => {
  withTextbook((cwd, asset) => {
    assert.doesNotThrow(() =>
      validateLocalAssetPaths('/textbooks/example/media/existing.png', 'locale.src', cwd),
    );
    assert.doesNotThrow(() => validateLocalAssetPaths('media/existing.png', 'locale.src', cwd));
    assert.doesNotThrow(() => validateLocalAssetPaths(pathToFileURL(asset).href, 'locale.src', cwd));
    assert.throws(
      () => validateLocalAssetPaths('/textbooks/example/media/missing.png', 'locale.src', cwd),
      /Missing local media file at locale.src/,
    );
    const publicFile = join(cwd, 'public', 'media', 'poster.jpg');
    mkdirSync(join(cwd, 'public', 'media'), { recursive: true });
    writeFileSync(publicFile, 'fixture');
    assert.doesNotThrow(() => validateLocalAssetPaths('/textbooks/example/media/poster.jpg', 'locale.poster', cwd));
  });
});

test('checks every localized media variant and identifies the failing field', () => {
  withTextbook((cwd) => {
    assert.throws(
      () => validateLocalAssetPaths({
        en: '/textbooks/example/media/existing.png',
        uk: '/textbooks/example/media/missing.png',
      }, 'locale.slides[1].src', cwd),
      /Missing local media file at locale.slides\[1\].src.uk/,
    );
  });
});

test('does not attempt network access for external and embedded URLs', () => {
  withTextbook(cwd => {
    for (const value of ['https://cdn.example.org/example.jpg', '//cdn.example.org/example.jpg', 'data:image/png;base64,YQ==', 'blob:example']) {
      assert.doesNotThrow(() => validateLocalAssetPaths(value, 'locale.src', cwd));
    }
  });
});

test('rejects traversal and verifies the UUID-bucketed Scene index.ts', () => {
  withTextbook((cwd, _asset, sceneEntry) => {
    assert.throws(() => validateLocalAssetPaths('../escape.png', 'locale.src', cwd), /Unsafe local media path/);
    assert.throws(() => validateSceneEntry(sceneId, cwd), /Missing Scene entrypoint/);
    mkdirSync(join(cwd, 'scenes', resolveEntityPath(sceneId)), { recursive: true });
    writeFileSync(sceneEntry, 'export default function Scene() {}');
    assert.doesNotThrow(() => validateSceneEntry(sceneId, cwd));
    unlinkSync(sceneEntry);
    assert.throws(() => validateSceneEntry(sceneId, cwd), /Missing Scene entrypoint/);
  });
});
