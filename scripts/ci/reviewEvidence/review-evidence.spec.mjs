import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReviewEvidence, verifyReviewEvidence } from './review-evidence.mjs';

const head = 'a'.repeat(40);
const blob = 'b'.repeat(40);
const earlier = 'c'.repeat(40);
const earlierBlob = 'd'.repeat(40);
const row = (stage, commit = head, sourceBlob = blob, verdict = 'accepted') =>
  '- Review evidence (v1): ' + stage + ' | ' + verdict + ' | ' + commit + ' | ' + sourceBlob;
const current = { stages: [4], head, blob };

test('accepts a pinned verdict in the entity PR without a reviewer account or context identifier', async () => {
  assert.deepEqual(await verifyReviewEvidence('## Review\n' + row(4), current), [
    { stage: 4, verdict: 'accepted', commit: head, blob },
  ]);
});

test('rejects missing, stale, malformed, duplicate, rejected and contradictory evidence', async () => {
  for (const body of [
    '',
    row(4, earlier),
    row(4, head, earlierBlob),
    row(4, head, blob, 'rejected'),
    row(4) + '\n' + row(4),
    row(4) + '\n' + row(4, head, blob, 'rejected'),
    row(4) + '\n' + row(5),
    row(4).replace('accepted', 'pending'),
    row(4).replace(head, 'not-a-sha'),
  ]) await assert.rejects(verifyReviewEvidence(body, current), /evidence/i);
});

test('Lesson preserves independently reviewed historical revisions and verifies their ancestry', async () => {
  const body = [row(3, earlier, earlierBlob), row(4), row(5)].join('\n');
  const args = {
    stages: [3, 4, 5], head, blob,
    readBlob: async commit => commit === earlier ? earlierBlob : blob,
    isAncestor: async (from, to) => (from === earlier || from === head) && to === head,
  };
  assert.deepEqual((await verifyReviewEvidence(body, args)).map(item => item.stage), [3, 4, 5]);
  await assert.rejects(verifyReviewEvidence(body, { ...args, readBlob: async () => blob }), /historical source blob/);
  await assert.rejects(verifyReviewEvidence(body, { ...args, isAncestor: async () => false }), /ancestry order/);
});

test('Questions N/A decision is distinct from historical Lesson stage evidence', async () => {
  const body = [row(3, earlier, earlierBlob), row('questions-na')].join('\n');
  const args = { stages: ['questions-na'], allowedStages: [3, 4, 5, 'questions-na'], head, blob };
  assert.equal((await verifyReviewEvidence(body, args))[0].stage, 'questions-na');
  await assert.rejects(verifyReviewEvidence(row(3), args), /Missing accepted/);
  await assert.rejects(verifyReviewEvidence(body + '\n' + row('questions-na'), args), /duplicate/);
  assert.throws(() => parseReviewEvidence(row(4), [4, 5]), /Missing accepted/);
});
