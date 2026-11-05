#!/usr/bin/env node
/**
 * Compile the real Playground Scene package with a plain browser bundler.
 * No Next.js compiler, App Router, or transpilePackages participates.
 * This validates portability of the public package exports and lazy Scenes.
 */
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = `
  import { createElement } from 'react';
  import { createRoot } from 'react-dom/client';
  import { resolveScene } from '@svitlo/playground/scenes';
  import { SceneLocaleProvider } from '@svitlo/ui-kit/scene-locale';

  const scene = resolveScene('how-light-moves-scene-showcase');
  if (!scene) throw new Error('Scene registry did not resolve a Playground Scene');
  const root = document.getElementById('root');
  if (root) createRoot(root).render(
    createElement(SceneLocaleProvider, { locale: 'uk-UA' }, createElement('span', null, 'Portable React DOM'))
  );
`;

const result = await build({
  stdin: { contents: source, resolveDir: root, sourcefile: 'portable-scene.tsx', loader: 'tsx' },
  bundle: true,
  platform: 'browser',
  format: 'esm',
  splitting: true,
  jsx: 'automatic',
  outdir: resolve(root, '.test-build/portability'),
  write: false,
  metafile: true,
  logLevel: 'warning',
});
const inputs = Object.keys(result.metafile.inputs);
assert(inputs.some(file => file.includes('/scenes/sceneLoader.ts')), 'Non-Next build did not bundle Scene registry');
assert(inputs.some(file => file.includes('/scenes/e/how-light-moves-scene-showcase/Showcase.tsx')),
  'Non-Next build did not include the authored Scene');
assert(Object.values(result.metafile.outputs).some(output =>
  output.imports.some(entry => entry.kind === 'dynamic-import')),
'Non-Next build did not preserve statically analyzable lazy Scene chunks');
console.log('Playground Scene registry and React DOM compile with esbuild without Next.js');
