import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';
import { installPackagedResources, lockDownSession, openDesktopWindow } from '@svitlo/adapter-electron';

// main.ts is bundled into dist-main/main.cjs, independent of Next.js or a repo checkout.
const rendererRoot = join(app.getAppPath(), 'dist-renderer');
const devUrl = !app.isPackaged ? process.env.SVITLO_DESKTOP_DEV_URL : undefined;

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
