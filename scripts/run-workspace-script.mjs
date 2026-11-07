#!/usr/bin/env node
/** Dependency-aware npm workspace aggregation. Never implicitly select one app. */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
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

export function planWorkspaceOperation(packages, operation) {
  const byName = new Map(packages.map(pkg => [pkg.name, pkg]));
  if (byName.size !== packages.length) throw Error('Duplicate npm workspace names');
  const eligible = packages.filter(pkg => Object.hasOwn(pkg.scripts || {}, operation));
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

  const planned = [], built = new Set();
  function buildOnce(name) {
    if (built.has(name)) return;
    const pkg = byName.get(name);
    for (const dep of localDeps(pkg, byName)) buildOnce(dep);
    if (pkg.scripts?.['package:build']) {
      planned.push({ name, script: 'package:build' });
      built.add(name);
    }
  }
  const buildOwn = operation === 'storybook:build' ||
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

function execute(operation) {
  if (!/^[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)*$/.test(operation)) {
    throw Error('Invalid script name: ' + operation);
  }
  const { selected, steps } = planWorkspaceOperation(discoverWorkspaces(), operation);
  console.log('Running ' + operation + ' in ' + selected.length + ' eligible workspaces: ' + selected.join(', '));
  for (const { name, script } of steps) {
    console.log('\n▶ ' + name + ' / ' + script);
    const result = spawnSync('npm', ['run', script, '--workspace', name], {
      cwd: repo,
      env: process.env,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    if (result.error || result.status !== 0) {
      throw Error(name + ' / ' + script + ' failed' + (result.error ? ': ' + result.error.message : ''));
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3) throw Error('Usage: node scripts/run-workspace-script.mjs <canonical-script>');
    execute(process.argv[2]);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
