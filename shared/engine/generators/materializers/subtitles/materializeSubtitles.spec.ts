import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeSubtitles } from './materializeSubtitles';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk', 'en'] };
const valid = () => ({
  id, slug: 'captions' as const, type: 'subtitles' as const, params: {},
  locale: { fileName: { uk: 'uk.vtt', en: 'en.vtt' } },
});

test('subtitles: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeSubtitles(source, options);
  assert.deepEqual(one, materializeSubtitles(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'captions');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineSubtitles<"captions", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('en.vtt'), 'unreviewed locale is not materialized');
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert.match(module, /uk.vtt/);
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
});

test('subtitles: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeSubtitles(
    { id, slug: 'captions', type: 'subtitles', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.vtt/);
  assert(!result.files.some(file => file.path.endsWith('.vtt')));
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('subtitles: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeSubtitles({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeSubtitles(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeSubtitles({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});
