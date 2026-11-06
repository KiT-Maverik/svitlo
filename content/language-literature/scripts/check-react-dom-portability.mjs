#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const name = 'language-literature';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(root, '../..');
const temp = mkdtempSync(join(tmpdir(), 'svitlo-' + name + '-pack-'));
function command(program, args, cwd = repoRoot) {
  const result = spawnSync(program, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, program + ' ' + args.join(' ') + '\n' + result.stdout + '\n' + result.stderr);
  return result.stdout;
}
try {
  const packed = JSON.parse(command('npm', ['pack', '--workspace', '@svitlo/' + name, '--ignore-scripts', '--pack-destination', temp, '--json']));
  const details = Array.isArray(packed) ? packed[0] : packed['@svitlo/' + name];
  assert(details, 'npm pack omitted the textbook workspace');
  const shipped = details.files.map(file => file.path);
  assert(shipped.includes('dist/textbook/index.js'), 'Tarball missing compiled metadata');
  assert(shipped.includes('dist/textbook/index.d.ts'), 'Tarball missing declarations');
  assert(shipped.includes('dist/manifest.json'), 'Tarball missing resource manifest');
  assert(shipped.includes('scripts/publish.mjs'), 'Tarball missing Publish CLI');
  assert(!shipped.some(path => /^(src|data|scenes)\//.test(path)), 'Tarball contains authoring sources');
  const manifest = JSON.parse(readFileSync(join(root, 'dist/manifest.json'), 'utf8'));
  assert.equal(manifest.textbook, name);
  assert(Array.isArray(manifest.files));
  assert.equal(manifest.files.filter(path => path.startsWith('data/pages/')).length, 0, 'Metadata-only textbook should not fabricate JSON');
  const packageDir = join(temp, 'node_modules/@svitlo', name);
  mkdirSync(packageDir, { recursive: true });
  command('tar', ['-xzf', join(temp, details.filename), '-C', packageDir, '--strip-components=1'], temp);
  const consumer = await build({
    stdin: { contents: "import { textbook } from '@svitlo/" + name + "'; if (!textbook.id) throw new Error('Missing textbook id');", resolveDir: temp, sourcefile: 'consumer.ts', loader: 'ts' },
    bundle: true, platform: 'browser', format: 'esm', target: ['es2020'],
    write: false, metafile: true, logLevel: 'warning',
  });
  const inputs = Object.keys(consumer.metafile.inputs).map(path => path.replaceAll('\\\\', '/'));
  assert(inputs.some(path => path.endsWith('/dist/textbook/index.js')), 'Consumer did not resolve compiled export');
  assert(!inputs.some(path => path.endsWith('.data.ts') || path.includes('/next/') || path.includes('/src/')), 'Consumer imported private sources');
  console.log('Portable npm tarball verified: @svitlo/' + name);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
