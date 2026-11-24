#!/usr/bin/env node
/**
 * @fileoverview Trusted typed Course Stage 5 gate.
 * Authorizes a pinned Stage 3 source + accepted Stage 4 review evidence.
 * No PR-head code is loaded or executed by this gate.
 */
import fs from 'node:fs';
import { verifyReviewEvidence } from '../reviewEvidence/review-evidence.mjs';
import { github, requireActor, safeBranch, report } from './course-gate.mjs';

const UUID = '[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}';
const COURSE_TS = new RegExp('^(content/[a-z][a-z0-9-]*)/data/courses/([0-9a-f])/(' + UUID + ')/draft\\.ts$');
const SHA = /^[a-f0-9]{40}$/;

export function discoverTypedCourseSource(files) {
  if (!Array.isArray(files) || files.length > 3000) throw Error('Invalid typed Course PR changed-file inventory');
  const found = [];
  const seen = new Set();
  for (const file of files) {
    if (typeof file?.filename !== 'string' || typeof file?.status !== 'string') throw Error('Malformed Course PR file');
    if (!file.filename.includes('/data/courses/') || !file.filename.endsWith('/draft.ts')) continue;
    const match = file.filename.match(COURSE_TS);
    if (!match || match[2] !== match[3].at(-1)) throw Error('Invalid Course Stage 3 TS path: ' + file.filename);
    if (seen.has(file.filename)) throw Error('Duplicate typed Course source');
    seen.add(file.filename);
    if (!['added', 'modified'].includes(file.status))
      throw Error('Course Stage 3 source must be present and newly reviewed');
    found.push({
      textbookRoot: match[1],
      sourcePath: file.filename,
      courseId: match[3],
    });
  }
  if (found.length !== 1)
    throw Error('Exactly one changed canonical Course Stage 3 draft.ts required; found ' + found.length);
  // A Stage 3 authoring PR is exactly one progressively edited source. Reject
  // unrelated modifications to Lesson dependencies, Engine, or workflow files;
  // those require their independently reviewed source PRs.
  if (files.length !== 1 || files[0].filename !== found[0].sourcePath)
    throw Error('Typed Course Stage 3 PR must change only its canonical reviewed draft.ts');
  return found[0];
}

async function changedPrFiles(number) {
  const files = [];
  for (let page = 1; page <= 30; page++) {
    const batch = await github('pulls/' + number + '/files?per_page=100&page=' + page);
    if (!Array.isArray(batch)) throw Error('Cannot inspect Course changed-file inventory');
    files.push(...batch);
    if (batch.length < 100) return files;
  }
  throw Error('Course PR exceeds 3000 changed files');
}

export async function inspectTypedCourse(number, expectedHead) {
  const repo = process.env.GITHUB_REPOSITORY;
  const base = process.env.COURSE_DEFAULT_BRANCH || 'develop';
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '')) throw Error('Invalid trusted GitHub repository');
  const pr = await github('pulls/' + number);
  if (
    !pr ||
    pr.state !== 'open' ||
    !pr.draft ||
    pr.base?.ref !== base ||
    pr.head?.repo?.full_name !== repo ||
    !SHA.test(pr.head?.sha ?? '') ||
    !safeBranch(pr.head.ref, base)
  )
    throw Error('An open same-repository Draft Course PR targeting the default branch is required');
  if (expectedHead && expectedHead !== pr.head.sha) throw Error('Course PR HEAD has advanced since authorization');
  const identity = discoverTypedCourseSource(await changedPrFiles(number));
  const resource = await github(
    'contents/' + identity.sourcePath.split('/').map(encodeURIComponent).join('/') + '?ref=' + pr.head.sha,
  );
  if (
    !resource ||
    resource.type !== 'file' ||
    resource.path !== identity.sourcePath ||
    !SHA.test(resource.sha ?? '') ||
    resource.size < 1 ||
    resource.size > 2 * 1024 * 1024
  )
    throw Error('Pinned typed Course source is missing, invalid or oversized');
  const [review] = await verifyReviewEvidence(pr.body, {
    stages: [4],
    head: pr.head.sha,
    blob: resource.sha,
  });
  const again = await github('pulls/' + number);
  if (
    again?.head?.sha !== pr.head.sha || again?.head?.ref !== pr.head.ref ||
    again?.state !== 'open' || !again.draft || again.base?.ref !== base || again.body !== pr.body
  )
    throw Error('Course PR changed during independent Stage 4 evidence verification');
  return {
    version: 2,
    operation: 'typed-course-stage5',
    number,
    repo,
    branch: pr.head.ref,
    head: pr.head.sha,
    ...identity,
    sourceBlobSha: resource.sha,
    reviewCommitSha: review.commit,
    reviewVerdict: review.verdict,
  };
}

export function parseTypedMetadata(encoded) {
  if (typeof encoded !== 'string' || !/^[a-zA-Z0-9+/=]{1,8192}$/.test(encoded))
    throw Error('Missing typed Course metadata');
  const data = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  if (
    data.version !== 2 ||
    data.operation !== 'typed-course-stage5' ||
    !Number.isSafeInteger(data.number) ||
    data.number < 1 ||
    !SHA.test(data.head ?? '') ||
    !SHA.test(data.sourceBlobSha ?? '') ||
    data.reviewCommitSha !== data.head ||
    data.repo !== process.env.GITHUB_REPOSITORY ||
    !/^[A-Za-z0-9-]+$/.test(data.actor ?? '') ||
    data.reviewVerdict !== 'accepted' ||
    !safeBranch(data.branch, process.env.COURSE_DEFAULT_BRANCH || 'develop') ||
    !COURSE_TS.test(data.sourcePath ?? '') ||
    !data.sourcePath.startsWith(data.textbookRoot + '/data/courses/') ||
    !data.sourcePath.endsWith('/' + data.courseId + '/draft.ts')
  )
    throw Error('Invalid or untrusted typed Course metadata');
  return data;
}

async function main() {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) throw Error('Usage: typed-course-gate.mjs resolve');
  if (process.env.GITHUB_EVENT_NAME !== 'workflow_dispatch')
    throw Error('Typed Course rollout is manual-only until owner activates canonical command');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const number = Number(event.inputs?.pr_number);
  if (!Number.isSafeInteger(number) || number < 1) throw Error('Invalid Course PR number');
  const actor = process.env.GITHUB_ACTOR;
  await requireActor(actor);
  const metadata = { ...(await inspectTypedCourse(number)), actor };
  const encoded = Buffer.from(JSON.stringify(metadata)).toString('base64');
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'meta=' + encoded + '\npr=' + number + '\nhead=' + metadata.head + '\n');
  report(
    'Verified typed Course Stage 4 review at ' +
      metadata.head +
      ' (source blob ' +
      metadata.sourceBlobSha +
      ', verdict ' +
      metadata.reviewVerdict +
      ')',
  );
}

if (process.argv[1]?.endsWith('/typed-course-gate.mjs')) {
  main().catch(error => {
    report('Typed Course gate rejected: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
