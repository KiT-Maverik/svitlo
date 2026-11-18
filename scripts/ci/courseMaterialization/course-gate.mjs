#!/usr/bin/env node
/**
 * @fileoverview Trusted Course Stage 5 authorization and independent Stage 4 gate.
 * All PR source is treated as data; no checkboxes or PR-body claims grant approval.
 */
import fs from 'node:fs';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const SHA = /^[0-9a-f]{40}$/;
const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
const MARKER = '<!-- svitlo-course-flow:v1 -->';
const roles = ['methodologist', 'assessment-architect'];

export function parseIdentity(body) {
  if (typeof body !== 'string' || body.split(MARKER).length !== 2)
    throw Error('Exactly one Course Flow marker required');
  function field(label) {
    const expression = new RegExp('^- ' + label + ':\\s*[\x60]?([^\x60\\r\\n]+)[\x60]?\\s*$', 'gm');
    const hits = [...body.matchAll(expression)];
    if (hits.length !== 1) throw Error('Exactly one ' + label + ' required');
    return hits[0][1].trim();
  }
  const id = field('Course UUID').toLowerCase();
  const pkg = field('Textbook');
  if (!UUID.test(id) || !PACKAGE.test(pkg)) throw Error('Invalid Course UUID or package');
  const yaml = pkg + '/data/courses/' + id.at(-1) + '/' + id + '/course.yaml';
  if (field('Single temporary source plan') !== yaml)
    throw Error('Plan path does not match canonical Course UUID bucket');
  return { id, pkg, yaml };
}

export function parseTrigger(event, kind, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor ?? '')) throw Error('Invalid invoking actor');
  let number, operation;
  if (kind === 'issue_comment') {
    if (!event.issue?.pull_request || event.comment?.user?.login !== actor)
      throw Error('Only top-level PR comments from the actor are accepted');
    const command = event.comment.body;
    if (!['/course materialize', '/course finalize'].includes(command))
      throw Error('Expected exact /course materialize or /course finalize command');
    number = event.issue.number;
    operation = command.slice('/course '.length);
  } else if (kind === 'workflow_dispatch') {
    number = Number(event.inputs?.pr_number);
    operation = event.inputs?.operation;
    if (!['materialize', 'finalize'].includes(operation))
      throw Error('Dispatch operation must be materialize or finalize');
  } else throw Error('Unsupported event');
  if (!Number.isSafeInteger(number) || number < 1 || number > 999999999)
    throw Error('Invalid Course PR number');
  return { number, operation, actor };
}

export function parseReviewEvidence(body) {
  if (typeof body !== 'string') return null;
  const role = body.match(/^Stage 4 approval:\s*(methodologist|assessment-architect)\s*$/im);
  const id = body.match(/^Course UUID:\s*\x60?([0-9a-f-]{36})\x60?\s*$/im);
  const blob = body.match(/^Course YAML blob:\s*\x60?([0-9a-f]{40})\x60?\s*$/im);
  if (!role || !id || !blob || !UUID.test(id[1].toLowerCase())) return null;
  return { role: role[1].toLowerCase(), id: id[1].toLowerCase(), blob: blob[1].toLowerCase() };
}

export function safeBranch(name, base) {
  return typeof name === 'string' &&
    /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(name) &&
    name !== base && !name.includes('..') && !name.includes('//') &&
    !name.endsWith('/') && !name.endsWith('.lock') && !name.includes('/.') &&
    !name.startsWith('.') && !name.includes('@{');
}

export function validateArtifactPath(filename, identity, operation) {
  if (typeof filename !== 'string' || filename.length > 300 ||
      filename.startsWith('/') || filename.includes('\\') || filename.includes('..') ||
      filename.includes('//') || filename.includes('\0')) return false;
  if (operation === 'finalize') return filename === identity.yaml;
  if (operation !== 'materialize') return false;
  const base = identity.pkg + '/data/courses/' + identity.id.at(-1) + '/' + identity.id + '/';
  const relative = filename.startsWith(base) ? filename.slice(base.length) : null;
  if (relative !== null) {
    if (['index.ts', 'constants.ts', 'review.ts', 'methodology.md'].includes(relative)) return true;
    if (/^(modules|chapters|episodes)\/(?:index|[a-z][A-Za-z0-9]*)\.ts$/.test(relative)) return true;
  }
  const prefix = identity.pkg + '/data/lessons/';
  const match = filename.startsWith(prefix) ?
    filename.slice(prefix.length).match(/^([0-9a-f])\/([0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})\/lesson\.yaml$/) : null;
  return !!match && match[1] === match[2].at(-1);
}

export function stageFourApprovals({ reviews, prAuthor, sourceAuthor, identity, blob, blobsAtCommits }) {
  const latest = new Map();
  for (const review of reviews) {
    const login = review.user?.login;
    if (login && ['APPROVED', 'DISMISSED', 'CHANGES_REQUESTED'].includes(review.state))
      latest.set(login.toLowerCase(), review);
  }
  const accepted = new Map();
  for (const review of latest.values()) {
    const login = review.user.login.toLowerCase();
    if (review.state !== 'APPROVED' || login === prAuthor?.toLowerCase() ||
        login === sourceAuthor?.toLowerCase()) continue;
    const evidence = parseReviewEvidence(review.body);
    if (!evidence || evidence.id !== identity.id || evidence.blob !== blob ||
        !roles.includes(evidence.role) || !SHA.test(review.commit_id ?? '')) continue;
    if (blobsAtCommits.get(review.commit_id) !== blob) continue;
    if (!accepted.has(evidence.role)) accepted.set(evidence.role, login);
  }
  if (accepted.size !== roles.length || accepted.get(roles[0]) === accepted.get(roles[1]))
    throw Error('Stage 4 requires independent GitHub APPROVED reviews by two distinct accounts (methodologist and assessment-architect), pinned to the current Course YAML Git blob; the PR/last source author cannot self-approve');
  return Object.fromEntries(accepted);
}

export async function github(route, method = 'GET', data) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) throw Error('GitHub token missing');
  const response = await fetch('https://api.github.com/repos/' + process.env.GITHUB_REPOSITORY + '/' + route, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(data === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw Error('GitHub HTTP ' + response.status + ' for ' + route);
  }
  return response.status === 204 ? null : response.json();
}

async function collect(route) {
  const result = [];
  for (let page = 1; page <= 10; page++) {
    const chunk = await github(route + (route.includes('?') ? '&' : '?') + 'per_page=100&page=' + page);
    if (!Array.isArray(chunk)) throw Error('GitHub returned an invalid list');
    result.push(...chunk);
    if (chunk.length < 100) return result;
  }
  throw Error('Pagination limit reached; fail closed');
}

export async function inspect(number, expectedHead) {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '')) throw Error('Invalid repository');
  const pr = await github('pulls/' + number);
  const base = process.env.COURSE_DEFAULT_BRANCH || 'main';
  if (!pr || pr.state !== 'open' || !pr.draft || pr.base?.ref !== base ||
      pr.head?.repo?.full_name !== repo || !SHA.test(pr.head?.sha ?? '') ||
      !safeBranch(pr.head?.ref, base))
    throw Error('Open same-repo Draft Course parent PR targeting ' + base + ' required');
  if (expectedHead && pr.head.sha !== expectedHead)
    throw Error('PR HEAD advanced; re-run the command');
  const identity = parseIdentity(pr.body);
  const encoded = identity.yaml.split('/').map(encodeURIComponent).join('/');
  const source = await github('contents/' + encoded + '?ref=' + pr.head.sha);
  if (!source || source.type !== 'file' || !SHA.test(source.sha ?? ''))
    throw Error('Canonical course.yaml missing or not a regular Git file');
  const authors = await github('commits?path=' + encodeURIComponent(identity.yaml) +
    '&sha=' + pr.head.sha + '&per_page=1');
  const sourceAuthor = authors?.[0]?.author?.login ?? authors?.[0]?.commit?.author?.name;
  if (!sourceAuthor || !pr.user?.login)
    throw Error('Cannot verify last Course YAML author and PR author');
  const reviews = await collect('pulls/' + number + '/reviews');
  const blobsAtCommits = new Map();
  for (const commitId of new Set(reviews.filter(r => r.state === 'APPROVED' && SHA.test(r.commit_id ?? ''))
    .map(r => r.commit_id))) {
    const revision = await github('contents/' + encoded + '?ref=' + commitId);
    blobsAtCommits.set(commitId, revision?.sha ?? null);
  }
  const reviewers = stageFourApprovals({
    reviews, prAuthor: pr.user.login, sourceAuthor, identity,
    blob: source.sha, blobsAtCommits,
  });
  for (const login of Object.values(reviewers)) {
    const permission = await github('collaborators/' + encodeURIComponent(login) + '/permission');
    if (!['write', 'maintain', 'admin'].includes(permission?.permission))
      throw Error('Reviewer lacks repository write permission: ' + login);
  }
  return {
    pr: number, head: pr.head.sha, branch: pr.head.ref, identity,
    sourceBlob: source.sha, repo, reviewers,
  };
}

export async function requireActor(actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor ?? '')) throw Error('Invalid invoking actor');
  const permission = await github('collaborators/' + actor + '/permission');
  if (!['write', 'maintain', 'admin'].includes(permission?.permission))
    throw Error('Write/maintain/admin permission required');
}

export function report(message) {
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY)
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, message + '\n');
}

async function main() {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3)
    throw Error('Usage: course-gate.mjs resolve');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const cmd = parseTrigger(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(cmd.actor);
  const pr = await inspect(cmd.number);
  const meta = Buffer.from(JSON.stringify({
    number: cmd.number, operation: cmd.operation, actor: cmd.actor, head: pr.head,
    branch: pr.branch, identity: pr.identity, sourceBlob: pr.sourceBlob, repo: pr.repo,
  })).toString('base64');
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'meta=' + meta + '\npr=' + cmd.number + '\nhead=' + pr.head + '\n');
  report('Authorized ' + cmd.operation + ' for PR #' + cmd.number + ', Course YAML blob ' + pr.sourceBlob +
    ', HEAD ' + pr.head);
}

if (process.argv[1] && process.argv[1].endsWith('/course-gate.mjs')) {
  main().catch(error => {
    report('Course Stage 5 denied: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
