import test from 'node:test';
import assert from 'node:assert/strict';
import { mayReuse, validationScope } from './required-check-reuse.mjs';

const sha = 'a'.repeat(40);
const head = 'b'.repeat(40);
const base = 'c'.repeat(40);
const repository = 'owner/repo';
for (const [name, path, target, source] of [
  ['FastGate / verify', '.github/workflows/fast-gate.yml', 'develop', 'feature/test'],
  ['Production Quality / verify', '.github/workflows/production-quality.yml', 'main', 'develop'],
]) {
  const event = {
    action: 'edited',
    changes: { body: { from: 'old' } },
    pull_request: {
      number: 7,
      state: 'open',
      draft: false,
      head: { ref: source, sha: head, repo: { full_name: repository } },
      base: { ref: target, sha: base, repo: { full_name: repository } },
    },
  };
  const options = { name, sha, repository, runId: '13', runAttempt: '1' };
  const scope = validationScope(event, options);
  assert.ok(scope);
  const check = (id, conclusion = 'success', extra = {}) => ({
    name,
    head_sha: head,
    app: { slug: 'github-actions' },
    status: 'completed',
    conclusion,
    started_at: '2026-11-24T10:00:' + id + 'Z',
    completed_at: '2026-11-24T10:01:00Z',
    details_url: 'https://github.com/owner/repo/actions/runs/' + id + '/job/' + id,
    pull_requests: [{ number: 7 }],
    ...extra,
  });
  const read = async route => {
    const id = Number(route.split('/').at(-1));
    return route.startsWith('actions/jobs/')
      ? {
          id,
          run_id: id,
          name,
          status: 'completed',
          conclusion: 'success',
          run_attempt: 1,
          steps: [{ name: scope, conclusion: 'success' }],
        }
      : { id, path, event: 'pull_request', head_sha: head, status: 'completed', conclusion: 'success', run_attempt: 1 };
  };
  const reuse = (runs, input = event, opts = options, lookup = read) => mayReuse(input, runs, opts, lookup);

  test(name + ': newest exact Ready success only, independent of check order', async () => {
    assert.equal(await reuse([check(10, 'failure'), check(12)]), true);
    assert.equal(await reuse([check(12), check(10, 'failure')]), true);
    assert.equal(await reuse([check(12), check(13, null, { status: 'in_progress' })]), true);
    for (const conclusion of ['failure', 'cancelled', 'skipped', 'neutral', 'timed_out', 'action_required'])
      assert.equal(await reuse([check(10), check(12, conclusion)]), false);
    assert.equal(await reuse([check(10), check(12, null, { status: 'queued', started_at: null })]), false);
    assert.equal(await reuse([check(10), check(12, null, { status: 'in_progress' })]), false);
    assert.equal(await reuse([check(10), check(12, 'failure', { started_at: check(10).started_at })]), false);
    assert.equal(await reuse([]), false);
    assert.equal(await reuse([check(10, 'success', { pull_requests: [] })]), false);
    assert.equal(await reuse([check(10, 'success', { head_sha: 'd'.repeat(40) })]), false);
  });

  test(
    name + ': retarget, Ready transition, changed refs, Draft, stale or missing scope run normal validation',
    async () => {
      for (const changed of [
        { ...event, action: 'synchronize' },
        { ...event, action: 'ready_for_review' },
        { ...event, action: 'reopened' },
        { ...event, changes: { body: {}, base: { ref: { from: 'other' } } } },
        { ...event, changes: { title: { from: 'old title' } } },
        { ...event, pull_request: { ...event.pull_request, draft: true } },
        {
          ...event,
          pull_request: { ...event.pull_request, base: { ...event.pull_request.base, sha: 'd'.repeat(40) } },
        },
        { ...event, pull_request: { ...event.pull_request, base: { ...event.pull_request.base, ref: 'other' } } },
        {
          ...event,
          pull_request: { ...event.pull_request, head: { ...event.pull_request.head, sha: 'd'.repeat(40) } },
        },
        { ...event, pull_request: { ...event.pull_request, head: { ...event.pull_request.head, ref: 'other' } } },
      ])
        assert.equal(await reuse([check(12)], changed), false);
      assert.equal(await reuse([check(12)], event, { ...options, runAttempt: '2' }), false);
      assert.equal(await reuse([check(12)], event, { ...options, sha: 'e'.repeat(40) }), false);
      assert.equal(
        await reuse([check(12)], event, options, async () => {
          throw Error('API unavailable');
        }),
        false,
      );
      for (const alteration of [
        { steps: [] },
        { steps: [{ name: scope, conclusion: 'skipped' }] },
        { run_attempt: 2 },
        { conclusion: 'failure' },
      ])
        assert.equal(
          await reuse([check(12)], event, options, async route =>
            route.startsWith('actions/jobs/') ? { ...(await read(route)), ...alteration } : read(route),
          ),
          false,
        );
      for (const alteration of [
        { event: 'workflow_dispatch' },
        { path: '.github/workflows/other.yml' },
        { conclusion: 'failure' },
      ])
        assert.equal(
          await reuse([check(12)], event, options, async route =>
            route.startsWith('actions/runs/') ? { ...(await read(route)), ...alteration } : read(route),
          ),
          false,
        );
    },
  );
}
