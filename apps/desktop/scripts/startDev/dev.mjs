#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const url = 'http://127.0.0.1:5173';
const vite = spawn(npm, ['exec', '--', 'vite', '--host', '127.0.0.1', '--port', '5173', '--strictPort'], {
  cwd: root,
  stdio: 'inherit',
});
let electron;
function stop() {
  electron?.kill();
  vite.kill();
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
try {
  let ready = false;
  for (let retry = 0; retry < 100; retry++) {
    if (vite.exitCode !== null) throw new Error('Vite exited before startup');
    try {
      const result = await fetch(url);
      if (result.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Vite not ready yet. */
    }
    await delay(200);
  }
  if (!ready) throw new Error('Vite did not start on 127.0.0.1:5173');
  const env = { ...process.env, SVITLO_DESKTOP_DEV_URL: url };
  delete env.ELECTRON_RUN_AS_NODE;
  electron = spawn(npm, ['exec', '--', 'electron', '.'], { cwd: root, env, stdio: 'inherit' });
  await new Promise(resolveExit => electron.once('exit', resolveExit));
} finally {
  stop();
}
