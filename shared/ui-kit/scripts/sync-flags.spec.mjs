import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
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
    mkdirSync(join(target, 'public/flags'), { recursive: true });
    writeFileSync(join(target, 'public/flags/stale.svg'), '<svg />');
    writeFileSync(join(target, 'public/robots.txt'), 'host-owned');
    const command = spawnSync(process.execPath, [script], { cwd: target, encoding: 'utf8' });
    assert.equal(command.status, 0, command.stderr);
    assert(existsSync(join(target, 'public/flags')));
    assert(readdirSync(join(target, 'public/flags')).some(file => file.endsWith('.svg')));
    assert(!existsSync(join(target, 'public/flags/stale.svg')), 'stale UI Kit flags must be removed');
    assert.equal(readFileSync(join(target, 'public/robots.txt'), 'utf8'), 'host-owned');
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test('legacy Node --import preload still synchronizes standalone workspace flags', () => {
  const target = mkdtempSync(join(tmpdir(), 'svitlo-standalone-flags-'));
  try {
    writeFileSync(join(target, 'package.json'), JSON.stringify({ name: '@svitlo/standalone-test' }));
    const command = spawnSync(process.execPath, ['--import', pathToFileURL(script).href, '--eval', ''], {
      cwd: target,
      encoding: 'utf8',
    });
    assert.equal(command.status, 0, command.stderr);
    assert(readdirSync(join(target, 'public/flags')).some(file => file.endsWith('.svg')));
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test('normal imports have no implicit asset-copy side effects', () => {
  const target = mkdtempSync(join(tmpdir(), 'svitlo-import-flags-'));
  try {
    const command = spawnSync(process.execPath,
      ['--input-type=module', '--eval', `await import(${JSON.stringify(pathToFileURL(script).href)})`],
      { cwd: target, encoding: 'utf8' },
    );
    assert.equal(command.status, 0, command.stderr);
    assert(!existsSync(join(target, 'public')), 'importing the module should not create public assets');
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});
