import { spawnSync } from 'node:child_process';
import { basename, dirname, resolve } from 'node:path';

const supportedEvents = new Set([
  '--squirrel-install',
  '--squirrel-updated',
  '--squirrel-uninstall',
  '--squirrel-obsolete',
]);

/** Process Squirrel lifecycle before opening a BrowserWindow. All effects are injectable for tests. */
export function handleSquirrelStartup({
  platform = process.platform,
  args = process.argv,
  executablePath = process.execPath,
  run = spawnSync,
  exit,
} = {}) {
  if (platform !== 'win32' || !supportedEvents.has(args[1])) return false;

  if (args[1] === '--squirrel-obsolete') {
    exit(0);
    return true;
  }
  const updateExe = resolve(dirname(executablePath), '..', 'Update.exe');
  const command = args[1] === '--squirrel-uninstall' ? '--removeShortcut' : '--createShortcut';
  const result = run(updateExe, [command, basename(executablePath)], { windowsHide: true });
  exit(result.error || result.status !== 0 ? 1 : 0);
  return true;
}
