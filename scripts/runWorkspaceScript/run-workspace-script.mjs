#!/usr/bin/env node
/** Dependency-aware npm workspace aggregation. Never implicitly select one app. */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { partitionBuildMutatingHosts, runParallelTypechecks } from './typecheck-scheduler.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const readJson = file => JSON.parse(readFileSync(file, 'utf8'));

export function discoverWorkspaces(root = repo) {
  const manifest = readJson(join(root, 'package.json'));
  const packages = [];
  for (const pattern of manifest.workspaces || []) {
    if (!pattern.endsWith('/*')) throw Error('Unsupported workspace pattern: ' + pattern);
    const folder = pattern.slice(0, -2);
    for (const child of readdirSync(join(root, folder), { withFileTypes: true })) {
      if (!child.isDirectory()) continue;
      const path = join(root, folder, child.name, 'package.json');
      if (!existsSync(path)) continue;
      packages.push({ ...readJson(path), path: folder + '/' + child.name });
    }
  }
  const names = packages.map(pkg => pkg.name);
  if (new Set(names).size !== names.length) throw Error('Duplicate npm workspace names');
  return packages.sort((a, b) => a.name.localeCompare(b.name));
}

function localDeps(pkg, byName) {
  return Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) })
    .filter(name => byName.has(name))
    .sort();
}

export function planWorkspaceOperation(packages, operation, { onlyWorkspaces } = {}) {
  const byName = new Map(packages.map(pkg => [pkg.name, pkg]));
  if (byName.size !== packages.length) throw Error('Duplicate npm workspace names');
  if (onlyWorkspaces !== undefined) {
    if (
      !Array.isArray(onlyWorkspaces) ||
      !onlyWorkspaces.length ||
      new Set(onlyWorkspaces).size !== onlyWorkspaces.length
    ) {
      throw Error('Explicit workspace selection must be a nonempty unique list');
    }
    for (const name of onlyWorkspaces) {
      if (!byName.has(name) || !Object.hasOwn(byName.get(name).scripts || {}, operation)) {
        throw Error('Selected workspace does not implement ' + operation + ': ' + name);
      }
    }
  }
  const selectedNames = onlyWorkspaces === undefined ? null : new Set(onlyWorkspaces);
  const eligible = packages.filter(
    pkg => Object.hasOwn(pkg.scripts || {}, operation) && (!selectedNames || selectedNames.has(pkg.name)),
  );
  if (!eligible.length) throw Error('No workspaces implement ' + operation);
  const order = [];
  const state = new Map();
  function visit(name) {
    if (state.get(name) === 'done') return;
    if (state.get(name) === 'visiting') throw Error('Workspace dependency cycle at ' + name);
    state.set(name, 'visiting');
    for (const dependency of localDeps(byName.get(name), byName)) visit(dependency);
    state.set(name, 'done');
    order.push(name);
  }
  for (const pkg of [...packages].sort((a, b) => a.name.localeCompare(b.name))) visit(pkg.name);

  const planned = [],
    built = new Set();
  function buildOnce(name) {
    if (built.has(name)) return;
    const pkg = byName.get(name);
    for (const dep of localDeps(pkg, byName)) buildOnce(dep);
    if (pkg.scripts?.['package:build']) {
      planned.push({ name, script: 'package:build' });
      built.add(name);
    }
  }
  const buildOwn =
    operation === 'storybook:build' ||
    operation === 'code:check:types' ||
    operation === 'test' ||
    operation.startsWith('test:');
  const selected = new Set(eligible.map(pkg => pkg.name));
  for (const name of order) {
    if (!selected.has(name)) continue;
    const pkg = byName.get(name);
    for (const dependency of localDeps(pkg, byName)) buildOnce(dependency);
    if (operation === 'package:build') {
      buildOnce(name);
      continue;
    }
    // Shared packages often typecheck/test their compiled public entrypoints.
    // Build own output for those commands; app build/pack lifecycle stays with the app.
    if (buildOwn && (pkg.path || '').startsWith('shared/')) buildOnce(name);
    if (operation === 'storybook:build' && pkg.scripts?.['package:build']) buildOnce(name);
    planned.push({ name, script: operation });
  }
  return { selected: eligible.map(pkg => pkg.name), steps: planned };
}

/** CI may explicitly choose Web-only fixture content without changing native hosts. */
export function environmentForWorkspace(name, environment = process.env) {
  if (name === '@svitlo/web' && !environment.SVITLO_TEXTBOOK && environment.SVITLO_WEB_TEST_SELECTION) {
    return { ...environment, SVITLO_TEXTBOOK: environment.SVITLO_WEB_TEST_SELECTION };
  }
  return environment;
}

/**
 * Build all prerequisites on the single job-local cache writer before running
 * independent checks. The canonical workspace plan still selects every
 * eligible package and preserves its topological build ordering.
 */
export function planTypecheckPhases(plan) {
  const builds = plan.steps.filter(step => step.script === 'package:build');
  const checks = plan.steps.filter(step => step.script === 'code:check:types').map(step => step.name);
  if (
    checks.length !== plan.selected.length ||
    new Set(checks).size !== checks.length ||
    plan.selected.some(name => !checks.includes(name))
  ) {
    throw Error('Typecheck plan does not cover every selected workspace exactly once');
  }
  return { builds, ...partitionBuildMutatingHosts(checks) };
}

function runStepSync({ name, script }) {
  console.log('\n▶ ' + name + ' / ' + script);
  const reuse = script === 'package:build' && Boolean(process.env.SVITLO_CI_PACKAGE_BUILD_STATE);
  const command = reuse ? process.execPath : 'npm';
  const args = reuse
    ? ['scripts/ci/packageBuildReuse/package-build-reuse.mjs', name]
    : ['run', script, '--workspace', name];
  const result = spawnSync(command, args, {
    cwd: repo,
    env: environmentForWorkspace(name),
    stdio: 'inherit',
    shell: !reuse && process.platform === 'win32',
  });
  if (result.error || result.status !== 0) {
    throw Error(name + ' / ' + script + ' failed' + (result.error ? ': ' + result.error.message : ''));
  }
}

function runTypecheckAsync(name) {
  console.log('\n▶ ' + name + ' / code:check:types');
  return new Promise((resolveCheck, rejectCheck) => {
    const child = spawn('npm', ['run', 'code:check:types', '--workspace', name], {
      cwd: repo,
      env: environmentForWorkspace(name),
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    child.once('error', rejectCheck);
    child.once('close', (code, signal) => {
      if (code === 0) resolveCheck();
      else rejectCheck(Error(name + ' / code:check:types failed (' + (signal || 'exit ' + code) + ')'));
    });
  });
}

async function executeTypechecks(plan) {
  const { builds, parallel, sequential } = planTypecheckPhases(plan);
  const parallelism = Number(process.env.SVITLO_TYPECHECK_PARALLELISM ?? 4);
  if (!Number.isInteger(parallelism) || parallelism < 1 || parallelism > 8) {
    throw Error('SVITLO_TYPECHECK_PARALLELISM must be an integer from 1 to 8');
  }
  console.log(
    'Typecheck phases: ' + builds.length + ' dependency builds (sequential), ' +
      parallel.length + ' independent checks (concurrency ' + parallelism + '), ' +
      sequential.length + ' dist-mutating host checks (sequential)',
  );
  for (const step of builds) runStepSync(step);
  await runParallelTypechecks(parallel, runTypecheckAsync, { parallelism, context: 'Production TypeScript' });
  for (const name of sequential) await runTypecheckAsync(name);
}

export function execute(operation, { onlyWorkspaces } = {}) {
  if (!/^[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)*$/.test(operation)) {
    throw Error('Invalid script name: ' + operation);
  }
  // Root CLI remains exhaustive. An explicit selection is available only to
  // CI callers importing this function; dependency builds remain topological.
  const { selected, steps } = planWorkspaceOperation(discoverWorkspaces(), operation, { onlyWorkspaces });
  console.log('Running ' + operation + ' in ' + selected.length + ' eligible workspaces: ' + selected.join(', '));
  if (operation === 'code:check:types') return executeTypechecks({ selected, steps });
  for (const step of steps) runStepSync(step);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3)
      throw Error('Usage: node scripts/runWorkspaceScript/run-workspace-script.mjs <canonical-script>');
    await execute(process.argv[2]);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
