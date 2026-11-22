import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

import { materializeScene } from './materializeScene';

const sceneId = '1cd999af-66ad-4f01-ae77-faf6454b56c1';
const scene = () => ({
  id: sceneId, slug: 'chooseShape', type: 'scene' as const, params: {},
  locale: { value: { title: { uk: 'Обери форму', en: 'Choose shape' }, prompt: 'Invariant prompt' } },
});
const context = () => ({
  directory: 'content/items/activity',
  documentLanguage: 'uk',
  languagesImport: '../../../languages',
  registered: false,
  production: { specification: '# Verified scene\n\nUse the approved interaction.\n', pending: true },
});
function parse(source: string) {
  const file = ts.createSourceFile('index.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(file.parseDiagnostics.length, 0);
}

test('Scene emits canonical source, source locale and the exact reviewed specification', () => {
  const result = materializeScene(scene(), context());
  assert.deepEqual(result, materializeScene(scene(), context()), 'same source must be deterministic');
  assert.equal(result.exportName, 'chooseShape');
  assert.equal(result.files[0]?.path, 'content/items/activity/specification.md');
  assert.equal(result.files[0]?.content, context().production.specification);
  const code = result.files.at(-1)!.content;
  parse(code);
  assert.match(code, /defineScene<"chooseShape", typeof languages>/);
  assert.match(code, /TODO \(BLOCKER\).*register Scene/);
  assert.match(code, /"uk": "Обери форму"/);
  assert.doesNotMatch(code, /Choose shape/);
  assert.doesNotMatch(code, /sceneImplementationRequired|SceneStub\s*\(/, 'React stub must remain external');
  assert.equal(result.diagnostics[0]?.code, 'pending-scene');
});

test('Scene registered and specified is not falsely marked pending', () => {
  const result = materializeScene(scene(), { ...context(), registered: true, production: { specification: '# Reviewed' } });
  assert.equal(result.diagnostics.length, 0);
  assert.doesNotMatch(result.files.at(-1)!.content, /TODO \(BLOCKER\)/);
});

test('Scene lacking production evidence keeps a visible publication blocker', () => {
  const result = materializeScene(scene(), { ...context(), registered: true, production: undefined });
  assert.deepEqual(result.diagnostics.map(d => d.code), ['missing-scene-specification']);
  assert.match(result.files[0]!.content, /TODO \(BLOCKER\)/);
  assert.equal(result.files.some(f => f.path.endsWith('specification.md')), false);
});

test('Scene refuses unsafe paths, missing source locale and array-valued authored locale', () => {
  assert.throws(() => materializeScene(scene(), { ...context(), directory: '../other' }), /unsafe/);
  assert.throws(() => materializeScene(scene(), { ...context(), documentLanguage: 'pl' }), /missing reviewed source language/);
  assert.throws(() => materializeScene({
    ...scene(), locale: { value: ['first', 'second'] as never },
  }, context()), /arrays/);
  assert.throws(() => materializeScene({ ...scene(), id: '../../path' }, context()), /immutable UUID/);
});
