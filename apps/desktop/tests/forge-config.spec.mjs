import assert from 'node:assert/strict';
import { test } from 'node:test';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import config from '../forge.config.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

test('Forge packages only precompiled assets, never source or node_modules', () => {
  const ignore = config.packagerConfig.ignore;
  assert.equal(ignore(''), false, 'Packager must copy the application root');
  assert.equal(ignore('/'), false, 'Packager may represent the source root as /');
  for (const path of ['/package.json', '/dist-main/main.cjs', '/dist-renderer/assets/scene.js', '\\dist-renderer\\index.html']) {
    assert.equal(ignore(path), false, path);
  }
  assert.equal(ignore('/node_modules/react/index.js'), true);
  assert.equal(ignore('/src/main.tsx'), true);
  for (const relative of [
    'dist-main/main.cjs',
    'dist-renderer/index.html',
    'dist-renderer/assets/scene.js',
    'package.json',
  ]) {
    assert.equal(ignore(join(root, relative)), false, relative);
  }
  for (const relative of [
    'src/main.tsx',
    'electron/main.ts',
    'tests/a.spec.mjs',
    'node_modules/react/index.js',
    'public/data/a.json',
    'dist-renderer/assets/scene.js.map',
  ]) {
    assert.equal(ignore(join(root, relative)), true, relative);
  }
  assert.equal(config.packagerConfig.asar, true);
  assert.equal(config.packagerConfig.prune, false);
  assert.equal(config.plugins, undefined);
  assert.deepEqual(
    config.makers.map(maker => maker.name),
    ['@electron-forge/maker-squirrel', '@electron-forge/maker-zip', '@electron-forge/maker-deb'],
  );
});
