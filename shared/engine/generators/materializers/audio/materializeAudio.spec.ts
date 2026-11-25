import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import type { CourseWorkflowStage1Languages } from '../../../types/workflow';
import { materializeAudio } from './materializeAudio';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id,
  slug: 'narration' as const,
  type: 'audio' as const,
  params: {},
  locale: { fileName: `${id}.mp3`, title: { uk: 'Оповідь', en: 'English-only' } },
});

test('audio: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeAudio(source, options);
  assert.deepEqual(one, materializeAudio(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'narration');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineAudio<"narration", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('English-only'), 'unreviewed locale is not materialized');
  const parsed = ts.transpileModule(module, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  assert.equal(
    (parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length,
    0,
    'emitted TS must parse',
  );
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert(one.diagnostics.every(item => item.severity === 'warning'));
  assert.match(module, new RegExp(id + '\\.mp3'));
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
});

test('audio: missing mandatory Config input must not emit an invalid defineAudio call', () => {
  assert.throws(
    () =>
      materializeAudio({ id, slug: 'narration', type: 'audio', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Audio Config.*TODO \(BLOCKER\)/,
  );
});

test('audio: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeAudio({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeAudio(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeAudio({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('audio: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/audio';
  const nested = materializeAudio(valid(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const inline = nested.files.find(file => file.path === directory + '/index.ts')?.content ?? '';
  assert.match(inline, /TODO \(BLOCKER\): Remove the temporary Audio specification/);
  assert.match(inline, /\* # specification[\s\S]*\* Reviewed source brief/);
  assert(inline.indexOf(');') < inline.indexOf('Remove the temporary Audio specification'));
  assert(nested.diagnostics.some(item => item.code === 'pending-temporary-specification'));
  const parsed = ts.transpileModule(inline, {
    fileName: 'index.ts',
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeAudio(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeAudio(valid(), { ...options, directory }), /explicit root languages module/);
});

test('audio: pending media retains a valid Config and explicit asset blocker', () => {
  const result = materializeAudio({ ...valid(), locale: { title: { uk: 'Оповідь' } } }, { documentLanguage: 'uk' });
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.mp3/);
  assert.equal((result.files[0].content.match(/TODO \(BLOCKER\): Supply verified fileName asset/g) ?? []).length, 1);
  assert.doesNotMatch(result.files[0].content, /TODO\(asset\): Replace reserved Nil/);
});
