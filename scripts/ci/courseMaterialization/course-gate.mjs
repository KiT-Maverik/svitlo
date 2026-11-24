#!/usr/bin/env node
/**
 * @fileoverview Shared trusted GitHub, authorization and Git blob utilities
 * for the typed Course Stage 5 gate and atomic publisher.
 * Candidate PR source is untrusted; only default-branch code may execute.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';

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

/** Resolve an exact created PR comment or the explicitly supported dispatch inputs. */
export function materializationInvocation(event, name, actor, command, extraInputs = []) {
  if (!/^[A-Za-z0-9-]+$/.test(actor ?? '')) throw Error('Invalid invoking actor');
  let number;
  if (name === 'issue_comment') {
    if (
      event.action !== 'created' ||
      !event.issue?.pull_request ||
      event.comment?.user?.login !== actor ||
      event.comment?.body !== command
    )
      throw Error('Requires exact created top-level PR command');
    number = event.issue.number;
  } else if (name === 'workflow_dispatch') {
    if (Object.keys(event.inputs ?? {}).some(key => !['pr_number', ...extraInputs].includes(key)))
      throw Error('Unsupported materialization dispatch input');
    number = Number(event.inputs?.pr_number);
  } else throw Error('Unsupported materialization event');
  if (!Number.isSafeInteger(number) || number < 1) throw Error('Invalid materialization PR number');
  return number;
}
