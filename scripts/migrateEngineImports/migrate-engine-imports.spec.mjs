import assert from 'node:assert/strict';
import test from 'node:test';
import { rewriteEngineImports } from './migrate-engine-imports.mjs';

test('moves former taxonomy configurators to the Engine build entrypoint', () => {
  assert.equal(
    rewriteEngineImports("import { defineSkill } from '@svitlo/engine/taxonomy';"),
    "import { defineSkill } from '@svitlo/engine/build';",
  );
});

test('rejects taxonomy types with no canonical Engine export', () => {
  assert.throws(
    () => rewriteEngineImports("import type { SkillId } from '@svitlo/engine/taxonomy';"),
    /manual migration required for SkillId/,
  );
});

test('rejects a mixed taxonomy import when one symbol needs a manual migration', () => {
  assert.throws(
    () => rewriteEngineImports("import { type SkillId, defineSkill } from '@svitlo/engine/taxonomy';"),
    /manual migration required for SkillId/,
  );
});

test('routes supported localization types and helpers together to Engine runtime', () => {
  assert.equal(
    rewriteEngineImports(
      "import { type LanguageCode, createLocalizedFileLocations } from '@svitlo/engine/localization';",
    ),
    "import { type LanguageCode, createLocalizedFileLocations } from '@svitlo/engine/runtime';",
  );
});

test('rejects localization interfaces that have no canonical Engine counterpart', () => {
  assert.throws(
    () => rewriteEngineImports("import type { LanguageConfiguration } from '@svitlo/engine/localization';"),
    /manual migration required for LanguageConfiguration/,
  );
});

test('rejects ambiguous content proxy exports instead of generating deleted package imports', () => {
  assert.throws(
    () => rewriteEngineImports("export type { Course_Toc } from '@svitlo/engine/content';"),
    /manual migration required for @svitlo\/engine\/content/,
  );
});

test('rejects wildcard re-exports of legacy localization types', () => {
  assert.throws(
    () => rewriteEngineImports("export * from '@svitlo/engine/localization';"),
    /manual migration required for wildcard export/,
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
