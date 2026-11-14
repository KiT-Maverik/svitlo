import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { check } from './generateLessonProps.mjs';
import { publishLessonProps } from './publishLessonProps.mjs';

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

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const baseFile = 'c/' + lessonId + '/base.json';
const ukFile = 'c/' + lessonId + '/uk.json';

test('Lesson publication swaps the complete tree, removes stale files, and preserves siblings', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-publish-'));
  const root = path.join(home, 'generated', 'lessons');
  const initial = new Map([[baseFile, '{"type":"lesson","version":1}\n']]);
  const updated = new Map([
    [baseFile, '{"type":"lesson","version":2}\n'],
    [ukFile, '{"locale":{"title":"Світло"}}\n'],
  ]);
  try {
    publishLessonProps(root, initial);
    assert.doesNotThrow(() => check(root, initial));
    fs.writeFileSync(path.join(root, 'stale.json'), '{}');
    fs.writeFileSync(path.join(home, 'untouched.txt'), 'keep');
    publishLessonProps(root, updated);
    assert.doesNotThrow(() => check(root, updated));
    assert.equal(fs.readFileSync(path.join(root, baseFile), 'utf8'), updated.get(baseFile));
    assert.equal(fs.readFileSync(path.join(root, ukFile), 'utf8'), updated.get(ukFile));
    assert.equal(fs.existsSync(path.join(root, 'stale.json')), false);
    assert.equal(fs.readFileSync(path.join(home, 'untouched.txt'), 'utf8'), 'keep');
    publishLessonProps(root, updated);
    assert.doesNotThrow(() => check(root, updated), 'regeneration must be byte-deterministic');
    assert.deepEqual(fs.readdirSync(path.join(home, 'generated')), ['lessons']);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Lesson publisher rejects traversal, incorrect UUID buckets, and invalid file bodies before writing', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-paths-'));
  const root = path.join(home, 'lessons');
  try {
    for (const filename of ['../outside.json', 'd/' + lessonId + '/base.json', baseFile + '/child']) {
      assert.throws(
        () => publishLessonProps(root, new Map([[filename, '{}']])),
        /Invalid generated Lesson path/,
      );
    }
    assert.throws(
      () => publishLessonProps(root, new Map([[baseFile, undefined]])),
      /Invalid generated Lesson body/,
    );
    assert.throws(() => check(root, new Map([['../outside.json', '{}']])), /Invalid generated Lesson path/);
    assert.equal(fs.existsSync(root), false);
    assert.equal(fs.existsSync(path.join(home, 'outside.json')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Lesson publisher and check reject output symlinks, symlink ancestors, and nested symlinks', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-link-'));
  const outside = path.join(home, 'outside');
  const output = path.join(home, 'lessons');
  const files = new Map([[baseFile, '{}\n']]);
  try {
    fs.mkdirSync(outside);
    fs.symlinkSync(outside, output);
    assert.throws(() => publishLessonProps(output, files), /Symlink in generated path/);
    assert.throws(() => check(output, files), /Symlink in generated path/);
    fs.unlinkSync(output);

    fs.symlinkSync(outside, path.join(home, 'alias'));
    const escaped = path.join(home, 'alias', 'lessons');
    assert.throws(() => publishLessonProps(escaped, files), /Symlink in generated path/);
    assert.throws(() => check(escaped, files), /Symlink in generated path/);
    assert.equal(fs.existsSync(path.join(outside, 'lessons')), false);

    publishLessonProps(output, files);
    fs.symlinkSync(outside, path.join(output, 'linked'));
    assert.throws(() => publishLessonProps(output, files), /Unexpected symlink in generated Lessons/);
    assert.throws(() => check(output, files), /Unexpected symlink in generated Lessons/);
    assert.equal(fs.readFileSync(path.join(output, baseFile), 'utf8'), files.get(baseFile));
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Lesson publisher leaves the previous tree intact when staging fails partway through', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-interrupt-'));
  const root = path.join(home, 'lessons');
  const original = new Map([[baseFile, 'original\n']]);
  const next = new Map([[baseFile, 'replacement\n'], [ukFile, 'translation\n']]);
  try {
    publishLessonProps(root, original);
    const write = fs.writeFileSync;
    let stagedWrites = 0;
    try {
      fs.writeFileSync = (...args) => {
        if (String(args[0]).includes('.lessons-staging-') && ++stagedWrites === 2) {
          throw new Error('Injected staging failure');
        }
        return write(...args);
      };
      assert.throws(() => publishLessonProps(root, next), /Injected staging failure/);
    } finally {
      fs.writeFileSync = write;
    }
    assert.doesNotThrow(() => check(root, original));
    assert.deepEqual(fs.readdirSync(home), ['lessons'], 'no partial staging directory should remain');
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Lesson publisher restores the previous tree when the final rename fails', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lessons-rollback-'));
  const root = path.join(home, 'lessons');
  const original = new Map([[baseFile, 'original\n']]);
  const replacement = new Map([[baseFile, 'replacement\n']]);
  try {
    publishLessonProps(root, original);
    const rename = fs.renameSync;
    try {
      fs.renameSync = (from, to) => {
        if (path.basename(from).startsWith('.lessons-staging-') && to === root) {
          throw new Error('Injected final rename failure');
        }
        return rename(from, to);
      };
      assert.throws(() => publishLessonProps(root, replacement), /Injected final rename failure/);
    } finally {
      fs.renameSync = rename;
    }
    assert.doesNotThrow(() => check(root, original));
    assert.deepEqual(fs.readdirSync(home), ['lessons'], 'backup must have been restored');
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
