#!/usr/bin/env node
/**
 * @fileoverview Verify manifest-derived Turbo task coverage and prerequisite
 * ordering. This is a read-only graph check, never a scheduler or build runner.
 * The only migrated operations are package:build and code:lint:check.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces } from '../../runWorkspaceScript/run-workspace-script.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
export const turboOperations = Object.freeze(['package:build', 'code:lint:check']);
const readJson = path => JSON.parse(readFileSync(join(repo, path), 'utf8'));

function check(condition, message) {
  if (!condition) throw Error(message);
}

export function verifyTurboConfiguration(root, lock, config) {
  check(/^npm@\d+\.\d+\.\d+$/.test(root.packageManager || ''), 'Root npm packageManager is required');
  check(root.devDependencies?.turbo === '2.11.13', 'Turbo version must be pinned');
  check(lock.packages?.['']?.devDependencies?.turbo === '2.11.13', 'Turbo lockfile root is out of sync');
  for (const name of ['turbo', '@turbo/darwin-64', '@turbo/darwin-arm64', '@turbo/linux-64', '@turbo/linux-arm64', '@turbo/windows-64', '@turbo/windows-arm64']) {
    const item = lock.packages?.['node_modules/' + name];
    check(item?.version === '2.11.13' && /^sha512-/.test(item.integrity || ''), 'Missing verified Turbo lock entry: ' + name);
  }
  check(config.remoteCache?.enabled === false, 'Remote Turbo cache must be disabled');
  for (const operation of turboOperations) {
    const task = config.tasks?.[operation];
    check(Boolean(task), 'Missing Turbo task: ' + operation);
    check(task.cache === false, 'Unverified Turbo caching is forbidden: ' + operation);
    check(JSON.stringify(task.dependsOn) === JSON.stringify(['^package:build']), 'Unsafe task prerequisites: ' + operation);
    check(
      /^turbo run /.test(root.scripts?.[operation] || '') &&
      root.scripts[operation].includes('--cache=local:,remote:'),
      'Root operation must use uncached Turbo: ' + operation,
    );
  }
  check(config.tasks['package:build'].outputs.includes('dist/**'), 'Package output tracking is incomplete');
  return true;
}

/** Check Turbo's actual dry-run, not an independently invented task planner. */
export function verifyTurboGraph(dry, workspaces) {
  check(Array.isArray(workspaces) && workspaces.length > 0, 'No npm workspaces');
  check(Array.isArray(dry?.tasks), 'Missing Turbo dry-run tasks');
  const byName = new Map(workspaces.map(pkg => [pkg.name, pkg]));
  check(byName.size === workspaces.length, 'Duplicate workspace names');
  const expected = new Set();
  const tasks = new Map();
  for (const pkg of workspaces) {
    for (const operation of turboOperations) {
      if (Object.hasOwn(pkg.scripts || {}, operation)) expected.add(pkg.name + '#' + operation);
    }
  }
  check(expected.size > 0, 'No workspaces implement the migrated operations');
  for (const task of dry.tasks) {
    check(task && typeof task.taskId === 'string' && Array.isArray(task.dependencies), 'Malformed Turbo task');
    check(!tasks.has(task.taskId), 'Duplicate Turbo task: ' + task.taskId);
    check(expected.has(task.taskId), 'Unexpected Turbo task or root-script recursion: ' + task.taskId);
    tasks.set(task.taskId, task);
  }
  for (const id of expected) check(tasks.has(id), 'Turbo silently omitted eligible workspace: ' + id);
  for (const [id, task] of tasks) {
    const split = id.lastIndexOf('#');
    const owner = byName.get(id.slice(0, split));
    check(Boolean(owner), 'Unknown task workspace: ' + id);
    const declared = Object.keys({ ...(owner.dependencies || {}), ...(owner.devDependencies || {}) });
    const needed = declared.filter(name => byName.get(name)?.scripts?.['package:build']).map(name => name + '#package:build');
    const dependencies = new Set(task.dependencies);
    for (const dependency of needed) {
      check(dependencies.has(dependency), 'Missing Turbo dependency edge: ' + id + ' -> ' + dependency);
    }
    for (const dependency of dependencies) {
      check(tasks.has(dependency), 'Dangling Turbo prerequisite: ' + id + ' -> ' + dependency);
    }
  }
  const seen = new Set(), visiting = new Set();
  function visit(id) {
    if (visiting.has(id)) throw Error('Cyclic Turbo task graph at ' + id);
    if (seen.has(id)) return;
    visiting.add(id);
    for (const dependency of tasks.get(id).dependencies) visit(dependency);
    visiting.delete(id);
    seen.add(id);
  }
  for (const id of tasks.keys()) visit(id);
  return {
    tasks: expected.size,
    builds: [...expected].filter(id => id.endsWith('#package:build')).length,
    lint: [...expected].filter(id => id.endsWith('#code:lint:check')).length,
  };
}

export function verifyLiveTurboGraph() {
  const root = readJson('package.json'), lock = readJson('package-lock.json'), config = readJson('turbo.json');
  verifyTurboConfiguration(root, lock, config);
  const binary = join(repo, 'node_modules', '.bin', process.platform === 'win32' ? 'turbo.cmd' : 'turbo');
  check(existsSync(binary), 'Run npm ci before verifying Turbo --dry=json');
  const result = spawnSync(binary, ['run', ...turboOperations, '--dry=json', '--cache=local:,remote:'], {
    cwd: repo,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    shell: process.platform === 'win32',
  });
  check(!result.error && result.status === 0, 'Turbo dry-run failed: ' + (result.stderr || result.error?.message || result.status));
  let dry;
  try {
    dry = JSON.parse(result.stdout);
  } catch {
    throw Error('Turbo --dry=json did not return valid JSON');
  }
  return verifyTurboGraph(dry, discoverWorkspaces());
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3 || process.argv[2] !== '--live') {
      throw Error('Usage: node scripts/ci/turboTaskGraph/verify-graph.mjs --live');
    }
    const outcome = verifyLiveTurboGraph();
    console.log('Turbo task graph verified: ' + outcome.tasks + ' tasks (' + outcome.builds + ' builds, ' + outcome.lint + ' lint checks)');
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
