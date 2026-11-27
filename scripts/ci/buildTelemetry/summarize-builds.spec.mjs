import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatBuildSummary, summarizeBuilds } from './summarize-builds.mjs';

const sample = (workspace, outcome, durationMs, origin) =>
  JSON.stringify({ schemaVersion: 1, operation: 'package:build', workspace, outcome, durationMs, origin });

test('summarizes direct build and helper reuse distinctly by workspace', () => {
  const summary = summarizeBuilds([
    sample('@svitlo/engine', 'built', 1000, 'content-shard'),
    sample('@svitlo/engine', 'failed', 200, 'content-shard'),
    sample('@svitlo/engine', 'reused', 10),
    sample('@svitlo/math', 'built', 55, 'content-textbook'),
    '',
  ].join('\n'));
  assert.equal(summary.total, 4);
  assert.deepEqual(summary.rows.map(row => [row.key, row.requests, row.built, row.reused, row.failed]), [
    ['content-shard | @svitlo/engine', 2, 1, 0, 1],
    ['content-textbook | @svitlo/math', 1, 1, 0, 0],
    ['reuse-helper | @svitlo/engine', 1, 0, 1, 0],
  ]);
  assert.match(formatBuildSummary(summary), /1\.20/);
  assert.match(formatBuildSummary(summary), /not exhaustive compiler invocations/);
});

test('reports reasons for repeated Engine builds without inferring compiler reuse', () => {
  const sampleReason = (outcome, reason, after) =>
    JSON.stringify({
      schemaVersion: 1,
      operation: 'package:build',
      workspace: '@svitlo/engine',
      outcome,
      durationMs: 42,
      rebuildReason: reason,
      sourceAfterBuildRevision: after,
    });
  const summary = summarizeBuilds([
    sampleReason('built', 'missing-state-record', 'commit-1'),
    sampleReason('built', 'unverified-source', null),
    sampleReason('built', 'unverified-source', null),
    sampleReason('reused', null, null),
    sampleReason('failed', 'missing-or-invalid-dist', null),
  ].join('\n'));
  assert.deepEqual(summary.rows[0].rebuildReasons, {
    'missing-state-record': 1,
    'unverified-source': 2,
    'missing-or-invalid-dist': 1,
  });
  assert.equal(summary.rows[0].unverifiedAfterBuild, 2);
  assert.match(formatBuildSummary(summary), /unverified-source: 2/);
  assert.match(formatBuildSummary(summary), /missing-or-invalid-dist: 1/);
  assert.match(formatBuildSummary(summary), /Unverified after build/);
  assert.match(formatBuildSummary(summary), /\| 2 \|/);
});

test('reuse cannot be reported as having a rebuild reason', () => {
  const invalid = JSON.stringify({
    schemaVersion: 1,
    operation: 'package:build',
    workspace: '@svitlo/engine',
    outcome: 'reused',
    durationMs: 1,
    rebuildReason: 'unverified-source',
  });
  assert.throws(() => summarizeBuilds(invalid), /Invalid rebuild reason/);
});

test('emits bounded tracked file names when Git rejects source reuse', () => {
  const summary = summarizeBuilds([
    JSON.stringify({
      schemaVersion: 1, operation: 'package:build', workspace: '@svitlo/engine',
      outcome: 'built', durationMs: 42, sourceCheck: 'modified-tracked-files',
      dirtyTrackedFiles: ['apps/platform/tsconfig.json'],
    }),
    JSON.stringify({
      schemaVersion: 1, operation: 'package:build', workspace: '@svitlo/engine',
      outcome: 'built', durationMs: 13, sourceCheck: 'modified-tracked-files',
      dirtyTrackedFiles: ['apps/platform/tsconfig.json'],
    }),
    JSON.stringify({
      schemaVersion: 1, operation: 'package:build', workspace: '@svitlo/ui-kit',
      outcome: 'failed', durationMs: 2, sourceCheck: 'git-diff-unavailable',
      dirtyTrackedFiles: [],
    }),
  ].join('\n'));
  assert.deepEqual(summary.rows[0].dirtyTrackedFiles, ['apps/platform/tsconfig.json']);
  assert.equal(summary.rows[0].sourceChecks['modified-tracked-files'], 2);
  const formatted = formatBuildSummary(summary);
  assert.match(formatted, /Git source verification at invalidation/);
  assert.match(formatted, /apps\/platform\/tsconfig\.json/);
  assert.match(formatted, /git-diff-unavailable: 1/);
});

test('empty logs do not claim compilation occurred', () => {
  assert.deepEqual(summarizeBuilds(''), { total: 0, rows: [] });
  assert.match(formatBuildSummary(summarizeBuilds('')), /No instrumented build commands/);
});

test('invalid and negative build telemetry is rejected as a diagnostic', () => {
  assert.throws(() => summarizeBuilds('invalid'), /JSON/);
  assert.throws(() => summarizeBuilds(sample('@svitlo/engine', 'built', -1)), /Invalid/);
  assert.throws(() => summarizeBuilds(sample('@svitlo/engine', 'skipped', 10)), /Invalid/);
});
