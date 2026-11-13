#!/usr/bin/env node
import { build } from 'esbuild';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
await build({
  entryPoints: [resolve(root, 'electron/main.ts')],
  outfile: resolve(root, 'dist-main/main.cjs'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22',
  external: ['electron'],
  sourcemap: false,
});
console.log('Electron main process bundled independently of repository paths');
