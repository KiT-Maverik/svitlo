#!/usr/bin/env node
/**
 * @fileoverview Read-only authorization of the typed Lesson Stage 6.1 command.
 * Only trusted default-branch code executes. Candidate TypeScript is data.
 * Source selection uses only the pinned Git comparison and canonical path.
 */
import fs from 'node:fs';
import { github, requireActor, report, safeBranch } from '../courseMaterialization/course-gate.mjs';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const sha = /^[0-9a-f]{40}$/;
/** Canonical Lesson-root draft path; no identity is obtained from PR prose. */
export function lessonSourceIdentity(source) {
  const match =
    typeof source === 'string' &&
    source.match(/^content\/([a-z][a-z0-9-]*)\/data\/lessons\/([0-9a-f])\/([0-9a-f-]{36})\/draft\.ts$/);
  if (!match || !uuid.test(match[3]) || match[2] !== match[3].at(-1))
    throw Error('Invalid canonical Lesson draft.ts path');
  return { id: match[3], pkg: 'content/' + match[1], folder: source.slice(0, -'/draft.ts'.length), source };
}

/** Compare pinned commits, not mutable PR prose or a truncated file list.
 * GitHub returns at most 300 changed paths; a full page is ambiguous.
 */
export async function discoverLessonSource(baseHead, head) {
  if (!sha.test(baseHead || '') || !sha.test(head || '')) throw Error('Invalid pinned Git comparison');
  const comparison = await github('compare/' + baseHead + '...' + head);
  if (!Array.isArray(comparison?.files) || comparison.files.length >= 300)
    throw Error('Lesson source discovery requires a complete bounded Git comparison');
  const candidates = comparison.files.filter(
    file =>
      file.status !== 'removed' && /^content\/[^/]+\/data\/lessons\/[^/]+\/[^/]+\/draft\.ts$/.test(file.filename ?? ''),
  );
  if (candidates.length !== 1) throw Error('Expected exactly one changed Lesson draft.ts; found ' + candidates.length);
  const candidate = candidates[0];
  const identity = lessonSourceIdentity(candidate.filename);
  const source = await github(
    'contents/' + identity.source.split('/').map(encodeURIComponent).join('/') + '?ref=' + head,
  );
  if (
    source?.type !== 'file' ||
    !sha.test(source.sha || '') ||
    source.sha !== candidate.sha ||
    !Number.isSafeInteger(source.size) ||
    source.size < 1 ||
    source.size > 4 * 1024 * 1024
  )
    throw Error('Pinned Lesson draft.ts missing, oversized or changed blob');
  return { identity, sourceBlob: source.sha };
}

export function parseTypedTrigger(event, type, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor || '')) throw Error('Invalid actor');
  let number;
  if (type === 'issue_comment') {
    if (
      event.action !== 'created' ||
      !event.issue?.pull_request ||
      event.comment?.user?.login !== actor ||
      event.comment?.body !== '/lesson materialize'
    )
      throw Error('Only exact top-level typed Lesson command allowed');
    number = event.issue.number;
  } else if (type === 'workflow_dispatch') {
    if (
      Object.keys(event.inputs ?? {}).some(key => key !== 'pr_number') ||
      !/^[1-9]\d*$/.test(String(event.inputs?.pr_number ?? ''))
    )
      throw Error('Invalid typed Lesson dispatch');
    number = Number(event.inputs.pr_number);
  } else throw Error('Unsupported Lesson trigger');
  if (!Number.isSafeInteger(number) || number < 1 || number > 999999999) throw Error('Invalid Lesson PR number');
  return { number, actor };
}

export async function inspectTyped(number, expectedHead) {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo || '')) throw Error('Invalid repository');
  const pr = await github('pulls/' + number);
  if (
    !pr ||
    pr.state !== 'open' ||
    !pr.draft ||
    !sha.test(pr.head?.sha || '') ||
    !sha.test(pr.base?.sha || '') ||
    ['main', process.env.LESSON_DEFAULT_BRANCH || 'develop'].includes(pr.head?.ref) ||
    pr.head?.repo?.full_name !== repo ||
    pr.base?.repo?.full_name !== repo ||
    !safeBranch(pr.head?.ref, pr.base?.ref)
  )
    throw Error('Open same-repository Draft typed Lesson PR required');
  if (expectedHead && pr.head.sha !== expectedHead) throw Error('Lesson HEAD advanced; rerun command');
  const { identity, sourceBlob } = await discoverLessonSource(pr.base.sha, pr.head.sha);
  const again = await github('pulls/' + number);
  if (
    again?.head?.sha !== pr.head.sha ||
    again.head.ref !== pr.head.ref ||
    again.base?.ref !== pr.base?.ref ||
    again.base?.sha !== pr.base?.sha ||
    !again.draft ||
    again.state !== 'open' ||
    again.head?.repo?.full_name !== repo ||
    again.base?.repo?.full_name !== repo
  )
    throw Error('Lesson PR changed during pinned source discovery');
  return {
    number,
    repo,
    head: pr.head.sha,
    branch: pr.head.ref,
    base: pr.base.ref,
    identity,
    baseHead: pr.base.sha,
    sourceBlob,
  };
}

export function typedPath(filename, identity) {
  if (
    typeof filename !== 'string' ||
    filename.length > 500 ||
    !filename.startsWith(identity.folder + '/') ||
    filename.includes('//') ||
    filename.includes('..') ||
    filename.includes('\\') ||
    filename.includes('\0')
  )
    return false;
  const relative = filename.slice(identity.folder.length + 1);
  if (['index.ts', 'draft.ts', 'languages.ts', 'methodology.md', 'specification.md'].includes(relative)) return true;
  return /^sections\/(?:[A-Za-z][A-Za-z0-9]*\/){1,22}(?:index\.ts|specification\.md|methodology\.md|markdown\.md|[a-z]{2,3}(?:-[A-Za-z0-9]+)?\.md|code\.[A-Za-z0-9]+)$/.test(
    relative,
  );
}

async function main() {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) throw Error('Usage: lesson-typed-gate.mjs resolve');
  if (
    !process.env.LESSON_DEFAULT_BRANCH ||
    process.env.GITHUB_REF !== 'refs/heads/' + process.env.LESSON_DEFAULT_BRANCH
  )
    throw Error('Lesson materialization requires the trusted default branch');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const action = parseTypedTrigger(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(action.actor);
  const snapshot = await inspectTyped(action.number);
  const meta = { ...snapshot, actor: action.actor, operation: 'lesson-stage6' };
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    'meta=' +
      Buffer.from(JSON.stringify(meta)).toString('base64') +
      '\npr=' +
      action.number +
      '\nhead=' +
      meta.head +
      '\n',
  );
  report(
    'Authorized typed Lesson Stage 6.1 for #' +
      action.number +
      ', HEAD ' +
      meta.head +
      ', source blob ' +
      meta.sourceBlob,
  );
}
if (process.argv[1]?.endsWith('/lesson-typed-gate.mjs')) {
  main().catch(error => {
    report('Typed Lesson authorization denied: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
