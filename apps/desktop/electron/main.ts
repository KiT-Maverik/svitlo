import { join } from 'node:path';

import { app, BrowserWindow } from 'electron';

import { installPackagedResources, lockDownSession, openDesktopWindow } from '@svitlo/adapter-electron';

import { handleSquirrelStartup } from './squirrel.js';

// Forge replaces this constant with the fixed Vite dev URL (or undefined for production).
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;

const rendererRoot = join(app.getAppPath(), '.vite/renderer/main_window');
const devUrl = !app.isPackaged ? MAIN_WINDOW_VITE_DEV_SERVER_URL : undefined;

if (process.platform === 'win32') app.setAppUserModelId('com.squirrel.Svitlo.Svitlo');

if (!handleSquirrelStartup({ exit: code => app.exit(code) }))
  app.whenReady().then(() => {
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
