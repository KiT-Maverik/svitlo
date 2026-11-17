import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { stageTextbookAssets } from './stageTextbookAssets.mjs';

function fixture(fn) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-uuid-media-'));
  const textbookRoot = path.join(home, 'content', 'math');
  const staticRoot = path.join(home, 'dist', 'static');
  fs.mkdirSync(textbookRoot, { recursive: true });
  const make = (relative, body = 'media') => {
    const file = path.join(textbookRoot, 'assets', relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, body);
    return file;
  };
  try {
    fn({ textbookRoot, staticRoot, make });
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
}

const id = '550e8400-e29b-41d4-a716-446655440000';

test('copies entire textbook assets tree, including unused and reused files', () =>
  fixture(f => {
    f.make('images/' + id + '.webp', 'image bytes');
    f.make('audio/' + id + '.mp3', 'audio bytes');
    assert.equal(stageTextbookAssets({ ...f, textbookId: 'math' }), 2);
    assert.equal(
      fs.readFileSync(path.join(f.staticRoot, 'textbooks/math/assets/images/' + id + '.webp'), 'utf8'),
      'image bytes',
    );
    assert.equal(
      fs.readFileSync(path.join(f.staticRoot, 'textbooks/math/assets/audio/' + id + '.mp3'), 'utf8'),
      'audio bytes',
    );
    assert.equal(fs.readFileSync(path.join(f.textbookRoot, 'assets/images/' + id + '.webp'), 'utf8'), 'image bytes');
  }));

test('missing assets directory is safe for a textbook without media', () =>
  fixture(f => {
    assert.equal(stageTextbookAssets({ ...f, textbookId: 'math' }), 0);
    assert.equal(fs.existsSync(f.staticRoot), false);
  }));

test('source and destination symlinks, invalid categories and nested source files are rejected', () =>
  fixture(f => {
    const source = f.make('images/' + id + '.webp');
    fs.symlinkSync(source, path.join(f.textbookRoot, 'assets/images/other.webp'));
    assert.throws(() => stageTextbookAssets({ ...f, textbookId: 'math' }), /Symlink/);
    fs.rmSync(path.join(f.textbookRoot, 'assets/images/other.webp'));
    f.make('invalid/' + id + '.webp');
    assert.throws(() => stageTextbookAssets({ ...f, textbookId: 'math' }), /Unexpected textbook media category/);
    fs.rmSync(path.join(f.textbookRoot, 'assets/invalid'), { recursive: true });
    f.make('images/nested/' + id + '.webp');
    assert.throws(() => stageTextbookAssets({ ...f, textbookId: 'math' }), /Nested textbook media path/);
    fs.rmSync(path.join(f.textbookRoot, 'assets/images/nested'), { recursive: true });
    fs.mkdirSync(path.join(f.staticRoot, 'textbooks/math/assets/images'), { recursive: true });
    fs.writeFileSync(path.join(f.staticRoot, 'textbooks/math/assets/images/' + id + '.webp'), 'owned');
    assert.throws(() => stageTextbookAssets({ ...f, textbookId: 'math' }), /Duplicate textbook assets publication/);
  }));

test('collision preflight does not partially copy any assets', () =>
  fixture(f => {
    const one = '450e8400-e29b-41d4-a716-446655440000.webp';
    const two = '650e8400-e29b-41d4-a716-446655440000.webp';
    f.make('images/' + one);
    f.make('images/' + two);
    const destination = path.join(f.staticRoot, 'textbooks/math/assets/images/' + two);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, 'existing');
    assert.throws(() => stageTextbookAssets({ ...f, textbookId: 'math' }), /Duplicate/);
    assert.equal(fs.existsSync(path.join(f.staticRoot, 'textbooks/math/assets/images/' + one)), false);
  }));
