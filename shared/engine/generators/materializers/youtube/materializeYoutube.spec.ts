import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeYoutube } from './materializeYoutube';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk', 'en'] };
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
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert.match(module, /youtube.com/);
  assert.match(module, /Переглянути/);
  assert(!one.diagnostics.some(item => item.code === 'pending-copy'));
  assert(!one.files.some(file => file.kind !== 'typescript'));
});

test('youtube: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeYoutube(
    { id, slug: 'watch', type: 'youtube', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert(!result.files.some(file => file.path.endsWith('.mp4')));
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('youtube: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeYoutube({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeYoutube(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeYoutube({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});
