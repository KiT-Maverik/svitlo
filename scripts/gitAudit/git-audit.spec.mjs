import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./git-audit.mjs', import.meta.url));
const run = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

test('audits complete HEAD and historical-only blobs without changing refs or files', () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-git-audit-'));
  const repo = join(root, 'repo');
  const output = join(root, 'reports');
  try {
    mkdirSync(repo);
    run(repo, 'init', '-q', '-b', 'main');
    run(repo, 'remote', 'add', 'origin', 'https://github.com/example/repo.git');
    const commit = message => {
      run(repo, 'add', '-A');
      run(repo, '-c', 'user.email=test@example.org', '-c', 'user.name=Audit Test', 'commit', '-qm', message);
    };
    mkdirSync(join(repo, 'content'));
    writeFileSync(join(repo, 'content', 'lesson.md'), 'first iteration\n');
    commit('initial');
    writeFileSync(join(repo, 'content', 'lesson.md'), 'revised lesson\n');
    writeFileSync(join(repo, 'content', 'new lesson.md'), 'new lesson\n');
    commit('revision');
    const head = run(repo, 'rev-parse', 'HEAD');
    writeFileSync(join(repo, 'untracked.txt'), 'ignored by audit\n');

    execFileSync(process.execPath, [script, '--repo', repo, '--output', output], { encoding: 'utf8' });
    const data = JSON.parse(readFileSync(join(output, 'git-audit.json'), 'utf8'));
    const markdown = readFileSync(join(output, 'git-audit.md'), 'utf8');
    assert.equal(data.source.head, head);
    assert.equal(data.totals.head_commits, 2);
    assert.equal(data.totals.current_files, 2);
    assert.equal(data.totals.historical_only_blobs, 1);
    assert.ok(data.totals.historical_only_raw_bytes > 0);
    assert.equal(data.current.directories[0].name, 'content');
    assert.equal(data.trend.reduce((count, month) => count + month.first_parent_commits, 0), 2);
    assert.match(markdown, /Largest blobs absent from current HEAD/);
    assert.equal(run(repo, 'rev-parse', 'HEAD'), head);
    assert.equal(run(repo, 'status', '--short'), '?? untracked.txt');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
