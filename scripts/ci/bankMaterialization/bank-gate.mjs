#!/usr/bin/env node
/**
 * @fileoverview Trusted authorization for PR-command Question/Flashcard
 * materialization. This module supplies typed Bank command safety primitives and must
 * never load code from a candidate PR.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';

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
