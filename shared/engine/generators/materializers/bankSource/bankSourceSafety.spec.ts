import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  assertBankOrder, authoredBankLiteral, gitBlobSha, preflightBankSource,
  type BankSourceSnapshot, type BankSourceFile,
} from './bankSourceSafety';

const editor = 'export const bank = { reviewed: true };\n';
const finalSource = 'export const questions = {};\n';
const reviewed = {
  approved: true as const,
  reviewer: 'Independent reviewer',
  blobSha: gitBlobSha(editor),
  reviewedSourceBlobSha: gitBlobSha(editor),
  content: editor,
  reviewCommitSha: 'a'.repeat(40),
};
const stage = { path: 'questions/index.ts', content: finalSource, kind: 'typescript' as const };
const archived = { path: 'questions.reviewed-stage3.ts.txt', content: editor, kind: 'archive' as const };
const snapshot = (entries: BankSourceSnapshot['entries']): BankSourceSnapshot => ({
  complete: true, expectedHeadSha: 'b'.repeat(40), observedHeadSha: 'b'.repeat(40),
  entries,
});
const source = snapshot({
  questions: { kind: 'directory' },
  'questions/index.ts': { kind: 'file', content: editor },
});
const transition = {
  indexPath: stage.path,
  archivePath: archived.path,
  reviewed,
};

test('Reviewed Stage 3 transition preserves exact approved bytes and is deterministic', () => {
  const files: BankSourceFile[] = [stage, archived];
  const first = preflightBankSource(files, source, transition);
  const second = preflightBankSource([...files].reverse(), source, transition);
  assert.deepEqual(first, second);
  assert.equal(first.publishable, false);
  assert.equal(first.transition?.reviewedIndexBlobSha, gitBlobSha(editor));
  assert.deepEqual(first.files.map(file => file.path), [
    'questions.reviewed-stage3.ts.txt', 'questions/index.ts',
  ]);
});
test('Approved transition supports byte-identical rerun but rejects partial replacement', () => {
  const done = snapshot({
    questions: { kind: 'directory' },
    'questions/index.ts': { kind: 'file', content: finalSource },
    'questions.reviewed-stage3.ts.txt': { kind: 'file', content: editor },
  });
  assert.doesNotThrow(() => preflightBankSource([stage, archived], done, transition));
  const partial = snapshot({
    questions: { kind: 'directory' },
    'questions/index.ts': { kind: 'file', content: finalSource },
  });
  assert.throws(() => preflightBankSource([stage, archived], partial, transition), /Partial transition/);
});
test('Reject stale HEAD, source review mismatch, manual edits and missing archive', () => {
  assert.throws(() => preflightBankSource([stage, archived], {
    ...source, observedHeadSha: 'c'.repeat(40),
  }, transition), /Stale PR HEAD/);
  assert.throws(() => preflightBankSource([stage, archived], source, {
    ...transition, reviewed: { ...reviewed, reviewedSourceBlobSha: 'c'.repeat(40) },
  }), /differs from independently approved/);
  assert.throws(() => preflightBankSource([stage, archived], snapshot({
    questions: { kind: 'directory' },
    'questions/index.ts': { kind: 'file', content: '// human edits\n' },
  }), transition), /Stale, missing or hand-edited/);
  assert.throws(() => preflightBankSource([stage], source, transition), /archive\/index/);
  assert.throws(() => preflightBankSource([stage, {
    ...archived, content: '// different bytes',
  }], source, transition), /archived byte-for-byte/);
});
test('Reject unsafe paths, symlinks, incomplete snapshots, divergent existing files', () => {
  assert.throws(() => preflightBankSource([{ ...stage, path: '../outside.ts' }], snapshot({})),
    /Unsafe bank source path/);
  assert.throws(() => preflightBankSource([stage], snapshot({
    questions: { kind: 'symlink' },
  })), /non-directory\/symlink/);
  assert.throws(() => preflightBankSource([stage], {
    ...snapshot({}), complete: false as true,
  }), /complete Git tree snapshot/);
  assert.throws(() => preflightBankSource([stage], snapshot({
    questions: { kind: 'directory' },
    'questions/index.ts': { kind: 'file', content: 'manually edited' },
  })), /Divergent authored source/);
  assert.throws(() => preflightBankSource([stage, { ...stage }], snapshot({})),
    /Duplicate generated/);
});
test('Stage 1 source may be rerun unchanged, but never overwrites an editor', () => {
  const draft = { ...stage, content: editor };
  assert.doesNotThrow(() => preflightBankSource([draft], source));
  assert.throws(() => preflightBankSource([draft], snapshot({
    questions: { kind: 'directory' },
    'questions/index.ts': { kind: 'file', content: '// evolved Stage 2\n' },
  })), /Divergent authored source/);
});
test('Editor literals and keyed order reject opaque values and collisions', () => {
  assert.deepEqual(JSON.parse(authoredBankLiteral({ source: 'Українська', items: [1, 2] })),
    { source: 'Українська', items: [1, 2] });
  assert.throws(() => authoredBankLiteral({ incorrect: undefined }), /unsupported editor value/);
  assert.throws(() => authoredBankLiteral({ incorrect: () => {} }), /unsupported editor value/);
  assert.throws(() => assertBankOrder({ first: 1, second: 2 }, ['first','first'], 'bank', true), /once/);
  assert.throws(() => assertBankOrder({}, [], 'bank', true), /empty/);
});
