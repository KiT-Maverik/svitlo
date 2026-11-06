#!/usr/bin/env node
/** Generate a framework-independent ESM and prebuilt textbook resources. */
import { existsSync, readFileSync, readdirSync, mkdirSync, rmSync, copyFileSync, cpSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const id = 'economics';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repo = resolve(root, '../..');
const dist = join(root, 'dist');
const staticRoot = join(dist, 'static');
function run(command, args) {
  const result = spawnSync(command, args, { cwd: repo, stdio: 'inherit', env: process.env });
  if (result.error || result.status !== 0) throw new Error(command + ' ' + args.join(' ') + ' failed: ' + (result.error?.message ?? result.status));
}
function files(dir, prefix = '') {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) throw new Error('Symlink in textbook data: ' + entry.name);
    const name = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isDirectory()) return files(join(dir, entry.name), name);
    if (!entry.isFile()) throw new Error('Unexpected textbook input: ' + name);
    return [name];
  }).sort();
}
function authored(subpath) {
  return files(join(root, subpath)).some(name => name.endsWith('.data.ts'));
}
for (const [workspace, output] of [
  ['@svitlo/contracts', 'shared/contracts/dist/index.js'],
  ['@svitlo/engine', 'shared/engine/dist/index.js'],
]) {
  if (!existsSync(join(repo, output))) run('npm', ['run', 'build', '--workspace', workspace]);
}
rmSync(dist, { recursive: true, force: true });
mkdirSync(staticRoot, { recursive: true });
const common = {
  absWorkingDir: root, outdir: dist, bundle: true, platform: 'browser', format: 'esm',
  target: ['es2020'], packages: 'external', jsx: 'automatic',
  tsconfig: join(root, 'tsconfig.json'), metafile: true, logLevel: 'warning',
};
const metadata = await build({ ...common, entryPoints: { 'textbook/index': 'textbook.ts' } });
const scenes = await build({
  ...common, entryPoints: { 'scenes/index': 'scenes/index.ts' },
  banner: { js: '"use client";' },
});
run('npx', ['tsc', '-p', 'content/' + id + '/tsconfig.declarations.json']);
for (const [from, to] of [
  ['textbook.d.ts', 'textbook/index.d.ts'],
  ['scenes/index.d.ts', 'scenes/index.d.ts'],
  ['scenes/sceneLoader.d.ts', 'scenes/sceneLoader.d.ts'],
]) {
  const input = join(dist, '.declarations', from);
  if (!existsSync(input)) throw new Error('Missing compiled declaration ' + from);
  mkdirSync(dirname(join(dist, to)), { recursive: true });
  copyFileSync(input, join(dist, to));
}
rmSync(join(dist, '.declarations'), { recursive: true, force: true });
// These generators are existing Engine-based authoring tools; they are not shipped to hosts.
for (const [input, script, output] of [
  ['data/lessons', 'scripts/generators/pages/lessons/generate-lessons.mjs', 'data/pages/lessons'],
  ['data/skills', 'scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs', 'data/pages/skillAnalytics'],
]) {
  if (!authored(input)) continue;
  run(process.execPath, [script, '--package', 'content/' + id,
    '--output', relative(repo, join(staticRoot, output)), '--write']);
}
const sourcePublic = join(root, 'public');
if (existsSync(sourcePublic)) {
  cpSync(sourcePublic, join(staticRoot, 'textbooks', id), {
    recursive: true,
    filter(source) {
      return !['data', 'flags'].includes(relative(sourcePublic, source).split(sep)[0]);
    },
  });
}
const published = files(staticRoot);
for (const [source, prefix] of [
  ['data/lessons', 'data/pages/lessons/'],
  ['data/skills', 'data/pages/skillAnalytics/'],
]) {
  if (authored(source) && !published.some(file => file.startsWith(prefix) && file.endsWith('.json'))) {
    throw new Error('Missing JSON for authored ' + source);
  }
}
writeFileSync(join(dist, 'manifest.json'),
  JSON.stringify({ version: 1, textbook: id, files: published }, null, 2) + '\n');
for (const name of files(dist).filter(name => name.endsWith('.js'))) {
  const js = readFileSync(join(dist, name), 'utf8');
  if (/from\s*['"]@\//.test(js) || /import\s*\(\s*['"]@\//.test(js) ||
      /import\s+['"][^'"]*\.data\.ts['"]/.test(js) || /from\s*['"]next\//.test(js)) {
    throw new Error('Non-portable runtime import: dist/' + name);
  }
}
console.log('Compiled ' + id + ': ' + published.length + ' static resources; ' +
  (Object.keys(metadata.metafile.outputs).length + Object.keys(scenes.metafile.outputs).length) + ' ESM outputs');
