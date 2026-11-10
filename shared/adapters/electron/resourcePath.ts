import { extname, isAbsolute, relative, resolve, sep } from 'node:path';

/**
 * Map a trusted app protocol request to a single packaged renderer file.
 * An extensionless path is a client-side route and receives index.html.
 * No arbitrary filesystem path ever crosses the Electron/renderer boundary.
 */
export function resolvePackagedResource(root: string, requestUrl: string): string {
  const url = new URL(requestUrl);
  if (url.protocol !== 'svitlo:' || url.hostname !== 'app' || url.port || url.username || url.password) {
    throw new Error('Unrecognized application origin');
  }
  const pathname = decodeURIComponent(url.pathname);
  if (
    !pathname.startsWith('/') ||
    pathname.includes('\\') ||
    pathname.includes('\0') ||
    pathname.split('/').some(segment => segment === '.' || segment === '..') ||
    pathname.includes('//')
  ) {
    throw new Error('Invalid resource path');
  }
  const relativeResource = extname(pathname) ? pathname.slice(1) : 'index.html';
  const absoluteRoot = resolve(root);
  const target = resolve(absoluteRoot, relativeResource);
  const within = relative(absoluteRoot, target);
  if (!within || within.startsWith('..' + sep) || within === '..' || isAbsolute(within)) {
    throw new Error('Resource must remain inside the packaged application');
  }
  return target;
}
