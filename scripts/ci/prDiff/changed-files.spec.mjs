import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { changedFiles } from './changed-files.mjs';

test('merge-base diff excludes base-only files and preserves renamed/deleted PR paths', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'svitlo-pr-diff-'));
  const git = (...args) =>
    execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: 'CI',
        GIT_AUTHOR_EMAIL: 'ci@example.test',
        GIT_COMMITTER_NAME: 'CI',
        GIT_COMMITTER_EMAIL: 'ci@example.test',
      },
    }).trim();
  try {
    git('init', '-b', 'develop');
    writeFileSync(join(cwd, 'removed.ts'), 'old\n');
    writeFileSync(join(cwd, 'renamed.ts'), 'rename\n');
    git('add', '.');
    git('commit', '-m', 'common ancestor');
    const common = git('rev-parse', 'HEAD');
    git('checkout', '-b', 'feature', common);
    writeFileSync(join(cwd, 'feature.ts'), 'added\n');
    renameSync(join(cwd, 'renamed.ts'), join(cwd, 'new-name.ts'));
    git('rm', 'removed.ts');
    git('add', '.');
    git('commit', '-m', 'feature changes');
    const head = git('rev-parse', 'HEAD');
    git('checkout', 'develop');
    writeFileSync(join(cwd, 'only-on-base.ts'), 'not in PR\n');
    git('add', '.');
    git('commit', '-m', 'base advances');
    const base = git('rev-parse', 'HEAD');
    assert.deepEqual(changedFiles(base, head, cwd).sort(), ['feature.ts', 'new-name.ts', 'removed.ts', 'renamed.ts']);
    assert.ok(git('diff', '--name-only', base, head).includes('only-on-base.ts'));
    git('merge', '--no-ff', 'feature', '-m', 'merge feature');
    const merged = git('rev-parse', 'HEAD');
    assert.deepEqual(changedFiles(common, merged, cwd).sort(), [
      'feature.ts',
      'new-name.ts',
      'only-on-base.ts',
      'removed.ts',
      'renamed.ts',
    ]);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test('invalid commit IDs are rejected before running Git', () => {
  assert.throws(() => changedFiles('not-sha', 'a'.repeat(40)), /40-character SHA/);
});
