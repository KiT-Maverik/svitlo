#!/usr/bin/env node
/** Trusted bank command gate. Identity comes from pinned Git paths, not PR prose. */
import fs from 'node:fs';
import { github, requireActor, safeBranch, report } from './bank-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const UUID = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
const PATH = new RegExp(
  '^(content/[a-z][a-z0-9-]*)/data/lessons/([a-f0-9])/(' + UUID + ')/(questions|flashcards)/draft\\.ts$',
);
const COMMANDS = { '/questions materialize': 'questions', '/flashcards materialize': 'flashcards' };

export function typedCommand(event, name, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor || '')) throw Error('Invalid invocation actor');
  let number, bank;
  if (name === 'issue_comment') {
    if (
      event.action !== 'created' ||
      !event.issue?.pull_request ||
      event.comment?.user?.login !== actor ||
      !Object.hasOwn(COMMANDS, event.comment.body)
    )
      throw Error('Requires exact top-level typed Bank PR command');
    number = event.issue.number;
    bank = COMMANDS[event.comment.body];
  } else if (name === 'workflow_dispatch') {
    if (
      !['questions', 'flashcards'].includes(event.inputs?.bank) ||
      Object.keys(event.inputs ?? {}).some(key => !['pr_number', 'bank'].includes(key))
    )
      throw Error('Invalid Bank dispatch inputs');
    number = Number(event.inputs.pr_number);
    bank = event.inputs.bank;
  } else throw Error('Unsupported Bank event');
  if (!Number.isSafeInteger(number) || number < 1 || number > 999999999) throw Error('Invalid Bank PR number');
  return { number, bank, actor };
}

export function bankSourceIdentity(filename, bank) {
  const match = typeof filename === 'string' && filename.match(PATH);
  if (!match || match[2] !== match[3].at(-1) || match[4] !== bank) throw Error('Invalid canonical Bank draft path');
  return { id: match[3], pkg: match[1], folder: match[1] + '/data/lessons/' + match[2] + '/' + match[3], bank };
}

export async function inspectTyped(number, bank, expected) {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '') || !['questions', 'flashcards'].includes(bank))
    throw Error('Invalid Bank repository or kind');
  const pr = await github('pulls/' + number);
  if (
    pr?.state !== 'open' ||
    !pr.draft ||
    pr.head?.repo?.full_name !== repo ||
    pr.base?.repo?.full_name !== repo ||
    !SHA.test(pr.head?.sha ?? '') ||
    !SHA.test(pr.base?.sha ?? '') ||
    !safeBranch(pr.head?.ref, pr.base?.ref)
  )
    throw Error('Expected open same-repository Draft bank PR');
  const comparison = await github('compare/' + pr.base.sha + '...' + pr.head.sha);
  if (
    comparison?.merge_base_commit?.sha !== pr.base.sha ||
    comparison.status !== 'ahead' ||
    !Array.isArray(comparison.files) ||
    comparison.files.length !== 1 ||
    comparison.files[0].status === 'removed'
  )
    throw Error('Bank PR must change exactly one draft.ts on the current Lesson base');
  const sourcePath = comparison.files[0].filename;
  const identity = bankSourceIdentity(sourcePath, bank);
  const sourceFile = await github(
    'contents/' + sourcePath.split('/').map(encodeURIComponent).join('/') + '?ref=' + pr.head.sha,
  );
  if (
    sourceFile?.type !== 'file' ||
    sourceFile.path !== sourcePath ||
    sourceFile.sha !== comparison.files[0].sha ||
    !SHA.test(sourceFile.sha ?? '') ||
    !Number.isSafeInteger(sourceFile.size) ||
    sourceFile.size < 1 ||
    sourceFile.size > 1024 * 1024
  )
    throw Error('Pinned typed Bank source is missing, changed or oversized');
  const lessonPath = identity.folder + '/index.ts';
  const lesson = await github(
    'contents/' + lessonPath.split('/').map(encodeURIComponent).join('/') + '?ref=' + pr.base.sha,
  );
  if (lesson?.type !== 'file' || lesson.path !== lessonPath || !SHA.test(lesson.sha ?? ''))
    throw Error('Owning Lesson source is absent at the Bank target revision');
  const again = await github('pulls/' + number);
  if (
    again?.state !== 'open' ||
    !again.draft ||
    again.head?.sha !== pr.head.sha ||
    again.head?.ref !== pr.head.ref ||
    again.base?.sha !== pr.base.sha ||
    again.base?.ref !== pr.base.ref ||
    again.head?.repo?.full_name !== repo ||
    again.base?.repo?.full_name !== repo
  )
    throw Error('Bank PR changed during source discovery');
  const result = {
    repo,
    number,
    bank,
    branch: pr.head.ref,
    base: pr.base.ref,
    baseHead: pr.base.sha,
    head: pr.head.sha,
    sourceBlob: sourceFile.sha,
    sourcePath,
    lessonBlob: lesson.sha,
    identity,
  };
  if (expected && JSON.stringify(expected) !== JSON.stringify(result))
    throw Error('Bank SHA/branch/identity changed: rerun command');
  return result;
}

async function resolve() {
  if (!process.env.BANK_DEFAULT_BRANCH || process.env.GITHUB_REF !== 'refs/heads/' + process.env.BANK_DEFAULT_BRANCH)
    throw Error('Bank materialization requires the trusted default branch');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const command = typedCommand(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(command.actor);
  const info = await inspectTyped(command.number, command.bank);
  const meta = { ...info, actor: command.actor };
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    'meta=' +
      Buffer.from(JSON.stringify(meta)).toString('base64') +
      '\npr=' +
      info.number +
      '\nhead=' +
      info.head +
      '\nbranch=' +
      info.branch +
      '\n',
  );
  report('Authorized typed ' + info.bank + ' source ' + info.sourceBlob + ' at PR HEAD ' + info.head);
}
if (process.argv[1]?.endsWith('/bank-typed-gate.mjs')) {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) throw Error('Usage: bank-typed-gate.mjs resolve');
  resolve().catch(error => {
    report('Typed Bank authorization denied: ' + error.message);
    process.exitCode = 1;
  });
}
