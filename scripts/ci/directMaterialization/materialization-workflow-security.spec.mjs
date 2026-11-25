/** Lightweight, dependency-free regression checks for six default-branch PR commands.
 * These inspect workflow authorization boundaries; they do not replace runtime
 * author/branch-lease, manifest hash, or Git transaction integration tests.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { analyze as analyzeLesson } from '../lessonMaterialization/lesson-typed-materialization.mjs';

const flows = [
  ['course-typed-materialization.yml', '/course materialize', 'resolve', 'analyze', 'publish'],
  ['lesson-materialization.yml', '/lesson materialize', 'typed-resolve', 'typed-analyze', 'typed-publish'],
  ['episode-materialization.yml', '/episode materialize', 'resolve', 'analyze', 'publish'],
  ['bank-materialization.yml', '/questions materialize', 'typed_resolve', 'typed_analyze', 'typed_publish'],
  ['bank-materialization.yml', '/flashcards materialize', 'typed_resolve', 'typed_analyze', 'typed_publish'],
  ['assessment-materialization.yml', '/assessment materialize', 'resolve', 'analyze', 'publish'],
];

function splitJobs(source) {
  const start = source.indexOf('\njobs:\n');
  assert.notEqual(start, -1, 'workflow must define jobs');
  const body = source.slice(start + 1);
  const found = [...body.matchAll(/^  ([A-Za-z_][A-Za-z0-9_-]*):\s*$/gm)];
  const jobs = new Map();
  for (let index = 0; index < found.length; index++) {
    const current = found[index];
    jobs.set(current[1], body.slice(current.index, found[index + 1]?.index));
  }
  return jobs;
}

for (const [filename, command, resolver, analyzer, publisher] of flows) {
  test(command + ' retains trusted resolve/analyze/publish permission boundary', () => {
    const source = readFileSync(new URL('../../../.github/workflows/' + filename, import.meta.url), 'utf8');
    const jobs = splitJobs(source);
    const resolve = jobs.get(resolver);
    const analyze = jobs.get(analyzer);
    const publish = jobs.get(publisher);
    assert(resolve && analyze && publish, filename + ': missing production phase');

    assert.match(source, /^on:\n  issue_comment:\n    types: \[created\]/m);
    assert.match(source, /^  workflow_dispatch:\n    inputs:/m);
    assert.match(source, /^permissions: \{\}/m);
    assert.match(resolve, /github\.ref == format\('refs\/heads\/\{0\}', github\.event\.repository\.default_branch\)/);
    assert(resolve.includes("github.event.comment.body == '" + command + "'"), command + ': command routing');
    assert(resolve.includes('GH_TOKEN: $' + '{{ github.token }}'), 'only resolver needs a read token');
    assert.match(resolve, /permissions:\n\s*contents: read\n\s*pull-requests: read/);

    assert.match(analyze, /permissions:\n\s*contents: read/);
    assert.doesNotMatch(analyze, /\b(?:GH_TOKEN|GITHUB_TOKEN):\s*/, 'no token in read-only analyzer');
    assert(analyze.includes('upload-artifact@'), 'analyzer must seal a run-scoped artifact');
    assert(
      analyze.includes('ref: $' + '{{ needs.' + resolver + '.outputs.head }}'),
      'analyzer must check out the resolved immutable candidate HEAD',
    );

    assert.match(publish, /permissions:\n\s*contents: write/);
    assert(publish.includes('GH_TOKEN: $' + '{{ github.token }}'), 'only publisher gets write credentials');
    assert(publish.includes('download-artifact@'), 'publisher must consume the sealed analysis artifact');
    for (const job of [resolve, analyze, publish]) {
      assert(job.includes('ref: $' + '{{ github.sha }}'), 'trusted scripts must be pinned to workflow SHA');
      assert(job.includes('persist-credentials: false'), 'do not persist checkout credentials');
    }

    assert(!/prettier\s+--write|format:fix/.test(analyze + publish), 'materializers must not format output');
    assert(publish.includes(' publish'), 'publisher must use trusted publish entrypoint');
  });
}

test('manual dispatch preserves entity-specific input contracts', () => {
  for (const filename of [
    'course-typed-materialization.yml',
    'lesson-materialization.yml',
    'episode-materialization.yml',
    'bank-materialization.yml',
    'assessment-materialization.yml',
  ]) {
    const source = readFileSync(new URL('../../../.github/workflows/' + filename, import.meta.url), 'utf8');
    assert.match(source, /      pr_number:\n\s*description:.*\n\s*type: number\n\s*required: true/);
    if (filename.startsWith('episode') || filename.startsWith('assessment'))
      assert.match(source, /      parent_pr:\n\s*description:.*\n\s*type: number\n\s*required: true/);
    if (filename.startsWith('bank'))
      assert.match(source, /      bank:\n\s*description:.*\n\s*type: choice\n\s*options: \[questions, flashcards\]/);
  }
});

test('Lesson analyzer rejects inherited GitHub credentials before loading pinned data', async () => {
  for (const key of ['GH_TOKEN', 'GITHUB_TOKEN']) {
    const original = process.env[key];
    process.env[key] = 'test-only-sentinel';
    try {
      await assert.rejects(analyzeLesson(undefined, undefined), /Lesson analysis must not receive GitHub credentials/);
    } finally {
      if (original === undefined) delete process.env[key];
      else process.env[key] = original;
    }
  }
});
