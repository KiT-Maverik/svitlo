import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

/**
 * Launch actual program entrypoints rather than npm.cmd shims. Windows cannot
 * spawn .cmd/.bat files without a shell, and npm exec adds child processes
 * that complicate terminating the Vite server and Electron together.
 */
export function getDevCommands() {
  const viteCli = join(dirname(require.resolve('vite/package.json')), 'bin', 'vite.js');
  return {
    vite: {
      executable: process.execPath,
      args: [viteCli, '--host', '127.0.0.1', '--port', '5173', '--strictPort'],
    },
    electron: {
      executable: require('electron'),
      args: ['.'],
    },
  };
}
