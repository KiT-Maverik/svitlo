#!/usr/bin/env node
/** Stage the selected textbook's prebuilt resources for the Electron host. */
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

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
const bookManifest = JSON.parse(readFileSync(join(repoRoot, selected.directory, 'package.json'), 'utf8'));
const hostManifest = JSON.parse(readFileSync(join(desktopRoot, 'package.json'), 'utf8'));
if (bookManifest.name !== selected.package || hostManifest.dependencies[bookManifest.name] !== bookManifest.version) {
  throw new Error('Selected textbook must be a declared, version-matched Desktop dependency');
}
const publish = bookManifest.bin?.['svitlo-' + textbookId];
if (publish !== './dist/publish.mjs' || !bookManifest.exports?.['./scenes']?.default?.startsWith('./dist/')) {
  throw new Error('Selected textbook must expose its compiled Scene registry and Publish CLI');
}
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(command, args) {
  const result = spawnSync(command, args, { cwd: repoRoot, env: process.env, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(command + ' ' + args.join(' ') + ' failed: ' + (result.error?.message ?? result.status));
  }
}
for (const workspace of ['@svitlo/contracts', '@svitlo/engine', '@svitlo/ui-kit', '@svitlo/adapter-electron']) {
  run(npm, ['run', 'package:build', '--workspace', workspace]);
}
run(npm, ['run', 'package:build', '--workspace', selected.package]);

const publicRoot = join(desktopRoot, 'public');
// Invoke the package's built standalone CLI rather than an npm bin shim
// which does not necessarily exist after npm ci of unbuilt workspaces.
run(process.execPath, [join(repoRoot, selected.directory, publish), 'publish', '--output', publicRoot]);

// UI Kit-owned global strings and flags are independent of textbook publication.
const localeOutput = join(publicRoot, 'data/ui-kit');
rmSync(localeOutput, { recursive: true, force: true });
run(process.execPath, [
  'shared/ui-kit/scripts/generate-locales.mjs',
  '--package',
  selected.directory,
  '--output',
  'apps/desktop/public/data/ui-kit',
]);
for (const resource of ['assessment-methods/base.json', 'assessment-methods/uk-UA.json']) {
  const filename = join(localeOutput, resource);
  if (!existsSync(filename)) throw new Error('Missing UI Kit Assessment Method resource: ' + filename);
}
run(process.execPath, [join(repoRoot, 'shared/ui-kit/scripts/sync-flags.mjs'), desktopRoot]);
if (!existsSync(join(publicRoot, 'data/pages/lessons')) || !existsSync(join(localeOutput, 'uk-UA.json'))) {
  throw new Error('Desktop lesson or UI Kit localization output is missing');
}
console.log('Desktop content prepared from compiled package ' + selected.package);
