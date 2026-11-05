#!/usr/bin/env node
/** Check the packaged ESM export without authoring sources or a Next.js host. */
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(root, '../..');
const temp = mkdtempSync(join(tmpdir(), 'svitlo-biology-pack-'));
function command(program, args, cwd = repoRoot) {
  const run = spawnSync(program, args, { cwd, encoding: 'utf8' });
  assert.equal(run.status, 0, program + ' ' + args.join(' ') + '\n' + run.stdout + '\n' + run.stderr);
  return run.stdout;
}
try {
  const packed = JSON.parse(command('npm', ['pack', '--workspace', '@svitlo/biology',
    '--ignore-scripts', '--pack-destination', temp, '--json']));
  const details = Array.isArray(packed) ? packed[0] : packed['@svitlo/biology'];
  assert.ok(details, 'Missing packed textbook');
  const shipped = details.files.map(file => file.path);
  for (const path of ['dist/textbook/index.js', 'dist/textbook/index.d.ts',
    'dist/manifest.json', 'scripts/publish.mjs']) assert.ok(shipped.includes(path), 'Missing '+path);
  assert.ok(!shipped.some(file => /^(src|data)\//.test(file)), 'Authoring source shipped');
  assert.ok(!shipped.some(file => /next\.config|\/next\//.test(file)), 'Next.js scaffold shipped');
  const packageRoot = join(temp, 'node_modules/@svitlo/biology');
  mkdirSync(packageRoot, { recursive: true });
  command('tar', ['-xzf', join(temp, details.filename), '-C', packageRoot, '--strip-components=1'], temp);
  const manifest = JSON.parse(readFileSync(join(packageRoot, 'dist/manifest.json'), 'utf8'));
  assert.equal(manifest.textbook, 'biology');
  const { textbook } = await import(pathToFileURL(join(packageRoot, 'dist/textbook/index.js')));
  assert.equal(textbook.id, 'biology');
  assert.equal(textbook.skillAnalyticsDomains.length, 11);
  const input = join(temp, 'consumer.mjs');
  writeFileSync(input, "import { textbook } from '@svitlo/biology';\nif (!textbook.id) throw Error('Missing metadata');\n");
  const result = await build({ entryPoints: [input], bundle: true, platform: 'browser',
    format: 'esm', write: false, outdir: join(temp, 'bundled'), metafile: true });
  const sources = Object.keys(result.metafile.inputs).map(s => s.replaceAll('\\', '/'));
  assert.ok(sources.some(s => s.includes('/dist/textbook/index.js')), 'ESM export not resolved');
  assert.ok(!sources.some(s => s.endsWith('.data.ts') || s.includes('/next/')),
    'Build consumed authoring source or Next.js');
  console.log('Packed biology metadata, 11 Skills Domains and Publish CLI resolve in isolation');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
