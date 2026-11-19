#!/usr/bin/env node
/**
 * @fileoverview Job-local reuse of verified package builds for Production Quality.
 * Outside an explicitly configured CI job, always run the canonical npm script.
 * Never share results across runners or skip a build with missing/stale outputs.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces } from '../../runWorkspaceScript/run-workspace-script.mjs';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const stateVariable = 'SVITLO_CI_PACKAGE_BUILD_STATE';

function npmBuild(name, root = repoRoot) {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(command, ['run', 'package:build', '--workspace', name], {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
  });
  if (result.error || result.status !== 0) {
    throw new Error(name + ' / package:build failed' + (result.error ? ': ' + result.error.message : ''));
  }
}

/** Reuse is forbidden when tracked inputs differ from the checked-out commit. */
export function cleanSourceRevision(root) {
  const head = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
  if (head.error || head.status !== 0) return null;
  const dirty = spawnSync('git', ['diff', '--quiet', 'HEAD', '--'], { cwd: root });
  if (dirty.error || dirty.status !== 0) return null;
  return head.stdout.trim() || null;
}

/** Complete content fingerprints detect deleted, truncated and modified artifacts. */
export function snapshotDist(root, workspacePath) {
  const base = join(root, workspacePath, 'dist');
  if (!existsSync(base) || !statSync(base).isDirectory()) {
    throw new Error('Missing compiled dist for ' + workspacePath);
  }
  const files = [];
  function walk(directory, prefix = '') {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const name = prefix ? prefix + '/' + entry.name : entry.name;
      if (entry.isSymbolicLink()) throw new Error('Symlink in compiled output: ' + workspacePath + '/dist/' + name);
      if (entry.isDirectory()) {
        walk(join(directory, entry.name), name);
      } else if (entry.isFile()) {
        const file = join(directory, entry.name);
        const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
        files.push([name, statSync(file).size, hash]);
      } else {
        throw new Error('Unsupported compiled output: ' + workspacePath + '/dist/' + name);
      }
    }
  }
  walk(base);
  if (!files.length) throw new Error('Empty compiled dist for ' + workspacePath);
  return files;
}

function emptyState(root) {
  return {
    version: 1,
    root,
    sequence: 0,
    records: {},
    stats: { requested: 0, built: 0, reused: 0, failed: 0, buildMs: 0 },
  };
}

export function readBuildState(stateFile, root) {
  if (!existsSync(stateFile)) return emptyState(root);
  const parsed = JSON.parse(readFileSync(stateFile, 'utf8'));
  if (parsed.version !== 1 || parsed.root !== root || !parsed.records || !parsed.stats) {
    throw new Error('Invalid or foreign package-build reuse state');
  }
  return parsed;
}

function saveBuildState(stateFile, state) {
  mkdirSync(dirname(stateFile), { recursive: true });
  const temporary = stateFile + '.' + process.pid + '.tmp';
  writeFileSync(temporary, JSON.stringify(state));
  renameSync(temporary, stateFile);
}

/** Injectable runner keeps dependency, invalidation and error paths testable. */
export function createPackageBuildReuse({ root, packages, stateFile, runBuild, sourceRevision }) {
  if (!isAbsolute(stateFile)) throw new Error('Package-build state path must be absolute');
  const normalized = resolve(root);
  if (relative(normalized, resolve(stateFile)) === '' || !relative(normalized, resolve(stateFile)).startsWith('..')) {
    throw new Error('Package-build reuse state must be outside the repository');
  }
  const byName = new Map(packages.map(pkg => [pkg.name, pkg]));
  if (byName.size !== packages.length) throw new Error('Duplicate npm workspace names');

  function ensure(name, visiting = new Set()) {
    const pkg = byName.get(name);
    if (!pkg?.scripts?.['package:build']) throw new Error('No package:build capability for ' + name);
    if (visiting.has(name)) throw new Error('Workspace build cycle: ' + [...visiting, name].join(' -> '));
    const next = new Set([...visiting, name]);
    const dependencies = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
      .filter(dep => byName.get(dep)?.scripts?.['package:build'])
      .sort();
    for (const dependency of dependencies) ensure(dependency, next);

    const state = readBuildState(stateFile, normalized);
    const source = sourceRevision();
    const dependencyVersions = Object.fromEntries(
      dependencies.map(dep => [dep, state.records[dep]?.sequence ?? null]),
    );
    const previous = state.records[name];
    state.stats.requested++;
    if (source && previous?.source === source && JSON.stringify(previous.dependencies) === JSON.stringify(dependencyVersions)) {
      let current = null;
      try {
        current = snapshotDist(normalized, pkg.path);
      } catch {
        // Missing/invalid output must cause a real rebuild, never a reuse.
      }
      if (current && JSON.stringify(current) === JSON.stringify(previous.files)) {
        state.stats.reused++;
        saveBuildState(stateFile, state);
        console.log('REUSE ' + name + ' / package:build (verified)');
        return 'reused';
      }
    }

    const started = Date.now();
    try {
      runBuild(name);
      const files = snapshotDist(normalized, pkg.path);
      const after = sourceRevision();
      state.sequence++;
      state.records[name] = {
        source: source && after === source ? source : null,
        dependencies: dependencyVersions,
        sequence: state.sequence,
        files,
      };
      state.stats.built++;
      state.stats.buildMs += Date.now() - started;
      saveBuildState(stateFile, state);
      console.log('BUILD ' + name + ' / package:build (verified)');
      return 'built';
    } catch (error) {
      state.stats.failed++;
      saveBuildState(stateFile, state);
      throw error;
    }
  }
  return { ensure };
}

function summary(file) {
  const state = readBuildState(file, repoRoot);
  const stats = state.stats;
  const result =
    'Package build reuse: ' + stats.requested + ' requests, ' + stats.built + ' builds, ' +
    stats.reused + ' verified reuses, ' + stats.failed + ' failures; ' +
    (stats.buildMs / 1000).toFixed(1) + 's in executed package builds.';
  console.log(result);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, '\n- ' + result + '\n');
}

function main(args) {
  if (args.length !== 1) throw new Error('Usage: package-build-reuse.mjs <workspace|--summary>');
  const file = process.env[stateVariable];
  if (args[0] === '--summary') {
    if (file) summary(file);
    else console.log('Package build reuse is not enabled.');
    return;
  }
  const packages = discoverWorkspaces(repoRoot);
  const pkg = packages.find(item => item.name === args[0]);
  if (!pkg?.scripts?.['package:build']) throw new Error('Unknown buildable workspace: ' + args[0]);
  if (!file) {
    npmBuild(args[0]);
    return;
  }
  createPackageBuildReuse({
    root: repoRoot,
    packages,
    stateFile: file,
    runBuild: name => npmBuild(name),
    sourceRevision: () => cleanSourceRevision(repoRoot),
  }).ensure(args[0]);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
