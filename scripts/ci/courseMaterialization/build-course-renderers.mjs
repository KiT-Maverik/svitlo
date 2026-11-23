#!/usr/bin/env node
/**
 * @fileoverview Build exactly the trusted concrete Section/Block renderers
 * for the Course Episode bridge. This does not execute candidate PR code,
 * produce public Engine packages or bypass the independent Engine typecheck.
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
// The existing Course Build API integration fixture requires dist/build.js.
// This is a temporary, trusted source bundle, not a successful Engine tsc
// package build; full TypeScript typechecking remains a separate mandatory gate.
await build({
  absWorkingDir: root,
  entryPoints: [path.join(root, 'build.ts')],
  outfile: path.join(root, 'dist/build.js'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node24',
  logLevel: 'warning',
});
console.log('Compiled ' + entries.length + ' concrete trusted Engine renderers for isolated Course Stage 5 analysis.');
