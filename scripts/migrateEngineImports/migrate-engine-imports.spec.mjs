import assert from 'node:assert/strict';
import test from 'node:test';
import { rewriteEngineImports } from './migrate-engine-imports.mjs';

test('moves former taxonomy configurators to the Engine build entrypoint', () => {
  assert.equal(
    rewriteEngineImports("import { defineSkill } from '@svitlo/engine/taxonomy';"),
    "import { defineSkill } from '@svitlo/engine/build';",
  );
});

test('moves Contracts-owned taxonomy types to Contracts', () => {
  assert.equal(
    rewriteEngineImports("import type { SkillId } from '@svitlo/engine/taxonomy';"),
    "import type { SkillId } from '@svitlo/contracts/taxonomy';",
  );
});

test('splits mixed value and type imports without changing imported names', () => {
  assert.equal(
    rewriteEngineImports("import { type SkillId, defineSkill } from '@svitlo/engine/taxonomy';"),
    "import { type SkillId } from '@svitlo/contracts/taxonomy';\nimport { defineSkill } from '@svitlo/engine/build';",
  );
});

test('routes localization types to Contracts and helpers to Engine', () => {
  assert.equal(
    rewriteEngineImports(
      "import { type LanguageCode, createLocalizedFileLocations } from '@svitlo/engine/localization';",
    ),
    "import { type LanguageCode } from '@svitlo/contracts/localization';\nimport { createLocalizedFileLocations } from '@svitlo/engine/runtime';",
  );
});

test('removes Contracts-only content proxy exports', () => {
  assert.equal(
    rewriteEngineImports("export type { Course_Toc } from '@svitlo/engine/content';"),
    "export type { Course_Toc } from '@svitlo/contracts/content';",
  );
});

test('rewrites imports from other former Engine entrypoints', () => {
  assert.equal(
    rewriteEngineImports("import { createLesson } from '@svitlo/engine/builders';"),
    "import { createLesson } from '@svitlo/engine/build';",
  );
});

test('does not rewrite strings containing sample source code', () => {
  const fixture = 'const fixture = "import { defineSkill } from \'@svitlo/engine/taxonomy\';";';
  assert.equal(rewriteEngineImports(fixture, 'fixture.ts'), fixture);
});

test('is idempotent', () => {
  const migrated = rewriteEngineImports("import { createLesson } from '@svitlo/engine/builders';");
  assert.equal(rewriteEngineImports(migrated), migrated);
});

test('rejects undeclared Engine subpaths', () => {
  assert.throws(
    () => rewriteEngineImports("import { unknown } from '@svitlo/engine/not-public';"),
    /unsupported Engine import/,
  );
});

test('keeps explicit build and runtime Engine entrypoints intact', () => {
  assert.equal(
    rewriteEngineImports("import { defineSkill } from '@svitlo/engine/build';"),
    "import { defineSkill } from '@svitlo/engine/build';",
  );
  assert.equal(
    rewriteEngineImports("import { assembleLessonProps } from '@svitlo/engine/runtime';"),
    "import { assembleLessonProps } from '@svitlo/engine/runtime';",
  );
});
