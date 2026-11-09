#!/usr/bin/env node
/** Build and stage the selected textbook via its public package interfaces. */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const mobileRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(mobileRoot, '../..');
const catalog = JSON.parse(readFileSync(join(mobileRoot, 'textbooks.json'), 'utf8'));
const id = process.env.SVITLO_TEXTBOOK ?? 'playground';
const selection = catalog[id];
if (!selection) throw new Error('Unknown SVITLO_TEXTBOOK "' + id + '". Available: ' + Object.keys(catalog).join(', '));
if (!/^@svitlo\/[a-z-]+$/.test(selection.package) || !/^content\/[a-z-]+$/.test(selection.directory)) {
  throw new Error('Invalid mobile textbook catalog entry: ' + id);
}
const manifest = JSON.parse(readFileSync(join(repoRoot, selection.directory, 'package.json'), 'utf8'));
const mobileManifest = JSON.parse(readFileSync(join(mobileRoot, 'package.json'), 'utf8'));
if (manifest.name !== selection.package || mobileManifest.dependencies?.[manifest.name] !== manifest.version) {
  throw new Error('Selected textbook ' + id + ' must be a version-matched Mobile workspace dependency');
}
if (
  !manifest.exports?.['.']?.default?.startsWith('./dist/') ||
  !manifest.exports?.['./scenes']?.default?.startsWith('./dist/') ||
  !manifest.exports?.['./styles']?.default?.startsWith('./dist/')
) {
  throw new Error('Selected textbook ' + id + ' must export compiled metadata, Scenes and styles');
}
if (manifest.bin?.['svitlo-' + id] !== './dist/publish.mjs') {
  throw new Error('Selected textbook ' + id + ' must expose its Publish CLI');
}
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(command, args, cwd = repoRoot) {
  const result = spawnSync(command, args, { cwd, env: process.env, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(command + ' ' + args.join(' ') + ' failed: ' + (result.error?.message ?? result.status));
  }
}
for (const workspace of [
  '@svitlo/contracts',
  '@svitlo/engine',
  '@svitlo/indexdb',
  '@svitlo/ui-kit',
  '@svitlo/adapter-capacitor',
]) {
  run(npm, ['run', 'package:build', '--workspace', workspace]);
}
run(npm, ['run', 'package:build', '--workspace', selection.package]);
// Resolve Engine only after building the shared workspace from a fresh checkout.
const { mergeLessonResources } = await import('@svitlo/engine');
const publicRoot = join(mobileRoot, 'public');
// npm ci may not link a binary generated during build, so execute the
// published package binary from its validated manifest path directly.
run(process.execPath, [
  join(repoRoot, selection.directory, manifest.bin['svitlo-' + id]),
  'publish',
  '--output',
  publicRoot,
]);

// UI Kit owns global dictionaries and SVG flags. The textbook publisher must
// not overwrite either, nor the Capacitor app's own static resources.
rmSync(join(publicRoot, 'data/ui-kit'), { recursive: true, force: true });
run(process.execPath, [
  'shared/ui-kit/scripts/generate-locales.mjs',
  '--package',
  selection.directory,
  '--output',
  'apps/mobile/public/data/ui-kit',
]);
for (const resource of ['assessment-methods/base.json', 'assessment-methods/uk-UA.json']) {
  const filename = join(publicRoot, 'data/ui-kit', resource);
  if (!existsSync(filename)) throw new Error('Missing UI Kit Assessment Method resource: ' + filename);
}
run(process.execPath, [join(repoRoot, 'shared/ui-kit/scripts/sync-flags.mjs')], mobileRoot);

const lessonsRoot = join(publicRoot, 'data/pages/lessons');
if (!existsSync(lessonsRoot)) throw new Error('No published lessons for ' + id);
const index = [];
for (const bucket of readdirSync(lessonsRoot, { withFileTypes: true })) {
  if (!bucket.isDirectory()) continue;
  for (const lesson of readdirSync(join(lessonsRoot, bucket.name), { withFileTypes: true })) {
    if (!lesson.isDirectory()) continue;
    const configDir = join(lessonsRoot, bucket.name, lesson.name, 'config');
    if (!existsSync(configDir)) continue;
    const locales = readdirSync(configDir)
      .filter(name => name.endsWith('.json') && name !== 'base.json')
      .map(name => basename(name, '.json'));
    if (!locales.length) continue;
    const first = locales.includes('uk') ? 'uk' : locales[0];
    const base = JSON.parse(readFileSync(join(configDir, 'base.json'), 'utf8'));
    const localized = JSON.parse(readFileSync(join(configDir, first + '.json'), 'utf8'));
    const config = mergeLessonResources(base, localized).data;
    if (config?.id !== lesson.name) throw new Error('Published lesson ID mismatch: ' + lesson.name);
    index.push({ id: lesson.name, title: config.title, languages: config.parameters.languages });
  }
}
if (!index.length) throw new Error('No publishable lesson configurations for ' + id);
index.sort((a, b) => a.title.localeCompare(b.title));
writeFileSync(join(publicRoot, 'data/lesson-index.json'), JSON.stringify({ textbook: id, lessons: index }));

const generated = join(mobileRoot, 'src/generated');
mkdirSync(generated, { recursive: true });
writeFileSync(
  join(generated, 'textbook.ts'),
  '// Generated from the compiled selected textbook for SVITLO_TEXTBOOK=' +
    id +
    '\n' +
    "export { textbook } from '" +
    selection.package +
    "';\n" +
    "export { resolveScene } from '" +
    selection.package +
    "/scenes';\n",
);
writeFileSync(
  join(generated, 'textbookStyles.ts'),
  '// Compiled textbook stylesheet for SVITLO_TEXTBOOK=' + id + '\n' + "import '" + selection.package + "/styles';\n",
);
console.log('Prepared offline mobile content from compiled package: ' + id + ' (' + index.length + ' lessons)');
