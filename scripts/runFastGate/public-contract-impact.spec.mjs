import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { publicModules, publicSignature } from './public-contract-impact.mjs';

test('public signatures ignore a typed function body but detect interface and schema changes', () => {
  const before = 'export interface Contract { value: string }\nexport function run(): number { return 1; }';
  const privateEdit = 'export interface Contract { value: string }\nexport function run(): number { return 2; }';
  assert.equal(publicSignature(before), publicSignature(privateEdit));
  assert.notEqual(publicSignature(before), publicSignature(before.replace('value: string', 'value: number')));
  assert.notEqual(
    publicSignature('export const schema = z.object({ x: z.string() });'),
    publicSignature('export const schema = z.object({ x: z.number() });'),
  );
});

test('only exported modules reachable from package manifest are public', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-export-'));
  try {
    mkdirSync(join(root, 'shared/demo/src'), { recursive: true });
    writeFileSync(join(root, 'shared/demo/src/index.ts'), "export * from './api';\n");
    writeFileSync(join(root, 'shared/demo/src/api.ts'), "export type Contract = string;\n");
    writeFileSync(join(root, 'shared/demo/src/private.ts'), "export type Private = string;\n");
    const pkg = { path: 'shared/demo', exports: { '.': { types: './dist/src/index.d.ts' } } };
    assert.deepEqual([...publicModules(pkg, root)].sort(), ['shared/demo/src/api.ts', 'shared/demo/src/index.ts']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
