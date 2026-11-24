#!/usr/bin/env node
/**
 * @fileoverview Build exactly the trusted concrete Section/Block renderers
 * for the Course Episode bridge. This does not execute candidate PR code,
 * replace the public Engine package build or bypass its independent typecheck.
 * Temporary compilation is deliberately distinct from package:build.
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const script = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(script, '../../../shared/engine');
const sourceRoot = path.join(root, 'generators/materializers');
const temporary = path.join(root, 'temp/typed-course-renderers');

const entries = [
  'contentSection/contentSection',
  'practiceSection/practiceSection',
  'codingTaskSection/codingTaskSection',
  'learningFlowSection/learningFlowSection',
  'quizSection/quizSection',
  'flashcardsSection/flashcardsSection',
  'questSection/questSection',
  'questStage/questStage',
  'questTask/questTask',
  'text/materializeText',
  'markdown/materializeMarkdown',
  'code/materializeCode',
  'image/materializeImage',
  'video/materializeVideo',
  'youtube/materializeYoutube',
  'audio/materializeAudio',
  'subtitles/materializeSubtitles',
  'scene/materializeScene',
  'carousel/materializeCarousel',
  'checkpoint/materializeCheckpoint',
  'checkpointItem/materializeCheckpointItem',
  'checkpointAnswer/materializeCheckpointAnswer',
];
const output = process.env.COURSE_RENDERER_DIST ? path.resolve(process.env.COURSE_RENDERER_DIST) : temporary;

if (!output.startsWith(root + path.sep))
  throw Error('Course temporary renderer artifacts must remain inside trusted Engine checkout');
for (const name of entries) {
  const file = path.join(sourceRoot, name + '.ts');
  if (!fs.existsSync(file) || fs.lstatSync(file).isSymbolicLink())
    throw Error('Missing or nonregular trusted Engine source renderer: ' + name);
}

await build({
  absWorkingDir: root,
  entryPoints: entries.map(name => path.join(sourceRoot, name + '.ts')),
  outbase: sourceRoot,
  outdir: output,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node24',
  minify: false,
  sourcemap: false,
  logLevel: 'warning',
});
// Existing trusted Lessons may import both public Engine entrypoints, including
// @svitlo/engine/runtime through transitive authored constants modules. Build
// both from trusted sources on the clean analyze/publish checkout; never rely
// on a previous npm lifecycle build or committed dist artifacts. These bundles
// are temporary preparation, NOT the tsc package build/typecheck gate.
await build({
  absWorkingDir: root,
  entryPoints: [path.join(root, 'build.ts'), path.join(root, 'runtime.ts')],
  outdir: path.join(root, 'dist'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node24',
  logLevel: 'warning',
});
console.log('Compiled ' + entries.length + ' concrete trusted Engine renderers for isolated Course Stage 5 analysis.');
