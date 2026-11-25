import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  assertBankOrder,
  authoredBankLiteral,
  gitBlobSha,
  preflightBankSource,
  type BankSourceSnapshot,
} from './bankSourceSafety';

const editor = 'export const bank = { reviewed: true };\n';
const stage = { path: 'questions/index.ts', content: 'export const questions = {};\n', kind: 'typescript' as const };
const draft = { ...stage, path: 'questions/draft.ts', content: editor };
const head = 'b'.repeat(40);
const snapshot = (entries: BankSourceSnapshot['entries']): BankSourceSnapshot => ({
  complete: true,
  expectedHeadSha: head,
  observedHeadSha: head,
  entries,
});
const source = snapshot({ questions: { kind: 'directory' }, [draft.path]: { kind: 'file', content: editor } });
const pinned = {
  blobSha: gitBlobSha(editor),
  inputSha256: 'a'.repeat(64),
  content: editor,
  commitSha: head,
};
const transition = { indexPath: stage.path, draftPath: draft.path, source: pinned };

test('Approved draft deletion and index creation are deterministic', () => {
  const result = preflightBankSource([stage], source, transition);
  assert.equal(result.transition?.sourceDraftPath, draft.path);
  assert.equal(result.transition?.sourceDraftBlobSha, gitBlobSha(editor));
  assert.equal(result.transition?.materializedPath, stage.path);
  assert.deepEqual(result.files, [stage]);
  assert.equal(result.publishable, false);
});
test('Reject stale reviews, missing or edited drafts, collisions and partial transitions', () => {
  assert.throws(
    () => preflightBankSource([stage], { ...source, observedHeadSha: 'c'.repeat(40) }, transition),
    /Stale PR HEAD/,
  );
  assert.throws(
    () =>
      preflightBankSource([stage], source, {
        ...transition,
        source: { ...pinned, commitSha: 'c'.repeat(40) },
      }),
    /pinned bytes/,
  );
  assert.throws(
    () =>
      preflightBankSource([stage], source, {
        ...transition,
        source: { ...pinned, blobSha: 'c'.repeat(40) },
      }),
    /pinned bytes/,
  );
  assert.throws(() => preflightBankSource([stage], snapshot({}), transition), /missing/);
  assert.throws(
    () => preflightBankSource([stage], snapshot({ [draft.path]: { kind: 'file', content: 'edited' } }), transition),
    /hand-edited/,
  );
  assert.throws(
    () =>
      preflightBankSource(
        [stage],
        snapshot({ ...source.entries, [stage.path]: { kind: 'file', content: stage.content } }),
        transition,
      ),
    /already exists/,
  );
  assert.throws(() => preflightBankSource([draft], source, transition), /already exists|Canonical/);
  assert.throws(() => preflightBankSource([stage, stage], source, transition), /Duplicate/);
  assert.throws(() => preflightBankSource([{ ...stage, path: '../escape.ts' }], source, transition), /Unsafe/);
  assert.throws(
    () => preflightBankSource([stage], snapshot({ questions: { kind: 'symlink' } }), transition),
    /symlink/,
  );
  assert.throws(
    () => preflightBankSource([stage], { ...source, complete: false as true }, transition),
    /complete Git tree/,
  );
});
test('Stage 1 draft handoff is idempotent but cannot overwrite editorial or materialized source', () => {
  assert.doesNotThrow(() => preflightBankSource([draft], source));
  assert.throws(() => preflightBankSource([{ ...draft, content: 'edited' }], source), /Divergent/);
  assert.throws(
    () => preflightBankSource([draft], snapshot({ [stage.path]: { kind: 'file', content: stage.content } })),
    /Materialized bank/,
  );
});

test('Editor literals and keyed order reject opaque values and collisions', () => {
  assert.deepEqual(JSON.parse(authoredBankLiteral({ source: 'Українська', items: [1, 2] })), {
    source: 'Українська',
    items: [1, 2],
  });
  assert.throws(() => authoredBankLiteral({ incorrect: undefined }), /unsupported editor value/);
  assert.throws(() => authoredBankLiteral({ incorrect: () => {} }), /unsupported editor value/);
  assert.throws(() => assertBankOrder({ first: 1, second: 2 }, ['first', 'first'], 'bank', true), /once/);
  assert.throws(() => assertBankOrder({}, [], 'bank', true), /empty/);
});
