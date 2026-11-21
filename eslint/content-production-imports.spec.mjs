import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { ESLint } from 'eslint';
import { discoverWorkspaces, planWorkspaceOperation } from '../scripts/runWorkspaceScript/run-workspace-script.mjs';
import { contentProductionImportPolicy } from './content-production-imports.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fixture = join(root, 'content/math/data/production-lint-fixture.ts');
const eslint = new ESLint({
  cwd: root,
  overrideConfigFile: true,
  overrideConfig: contentProductionImportPolicy,
});

const forbidden = [
  "import { definePendingLesson } from '@svitlo/engine/build';",
  "import { definePendingQuizSection as quiz } from '@svitlo/engine/build';",
  "import { definePendingFlashcardsSection } from '@svitlo/engine/build';",
  "export { definePendingLesson as lesson } from '@svitlo/engine/build';",
  "import { SceneStub as Scene } from '@svitlo/ui-kit';",
  "export { SceneStub as Scene } from '@svitlo/ui-kit';",
  "export * from '@svitlo/engine/build';",
  "export * as engine from '@svitlo/engine/build';",
  "export * from '@svitlo/ui-kit';",
  "import { definePendingLesson as x } from '../../../shared/engine/build';",
  "export { SceneStub as X } from '../../../shared/ui-kit/index';",
  "import { SceneStub } from './local-reexport';",
  "import * as engine from '@svitlo/engine/build'; engine.definePendingLesson;",
  "import * as engine from '@svitlo/engine/build'; engine['definePendingQuizSection'];",
  "import * as engine from '@svitlo/engine/build'; const { definePendingLesson: x } = engine;",
  "import * as engine from '@svitlo/engine/build'; const alias = engine; alias.definePendingLesson;",
  "import * as engine from '@svitlo/engine/build'; export { engine };",
  "const { definePendingLesson } = require('@svitlo/engine/build');",
  "const { SceneStub: View } = require('@svitlo/ui-kit');",
  "const engine = require('@svitlo/engine/build'); engine.definePendingFlashcardsSection;",
  "require('@svitlo/ui-kit').SceneStub;",
  "const { definePendingQuizSection } = await import('@svitlo/engine/build');",
  "const engine = await import('@svitlo/engine/build'); engine.definePendingLesson;",
  "(await import('@svitlo/ui-kit')).SceneStub;",
  "import('@svitlo/engine/build').then(({ definePendingLesson }) => {});",
  "import('@svitlo/engine/build').then(engine => engine.definePendingLesson);",
  "const mod = import('@svitlo/ui-kit'); mod.then(view => view.SceneStub);",
  "const engine = await import('@svitlo/engine/build'); engine['definePendingLesson'];",
  "const engine = await import('@svitlo/engine/build'); engine[key];",
  "const engine = require('@svitlo/engine/build'); module.exports = engine;",
  "const engine = require('@svitlo/engine/build'); export default engine;",
];

const permitted = [
  "import { defineLesson, defineQuizSection, defineFlashcardsSection } from '@svitlo/engine/build';",
  "export { defineLesson } from '@svitlo/engine/build';",
  "import { defineScene } from '@svitlo/ui-kit';",
  "import { Lesson } from '@svitlo/ui-kit';",
  "import * as engine from '@svitlo/engine/build'; engine.defineLesson;",
  "const { defineLesson } = require('@svitlo/engine/build');",
  "const engine = await import('@svitlo/engine/build'); engine.defineQuizSection;",
  "import('@svitlo/engine/build').then(engine => engine.defineLesson);",
  "const ui = require('@svitlo/ui-kit'); ui.Lesson;",
  "const object = { SceneStub: 'local' }; object.SceneStub;",
  "import { something } from 'some-unrelated-package';",
];

test('every forbidden helper is rejected across static, alias, re-export, namespace, require and dynamic imports', async () => {
  for (const input of forbidden) {
    const [result] = await eslint.lintText(input, { filePath: fixture });
    assert(result.errorCount > 0, 'Unexpectedly allowed: ' + input);
  }
});

test('genuine build helpers and unrelated UI Kit imports remain allowed', async () => {
  for (const input of permitted) {
    const [result] = await eslint.lintText(input, { filePath: fixture });
    assert.equal(result.errorCount, 0, input + '\\n' + JSON.stringify(result.messages));
  }
});

test('every content workspace is registered, linted exhaustively and has an ESLint config', () => {
  const packages = discoverWorkspaces(root);
  const content = packages.filter(pkg => pkg.path.startsWith('content/'));
  assert(content.length >= 17, 'Expected all textbook workspaces');
  assert(content.some(pkg => pkg.path.startsWith('content/languages/')), 'Nested workspaces were not discovered');
  const planned = planWorkspaceOperation(packages, 'code:lint:check');
  for (const pkg of content) {
    assert.equal(pkg.scripts?.['code:lint:check'], 'eslint .', pkg.path + ' is not exhaustively linted');
    assert(existsSync(join(root, pkg.path, 'eslint.config.mjs')), pkg.path + ' is missing ESLint config');
    assert(planned.selected.includes(pkg.name), pkg.name + ' is omitted from root lint');
  }
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert(manifest.scripts['code:lint:check'].includes('run-workspace-script.mjs code:lint:check'));
});

test('Production Quality runs the guard coverage test and then the root lint', () => {
  const workflow = readFileSync(join(root, '.github/workflows/production-quality.yml'), 'utf8');
  assert(workflow.includes('node --test eslint/content-production-imports.spec.mjs'));
  assert(workflow.includes('npm run code:lint:check'));
});

test('real nested, existing and newly configured textbooks lint deep TSX files', async () => {
  for (const pkg of ['content/languages/ukrainian', 'content/art', 'content/playground']) {
    const instance = new ESLint({
      cwd: join(root, pkg),
      overrideConfigFile: join(root, pkg, 'eslint.config.mjs'),
    });
    const [result] = await instance.lintText("import { SceneStub } from '@svitlo/ui-kit';", {
      filePath: join(root, pkg, 'data/deep/example.tsx'),
    });
    assert(result.errorCount > 0, pkg + ' silently skipped TSX file');
  }
});
