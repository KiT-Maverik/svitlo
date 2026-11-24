#!/usr/bin/env node
/**
 * Typed Question/Flashcard Stage 5 source materialization.
 *
 * analyze: no GitHub write credential; statically parse and typecheck reviewed
 * Stage 3 data, run the trusted concrete Engine Bank writer in a local Git
 * checkout, and seal its entire Git tree in a checksummed source manifest.
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
    meta.reviewCommitSha !== meta.head ||
    !/^[A-Za-z0-9-]+$/.test(meta.actor || '') ||
    meta.reviewVerdict !== 'accepted' ||
    (meta.parentQuestions === 'notApplicable' && (
      meta.parentQuestionsReview?.stage !== 'questions-na' ||
      meta.parentQuestionsReview?.verdict !== 'accepted' ||
      meta.parentQuestionsReview?.commit !== meta.parentHeadSha ||
      !SHA.test(meta.parentQuestionsReview?.blob || '')
    )) ||
    meta.sourcePath !== meta.identity?.folder + '/' + meta.bank + '/draft.ts' ||
    meta.identity?.bank !== meta.bank ||
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
function authorizations(meta, input, root, blocks) {
  const lessonDirectory = meta.identity.folder;
  const evidence = {
    approved: true,
    content: fs.readFileSync(path.join(root, meta.sourcePath), 'utf8'),
    blobSha: meta.sourceBlob,
    reviewedSourceBlobSha: meta.sourceBlob,
    reviewCommitSha: meta.reviewCommitSha,
    reviewedInputSha256: sha256(JSON.stringify(input, null, 2)),
  };
  if (meta.bank === 'questions') {
    const lesson = input?.production?.lesson;
    if (input?.config?.ownerLessonId !== meta.identity.id || !lesson) {
      throw Error('Question Bank is not owned by the verified Lesson');
    }
    assertSourceRevision(root, lesson.sourceSha, lesson.sourcePath, meta, 'Question Lesson source');
    assertSourceRevision(root, lesson.referenceSha, lesson.referencePath, meta, 'Question reference');
    assertTracked(root, lesson.methodologyPath, meta, 'Lesson methodology');
    if (input.production.assessment?.questionBankRequired !== true) {
      throw Error('Question Bank N/A needs a distinct Methodologist-reviewed exception; no blanket authorization');
    }
    return { reviewed: evidence, blocks, ownerLessonId: meta.identity.id };
  }
  const lesson = input?.production?.lesson;
  const questions = input?.production?.questions;
  if (
    !lesson ||
    lesson.id !== meta.identity.id ||
    !questions ||
    questions.kind !== meta.parentQuestions ||
    !SHA.test(meta.parentHeadSha || '')
  ) {
    throw Error('Flashcards require the pinned parent Lesson Questions-first decision and source');
  }
  assertSourceRevision(root, lesson.sourceSha, lessonDirectory + '/index.ts', meta, 'Flashcards Lesson source');
  assertSourceRevision(root, lesson.reference.sourceSha, lesson.reference.path, meta, 'Flashcards reference');
  if (lesson.assessment?.flashcardBankRequired !== true) {
    throw Error('Flashcard Bank N/A requires separate independently approved exception');
  }
  if (questions.kind === 'completed') {
    const expected = lessonDirectory + '/questions/index.ts';
    const draft = lessonDirectory + '/questions/draft.ts';
    if (
      questions.integrated !== true ||
      questions.bankPath !== expected ||
      !fs.existsSync(path.join(root, expected)) ||
      fs.existsSync(path.join(root, draft)) ||
      !fs.existsSync(path.join(root, lessonDirectory, 'questionsLanguages.ts'))
    ) {
      throw Error('Questions must have completed reviewed typed source and be integrated');
    }
    assertAncestor(root, questions.reviewSha, 'Completed Questions independent review');
    assertTracked(root, expected, meta, 'Completed Questions index');
    const reviewedBlob = git(root, 'rev-parse', questions.reviewSha + ':' + draft);
    const transitions = git(root, 'log', '--format=%H', '--diff-filter=D', questions.reviewSha + '..HEAD', '--', draft)
      .split('\n')
      .filter(Boolean);
    const materialized = transitions.filter(commit => {
      if (git(root, 'rev-list', '--parents', '-n', '1', commit) !== commit + ' ' + questions.reviewSha) return false;
      const changes = git(root, 'diff-tree', '--no-commit-id', '--name-status', '--no-renames', '-r', commit).split(
        '\n',
      );
      return changes.includes('D\t' + draft) && changes.includes('A\t' + expected);
    });
    if (materialized.length !== 1 || !SHA.test(reviewedBlob)) {
      throw Error('Completed Questions require the atomic reviewed draft-to-index Git transition');
    }
    // Source provenance can refer to either the original reviewed editor or
    // the completed index; never accept an unrelated ancestor commit or blob.
    const sourceKind = git(root, 'cat-file', '-t', questions.sourceSha);
    const finalizedBlob = git(root, 'rev-parse', 'HEAD:' + expected);
    const actualSource =
      sourceKind === 'blob'
        ? questions.sourceSha
        : sourceKind === 'commit'
          ? (assertAncestor(root, questions.sourceSha, 'Questions source'),
            git(
              root,
              'rev-parse',
              questions.sourceSha + ':' + (questions.sourceSha === questions.reviewSha ? draft : expected),
            ))
          : '';
    if (![reviewedBlob, finalizedBlob].includes(actualSource)) {
      throw Error('Questions-first source SHA does not identify reviewed or finalized Question Bank');
    }
    return {
      reviewed: evidence,
      blocks,
      ownerLessonId: meta.identity.id,
      lessonSourceSha: lesson.sourceSha,
      referenceSourceSha: lesson.reference.sourceSha,
      questionSourceSha: questions.sourceSha,
      questionReviewSha: questions.reviewSha,
    };
  }
  if (questions.kind === 'notApplicable') {
    assertAncestor(root, questions.methodologySourceSha, 'Methodologist Questions N/A revision');
    assertAncestor(root, meta.parentHeadSha, 'Reviewed Questions N/A parent revision');
    assertSourceRevision(root, meta.parentQuestionsReview.blob, lessonDirectory + '/index.ts', meta, 'Questions N/A reviewed Lesson source');
    if (questions.parentLessonPr !== meta.identity.parent || lesson.assessment?.questionBankRequired !== false) {
      throw Error('Questions N/A must match the owning Lesson decision and parent PR');
    }
    return {
      reviewed: evidence,
      blocks,
      ownerLessonId: meta.identity.id,
      lessonSourceSha: lesson.sourceSha,
      referenceSourceSha: lesson.reference.sourceSha,
      methodologySourceSha: questions.methodologySourceSha,
    };
  }
  throw Error('Questions-first prerequisite is not independently completed or N/A');
}
function context(meta, root) {
  return {
    repositoryRoot: root,
    branch: meta.branch,
    expectedHeadSha: meta.head,
    ownerLessonId: meta.identity.id,
    lessonDirectory: meta.identity.folder,
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
  if (relative === meta.bank + 'Languages.ts') return true;
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
    result.version !== 2 ||
    JSON.stringify(result.meta) !== JSON.stringify(meta) ||
    !SHA.test(result.treeSha || '') ||
    result.deletedSource?.path !== meta.sourcePath ||
    result.deletedSource?.blobSha !== meta.sourceBlob ||
    !Array.isArray(result.files) ||
    result.files.length < 4 ||
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
  for (const filename of [root + meta.bank + '/index.ts', root + meta.bank + 'Languages.ts']) {
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
          if (!paths.has(prefix + 'items/' + block + '/index.ts')) {
            throw Error('Reviewed Side ContentBlock omitted: ' + slug + '/' + side + '/' + block);
          }
        }
      }
    }
  }
}

async function analyze(meta) {
  const { root, source } = verifyCandidate(meta);
  const { readTypedBankStage3, typecheckTypedBankStage3 } = await import('./bank-typed-stage3.mjs');
  const input = readTypedBankStage3(source, meta.bank);
  typecheckTypedBankStage3(source, trustedRoot);
  // Only reviewed, SHA-pinned Git bytes and the independently approved
  // Stage 3 source may authorize concrete media/Scene blocks.
  const { resolveReviewedBankBlockEvidence } = await import('./bank-typed-block-evidence.mjs');
  const blocks = resolveReviewedBankBlockEvidence({
    root,
    meta,
    input,
    git,
    ts: require('typescript'),
  });
  const authorization = authorizations(meta, input, root, blocks);
  const engineDir = '../../../shared/engine/dist/generators/materializers/';
  const adapter =
    meta.bank === 'questions'
      ? require(engineDir + 'questionBank/questionBankGitTransaction.js')
      : require(engineDir + 'flashcardBank/flashcardBankGitTransaction.js');
  const gitContext = context(meta, root);
  const checked =
    meta.bank === 'questions'
      ? adapter.checkReviewedQuestionBankSource(input, authorization, gitContext)
      : adapter.checkReviewedFlashcardBankSource(input, authorization, gitContext);
  if (checked.noop || checked.changedPaths.length < 5) {
    throw Error('Expected one complete, not previously applied Stage 3 bank transition');
  }
  const committed =
    meta.bank === 'questions'
      ? adapter.writeReviewedQuestionBankSource(input, authorization, gitContext)
      : adapter.writeReviewedFlashcardBankSource(input, authorization, gitContext);
  if (!committed.worktreeRefreshRequired || committed.changedPaths.join('\n') !== checked.changedPaths.join('\n')) {
    throw Error('Trusted Bank writer disagrees with checked atomic source plan');
  }
  if (
    committed.changedPaths.filter(filename => filename === meta.sourcePath).length !== 1 ||
    git(root, 'ls-tree', committed.commitSha, '--', meta.sourcePath)
  ) {
    throw Error('Trusted Bank writer must consume the exact reviewed draft');
  }
  const files = committed.changedPaths
    .filter(filename => filename !== meta.sourcePath)
    .map(filename => {
      // Preserve exact Git blob bytes, including trailing newlines.
      const exact = execFileSync('git', ['-C', root, 'show', committed.commitSha + ':' + filename]);
      if (!Buffer.from(exact.toString('utf8'), 'utf8').equals(exact)) {
        throw Error('Generated Bank source is not valid UTF-8');
      }
      return { path: filename, sha256: sha256(exact), base64: exact.toString('base64') };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
  const treeSha = git(root, 'rev-parse', committed.commitSha + '^{tree}');
  const reportData = {
    version: 2,
    meta,
    treeSha,
    deletedSource: { path: meta.sourcePath, blobSha: meta.sourceBlob },
    inputSha256: authorization.reviewed.reviewedInputSha256,
    files,
  };
  verifyTypedManifest(reportData, meta);
  assertTypedBankInventory(meta, input, files);
  // Semantic TypeScript analysis of ALL generated Question kinds/Card Sides,
  // against the actual @svitlo/engine/build declarations. Read-only.
  const { typecheckGeneratedBankModules } = await import('./bank-typed-stage3.mjs');
  typecheckGeneratedBankModules(
    root,
    committed.commitSha,
    files.map(f => f.path),
    trustedRoot,
  );
  const location = process.env.BANK_REPORT;
  fs.mkdirSync(path.dirname(location), { recursive: true });
  fs.writeFileSync(location, JSON.stringify(reportData) + '\n', { flag: 'wx' });
  report(
    'Verified typed ' +
      meta.bank +
      ' Stage 3 source at ' +
      meta.head +
      '; planned ' +
      files.length +
      ' bank-owned Git objects; zero remote writes',
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
  // Engine's trusted local Git writer already computed this immutable tree.
  // Rebuild it via the Git Data API, verify exact Git tree SHA before commit.
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
  if (tree.sha !== reportData.treeSha) {
    throw Error('Git Data API result differs from trusted Bank transaction tree');
  }
  await inspectTyped(meta.number, meta.bank, withoutActor(meta));
  const commit = await github('git/commits', 'POST', {
    message:
      'Materialize reviewed typed ' +
      meta.bank +
      ' bank for PR #' +
      meta.number +
      '\n\nReviewed HEAD: ' +
      meta.head +
      '\nReviewed Stage 3 blob: ' +
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
