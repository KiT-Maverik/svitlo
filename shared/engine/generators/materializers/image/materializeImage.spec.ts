import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeImage } from './materializeImage';
import type { CourseWorkflowStage1Languages } from '../../../types/workflow';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id,
  slug: 'figure' as const,
  type: 'image' as const,
  params: { width: 640, height: 480 },
  locale: {
    fileName: { uk: `${id}.webp`, en: '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp' },
    alt: { uk: 'Українська схема', en: 'English-only' },
  },
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
  assert.match(module, new RegExp(id + '\\.webp'));
  assert(!module.includes('01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.webp'));
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
  assert.equal(one.files.length, 1);
});

test('image: missing mandatory Config input must not emit an invalid defineImage call', () => {
  assert.throws(
    () => materializeImage({ id, slug: 'figure', type: 'image', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Image Config.*TODO \(BLOCKER\)/,
  );
});

test('image: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeImage({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeImage(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeImage({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('image: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/image';
  const nested = materializeImage(valid(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(nested.files.some(file => file.path === directory + '/specification.md'));
  assert(
    nested.files.find(file => file.path.endsWith('/index.ts'))?.content.includes('from "../../../../../languages"'),
  );
  assert.throws(() => materializeImage(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeImage(valid(), { ...options, directory }), /explicit root languages module/);
});

test('image: pending asset is a typed Nil UUID placeholder, not a fabricated file', () => {
  const result = materializeImage(
    { ...valid(), locale: { alt: { uk: 'Українська схема' } } },
    { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.webp/);
  assert(!result.files.some(file => file.kind !== 'typescript'));
  assert.equal((result.files[0].content.match(/TODO \\(BLOCKER\\): Supply verified fileName asset/g) ?? []).length, 1);
  assert.doesNotMatch(result.files[0].content, /TODO\\(asset\\): Replace reserved Nil/);
});
