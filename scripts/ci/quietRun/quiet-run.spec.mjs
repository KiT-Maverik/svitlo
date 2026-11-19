import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { failureExcerpt } from './quiet-run.mjs';

const script = fileURLToPath(new URL('./quiet-run.mjs', import.meta.url));
const invoke = (source, extraEnv = {}) => spawnSync(process.execPath,
  [script, '--', process.execPath, '-e', source],
  { encoding: 'utf8', env: { ...process.env, ...extraEnv, GITHUB_STEP_SUMMARY: '' } });

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

test('failure excerpt is bounded and contains earlier TypeScript errors', () => {
  const text = 'error TS1234: useful\n' + 'noise\n'.repeat(10000);
  assert.ok(failureExcerpt(text).length <= 12000);
  assert.match(failureExcerpt(text), /error TS1234/);
});
