import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { assertSafeDirectoryPath } from './assertSafeDirectoryPath.mjs';

test('accepts absent generated directories without creating anything', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-safe-path-'));
  try {
    const future = path.join(home, 'generated/skills');
    assert.doesNotThrow(() => assertSafeDirectoryPath(future));
    assert.equal(fs.existsSync(future), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('rejects symlink ancestors, symlink roots and non-directory components', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-unsafe-path-'));
  try {
    const real = path.join(home, 'real');
    fs.mkdirSync(real);
    fs.symlinkSync(real, path.join(home, 'alias'), 'dir');
    assert.throws(() => assertSafeDirectoryPath(path.join(home, 'alias/generated/courses')), /Symlink in generated path/);
    assert.throws(() => assertSafeDirectoryPath(path.join(home, 'alias')), /Symlink in generated path/);
    const file = path.join(home, 'file');
    fs.writeFileSync(file, 'data');
    assert.throws(() => assertSafeDirectoryPath(path.join(file, 'nested')), /Non-directory in generated path/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
