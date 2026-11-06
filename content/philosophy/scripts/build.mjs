#!/usr/bin/env node
/**
 * Compile the platform-neutral textbook distribution.
 * Build-time generators are shared monorepo tools; consumers only see dist/.
 */
import { existsSync, readFileSync, readdirSync, mkdirSync, rmSync, copyFileSync, cpSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const packageRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(packageRoot, '../..');
const dist = join(packageRoot, 'dist');
const resources = join(dist, 'static');

function run(program, args) {
  const result = spawnSync(program, args, { cwd: repoRoot, stdio: 'inherit', env: process.env });
  if (result.error || result.status !== 0) {
    throw new Error(program + ' ' + args.join(' ') + ': ' + (result.error?.message ?? 'exit ' + result.status));
  }
}
function filesUnder(root, prefix = '') {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .flatMap(entry => {
      if (entry.isSymbolicLink()) throw new Error('Symlink in textbook artifacts: ' + entry.name);
      const name = prefix ? prefix + '/' + entry.name : entry.name;
      if (entry.isDirectory()) return filesUnder(join(root, entry.name), name);
      if (!entry.isFile()) throw new Error('Unexpected textbook artifact: ' + name);
      return [name];
    })
    .sort();
}

// Standalone workspace builds after npm ci must have compiled declarations from
// the shared packages. A Web host may already have prepared them.
for (const [workspace, compiled] of [
  ['@svitlo/contracts', 'shared/contracts/dist/index.js'],
  ['@svitlo/engine', 'shared/engine/dist/index.js'],
  ['@svitlo/ui-kit', 'shared/ui-kit/dist/src/index.js'],
]) {
  if (!existsSync(join(repoRoot, compiled))) run('npm', ['run', 'build', '--workspace', workspace]);
}
rmSync(dist, { recursive: true, force: true });
mkdirSync(resources, { recursive: true });

// Compile book metadata with browser-safe ESM; no authored Scene sources exist yet.
const common = {
  absWorkingDir: packageRoot,
  outdir: dist,
  bundle: true,
  platform: 'browser',
  format: 'esm',
  target: ['es2020'],
  packages: 'external',
  jsx: 'automatic',
  tsconfig: join(packageRoot, 'tsconfig.json'),
  entryNames: '[dir]/[name]',
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  metafile: true,
  logLevel: 'warning',
};
const metadata = await build({
  ...common,
  entryPoints: {
    'textbook/index': 'textbook.ts',
  },
});

run('npx', ['tsc', '-p', 'content/philosophy/tsconfig.declarations.json']);
for (const [from, to] of [['textbook.d.ts', 'textbook/index.d.ts']]) {
  const input = join(dist, '.declarations', from);
  if (!existsSync(input)) throw new Error('Missing TypeScript declaration: ' + from);
  mkdirSync(dirname(join(dist, to)), { recursive: true });
  copyFileSync(input, join(dist, to));
}
rmSync(join(dist, '.declarations'), { recursive: true, force: true });

// Generate only real authored data. Scene design briefs (.md) are not lessons.
for (const [directory, script, target] of [
  ['data/lessons', 'scripts/generators/pages/lessons/generate-lessons.mjs', 'data/pages/lessons'],
  ['data/skills', 'scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs', 'data/pages/skillAnalytics'],
]) {
  const authored = filesUnder(join(packageRoot, directory)).some(file => file.endsWith('.data.ts'));
  if (!authored) continue;
  const output = relative(repoRoot, join(resources, target));
  run(process.execPath, [script, '--package', 'content/philosophy', '--output', output, '--write']);
}
const sourcePublic = join(packageRoot, 'public');
if (existsSync(sourcePublic)) {
  cpSync(sourcePublic, join(resources, 'textbooks/philosophy'), {
    recursive: true,
    filter(source) {
      const part = relative(sourcePublic, source).split(sep)[0];
      return !['data', 'flags'].includes(part);
    },
  });
}
const published = filesUnder(resources);
for (const [directory, prefix] of [
  ['data/lessons', 'data/pages/lessons/'],
  ['data/skills', 'data/pages/skillAnalytics/'],
]) {
  if (filesUnder(join(packageRoot, directory)).some(file => file.endsWith('.data.ts')) &&
      !published.some(file => file.startsWith(prefix) && file.endsWith('.json'))) {
    throw new Error('Authored ' + directory + ' did not produce published JSON');
  }
}
writeFileSync(
  join(dist, 'manifest.json'),
  JSON.stringify({ version: 1, textbook: 'philosophy', files: published }, null, 2) + '\n',
);

// Verify no private TypeScript alias or source authoring import escaped to JS.
for (const name of filesUnder(dist).filter(name => name.endsWith('.js'))) {
  const js = readFileSync(join(dist, name), 'utf8');
  if (/from\s*['"]@\//.test(js) || /import\s*\(\s*['"]@\//.test(js) || /import\s+['"][^'"]*\.data\.ts['"]/.test(js)) {
    throw new Error('Unresolved internal import in dist/' + name);
  }
}
console.log(
  'Compiled philosophy: ' +
    published.length +
    ' static resources; ' +
    Object.keys(metadata.metafile.outputs).length +
    ' browser outputs',
);
