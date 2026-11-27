#!/usr/bin/env node
/** Typecheck changed workspaces and consumers of changed public contracts only. */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { changedFiles } from '../ci/prDiff/changed-files.mjs';
import { partitionBuildMutatingHosts, runParallelTypechecks } from '../runWorkspaceScript/typecheck-scheduler.mjs';

export { partitionBuildMutatingHosts };

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
function json(file) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
}
const quietRunner = path.join(repoRoot, 'scripts/ci/quietRun/quiet-run.mjs');
function exec(command, args, cwd = repoRoot) {
  const result = spawnSync(process.execPath, [quietRunner, '--', command, ...args], {
    cwd,
    stdio: 'inherit',
    shell: false,
  });
  assert(
    !result.error && result.status === 0,
    'FastGate command failed: ' + command + ' ' + args.join(' ') + (result.error ? ': ' + result.error.message : ''),
  );
}
function execAsync(command, args, environment = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [quietRunner, '--', command, ...args], {
      cwd: repoRoot,
      stdio: 'inherit',
      shell: false,
      env: environment,
    });
    child.once('error', reject);
    child.once('close', code =>
      code === 0
        ? resolve()
        : reject(new Error('FastGate command failed: ' + command + ' ' + args.join(' ') + ' (exit ' + code + ')')),
    );
  });
}
function expandWorkspaces() {
  const result = [];
  for (const pattern of json('package.json').workspaces) {
    assert(pattern.endsWith('/*'), 'Unsupported workspace pattern: ' + pattern);
    const dir = path.join(repoRoot, pattern.slice(0, -2));
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const relative = path.posix.join(pattern.slice(0, -2), entry.name);
      const manifest = path.join(repoRoot, relative, 'package.json');
      if (fs.existsSync(manifest)) result.push({ path: relative, ...json(relative + '/package.json') });
    }
  }
  const seen = new Set();
  for (const pkg of result) {
    assert(!seen.has(pkg.name), 'Duplicate workspace name: ' + pkg.name);
    seen.add(pkg.name);
  }
  return result;
}
function packageFor(file, workspaces) {
  return workspaces.filter(w => file.startsWith(w.path + '/')).sort((a, b) => b.path.length - a.path.length)[0];
}
/**
 * Select only edited owners and downstream consumers of changed public APIs or
 * package manifests. Graph edges include declared development dependencies,
 * which are required to typecheck many textbooks.
 */
export function workspaceDependents(workspaces) {
  const packages = new Map(workspaces.map(pkg => [pkg.name, pkg]));
  const edges = new Map(workspaces.map(pkg => [pkg.name, new Set()]));
  const dependencies = new Map();
  for (const pkg of workspaces) {
    const deps = new Set(
      ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
        .flatMap(key => Object.keys(pkg[key] || {}))
        .filter(name => packages.has(name)),
    );
    const missing = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
      .flatMap(key => Object.keys(pkg[key] || {}))
      .filter(name => name.startsWith('@svitlo/') && !packages.has(name));
    assert(!missing.length, 'Unknown workspace dependency in ' + pkg.name + ': ' + missing.join(', '));
    dependencies.set(pkg.name, deps);
    for (const dep of deps) edges.get(dep).add(pkg.name);
  }
  const done = new Set();
  function checkCycle(name, visiting = new Set()) {
    assert(!visiting.has(name), 'Cyclic workspace dependency: ' + [...visiting, name].join(' → '));
    if (done.has(name)) return;
    const next = new Set([...visiting, name]);
    for (const dep of dependencies.get(name)) checkCycle(dep, next);
    done.add(name);
  }
  for (const name of packages.keys()) checkCycle(name);
  return edges;
}

export function chooseChecks(changed, workspaces, { publicChanges = [], changedOnly = false } = {}) {
  const affected = new Set();
  const packages = new Map(workspaces.map(pkg => [pkg.name, pkg]));
  const global = changed.some(file => file === 'package.json' || /^tsconfig[^/]*\.json$/.test(file));
  const lockChange = changed.includes('package-lock.json');
  const triggers = new Set();
  for (const file of changed) {
    const pkg = packageFor(file, workspaces);
    if (pkg) affected.add(pkg.name);
    if (pkg && file === pkg.path + '/package.json') triggers.add(pkg.name);
  }
  // Non-develop Ready PRs ordinarily check directly edited workspaces.
  // Root dependency and TypeScript configuration changes can affect every
  // workspace, however: a zero-target result is unsafe even in a nested PR.
  // Dependency builds are still prepared later for TypeScript resolution.
  if (changedOnly) {
    if (global || lockChange) for (const name of packages.keys()) affected.add(name);
    return { affected };
  }
  for (const file of publicChanges) {
    const pkg = packageFor(file, workspaces);
    if (pkg) triggers.add(pkg.name);
  }
  const dependents = workspaceDependents(workspaces);
  const visit = [...triggers];
  while (visit.length) {
    const parent = visit.pop();
    for (const child of dependents.get(parent) || []) {
      if (!affected.has(child)) affected.add(child);
      if (!triggers.has(child)) {
        triggers.add(child);
        visit.push(child);
      }
    }
  }
  // Root manifest/lockfile edits may alter dependency resolution everywhere.
  // Validate all workspaces rather than pretending a changed external version
  // affects only a hand-picked subset.
  if (global || lockChange) for (const name of packages.keys()) affected.add(name);
  return { affected };
}
/** Build dependencies that a workspace typecheck consumes through published exports. */
export function shouldBuildDependency(owner, dependency) {
  return (
    Boolean(dependency.scripts?.['package:build']) &&
    (dependency.path.startsWith('shared/') ||
      (owner.path.startsWith('apps/') && dependency.path.startsWith('content/')))
  );
}

async function runGate(changed, base, head, { changedOnly = false } = {}) {
  const workspaces = expandWorkspaces();
  const all = new Map(workspaces.map(workspace => [workspace.name, workspace]));
  // Only public-signature comparisons need TypeScript. Keep the scope planner
  // npm-free so root-only nested PR regression tests run during cheap Draft CI.
  const publicChanges =
    !changedOnly && base && head
      ? (await import('./public-contract-impact.mjs')).changedPublicContracts(changed, workspaces, base, head)
      : [];
  if (publicChanges.length) console.log('Changed public contracts: ' + publicChanges.join(', '));
  const plan = chooseChecks(changed, workspaces, { publicChanges, changedOnly });

  const built = new Set();
  function ensureSharedDependencies(name, visiting = new Set()) {
    assert(!visiting.has(name), 'Cyclic workspace dependency: ' + name);
    const pkg = all.get(name);
    assert(pkg, 'Unknown workspace: ' + name);
    const next = new Set([...visiting, name]);
    for (const dep of Object.keys(pkg.dependencies || {})) {
      if (!all.has(dep)) continue;
      ensureSharedDependencies(dep, next);
      const dependency = all.get(dep);
      if (shouldBuildDependency(pkg, dependency) && !built.has(dep)) {
        if (process.env.SVITLO_CI_BUILD_TELEMETRY) {
          exec(process.execPath, [
            'scripts/ci/buildTelemetry/record-build-command.mjs',
            '--workspace',
            dep,
            '--origin',
            'fastgate-prerequisite',
            '--',
            'npm',
            'run',
            'package:build',
            '--workspace',
            dep,
          ]);
        } else {
          exec('npm', ['run', 'package:build', '--workspace', dep]);
        }
        built.add(dep);
      }
    }
  }

  const priority = [
    '@svitlo/engine',
    '@svitlo/indexdb',
    '@svitlo/ui-kit',
    '@svitlo/adapter-nextjs',
    '@svitlo/playground',
    '@svitlo/web',
  ];
  const rank = name => {
    const index = priority.indexOf(name);
    return index < 0 ? priority.length : index;
  };
  const targets = [...plan.affected]
    .filter(name => all.get(name)?.scripts?.['code:check:types'])
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  console.log('FastGate typecheck targets: ' + (targets.join(', ') || '(none)'));

  // Dependency artifacts are required by TypeScript package resolution.
  // Build them before starting parallel checks; this is not package validation.
  for (const name of targets) ensureSharedDependencies(name);

  // Web/Mobile npm precode hooks rebuild shared dist/ and must not race
  // with consumers. Other independent workspace typechecks run in parallel.
  const { parallel, sequential } = partitionBuildMutatingHosts(targets);
  async function checkWorkspace(name) {
    const environment =
      name === '@svitlo/web' && process.env.SVITLO_WEB_TEST_SELECTION
        ? { ...process.env, SVITLO_TEXTBOOK: process.env.SVITLO_WEB_TEST_SELECTION }
        : process.env;
    await execAsync('npm', ['run', 'code:check:types', '--workspace', name], environment);
  }
  await runParallelTypechecks(parallel, checkWorkspace, {
    parallelism: Number(process.env.SVITLO_FASTGATE_PARALLELISM || 2),
    context: 'FastGate',
  });
  for (const name of sequential) await checkWorkspace(name);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--all') {
      await runGate(['package.json']);
    } else if (args.length === 2 || (args.length === 3 && args[2] === '--changed-only')) {
      await runGate(changedFiles(args[0], args[1]), args[0], args[1], {
        changedOnly: args.length === 3,
      });
    } else {
      throw new Error('Usage: run-fast-gate.mjs <base-sha> <head-sha> [--changed-only] | --all');
    }
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}
