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
  closeSync,
  existsSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  realpathSync,
  readSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces } from '../../runWorkspaceScript/run-workspace-script.mjs';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const stateVariable = 'SVITLO_CI_PACKAGE_BUILD_STATE';
const telemetryVariable = 'SVITLO_CI_BUILD_TELEMETRY';

/**
 * Opt-in, job-local observability only. Never write telemetry into the checkout.
 * Consumers must not use these events as a build cache or authorization signal.
 */
export function appendBuildTelemetry({ root, file, event, env = process.env }) {
  if (!isAbsolute(file)) throw new Error('Build telemetry path must be absolute');
  const normalized = realpathSync(resolve(root));
  const target = resolve(realpathSync(dirname(resolve(file))), basename(file));
  // Reject even dangling file symlinks: appendFileSync would otherwise follow
  // the link and could modify tracked source despite the lexical path check.
  let existing = null;
  try {
    existing = lstatSync(target);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (existing?.isSymbolicLink()) throw new Error('Build telemetry target must not be a symlink');
  const relativeFile = relative(normalized, target);
  if (relativeFile === '' || (relativeFile !== '..' && !relativeFile.startsWith('..' + sep))) {
    throw new Error('Build telemetry must stay outside the repository');
  }
  const record = {
    schemaVersion: 1,
    timestamp: new Date().toISOString(),
    runId: env.GITHUB_RUN_ID || null,
    runAttempt: env.GITHUB_RUN_ATTEMPT || null,
    job: env.GITHUB_JOB || null,
    checkoutSha: env.GITHUB_SHA || null,
    operation: 'package:build',
    ...event,
  };
  appendFileSync(target, JSON.stringify(record) + '\n');
}

function npmBuild(name, root = repoRoot) {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(command, ['run', 'package:build', '--workspace', name], {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
    shell: process.platform === 'win32',
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

/** A nonempty dist is insufficient if a declared public entrypoint was never emitted. */
export function assertCompiledExports(root, workspacePath) {
  const directory = join(root, workspacePath);
  const manifest = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'));
  const paths = [];
  function collect(value) {
    if (typeof value === 'string') {
      if (value.startsWith('./dist/') && !value.includes('*')) paths.push(value);
    } else if (value && typeof value === 'object') {
      for (const child of Object.values(value)) collect(child);
    }
  }
  collect(manifest.exports);
  collect(manifest.main);
  collect(manifest.types);
  collect(manifest.bin);
  for (const exported of paths) {
    const absolute = resolve(directory, exported);
    if (!absolute.startsWith(join(directory, 'dist') + sep)) {
      throw new Error('Invalid public dist export: ' + workspacePath + '/' + exported);
    }
    if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      throw new Error('Missing compiled public export: ' + workspacePath + '/' + exported);
    }
  }
}

/** Complete content fingerprints detect deleted, truncated and modified artifacts. */
export function snapshotDist(root, workspacePath) {
  const base = join(root, workspacePath, 'dist');
  if (!existsSync(base) || lstatSync(base).isSymbolicLink() || !statSync(base).isDirectory()) {
    throw new Error('Missing compiled dist for ' + workspacePath);
  }
  // Persist one digest instead of a potentially enormous content/locale file list.
  const digest = createHash('sha256');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  let count = 0;
  function walk(directory, prefix = '') {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const name = prefix ? prefix + '/' + entry.name : entry.name;
      if (entry.isSymbolicLink()) throw new Error('Symlink in compiled output: ' + workspacePath + '/dist/' + name);
      if (entry.isDirectory()) {
        walk(join(directory, entry.name), name);
      } else if (entry.isFile()) {
        const file = join(directory, entry.name);
        const size = statSync(file).size;
        const hash = createHash('sha256');
        const descriptor = openSync(file, 'r');
        try {
          let read;
          while ((read = readSync(descriptor, buffer, 0, buffer.length, null)) !== 0) {
            hash.update(buffer.subarray(0, read));
          }
        } finally {
          closeSync(descriptor);
        }
        digest.update(name + '\\0' + size + '\\0' + hash.digest('hex') + '\\0');
        count++;
      } else {
        throw new Error('Unsupported compiled output: ' + workspacePath + '/dist/' + name);
      }
    }
  }
  walk(base);
  if (!count) throw new Error('Empty compiled dist for ' + workspacePath);
  assertCompiledExports(root, workspacePath);
  return { count, digest: digest.digest('hex') };
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
export function createPackageBuildReuse({
  root,
  packages,
  stateFile,
  runBuild,
  sourceRevision,
  onBuildEvent = () => {},
}) {
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

    const requestStarted = Date.now();
    const state = readBuildState(stateFile, normalized);
    const source = sourceRevision();
    const emit = (outcome, outputDigest = null) => {
      try {
        onBuildEvent({
          workspace: name,
          outcome,
          durationMs: Date.now() - requestStarted,
          sourceRevision: source,
          outputDigest,
        });
      } catch (error) {
        // Instrumentation must never change a build/reuse decision or its result.
        console.warn('Optional build telemetry unavailable: ' + String(error.message || error));
      }
    };
    const dependencyVersions = Object.fromEntries(dependencies.map(dep => [dep, state.records[dep]?.sequence ?? null]));
    const previous = state.records[name];
    state.stats.requested++;
    if (
      source &&
      previous?.source === source &&
      JSON.stringify(previous.dependencies) === JSON.stringify(dependencyVersions)
    ) {
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
        emit('reused', current.digest);
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
      emit('built', files.digest);
      return 'built';
    } catch (error) {
      // Never permit a previously stamped success to survive a failed rebuild.
      delete state.records[name];
      state.stats.failed++;
      saveBuildState(stateFile, state);
      emit('failed');
      throw error;
    }
  }
  return { ensure };
}

function summary(file) {
  const state = readBuildState(file, repoRoot);
  const stats = state.stats;
  const result =
    'Package build reuse: ' +
    stats.requested +
    ' requests, ' +
    stats.built +
    ' builds, ' +
    stats.reused +
    ' verified reuses, ' +
    stats.failed +
    ' failures; ' +
    (stats.buildMs / 1000).toFixed(1) +
    's in executed package builds.';
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
    onBuildEvent: event => {
      const file = process.env[telemetryVariable];
      if (!file) return;
      try {
        appendBuildTelemetry({ root: repoRoot, file, event });
      } catch (error) {
        // A diagnostic sink is not allowed to fail successful compilers or reuses.
        console.warn('Optional build telemetry unavailable: ' + String(error.message || error));
      }
    },
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
