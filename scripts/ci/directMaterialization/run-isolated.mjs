import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const workerImage =
  'node:26.13.1-bookworm-slim@sha256:5df79989ed685e09f0a98019db4cebfb22fb9df1a53c0161664a011f7ff6b0f1';
const workerPath = fileURLToPath(new URL('./worker.mjs', import.meta.url));
const MAX_OUTPUT = 64 * 1024 * 1024;

/** All arguments originate in the trusted gate, not in the authored entrypoint. */
export function runIsolatedMaterialization({ trustedRoot, candidateRoot, textbook, operation, source }) {
  if (!/^content\/[a-z][a-z0-9-]*$/.test(textbook) || !source.sourcePath.startsWith(textbook + '/'))
    throw Error('Invalid isolated textbook scope');
  const mount = (host, target, directory = false) => {
    const stat = fs.lstatSync(host);
    if (stat.isSymbolicLink() || (directory ? !stat.isDirectory() : !stat.isFile()) || host.includes(','))
      throw Error('Invalid materialization mount');
    return ['--mount', 'type=bind,source=' + host + ',target=' + target + ',readonly'];
  };
  const name = 'svitlo-materialization-' + randomUUID();
  const args = [
    'run',
    '--rm',
    '--name',
    name,
    '--pull=never',
    '--interactive',
    '--network=none',
    '--read-only',
    '--cap-drop=ALL',
    '--security-opt=no-new-privileges',
    '--user=65534:65534',
    '--pids-limit=64',
    '--memory=1g',
    '--memory-swap=1g',
    '--cpus=2',
    '--tmpfs=/tmp:rw,noexec,nosuid,nodev,size=64m',
    '--log-driver=none',
    '--env=HOME=/tmp',
    '--workdir=/work',
    ...mount(path.join(trustedRoot, 'node_modules'), '/work/node_modules', true),
    ...mount(path.join(trustedRoot, 'shared/engine/dist'), '/work/shared/engine/dist', true),
    ...mount(path.join(trustedRoot, 'shared/engine/package.json'), '/work/shared/engine/package.json'),
    ...mount(path.join(candidateRoot, textbook), '/work/' + textbook, true),
    ...mount(workerPath, '/work/worker.mjs'),
    workerImage,
    'node',
    '/work/worker.mjs',
  ];
  try {
    const result = spawnSync('docker', args, {
      input: JSON.stringify({ operation, source }),
      encoding: 'utf8',
      timeout: 120_000,
      maxBuffer: MAX_OUTPUT,
      killSignal: 'SIGKILL',
    });
    // Never print candidate-controlled stdout/stderr to the Actions command stream.
    if (result.error || result.status !== 0) throw Error('Isolated materialization failed');
    try {
      return JSON.parse(result.stdout);
    } catch {
      throw Error('Isolated materialization did not return one JSON result');
    }
  } finally {
    spawnSync('docker', ['rm', '--force', name], { stdio: 'ignore', timeout: 15_000 });
  }
}
