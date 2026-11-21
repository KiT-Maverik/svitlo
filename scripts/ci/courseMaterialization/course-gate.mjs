#!/usr/bin/env node
/**
 * @fileoverview Trusted Course Stage 5 authorization. Resolve exactly one
 * canonical source from the PR's changed-file inventory at a pinned HEAD,
 * never from editable PR-description prose or stage checkboxes.
 * PR files are untrusted data; only default-branch code may execute.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const SHA = /^[0-9a-f]{40}$/;
const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
const COURSE_YAML =
  /^(content\/[a-z][a-z0-9-]*)\/data\/courses\/([0-9a-f])\/([0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})\/course\.yaml$/;

export function discoverCourseSource(files) {
  if (!Array.isArray(files) || files.length > 3000)
    throw Error('Invalid or oversized Course PR changed-file inventory');
  const candidates = [];
  const paths = new Set();
  for (const file of files) {
    const filename = file?.filename;
    if (typeof filename !== 'string' || typeof file.status !== 'string')
      throw Error('Malformed Course PR changed-file entry');
    if (!filename.endsWith('/course.yaml')) continue;
    const match = filename.match(COURSE_YAML);
    if (!match || match[2] !== match[3].at(-1)) throw Error('Noncanonical Course YAML path in PR: ' + filename);
    if (paths.has(filename)) throw Error('Duplicate Course YAML path in PR');
    paths.add(filename);
    if (file.status !== 'removed') {
      if (!['added', 'modified', 'renamed'].includes(file.status)) throw Error('Unsupported Course YAML change status');
      candidates.push({ id: match[3], pkg: match[1], yaml: filename });
    }
  }
  if (candidates.length !== 1)
    throw Error('Exactly one canonical changed Course course.yaml required; found ' + candidates.length);
  return candidates[0];
}

export function parseTrigger(event, kind, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor ?? '')) throw Error('Invalid invoking actor');
  let number;
  if (kind === 'issue_comment') {
    if (!event.issue?.pull_request || event.comment?.user?.login !== actor)
      throw Error('Only top-level PR comments from the actor are accepted');
    if (event.comment.body !== '/course materialize') throw Error('Expected exact /course materialize command');
    number = event.issue.number;
  } else if (kind === 'workflow_dispatch') {
    number = Number(event.inputs?.pr_number);
  } else throw Error('Unsupported event');
  if (!Number.isSafeInteger(number) || number < 1 || number > 999999999) throw Error('Invalid Course PR number');
  return { number, operation: 'materialize', actor };
}

export function safeBranch(name, base) {
  return (
    typeof name === 'string' &&
    /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(name) &&
    name !== base &&
    !name.includes('..') &&
    !name.includes('//') &&
    !name.endsWith('/') &&
    !name.endsWith('.lock') &&
    !name.includes('/.') &&
    !name.startsWith('.') &&
    !name.includes('@{')
  );
}

export function validateArtifactPath(filename, identity, operation) {
  if (
    operation !== 'materialize' ||
    typeof filename !== 'string' ||
    filename.length > 300 ||
    filename.startsWith('/') ||
    filename.includes('\\') ||
    filename.includes('..') ||
    filename.includes('//') ||
    filename.includes('\0')
  )
    return false;
  if (filename === identity.yaml) return true;
  if (!UUID.test(identity.id) || !PACKAGE.test(identity.pkg)) return false;
  const base = identity.pkg + '/data/courses/' + identity.id.at(-1) + '/' + identity.id + '/';
  const relative = filename.startsWith(base) ? filename.slice(base.length) : null;
  if (relative !== null) {
    if (['index.ts', 'constants.ts', 'review.ts', 'methodology.md'].includes(relative)) return true;
    if (/^content\/(?:[a-z][A-Za-z0-9]*\/){1,3}(?:index\.ts|methodology\.md)$/.test(relative)) return true;
  }
  const prefix = identity.pkg + '/data/lessons/';
  const match = filename.startsWith(prefix)
    ? filename.slice(prefix.length).match(/^([0-9a-f])\/([0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12})\/lesson\.yaml$/)
    : null;
  return !!match && match[1] === match[2].at(-1);
}

export function gitBlob(bytes) {
  const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  return createHash('sha1')
    .update('blob ' + buffer.length + '\0')
    .update(buffer)
    .digest('hex');
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

async function changedPrFiles(number) {
  const files = [];
  for (let page = 1; page <= 30; page++) {
    const batch = await github('pulls/' + number + '/files?per_page=100&page=' + page);
    if (!Array.isArray(batch)) throw Error('Missing PR changed-file inventory');
    files.push(...batch);
    if (batch.length < 100) return files;
  }
  throw Error('PR exceeds the safe 3000-file authorization bound');
}

export async function inspect(number, expectedHead) {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '')) throw Error('Invalid repository');
  const pr = await github('pulls/' + number);
  const base = process.env.COURSE_DEFAULT_BRANCH || 'main';
  if (
    !pr ||
    pr.state !== 'open' ||
    !pr.draft ||
    pr.base?.ref !== base ||
    pr.head?.repo?.full_name !== repo ||
    !SHA.test(pr.head?.sha ?? '') ||
    !safeBranch(pr.head?.ref, base)
  )
    throw Error('Open same-repo Draft Course PR targeting ' + base + ' required');
  if (expectedHead && pr.head.sha !== expectedHead) throw Error('PR HEAD advanced; re-run the command');
  const identity = discoverCourseSource(await changedPrFiles(number));
  const encoded = identity.yaml.split('/').map(encodeURIComponent).join('/');
  const source = await github('contents/' + encoded + '?ref=' + pr.head.sha);
  if (
    !source ||
    source.type !== 'file' ||
    source.path !== identity.yaml ||
    !SHA.test(source.sha ?? '') ||
    source.size > 2 * 1024 * 1024
  )
    throw Error('Canonical course.yaml missing, oversized or not a regular pinned Git blob');
  const again = await github('pulls/' + number);
  if (again?.head?.sha !== pr.head.sha || again?.head?.ref !== pr.head.ref || again?.state !== 'open')
    throw Error('PR HEAD changed during Course source discovery');
  return {
    pr: number,
    head: pr.head.sha,
    branch: pr.head.ref,
    identity,
    sourceBlob: source.sha,
    repo,
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
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, message + '\n');
}

async function main() {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) throw Error('Usage: course-gate.mjs resolve');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const cmd = parseTrigger(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(cmd.actor);
  const pr = await inspect(cmd.number);
  const meta = Buffer.from(
    JSON.stringify({
      number: cmd.number,
      operation: cmd.operation,
      actor: cmd.actor,
      head: pr.head,
      branch: pr.branch,
      identity: pr.identity,
      sourceBlob: pr.sourceBlob,
      repo: pr.repo,
    }),
  ).toString('base64');
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'meta=' + meta + '\npr=' + cmd.number + '\nhead=' + pr.head + '\n');
  report(
    'Authorized Course materialization for PR #' +
      cmd.number +
      ', Course YAML blob ' +
      pr.sourceBlob +
      ', HEAD ' +
      pr.head,
  );
}

if (process.argv[1] && process.argv[1].endsWith('/course-gate.mjs')) {
  main().catch(error => {
    report('Course Stage 5 denied: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
