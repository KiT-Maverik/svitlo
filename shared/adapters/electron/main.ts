import { app, BrowserWindow, net, protocol, session } from 'electron';
import { existsSync, realpathSync, statSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolvePackagedResource } from './resourcePath.js';

// Must be registered before Electron app.ready. Storage/IndexedDB work on a standard, secure origin.
protocol.registerSchemesAsPrivileged([
  { scheme: 'svitlo', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } },
]);

const PRODUCTION_ORIGIN = 'svitlo://app';
const INITIAL_PATH = '/uk';

function inside(root: string, target: string): boolean {
  const rel = relative(root, target);
  return rel === '' || (!rel.startsWith('..' + sep) && rel !== '..' && !isAbsolute(rel));
}

/** Runs after app.ready; all resources (including lazy Scene chunks) are local. */
export function installPackagedResources(rendererRoot: string): void {
  const root = resolve(rendererRoot);
  protocol.handle('svitlo', request => {
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405 });
    try {
      const candidate = resolvePackagedResource(root, request.url);
      if (!existsSync(candidate) || !statSync(candidate).isFile()) {
        return new Response('Packaged resource not found', { status: 404 });
      }
      // Protect against symlinks pointing outside the renderer bundle.
      const actual = realpathSync(candidate);
      const actualRoot = realpathSync(root);
      if (!inside(actualRoot, actual)) return new Response('Forbidden resource', { status: 403 });
      return net.fetch(pathToFileURL(actual).toString());
    } catch {
      return new Response('Invalid application resource', { status: 400 });
    }
  });
}

/** Renderer has no preload and no IPC surface: its only data API is local read-only fetch(). */
export function openDesktopWindow(devServerUrl?: string): BrowserWindow {
  const allowedOrigin = devServerUrl ? new URL(devServerUrl).origin : PRODUCTION_ORIGIN;
  if (devServerUrl) {
    const url = new URL(devServerUrl);
    if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1' || url.port !== '5173') {
      throw new Error('Only the fixed local Vite development server may be loaded');
    }
  }
  const window = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 640,
    minHeight: 480,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      webviewTag: false,
      allowRunningInsecureContent: false,
    },
  });
  window.once('ready-to-show', () => window.show());
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-attach-webview', event => event.preventDefault());
  window.webContents.on('will-navigate', (event, destination) => {
    try {
      const next = new URL(destination);
      if (next.protocol === 'svitlo:' && next.hostname === 'app' && !devServerUrl) return;
      if (devServerUrl && next.origin === allowedOrigin) return;
    } catch {
      // Block malformed or privileged navigation.
    }
    event.preventDefault();
  });
  const url = (devServerUrl ? devServerUrl.replace(/\/$/, '') : PRODUCTION_ORIGIN) + INITIAL_PATH;
  void window.loadURL(url);
  return window;
}

export function lockDownSession(): void {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  session.defaultSession.setPermissionCheckHandler(() => false);
  if (app.isPackaged) {
    // A packaged lesson never needs an external host, even if a Scene tries to contact one.
    session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
      if (details.url.startsWith(PRODUCTION_ORIGIN + '/') || details.url.startsWith('file:')) {
        callback({});
      } else {
        callback({ cancel: true });
      }
    });
  }
}
