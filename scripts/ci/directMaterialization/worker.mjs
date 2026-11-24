/** One reviewed authored entrypoint executes inside the credential-free container.
 * The worker cannot certify its own output. The trusted publisher independently
 * checks source identity, review provenance, file scope, Git trees and hashes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { createJiti } from 'jiti';

const require = createRequire(import.meta.url);
const { executeMaterializerEntrypoint } = require(
  './shared/engine/dist/generators/materializers/directMaterialization/directMaterialization.js',
);
const request = JSON.parse(fs.readFileSync(0, 'utf8'));
const { operation, source } = request;
const sha = /^[a-f0-9]{40}$/i;
const name = '[a-z][a-z0-9-]*';
const uuid = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
const root = 'content/' + name + '/data/';
const patterns = {
  'lesson-stage6': new RegExp('^' + root + 'lessons/[a-f0-9]/' + uuid + '/draft\\.ts$', 'i'),
  'questions-stage5': new RegExp('^' + root + 'lessons/[a-f0-9]/' + uuid + '/questions/draft\\.ts$', 'i'),
  'flashcards-stage5': new RegExp('^' + root + 'lessons/[a-f0-9]/' + uuid + '/flashcards/draft\\.ts$', 'i'),
};
if (
  !Object.hasOwn(patterns, operation) ||
  !patterns[operation].test(source?.sourcePath ?? '') ||
  !sha.test(source.sourceBlobSha ?? '') ||
  !sha.test(source.sourceCommitSha ?? '')
) throw Error('Unsupported materializer request');

const entrypoint = path.resolve('/work', source.sourcePath);
const bytes = fs.readFileSync(entrypoint);
if (!Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)) throw Error('Invalid UTF-8 source');
const blob = createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
if (blob !== source.sourceBlobSha) throw Error('Candidate source blob mismatch');
const sourceText = bytes.toString('utf8');
const jiti = createJiti(import.meta.url, { fsCache: false });
const selectedBank = operation === 'questions-stage5' ? 'questions' : operation === 'flashcards-stage5' ? 'flashcards' : null;
let bankInput;
const collectBankBlocks = input => {
  const registeredSceneIds = new Set();
  const approvedMediaBlockIds = new Set();
  const visited = new WeakSet();
  function visit(value) {
    if (!value || typeof value !== 'object' || visited.has(value)) return;
    visited.add(value);
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    const config = value.config && typeof value.config === 'object' ? value.config : value;
    if (typeof config.id === 'string') {
      if (config.type === 'scene') registeredSceneIds.add(config.id);
      else if (['image', 'audio', 'video', 'subtitles', 'youtube'].includes(config.type))
        approvedMediaBlockIds.add(config.id);
    }
    for (const [key, child] of Object.entries(value)) if (key !== 'production') visit(child);
  }
  visit(input?.config);
  return { registeredSceneIds, approvedMediaBlockIds };
};
const bankAuthorization = input => {
  bankInput = input;
  const ownerLessonId = source.sourcePath.split('/')[5];
  const reviewed = {
    approved: true,
    content: sourceText,
    blobSha: source.sourceBlobSha,
    reviewedSourceBlobSha: source.sourceBlobSha,
    reviewCommitSha: source.sourceCommitSha,
    reviewedInputSha256: createHash('sha256').update(JSON.stringify(input, null, 2)).digest('hex'),
  };
  const snapshot = {
    complete: true,
    expectedHeadSha: source.sourceCommitSha,
    observedHeadSha: source.sourceCommitSha,
    entries: { [selectedBank + '/draft.ts']: { kind: 'file', content: sourceText } },
  };
  const base = { ownerLessonId, reviewed, snapshot, blocks: collectBankBlocks(input) };
  if (selectedBank === 'questions') return base;
  return {
    ...base,
    lessonSourceSha: input.production?.lesson?.sourceSha,
    referenceSourceSha: input.production?.lesson?.reference?.sourceSha,
    questionSourceSha: input.production?.questions?.sourceSha,
    questionReviewSha: input.production?.questions?.reviewSha,
    methodologySourceSha: input.production?.questions?.methodologySourceSha,
  };
};
const options = operation === 'lesson-stage6'
  ? {
      source, sourceText,
      verifySourceInput: (_input, pinned, text) =>
        pinned.sourcePath === source.sourcePath &&
        pinned.sourceBlobSha === source.sourceBlobSha &&
        pinned.sourceCommitSha === source.sourceCommitSha && text === sourceText,
    }
  : undefined;
const plan = await executeMaterializerEntrypoint(
  operation,
  options,
  () => jiti.import(entrypoint),
  selectedBank ? bankAuthorization : undefined,
);
process.stdout.write(JSON.stringify(selectedBank ? { plan, input: bankInput } : plan));
