/**
 * Tokenless, allowlisted technical dispatch for six declarative materializers.
 * Never imports or evaluates candidate TypeScript; never handles Git writes.
 * Entity-specific callers own their Git, parent and media trust checks.
 */
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const SHA = /^[a-f0-9]{40}$/;
const book = 'content/[a-z][a-z0-9-]*/data/';
const id = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
// Course-owned Episodes and Assessments use up to three semantic placement slugs.
const nested = '(?:[A-Za-z][A-Za-z0-9]*/){0,2}[A-Za-z][A-Za-z0-9]*';
const contract = Object.freeze({
  'course-stage5': ['course', 'materializeCourse', book + 'courses/[a-f0-9]/' + id],
  'lesson-stage6': ['lesson', 'materializeLessonStage6', book + 'lessons/[a-f0-9]/' + id],
  'episode-stage5': ['episode', 'materializeEpisodeStage5', book + 'courses/[a-f0-9]/' + id + '/' + nested],
  'questions-stage5': ['questions', 'materializeQuestionBank', book + 'lessons/[a-f0-9]/' + id + '/questions'],
  'flashcards-stage5': ['flashcards', 'materializeFlashcardBank', book + 'lessons/[a-f0-9]/' + id + '/flashcards'],
  'assessment-stage4': ['assessment', 'materializeAssessment', book + 'courses/[a-f0-9]/' + id + '/' + nested],
});
const blobSha = bytes =>
  createHash('sha1')
    .update('blob ' + bytes.length + '\0')
    .update(bytes)
    .digest('hex');

export function assertTokenless() {
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_ENTERPRISE_TOKEN)
    throw Error('Source analysis cannot access GitHub credentials');
}
export function operationSpec(operation, source) {
  const selected = Object.hasOwn(contract, operation) ? contract[operation] : undefined;
  if (
    !selected ||
    !source ||
    !SHA.test(source.sourceBlobSha ?? '') ||
    !SHA.test(source.sourceCommitSha ?? '') ||
    !new RegExp('^' + selected[2] + '/draft\\.ts$').test(source.sourcePath ?? '') ||
    source.sourcePath.split('/').some(x => ['.', '..', '__proto__', 'prototype', 'constructor'].includes(x))
  )
    throw Error('Unsafe materialization operation/source');
  const parts = source.sourcePath.split('/');
  if (parts[4] !== parts[5].at(-1)) throw Error('Noncanonical UUID bucket');
  return { kind: selected[0], method: selected[1] };
}
/** Verify only the trusted gate-selected source, never a path from the draft. */
export function readPinnedDraft({ operation, source, candidateRoot, git }) {
  assertTokenless();
  operationSpec(operation, source);
  const root = fs.realpathSync(candidateRoot);
  if (
    !fs.statSync(root).isDirectory() ||
    git(root, 'rev-parse', 'HEAD') !== source.sourceCommitSha ||
    git(root, 'status', '--porcelain=v1', '--untracked-files=all')
  )
    throw Error('Candidate is not the clean pinned HEAD');
  const indexed = git(root, 'ls-files', '--stage', '--', source.sourcePath);
  if (indexed !== '100644 ' + source.sourceBlobSha + ' 0\t' + source.sourcePath)
    throw Error('Reviewed draft is not an ordinary tracked Git blob');
  let filename = root;
  for (const segment of source.sourcePath.split('/')) {
    filename = path.join(filename, segment);
    if (fs.lstatSync(filename).isSymbolicLink()) throw Error('Symlink in reviewed draft ancestry');
  }
  const bytes = fs.readFileSync(filename);
  if (
    !bytes.length ||
    bytes.length > 4 * 1024 * 1024 ||
    !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes) ||
    blobSha(bytes) !== source.sourceBlobSha
  )
    throw Error('Reviewed draft bytes/UTF-8 differ from pinned blob');
  return bytes.toString('utf8');
}
export function parseTrustedDraft({ operation, source, sourceText, read }) {
  assertTokenless();
  const { kind } = operationSpec(operation, source);
  if (
    typeof sourceText !== 'string' ||
    Buffer.byteLength(sourceText) > 4 * 1024 * 1024 ||
    blobSha(Buffer.from(sourceText, 'utf8')) !== source.sourceBlobSha
  )
    throw Error('Source is not exact pinned UTF-8 draft');
  if (typeof read !== 'function') throw Error('Trusted static Draft Reader unavailable');
  return read(sourceText, kind);
}
export function renderTrustedDraft({ operation, source, input, renderers, options }) {
  assertTokenless();
  const { method } = operationSpec(operation, source);
  const render = renderers?.[method];
  if (typeof render !== 'function') throw Error('Trusted Engine renderer unavailable');
  const plan = render(input, options);
  if (
    !plan ||
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    plan.files.length < 1 ||
    plan.files.length > 1500
  )
    throw Error('Invalid nonpublishable Engine output plan');
  let total = 0;
  const paths = new Set();
  for (const file of plan.files) {
    if (
      !file ||
      typeof file.path !== 'string' ||
      file.path.startsWith('/') ||
      file.path.includes('\\') ||
      file.path.split('/').some(x => !x || x === '.' || x === '..') ||
      paths.has(file.path) ||
      typeof file.content !== 'string' ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind)
    )
      throw Error('Unsafe or duplicate generated file path');
    paths.add(file.path);
    const bytes = Buffer.from(file.content, 'utf8');
    total += bytes.length;
    if (!bytes.length || total > 32 * 1024 * 1024 || !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes))
      throw Error('Oversized or malformed generated source');
  }
  return plan;
}
/** Load only compiled trusted Engine from this default-branch checkout. */
export function trustedEngine(trustedRoot) {
  const filename = path.join(fs.realpathSync(trustedRoot), 'shared/engine/dist/build.js');
  if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) throw Error('Missing trusted Engine build');
  return createRequire(import.meta.url)(filename);
}
export function executeTrustedDraft({ operation, source, sourceText, options, trustedRoot, reader, renderers }) {
  const engine = reader && renderers ? null : trustedEngine(trustedRoot);
  const input = parseTrustedDraft({ operation, source, sourceText, read: reader ?? engine?.readDeclarativeDraft });
  return { input, plan: renderTrustedDraft({ operation, source, input, options, renderers: renderers ?? engine }) };
}
