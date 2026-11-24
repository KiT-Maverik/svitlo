import test from 'node:test';
import assert from 'node:assert/strict';
import { mayReuse } from './required-check-reuse.mjs';

const sha = 'a'.repeat(40), repository = 'owner/repo', name = 'FastGate / verify';
const event = { action: 'edited', changes: { body: { from: 'old' } }, pull_request: { number: 7, draft: false, head: { repo: { full_name: repository } } } };
const run = { name, head_sha: sha, app: { slug: 'github-actions' }, status: 'completed', conclusion: 'success', details_url: 'https://github.com/owner/repo/actions/runs/10/job/1', pull_requests: [{ number: 7 }] };
const options = { name, sha, repository, runId: '11' };
test('reuses only a successful exact-merge check for description edits', () => {
  assert.equal(mayReuse(event, [run], options), true);
  for (const changed of [
    { ...event, action: 'synchronize' },
    { ...event, action: 'ready_for_review' },
    { ...event, changes: { base: { ref: { from: 'develop' } } } },
    { ...event, pull_request: { ...event.pull_request, draft: true } },
  ]) assert.equal(mayReuse(changed, [run], options), false);
  for (const altered of [
    { conclusion: 'failure' }, { conclusion: 'skipped' }, { status: 'in_progress' },
    { head_sha: 'b'.repeat(40) }, { pull_requests: [{ number: 8 }] },
    { app: { slug: 'other' } }, { details_url: 'https://github.com/owner/repo/actions/runs/11/job/1' },
  ]) assert.equal(mayReuse(event, [{ ...run, ...altered }], options), false);
});
