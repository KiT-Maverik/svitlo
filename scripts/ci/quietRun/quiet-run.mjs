#!/usr/bin/env node
/**
 * @fileoverview Quiet-by-default runner for CI and AI agents.
 * Streams full output only with SVITLO_CI_VERBOSE=1; otherwise prints a
 * compact status or bounded failures. Never wrap structured stdout producers.
 */
import { spawn } from 'node:child_process';
import { appendFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { StringDecoder } from 'node:string_decoder';

export function failureExcerpt(output, limit = 12000) {
  const lines = output.split(/\r?\n/);
  const errors = lines
    .filter(line => /(?:^|\s)(?:error TS\d+|Error:|FAIL|not ok|fatal:)|::error|\[error\]/i.test(line))
    .slice(0, 25)
    .join('\n')
    .slice(0, 4000);
  const tail = lines.slice(-65).join('\n').slice(-8000);
  return (errors ? errors + '\n...\n' + tail : tail).slice(0, limit);
}

/** Windows npm is a .cmd shim; invoke its JavaScript CLI directly without a shell. */
export function resolveSpawnCommand(command, args, options = {}) {
  const platform = options.platform ?? process.platform;
  if (platform !== 'win32' || command !== 'npm') return { command, args };
  const node = options.node ?? process.execPath;
  const candidates = [
    options.npmCli ?? process.env.npm_execpath,
    path.win32.join(path.win32.dirname(node), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
  ];
  const cli = candidates.find(candidate => candidate && existsSync(candidate));
  if (!cli) {
    throw new Error('Cannot locate npm-cli.js beside Node on Windows; refusing a shell fallback');
  }
  return { command: node, args: [cli, ...args] };
}

export function isDirectCliInvocation(argv1 = process.argv[1]) {
  return typeof argv1 === 'string' && path.win32.basename(argv1) === 'quiet-run.mjs';
}

export function run(argv = process.argv.slice(2)) {
  if (argv[0] !== '--' || argv.length < 2) {
    throw new Error('Usage: node quiet-run.mjs -- <command> [args...]');
  }
  const [command, ...args] = argv.slice(1);
  // Never echo arbitrary command arguments: inline scripts, tokens and secrets
  // can otherwise leak into normal job summaries even when output is quiet.
  const executable = path.basename(command);
  const workspaceIndex = args.indexOf('--workspace');
  const safeWorkspace =
    workspaceIndex >= 0 && /^[a-z0-9@/_-]+$/i.test(args[workspaceIndex + 1] || '')
      ? ' --workspace ' + args[workspaceIndex + 1]
      : '';
  const safeOperation =
    executable === 'npm' && args[0] === 'run' && /^[a-z0-9:_-]+$/i.test(args[1] || '')
      ? ' run ' + args[1] + safeWorkspace
      : executable === 'npm' && args[0] === 'ci'
        ? ' ci'
        : executable === 'node' && args[0] === '--test'
          ? ' --test'
          : '';
  const title = (process.env.SVITLO_CI_LABEL || executable + safeOperation).slice(0, 150);
  const verbose = process.env.SVITLO_CI_VERBOSE === '1';
  const started = Date.now();
  let output = '';
  let failure = null;
  // Preserve the first actionable diagnostics, even if later log volume
  // exceeds the rolling tail cap. Avoid retaining entire successful logs.
  const diagnostics = [];
  // stdout/stderr have independent chunk boundaries. Never combine partial
  // lines from different streams or lose an early GitHub diagnostic when the
  // bounded output tail rolls over.
  const streams = [
    { decoder: new StringDecoder('utf8'), pending: '' },
    { decoder: new StringDecoder('utf8'), pending: '' },
  ];
  const actionable = /(?:^|\\s)(?:error TS\\d+|Error:|FAIL|not ok|fatal:)|::error|\\[error\\]/i;
  const annotation = /^::(?:error|warning|notice)(?:\\s|::)/;
  const spawnCommand = resolveSpawnCommand(command, args);
  const child = spawn(spawnCommand.command, spawnCommand.args, {
    stdio: verbose ? 'inherit' : ['inherit', 'pipe', 'pipe'],
    shell: false,
    env: process.env,
  });
  if (!verbose) {
    const acceptLine = line => {
      // Only GitHub diagnostic annotations are forwarded from ordinary,
      // human-readable commands. Workflow-control and structured protocols
      // must never be quiet-wrapped in the first place.
      if (annotation.test(line)) process.stdout.write(line + '\n');
      if (diagnostics.length < 25 && actionable.test(line)) diagnostics.push(line.slice(0, 400));
    };
    const record = (chunk, stream) => {
      const raw = stream.decoder.write(chunk);
      output += raw;
      if (output.length > 128000) output = output.slice(-128000);
      const parts = (stream.pending + raw).split(/\r?\n/);
      // Keep the *prefix* of an excessively long partial line: it can hold
      // the first cause or GitHub annotation marker. Bound retained memory.
      stream.pending = parts.pop().slice(0, 8192);
      for (const line of parts) acceptLine(line);
    };
    child.stdout.on('data', chunk => record(chunk, streams[0]));
    child.stderr.on('data', chunk => record(chunk, streams[1]));
  }
  child.once('error', error => {
    failure = error;
  });
  child.once('close', (code, signal) => {
    const seconds = ((Date.now() - started) / 1000).toFixed(1);
    const passed = !failure && code === 0;
    const status = passed ? 'PASS' : 'FAIL';
    const message = status + ' ' + title + ' (' + seconds + 's)';
    if (passed) {
      console.log(message);
    } else {
      console.error(message + ' (exit ' + String(code ?? signal ?? failure?.message) + ')');
      if (!verbose)
        console.error(
          failureExcerpt(diagnostics.join('\n') + '\n' + output) ||
            String(failure?.message || 'No child diagnostic output'),
        );
    }
    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        '- ' + status + ' — `' + title.replaceAll('`', '') + '` (' + seconds + 's)\n',
      );
    }
    process.exitCode = passed ? 0 : Number.isInteger(code) && code > 0 ? code : 1;
  });
}

if (isDirectCliInvocation()) {
  try {
    run();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
