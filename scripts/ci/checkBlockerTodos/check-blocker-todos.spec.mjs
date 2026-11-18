import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';
import { scanDiff, scanFull, main } from './check-blocker-todos.mjs';

const blocker = '// ' + 'TODO (BLOCKER): Complete translations';
const ordinary = '// TODO: Refactor later';
const asset = '// TODO(asset): Replace file';

function git(root, ...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function withRepo(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-blockers-'));
  try {
    git(root, 'init', '-q');
    git(root, 'config', 'user.name', 'Test');
    git(root, 'config', 'user.email', 'test@example.test');
    const put = (file, content) => {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), content);
    };
    const commit = () => {
      git(root, 'add', '-A');
      git(root, 'commit', '-qm', 'Fixture');
      return git(root, 'rev-parse', 'HEAD');
    };
    run({ root, put, commit, git: (...args) => git(root, ...args) });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('full scans tracked source and ignores ordinary TODOs, documentation and untracked files', () => {
  withRepo(({ root, put, commit }) => {
    put('content/math/constants.ts', "export const languages = ['en'];\n" + blocker + '\n');
    put('content/math/ordinary.ts', ordinary + '\n' + asset + '\n');
    put('README.md', blocker + '\n');
    commit();
    put('content/math/untracked.ts', blocker + '\n');
    assert.deepEqual(scanFull(root), [
      { file: 'content/math/constants.ts', line: 2, text: blocker },
    ]);
  });
});

test('diff ignores inherited blockers in touched files', () => {
  withRepo(({ root, put, commit }) => {
    put('content/astronomy/constants.ts', blocker + '\nexport const n = 1;\n');
    const base = commit();
    put('content/astronomy/constants.ts', blocker + '\nexport const n = 2;\n' + ordinary + '\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), []);
    assert.deepEqual(scanFull(root), [
      { file: 'content/astronomy/constants.ts', line: 1, text: blocker },
    ]);
  });
});

test('diff catches added blockers and reports actual new line numbers', () => {
  withRepo(({ root, put, commit }) => {
    put('content/astronomy/constants.ts', 'const value = 1;\n');
    const base = commit();
    put('content/astronomy/constants.ts', 'const value = 1;\n' + ordinary + '\n' + blocker + '\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), [
      { file: 'content/astronomy/constants.ts', line: 3, text: blocker },
    ]);
    assert.throws(() => main(['diff', base, head], root), /unresolved TODO/);
  });
});

test('new YAML comments are caught; Markdown and nonblocking markers are ignored', () => {
  withRepo(({ root, put, commit }) => {
    put('initial.ts', ordinary + '\n');
    const base = commit();
    const yamlBlocker = '# ' + 'TODO (BLOCKER): Provide locale';
    put('lesson.yaml', yamlBlocker + '\n');
    put('notes.md', blocker + '\n');
    put('new.ts', ordinary + '\n' + asset + '\n');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), [
      { file: 'lesson.yaml', line: 1, text: yamlBlocker },
    ]);
  });
});

test('renaming an unchanged file with an inherited blocker is not a new blocker', () => {
  withRepo(({ root, put, commit, git }) => {
    put('old.ts', blocker + '\n');
    const base = commit();
    git('mv', 'old.ts', 'new.ts');
    const head = commit();
    assert.deepEqual(scanDiff(root, base, head), []);
  });
});

test('the canonical marker includes a space and source comments', () => {
  withRepo(({ root, put, commit }) => {
    put('source.ts', [
      '// TODO(BLOCKER): no space is not canonical',
      '// TODO (BLOCKER): yes',
      'const quoted = "' + blocker + '";',
      '/* TODO (BLOCKER): block comment */',
      '{/* TODO (BLOCKER): JSX comment */}',
    ].join('\n'));
    commit();
    assert.deepEqual(scanFull(root).map(item => item.line), [2, 4, 5]);
  });
});

test('CLI rejects invalid modes and shorthand commit refs', () => {
  assert.throws(() => main([]), /Usage/);
  assert.throws(() => main(['full', 'extra']), /Usage/);
  assert.throws(() => scanDiff('.', 'main', 'HEAD'), /40-character/);
});
