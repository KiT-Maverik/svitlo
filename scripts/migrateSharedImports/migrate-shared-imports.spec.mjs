import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalSharedSpecifier, migrateSharedImports } from './migrate-shared-imports.mjs';

test('preserves Engine public entrypoints and collapses other shared package paths', () => {
  assert.equal(canonicalSharedSpecifier('@svitlo/engine/runtime'), '@svitlo/engine/runtime');
  assert.equal(canonicalSharedSpecifier('@svitlo/indexdb/lessons'), '@svitlo/indexdb');
  assert.equal(canonicalSharedSpecifier('@svitlo/adapter-electron/main'), '@svitlo/adapter-electron');
});

test('merges duplicate named imports, preserves aliases and runtime/type semantics', () => {
  const source = [
    "import { createLesson } from '@svitlo/indexdb/lessons';",
    "import { getMarkdownLocale as markdown } from '@svitlo/indexdb';",
    "import type { LessonResponse } from '@svitlo/indexdb/types';",
    "import { createLesson } from '@svitlo/indexdb';",
    'export const value = markdown;',
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.equal(result.diagnostics.length, 0);
  assert.match(
    result.code,
    /import \{ createLesson, getMarkdownLocale as markdown, type LessonResponse \} from '@svitlo\/indexdb';/,
  );
  assert.equal((result.code.match(/from '@svitlo\/indexdb'/g) ?? []).length, 1);
  assert.equal(migrateSharedImports(result.code).changed, false);
});

test('rewrites type-only, dynamic import and re-exports while preserving Engine runtime imports', () => {
  const source = [
    "import type { One } from '@svitlo/indexdb/controllers';",
    "import type { Two } from '@svitlo/indexdb/config';",
    "export { Widget } from '@svitlo/ui-kit/widgets';",
    "const mod = import('@svitlo/adapter-nextjs/image');",
    "import type { Lesson_Props } from '@svitlo/engine/runtime';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.match(result.code, /import type \{ One, Two \} from '@svitlo\/indexdb';/);
  assert.match(result.code, /export \{ Widget \} from '@svitlo\/ui-kit';/);
  assert.match(result.code, /import\('@svitlo\/adapter-nextjs'\)/);
  assert.match(result.code, /'@svitlo\/engine\/runtime'/);
});

test('flags same-local-name collisions rather than silently changing bindings', () => {
  const source = [
    "import { One as value } from '@svitlo/indexdb/a';",
    "import { Two as value } from '@svitlo/indexdb/b';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.equal(result.diagnostics.length, 1);
  assert.match(result.diagnostics[0], /conflicting imported names/);
});

test('leaves namespace imports and side-effect-only imports semantically safe', () => {
  const source = [
    "import * as Engine from '@svitlo/indexdb/lessons';",
    "import { createLesson } from '@svitlo/indexdb/utils';",
    "import '@svitlo/indexdb/definitions';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.match(result.code, /import \* as Engine from '@svitlo\/indexdb';/);
  assert.match(result.code, /import \{ createLesson \} from '@svitlo\/indexdb';/);
  assert.equal((result.code.match(/import '@svitlo\/indexdb';/g) ?? []).length, 0);
});

test('retains side-effect execution when merging type-only imports', () => {
  const source = [
    "import type { LessonResponse } from '@svitlo/indexdb/types';",
    "import '@svitlo/indexdb/generators';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.match(result.code, /import type \{ LessonResponse \} from '@svitlo\/indexdb';/);
  assert.match(result.code, /import '@svitlo\/indexdb';/);
});

test('deduplicates side-effect-only imports safely', () => {
  const source = ["import '@svitlo/indexdb/controllers';", "import '@svitlo/indexdb/config';"].join('\n');
  const result = migrateSharedImports(source);
  assert.equal((result.code.match(/import '@svitlo\/indexdb';/g) ?? []).length, 1);
  assert.equal(migrateSharedImports(result.code).changed, false);
});

test('preserves explicit Engine subpaths while rejecting the removed root and private paths', () => {
  assert.equal(canonicalSharedSpecifier('@svitlo/engine/build'), '@svitlo/engine/build');
  assert.equal(canonicalSharedSpecifier('@svitlo/engine/runtime'), '@svitlo/engine/runtime');
  assert.equal(migrateSharedImports("import { defineSkill } from '@svitlo/engine/build';").changed, false);
  assert.equal(migrateSharedImports("import { assembleSkills } from '@svitlo/engine/runtime';").changed, false);
  assert.throws(() => canonicalSharedSpecifier('@svitlo/engine'), /Unsupported Engine import/);
  assert.throws(() => canonicalSharedSpecifier('@svitlo/engine/configurators'), /Unsupported Engine import/);
});
