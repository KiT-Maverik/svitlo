#!/usr/bin/env node
/** Browser bundle guard: resolve the actual runtime dependency graph with esbuild. */
import { build } from 'esbuild';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const defaultEntry = resolve(root, 'shared/engine/runtime.ts');

/** Validate the emitted browser bundle and its transitive module graph. */
export async function checkEngineRuntimeGraph(entry = defaultEntry) {
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
  const forbidden = inputs.filter(
    input =>
      /(?:^|[/\\])(?:generators|configurators_old)(?:[/\\])/.test(input) ||
      /[/\\]define[A-Z][A-Za-z0-9]*\.(?:ts|js)$/.test(input) ||
      /\.data\.(?:ts|js)$/.test(input) ||
      /[/\\]validateLocalAssets(?:[/\\]|\.)/.test(input),
  );
  if (forbidden.length) throw new Error('Build-time modules reached from Engine runtime:\n' + forbidden.join('\n'));

  const emitted = result.outputFiles.map(file => file.text).join('\n');
  if (/\b(?:node:fs|node:path|node:url)\b/.test(emitted))
    throw new Error('Node-only imports in Engine runtime browser bundle');

  const forbiddenEngineImports = Object.values(result.metafile.outputs)
    .flatMap(output => output.imports.map(dependency => dependency.path))
    .filter(
      path =>
        path === '@svitlo/engine' ||
        path === '@svitlo/engine/build' ||
        path.startsWith('@svitlo/engine/build/'),
    );
  if (forbiddenEngineImports.length) {
    throw new Error('Engine build/root imports reached from runtime:\n' + forbiddenEngineImports.join('\n'));
  }

  return inputs.length;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const checked = await checkEngineRuntimeGraph();
  console.log('Engine runtime browser dependency graph verified (' + checked + ' internal inputs).');
}
