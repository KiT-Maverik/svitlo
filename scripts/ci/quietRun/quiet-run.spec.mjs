import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { failureExcerpt, isDirectCliInvocation, resolveSpawnCommand } from './quiet-run.mjs';

const script = fileURLToPath(new URL('./quiet-run.mjs', import.meta.url));
const invoke = (source, extraEnv = {}) =>
  spawnSync(process.execPath, [script, '--', process.execPath, '-e', source], {
    encoding: 'utf8',
    env: { ...process.env, ...extraEnv, GITHUB_STEP_SUMMARY: '' },
  });

test('successful command emits summary without child stdout', () => {
  const result = invoke("console.log('many many lines')");
  assert.equal(result.status, 0);
  assert.match(result.stdout, /PASS/);
  assert.doesNotMatch(result.stdout, /many many lines/);
});

test('failure retains exit status and diagnostic', () => {
  const result = invoke("console.error('Error: exact failure'); process.exit(7)");
  assert.equal(result.status, 7);
  assert.match(result.stderr, /FAIL/);
  assert.match(result.stderr, /Error: exact failure/);
});

test('verbose opt-in streams child stdout', () => {
  const result = invoke("console.log('debug details')", { SVITLO_CI_VERBOSE: '1' });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /debug details/);
});

test('successful command preserves workflow warning annotations without noisy stdout', () => {
  const result = invoke(
    "console.log('ordinary noise'); console.log('::warning file=example.ts,line=4::review needed')",
  );
  assert.equal(result.status, 0);
  assert.match(result.stdout, /::warning file=example\.ts,line=4::review needed/);
  assert.doesNotMatch(result.stdout, /ordinary noise/);
});

test('failing command retains workflow error annotation and exact exit status', () => {
  const result = invoke(
    "console.error('::error file=example.ts,line=5::first cause'); process.exit(9)",
  );
  assert.equal(result.status, 9);
  assert.match(result.stderr, /::error file=example\.ts,line=5::first cause/);
});

test('wrapped commands retain file-based GitHub output protocol', t => {
  const folder = mkdtempSync(join(tmpdir(), 'svitlo-github-output-'));
  t.after(() => rmSync(folder, { recursive: true, force: true }));
  const output = join(folder, 'output');
  const result = invoke(
    "require('node:fs').appendFileSync(process.env.GITHUB_OUTPUT, 'status=ready\\n')",
    { GITHUB_OUTPUT: output },
  );
  assert.equal(result.status, 0);
  assert.equal(readFileSync(output, 'utf8'), 'status=ready\n');
});

test('signal-terminated commands fail and identify the signal', { skip: process.platform === 'win32' }, () => {
  const result = invoke("process.kill(process.pid, 'SIGTERM')");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /FAIL/);
  assert.match(result.stderr, /SIGTERM/);
});

test('failure excerpt is bounded and contains earlier TypeScript errors', () => {
  const text = 'error TS1234: useful\n' + 'noise\n'.repeat(10000);
  assert.ok(failureExcerpt(text).length <= 12000);
  assert.match(failureExcerpt(text), /error TS1234/);
});

test('early failure diagnostic survives logs larger than the output tail buffer', () => {
  const result = invoke(
    "console.error('Error: early diagnostic'); console.log('noise\\n'.repeat(27000)); process.exit(1)",
  );
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Error: early diagnostic/);
  assert.ok(result.stderr.length < 14000);
});

test('direct quiet-run CLI detection accepts both POSIX and Windows path separators', () => {
  assert.equal(isDirectCliInvocation('/opt/tools/quiet-run.mjs'), true);
  assert.equal(isDirectCliInvocation('C:\\repo\\scripts\\ci\\quietRun\\quiet-run.mjs'), true);
  assert.equal(isDirectCliInvocation('/opt/tools/other-script.mjs'), false);
});

test('on Windows npm uses the installed JS CLI directly, never a command shell', t => {
  const folder = mkdtempSync(join(tmpdir(), 'svitlo-npm-cli-'));
  t.after(() => rmSync(folder, { recursive: true, force: true }));
  const cli = join(folder, 'npm-cli.js');
  writeFileSync(cli, '');
  const resolved = resolveSpawnCommand('npm', ['ci', '--no-audit'], {
    platform: 'win32',
    node: 'C:\\node\\node.exe',
    npmCli: cli,
  });
  assert.equal(resolved.command, 'C:\\node\\node.exe');
  assert.deepEqual(resolved.args, [cli, 'ci', '--no-audit']);
  assert.deepEqual(resolveSpawnCommand('node', ['script.js'], { platform: 'win32' }), {
    command: 'node',
    args: ['script.js'],
  });
  assert.deepEqual(resolveSpawnCommand('npm', ['ci'], { platform: 'linux' }), {
    command: 'npm',
    args: ['ci'],
  });
});

test('missing Windows npm CLI fails loudly instead of skipping npm or invoking a shell', () => {
  assert.throws(
    () =>
      resolveSpawnCommand('npm', ['ci'], {
        platform: 'win32',
        node: 'Z:\\missing\\node.exe',
        npmCli: 'Z:\\missing\\npm-cli.js',
      }),
    /Cannot locate npm-cli.js/,
  );
});
