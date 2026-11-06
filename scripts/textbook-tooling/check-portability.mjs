#!/usr/bin/env node
/** Verify each packed textbook independently of authored sources and Next.js. */
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const root = resolve(process.cwd());
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const id = pkg.name?.match(/^@svitlo\/([a-z][a-z-]*)$/)?.[1];
if (!id || !root.endsWith(sep + 'content' + sep + id)) {
  throw new Error('Run test:portability from a textbook workspace');
}
const hasScenes = Boolean(pkg.exports?.['./scenes']);
const hasStyles = Boolean(pkg.exports?.['./styles']);
const temp = mkdtempSync(join(tmpdir(), 'svitlo-' + id + '-pack-'));
function command(program, args, cwd = root) {
  const result = spawnSync(program, args, { cwd, encoding: 'utf8', env: process.env });
  assert.equal(result.status, 0, program + ' ' + args.join(' ') + '\n' + result.stdout + '\n' + result.stderr);
  return result.stdout;
}
try {
  const result = JSON.parse(command('npm', [
    'pack', '--workspace', pkg.name, '--ignore-scripts', '--pack-destination', temp, '--json',
  ]));
  const details = Array.isArray(result) ? result[0] : result[pkg.name];
  assert(details, 'Selected textbook missing from npm pack');
  const shipped = details.files.map(file => file.path);
  for (const name of [
    'dist/textbook/index.js', 'dist/textbook/index.d.ts', 'dist/manifest.json', 'dist/publish.mjs',
    ...(hasScenes ? ['dist/scenes/index.js', 'dist/scenes/index.d.ts'] : []),
    ...(hasStyles ? ['dist/styles.css'] : []),
  ]) {
    assert(shipped.includes(name), 'Missing packed artifact: ' + name);
  }
  assert(!shipped.some(name => /^(src|data|scenes|scripts)\//.test(name) || name.includes('next.config')),
    'Authoring sources or build scripts leaked into package');
  const manifest = JSON.parse(readFileSync(join(root, 'dist/manifest.json'), 'utf8'));
  assert.equal(manifest.textbook, id);
  assert(Array.isArray(manifest.files));
  if (hasScenes) {
    assert(/^['"]use client['"];/.test(readFileSync(join(root, 'dist/scenes/index.js'), 'utf8')),
      'Compiled Scene module lost its client boundary');
  }
  const location = join(temp, 'node_modules/@svitlo', id);
  mkdirSync(location, { recursive: true });
  command('tar', ['-xzf', join(temp, details.filename), '-C', location, '--strip-components=1'], temp);
  const source = [
    "import { textbook } from '@svitlo/" + id + "';",
    ...(hasScenes ? ["import { resolveScene } from '@svitlo/" + id + "/scenes';"] : []),
    ...(hasStyles ? ["import '@svitlo/" + id + "/styles';"] : []),
    "if (textbook.id !== '" + id + "') throw new Error('Wrong textbook ID');",
    ...(hasScenes ? ["if (resolveScene('missing-scene') !== undefined) throw new Error('Unexpected Scene');"] : []),
    'export { textbook };',
  ].join('\n');
  const compiled = await build({
    stdin: { contents: source, resolveDir: temp, sourcefile: 'portable-consumer.ts', loader: 'ts' },
    bundle: true, platform: 'browser', format: 'esm', target: ['es2020'],
    metafile: true, write: false, outdir: join(temp, 'consumer'), logLevel: 'warning',
    external: [
      'react', 'react/*', 'react-dom', 'react-dom/*',
      '@svitlo/engine', '@svitlo/engine/*', '@svitlo/ui-kit', '@svitlo/ui-kit/*',
      '@svitlo/contracts', '@svitlo/contracts/*', '@mui/*', '@emotion/*',
    ],
  });
  const inputs = Object.keys(compiled.metafile.inputs).map(name => name.replaceAll('\\', '/'));
  assert(inputs.some(name => name.includes('/dist/textbook/index.js')), 'Missing compiled metadata');
  if (hasScenes) assert(inputs.some(name => name.includes('/dist/scenes/index.js')), 'Missing compiled Scene registry');
  assert(!inputs.some(name => name.endsWith('.data.ts') || name.includes('/next/') ||
    name.includes('/src/app/')), 'Consumer imported authored or framework-specific files');
  console.log('Portable npm tarball verified: ' + pkg.name);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
