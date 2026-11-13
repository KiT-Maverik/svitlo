import assert from 'node:assert/strict';
import test from 'node:test';
import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import { engineRuntimeOnly } from '../../../eslint/engine-runtime-only.mjs';

const linter = new Linter();
const config = [
  { files: ['**/*.{js,ts}'], languageOptions: { parser: tseslint.parser } },
  engineRuntimeOnly,
];
const lint = source =>
  linter.verify(source, config, { filename: 'src/engine-import-policy.ts' })
    .filter(message => message.ruleId === 'svitlo/engine-runtime-only');

test('rejects static build imports, type imports, reexports and the removed root', () => {
  for (const source of [
    "import { defineSkill } from '@svitlo/engine/build';",
    "import type { Lesson_Config } from '@svitlo/engine/build';",
    "export { defineSkill } from '@svitlo/engine/build';",
    "export * from '@svitlo/engine/build';",
    "import * as Engine from '@svitlo/engine';",
    "import { x } from '@svitlo/engine/configurators';",
  ]) {
    assert.equal(lint(source).length, 1, source);
  }
});

test('rejects dynamic and CommonJS build module loading', () => {
  for (const source of [
    "const mod = import('@svitlo/engine/build');",
    "const mod = import('@svitlo/engine/build/secret');",
    "const mod = require('@svitlo/engine/build');",
    "const resolved = require.resolve('@svitlo/engine/build');",
  ]) {
    assert.equal(lint(source).length, 1, source);
  }
});

test('allows runtime imports and unrelated string literals', () => {
  for (const source of [
    "import { assembleSkills } from '@svitlo/engine/runtime';",
    "import type { Lesson_Props } from '@svitlo/engine/runtime';",
    "const example = \"import from '@svitlo/engine/build'\";",
  ]) {
    assert.equal(lint(source).length, 0, source);
  }
});
