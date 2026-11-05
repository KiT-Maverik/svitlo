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
  ['@svitlo/ui-kit', 'shared/ui-kit/dist/index.js'],
]) {
  if (!existsSync(join(repoRoot, compiled))) run('npm', ['run', 'build', '--workspace', workspace]);
}
run('npm', ['run', 'check:scenes', '--workspace', '@svitlo/playground']);
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Compile metadata separately: Next.js Server Components may import it safely.
// Compiled Scenes must retain a client directive at their module boundary.
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
  plugins: [
    {
      name: 'textbook-css-modules',
      setup(builder) {
        builder.onLoad({ filter: /\.module\.css$/ }, async args => ({
          contents: readFileSync(args.path, 'utf8'),
          resolveDir: dirname(args.path),
          loader: 'local-css',
        }));
      },
    },
  ],
  loader: {
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.webp': 'file',
    '.gif': 'file',
    '.woff2': 'file',
  },
};
const metadata = await build({
  ...common,
  entryPoints: {
    'textbook/index': 'textbook.ts',
  },
});
const scenes = await build({
  ...common,
  splitting: true,
  entryPoints: {
    'scenes/index': 'scenes/index.ts',
  },
  banner: { js: '"use client";' },
});

// The public stylesheet imports the CSS bundles emitted for lazy Scenes.
// Keep those bundles at their original paths so asset URLs remain relative.
const css = filesUnder(dist).filter(name => name.endsWith('.css'));
writeFileSync(join(dist, 'styles.css'), css.map(name => '@import "./' + name + '";').join('\n') + '\n');

run('npx', ['tsc', '-p', 'content/playground/tsconfig.declarations.json']);
for (const [from, to] of [
  ['textbook.d.ts', 'textbook/index.d.ts'],
  ['scenes/index.d.ts', 'scenes/index.d.ts'],
  ['scenes/sceneLoader.d.ts', 'scenes/sceneLoader.d.ts'],
]) {
  const input = join(dist, '.declarations', from);
  if (!existsSync(input)) throw new Error('Missing TypeScript declaration: ' + from);
  mkdirSync(dirname(join(dist, to)), { recursive: true });
  copyFileSync(input, join(dist, to));
}
rmSync(join(dist, '.declarations'), { recursive: true, force: true });

// Keep the existing lesson/analytics generators and their Engine APIs as the
// source of truth. They run here, not in any consuming application.
for (const [script, target] of [
  ['scripts/generators/pages/lessons/generate-lessons.mjs', 'data/pages/lessons'],
  ['scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs', 'data/pages/skillAnalytics'],
]) {
  const output = relative(repoRoot, join(resources, target));
  run(process.execPath, [script, '--package', 'content/playground', '--output', output, '--write']);
}
const sourcePublic = join(packageRoot, 'public');
if (existsSync(sourcePublic)) {
  cpSync(sourcePublic, join(resources, 'textbooks/playground'), {
    recursive: true,
    filter(source) {
      const part = relative(sourcePublic, source).split(sep)[0];
      return !['data', 'flags'].includes(part);
    },
  });
}
const published = filesUnder(resources);
if (!published.some(name => name.startsWith('data/pages/lessons/') && name.endsWith('.json'))) {
  throw new Error('Playground build produced no lesson JSON');
}
if (!published.some(name => name.startsWith('data/pages/skillAnalytics/') && name.endsWith('.json'))) {
  throw new Error('Playground build produced no Skills Analytics JSON');
}
writeFileSync(
  join(dist, 'manifest.json'),
  JSON.stringify({ version: 1, textbook: 'playground', files: published }, null, 2) + '\n',
);

// Verify no private TypeScript alias or source authoring import escaped to JS.
for (const name of filesUnder(dist).filter(name => name.endsWith('.js'))) {
  const js = readFileSync(join(dist, name), 'utf8');
  if (/from\s*['"]@\//.test(js) || /import\s*\(\s*['"]@\//.test(js) || /import\s+['"][^'"]*\.data\.ts['"]/.test(js)) {
    throw new Error('Unresolved internal import in dist/' + name);
  }
}
console.log(
  'Compiled Playground: ' +
    published.length +
    ' static resources; ' +
    (Object.keys(metadata.metafile.outputs).length + Object.keys(scenes.metafile.outputs).length) +
    ' browser outputs',
);
