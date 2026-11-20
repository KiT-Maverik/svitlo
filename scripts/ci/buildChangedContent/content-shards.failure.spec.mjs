import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const moduleUrl = new URL('./content-shards.mjs', import.meta.url).href;

test('a real subprocess failure returns nonzero, annotates the book and still runs other books', () => {
  // Deliberately fail only the middle child. Keep this isolated from actual
  // textbook content, release branches and GitHub job failure statuses.
  const childScript = [
    `import { runContentShard } from ${JSON.stringify(moduleUrl)};`,
    "import { spawnSync } from 'node:child_process';",
    "const books = ['content/art', 'content/history', 'content/math'].map(path => ({ path, kind: 'content' }));",
    "const launch = (_command, args) => {",
    "  const path = args[args.indexOf('--package') + 1];",
    "  return spawnSync(process.execPath, ['-e', path === 'content/history' ? 'process.exit(17)' : 'process.exit(0)'], { stdio: 'pipe' });",
    "};",
    "const failed = runContentShard(books, launch);",
    "process.exitCode = failed.length === 1 && failed[0] === 'content/history' ? 1 : 99;",
  ].join('\n');
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', childScript], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /::error title=content\/history::Content verification failed/);
  assert.match(result.stderr, /Failed content packages: content\/history/);
  assert.doesNotMatch(result.stderr, /::error title=content\/math::/);
  assert.deepEqual(
    [...result.stdout.matchAll(/::group::Content package (content\/[^\n]+)/g)].map(match => match[1]),
    ['content/art', 'content/history', 'content/math'],
  );
  assert.equal((result.stdout.match(/::endgroup::/g) || []).length, 3);
});

test('a successful shard exits zero and reports every textbook', () => {
  const childScript = [
    `import { runContentShard } from ${JSON.stringify(moduleUrl)};`,
    "const books = ['content/art', 'content/math'].map(path => ({ path, kind: 'content' }));",
    "const failed = runContentShard(books, () => ({ status: 0 }));",
    "process.exitCode = failed.length ? 99 : 0;",
  ].join('\n');
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', childScript], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Verified 2 content packages in this shard/);
});
