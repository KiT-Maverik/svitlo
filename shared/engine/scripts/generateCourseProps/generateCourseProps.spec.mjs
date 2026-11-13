import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { publish, readCurrent } from './generateCourseProps.mjs';

const id = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';

test('Course batch publisher atomically replaces owned output and cleans stale resources', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-courses-cli-'));
  const root = path.join(home, 'generated', 'courses');
  const files = new Map([
    [id + '/base.json', '{"type":"course"}\n'],
    [id + '/uk.json', '{"locale":{"title":"Курс"}}\n'],
  ]);
  try {
    publish(root, files);
    assert.deepEqual([...readCurrent(root)], [...files]);
    fs.writeFileSync(path.join(root, id, 'stale.json'), '{}');
    fs.writeFileSync(path.join(home, 'unrelated.txt'), 'preserve');
    publish(root, files);
    assert.deepEqual([...readCurrent(root)], [...files]);
    assert.equal(fs.readFileSync(path.join(home, 'unrelated.txt'), 'utf8'), 'preserve');
    assert.equal(fs.existsSync(path.join(root, id, 'stale.json')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course batch publisher rejects unsafe paths and output symlinks', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-courses-safety-'));
  const root = path.join(home, 'courses');
  try {
    assert.throws(() => publish(root, new Map([['../escape.json', '{}']])), /Invalid generated Course path/);
    assert.equal(fs.existsSync(root), false, 'invalid content must not be published');
    fs.symlinkSync(home, root);
    assert.throws(() => publish(root, new Map([[id + '/base.json', '{}']])), /non-directory Course output/);
    assert.throws(() => readCurrent(root), /Symlink/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
