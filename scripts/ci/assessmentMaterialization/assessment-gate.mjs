/** Authorization and identity gate. Only the pinned default-branch implementation runs. */
import fs from 'node:fs';
import { github, requireActor, safeBranch, materializationInvocation } from '../courseMaterialization/course-gate.mjs';
import { discoverOwningCourse } from '../episodeMaterialization/episode-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const UUID = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
const pathPattern = new RegExp(
  '^(content/[a-z][a-z0-9-]*/data/courses/([a-f0-9])/(' +
    UUID +
    '))/((?:[A-Za-z][A-Za-z0-9]*/){0,2}[A-Za-z][A-Za-z0-9]*)/draft\\.ts$',
);
const bad = new Set(['constructor', 'prototype', '__proto__']);
export function discoverAssessmentDraft(files) {
  if (!Array.isArray(files) || files.length !== 1 || files[0]?.status !== 'modified')
    throw Error('Assessment PR must modify only its existing allocated draft.ts before Stage 5');
  const sourcePath = files[0].filename;
  const match = typeof sourcePath === 'string' && sourcePath.match(pathPattern);
  const parts = match?.[4]?.split('/') ?? [];
  if (!match || match[2] !== match[3].at(-1) || parts.some(s => bad.has(s)) || ![1, 2, 3].includes(parts.length))
    throw Error('Invalid canonical Course-owned Assessment draft path');
  const courseRoot = match[1],
    placement = match[4];
  const parentPath =
    parts.length === 1 ? courseRoot + '/index.ts' : courseRoot + '/' + parts.slice(0, -1).join('/') + '/index.ts';
  return {
    sourcePath,
    courseRoot,
    courseId: match[3],
    placement,
    parentPath,
    textbookRoot: courseRoot.split('/').slice(0, 2).join('/'),
  };
}
export async function inspectAssessment(number, parentNumber, expected) {
  const repo = process.env.GITHUB_REPOSITORY;
  const base = process.env.COURSE_DEFAULT_BRANCH;
  if (
    !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '') ||
    !base ||
    !Number.isSafeInteger(number) ||
    number < 1 ||
    !Number.isSafeInteger(parentNumber) ||
    parentNumber < 1 ||
    parentNumber === number
  )
    throw Error('Invalid Assessment/parent PR identity');
  const pr = await github('pulls/' + number);
  const parent = await github('pulls/' + parentNumber);
  if (
    pr?.state !== 'open' ||
    !pr.draft ||
    pr.head?.repo?.full_name !== repo ||
    parent?.state !== 'open' ||
    parent.head?.repo?.full_name !== repo ||
    parent.base?.ref !== base ||
    pr.base?.repo?.full_name !== repo ||
    pr.base.ref !== parent.head.ref ||
    pr.base.sha !== parent.head.sha ||
    !safeBranch(pr.head.ref, parent.head.ref) ||
    !SHA.test(pr.head.sha ?? '') ||
    !SHA.test(parent.head.sha ?? '')
  )
    throw Error('Open same-repository Draft Assessment PR targeting the actual owning Course branch required');
  if (expected && (expected.head !== pr.head.sha || expected.parentHead !== parent.head.sha))
    throw Error('Assessment or owning Course HEAD changed since authorization');
  const comparison = await github('compare/' + parent.head.sha + '...' + pr.head.sha);
  if (comparison?.merge_base_commit?.sha !== parent.head.sha || comparison.status !== 'ahead')
    throw Error('Assessment must be based on the exact current owning Course HEAD');
  const identity = discoverAssessmentDraft(await github('pulls/' + number + '/files?per_page=100'));
  const resource = async (filename, sha) => {
    const data = await github('contents/' + filename.split('/').map(encodeURIComponent).join('/') + '?ref=' + sha);
    if (
      data?.type !== 'file' ||
      data.path !== filename ||
      !SHA.test(data.sha ?? '') ||
      !Number.isSafeInteger(data.size) ||
      data.size < 1 ||
      data.size > 2 * 1024 * 1024
    )
      throw Error('Missing or invalid pinned source: ' + filename);
    return data.sha;
  };
  const sourceBlobSha = await resource(identity.sourcePath, pr.head.sha);
  const handoffBlobSha = await resource(identity.sourcePath, parent.head.sha);
  const parentBlobSha = await resource(identity.parentPath, parent.head.sha);
  const stubBlobSha = await resource(identity.sourcePath.replace(/draft\.ts$/, 'stub.ts'), parent.head.sha);
  const again = await github('pulls/' + number);
  const parentAgain = await github('pulls/' + parentNumber);
  if (
    again?.state !== 'open' ||
    !again.draft ||
    again.head?.sha !== pr.head.sha ||
    again.head?.ref !== pr.head.ref ||
    again.head?.repo?.full_name !== repo ||
    again.base?.sha !== parent.head.sha ||
    again.base?.ref !== parent.head.ref ||
    again.base?.repo?.full_name !== repo ||
    parentAgain?.state !== 'open' ||
    parentAgain.head?.sha !== parent.head.sha ||
    parentAgain.head?.ref !== parent.head.ref ||
    parentAgain.head?.repo?.full_name !== repo ||
    parentAgain.base?.ref !== base
  )
    throw Error('Assessment or parent PR changed during source discovery');
  return {
    repo,
    number,
    parentNumber,
    branch: pr.head.ref,
    parentBranch: parent.head.ref,
    head: pr.head.sha,
    parentHead: parent.head.sha,
    ...identity,
    sourceBlobSha,
    handoffBlobSha,
    parentBlobSha,
    stubBlobSha,
  };
}
async function main() {
  if (
    !process.env.COURSE_DEFAULT_BRANCH ||
    process.env.GITHUB_REF !== 'refs/heads/' + process.env.COURSE_DEFAULT_BRANCH
  )
    throw Error('Assessment materialization requires the trusted default branch');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const actor = process.env.GITHUB_ACTOR;
  const name = process.env.GITHUB_EVENT_NAME;
  const number = materializationInvocation(event, name, actor, '/assessment materialize', ['parent_pr']);
  await requireActor(actor);
  const parentNumber = await discoverOwningCourse(number);
  if (name === 'workflow_dispatch' && Number(event.inputs?.parent_pr) !== parentNumber)
    throw Error('Manual parent PR must match the actual owning Course PR');
  const meta = { ...(await inspectAssessment(number, parentNumber)), actor };
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    'meta=' + Buffer.from(JSON.stringify(meta)).toString('base64') + '\nhead=' + meta.head + '\n',
  );
}
if (process.argv[1]?.endsWith('/assessment-gate.mjs'))
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
