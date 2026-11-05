#!/usr/bin/env node
/** Publish a selected textbook into Desktop's own public directory (never into content/). */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { syncFlags } from '@svitlo/ui-kit/sync-flags';

const desktopRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(desktopRoot, '../..');
const catalog = JSON.parse(readFileSync(join(desktopRoot, 'textbooks.json'), 'utf8'));
const textbookId = process.env.SVITLO_TEXTBOOK ?? 'playground';
const selected = catalog[textbookId];
if (!selected || textbookId !== 'playground') {
  throw new Error('Desktop currently supports only SVITLO_TEXTBOOK=playground');
}
if (selected.package !== '@svitlo/playground' || selected.directory !== 'content/playground') {
  throw new Error('Desktop textbook manifest does not match the reviewed Playground package');
}
const bookRoot = join(repoRoot, selected.directory);
const bookManifest = JSON.parse(readFileSync(join(bookRoot, 'package.json'), 'utf8'));
const hostManifest = JSON.parse(readFileSync(join(desktopRoot, 'package.json'), 'utf8'));
if (bookManifest.name !== selected.package || hostManifest.dependencies[bookManifest.name] !== bookManifest.version) {
  throw new Error('Selected textbook must be a declared, version-matched Desktop dependency');
}
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(command, args) {
  const result = spawnSync(command, args, { cwd: repoRoot, env: process.env, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(command + ' ' + args.join(' ') + ' failed: ' + (result.error?.message ?? result.status));
  }
}
for (const workspace of ['@svitlo/contracts', '@svitlo/engine', '@svitlo/ui-kit', '@svitlo/adapter-electron']) {
  run(npm, ['run', 'build', '--workspace', workspace]);
}
// Reuse the committed static Scene Registry. Its generator's --check currently compares
// raw (unformatted) output to a Prettier-formatted registry, producing a false failure.
// Scene resolution and lazy chunks are verified by Desktop's compiled-bundle tests.

const publicRoot = join(desktopRoot, 'public');
const lessonOutput = join(publicRoot, 'data/pages/lessons');
const localeOutput = join(publicRoot, 'data/ui-kit');
for (const directory of [lessonOutput, localeOutput]) rmSync(directory, { recursive: true, force: true });

run('node', [
  'scripts/generators/pages/lessons/generate-lessons.mjs',
  '--package', selected.directory,
  '--output', 'apps/desktop/public/data/pages/lessons',
  '--write',
]);
run('node', [
  'scripts/generators/pages/lessons/generate-lessons.mjs',
  '--package', selected.directory,
  '--output', 'apps/desktop/public/data/pages/lessons',
  '--check',
]);
run('node', [
  'shared/ui-kit/scripts/generate-locales.mjs',
  '--package', selected.directory,
  '--output', 'apps/desktop/public/data/ui-kit',
]);
syncFlags(desktopRoot);
const sourceAssets = join(bookRoot, 'public');
const targetAssets = join(publicRoot, 'textbooks', textbookId);
rmSync(join(publicRoot, 'textbooks'), { force: true, recursive: true });
if (existsSync(sourceAssets)) {
  mkdirSync(join(publicRoot, 'textbooks'), { recursive: true });
  cpSync(sourceAssets, targetAssets, {
    recursive: true,
    filter(source) {
      const nested = relative(sourceAssets, source);
      return nested === '' || !['data', 'flags'].includes(nested.split(sep)[0]);
    },
  });
}
if (!existsSync(lessonOutput) || !existsSync(join(localeOutput, 'uk-UA.json'))) {
  throw new Error('Desktop lesson or UI Kit localization output is missing');
}
console.log('Desktop content prepared for ' + textbookId + ' without changing the textbook package');
