import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeCode } from './materializeCode';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk', 'en'] };
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
  assert(!module.includes(''Ada''), 'unreviewed locale is not materialized');
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert.match(module, /readCodeSource\(import.meta.url, "py"\)/);
  assert.equal(one.files.find(file => file.path === 'code.py')?.content, 'print(%_%NAME%_%)\n');
  assert.throws(() => materializeCode({ ...valid(), params: { language: 'unknown', codeAsText: 'x' } },
    { documentLanguage: 'uk' }), /unsupported Code language/);
});

test('code: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeCode(
    { id, slug: 'sourceCode', type: 'code', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert(!result.files.some(file => file.path.startsWith('code.')));
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('code: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeCode({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeCode(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeCode({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});
