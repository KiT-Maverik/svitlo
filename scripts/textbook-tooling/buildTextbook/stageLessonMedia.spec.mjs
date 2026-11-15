import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { stageLessonMedia } from './stageLessonMedia.mjs';

const id = '00000000-0000-4000-8000-00000000000c';
const base = 'c/' + id + '/sections/intro/videoExample';
const index = base + '/index.ts';

function fixture(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-pack-media-'));
  const textbookRoot = path.join(dir, 'content/math');
  const staticRoot = path.join(dir, 'dist/static');
  const source = path.join(textbookRoot, 'data/lessons');
  fs.mkdirSync(path.join(source, base), { recursive: true });
  fs.writeFileSync(path.join(source, index), 'export {};\n');
  const files = [index];
  const add = (relative, bytes) => {
    fs.mkdirSync(path.dirname(path.join(source, relative)), { recursive: true });
    fs.writeFileSync(path.join(source, relative), bytes);
    files.push(relative);
  };
  try {
    fn({ textbookRoot, staticRoot, files, add,
      destination: relative => path.join(staticRoot, 'textbooks/math/lessons', relative) });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test('stages invariant, localized and poster media in textbook namespace without touching source', () =>
  fixture(f => {
    f.add(base + '/videoExample.mp4', 'actual-video-binary');
    f.add(base + '/poster.webp', 'actual-poster');
    f.add(base + '/locale/uk.mp4', 'uk-video');
    f.add(base + '/locale/uk.poster.webp', 'uk-poster');
    f.add(base + '/specification.md', '# authoring only');
    assert.equal(stageLessonMedia({ ...f, textbookId: 'math' }), 4);
    assert.equal(fs.readFileSync(f.destination(base + '/videoExample.mp4'), 'utf8'), 'actual-video-binary');
    assert.equal(fs.readFileSync(f.destination(base + '/locale/uk.poster.webp'), 'utf8'), 'uk-poster');
    assert.equal(fs.existsSync(f.destination(base + '/specification.md')), false);
    assert.equal(fs.readFileSync(path.join(f.textbookRoot, 'data/lessons', base, 'specification.md'), 'utf8'),
      '# authoring only');
  }));

test('rejects ambiguous extensions before copying any media', () =>
  fixture(f => {
    f.add(base + '/videoExample.mp4', 'first');
    f.add(base + '/videoExample.webm', 'second');
    assert.throws(() => stageLessonMedia({ ...f, textbookId: 'math' }),
      /Ambiguous Lesson media extensions/);
    assert.equal(fs.existsSync(f.destination(base + '/videoExample.mp4')), false);
  }));

test('rejects invalid media naming, stale UUID buckets and absent defining modules', () =>
  fixture(f => {
    f.add(base + '/stray.mp4', 'invalid');
    assert.throws(() => stageLessonMedia({ ...f, textbookId: 'math' }),
      /Unexpected Lesson media file naming/);
  }));

test('refuses to overwrite already staged public/static media', () =>
  fixture(f => {
    const filename = base + '/videoExample.mp4';
    f.add(filename, 'source');
    fs.mkdirSync(path.dirname(f.destination(filename)), { recursive: true });
    fs.writeFileSync(f.destination(filename), 'pre-existing');
    assert.throws(() => stageLessonMedia({ ...f, textbookId: 'math' }),
      /Duplicate textbook Lesson media publication/);
    assert.equal(fs.readFileSync(f.destination(filename), 'utf8'), 'pre-existing');
  }));
