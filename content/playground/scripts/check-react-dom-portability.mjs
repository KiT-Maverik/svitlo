#!/usr/bin/env node
/**
 * Pack the built textbook and compile it in an isolated plain React DOM
 * consumer. The test consumer has no monorepo TypeScript path aliases and no
 * access to the textbook source tree.
 */
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(root, '../..');
const temp = mkdtempSync(join(tmpdir(), 'svitlo-playground-pack-'));
function command(program, args, cwd = repoRoot) {
  const result = spawnSync(program, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, program + ' ' + args.join(' ') + '\n' + result.stdout + '\n' + result.stderr);
  return result.stdout;
}
try {
  const packed = JSON.parse(
    command('npm', [
      'pack',
      '--workspace',
      '@svitlo/playground',
      '--ignore-scripts',
      '--pack-destination',
      temp,
      '--json',
    ]),
  );
  const details = Array.isArray(packed) ? packed[0] : packed['@svitlo/playground'];
  assert(details, 'npm pack omitted the Playground workspace');
  const archive = join(temp, details.filename);
  const shipped = details.files.map(file => file.path);
  assert(shipped.includes('dist/scenes/index.js'), 'Tarball missing compiled Scene export');
  assert(
    /^['\"]use client['\"];/.test(readFileSync(join(root, 'dist/scenes/index.js'), 'utf8')),
    'Compiled Scene Registry lost its client boundary',
  );
  assert(shipped.includes('dist/scenes/index.d.ts'), 'Tarball missing Scene declarations');
  assert(shipped.includes('dist/styles.css'), 'Tarball missing Scene stylesheet');
  assert(shipped.includes('scripts/publish.mjs'), 'Tarball missing Publish CLI');
  assert(
    shipped.some(name => name.startsWith('dist/static/data/pages/lessons/')),
    'Tarball missing lesson JSON',
  );
  assert(!shipped.some(name => /^(src|data)\//.test(name)), 'Tarball shipped private authoring source');

  const packageLocation = join(temp, 'node_modules/@svitlo/playground');
  mkdirSync(packageLocation, { recursive: true });
  command('tar', ['-xzf', archive, '-C', packageLocation, '--strip-components=1'], temp);
  const code = [
    "import { createElement } from 'react';",
    "import { createRoot } from 'react-dom/client';",
    "import { textbook } from '@svitlo/playground';",
    "import { resolveScene } from '@svitlo/playground/scenes';",
    "import '@svitlo/playground/styles';",
    "const scene = resolveScene('how-light-moves-scene-showcase');",
    "if (!textbook.id || !scene) throw new Error('Portable textbook export is missing');",
    "const element = document.getElementById('root');",
    'if (element) createRoot(element).render(createElement(scene, {locales: {}}));',
  ].join('\n');
  const result = await build({
    stdin: { contents: code, resolveDir: temp, sourcefile: 'portable-consumer.tsx', loader: 'tsx' },
    bundle: true,
    platform: 'browser',
    format: 'esm',
    splitting: true,
    target: ['es2020'],
    outdir: join(temp, 'consumer'),
    write: false,
    metafile: true,
    logLevel: 'warning',
    external: [
      'react',
      'react/*',
      'react-dom',
      'react-dom/*',
      '@svitlo/engine',
      '@svitlo/engine/*',
      '@svitlo/ui-kit',
      '@svitlo/ui-kit/*',
      '@mui/*',
      '@emotion/*',
    ],
  });
  const inputs = Object.keys(result.metafile.inputs).map(path => path.replaceAll('\\', '/'));
  assert(
    inputs.some(path => path.includes('/dist/scenes/index.js')),
    'Compiled Scene entrypoint was not bundled',
  );
  assert(
    inputs.some(path => path.includes('/dist/chunks/') && path.endsWith('.js')),
    'Lazy Scene chunk not bundled',
  );
  assert(
    inputs.some(path => path.includes('/dist/') && path.endsWith('.css')),
    'Scene CSS was not included',
  );
  assert(
    !inputs.some(path => path.includes('content/playground/src/') || path.endsWith('.data.ts')),
    'Consumer resolved private textbook source',
  );
  assert(
    !inputs.some(path => path.includes('/next/') || path.includes('/react/index.js')),
    'Consumer unexpectedly bundled Next.js or a private React copy',
  );
  assert(
    Object.values(result.metafile.outputs).some(output => output.imports.some(item => item.kind === 'dynamic-import')),
    'Lazy Scene splitting was lost',
  );
  assert(
    Object.keys(result.metafile.outputs).some(name => name.endsWith('.css')),
    'Consumer build emitted no stylesheet',
  );
  console.log('Packed Playground Scenes, CSS Modules and React DOM compile without Next.js or authoring source');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
