import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { publish, readCurrent, discoverCourseSources } from './generateCourseProps.mjs';

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
    assert.throws(() => publish(root, new Map([[id + '/base.json', '{}']])), /Symlink in generated path/);
    assert.throws(() => readCurrent(root), /Symlink/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course batch publisher rejects a symlink in an output ancestor', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-ancestors-'));
  try {
    const real = path.join(home, 'real');
    fs.mkdirSync(real);
    fs.symlinkSync(real, path.join(home, 'alias'), 'dir');
    const output = path.join(home, 'alias/generated/courses');
    assert.throws(() => publish(output, new Map([[id + '/base.json', '{}']])), /Symlink in generated path/);
    assert.throws(() => readCurrent(output), /Symlink in generated path/);
    assert.equal(fs.existsSync(path.join(real, 'generated')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course publisher discovers UUID-bucketed materialized roots but ignores unfinished editorial YAML', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-discovery-'));
  const root = path.join(home, 'data/courses');
  const active = '7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e';
  const pending = '2bc5cf15-9f26-4a16-885b-33c3fa904e8e';
  try {
    fs.mkdirSync(path.join(root, 'e', active), { recursive: true });
    fs.mkdirSync(path.join(root, 'e', pending), { recursive: true });
    fs.mkdirSync(path.join(root, 'sections'), { recursive: true });
    fs.writeFileSync(path.join(root, 'legacyCourse.data.ts'), 'export const course = {};');
    fs.writeFileSync(path.join(root, 'e', active, 'index.ts'), 'export const course = {};');
    fs.writeFileSync(path.join(root, 'e', pending, 'course.yaml'), 'id: ' + pending);
    assert.deepEqual(discoverCourseSources(root), [
      path.join(root, 'e', active, 'index.ts'),
      path.join(root, 'legacyCourse.data.ts'),
    ]);
    assert.deepEqual(discoverCourseSources(path.join(home, 'does-not-exist')), []);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course publisher will not resolve a symlinked UUID entrypoint', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-symlink-'));
  const id = '7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e';
  try {
    const root = path.join(home, 'data/courses');
    const folder = path.join(root, 'e', id);
    fs.mkdirSync(folder, { recursive: true });
    const outside = path.join(home, 'outside.ts');
    fs.writeFileSync(outside, 'export default {};');
    fs.symlinkSync(outside, path.join(folder, 'index.ts'));
    assert.throws(() => discoverCourseSources(root), /Symlink|symlink/i);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
