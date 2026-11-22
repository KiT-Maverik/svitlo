import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeVideo } from './materializeVideo';
import type { CourseWorkflowStage1Languages } from '../../../types/workflow';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id, slug: 'clip' as const, type: 'video' as const, params: {},
  locale: { fileName: 'clip.mp4', posterFileName: 'poster.webp',
    label: { uk: 'Відео', en: 'English-only' } },
});

test('video: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeVideo(source, options);
  assert.deepEqual(one, materializeVideo(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'clip');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineVideo<"clip", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('English-only'), 'unreviewed locale is not materialized');
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert(one.diagnostics.every(item => item.severity === 'warning'));
  assert.match(module, /poster.webp/);
  assert.match(module, /clip.mp4/);
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
});

test('video: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeVideo(
    { id, slug: 'clip', type: 'video', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.mp4/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.webp/);
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('video: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeVideo({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeVideo(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeVideo({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});

test('video: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/video';
  const nested = materializeVideo(valid(), {
    ...options, directory, languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(nested.files.some(file => file.path === directory + '/specification.md'));
  assert(nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'));
  assert.throws(() => materializeVideo(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeVideo(valid(), { ...options, directory }), /explicit root languages module/);
});
