import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const desktopRoot = dirname(fileURLToPath(import.meta.url));
const payload = new Set(['.vite', 'package.json']);

// Forge Vite Plugin builds main and renderer into .vite/ before packaging.
// Copy only those bundles and the manifest: no workspace sources or node_modules.
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
  // Forge owns Vite dev, main/renderer builds and package-time bundling.
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        hotRestart: true,
        build: [{ entry: 'electron/main.ts', config: 'vite.main.config.ts' }],
        renderer: [{ name: 'main_window', config: 'vite.renderer.config.ts' }],
      },
    },
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: { name: 'Svitlo', authors: 'Svitlo', description: 'Offline-capable Svitlo textbooks' },
    },
    { name: '@electron-forge/maker-zip', platforms: ['darwin'] },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: { options: { name: 'svitlo', bin: 'svitlo', maintainer: 'Svitlo', section: 'education' } },
    },
  ],
};
