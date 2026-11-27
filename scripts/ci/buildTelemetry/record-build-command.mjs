#!/usr/bin/env node
/**
 * @fileoverview Optional job-local measurements of direct npm package build commands.
 * This is instrumentation, not a build cache or a replacement for npm lifecycle hooks.
 */
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { appendBuildTelemetry, cleanSourceRevision } from '../packageBuildReuse/package-build-reuse.mjs';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

/**
 * Run the original command exactly once; optional telemetry cannot change the
 * command's exit status or promote a missing/failed compiler to success.
 */
export function runBuildCommand({ workspace, origin, command, args, root = repoRoot, env = process.env, spawn = spawnSync }) {
  if (!/^@svitlo\/[a-z0-9-]+$/.test(workspace)) throw new Error('Invalid build workspace');
  if (!/^[a-z0-9-]+$/.test(origin)) throw new Error('Invalid build origin');
  if (!command || !Array.isArray(args)) throw new Error('Missing build command');
  const file = env.SVITLO_CI_BUILD_TELEMETRY;
  const sourceRevision = file ? cleanSourceRevision(root) : null;
  const start = Date.now();
  const result = spawn(command, args, {
    cwd: root,
    env,
    stdio: 'inherit',
    shell: process.platform === 'win32' && command === 'npm',
  });
  const success = !result.error && result.status === 0;
  if (file) {
    try {
      appendBuildTelemetry({
        root,
        file,
        env,
        event: {
          workspace,
          origin,
          recordKind: 'direct-build-command',
          outcome: success ? 'built' : 'failed',
          durationMs: Date.now() - start,
          sourceRevision,
          outputDigest: null,
          command: [command, ...args],
        },
      });
    } catch (error) {
      console.warn('Optional build telemetry unavailable: ' + String(error.message || error));
    }
  }
  if (!success) {
    throw new Error(
      workspace + ' / package:build failed' +
        (result.error ? ': ' + result.error.message : ' (' + origin + ')' : ' (' + origin + ', exit ' + result.status + ')'),
    );
  }
}

export function parseArguments(argv) {
  if (argv.length < 6 || argv[0] !== '--workspace' || argv[2] !== '--origin' || argv[4] !== '--') {
    throw new Error('Usage: --workspace <@svitlo/name> --origin <slug> -- <command> [args...]');
  }
  return { workspace: argv[1], origin: argv[3], command: argv[5], args: argv.slice(6) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    runBuildCommand(parseArguments(process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
