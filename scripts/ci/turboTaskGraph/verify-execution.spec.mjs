import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const turbo = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'turbo.cmd' : 'turbo');
const upstream = '@svitlo/turbo-smoke-upstream';
const downstream = '@svitlo/turbo-smoke-downstream';
const json = (directory, name, value) => writeFileSync(join(directory, name), JSON.stringify(value, null, 2) + '\n');

/**
 * Real Turbo OSS scheduling, not a reimplementation of its graph rules.
 * Intentionally broken upstream writes a marker and exits with an error;
 * an artifact-producing downstream must never run after that failure.
 */
test('real Turbo fails closed on a failed prerequisite, then runs the same graph when repaired', t => {
  assert.ok(existsSync(turbo), 'The executable negative smoke test requires npm ci and the pinned Turbo binary');
  const dir = mkdtempSync(join(tmpdir(), 'svitlo-turbo-fail-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const upstreamDir = join(dir, 'packages', 'upstream');
  const downstreamDir = join(dir, 'packages', 'downstream');
  mkdirSync(upstreamDir, { recursive: true });
  mkdirSync(downstreamDir, { recursive: true });
  json(dir, 'package.json', {
    name: 'svitlo-turbo-failure-fixture',
    version: '0.0.0',
    private: true,
    packageManager: 'npm@11.20.0',
    workspaces: ['packages/*'],
  });
  json(dir, 'package-lock.json', {
    name: 'svitlo-turbo-failure-fixture',
    version: '0.0.0',
    lockfileVersion: 3,
    requires: true,
    packages: {
      '': {
        name: 'svitlo-turbo-failure-fixture',
        version: '0.0.0',
        workspaces: ['packages/*'],
      },
      'node_modules/@svitlo/turbo-smoke-upstream': { resolved: 'packages/upstream', link: true },
      'node_modules/@svitlo/turbo-smoke-downstream': { resolved: 'packages/downstream', link: true },
      'packages/upstream': { name: upstream, version: '0.0.0' },
      'packages/downstream': {
        name: downstream,
        version: '0.0.0',
        dependencies: { [upstream]: '0.0.0' },
      },
    },
  });
  json(dir, 'turbo.json', {
    $schema: 'https://turborepo.dev/schema.json',
    envMode: 'loose',
    tasks: { 'package:build': { dependsOn: ['^package:build'], outputs: ['dist/**'], cache: false } },
    remoteCache: { enabled: false },
  });
  json(upstreamDir, 'package.json', {
    name: upstream,
    version: '0.0.0',
    private: true,
    scripts: { 'package:build': 'node build.mjs' },
  });
  json(downstreamDir, 'package.json', {
    name: downstream,
    version: '0.0.0',
    private: true,
    scripts: { 'package:build': 'node build.mjs' },
    dependencies: { [upstream]: '0.0.0' },
  });
  writeFileSync(
    join(upstreamDir, 'build.mjs'),
    [
      "import { writeFileSync } from 'node:fs';",
      "writeFileSync('build-started.txt', 'yes');",
      "if (process.env.SVITLO_TURBO_SMOKE_FAIL === '1') process.exit(23);",
      '',
    ].join('\n'),
  );
  writeFileSync(
    join(downstreamDir, 'build.mjs'),
    [
      "import { mkdirSync, writeFileSync } from 'node:fs';",
      "mkdirSync('dist', { recursive: true });",
      "writeFileSync('dist/ready.js', 'export const ready = true;\\n');",
      '',
    ].join('\n'),
  );

  function run(fail) {
    const outcome = spawnSync(
      turbo,
      ['run', 'package:build', '--filter=' + downstream, '--concurrency=2', '--cache=local:,remote:'],
      {
        cwd: dir,
        env: { ...process.env, SVITLO_TURBO_SMOKE_FAIL: fail ? '1' : '0' },
        encoding: 'utf8',
        timeout: 60000,
        maxBuffer: 1024 * 1024,
        shell: process.platform === 'win32',
      },
    );
    assert.ifError(outcome.error);
    const diagnostics = (outcome.stderr || '') + '\n' + (outcome.stdout || '');
    assert.notEqual(outcome.signal, 'SIGTERM', diagnostics.slice(-1800));
    return { outcome, diagnostics };
  }

  const failed = run(true);
  assert.notEqual(failed.outcome.status, 0, 'Turbo masked upstream failure: ' + failed.diagnostics.slice(-1800));
  assert.ok(existsSync(join(upstreamDir, 'build-started.txt')), 'Prerequisite must actually execute');
  assert.equal(
    existsSync(join(downstreamDir, 'dist', 'ready.js')),
    false,
    'A failed prerequisite must prevent dependent compiled artifacts and the export gate',
  );

  const repaired = run(false);
  assert.equal(repaired.outcome.status, 0, 'Repaired graph must succeed: ' + repaired.diagnostics.slice(-1800));
  assert.ok(
    existsSync(join(downstreamDir, 'dist', 'ready.js')),
    'Successful prerequisites must allow downstream artifacts',
  );
});
