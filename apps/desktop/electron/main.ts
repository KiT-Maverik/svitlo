import { join } from 'node:path';

import { handleSquirrelStartup } from './squirrel.js';

import { app, BrowserWindow } from 'electron';

import { installPackagedResources, lockDownSession, openDesktopWindow } from '@svitlo/adapter-electron';

// main.ts is bundled into dist-main/main.cjs, independent of Next.js or a repo checkout.
const rendererRoot = join(app.getAppPath(), 'dist-renderer');
const devUrl = !app.isPackaged ? process.env.SVITLO_DESKTOP_DEV_URL : undefined;

if (process.platform === 'win32') app.setAppUserModelId('com.squirrel.Svitlo.Svitlo');

if (!handleSquirrelStartup({ exit: code => app.exit(code) })) app.whenReady().then(() => {
  installPackagedResources(rendererRoot);
  lockDownSession();
  openDesktopWindow(devUrl);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) openDesktopWindow(devUrl);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
