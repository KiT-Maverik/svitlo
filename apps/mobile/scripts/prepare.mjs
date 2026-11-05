#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join, resolve, sep, relative } from 'node:path';
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
const textbookRoot = join(repoRoot, selection.directory);
const manifest = JSON.parse(readFileSync(join(textbookRoot, 'package.json'), 'utf8'));
const mobileManifest = JSON.parse(readFileSync(join(mobileRoot, 'package.json'), 'utf8'));
if (manifest.name !== selection.package || mobileManifest.dependencies?.[manifest.name] !== manifest.version) {
  throw new Error('Selected textbook ' + id + ' must be a version-matched Mobile workspace dependency');
}
if (!manifest.exports?.['.'] || !manifest.exports?.['./scenes']) {
  throw new Error('Selected textbook ' + id + ' must export metadata and Scene Registry');
}
function run(command, args, cwd = repoRoot) {
  const result = spawnSync(command, args, { cwd, env: process.env, stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    throw new Error(command + ' ' + args.join(' ') + ' failed: ' + (result.error?.message ?? result.status));
  }
}
for (const workspace of ['@svitlo/contracts', '@svitlo/engine', '@svitlo/indexdb', '@svitlo/ui-kit', '@svitlo/adapter-capacitor']) {
  run('npm', ['run', 'build', '--workspace', workspace]);
}
run('npm', ['run', 'check:scenes', '--workspace', selection.package]);
const publicRoot = join(mobileRoot, 'public');
for (const suffix of ['data/pages/lessons', 'data/ui-kit', 'textbooks']) {
  rmSync(join(publicRoot, suffix), { recursive: true, force: true });
}
run(process.execPath, [
  'scripts/generators/pages/lessons/generate-lessons.mjs',
  '--package', selection.directory, '--output', 'apps/mobile/public/data/pages/lessons', '--write'
]);
run(process.execPath, [
  'scripts/generators/pages/lessons/generate-lessons.mjs',
  '--package', selection.directory, '--output', 'apps/mobile/public/data/pages/lessons', '--check'
]);
run(process.execPath, [
  'shared/ui-kit/scripts/generate-locales.mjs',
  '--package', selection.directory, '--output', 'apps/mobile/public/data/ui-kit'
]);
run(process.execPath, [join(repoRoot, 'shared/ui-kit/scripts/sync-flags.mjs')], mobileRoot);

const sourcePublic = join(textbookRoot, 'public');
if (existsSync(sourcePublic)) {
  cpSync(sourcePublic, join(publicRoot, 'textbooks', id), {
    recursive: true,
    filter: source => {
      const within = relative(sourcePublic, source);
      return !within || !['data', 'flags'].includes(within.split(sep)[0]);
    }
  });
}
const lessonsRoot = join(publicRoot, 'data/pages/lessons');
if (!existsSync(lessonsRoot)) throw new Error('No published lessons for ' + id);
const index = [];
for (const bucket of readdirSync(lessonsRoot, { withFileTypes: true })) {
  if (!bucket.isDirectory()) continue;
  for (const lesson of readdirSync(join(lessonsRoot, bucket.name), { withFileTypes: true })) {
    if (!lesson.isDirectory()) continue;
    const configDir = join(lessonsRoot, bucket.name, lesson.name, 'config');
    if (!existsSync(configDir)) continue;
    const locales = readdirSync(configDir).filter(name => name.endsWith('.json')).map(name => basename(name, '.json'));
    if (!locales.length) continue;
    const first = locales.includes('uk') ? 'uk' : locales[0];
    const config = JSON.parse(readFileSync(join(configDir, first + '.json'), 'utf8')).data;
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
  '// Generated from the selected textbook for SVITLO_TEXTBOOK=' + id + '\n' +
  "export { textbook } from '" + selection.package + "';\n" +
  "export { resolveScene } from '" + selection.package + "/scenes';\n"
);
console.log('Prepared offline mobile content: ' + id + ' (' + index.length + ' lessons)');
