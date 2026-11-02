import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { discoverLessons, generateLessonReviewArtifacts } from './generate-lesson-review-artifacts.mjs';

function setup(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-artifacts-'));
  try { return fn(root); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}
function createLesson(root, app = 'playground', group = '1', slug = 'howLightMoves') {
  const dir = path.join(root, 'learningApps', app, 'data', 'lessons', group, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${slug}.data.ts`), 'export const lesson = {};\n');
}
function createGenerator(root) {
  const dir = path.join(root, 'scripts');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'generate-lessons-markdown.mjs'), `
const args = process.argv.slice(2);
const lookup = key => args[args.indexOf(key) + 1];
if (lookup('--locale') === 'qm') { console.error('No qm translation'); process.exit(2); }
process.stdout.write('# ' + lookup('--lesson') + ': ' + lookup('--locale') + '\\n');
`);
}
function run(root, languages = ['en', 'uk']) {
  const output = path.join(root, '.agent-ci-artifacts');
  const manifest = { generated: [], failures: [] };
  const saveManifest = () => fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest));
  fs.mkdirSync(output, { recursive: true });
  const result = generateLessonReviewArtifacts({ root, output, languages, manifest, saveManifest });
  return { result, manifest, output };
}

test('discovers only canonical numbered lessons with actual data files in deterministic order', () => setup(root => {
  createLesson(root, 'playground', '2', 'someLesson');
  createLesson(root, 'playground', '1', 'howLightMoves');
  createLesson(root, 'math', '3', 'numbers');
  const invalid = path.join(root, 'learningApps', 'playground', 'data', 'lessons', 'misc', 'bogus');
  fs.mkdirSync(invalid, { recursive: true });
  fs.writeFileSync(path.join(invalid, 'bogus.data.ts'), '');
  const actual = discoverLessons(root).map(l => `${l.textbook}/${l.group}/${l.slug}`);
  assert.deepEqual(actual, ['math/3/numbers', 'playground/1/howLightMoves', 'playground/2/someLesson']);
}));

test('generates locale-specific Markdown and records PR-scoped paths', () => setup(root => {
  createLesson(root);
  createGenerator(root);
  const { result, manifest, output } = run(root);
  assert.deepEqual(result, { discoveredLessons: 1, generated: 2, failures: 0 });
  assert.equal(manifest.generated[0].path, '.agent-ci-artifacts/lessons/playground/1/howLightMoves/en.md');
  assert.equal(manifest.generated[0].kind, 'lesson');
  assert.equal(fs.readFileSync(path.join(output, 'lessons/playground/1/howLightMoves/uk.md'), 'utf8'), '# 1/howLightMoves: uk\n');
  assert.equal(fs.readFileSync(path.join(root, 'learningApps/playground/data/lessons/1/howLightMoves/howLightMoves.data.ts'), 'utf8'), 'export const lesson = {};\n');
}));

test('records individual locale failures while generating other locales', () => setup(root => {
  createLesson(root);
  createGenerator(root);
  const { result, manifest } = run(root, ['en', 'qm', 'uk']);
  assert.deepEqual(result, { discoveredLessons: 1, generated: 2, failures: 1 });
  assert.deepEqual(manifest.failures.map(f => [f.kind, f.lesson, f.locale]), [['lesson', '1/howLightMoves', 'qm']]);
  assert.match(manifest.failures[0].error, /No qm translation/);
}));

test('clearly records a missing Agent 4 generator without inventing Markdown', () => setup(root => {
  createLesson(root);
  const { result, manifest, output } = run(root);
  assert.deepEqual(result, { discoveredLessons: 1, generated: 0, failures: 1 });
  assert.match(manifest.failures[0].error, /Agent 4 dependency/);
  assert.deepEqual(fs.readdirSync(path.join(output, 'lessons')), []);
}));

test('repeat generation is deterministic and ignores unrelated/noncanonical folders', () => setup(root => {
  createLesson(root);
  createGenerator(root);
  const first = run(root);
  const firstMarkdown = fs.readFileSync(path.join(first.output, 'lessons/playground/1/howLightMoves/en.md'), 'utf8');
  const second = run(root);
  assert.equal(firstMarkdown, fs.readFileSync(path.join(second.output, 'lessons/playground/1/howLightMoves/en.md'), 'utf8'));
  assert.deepEqual(first.manifest, second.manifest);
}));

test('rejects symlinked lesson directories during discovery', () => setup(root => {
  createLesson(root);
  const group = path.join(root, 'learningApps/playground/data/lessons/1');
  fs.symlinkSync(path.join(group, 'howLightMoves'), path.join(group, 'linkedLesson'));
  assert.equal(discoverLessons(root).length, 1);
}));
