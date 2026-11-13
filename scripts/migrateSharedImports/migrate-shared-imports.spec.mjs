import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalSharedSpecifier, migrateSharedImports } from './migrate-shared-imports.mjs';

test('preserves Contracts subpaths and collapses other shared package paths', () => {
  assert.equal(canonicalSharedSpecifier('@svitlo/contracts/content'), '@svitlo/contracts/content');
  assert.equal(canonicalSharedSpecifier('@svitlo/engine/lessons'), '@svitlo/engine');
  assert.equal(canonicalSharedSpecifier('@svitlo/adapter-electron/main'), '@svitlo/adapter-electron');
});

test('merges duplicate named imports, preserves aliases and runtime/type semantics', () => {
  const source = [
    "import { createLesson } from '@svitlo/engine/lessons';",
    "import { getMarkdownLocale as markdown } from '@svitlo/engine';",
    "import type { LessonResponse } from '@svitlo/engine/types';",
    "import { createLesson } from '@svitlo/engine';",
    'export const value = markdown;',
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.equal(result.diagnostics.length, 0);
  assert.match(
    result.code,
    /import \{ createLesson, getMarkdownLocale as markdown, type LessonResponse \} from '@svitlo\/engine';/,
  );
  assert.equal((result.code.match(/from '@svitlo\/engine'/g) ?? []).length, 1);
  assert.equal(migrateSharedImports(result.code).changed, false);
});

test('rewrites type-only, dynamic import and re-exports without changing Contracts', () => {
  const source = [
    "import type { One } from '@svitlo/indexdb/controllers';",
    "import type { Two } from '@svitlo/indexdb/config';",
    "export { Widget } from '@svitlo/ui-kit/widgets';",
    "const mod = import('@svitlo/adapter-nextjs/image');",
    "import type { Lesson } from '@svitlo/contracts/content';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.match(result.code, /import type \{ One, Two \} from '@svitlo\/indexdb';/);
  assert.match(result.code, /export \{ Widget \} from '@svitlo\/ui-kit';/);
  assert.match(result.code, /import\('@svitlo\/adapter-nextjs'\)/);
  assert.match(result.code, /'@svitlo\/contracts\/content'/);
});

test('flags same-local-name collisions rather than silently changing bindings', () => {
  const source = [
    "import { One as value } from '@svitlo/engine/a';",
    "import { Two as value } from '@svitlo/engine/b';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.equal(result.diagnostics.length, 1);
  assert.match(result.diagnostics[0], /conflicting imported names/);
});

test('leaves namespace imports and side-effect-only imports semantically safe', () => {
  const source = [
    "import * as Engine from '@svitlo/engine/lessons';",
    "import { createLesson } from '@svitlo/engine/utils';",
    "import '@svitlo/engine/definitions';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.match(result.code, /import \* as Engine from '@svitlo\/engine';/);
  assert.match(result.code, /import \{ createLesson \} from '@svitlo\/engine';/);
  assert.equal((result.code.match(/import '@svitlo\/engine';/g) ?? []).length, 0);
});

test('retains side-effect execution when merging type-only imports', () => {
  const source = [
    "import type { LessonResponse } from '@svitlo/engine/types';",
    "import '@svitlo/engine/generators';",
  ].join('\n');
  const result = migrateSharedImports(source);
  assert.match(result.code, /import type \{ LessonResponse \} from '@svitlo\/engine';/);
  assert.match(result.code, /import '@svitlo\/engine';/);
});

test('deduplicates side-effect-only imports safely', () => {
  const source = ["import '@svitlo/indexdb/controllers';", "import '@svitlo/indexdb/config';"].join('\n');
  const result = migrateSharedImports(source);
  assert.equal((result.code.match(/import '@svitlo\/indexdb';/g) ?? []).length, 1);
  assert.equal(migrateSharedImports(result.code).changed, false);
});
