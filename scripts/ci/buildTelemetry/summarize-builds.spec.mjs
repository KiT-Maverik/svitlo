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

test('empty logs do not claim compilation occurred', () => {
  assert.deepEqual(summarizeBuilds(''), { total: 0, rows: [] });
  assert.match(formatBuildSummary(summarizeBuilds('')), /No instrumented build commands/);
});

test('invalid and negative build telemetry is rejected as a diagnostic', () => {
  assert.throws(() => summarizeBuilds('invalid'), /JSON/);
  assert.throws(() => summarizeBuilds(sample('@svitlo/engine', 'built', -1)), /Invalid/);
  assert.throws(() => summarizeBuilds(sample('@svitlo/engine', 'skipped', 10)), /Invalid/);
});
