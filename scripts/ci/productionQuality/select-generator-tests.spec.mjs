import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import {
  generatorSelectors,
  planGeneratorTests,
  rootEngineTestSelectors,
  selectMode,
} from './select-generator-tests.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-generator-tests-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const add = file => {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), '');
    return file;
  };
  const a = add('shared/engine/.test-build/generators/lessons/a.spec.js');
  const b = add('shared/engine/.test-build/generators/lessons/b.spec.js');
  const c = add('shared/engine/scripts/generatorOnly.spec.mjs');
  const pkg = join(root, 'shared/engine/package.json');
  const writeRoot = selector =>
    writeFileSync(
      pkg,
      JSON.stringify({
        scripts: {
          test:
            'tsc -p tsconfig.test.json && node --test ' +
            selector +
            ' && node ../../scripts/checkEngineRuntimeGraph/check-engine-runtime-graph.mjs && node --test ../../scripts/checkEngineRuntimeGraph/check-engine-runtime-graph.spec.mjs',
        },
      }),
    );
  writeRoot('.test-build/generators/lessons/*.spec.js');
  const selectors = ['shared/engine/.test-build/generators/lessons/*.spec.js', c];
  return { root, a, b, c, selectors, writeRoot };
}

test('standalone Ready and manual routes retain all generator test files', t => {
  const { root, a, b, c, selectors } = fixture(t);
  assert.deepEqual(planGeneratorTests({ root, selectors }), {
    all: [a, b, c],
    selected: [a, b, c],
    coveredByUnit: [],
  });
  assert.equal(generatorSelectors.length, 35, 'retain every previous targeted generator selector');
});

test('production route removes only concrete files also selected by exhaustive root npm test', t => {
  const { root, a, b, c, selectors } = fixture(t);
  assert.deepEqual(planGeneratorTests({ root, uniqueOnly: true, selectors }), {
    all: [a, b, c],
    selected: [c],
    coveredByUnit: [a, b],
  });
});

test('root selection becoming narrower automatically restores previously overlapping tests', t => {
  const { root, a, b, c, selectors, writeRoot } = fixture(t);
  writeRoot('.test-build/generators/lessons/a.spec.js');
  const result = planGeneratorTests({ root, uniqueOnly: true, selectors });
  assert.deepEqual(result.selected, [b, c]);
  assert.deepEqual(result.coveredByUnit, [a]);
});

test('drifting root selection, missing compiled tests and unsafe paths fail closed', t => {
  const { root, selectors, writeRoot } = fixture(t);
  writeRoot('.test-build/missing/*.spec.js');
  assert.throws(() => planGeneratorTests({ root, uniqueOnly: true, selectors }), /No compiled tests for selector/);
  writeRoot('.*');
  assert.throws(() => planGeneratorTests({ root, uniqueOnly: true, selectors }), /Unsafe test selector/);
  assert.throws(() => planGeneratorTests({ root, selectors: ['../other/*.spec.js'] }), /Unsafe test selector/);
  assert.throws(
    () => planGeneratorTests({ root, selectors: ['shared/engine/missing/*.spec.js'] }),
    /No compiled tests for selector/,
  );
});

test('cannot replace the complete generator suite with an empty job', t => {
  const { root, selectors, writeRoot } = fixture(t);
  writeRoot('.test-build/generators/lessons/*.spec.js scripts/generatorOnly.spec.mjs');
  assert.throws(() => planGeneratorTests({ root, uniqueOnly: true, selectors }), /Missing generator-only tests/);
});

test('the optimized selection is opt-in only for an explicit true input', () => {
  assert.equal(selectMode(undefined), false);
  assert.equal(selectMode(''), false);
  assert.equal(selectMode('false'), false);
  assert.equal(selectMode('true'), true);
  assert.throws(() => selectMode('1'), /Expected SVITLO_CI_ONLY_UNIQUE_GENERATOR_TESTS/);
});

test('Engine npm unit selector parser accounts for every direct input', () => {
  const command =
    'tsc -p tsconfig.test.json && node --test .test-build/a/*.spec.js generators/skills/publishSkillTree.spec.mjs && node ../../scripts/checkEngineRuntimeGraph/check-engine-runtime-graph.mjs && node --test ../../scripts/checkEngineRuntimeGraph/check-engine-runtime-graph.spec.mjs';
  assert.deepEqual(rootEngineTestSelectors(command), [
    'shared/engine/.test-build/a/*.spec.js',
    'shared/engine/generators/skills/publishSkillTree.spec.mjs',
  ]);
  assert.throws(() => rootEngineTestSelectors('node --test .test-build/a/*.spec.js'), /routing changed/);
});
