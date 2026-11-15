import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { resolveLessonMedia } from './resolveLessonMedia.utils';

const id = '00000000-0000-4000-8000-00000000000c';

function fixture(run: (args: { root: string; directory: string; moduleUrl: string }) => void) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-media-'));
  const directory = join(root, 'content/math/data/lessons/c', id, 'sections/intro/diagram');
  mkdirSync(directory, { recursive: true });
  const moduleFile = join(directory, 'index.ts');
  writeFileSync(moduleFile, 'export const diagram = true;\n');
  try {
    run({ root, directory, moduleUrl: pathToFileURL(moduleFile).href });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe('resolveLessonMedia (Build only)', () => {
  test('produces the textbook-owned URL for one invariant image', () => {
    fixture(({ directory, moduleUrl }) => {
      writeFileSync(join(directory, 'diagram.png'), 'fake-image-content');
      assert.equal(
        resolveLessonMedia(moduleUrl, 'image'),
        '/textbooks/math/lessons/c/' + id + '/sections/intro/diagram/diagram.png',
      );
    });
  });

  test('separates localized primary media and localized video posters', () => {
    fixture(({ directory, moduleUrl }) => {
      mkdirSync(join(directory, 'locale'));
      writeFileSync(join(directory, 'locale/uk.mp4'), 'fake-video');
      writeFileSync(join(directory, 'locale/uk.poster.webp'), 'fake-poster');
      assert.equal(
        resolveLessonMedia(moduleUrl, 'video', 'source', 'uk'),
        '/textbooks/math/lessons/c/' + id + '/sections/intro/diagram/locale/uk.mp4',
      );
      assert.equal(
        resolveLessonMedia(moduleUrl, 'video', 'poster', 'uk'),
        '/textbooks/math/lessons/c/' + id + '/sections/intro/diagram/locale/uk.poster.webp',
      );
    });
  });

  test('does not guess missing sources or accept ambiguous extensions', () => {
    fixture(({ directory, moduleUrl }) => {
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image'), /requires exactly one.*found 0/);
      writeFileSync(join(directory, 'diagram.png'), 'bytes');
      writeFileSync(join(directory, 'diagram.svg'), '<svg/>');
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image'), /requires exactly one.*found 2/);
    });
  });

  test('rejects empty and incompatible assets without publishing a guessed URL', () => {
    fixture(({ directory, moduleUrl }) => {
      writeFileSync(join(directory, 'diagram.mp4'), 'video');
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image'), /requires exactly one.*found 0/);
      writeFileSync(join(directory, 'diagram.png'), '');
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image'), /Empty Lesson media asset/);
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image', 'poster'), /Unsupported Lesson media role/);
      assert.throws(() => resolveLessonMedia(moduleUrl, 'video', 'source', '../uk'), /Invalid Lesson media locale/);
    });
  });

  test('rejects symlinked files and a symlinked locale folder', () => {
    fixture(({ root, directory, moduleUrl }) => {
      const elsewhere = join(root, 'elsewhere.png');
      writeFileSync(elsewhere, 'payload');
      symlinkSync(elsewhere, join(directory, 'diagram.png'));
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image'), /Non-regular Lesson media file/);
      const sourceLocale = join(root, 'elsewhere');
      mkdirSync(sourceLocale);
      symlinkSync(sourceLocale, join(directory, 'locale'));
      assert.throws(() => resolveLessonMedia(moduleUrl, 'image', 'source', 'uk'),
        /Symlinked Lesson media source directory/);
    });
  });
});
