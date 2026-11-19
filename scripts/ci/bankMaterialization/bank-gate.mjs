#!/usr/bin/env node
/**
 * @fileoverview Trusted authorization for PR-command Question/Flashcard
 * materialization. This file executes only from the default branch and must
 * never load code from a candidate PR.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/;
const SHA = /^[a-f0-9]{40}$/;
const PKG = /^content\/(?:languages\/)?[a-z][a-z0-9-]*$/;
const STAGES = {
  questions: ['Lesson Analysis', 'Question Design', 'Quiz Section Design', 'Independent Assessment Review'],
  flashcards: ['Lesson Analysis', 'Flashcard Design', 'Flashcards Section Design', 'Memory Design Review'],
};
const MARKERS = {
  questions: '<!-- svitlo-create-questions-flow:v1 -->',
  flashcards: '<!-- svitlo-create-flashcards-flow:v1 -->',
};
export const supportedBanks = Object.keys(STAGES);
export function parseTrigger(event, eventName, actor) {
  if (!/^[a-zA-Z0-9-]+$/.test(actor || '')) throw Error('Invalid actor');
  let number, bank;
  if (eventName === 'issue_comment') {
    if (!event.issue?.pull_request || event.comment?.user?.login !== actor)
      throw Error('Only exact top-level PR comments are supported');
    if (!['/questions materialize', '/flashcards materialize'].includes(event.comment.body))
      throw Error('Unknown command');
    bank = event.comment.body.slice(1).split(' ')[0];
    number = event.issue.number;
  } else if (eventName === 'workflow_dispatch') {
    bank = event.inputs?.bank;
    number = Number(event.inputs?.pr_number);
  } else throw Error('Unsupported GitHub event');
  if (!supportedBanks.includes(bank) || !Number.isSafeInteger(number) || number < 1 || number > 999999999)
    throw Error('Invalid PR number or bank');
  return { actor, number, bank };
}
export function parseIdentity(body, bank) {
  if (typeof body !== 'string' || !supportedBanks.includes(bank) || body.split(MARKERS[bank]).length !== 2)
    throw Error('Bank PR requires exactly one matching Flow marker');
  function value(label) {
    const expression = new RegExp('^- ' + label + ':\\s*(.+?)\\s*$', 'gm');
    const hits = [...body.matchAll(expression)];
    if (hits.length !== 1) throw Error('Exactly one - ' + label + ': field required');
    return hits[0][1].trim().replace(/^\x60|\x60$/g, '');
  }
  const id = value('Lesson UUID').toLowerCase();
  const pkg = value('Textbook');
  const parentMatch = /^#([1-9]\d*)$/.exec(value('Parent Lesson PR'));
  if (!UUID.test(id) || !PKG.test(pkg) || !parentMatch)
    throw Error('Invalid bank Lesson UUID, textbook or Parent Lesson PR');
  const parent = Number(parentMatch[1]);
  if (!Number.isSafeInteger(parent)) throw Error('Invalid parent PR');
  const folder = pkg + '/data/lessons/' + id.at(-1) + '/' + id;
  return { id, pkg, parent, bank, folder, yaml: folder + '/' + bank + '.yaml' };
}
export function requireReviewedStages(body, bank) {
  const headings = [...body.matchAll(/^## Workflow[ \t]*$/gm)];
  if (headings.length !== 1) throw Error('Exactly one ## Workflow checklist required');
  const from = headings[0].index + headings[0][0].length;
  const rest = body.slice(from);
  const end = rest.search(/^##[ \t]+/m);
  const section = end < 0 ? rest : rest.slice(0, end);
  const entries = [...section.matchAll(/^[ \t]*- \[([ xX])\][ \t]+([1-7])\.[ \t]+([^\r\n]*)$/gm)];
  for (let i = 0; i < STAGES[bank].length; i++) {
    const matches = entries.filter(m => Number(m[2]) === i + 1);
    const label = STAGES[bank][i];
    if (
      matches.length !== 1 ||
      matches[0][1].toLowerCase() !== 'x' ||
      !(
        matches[0][3] === label ||
        [' —', ' –', ' -', ':'].some(separator => matches[0][3].startsWith(label + separator))
      )
    )
      throw Error('Stage ' + (i + 1) + ' ' + label + ' must be completed exactly once');
  }
  const fifth = entries.filter(m => Number(m[2]) === 5);
  if (fifth.length !== 1 || !fifth[0][3].startsWith('Resource Production') || fifth[0][1].toLowerCase() === 'x')
    throw Error('Expected one pending Stage 5 Resource Production item');
}
export function safeBranch(branch, base) {
  return (
    typeof branch === 'string' &&
    /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(branch) &&
    branch !== base &&
    !branch.includes('..') &&
    !branch.includes('//') &&
    !branch.includes('/.') &&
    !branch.endsWith('/') &&
    !branch.endsWith('.lock') &&
    !branch.includes('@{')
  );
}
export function allowedPath(filename, identity) {
  if (
    typeof filename !== 'string' ||
    filename.length > 450 ||
    filename.includes('..') ||
    filename.includes('//') ||
    filename.includes('\\') ||
    filename.includes('\0') ||
    filename.startsWith('/')
  )
    return false;
  const base = identity.folder + '/' + identity.bank + '/';
  if (!filename.startsWith(base)) return false;
  const relative = filename.slice(base.length);
  if (identity.bank === 'flashcards') return relative === 'index.ts';
  // Only the current Question renderer's recursively nested TS and local text.
  return /^(?:[a-zA-Z][a-zA-Z0-9]*\/){0,16}(?:index\.ts|markdown\.md|[a-z]{2}(?:-[a-zA-Z0-9]+)?\.md|code\.[a-z0-9]+|specification\.md)$/.test(
    relative,
  );
}
export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}
export function gitBlob(bytes) {
  const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  return createHash('sha1')
    .update('blob ' + buf.length + '\0')
    .update(buf)
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
  if (!response.ok) throw Error('GitHub HTTP ' + response.status + ' for ' + route);
  return response.status === 204 ? null : response.json();
}
export async function requireActor(actor) {
  const result = await github('collaborators/' + encodeURIComponent(actor) + '/permission');
  if (!['write', 'maintain', 'admin'].includes(result?.permission))
    throw Error('Write/maintain/admin permission required');
}
function parentIdentity(body) {
  if (typeof body !== 'string' || !body.includes('<!-- svitlo-create-lesson-flow:v1 -->')) return null;
  const m =
    /^- Lesson UUID \/ textbook \/ slug:\s*\x60?([a-f0-9-]{36})\x60?\s*\/\s*\x60?(content\/(?:languages\/)?[a-z][a-z0-9-]*)/m.exec(
      body,
    );
  return m ? { id: m[1], pkg: m[2] } : null;
}
export async function inspect(number, bank, previous = undefined) {
  const repo = process.env.GITHUB_REPOSITORY;
  const pr = await github('pulls/' + number);
  if (
    !pr ||
    pr.state !== 'open' ||
    !pr.draft ||
    pr.head?.repo?.full_name !== repo ||
    !SHA.test(pr.head?.sha || '') ||
    !safeBranch(pr.head.ref, pr.base?.ref)
  )
    throw Error('Expected open same-repo Draft bank PR on a safe branch');
  const identity = parseIdentity(pr.body, bank);
  requireReviewedStages(pr.body, bank);
  if (number === identity.parent) throw Error('Bank PR cannot parent itself');
  const parent = await github('pulls/' + identity.parent);
  const parsed = parentIdentity(parent?.body);
  if (
    !parent ||
    (parent.state === 'closed' && !parent.merged) ||
    !parsed ||
    parsed.id !== identity.id ||
    parsed.pkg !== identity.pkg
  )
    throw Error('Verified parent Lesson PR identity missing or mismatched');
  if (parent.state === 'open' && pr.base?.ref !== parent.head?.ref)
    throw Error('Child bank PR must target the actual parent Lesson branch');
  if (parent.merged) {
    if (!SHA.test(parent.merge_commit_sha || '')) throw Error('Merged Lesson parent has no verifiable merge commit');
    if (pr.base?.ref !== parent.base?.ref && pr.base?.ref !== (process.env.BANK_DEFAULT_BRANCH || 'main'))
      throw Error('Merged Lesson child must target former integration or current default branch');
    // A nested Course->Lesson branch may already have been merged to main.
    // Verify the actual parent merge is an ancestor of the bank target base.
    const comparison = await github('compare/' + parent.merge_commit_sha + '...' + pr.base.sha);
    if (!['ahead', 'identical'].includes(comparison?.status))
      throw Error('Bank base does not include the merged parent Lesson source');
  }
  if (
    bank === 'flashcards' &&
    !/Questions(?: \(own bank\))?:[ \t]*(?:Completed(?:[ \t]|@)|Not Applicable(?:[ \t]|—|:))/i.test(parent.body)
  )
    throw Error('Parent Lesson must record completed Questions or approved Questions N/A');
  const source = await github(
    'contents/' + identity.yaml.split('/').map(encodeURIComponent).join('/') + '?ref=' + pr.head.sha,
  );
  if (source?.type !== 'file' || !SHA.test(source.sha || ''))
    throw Error('Canonical bank YAML not found as regular Git blob');
  const result = {
    number,
    bank,
    repo,
    branch: pr.head.ref,
    base: pr.base.ref,
    head: pr.head.sha,
    sourceBlob: source.sha,
    identity,
  };
  if (previous && JSON.stringify(previous) !== JSON.stringify(result))
    throw Error('Bank PR head, source, identity or branch changed; re-run command');
  return result;
}
export function report(message) {
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, message + '\n');
}
async function resolve() {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const command = parseTrigger(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(command.actor);
  const info = await inspect(command.number, command.bank);
  const meta = { ...info, actor: command.actor };
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    'meta=' +
      Buffer.from(JSON.stringify(meta)).toString('base64') +
      '\npr=' +
      info.number +
      '\nhead=' +
      info.head +
      '\n',
  );
  report(
    'Authorized ' + info.bank + ' PR #' + info.number + ': source blob ' + info.sourceBlob + ', head ' + info.head,
  );
}
if (process.argv[1] && process.argv[1].endsWith('/bank-gate.mjs')) {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) throw Error('Usage: bank-gate.mjs resolve');
  resolve().catch(e => {
    report('Bank CI authorization denied: ' + e.message);
    process.exitCode = 1;
  });
}
