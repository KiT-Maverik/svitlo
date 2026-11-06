import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const script = fileURLToPath(new URL('./check-built-package-exports.mjs', import.meta.url));

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-scoped-artifacts-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const resource = 'data/pages/skillAnalytics/en.json';

  for (const name of ['math', 'art']) {
    const path = join(root, 'content', name);
    for (const file of ['dist/textbook/index.js', 'dist/textbook/index.d.ts', 'dist/publish.mjs', 'dist/static/' + resource]) {
      const target = join(path, file);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, file.endsWith('.json') ? '{"domains":[]}\n' : '');
    }
    writeFileSync(
      join(path, 'dist/manifest.json'),
      JSON.stringify({ version: 1, textbook: name, files: [resource] }),
    );
    writeFileSync(
      join(path, 'package.json'),
      JSON.stringify({
        name: '@svitlo/' + name,
        bin: { ['svitlo-' + name]: './dist/publish.mjs' },
        exports: { '.': { default: './dist/textbook/index.js', types: './dist/textbook/index.d.ts' } },
      }),
    );
  }
  return args => spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: 'utf8' });
}

test('checks only requested built workspaces, without depending on unbuilt textbooks', t => {
  const run = fixture(t);
  const result = run(['--packages', 'content/math', 'content/art']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /across 2 workspaces/);
});

test('keeps the no-argument global check strict over all known workspaces', t => {
  const run = fixture(t);
  const result = run([]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ENOENT/);
});

test('rejects unknown and repeated workspace names instead of silently skipping checks', t => {
  const run = fixture(t);
  for (const args of [
    ['--packages'],
    ['--packages', '../outside'],
    ['--packages', 'content/math', 'content/math'],
    ['--unknown', 'content/math'],
  ]) {
    const result = run(args);
    assert.notEqual(result.status, 0, args.join(' '));
    assert.match(result.stderr, /Usage:|Unknown workspace|Duplicate workspace/);
  }
});

test('a missing built artifact in the selected workspace fails the scoped check', t => {
  const run = fixture(t);
  // The fixture intentionally has no @svitlo/physics files.
  const result = run(['--packages', 'content/physics']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ENOENT/);
});
