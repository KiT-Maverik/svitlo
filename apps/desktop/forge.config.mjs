import { dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const desktopRoot = dirname(fileURLToPath(import.meta.url));
const payload = new Set(['dist-main', 'dist-renderer', 'package.json']);

// Desktop's esbuild main and Vite renderer have no runtime Node dependencies.
// Copy only these compiled artifacts; never ship workspace sources or build tooling.
function ignoreUnpublishedFile(path) {
  const rel = relative(desktopRoot, path);
  if (!rel || rel === '.') return false;
  const parts = rel.split(sep);
  return !payload.has(parts[0]) || rel.endsWith('.map');
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
    { name: '@electron-forge/maker-dmg', platforms: ['darwin'] },
    { name: '@electron-forge/maker-deb', platforms: ['linux'], config: { options: { maintainer: 'Svitlo' } } },
  ],
};
