import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const desktopRoot = dirname(fileURLToPath(import.meta.url));
const payload = new Set(['dist-main', 'dist-renderer', 'package.json']);

// Desktop's esbuild main and Vite renderer have no runtime Node dependencies.
// Copy only these compiled artifacts; never ship workspace sources or build tooling.
function ignoreUnpublishedFile(path) {
  // Electron Packager calls the predicate with an empty root string, followed
  // by root-relative paths such as "/package.json" or absolute source paths.
  if (!path || path === '/' || path === '\\') return false;
  const source = path.replaceAll('\\', '/');
  const root = desktopRoot.replaceAll('\\', '/');
  const relativePath = source.startsWith(root + '/') ? source.slice(root.length + 1) : source.replace(/^\/+/, '');
  return !payload.has(relativePath.split('/')[0]) || relativePath.endsWith('.map');
}

export default {
  outDir: 'out',
  packagerConfig: {
    name: 'Svitlo',
    executableName: 'svitlo',
    appBundleId: 'org.svitlo.desktop',
    appCategoryType: 'public.app-category.education',
    asar: true,
    // No native runtime modules or Node deps are loaded by the emitted main bundle.
    prune: false,
    ignore: ignoreUnpublishedFile,
  },
  // Do not insert a second Vite/webpack pipeline; app:build runs beforehand.
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: { name: 'Svitlo', authors: 'Svitlo', description: 'Offline-capable Svitlo textbooks' },
    },
    { name: '@electron-forge/maker-zip', platforms: ['darwin'] },
    { name: '@electron-forge/maker-deb', platforms: ['linux'], config: { options: { maintainer: 'Svitlo' } } },
  ],
};
