import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { changedPublicContracts, publicModules, publicSignature } from './public-contract-impact.mjs';

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

test('published signatures traverse local imports referenced by exported declarations', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-public-types-'));
  const dir = join(root, 'shared/demo/src');
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.ts'), "export * from './api';\n");
    writeFileSync(
      join(dir, 'api.ts'),
      "import type { Contract } from './types';\nimport { helper } from './private';\nexport type API = Contract;\nfunction internal() { return helper(); }\n",
    );
    writeFileSync(join(dir, 'types.ts'), 'export interface Contract { value: string }\n');
    writeFileSync(join(dir, 'private.ts'), 'export const helper = () => 1;\n');
    const pkg = { path: 'shared/demo', exports: { '.': { types: './dist/src/index.d.ts' } } };
    assert.deepEqual([...publicModules(pkg, root)].sort(), [
      'shared/demo/src/api.ts',
      'shared/demo/src/index.ts',
      'shared/demo/src/types.ts',
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('only exported modules reachable from package manifest are public', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-export-'));
  try {
    mkdirSync(join(root, 'shared/demo/src'), { recursive: true });
    writeFileSync(join(root, 'shared/demo/src/index.ts'), "export * from './api';\n");
    writeFileSync(join(root, 'shared/demo/src/api.ts'), 'export type Contract = string;\n');
    writeFileSync(join(root, 'shared/demo/src/private.ts'), 'export type Private = string;\n');
    const pkg = { path: 'shared/demo', exports: { '.': { types: './dist/src/index.d.ts' } } };
    assert.deepEqual([...publicModules(pkg, root)].sort(), ['shared/demo/src/api.ts', 'shared/demo/src/index.ts']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('a real git history distinguishes private edits from a changed re-exported API', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-api-diff-'));
  const packageRoot = join(root, 'shared/demo/src');
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: 'CI',
        GIT_AUTHOR_EMAIL: 'ci@example.test',
        GIT_COMMITTER_NAME: 'CI',
        GIT_COMMITTER_EMAIL: 'ci@example.test',
      },
    }).trim();
  const pkg = { path: 'shared/demo', name: '@svitlo/demo', exports: { '.': { types: './dist/src/index.d.ts' } } };
  try {
    mkdirSync(packageRoot, { recursive: true });
    git('init', '-b', 'develop');
    writeFileSync(join(packageRoot, 'index.ts'), "export * from './api';\n");
    const file = join(packageRoot, 'api.ts');
    writeFileSync(file, 'export interface Contract { id: string }\nexport function read(): number { return 1; }\n');
    writeFileSync(join(packageRoot, 'internal.ts'), 'export const internal = 1;\n');
    git('add', '.');
    git('commit', '-m', 'initial API');
    const base = git('rev-parse', 'HEAD');
    git('checkout', '-b', 'feature');
    writeFileSync(file, 'export interface Contract { id: string }\nexport function read(): number { return 2; }\n');
    git('add', '.');
    git('commit', '-m', 'private implementation only');
    const privateHead = git('rev-parse', 'HEAD');
    assert.deepEqual(changedPublicContracts(['shared/demo/src/api.ts'], [pkg], base, privateHead, root), []);
    writeFileSync(file, 'export interface Contract { id: number }\nexport function read(): number { return 2; }\n');
    writeFileSync(join(packageRoot, 'internal.ts'), 'export const internal = 2;\n');
    git('add', '.');
    git('commit', '-m', 'public contract and unrelated private file');
    const publicHead = git('rev-parse', 'HEAD');
    assert.deepEqual(
      changedPublicContracts(['shared/demo/src/api.ts', 'shared/demo/src/internal.ts'], [pkg], base, publicHead, root),
      ['shared/demo/src/api.ts'],
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
