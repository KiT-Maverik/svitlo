#!/usr/bin/env node
/** Browser bundle guard: resolve the actual runtime dependency graph with esbuild. */
import { build } from 'esbuild';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const entry = resolve(root, 'shared/engine/runtime.ts');
const result = await build({
  entryPoints: [entry],
  bundle: true,
  write: false,
  metafile: true,
  platform: 'browser',
  format: 'esm',
  packages: 'external',
  logLevel: 'silent',
});
const inputs = Object.keys(result.metafile.inputs);
const forbidden = inputs.filter(input =>
  /(?:^|[/\\])(?:generators|configurators_old)(?:[/\\])/.test(input) ||
  /[/\\]define[A-Z][A-Za-z0-9]*\.(?:ts|js)$/.test(input) ||
  /\.data\.(?:ts|js)$/.test(input) ||
  /[/\\]validateLocalAssets(?:[/\\]|\.)/.test(input)
);
if (forbidden.length) throw new Error('Build-time modules reached from Engine runtime:\n' + forbidden.join('\n'));
const text = result.outputFiles.map(file => file.text).join('\n');
if (/\b(?:node:fs|node:path|node:url)\b/.test(text)) throw new Error('Node-only imports in Engine runtime browser bundle');
console.log('Engine runtime browser dependency graph verified (' + inputs.length + ' internal inputs).');
