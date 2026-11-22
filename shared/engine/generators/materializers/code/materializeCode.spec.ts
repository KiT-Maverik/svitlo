import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeCode } from './materializeCode';
import type { CourseWorkflowStage1Languages } from '../../../types/workflow';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id, slug: 'sourceCode' as const, type: 'code' as const,
  params: { language: 'python', codeAsText: 'print(%_%NAME%_%)\n' },
  locale: { variables: { NAME: { uk: "'Оля'", en: "'Ada'" } } },
});

test('code: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeCode(source, options);
  assert.deepEqual(one, materializeCode(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'sourceCode');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineCode<"sourceCode", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes("'Ada'"), 'unreviewed locale is not materialized');
  const parsed = ts.transpileModule(module, { fileName: 'index.ts', reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
  assert.equal((parsed.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert(one.diagnostics.every(item => item.severity === 'warning'));
  assert.match(module, /readCodeSource\(import.meta.url, "py"\)/);
  assert.equal(one.files.find(file => file.path === 'code.py')?.content, 'print(%_%NAME%_%)\n');
  assert.throws(() => materializeCode({ ...valid(), params: { language: 'unknown', codeAsText: 'x' } },
    { documentLanguage: 'uk' }), /unsupported Code language/);
});

test('code: missing mandatory Config input must not emit an invalid defineCode call', () => {
  assert.throws(() => materializeCode(
    { id, slug: 'sourceCode', type: 'code', params: {}, locale: {} }, { documentLanguage: 'uk' },
  ), /Cannot materialize type-valid Code Config.*TODO \(BLOCKER\)/);
});

test('code: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeCode({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeCode(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeCode({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});

test('code: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/code';
  const nested = materializeCode(valid(), {
    ...options, directory, languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(nested.files.some(file => file.path === directory + '/specification.md'));
  assert(nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'));
  assert.throws(() => materializeCode(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeCode(valid(), { ...options, directory }), /explicit root languages module/);
});
