/** Authorization and identity gate. Only the pinned default-branch implementation runs. */
import fs from 'node:fs';
import { github, requireActor, safeBranch } from '../courseMaterialization/course-gate.mjs';
import { selectStage4Review } from '../courseMaterialization/typed-course-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const UUID = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
const pathPattern = new RegExp('^(content/[a-z][a-z0-9-]*/data/courses/([a-f0-9])/(' + UUID +
  '))/(content/(?:[A-Za-z][A-Za-z0-9]*/){0,2}[A-Za-z][A-Za-z0-9]*)/draft\\.ts$');
const bad = new Set(['constructor','prototype','__proto__']);
export function discoverEpisodeDraft(files) {
  if (!Array.isArray(files) || files.length !== 1 || files[0]?.status !== 'modified')
    throw Error('Episode PR must modify only its existing allocated draft.ts before Stage 5');
  const sourcePath = files[0].filename;
  const match = typeof sourcePath === 'string' && sourcePath.match(pathPattern);
  if (!match || match[2] !== match[3].at(-1) || match[4].split('/').some(s => bad.has(s)))
    throw Error('Invalid canonical Course-owned Episode draft path');
  const courseRoot = match[1], placement = match[4];
  const parentPath = placement.split('/').length === 2 ? courseRoot + '/index.ts' :
    courseRoot + '/' + placement.split('/').slice(0, -1).join('/') + '/index.ts';
  return { sourcePath, courseRoot, courseId: match[3], placement, parentPath,
    textbookRoot: courseRoot.split('/').slice(0,2).join('/') };
}
export async function inspectEpisode(number, parentNumber, expected) {
  const repo = process.env.GITHUB_REPOSITORY;
  const base = process.env.COURSE_DEFAULT_BRANCH;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '') || !base ||
      !Number.isSafeInteger(number) || number < 1 || !Number.isSafeInteger(parentNumber) ||
      parentNumber < 1 || parentNumber === number) throw Error('Invalid Episode/parent PR identity');
  const pr = await github('pulls/' + number);
  const parent = await github('pulls/' + parentNumber);
  if (pr?.state !== 'open' || !pr.draft || pr.head?.repo?.full_name !== repo ||
      parent?.state !== 'open' || parent.head?.repo?.full_name !== repo || parent.base?.ref !== base ||
      pr.base?.repo?.full_name !== repo || pr.base.ref !== parent.head.ref || pr.base.sha !== parent.head.sha ||
      !safeBranch(pr.head.ref, parent.head.ref) || !SHA.test(pr.head.sha ?? '') || !SHA.test(parent.head.sha ?? ''))
    throw Error('Open same-repository Draft Episode PR targeting the actual owning Course branch required');
  if (expected && (expected.head !== pr.head.sha || expected.parentHead !== parent.head.sha))
    throw Error('Episode or owning Course HEAD changed since authorization');
  const comparison = await github('compare/' + parent.head.sha + '...' + pr.head.sha);
  if (comparison?.merge_base_commit?.sha !== parent.head.sha || comparison.status !== 'ahead')
    throw Error('Episode must be based on the exact current owning Course HEAD');
  const identity = discoverEpisodeDraft(await github('pulls/' + number + '/files?per_page=100'));
  const resource = async (filename, sha) => {
    const data = await github('contents/' + filename.split('/').map(encodeURIComponent).join('/') + '?ref=' + sha);
    if (data?.type !== 'file' || data.path !== filename || !SHA.test(data.sha ?? '') ||
        !Number.isSafeInteger(data.size) || data.size < 1 || data.size > 2 * 1024 * 1024)
      throw Error('Missing or invalid pinned source: ' + filename);
    return data.sha;
  };
  const sourceBlobSha = await resource(identity.sourcePath, pr.head.sha);
  const handoffBlobSha = await resource(identity.sourcePath, parent.head.sha);
  const parentBlobSha = await resource(identity.parentPath, parent.head.sha);
  const reviews = await github('pulls/' + number + '/reviews?per_page=100');
  if (!Array.isArray(reviews) || reviews.length >= 100) throw Error('Incomplete Episode review listing');
  const permissions = Object.create(null);
  for (const review of reviews) {
    const login = review.user?.login;
    if (/^[A-Za-z0-9-]+$/.test(login ?? '') && !Object.hasOwn(permissions, login.toLowerCase()))
      permissions[login.toLowerCase()] = (await github('collaborators/' + login + '/permission'))?.permission ?? 'none';
  }
  const approved = selectStage4Review(reviews, pr, permissions);
  return { repo, number, parentNumber, branch: pr.head.ref, parentBranch: parent.head.ref,
    head: pr.head.sha, parentHead: parent.head.sha, ...identity, sourceBlobSha, handoffBlobSha,
    parentBlobSha, reviewer: approved.user.login, reviewCommitSha: approved.commit_id,
    evidenceUrl: approved.html_url || 'https://github.com/' + repo + '/pull/' + number + '#pullrequestreview-' + approved.id };
}
async function main() {
  if (process.env.GITHUB_EVENT_NAME !== 'workflow_dispatch' ||
      process.env.GITHUB_REF !== 'refs/heads/' + process.env.COURSE_DEFAULT_BRANCH)
    throw Error('Episode materialization requires trusted default-branch manual dispatch');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const actor = process.env.GITHUB_ACTOR;
  await requireActor(actor);
  const meta = { ...(await inspectEpisode(Number(event.inputs.pr_number), Number(event.inputs.parent_pr))), actor };
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'meta=' + Buffer.from(JSON.stringify(meta)).toString('base64') + '\nhead=' + meta.head + '\n');
}
if (process.argv[1]?.endsWith('/episode-gate.mjs'))
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
