import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import type { CourseWorkflowStage1Languages } from '../../../types/workflow';
import { materializeText } from './materializeText';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
// The reviewed Course Stage 1 source is typed with production.languages.
const productionLanguages: CourseWorkflowStage1Languages = { document: 'uk', planned: ['uk', 'en'] };
const options = { documentLanguage: productionLanguages.document, plannedLanguages: productionLanguages.planned };
const valid = () => ({
  id,
  slug: 'intro' as const,
  type: 'text' as const,
  params: { variables: { person: { applyStyle: ['bold'] as ['bold'] } } },
  locale: { value: { uk: 'Привіт %_%id: person; value: Оля%_%', en: 'Welcome %_%id: person; value: Ada%_%' } },
});

test('text: exact source, imports, locale pruning, deterministic non-writing plan', () => {
  const source = valid();
  const original = structuredClone(source);
  const one = materializeText(source, options);
  assert.deepEqual(one, materializeText(source, options));
  assert.deepEqual(source, original, 'never mutate the reviewed Config source');
  assert.equal(one.exportName, 'intro');
  assert(one.files.some(file => file.path === 'index.ts'));
  assert(one.files.every(file => !file.path.startsWith('/') && !file.path.includes('..')));
  const module = one.files.find(file => file.path === 'index.ts')?.content ?? '';
  assert.match(module, /defineText<"intro", typeof languages>/);
  assert(module.includes(id), 'original immutable UUID retained');
  assert(!module.includes('Welcome'), 'unreviewed locale is not materialized');
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
  assert.match(module, /Привіт/);
  assert.match(module, /%_%id: person; value: Оля%_%/);
  assert.match(module, /applyStyle/);
  assert.throws(
    () =>
      materializeText(
        { ...valid(), locale: { value: { uk: '%_%id: invalid; value: x%_%' } } },
        { documentLanguage: 'uk' },
      ),
    /Text variables validation failed/,
  );
});

test('text: missing mandatory Config input must not emit an invalid defineText call', () => {
  assert.throws(
    () => materializeText({ id, slug: 'intro', type: 'text', params: {}, locale: {} }, { documentLanguage: 'uk' }),
    /Cannot materialize type-valid Text Config.*TODO \(BLOCKER\)/,
  );
});

test('text: refuses unsafe identity or unsupported source language', () => {
  assert.throws(
    () => materializeText({ ...valid(), id: 'invalid' }, { documentLanguage: 'uk' }),
    /immutable, non-nil UUID/,
  );
  assert.throws(
    () => materializeText(valid(), { documentLanguage: 'en', plannedLanguages: ['uk'] }),
    /missing source language/,
  );
  assert.throws(
    () => materializeText({ ...valid(), slug: '../bad' }, { documentLanguage: 'uk' }),
    /unsafe or missing slug/,
  );
});

test('text: rejects unsupported nested Config properties instead of discarding them', () => {
  const draft = valid();
  assert.throws(
    () =>
      materializeText(
        { ...draft, params: { ...draft.params, unexpected: 'not part of Config' } as never },
        { documentLanguage: 'uk' },
      ),
    /unsupported authored fields/,
  );
});

test('text: absent reviewed source locale cannot produce a partial Config', () => {
  assert.throws(
    () =>
      materializeText(
        { ...valid(), locale: { value: { en: 'Only unreviewed translation' } } },
        { documentLanguage: 'uk' },
      ),
    /Cannot materialize type-valid Text Config/,
  );
});

test('text: composed nested source paths and Course language handoff', () => {
  const directory = 'sections/intro/content/items/text';
  const nested = materializeText(valid(), {
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
  assert.throws(() => materializeText(valid(), { ...options, directory: '../escape' }), /unsafe output path/);
  assert.throws(() => materializeText(valid(), { ...options, directory }), /explicit root languages module/);
});
