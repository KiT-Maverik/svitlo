#!/usr/bin/env node
/**
 * @fileoverview Trusted authorization for PR-command Question/Flashcard
 * materialization. This module supplies typed Bank command safety primitives and must
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
  return { id, pkg, parent, bank, folder };
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
export function report(message) {
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, message + '\n');
}
