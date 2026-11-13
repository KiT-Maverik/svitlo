#!/usr/bin/env node
/**
 * On-demand Engine coverage runner.
 *
 * Reuses the standard package test glob list, produces source-map-aware LCOV,
 * and exports only gaps for agents. It never rewrites the authored source tree.
 */
import fs, { globSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildGapReport, collectCoverageTargets } from './report.mjs';

const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.join(engineRoot, '.coverage-engine');

function run(executable, args) {
  const child = spawnSync(executable, args, { cwd: engineRoot, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (child.error || child.status !== 0) {
    if (child.stdout) process.stderr.write(child.stdout.slice(-15000));
    if (child.stderr) process.stderr.write(child.stderr.slice(-15000));
    const outputLog = path.join(output, 'test-results.txt');
    if (fs.existsSync(outputLog)) process.stderr.write(fs.readFileSync(outputLog, 'utf8').slice(-15000));
    throw new Error('Engine coverage command failed: ' + executable + ' (exit ' + child.status + ')');
  }
  if (child.stderr) process.stderr.write(child.stderr.slice(0, 3000));
}

function testPaths() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(engineRoot, 'package.json'), 'utf8'));
  const command = packageJson.scripts?.test;
  if (typeof command !== 'string') throw new Error('Missing Engine test command');
  const marker = ' && node --test ';
  const index = command.indexOf(marker);
  if (index < 0) throw new Error('Unsupported Engine test command: expected existing node --test invocation');
  const patterns = command.slice(index + marker.length).trim().split(/\s+/);
  const files = new Set();
  for (const pattern of patterns) {
    if (!/^(?:\.test-build|generators|scripts)\/[a-zA-Z0-9_.*\/-]+\.spec\.(?:js|mjs)$/.test(pattern)) {
      throw new Error('Unexpected Engine test glob: ' + pattern);
    }
    const matches = globSync(pattern, { cwd: engineRoot }).sort();
    // The standard Node test runner tolerates unmatched globs in transitional folders.
    if (!matches.length) continue;
    for (const file of matches) files.add(file);
  }
  if (!files.size) throw new Error('No Engine tests selected');
  return [...files].sort();
}

function readChangedPaths() {
  const input = process.env.ENGINE_COVERAGE_CHANGED_FILE;
  if (!input) return [];
  return fs.readFileSync(input, 'utf8').split('\0').filter(Boolean);
}

function main() {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  run(process.execPath, [path.resolve(engineRoot, '../../node_modules/typescript/bin/tsc'), '-p', 'tsconfig.test.json']);
  const files = testPaths();
  run(process.execPath, [
    '--enable-source-maps',
    '--test',
    '--experimental-test-coverage',
    '--test-reporter=lcov',
    '--test-reporter-destination=' + path.join(output, 'full.lcov'),
    '--test-reporter=dot',
    '--test-reporter-destination=' + path.join(output, 'test-results.txt'),
    ...files,
  ]);

  const targets = collectCoverageTargets(engineRoot);
  if (!targets.length) throw new Error('No eligible Engine production sources discovered');
  const lcov = fs.readFileSync(path.join(output, 'full.lcov'), 'utf8');
  const result = buildGapReport({
    targets,
    lcov,
    engineRoot,
    changed: readChangedPaths(),
    sha: process.env.ENGINE_COVERAGE_SHA ?? '',
  });
  fs.writeFileSync(path.join(output, 'engine-gaps.md'), result.markdown);
  const { markdown: _markdown, ...json } = result;
  fs.writeFileSync(path.join(output, 'engine-gaps.json'), JSON.stringify(json, null, 2) + '\n');

  process.stdout.write(
    'Engine coverage: ' + result.targetFiles + ' targeted; ' + result.filesWithGaps +
    ' with gaps (' + result.notExecutedFiles + ' not executed). ' +
    'Only gaps are exported to .coverage-engine/engine-gaps.{md,json}.\n',
  );
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
