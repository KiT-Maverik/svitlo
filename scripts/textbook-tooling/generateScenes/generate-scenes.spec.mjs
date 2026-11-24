import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { syncSceneRegistry } from './generate-scenes.mjs';

const cli = fileURLToPath(new URL('./generate-scenes.mjs', import.meta.url));
const alpha = '11111111-1111-4111-8111-11111111111a';
const beta = '22222222-2222-4222-8222-22222222222b';
const gamma = '33333333-3333-4333-8333-33333333333c';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-scene-registry-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const loader = join(root, 'scenes/sceneLoader.ts');
  const add = (bucket, id) => {
    const index = join(root, 'scenes', bucket, id, 'index.ts');
    mkdirSync(dirname(index), { recursive: true });
    writeFileSync(index, 'export default () => null;\n');
  };
  add('a', alpha);
  add('b', beta);
  return { root, loader, add };
}

test('generates stable, statically analyzable and lazy Scene imports', async t => {
  const { root, loader } = fixture(t);
  assert.equal(await syncSceneRegistry(root, '--write', '@svitlo/example'), 2);
  const source = readFileSync(loader, 'utf8');
  assert.match(source, new RegExp(`import\\(["']\\./a/${alpha}["']\\)`));
  assert.match(source, new RegExp(`import\\(["']\\./b/${beta}["']\\)`));
  assert.match(source, /from ["']\.\/createSceneRegistry["']/);
  assert.match(source, /export const preloadScene/);
  assert.match(source, /export const resolveScene/);
  assert(source.indexOf(alpha) < source.indexOf(beta));
  await syncSceneRegistry(root, '--check', '@svitlo/example');
  assert.equal(readFileSync(loader, 'utf8'), source);
});

test('stale generated registry fails check without being rewritten', async t => {
  const { root, loader, add } = fixture(t);
  await syncSceneRegistry(root, '--write', '@svitlo/example');
  const previous = readFileSync(loader, 'utf8');
  add('c', gamma);
  await assert.rejects(
    syncSceneRegistry(root, '--check', '@svitlo/example'),
    /Stale Scene registry; run npm run content:generate:scenes --workspace @svitlo\/example/,
  );
  assert.equal(readFileSync(loader, 'utf8'), previous);
  await syncSceneRegistry(root, '--write', '@svitlo/example');
  assert.match(readFileSync(loader, 'utf8'), new RegExp(gamma));
});

test('rejects noncanonical Scene paths and missing modules', async t => {
  const { root, add } = fixture(t);
  add('c', alpha);
  await assert.rejects(syncSceneRegistry(root, '--write'), /Scene directory must match UUID path/);
  rmSync(join(root, 'scenes/c'), { recursive: true });
  add('c', 'named-scene');
  await assert.rejects(syncSceneRegistry(root, '--write'), /canonical UUID entity ID/);
  rmSync(join(root, 'scenes/c'), { recursive: true });
  add('y', gamma);
  await assert.rejects(syncSceneRegistry(root, '--write'), /Invalid Scene bucket/);
  rmSync(join(root, 'scenes/y'), { recursive: true });
  rmSync(join(root, 'scenes/a', alpha, 'index.ts'));
  await assert.rejects(syncSceneRegistry(root, '--write'), /ENOENT/);
});

test('rejects missing Scenes and unsupported modes', async t => {
  const { root } = fixture(t);
  await assert.rejects(syncSceneRegistry(root, '--unexpected'), /Usage: generate-scenes\.mjs/);
  rmSync(join(root, 'scenes'), { recursive: true });
  mkdirSync(join(root, 'scenes'), { recursive: true });
  await assert.rejects(syncSceneRegistry(root, '--write'), /unique authored Scene directories/);
});

test('CLI refuses invocation outside a textbook workspace', () => {
  const result = spawnSync(process.execPath, [cli, '--check'], {
    cwd: dirname(dirname(dirname(dirname(cli)))),
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Run Scene generation from a content textbook workspace/);
});

test('Stage 6.1 Scene draft UUIDs remain absent from lazy registry until Stage 6.3 approval', async t => {
  const { root, loader, add } = fixture(t);
  const draftIndex = join(root, 'scenes/c', gamma, 'index.ts');
  add('c', gamma);
  writeFileSync(
    draftIndex,
    [
      '// TODO (BLOCKER): Register this Scene UUID only after the implementation, tests and review are complete.',
      "export { ChooseColors as default } from './ChooseColors';",
      '',
    ].join('\n'),
  );
  assert.equal(await syncSceneRegistry(root, '--write', '@svitlo/example'), 2);
  let source = readFileSync(loader, 'utf8');
  assert.doesNotMatch(source, new RegExp(gamma));
  assert.match(source, new RegExp(alpha));
  assert.match(source, new RegExp(beta));
  assert.equal(await syncSceneRegistry(root, '--check', '@svitlo/example'), 2);
  writeFileSync(draftIndex, "export { ChooseColors as default } from './ChooseColors';\n");
  await assert.rejects(syncSceneRegistry(root, '--check', '@svitlo/example'), /Stale Scene registry/);
  assert.equal(await syncSceneRegistry(root, '--write', '@svitlo/example'), 3);
  source = readFileSync(loader, 'utf8');
  assert.match(source, new RegExp(gamma));
});

test('all-pending Scene inventory yields an empty but valid nonregistering loader', async t => {
  const { root, loader } = fixture(t);
  for (const id of [alpha, beta]) {
    writeFileSync(
      join(root, 'scenes', id.at(-1), id, 'index.ts'),
      '// TODO (BLOCKER): Register this Scene UUID only after the implementation, tests and review are complete.\n' +
        'export default () => null;\n',
    );
  }
  assert.equal(await syncSceneRegistry(root, '--write', '@svitlo/example'), 0);
  const output = readFileSync(loader, 'utf8');
  assert.doesNotMatch(output, new RegExp(alpha + '|' + beta));
  assert.match(output, /const sceneImports/);
  await syncSceneRegistry(root, '--check', '@svitlo/example');
});
