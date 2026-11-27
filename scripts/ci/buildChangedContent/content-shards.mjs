#!/usr/bin/env node
/**
 * @fileoverview Deterministic, bounded content sharding for CI.
 * Each selected package keeps its own publication and portability validation.
 */
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
// Per-book build/verify durations (seconds), observed in successful run 44605135850.
// These are planning hints, not promises or performance test results.
const observedSeconds = {
  'content/art': 15.2,
  'content/astronomy': 10.9,
  'content/biology': 12.4,
  'content/chemistry': 14.2,
  'content/economics': 18.4,
  'content/engineering': 21.5,
  'content/geography': 11.6,
  'content/health-safety': 17.7,
  'content/history': 12.1,
  'content/informatics': 15.5,
  'content/language-literature': 9.2,
  'content/languages/ukrainian': 10.4,
  'content/math': 21.6,
  'content/philosophy': 11.9,
  'content/physics': 14.5,
  'content/playground': 29.9,
  'content/psychology': 10,
};

function validatePackage(item) {
  if (
    !item ||
    typeof item.path !== 'string' ||
    !/^content\/(?:languages\/)?[a-z][a-z0-9-]*$/.test(item.path) ||
    !['content', 'agent'].includes(item.kind)
  ) {
    throw new Error('Invalid content matrix package: ' + JSON.stringify(item));
  }
  return { path: item.path, kind: item.kind };
}

/** Rejects missing, duplicated or unexpected workspaces, including a changed kind. */
export function validateShardCoverage(selected, shards) {
  if (!Array.isArray(selected) || !Array.isArray(shards)) throw new Error('Invalid shard coverage inputs');
  const expected = new Set();
  const expectedPaths = new Set();
  for (const item of selected) {
    const { path, kind } = validatePackage(item);
    const key = path + '#' + kind;
    if (expectedPaths.has(path)) throw new Error('Duplicate selected content package: ' + path);
    expectedPaths.add(path);
    expected.add(key);
  }
  const actual = new Set();
  const actualPaths = new Set();
  for (const shard of shards) {
    if (!Array.isArray(shard.packages) || !shard.packages.length) throw new Error('Empty or invalid shard');
    for (const item of shard.packages) {
      const { path, kind } = validatePackage(item);
      const key = path + '#' + kind;
      if (actualPaths.has(path)) throw new Error('Duplicate shard content package: ' + path);
      if (!expected.has(key)) throw new Error('Unexpected shard content package: ' + path);
      actualPaths.add(path);
      actual.add(key);
    }
  }
  for (const key of expected) if (!actual.has(key)) throw new Error('Missing shard content package: ' + key);
}

/** Stable longest-processing-time-first distribution; never changes the selected scope. */
export function planContentShards(selected, maxShards = 3) {
  if (!Array.isArray(selected) || !Number.isInteger(maxShards) || maxShards < 1 || maxShards > 5) {
    throw new Error('Expected selected packages and shard limit 1..5');
  }
  // Validate even for a zero/one-selected workload.
  validateShardCoverage(
    selected,
    selected.map(item => ({ packages: [item] })),
  );
  if (!selected.length) return { include: [] };
  const shards = Array.from({ length: Math.min(maxShards, selected.length) }, (_, i) => ({
    id: 'shard-' + (i + 1),
    packages: [],
    seconds: 0,
  }));
  const ordered = selected
    .map(validatePackage)
    .sort((a, b) => (observedSeconds[b.path] || 15) - (observedSeconds[a.path] || 15) || a.path.localeCompare(b.path));
  for (const item of ordered) {
    shards.sort((a, b) => a.seconds - b.seconds || a.packages.length - b.packages.length || a.id.localeCompare(b.id));
    shards[0].packages.push(item);
    shards[0].seconds += observedSeconds[item.path] || 15;
  }
  shards.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  const matrix = { include: shards.map(({ id, packages }) => ({ id, packages })) };
  validateShardCoverage(selected, matrix.include);
  return matrix;
}

/** Execute every selected package even if another one fails; the caller exits nonzero. */
export function runContentShard(packages, launch = spawnSync, reporter = console) {
  validateShardCoverage(
    packages,
    packages.map(item => ({ packages: [item] })),
  );
  if (!packages.length) throw new Error('Refusing an empty content shard');
  const failed = [];
  for (const item of packages) {
    reporter.log('::group::Content package ' + item.path);
    let result;
    try {
      result = launch(
        process.execPath,
        [
          'scripts/ci/quietRun/quiet-run.mjs',
          '--',
          process.execPath,
          'scripts/ci/buildChangedContent/build-changed-content.mjs',
          '--package',
          item.path,
          item.kind,
        ],
        {
          cwd: repo,
          stdio: 'inherit',
          env: { ...process.env, SVITLO_CI_LABEL: 'Build and verify ' + item.path },
        },
      );
    } catch (error) {
      result = { error };
    }
    reporter.log('::endgroup::');
    if (result?.error || result?.status !== 0) {
      failed.push(item.path);
      reporter.error(
        '::error title=' +
          item.path +
          '::Content verification failed; expand this package group for bounded diagnostics',
      );
    }
  }
  if (failed.length) reporter.error('Failed content packages: ' + failed.join(', '));
  else reporter.log('Verified ' + packages.length + ' content packages in this shard');
  return failed;
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    if (process.argv.length !== 2) throw new Error('Usage: node content-shards.mjs');
    const packages = JSON.parse(process.env.CONTENT_SHARD_PACKAGES || 'null');
    if (!Array.isArray(packages)) throw new Error('CONTENT_SHARD_PACKAGES must be a JSON array');
    if (runContentShard(packages).length) process.exitCode = 1;
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
