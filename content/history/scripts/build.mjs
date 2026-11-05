#!/usr/bin/env node
/** Compile history metadata and publish exactly the textbook's authored resources. */
import { existsSync, readFileSync, readdirSync, mkdirSync, rmSync, copyFileSync, cpSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { build } from 'esbuild';

const packageRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = resolve(packageRoot, '../..');
const dist = join(packageRoot, 'dist');
const staticRoot = join(dist, 'static');
function run(command, args) {
  const result = spawnSync(command, args, { cwd: repoRoot, stdio: 'inherit', env: process.env });
  if (result.error || result.status !== 0)
    throw new Error(command + ' ' + args.join(' ') + ': ' + (result.error?.message ?? 'exit ' + result.status));
}
function allFiles(root, prefix = '') {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).flatMap(item => {
    if (item.isSymbolicLink()) throw new Error('Symlink in textbook artifacts: ' + item.name);
    const name = prefix ? prefix + '/' + item.name : item.name;
    if (item.isDirectory()) return allFiles(join(root, item.name), name);
    if (!item.isFile()) throw new Error('Unexpected textbook artifact: ' + name);
    return [name];
  }).sort();
}
// Standalone CI/pack must build shared authoring dependencies when not prepared.
for (const [workspace, compiled] of [
  ['@svitlo/contracts', 'shared/contracts/dist/index.js'],
  ['@svitlo/engine', 'shared/engine/dist/index.js'],
]) {
  if (!existsSync(join(repoRoot, compiled))) run('npm', ['run', 'build', '--workspace', workspace]);
}
rmSync(dist, { recursive: true, force: true });
mkdirSync(staticRoot, { recursive: true });
await build({
  absWorkingDir: packageRoot, entryPoints: { 'textbook/index': 'textbook.ts' },
  outdir: dist, bundle: true, platform: 'browser', format: 'esm', target: ['es2020'],
  packages: 'external', tsconfig: join(packageRoot, 'tsconfig.json'),
  logLevel: 'warning',
});
run('npx', ['tsc', '-p', 'content/history/tsconfig.declarations.json']);
const declaration = join(dist, '.declarations/textbook.d.ts');
if (!existsSync(declaration)) throw new Error('Missing textbook declaration');
mkdirSync(join(dist, 'textbook'), { recursive: true });
copyFileSync(declaration, join(dist, 'textbook/index.d.ts'));
rmSync(join(dist, '.declarations'), { recursive: true, force: true });

// Source generators are build-only. Absent Lessons and Scenes are intentional.
if (existsSync(join(packageRoot, 'data/lessons'))) {
  run(process.execPath, ['scripts/generators/pages/lessons/generate-lessons.mjs',
    '--package', 'content/history', '--output', relative(repoRoot, join(staticRoot, 'data/pages/lessons')), '--write']);
}
if (existsSync(join(packageRoot, 'data/skills'))) {
  run(process.execPath, ['scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs',
    '--package', 'content/history', '--output', relative(repoRoot, join(staticRoot, 'data/pages/skillAnalytics')), '--write']);
}
const publicRoot = join(packageRoot, 'public');
if (existsSync(publicRoot)) {
  cpSync(publicRoot, join(staticRoot, 'textbooks/history'), {
    recursive: true,
    filter(source) {
      const part = relative(publicRoot, source).split(sep)[0];
      return !['data', 'flags'].includes(part);
    },
  });
}
const files = allFiles(staticRoot);
if (existsSync(join(packageRoot, 'data/skills')) &&
  !files.some(path => path.startsWith('data/pages/skillAnalytics/') && path.endsWith('.json')))
  throw new Error('Authored Skills exist but no analytics JSON was generated');
if (existsSync(join(packageRoot, 'data/lessons')) &&
  !files.some(path => path.startsWith('data/pages/lessons/') && path.endsWith('.json')))
  throw new Error('Authored Lessons exist but no lesson JSON was generated');
writeFileSync(join(dist, 'manifest.json'), JSON.stringify({ version: 1, textbook: 'history', files }, null, 2) + '\n');
for (const name of allFiles(dist).filter(path => path.endsWith('.js'))) {
  const js = readFileSync(join(dist, name), 'utf8');
  if (/from\s*['"]@\//.test(js) || /import\s*\(\s*['"]@\//.test(js) ||
    /import\s+['"][^'"]*\.data\.ts['"]/.test(js) || /from\s*['"]next\//.test(js))
    throw new Error('Nonportable runtime import in dist/' + name);
}
console.log('Compiled history: ' + files.length + ' published resources; metadata-only React DOM module');
