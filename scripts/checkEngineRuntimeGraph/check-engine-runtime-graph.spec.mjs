import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { checkEngineRuntimeGraph } from './check-engine-runtime-graph.mjs';

function createFixture(t, files) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-engine-runtime-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const [path, content] of Object.entries(files)) {
    const target = join(root, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
  return join(root, 'runtime.ts');
}

test('type-only references do not pull authoring modules into the browser graph', async t => {
  const entry = createFixture(t, {
    'runtime.ts': "export type { Authoring } from './authoring';\nexport const safe = true;\n",
    'authoring.ts': "import { readFileSync } from 'node:fs';\nexport type Authoring = typeof readFileSync;\n",
  });
  assert.ok((await checkEngineRuntimeGraph(entry)) >= 1);
});

test('rejects transitive Node dependencies behind re-export barrels', async t => {
  const entry = createFixture(t, {
    'runtime.ts': "export { value } from './barrel';\n",
    'barrel.ts': "export { value } from './authoring';\n",
    'authoring.ts': "import { readFileSync } from 'node:fs';\nexport const value = readFileSync;\n",
  });
  await assert.rejects(checkEngineRuntimeGraph(entry), /Node-only imports in Engine runtime browser bundle/);
});

test('rejects removed root and build Engine imports behind a nested module', async t => {
  const entry = createFixture(t, {
    'runtime.ts': "export { value } from './other';\n",
    'other.ts': "import { value } from '@svitlo/engine';\nexport { value };\n",
  });
  await assert.rejects(checkEngineRuntimeGraph(entry), /Engine build\/root imports reached from runtime/);
  const buildEntry = createFixture(t, {
    'runtime.ts': "export { value } from './other';\n",
    'other.ts': "import { value } from '@svitlo/engine/build';\nexport { value };\n",
  });
  await assert.rejects(checkEngineRuntimeGraph(buildEntry), /Engine build\/root imports reached from runtime/);
});

test('accepts Props schemas but rejects corresponding authoring factories', async t => {
  const entry = createFixture(t, {
    'runtime.ts': "export { skill_Props_Schema } from './configurators/skills/defineSkill/defineSkill.schemas';\n",
    'configurators/skills/defineSkill/defineSkill.schemas.ts': 'export const skill_Props_Schema = { safe: true };\n',
    'configurators/skills/defineSkill/defineSkill.ts': "export const defineSkill = () => 'authoring';\n",
  });
  assert.ok((await checkEngineRuntimeGraph(entry)) >= 1);
  const factoryEntry = createFixture(t, {
    'runtime.ts': "export { defineSkill } from './configurators/skills/defineSkill/defineSkill';\n",
    'configurators/skills/defineSkill/defineSkill.ts': "export const defineSkill = () => 'authoring';\n",
  });
  await assert.rejects(checkEngineRuntimeGraph(factoryEntry), /Build-time modules reached from Engine runtime/);
});
