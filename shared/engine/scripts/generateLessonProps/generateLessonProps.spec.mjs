import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { check } from './generateLessonProps.mjs';

test('Lesson CLI check is read-only and detects missing, modified, and stale files', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-cli-'));
  const root = path.join(home, 'generated', 'lessons');
  const relative = 'c/d3048d21-8690-5255-b62c-984c69ac272c/base.json';
  const files = new Map([[relative, '{"type":"lesson"}\n']]);
  try {
    assert.throws(() => check(root, files), /Generated Lessons differ/);
    assert.equal(fs.existsSync(root), false, 'check mode must not create output');
    fs.mkdirSync(path.dirname(path.join(root, relative)), { recursive: true });
    fs.writeFileSync(path.join(root, relative), files.get(relative));
    assert.doesNotThrow(() => check(root, files));
    fs.writeFileSync(path.join(root, relative), 'outdated');
    assert.throws(() => check(root, files), /changed/);
    fs.writeFileSync(path.join(root, relative), files.get(relative));
    fs.writeFileSync(path.join(root, 'stale.json'), '{}');
    assert.throws(() => check(root, files), /stale/);
    assert.equal(fs.readFileSync(path.join(root, 'stale.json'), 'utf8'), '{}');
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Lesson CLI check rejects symlinks in the generated tree', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-symlink-'));
  try {
    const root = path.join(home, 'lessons');
    fs.mkdirSync(root);
    fs.symlinkSync(home, path.join(root, 'linked'));
    assert.throws(() => check(root, new Map()), /Unexpected symlink/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
