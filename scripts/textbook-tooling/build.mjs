#!/usr/bin/env node
/**
 * Canonical Node.js textbook build pipeline. Run via each content package's
 * npm "package:build" script. Not part of the textbook's runtime or packed source.
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  mkdirSync,
  rmSync,
  copyFileSync,
  cpSync,
  writeFileSync,
  chmodSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { checkTaxonomy } from '../check-skills-taxonomy-structure.mjs';

const root = resolve(process.cwd());
const repo = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const id = root.split(sep).at(-1);
const packageDirectory = relative(repo, root).split(sep).join('/');
if (!/^content\/(?:[a-z][a-z-]*|languages\/[a-z][a-z-]*)$/.test(packageDirectory) || !/^[a-z][a-z-]*$/.test(id)) {
  throw new Error('Run the shared textbook build from a content textbook workspace');
}
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (pkg.name !== '@svitlo/' + id) throw new Error('Textbook workspace identity mismatch: ' + id);
const hasScenes = Boolean(pkg.exports?.['./scenes']);
const hasStyles = Boolean(pkg.exports?.['./styles']);
if (hasStyles && !hasScenes) throw new Error('Scene styles require a Scene export');
const dist = join(root, 'dist');
const resources = join(dist, 'static');

function run(program, args, cwd = repo) {
  const result = spawnSync(program, args, { cwd, stdio: 'inherit', env: process.env });
  if (result.error || result.status !== 0) {
    throw new Error(program + ' ' + args.join(' ') + ' failed: ' + (result.error?.message ?? result.status));
  }
}
function filesUnder(folder, prefix = '') {
  if (!existsSync(folder)) return [];
  return readdirSync(folder, { withFileTypes: true })
    .flatMap(item => {
      if (item.isSymbolicLink()) throw new Error('Symlink in textbook inputs: ' + item.name);
      const name = prefix ? prefix + '/' + item.name : item.name;
      if (item.isDirectory()) return filesUnder(join(folder, item.name), name);
      if (!item.isFile()) throw new Error('Unexpected textbook artifact: ' + name);
      return [name];
    })
    .sort();
}
const authored = folder => filesUnder(join(root, folder)).some(name => name.endsWith('.data.ts'));

// Authored Skill graphs must be complete before a textbook can be published.
// The same invariant is enforced for every content package, including Playground.
if (authored('data/skills')) {
  const { domains, groups, skills } = checkTaxonomy(join(root, 'data/skills'));
  console.log('Verified ' + id + ' Skills: ' + domains + ' domains, ' + groups + ' groups, ' + skills + ' skills');
}

// Dependencies required for build-time content generation; none are included in
// the runtime output. Standalone npm workspace builds start from a clean checkout.
for (const [workspace, compiled] of [
  ['@svitlo/contracts', 'shared/contracts/dist/index.js'],
  ['@svitlo/engine', 'shared/engine/dist/index.js'],
  ...(hasScenes || hasStyles || pkg.dependencies?.['@svitlo/ui-kit'] || pkg.devDependencies?.['@svitlo/ui-kit']
    ? [['@svitlo/ui-kit', 'shared/ui-kit/dist/src/index.js']]
    : []),
]) {
  if (!existsSync(join(repo, compiled))) run('npm', ['run', 'package:build', '--workspace', workspace]);
}
// Some textbooks expose placeholder Scene registries before authoring real Scenes.
// Enable generated-registry verification explicitly via the shared npm check.
if (hasScenes && pkg.scripts?.['content:check:scenes']) {
  run(process.execPath, [join(repo, 'scripts/textbook-tooling/generate-scenes.mjs'), '--check'], root);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(resources, { recursive: true });
const common = {
  absWorkingDir: root,
  outdir: dist,
  bundle: true,
  platform: 'browser',
  format: 'esm',
  target: ['es2020'],
  packages: 'external',
  jsx: 'automatic',
  tsconfig: join(root, 'tsconfig.json'),
  entryNames: '[dir]/[name]',
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  metafile: true,
  logLevel: 'warning',
  plugins: hasStyles
    ? [
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
      ]
    : [],
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
const metadata = await build({ ...common, entryPoints: { 'textbook/index': 'textbook.ts' } });
let sceneResult;
if (hasScenes) {
  if (!existsSync(join(root, 'scenes/index.ts'))) throw new Error('Missing authored Scene entrypoint');
  sceneResult = await build({
    ...common,
    splitting: hasStyles,
    entryPoints: { 'scenes/index': 'scenes/index.ts' },
    banner: { js: '"use client";' },
  });
}
if (hasStyles) {
  const css = filesUnder(dist).filter(name => name.endsWith('.css'));
  writeFileSync(join(dist, 'styles.css'), css.map(name => '@import "./' + name + '";').join('\n') + '\n');
}

run('npx', ['tsc', '-p', packageDirectory + '/tsconfig.declarations.json']);
for (const [from, to] of [
  ['textbook.d.ts', 'textbook/index.d.ts'],
  ...(hasScenes
    ? [
        ['scenes/index.d.ts', 'scenes/index.d.ts'],
        ['scenes/sceneLoader.d.ts', 'scenes/sceneLoader.d.ts'],
      ]
    : []),
]) {
  const input = join(dist, '.declarations', from);
  if (!existsSync(input)) throw new Error('Missing compiled declaration: ' + from);
  mkdirSync(dirname(join(dist, to)), { recursive: true });
  copyFileSync(input, join(dist, to));
}
rmSync(join(dist, '.declarations'), { recursive: true, force: true });

for (const [source, generator, target] of [
  ['data/lessons', 'scripts/generators/pages/lessons/generate-lessons.mjs', 'data/pages/lessons'],
  ['data/skills', 'scripts/generators/data/publish-skills-data.mjs', 'data/skills'],
  ['data/courses', 'scripts/generators/pages/courses/generate-courses.mjs', 'data/pages/courses'],
]) {
  if (!authored(source)) continue;
  run(process.execPath, [
    generator,
    '--package',
    packageDirectory,
    '--output',
    relative(repo, join(resources, target)),
    '--write',
  ]);
}
const sourcePublic = join(root, 'public');
if (existsSync(sourcePublic)) {
  cpSync(sourcePublic, join(resources, 'textbooks', id), {
    recursive: true,
    filter(source) {
      return !['data', 'flags'].includes(relative(sourcePublic, source).split(sep)[0]);
    },
  });
}
// Keep textbook-owned static media in the same namespace as public assets.
// Unlike host resources, these files belong to the compiled textbook package.
for (const name of filesUnder(join(root, 'static'))) {
  const destination = join(resources, 'textbooks', id, name);
  if (existsSync(destination)) {
    throw new Error('Duplicate textbook media path in public/ and static/: ' + name);
  }
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(join(root, 'static', name), destination);
}
const published = filesUnder(resources);
for (const [source, prefix] of [
  ['data/lessons', 'data/pages/lessons/'],
  ['data/skills', 'data/skills/'],
  ['data/courses', 'data/pages/courses/'],
]) {
  if (authored(source) && !published.some(name => name.startsWith(prefix) && name.endsWith('.json'))) {
    throw new Error('Authored ' + source + ' did not produce published JSON for ' + id);
  }
}
writeFileSync(
  join(dist, 'manifest.json'),
  JSON.stringify({ version: 1, textbook: id, files: published }, null, 2) + '\n',
);

for (const name of filesUnder(dist).filter(name => name.endsWith('.js'))) {
  const js = readFileSync(join(dist, name), 'utf8');
  if (
    /from\s*['"]@\//.test(js) ||
    /import\s*\(\s*['"]@\//.test(js) ||
    /import\s+['"][^'"]*\.data\.ts['"]/.test(js) ||
    /from\s*['"]next\//.test(js)
  ) {
    throw new Error('Non-portable runtime import in dist/' + name);
  }
}
// Self-contained CLI is copied into the package, not imported from the monorepo.
copyFileSync(join(repo, 'scripts/textbook-tooling/publish.mjs'), join(dist, 'publish.mjs'));
chmodSync(join(dist, 'publish.mjs'), 0o755);
console.log(
  'Compiled ' +
    id +
    ': ' +
    published.length +
    ' static resources; ' +
    (Object.keys(metadata.metafile.outputs).length +
      (sceneResult ? Object.keys(sceneResult.metafile.outputs).length : 0)) +
    ' ESM outputs',
);
