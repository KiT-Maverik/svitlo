import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const script = fileURLToPath(new URL('./sync-flags.mjs', import.meta.url));
const repoRoot = resolve(fileURLToPath(new URL('../../../', import.meta.url)));

test('flag synchronization refuses to create a root public folder', () => {
  const command = spawnSync(process.execPath, [script], { cwd: repoRoot, encoding: 'utf8' });
  assert.notEqual(command.status, 0);
  assert.match(command.stderr, /Refusing to create public\/flags/);
});

test('flag synchronization still works from a target workspace', () => {
  const target = mkdtempSync(join(tmpdir(), 'svitlo-flags-'));
  try {
    writeFileSync(join(target, 'package.json'), JSON.stringify({ name: '@svitlo/flag-test' }));
    const command = spawnSync(process.execPath, [script], { cwd: target, encoding: 'utf8' });
    assert.equal(command.status, 0, command.stderr);
    assert(existsSync(join(target, 'public/flags')));
    assert(readdirSync(join(target, 'public/flags')).some(file => file.endsWith('.svg')));
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});
