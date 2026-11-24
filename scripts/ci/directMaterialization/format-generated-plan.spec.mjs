import assert from 'node:assert/strict';
import test from 'node:test';
import {
  formatGeneratedPlan,
  formatGeneratedTypeScript,
  groupGeneratedImports,
  unquoteGeneratedObjectKeys,
} from './format-generated-plan.mjs';

const fixture = [
  '// TODO (BLOCKER): The reviewed source still needs real media.',
  "import { local } from '../local';",
  "import type { Mode } from '#lessonsData/mode';",
  '// Keep this comment attached to the workspace import.',
  "import { defineLesson } from '@svitlo/engine/build';",
  "import { readFileSync } from 'node:fs';",
  "import { z } from 'zod';",
  '',
  'const state = {',
  '  "ordinary": "not-a-key",',
  '  "some-key": "literal-string-value",',
  '  "some spaced key": 1,',
  '  "546a1d10-e656-4184-bdc9-f2a85017d18a": 2,',
  '  "123": 3,',
  '  nested: { "inner": "ordinary" },',
  '  ["computed-key"]: 4,',
  '};',
  'export { state };',
  '',
].join('\n');

test('sorts the initial static imports by trusted groups, then by specifier', async () => {
  const formatted = await formatGeneratedTypeScript(fixture, 'content/playground/index.ts');
  const parts = [
    "from 'node:fs';",
    "from 'zod';",
    "from '@svitlo/engine/build';",
    "from '#lessonsData/mode';",
    "from '../local';",
  ];
  let offset = -1;
  for (const part of parts) {
    const next = formatted.indexOf(part);
    assert(next > offset, part + ' must follow the previous import group');
    offset = next;
  }
  assert.match(formatted, /from 'zod';\n\n\/\/ Keep this comment attached to the workspace import\.\nimport/);
  assert.match(formatted, /from '@svitlo\/engine\/build';\n\nimport type/);
  assert.match(formatted, /from '#lessonsData\/mode';\n\nimport/);
  assert.match(formatted, /^\/\/ TODO \(BLOCKER\): The reviewed source still needs real media\./);
});

test('unquotes only safe object-literal IdentifierNames, not invalid property names or literal values', async () => {
  const formatted = await formatGeneratedTypeScript(fixture, 'index.ts');
  assert.match(formatted, /ordinary: 'not-a-key'/);
  assert.match(formatted, /nested: \{ inner: 'ordinary' \}/);
  assert.match(formatted, /'some-key': 'literal-string-value'/);
  assert.match(formatted, /'some spaced key': 1/);
  assert.match(formatted, /'546a1d10-e656-4184-bdc9-f2a85017d18a': 2/);
  assert.match(formatted, /'123': 3/);
  assert.match(formatted, /\['computed-key'\]: 4/);
  assert.doesNotMatch(formatted, /'ordinary':/);
  const raw = unquoteGeneratedObjectKeys('const item = { "café": "café", "01": 1 };', 'x.ts');
  assert.match(raw, /café: "café"/);
  assert.match(raw, /"01": 1/);
});

test('preserves statement order when a side-effect-only import is present', () => {
  const raw =
    "import { child } from './child';\nimport './register';\nimport { parent } from '@svitlo/engine/build';\n";
  assert.equal(groupGeneratedImports(raw, 'x.ts'), raw);
});

test('preserves import type, TSX expressions and TODO comments in nested generated sources', async () => {
  const raw = [
    '// TODO (BLOCKER): Finish the Scene before release.',
    "import { Label } from './Label';",
    "import type { FC } from 'react';",
    "import { createElement } from 'react';",
    'const Sample: FC = () => <section data-lesson="ok">{({ "status": "ready" }).status}</section>;',
    'export { Sample };',
    '',
  ].join('\n');
  const formatted = await formatGeneratedTypeScript(raw, 'scenes/demo/Demo.stories.tsx');
  assert.match(formatted, /import \{ createElement \} from 'react';/);
  assert.match(formatted, /import type \{ FC \} from 'react';/);
  assert.match(formatted, /from 'react';\n\nimport \{ Label \}/);
  assert.match(formatted, /\{ status: 'ready' \}/);
  assert.match(formatted, /data-lesson="ok"/);
  assert.match(formatted, /TODO \(BLOCKER\): Finish the Scene before release/);
});

test('is deterministic and idempotent with byte-identical outputs', async () => {
  const first = await formatGeneratedTypeScript(fixture, 'nested/index.ts');
  const second = await formatGeneratedTypeScript(fixture, 'nested/index.ts');
  const repeated = await formatGeneratedTypeScript(first, 'nested/index.ts');
  assert.equal(first, second);
  assert.equal(first, repeated);
  assert.deepEqual(Buffer.from(first, 'utf8'), Buffer.from(repeated, 'utf8'));
  assert(first.endsWith('\n'));
});

test('formats every generated TypeScript file once without modifying metadata, non-TypeScript resources or input', async () => {
  const plan = Object.freeze({
    publishable: false,
    sourceBlobSha: 'a'.repeat(40),
    diagnostics: Object.freeze([{ path: 'unit', code: 'pending' }]),
    files: Object.freeze([
      Object.freeze({ path: 'lesson/index.ts', kind: 'typescript', content: fixture }),
      Object.freeze({
        path: 'scenes/demo/Scene.stories.tsx',
        kind: 'typescript',
        content: 'export const A=()=> <div/>;',
      }),
      Object.freeze({ path: 'lesson/readme.md', kind: 'markdown', content: '# Raw  text\n' }),
      Object.freeze({ path: 'lesson/snippet.ts', kind: 'code', content: 'const intentionallyRaw=1' }),
    ]),
  });
  const result = await formatGeneratedPlan(plan);
  assert.notEqual(result, plan);
  assert.notEqual(result.files, plan.files);
  assert.equal(result.files.length, 4);
  assert.notEqual(result.files[0].content, fixture);
  assert.match(result.files[1].content, /export const A = \(\) => <div \/>;/);
  assert.equal(result.files[2].content, plan.files[2].content);
  assert.equal(result.files[3].content, plan.files[3].content);
  assert.equal(plan.files[0].content, fixture);
  assert.strictEqual(result.diagnostics, plan.diagnostics);
  assert.equal(result.sourceBlobSha, plan.sourceBlobSha);
  const again = await formatGeneratedPlan(result);
  assert.deepEqual(result, again);
});

test('fails closed for invalid generated TypeScript and malformed plans', async () => {
  await assert.rejects(formatGeneratedTypeScript('const = ;', 'invalid.ts'));
  await assert.rejects(formatGeneratedPlan({ files: null }), /file plan/);
  await assert.rejects(formatGeneratedPlan(null), /file plan/);
});
