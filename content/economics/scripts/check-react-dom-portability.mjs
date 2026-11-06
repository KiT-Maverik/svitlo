#!/usr/bin/env node
/** Isolated npm tarball consumer: no textbook authoring source or Next.js. */
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';
const id = 'economics';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repo = resolve(root, '../..');
const tmp = mkdtempSync(join(tmpdir(), 'svitlo-' + id + '-pack-'));
function command(cmd, args, cwd = repo) {
  const result = spawnSync(cmd, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, cmd + ' ' + args.join(' ') + '\n' + result.stdout + '\n' + result.stderr);
  return result.stdout;
}
try {
  const result = JSON.parse(command('npm',
    ['pack', '--workspace', '@svitlo/' + id, '--ignore-scripts', '--pack-destination', tmp, '--json']));
  const pkg = Array.isArray(result) ? result[0] : result['@svitlo/' + id];
  assert(pkg, 'npm pack omitted the selected textbook');
  const shipped = pkg.files.map(file => file.path);
  for (const name of ['dist/textbook/index.js', 'dist/textbook/index.d.ts', 'dist/scenes/index.js',
    'dist/scenes/index.d.ts', 'dist/manifest.json', 'scripts/publish.mjs']) {
    assert(shipped.includes(name), 'Missing compiled/packed artifact: ' + name);
  }
  assert(shipped.some(name => name.startsWith('dist/static/data/pages/skillAnalytics/')));
  assert(!shipped.some(name => /^(?:src|data)\//.test(name) || name.includes('next.config')));
  assert(/^['"]use client['"];/.test(readFileSync(join(root, 'dist/scenes/index.js'), 'utf8')));
  const location = join(tmp, 'node_modules/@svitlo', id);
  mkdirSync(location, { recursive: true });
  command('tar', ['-xzf', join(tmp, pkg.filename), '-C', location, '--strip-components=1'], tmp);
  const code = [
    "import { textbook } from '@svitlo/economics';",
    "import { resolveScene } from '@svitlo/economics/scenes';",
    "if (textbook.id !== 'economics' || resolveScene('nonexistent') !== undefined) throw new Error('Bad exports');",
    'export { textbook, resolveScene };',
  ].join('\n');
  const compiled = await build({
    stdin: { contents: code, resolveDir: tmp, sourcefile: 'consumer.ts', loader: 'ts' },
    bundle: true, platform: 'browser', format: 'esm', write: false, metafile: true,
    outdir: join(tmp, 'consumer'), logLevel: 'warning',
    external: ['react', 'react/*', 'react-dom', 'react-dom/*', '@svitlo/engine', '@svitlo/engine/*'],
  });
  const inputs = Object.keys(compiled.metafile.inputs).map(path => path.replaceAll('\\', '/'));
  assert(inputs.some(path => path.includes('/dist/textbook/index.js')));
  assert(inputs.some(path => path.includes('/dist/scenes/index.js')));
  assert(!inputs.some(path => path.includes('src/app/') || path.endsWith('.data.ts') || path.includes('/next/')));
  console.log('Packed ' + id + ' compiles in an isolated React DOM / esbuild consumer');
} finally { rmSync(tmp, { recursive: true, force: true }); }
