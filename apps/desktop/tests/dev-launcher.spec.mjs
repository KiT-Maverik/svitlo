import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { isAbsolute } from 'node:path';
import { test } from 'node:test';

import { getDevCommands } from '../scripts/startDev/launch-commands.mjs';

test('Desktop dev uses direct cross-platform executables, never npm.cmd shims', () => {
  const { vite, electron } = getDevCommands();
  assert.equal(vite.executable, process.execPath);
  assert.ok(isAbsolute(vite.args[0]));
  assert.match(vite.args[0].replaceAll('\\', '/'), /\/vite\/bin\/vite\.js$/);
  assert.ok(existsSync(vite.args[0]), 'Vite CLI must exist in the installed workspace');
  assert.deepEqual(vite.args.slice(1), ['--host', '127.0.0.1', '--port', '5173', '--strictPort']);

  assert.ok(isAbsolute(electron.executable));
  assert.ok(existsSync(electron.executable), 'Electron native executable must exist');
  assert.ok(!/\.cmd$/i.test(electron.executable), 'Windows cannot spawn npm.cmd without a shell');
  assert.deepEqual(electron.args, ['.']);
});
