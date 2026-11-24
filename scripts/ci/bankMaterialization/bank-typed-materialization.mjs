#!/usr/bin/env node
/**
 * Typed Question/Flashcard Stage 5 source materialization.
 *
 * analyze: verify a pinned checkout, execute exactly one direct authored
 * materializer in the credential-free worker, independently check source
 * ownership and media/Scene evidence, then attest the bounded file manifest.
 *
 * publish: no npm/Engine/candidate code execution; reauthorize and reconstruct
 * exactly that source tree through the Git Data API, with an immutable HEAD
 * lease and exactly one new remote commit. Never edits Lesson Sections.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { github, requireActor, gitBlob, sha256, report } from './bank-gate.mjs';
import { inspectTyped } from './bank-typed-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const MAX_COUNT = 512;
const MAX_SINGLE = 1024 * 1024;
const MAX_TOTAL = 12 * 1024 * 1024;
const trustedRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const require = createRequire(import.meta.url);

function metadata() {
  const value = process.env.BANK_META_B64 || '';
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value) || !value.length || value.length > 16000)
    throw Error('Missing/invalid pinned typed Bank metadata');
  const meta = JSON.parse(Buffer.from(value, 'base64').toString('utf8'));
  if (
    !['questions', 'flashcards'].includes(meta.bank) ||
    meta.repo !== process.env.GITHUB_REPOSITORY ||
    !Number.isSafeInteger(meta.number) ||
    meta.number < 1 ||
    !SHA.test(meta.head) ||
    !SHA.test(meta.sourceBlob) ||
    !/^[A-Za-z0-9-]+$/.test(meta.actor || '') ||
    meta.sourcePath !== meta.identity?.folder + '/' + meta.bank + '/draft.ts' ||
    meta.identity?.bank !== meta.bank ||
    meta.identity?.id !== meta.identity?.folder?.split('/').at(-1) ||
    !SHA.test(meta.baseHead || '') ||
    !SHA.test(meta.lessonBlob || '') ||
    !SHA.test(meta.lessonConstantsBlob || '') ||
    typeof meta.branch !== 'string'
  ) {
    throw Error('Typed Bank metadata is incomplete or contradictory');
  }
  return meta;
}
function withoutActor(meta) {
  const copy = { ...meta };
  delete copy.actor;
  return copy;
}
function git(root, ...args) {
  return execFileSync('git', ['-C', root, ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trimEnd();
}
function verifyCandidate(meta) {
  const root = fs.realpathSync(process.env.BANK_CANDIDATE_ROOT || '');
  if (
    git(root, 'rev-parse', '--show-toplevel') !== root ||
    git(root, 'symbolic-ref', '--short', 'HEAD') !== meta.branch ||
    git(root, 'rev-parse', 'HEAD') !== meta.head ||
    git(root, 'rev-parse', 'refs/heads/' + meta.branch) !== meta.head ||
    git(root, 'status', '--porcelain=v1', '--untracked-files=all')
  ) {
    throw Error('Typed Bank candidate is not a clean, pinned, named PR checkout');
  }
  let current = root;
  for (const component of meta.sourcePath.split('/')) {
    current = path.join(current, component);
    if (fs.lstatSync(current).isSymbolicLink()) throw Error('Symlink on reviewed Stage 3 source path');
  }
  const bytes = fs.readFileSync(current);
  if (gitBlob(bytes) !== meta.sourceBlob || git(root, 'rev-parse', 'HEAD:' + meta.sourcePath) !== meta.sourceBlob) {
    throw Error('Reviewed bank source bytes do not match pinned Git blob');
  }
  return { root, source: bytes.toString('utf8') };
}
function assertAncestor(root, sha, label) {
  if (!SHA.test(sha || '') || git(root, 'cat-file', '-t', sha) !== 'commit') {
    throw Error(label + ': ancestor commit SHA required');
  }
  git(root, 'merge-base', '--is-ancestor', sha, 'HEAD');
}
function assertTracked(root, sourcePath, meta, label) {
  if (
    typeof sourcePath !== 'string' ||
    !sourcePath.startsWith(meta.identity.folder + '/') ||
    sourcePath.split('/').some(x => !/^[A-Za-z0-9_.-]+$/.test(x) || x === '..' || x === '.')
  ) {
    throw Error(label + ' outside owning Lesson');
  }
  if (git(root, 'cat-file', '-t', 'HEAD:' + sourcePath) !== 'blob') {
    throw Error(label + ': tracked regular source blob required');
  }
}
function assertSourceRevision(root, sha, pathname, meta, label) {
  assertTracked(root, pathname, meta, label);
  if (!SHA.test(sha || '')) throw Error(label + ': reviewed source SHA required');
  const type = git(root, 'cat-file', '-t', sha);
  const headBlob = git(root, 'rev-parse', 'HEAD:' + pathname);
  if (type === 'blob') {
    if (headBlob !== sha) throw Error(label + ': reviewed source blob has changed');
  } else if (type === 'commit') {
    git(root, 'merge-base', '--is-ancestor', sha, 'HEAD');
    if (git(root, 'rev-parse', sha + ':' + pathname) !== headBlob) {
      throw Error(label + ': source changed after approved revision');
    }
  } else throw Error(label + ': SHA must identify source blob or ancestor commit');
}
function verifyOwnerLanguages(meta, input, root) {
  const filename = meta.identity.folder + '/constants.ts';
  assertTracked(root, filename, meta, 'Lesson languages constants');
  const tracked = git(root, 'ls-files', '--stage', '--', filename);
  if (!/^100644 [a-f0-9]{40} 0\t/.test(tracked) || !tracked.endsWith('\t' + filename))
    throw Error('Owning Lesson constants.ts must be a regular Git blob');
  let current = root;
  for (const segment of filename.split('/')) {
    current = path.join(current, segment);
    if (fs.lstatSync(current).isSymbolicLink())
      throw Error('Symlink in owning Lesson constants.ts path');
  }
  const bytes = fs.readFileSync(current);
  if (gitBlob(bytes) !== meta.lessonConstantsBlob || git(root, 'rev-parse', 'HEAD:' + filename) !== meta.lessonConstantsBlob)
    throw Error('Owning Lesson constants.ts differs from pinned Git blob');
  const {
    parseLessonLanguageConstants,
    assertBankLessonLanguages,
  } = require(path.join(trustedRoot, 'shared/engine/dist/generators/materializers/bankSource/lessonLanguageOwnership.js'));
  const reviewed = parseLessonLanguageConstants(bytes.toString('utf8'));
  const languages = meta.bank === 'questions' ? input?.production?.languages : input?.production?.lesson?.languages;
  assertBankLessonLanguages(reviewed, languages);
  return reviewed;
}
function authorizations(meta, input, root, blocks) {
  const lessonDirectory = meta.identity.folder;
  verifyOwnerLanguages(meta, input, root);
  const source = {
    content: fs.readFileSync(path.join(root, meta.sourcePath), 'utf8'),
    blobSha: meta.sourceBlob,
    commitSha: meta.head,
    inputSha256: sha256(JSON.stringify(input, null, 2)),
  };
  if (meta.bank === 'questions') {
    const lesson = input?.production?.lesson;
    if (input?.config?.ownerLessonId !== meta.identity.id || !lesson) {
      throw Error('Question Bank is not owned by the verified Lesson');
    }
    assertSourceRevision(root, lesson.sourceSha, lesson.sourcePath, meta, 'Question Lesson source');
    assertSourceRevision(root, lesson.referenceSha, lesson.referencePath, meta, 'Question reference');
    assertTracked(root, lesson.methodologyPath, meta, 'Lesson methodology');
    return { source, blocks, ownerLessonId: meta.identity.id };
  }
  const lesson = input?.production?.lesson;
  if (!lesson || lesson.id !== meta.identity.id) throw Error('Flashcard Bank owner Lesson UUID mismatch');
  assertSourceRevision(root, lesson.sourceSha, lessonDirectory + '/index.ts', meta, 'Flashcards Lesson source');
  assertSourceRevision(root, lesson.reference.sourceSha, lesson.reference.path, meta, 'Flashcards reference');
  return {
    source,
    blocks,
    ownerLessonId: meta.identity.id,
    lessonSourceSha: lesson.sourceSha,
    referenceSourceSha: lesson.reference.sourceSha,
  };
}
function validTypedPath(filename, meta) {
  const folder = meta.identity.folder + '/';
  if (
    !filename.startsWith(folder) ||
    filename.length > 520 ||
    filename.includes('..') ||
    filename.includes('//') ||
    filename.includes('\\')
  )
    return false;
  const relative = filename.slice(folder.length);
  if (!relative.startsWith(meta.bank + '/')) return false;
  const nested = relative.slice(meta.bank.length + 1);
  return (
    nested.length > 0 &&
    !/(?:^|\/)draft\.ts$|\.reviewed-stage3\.ts\.txt$/.test(nested) &&
    nested.length < 420 &&
    nested.split('/').length <= 22 &&
    nested.split('/').every(piece => /^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*$/.test(piece)) &&
    /\.(?:ts|md|txt|py|js|json|html|css|svg|java|cpp|c|h|rs|go|sql|sh)$/.test(nested)
  );
}
export function verifyTypedManifest(result, meta) {
  if (
    !result ||
    result.version !== 3 ||
    JSON.stringify(result.meta) !== JSON.stringify(meta) ||
    result.deletedSource?.path !== meta.sourcePath ||
    result.deletedSource?.blobSha !== meta.sourceBlob ||
    !Array.isArray(result.files) ||
    result.files.length < 3 ||
    result.files.length > MAX_COUNT ||
    !/^[a-f0-9]{64}$/.test(result.inputSha256 || '')
  ) {
    throw Error('Invalid pinned typed Bank source manifest');
  }
  const unique = new Set();
  let total = 0;
  for (const file of result.files) {
    if (
      !validTypedPath(file.path, meta) ||
      unique.has(file.path) ||
      typeof file.base64 !== 'string' ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(file.base64)
    ) {
      throw Error('Unallowlisted or duplicated typed Bank output');
    }
    unique.add(file.path);
    const bytes = Buffer.from(file.base64, 'base64');
    total += bytes.length;
    if (
      bytes.length > MAX_SINGLE ||
      total > MAX_TOTAL ||
      !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes) ||
      bytes.toString('base64') !== file.base64 ||
      sha256(bytes) !== file.sha256
    ) {
      throw Error('Typed Bank source bytes or checksum mismatch: ' + file.path);
    }
  }
  const root = meta.identity.folder + '/';
  for (const filename of [root + meta.bank + '/index.ts']) {
    if (!unique.has(filename)) throw Error('Missing required typed Bank output ' + filename);
  }
  return result.files;
}
/** Ensure every reviewed bank member and every Flashcard Side is emitted. */
export function assertTypedBankInventory(meta, input, files) {
  const root = meta.identity.folder + '/';
  const paths = new Set(files.map(file => file.path));
  if (meta.bank === 'questions') {
    const kinds = input?.config?.questions;
    if (!kinds || typeof kinds !== 'object' || Array.isArray(kinds)) {
      throw Error('Missing complete reviewed nine-kind Question inventory');
    }
    let total = 0;
    for (const [kind, members] of Object.entries(kinds)) {
      if (
        ![
          'selectOneAnswer',
          'selectMultipleAnswers',
          'matchBlocks',
          'answerWithText',
          'answerWithNumber',
          'orderSequence',
          'buildAnswerWithBlocks',
          'fillBlanksWithBlocks',
          'fillBlanksWithText',
        ].includes(kind) ||
        !members ||
        typeof members !== 'object' ||
        Array.isArray(members)
      ) {
        throw Error('Unsupported Question kind in complete bank');
      }
      if (!paths.has(root + 'questions/' + kind + '/index.ts')) {
        throw Error('Missing Question kind export index ' + kind);
      }
      for (const slug of Object.keys(members)) {
        if (!paths.has(root + 'questions/' + kind + '/' + slug + '.ts')) {
          throw Error('Reviewed Question omitted from source output: ' + kind + '/' + slug);
        }
        total++;
      }
    }
    if (!total) throw Error('Completed Question Bank must emit at least one Question');
  } else {
    const items = input?.config?.flashcards?.items;
    const order = input?.config?.flashcards?.order;
    if (!items || typeof items !== 'object' || Array.isArray(items) || !Array.isArray(order) || !order.length)
      throw Error('No reviewed Flashcards');
    if (
      new Set(order).size !== order.length ||
      order.some(slug => typeof slug !== 'string' || !Object.hasOwn(items, slug)) ||
      Object.keys(items).length !== order.length
    ) {
      throw Error('Flashcards order must include every reviewed Card exactly once');
    }
    for (const slug of order) {
      const card = items[slug];
      if (!card || !paths.has(root + 'flashcards/' + slug + '.ts')) {
        throw Error('Reviewed Card omitted: ' + slug);
      }
      for (const side of ['front', 'back', 'hint']) {
        const content = card.config?.content?.[side];
        if (!content) continue;
        const prefix = root + 'flashcards/' + slug + '/content/' + side + '/';
        if (!paths.has(prefix + 'index.ts')) {
          throw Error('Reviewed Flashcard Side omitted: ' + slug + '/' + side);
        }
        if (
          !Array.isArray(content.order) ||
          !content.items ||
          typeof content.items !== 'object' ||
          Array.isArray(content.items) ||
          (side !== 'hint' && !content.order.length) ||
          new Set(content.order).size !== content.order.length ||
          content.order.some(block => typeof block !== 'string' || !Object.hasOwn(content.items, block)) ||
          Object.keys(content.items).length !== content.order.length
        ) {
          throw Error('Flashcard Side must include every reviewed ContentBlock exactly once: ' + slug + '/' + side);
        }
        for (const block of content.order) {
          if (!paths.has(prefix + block + '/index.ts')) {
            throw Error('Reviewed Side ContentBlock omitted: ' + slug + '/' + side + '/' + block);
          }
        }
      }
    }
  }
}

async function analyze(meta) {
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN)
    throw Error('Candidate execution must not receive GitHub credentials');
  const { root, source: pinnedSource } = verifyCandidate(meta);
  const { runIsolatedMaterialization } = await import('../directMaterialization/run-isolated.mjs');
  const result = runIsolatedMaterialization({
    trustedRoot,
    candidateRoot: root,
    textbook: meta.identity.pkg,
    operation: meta.bank === 'questions' ? 'questions-stage5' : 'flashcards-stage5',
    source: {
      sourcePath: meta.sourcePath,
      sourceBlobSha: meta.sourceBlob,
      sourceCommitSha: meta.head,
      lessonConstantsBlobSha: meta.lessonConstantsBlob,
    },
  });
  const { plan, input } = result ?? {};
  if (
    !plan ||
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    !plan.transition ||
    plan.transition.sourceDraftPath !== meta.bank + '/draft.ts' ||
    plan.transition.materializedPath !== meta.bank + '/index.ts' ||
    plan.transition.sourceDraftBlobSha !== meta.sourceBlob ||
    plan.transition.expectedHeadSha !== meta.head
  )
    throw Error('Isolated Bank did not return the approved source transition');

  // A direct invocation can inspect arbitrary imported code; the manifest
  // alone cannot prove it produced the bytes. Verify its declared ownership,
  // reference commits, and every real media/Scene asset against the pinned Git tree.
  const { resolveReviewedBankBlockEvidence } = await import('./bank-typed-block-evidence.mjs');
  const blocks = resolveReviewedBankBlockEvidence({
    root,
    meta,
    input,
    git,
    ts: require('typescript'),
  });
  const approval = authorizations(meta, input, root, blocks);
  if (approval.source.content !== pinnedSource || approval.source.blobSha !== meta.sourceBlob)
    throw Error('Bank input differs from pinned reviewed source');
  const files = plan.files
    .map(file => {
      const content = Buffer.from(file.content ?? '', 'utf8');
      if (!Buffer.from(content.toString('utf8'), 'utf8').equals(content)) throw Error('Invalid worker source bytes');
      return {
        path: meta.identity.folder + '/' + file.path,
        sha256: sha256(content),
        base64: content.toString('base64'),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
  const reportData = {
    version: 3,
    meta,
    deletedSource: { path: meta.sourcePath, blobSha: meta.sourceBlob },
    inputSha256: approval.source.inputSha256,
    files,
  };
  verifyTypedManifest(reportData, meta);
  assertTypedBankInventory(meta, input, files);
  const location = process.env.BANK_REPORT;
  if (!location) throw Error('Missing trusted bank report path');
  fs.mkdirSync(path.dirname(location), { recursive: true });
  fs.writeFileSync(location, JSON.stringify(reportData) + '\\n', { flag: 'wx' });
  report(
    'Isolated reviewed ' +
      meta.bank +
      ' Stage 5 planned ' +
      files.length +
      ' bank-owned sources from ' +
      meta.sourceBlob +
      '; zero Git writes',
  );
}
async function publish(meta) {
  await requireActor(meta.actor);
  await inspectTyped(meta.number, meta.bank, withoutActor(meta));
  const location = process.env.BANK_REPORT;
  if (fs.statSync(location).size > 20 * 1024 * 1024) throw Error('Oversized typed Bank report');
  const reportData = JSON.parse(fs.readFileSync(location, 'utf8'));
  const files = verifyTypedManifest(reportData, meta);
  const original = await github('git/commits/' + meta.head);
  const listing = await github('git/trees/' + original.tree.sha + '?recursive=1');
  if (listing.truncated || !Array.isArray(listing.tree)) {
    throw Error('Cannot prove exact complete original Git tree');
  }
  const known = new Map(listing.tree.map(entry => [entry.path, entry]));
  const lower = new Map(listing.tree.map(entry => [entry.path.toLowerCase(), entry.path]));
  const index = known.get(meta.sourcePath);
  if (index?.type !== 'blob' || index.mode !== '100644' || index.sha !== meta.sourceBlob) {
    throw Error('Approved Stage 3 bank draft is not the exact original regular Git blob');
  }
  for (const file of files) {
    const current = known.get(file.path);
    if (current) {
      throw Error('Refusing to overwrite existing reviewed Bank source ' + file.path);
    }
    if (lower.has(file.path.toLowerCase()) && lower.get(file.path.toLowerCase()) !== file.path) {
      throw Error('Case-insensitive bank source path collision');
    }
    const pieces = file.path.split('/');
    for (let n = 1; n < pieces.length; n++) {
      const prefix = pieces.slice(0, n).join('/');
      const entry = known.get(prefix);
      if (entry && (entry.type !== 'tree' || entry.mode !== '040000')) {
        throw Error('Symlink/non-directory parent in typed bank output ' + prefix);
      }
    }
  }
  // Exactly one Git tree is constructed from the immutable worker artifact.
  // Do not regenerate or execute reviewed TypeScript in this privileged job.
  const tree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
    tree: [
      ...files.map(file => ({
        path: file.path,
        mode: '100644',
        type: 'blob',
        content: Buffer.from(file.base64, 'base64').toString('utf8'),
      })),
      { path: meta.sourcePath, mode: '100644', type: 'blob', sha: null },
    ],
  });
  if (!SHA.test(tree.sha ?? '')) throw Error('Git Data API returned no valid Bank source tree');
  await inspectTyped(meta.number, meta.bank, withoutActor(meta));
  const commit = await github('git/commits', 'POST', {
    message:
      'Materialize typed ' +
      meta.bank +
      ' bank for PR #' +
      meta.number +
      '\n\nReviewed HEAD: ' +
      meta.head +
      '\nSource blob: ' +
      meta.sourceBlob,
    tree: tree.sha,
    parents: [meta.head],
  });
  await inspectTyped(meta.number, meta.bank, withoutActor(meta));
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', {
    sha: commit.sha,
    force: false,
  });
  if (updated?.object?.sha !== commit.sha) throw Error('Bank ref did not advance to the expected commit');
  report(
    'Committed ' +
      files.length +
      ' reviewed typed ' +
      meta.bank +
      ' source files atomically to PR #' +
      meta.number +
      ': ' +
      commit.sha +
      '. Lesson root and Sections were unchanged',
  );
}
async function main() {
  const mode = process.argv[2];
  if (!['analyze', 'publish'].includes(mode) || process.argv.length !== 3)
    throw Error('Usage: bank-typed-materialization.mjs analyze|publish');
  const meta = metadata();
  if (mode === 'analyze') await analyze(meta);
  else await publish(meta);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    report('Typed Bank source materialization denied: ' + error.message);
    process.exitCode = 1;
  });
}
