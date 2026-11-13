import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkRuntimeImports } from './check-engine-runtime-graph.mjs';

test('allows type-only references to authoring modules', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-runtime-types-'));
  try {
    writeFileSync(join(root, 'runtime.ts'), "export type { Authoring } from './authoring';\n");
    writeFileSync(join(root, 'authoring.ts'), "import { readFileSync } from 'node:fs';\nexport type Authoring = string;\n");
    assert.deepEqual(checkRuntimeImports(join(root, 'runtime.ts')).errors, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('detects forbidden transitive Node imports hidden behind reexport barrels', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-runtime-node-'));
  try {
    writeFileSync(join(root, 'runtime.ts'), "export * from './barrel';\n");
    writeFileSync(join(root, 'barrel.ts'), "export * from './authoring';\n");
    writeFileSync(join(root, 'authoring.ts'), "import { readFileSync } from 'node:fs';\nexport const value = readFileSync;\n");
    assert.match(checkRuntimeImports(join(root, 'runtime.ts')).errors.join('\n'), /Node builtin node:fs/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('rejects a root Engine import even through nested modules', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-runtime-root-'));
  try {
    writeFileSync(join(root, 'runtime.ts'), "export { value } from './other';\n");
    writeFileSync(join(root, 'other.ts'), "import { value } from '@svitlo/engine';\nexport { value };\n");
    assert.match(checkRuntimeImports(join(root, 'runtime.ts')).errors.join('\n'), /Build\/root Engine import/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('permits the canonical Props schema module but rejects the corresponding define factory', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-runtime-schema-'));
  try {
    const folder = join(root, 'configurators', 'skills', 'defineSkill');
    mkdirSync(folder, { recursive: true });
    writeFileSync(join(root, 'runtime.ts'), "export * from './configurators/skills/defineSkill/defineSkill.schemas';\n");
    writeFileSync(join(folder, 'defineSkill.schemas.ts'), "export const skill_Props_Schema = 1;\n");
    writeFileSync(join(folder, 'defineSkill.ts'), "export const defineSkill = () => {};\n");
    assert.deepEqual(checkRuntimeImports(join(root, 'runtime.ts')).errors, []);
    writeFileSync(join(root, 'runtime.ts'), "export * from './configurators/skills/defineSkill/defineSkill';\n");
    assert.match(checkRuntimeImports(join(root, 'runtime.ts')).errors.join('\n'), /Authoring module reached/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
