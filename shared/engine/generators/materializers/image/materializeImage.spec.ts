import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeImage } from './materializeImage';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const options = { documentLanguage: 'uk', plannedLanguages: ['uk', 'en'] };
const valid = () => ({
  id, slug: 'figure' as const, type: 'image' as const,
  params: { width: 640, height: 480 },
  locale: { fileName: { uk: 'image-uk.webp', en: 'image-en.webp' },
    alt: { uk: 'Українська схема', en: 'English-only' } },
});

test('image: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeImage(source, options);
  assert.deepEqual(one, materializeImage(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'figure');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineImage<"figure", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('English-only'), 'unreviewed locale is not materialized');
  const parsed = ts.createSourceFile('index.ts', module, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, 'emitted TS must parse');
  assert(one.diagnostics.some(item => item.code === 'pending-locales'));
  assert.match(module, /image-uk.webp/);
  assert(!module.includes('image-en.webp'));
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
  assert.equal(one.files.length, 1);
});

test('image: missing resources are blocked; no fictional resource files created', () => {
  const result = materializeImage(
    { id, slug: 'figure', type: 'image', params: {}, locale: {} }, { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code.startsWith('pending-')));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.webp/);
  assert(!result.files.some(file => file.path.endsWith('.webp')));
  assert.equal(result.files.filter(file => file.kind === 'typescript').length, 1);
});

test('image: refuses unsafe identity or unsupported source language', () => {
  assert.throws(() => materializeImage({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/);
  assert.throws(() => materializeImage(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/);
  assert.throws(() => materializeImage({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/);
});
