import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import type { CourseWorkflowStage1Languages } from '../../../types/workflow';
import { materializeSubtitles } from './materializeSubtitles';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id,
  slug: 'captions' as const,
  type: 'subtitles' as const,
  params: {},
  locale: { fileName: { uk: `${id}.vtt`, en: '01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.vtt' } },
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
  assert(!module.includes('01f1d8b8-e409-4cf3-bd64-1e76f2be9db2.vtt'), 'unreviewed locale is not materialized');
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
  assert.match(module, new RegExp(id + '\\.vtt'));
  assert(!one.diagnostics.some(item => item.code === 'pending-media'));
});

test('subtitles: missing media uses a valid reserved Nil UUID without inventing an asset', () => {
  const result = materializeSubtitles(
    { id, slug: 'captions', type: 'subtitles', params: {}, locale: {} },
    { documentLanguage: 'uk' },
  );
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert.match(result.files[0].content, /TODO \(BLOCKER\):/);
  assert.match(result.files[0].content, /00000000-0000-0000-0000-000000000000.vtt/);
  assert(!result.files.some(file => file.path.endsWith('.vtt')));
  assert.equal((result.files[0].content.match(/TODO \(BLOCKER\): Supply verified fileName asset/g) ?? []).length, 1);
  assert.doesNotMatch(result.files[0].content, /TODO\(asset\): Replace reserved Nil/);
  assert.equal(result.diagnostics.filter(item => item.code === 'pending-media').length, 1);
  assert.throws(
    () =>
      materializeSubtitles(
        { id, slug: 'captions', type: 'subtitles', params: { disabled: false as never }, locale: {} },
        { documentLanguage: 'uk' },
      ),
    /type-valid Subtitles Config/,
  );
});

test('subtitles: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeSubtitles({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeSubtitles(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeSubtitles({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('subtitles: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/subtitles';
  const nested = materializeSubtitles(valid(), {
    ...options,
    directory,
    languagesImport: '../../../../../languages',
    production: { specification: 'Reviewed source brief' },
  });
  assert(nested.files.every(file => file.path.startsWith(directory + '/')));
  assert(nested.files.some(file => file.path === directory + '/index.ts'));
  assert(!nested.files.some(file => file.path.endsWith('/specification.md')));
  const inline = nested.files.find(file => file.path === directory + '/index.ts')?.content ?? '';
  assert.match(inline, /TODO \\(BLOCKER\\): Remove the temporary Subtitles specification/);
  assert.match(inline, /\\* # specification[\\s\\S]*\\* Reviewed source brief/);
  assert(inline.indexOf(');') < inline.indexOf('Remove the temporary Subtitles specification'));
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
  assert.throws(() => materializeSubtitles(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeSubtitles(valid(), { ...options, directory }), /explicit root languages module/);
});
