import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeAudio } from './materializeAudio';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk', 'en'] };
const valid = () => ({
  id, slug: 'narration' as const, type: 'audio' as const, params: {},
  locale: { fileName: 'audio-uk.mp3',
    title: { uk: 'Оповідь', en: 'English-only' } },
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
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert.match(module, /audio-uk.mp3/);
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
});

test('audio: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeAudio(
    { id, slug: 'narration', type: 'audio', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.mp3/);
  assert(!result.files.some(file => file.path.endsWith('.mp3')));
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('audio: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeAudio({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeAudio(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeAudio({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});
