import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeYoutube } from './materializeYoutube';
import type { CourseWorkflowStage1Languages } from '../../../types/workflow';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id, slug: 'watch' as const, type: 'youtube' as const, params: { mode: 'link' as const },
  locale: { href: 'https://www.youtube.com/watch?v=abc',
    label: { uk: 'Переглянути', en: 'English-only' } },
});

test('youtube: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeYoutube(source, options);
  assert.deepEqual(one, materializeYoutube(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'watch');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineYoutube<"watch", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('English-only'), 'unreviewed locale is not materialized');
  const parsed = ts.transpileModule(module, { fileName: 'index.ts', reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert(one.diagnostics.every(item => item.severity === 'warning'));
  assert.match(module, /youtube.com/);
  assert.match(module, /Переглянути/);
  assert(!one.diagnostics.some(item => item.code === 'pending-copy'));
  assert(!one.files.some(file => file.kind !== 'typescript'));
});

test('youtube: missing mandatory Config input must not emit an invalid defineYoutube call', () => {
  assert.throws(() => materializeYoutube(
    { id, slug: 'watch', type: 'youtube', params: {}, locale: {} }, { documentLanguage: 'uk' },
  ), /Cannot materialize type-valid Youtube Config.*TODO \(BLOCKER\)/);
});

test('youtube: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeYoutube({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeYoutube(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeYoutube({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});

test('youtube: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/youtube';
  const nested = materializeYoutube(valid(), {
    ...options, directory, languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(nested.files.some(file => file.path === directory + '/specification.md'));
  assert(nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'));
  assert.throws(() => materializeYoutube(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeYoutube(valid(), { ...options, directory }), /explicit root languages module/);
});
