import assert from 'node:assert/strict';
import { win32 } from 'node:path';
import test from 'node:test';
import { isAllowedEngineImport } from './engine-import-policy.mjs';

const buildContext = 'shared/engine/configurators/_shared__configurators/buildContext.ts';

test('only the Build Context owner can import node:async_hooks', () => {
  assert.equal(isAllowedEngineImport(buildContext, 'node:async_hooks'), true);
  for (const path of [
    'shared/engine/runtime.ts',
    'shared/engine/configurators/_shared__configurators/common.schemas.ts',
    'shared/engine/configurators/_shared__configurators/buildContextCopy.ts',
    'shared/engine/configurators/questions/defineSelectOneAnswer/defineSelectOneAnswer.ts',
  ])
    assert.equal(isAllowedEngineImport(path, 'node:async_hooks'), false, path);
  assert.equal(isAllowedEngineImport(buildContext, 'node:fs'), false);
  assert.equal(isAllowedEngineImport(buildContext, 'esbuild'), false);
});

test('runtime-facing and configurator sources cannot gain external dependencies', () => {
  for (const source of [
    'shared/engine/runtime.ts',
    'shared/engine/configurators/_shared__configurators/common.schemas.ts',
    'shared/engine/configurators/lessons/defineLesson/defineLesson.ts',
  ]) {
    for (const specifier of [
      'node:fs',
      'node:path',
      'node:async_hooks',
      '@svitlo/ui-kit',
      '@svitlo/web',
      'react',
      'next',
    ]) {
      assert.equal(isAllowedEngineImport(source, specifier), false, source + ' -> ' + specifier);
    }
    for (const specifier of ['./local', '#schemas', 'zod'])
      assert.equal(isAllowedEngineImport(source, specifier), true, source + ' -> ' + specifier);
  }
});

test('existing isolated build-only exceptions stay unchanged', () => {
  assert.equal(isAllowedEngineImport('shared/engine/utils/generators/compile.ts', 'node:fs'), true);
  assert.equal(isAllowedEngineImport('shared/engine/utils/generators/compile.ts', 'esbuild'), true);
  assert.equal(
    isAllowedEngineImport('shared/engine/configurators/contentBlocks/defineCode/helpers.ts', 'node:fs'),
    true,
  );
  assert.equal(
    isAllowedEngineImport('shared/engine/configurators/contentBlocks/defineMarkdown/check.ts', 'node:path'),
    true,
  );
  assert.equal(
    isAllowedEngineImport(
      'shared/engine/configurators/contentBlocks/_shared__contentBlocks/validateLocalAssets/check.ts',
      'node:fs',
    ),
    true,
  );
  assert.equal(
    isAllowedEngineImport('shared/engine/configurators/contentBlocks/defineText/defineText.ts', 'node:fs'),
    false,
  );
});

test('Windows-relative paths preserve the exact same Engine import policy', () => {
  const root = 'C:/repository';
  const cases = [
    [buildContext, 'node:async_hooks', true],
    [buildContext, 'node:fs', false],
    [buildContext, '@svitlo/ui-kit', false],
    ['shared/engine/configurators/_shared__configurators/buildContextCopy.ts', 'node:async_hooks', false],
    ['shared/engine/runtime.ts', 'node:async_hooks', false],
    ['shared/engine/utils/generators/compile.ts', 'node:fs', true],
    ['shared/engine/configurators/contentBlocks/defineCode/helpers.ts', 'node:fs', true],
    ['shared/engine/configurators/contentBlocks/defineText/defineText.ts', 'node:fs', false],
  ];
  for (const [path, specifier, expected] of cases) {
    const windowsPath = win32.relative(root, win32.join(root, path));
    assert.equal(isAllowedEngineImport(windowsPath, specifier), expected, windowsPath + ' -> ' + specifier);
    assert.equal(isAllowedEngineImport(path, specifier), expected, path + ' -> ' + specifier);
  }
});
