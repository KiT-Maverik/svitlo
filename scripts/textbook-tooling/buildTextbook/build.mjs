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
  mkdtempSync,
  renameSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { stageTextbookAssets } from './stageTextbookAssets.mjs';
import { verifyAssessmentSelections } from '../verifyAssessmentSelections/verifyAssessmentSelections.mjs';
import { randomUUID } from 'node:crypto';

const root = resolve(process.cwd());
const repo = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
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
const finalDist = join(root, 'dist');
const dist = mkdtempSync(join(root, '.textbook-build-staging-'));
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
// Skills are authored through a root Domain index.ts, not *.data.ts.
// Lessons retain their own UUID entrypoint detection; nested Section indexes
// must not be mistaken for standalone Lessons.
const authored = folder => {
  if (folder === 'data/skills') return existsSync(join(root, folder, 'index.ts'));
  return filesUnder(join(root, folder)).some(
    name =>
      name.endsWith('.data.ts') ||
      (folder === 'data/lessons' &&
        /^[0-9a-f]\/[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\/index\.ts$/.test(name) &&
        name.split('/')[1].at(-1) === name[0]),
  );
};

// Dependencies required for build-time content generation; none are included in
// the runtime output. Standalone npm workspace builds start from a clean checkout.
for (const [workspace, compiled] of [
  ['@svitlo/engine', 'shared/engine/dist/build.js'],
  ...(hasScenes || hasStyles || pkg.dependencies?.['@svitlo/ui-kit'] || pkg.devDependencies?.['@svitlo/ui-kit']
    ? [['@svitlo/ui-kit', 'shared/ui-kit/dist/src/index.js']]
    : []),
]) {
  if (!existsSync(join(repo, compiled))) run('npm', ['run', 'package:build', '--workspace', workspace]);
}
// Some textbooks expose placeholder Scene registries before authoring real Scenes.
// Enable generated-registry verification explicitly via the shared npm check.
if (hasScenes && pkg.scripts?.['content:check:scenes']) {
  run(process.execPath, [join(repo, 'scripts/textbook-tooling/generateScenes/generate-scenes.mjs'), '--check'], root);
}

const assessmentBank = filesUnder(join(root, 'data/lessons')).some(name =>
  /^[0-9a-f]\/[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\/(?:questions|flashcards)\/index\.ts$/.test(name),
);
// Before modifying generated content or the distribution, validate every
// effective Lesson/Course media reference in the requested package.
try {
  const mediaMode = process.env.SVITLO_MEDIA_MODE === 'draft' ? 'draft' : 'production';
  for (const [source, generator] of [
    ['data/lessons', 'shared/engine/scripts/generateLessonProps/generateLessonProps.mjs'],
    ['data/courses', 'shared/engine/scripts/generateCourseProps/generateCourseProps.mjs'],
  ]) {
    if (!authored(source)) continue;
    run(process.execPath, [
      generator,
      '--package',
      packageDirectory,
      '--preflight',
      ...(mediaMode === 'draft' ? ['--draft'] : []),
    ]);
  }
  if (assessmentBank) {
    run(process.execPath, [
      'shared/engine/scripts/generateAssessmentResources/generateAssessmentResources.mjs',
      '--package',
      packageDirectory,
      '--kind',
      'all',
      '--preflight',
      ...(mediaMode === 'draft' ? ['--draft'] : []),
    ]);
  }
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

  run('npx', ['tsc', '-p', packageDirectory + '/tsconfig.declarations.json', '--outDir', join(dist, '.declarations')]);
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

  // Build authored content once into textbook-owned generated/, then stage
  // the already-published JSON to the portable package's public URL layout.
  for (const [source, generator, staged, target] of [
    ['data/skills', 'shared/engine/scripts/generateSkills/generateSkills.mjs', 'skills', 'data/skills'],
    ['data/lessons', 'shared/engine/scripts/generateLessonProps/generateLessonProps.mjs', 'lessons', 'data/lessons'],
    ['data/courses', 'shared/engine/scripts/generateCourseProps/generateCourseProps.mjs', 'courses', 'data/courses'],
  ]) {
    if (!authored(source)) continue;
    run(process.execPath, [
      generator,
      '--package',
      packageDirectory,
      '--write',
      ...(mediaMode === 'draft' && (staged === 'lessons' || staged === 'courses') ? ['--draft'] : []),
    ]);
    const generatedRoot = join(root, 'generated', staged);
    if (!existsSync(generatedRoot)) throw new Error('Generator did not produce ' + generatedRoot);
    const destination = join(resources, target);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(generatedRoot, destination, { recursive: true });
  }
  // Stage globally UUID-addressed Questions and Flashcards beside Lesson Props. The static manifest and Publish CLI own their portable URLs.
  if (assessmentBank) {
    run(process.execPath, [
      'shared/engine/scripts/generateAssessmentResources/generateAssessmentResources.mjs',
      '--package',
      packageDirectory,
      '--kind',
      'all',
      '--write',
      ...(mediaMode === 'draft' ? ['--draft'] : []),
    ]);
    const generatedAssessmentRoot = join(root, 'generated/assessments');
    const destination = join(resources, 'data');
    for (const name of filesUnder(generatedAssessmentRoot)) {
      const target = join(destination, name);
      if (existsSync(target)) throw new Error('Duplicate Assessment resource publication: ' + name);
      mkdirSync(dirname(target), { recursive: true });
      copyFileSync(join(generatedAssessmentRoot, name), target);
    }
  }

  // An authored Quiz/Flashcards Section may be valid even when its independent
  // bank was never generated. Verify every candidate UUID against the published
  // bank manifest and actual JSON/locale files before committing production.
  if (mediaMode === 'production') {
    const verified = verifyAssessmentSelections(resources);
    console.log('Verified ' + verified + ' referenced Question/Flashcard resource(s) in production');
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
  // Stage the entire reusable textbook assets tree, not individual block files.
  const stagedTextbookAssets = stageTextbookAssets({ textbookRoot: root, textbookId: id, staticRoot: resources });
  if (stagedTextbookAssets) console.log('Staged ' + stagedTextbookAssets + ' textbook media file(s)');
  const published = filesUnder(resources);
  for (const [source, prefix] of [
    ['data/lessons', 'data/lessons/'],
    ['data/skills', 'data/skills/'],
    ['data/courses', 'data/courses/'],
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
  copyFileSync(join(repo, 'scripts/textbook-tooling/publishTextbook/publish.mjs'), join(dist, 'publish.mjs'));
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

  // Switch the finished portable package only after all build and content checks
  // have succeeded. Preserve the prior dist if the final rename fails.
  const backupDist = join(root, '.textbook-build-backup-' + randomUUID());
  let movedPrevious = false;
  try {
    if (existsSync(finalDist)) {
      renameSync(finalDist, backupDist);
      movedPrevious = true;
    }
    renameSync(dist, finalDist);
    if (movedPrevious) rmSync(backupDist, { recursive: true, force: true });
  } catch (error) {
    if (movedPrevious) renameSync(backupDist, finalDist);
    throw error;
  }
} finally {
  if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
}
