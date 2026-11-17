import test from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs } from './sync-course-lessons.mjs';

test('CLI modes cannot share write/read-only flags', () => {
  const sha = 'a'.repeat(40);
  const base = ['--repo', 'KiT-Maverik/svitlo', '--pr', '639', '--sha', sha];
  assert.equal(parseArgs(['analyze', ...base, '--root', '/tmp/checkout', '--out', '/tmp/data.json']).mode, 'analyze');
  assert.equal(parseArgs(['update', ...base, '--report', '/tmp/data.json']).mode, 'update');
  assert.throws(() => parseArgs(['analyze', ...base, '--report', 'x']), /Usage/);
  assert.throws(() => parseArgs(['update', ...base, '--root', '/tmp/checkout', '--report', 'x']), /Usage/);
  assert.throws(() => parseArgs(['update', ...base, '--report', 'x', '--pr', '999']), /Usage/);
  assert.throws(() => parseArgs(['update', ...base, '--report', 'x', '--out', 'evil']), /Usage/);
  assert.throws(
    () => parseArgs(['update', '--repo', '../escape', '--pr', '2', '--sha', sha, '--report', 'x']),
    /Usage/,
  );
});
