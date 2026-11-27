import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArguments, runBuildCommand } from './record-build-command.mjs';

function fixture(t) {
  const temporary = mkdtempSync(join(tmpdir(), 'svitlo-direct-build-'));
  t.after(() => rmSync(temporary, { recursive: true, force: true }));
  const root = join(temporary, 'checkout');
  mkdirSync(root);
  return { root, file: join(temporary, 'events.jsonl') };
}

test('CLI requires exactly one workspace and labeled command', () => {
  assert.deepEqual(
    parseArguments(['--workspace', '@svitlo/engine', '--origin', 'content-prepare', '--', 'npm', 'run', 'package:build']),
    { workspace: '@svitlo/engine', origin: 'content-prepare', command: 'npm', args: ['run', 'package:build'] },
  );
  assert.throws(() => parseArguments(['--workspace', 'engine']), /Usage/);
});

test('direct compiler command runs once with passive, source-labeled telemetry', t => {
  const f = fixture(t);
  const seen = [];
  runBuildCommand({
    workspace: '@svitlo/engine',
    origin: 'content-shard',
    command: 'npm',
    args: ['run', 'package:build', '--workspace', '@svitlo/engine'],
    root: f.root,
    env: { SVITLO_CI_BUILD_TELEMETRY: f.file, GITHUB_JOB: 'build', GITHUB_SHA: 'commit-1' },
    spawn: (command, args, options) => {
      seen.push({ command, args, options });
      return { status: 0 };
    },
  });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].command, 'npm');
  assert.deepEqual(seen[0].args, ['run', 'package:build', '--workspace', '@svitlo/engine']);
  assert.equal(seen[0].options.cwd, f.root);
  const [record] = readFileSync(f.file, 'utf8').trim().split('\n').map(JSON.parse);
  assert.equal(record.schemaVersion, 1);
  assert.equal(record.workspace, '@svitlo/engine');
  assert.equal(record.origin, 'content-shard');
  assert.equal(record.recordKind, 'direct-build-command');
  assert.equal(record.outcome, 'built');
  assert.equal(record.checkoutSha, 'commit-1');
  assert.deepEqual(record.command, ['npm', 'run', 'package:build', '--workspace', '@svitlo/engine']);
  assert.ok(record.durationMs >= 0);
});

test('an unsuccessful build is recorded as failed and still fails the caller', t => {
  const f = fixture(t);
  assert.throws(
    () => runBuildCommand({
      workspace: '@svitlo/engine', origin: 'content-prepare', command: 'npm', args: ['run'],
      root: f.root, env: { SVITLO_CI_BUILD_TELEMETRY: f.file },
      spawn: () => ({ status: 17 }),
    }),
    /exit 17/,
  );
  assert.equal(JSON.parse(readFileSync(f.file, 'utf8')).outcome, 'failed');
});

test('an unavailable optional sink cannot hide a compiler error or fail a successful build', t => {
  const f = fixture(t);
  const badFile = join(f.root, 'must-not-write.jsonl');
  const oldWarn = console.warn;
  const warnings = [];
  console.warn = (...parts) => warnings.push(parts.join(' '));
  try {
    runBuildCommand({
      workspace: '@svitlo/engine', origin: 'content-shard', command: 'npm', args: ['run'],
      root: f.root, env: { SVITLO_CI_BUILD_TELEMETRY: badFile },
      spawn: () => ({ status: 0 }),
    });
    assert.throws(() => runBuildCommand({
      workspace: '@svitlo/engine', origin: 'content-shard', command: 'npm', args: ['run'],
      root: f.root, env: { SVITLO_CI_BUILD_TELEMETRY: badFile },
      spawn: () => ({ status: 2 }),
    }), /exit 2/);
  } finally {
    console.warn = oldWarn;
  }
  assert.equal(warnings.length, 2);
  assert.ok(warnings.every(line => line.includes('outside the repository')));
});

test('commands are unchanged when telemetry is disabled', t => {
  const f = fixture(t);
  let calls = 0;
  runBuildCommand({
    workspace: '@svitlo/ui-kit', origin: 'content-fallback', command: 'npm', args: ['run'],
    root: f.root, env: {}, spawn: () => { calls++; return { status: 0 }; },
  });
  assert.equal(calls, 1);
});

test('CLI forwards the original command, its exit status and optional JSONL', t => {
  const f = fixture(t);
  const cli = fileURLToPath(new URL('./record-build-command.mjs', import.meta.url));
  const args = ['--workspace', '@svitlo/engine', '--origin', 'content-shard', '--'];
  const env = { ...process.env, SVITLO_CI_BUILD_TELEMETRY: f.file, GITHUB_SHA: 'fixture-head' };
  const ok = spawnSync(process.execPath, [
    cli, ...args, process.execPath, '-e', 'process.stdout.write("original command ran")',
  ], { cwd: f.root, env, encoding: 'utf8' });
  assert.equal(ok.status, 0, ok.stderr);
  assert.match(ok.stdout, /original command ran/);
  const bad = spawnSync(process.execPath, [
    cli, ...args, process.execPath, '-e', 'process.exit(13)',
  ], { cwd: f.root, env, encoding: 'utf8' });
  assert.equal(bad.status, 1, bad.stderr);
  assert.match(bad.stderr, /exit 13/);
  const records = readFileSync(f.file, 'utf8').trim().split('\n').map(JSON.parse);
  assert.deepEqual(records.map(record => record.outcome), ['built', 'failed']);
  assert.ok(records.every(record => record.checkoutSha === 'fixture-head'));
});
