import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeMarkdown } from './materializeMarkdown';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk', 'en'] };
const valid = () => ({
  id, slug: 'prose' as const, type: 'markdown' as const, params: {},
  locale: { value: { uk: 'Радіус $r$. %_%NAME%_%\n', en: 'Unreviewed' },
    variables: { NAME: { uk: 'Світло', en: 'Unreviewed' } } },
});

test('markdown: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeMarkdown(source, options);
  assert.deepEqual(one, materializeMarkdown(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'prose');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineMarkdown<"prose", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('Unreviewed'), 'unreviewed locale is not materialized');
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert.match(module, /readMarkdown\(import.meta.url, \["uk"\]\)/);
  assert.equal(one.files.find(file => file.path === 'uk.md')?.content,
    'Радіус $r$. %_%NAME%_%\n');
  assert(!one.files.some(file => file.path === 'en.md'));
  assert.throws(() => materializeMarkdown({ ...valid(), locale: { value: '' } },
    { documentLanguage: 'uk' }), /empty Markdown/);
});

test('markdown: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeMarkdown(
    { id, slug: 'prose', type: 'markdown', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert(!result.files.some(file => file.path.endsWith('.md')));
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('markdown: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeMarkdown({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeMarkdown(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeMarkdown({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});
