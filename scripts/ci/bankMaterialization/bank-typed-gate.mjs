#!/usr/bin/env node
/**
 * Trusted authorization for the opt-in typed Bank Stage 5 command.
 * GitHub PR metadata and an independent, current-SHA APPROVED review are the
 * authority. A checked stage box or author-supplied flag is never an approval.
 * Legacy YAML commands continue through bank-gate.mjs unchanged.
 */
import fs from 'node:fs';
import { github, parseIdentity, requireActor, requireReviewedStages, safeBranch, report } from './bank-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const COMMANDS = {
  '/questions materialize typed': 'questions',
  '/flashcards materialize typed': 'flashcards',
};

export function typedCommand(event, name, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor || '')) throw Error('Invalid invocation actor');
  let number, bank;
  if (name === 'issue_comment') {
    if (!event.issue?.pull_request || event.comment?.user?.login !== actor ||
        !Object.hasOwn(COMMANDS, event.comment.body)) {
      throw Error('Requires exact top-level typed Bank PR command');
    }
    number = event.issue.number;
    bank = COMMANDS[event.comment.body];
  } else if (name === 'workflow_dispatch') {
    if (event.inputs?.mode !== 'typed' ||
        !['questions', 'flashcards'].includes(event.inputs?.bank)) {
      throw Error('Typed dispatch mode required');
    }
    number = Number(event.inputs.pr_number);
    bank = event.inputs.bank;
  } else throw Error('Unsupported Bank event');
  if (!Number.isSafeInteger(number) || number <= 0 || number > 999999999) {
    throw Error('Invalid Bank PR number');
  }
  return { number, bank, actor };
}

function parentIdentity(body) {
  if (typeof body !== 'string' || !body.includes('<!-- svitlo-create-lesson-flow:v1 -->')) return null;
  const match = /^- Lesson UUID \/ textbook \/ slug:\s*`?([a-f0-9-]{36})`?\s*\/\s*`?(content\/(?:languages\/)?[a-z][a-z0-9-]*)/m.exec(body);
  return match && { id: match[1], pkg: match[2] };
}

export async function inspectTyped(number, bank, expected) {
  const repo = process.env.GITHUB_REPOSITORY;
  const pr = await github('pulls/' + number);
  if (!pr || pr.state !== 'open' || !pr.draft || pr.head?.repo?.full_name !== repo ||
      !SHA.test(pr.head?.sha || '') || !safeBranch(pr.head.ref, pr.base?.ref)) {
    throw Error('Expected open same-repository Draft bank PR');
  }
  const identity = parseIdentity(pr.body, bank);
  // The current trusted Engine Git writer supports a single textbook package.
  if (!/^content\/[a-z][a-z0-9-]*$/.test(identity.pkg)) {
    throw Error('Current typed Bank writer cannot handle nested language textbook paths');
  }
  requireReviewedStages(pr.body, bank);
  if (identity.parent === number) throw Error('Bank PR cannot parent itself');
  const parent = await github('pulls/' + identity.parent);
  const source = parentIdentity(parent?.body);
  if (!parent || (parent.state !== 'open' && !parent.merged) ||
      !source || source.id !== identity.id || source.pkg !== identity.pkg) {
    throw Error('No verified owning Lesson PR/UUID correspondence');
  }
  if (parent.state === 'open' && pr.base?.ref !== parent.head?.ref) {
    throw Error('Typed Bank child must target its actual Lesson parent branch');
  }
  if (parent.merged) {
    if (!SHA.test(parent.merge_commit_sha || '') ||
        (pr.base?.ref !== parent.base?.ref &&
          pr.base?.ref !== process.env.BANK_DEFAULT_BRANCH)) {
      throw Error('Merged Lesson ancestry is not authorized');
    }
    const comparison = await github('compare/' + parent.merge_commit_sha + '...' + pr.base.sha);
    if (!['ahead', 'identical'].includes(comparison?.status)) {
      throw Error('Typed Bank target excludes merged Lesson');
    }
  }
  if (bank === 'flashcards' &&
      !/^.*Questions(?: \(own bank\))?:\s*(?:Completed|Not Applicable)\b/im.test(parent.body)) {
    throw Error('Flashcards need declared parent Questions-first completion or N/A');
  }
  const sourcePath = identity.folder + '/' + bank + '/index.ts';
  const sourceFile = await github('contents/' + sourcePath.split('/').map(encodeURIComponent).join('/') +
    '?ref=' + pr.head.sha);
  if (sourceFile?.type !== 'file' || !SHA.test(sourceFile.sha || '')) {
    throw Error('Exact reviewed Stage 3 bank index.ts is missing');
  }
  // Require an actual independent GitHub approval on this exact revision.
  // This cannot be created by editing a checklist or bank production fields.
  const reviews = await github('pulls/' + number + '/reviews?per_page=100');
  if (!Array.isArray(reviews) || reviews.length === 100) {
    throw Error('Bank review inventory must be complete (100-review pagination requires audit)');
  }
  const latest = new Map();
  for (const review of reviews) {
    if (review.user?.login && review.submitted_at) latest.set(review.user.login, review);
  }
  const approved = [...latest.values()].filter(r =>
    r.state === 'APPROVED' && r.commit_id === pr.head.sha &&
    r.user.login !== pr.user?.login);
  if (approved.length !== 1) {
    throw Error('One unambiguous independent approval on exact Bank PR HEAD required');
  }
  const reviewer = approved[0].user.login;
  await requireActor(reviewer);
  const result = {
    repo, number, bank, actor: undefined,
    branch: pr.head.ref, base: pr.base.ref, head: pr.head.sha,
    sourceBlob: sourceFile.sha, sourcePath,
    reviewer, reviewCommitSha: approved[0].commit_id,
    identity: {
      id: identity.id, pkg: identity.pkg, parent: identity.parent,
      folder: identity.folder, bank,
    },
  };
  if (expected && JSON.stringify(expected) !== JSON.stringify(result)) {
    throw Error('Reviewed Bank SHA/approval/branch/identity changed: rerun command');
  }
  return result;
}

async function resolve() {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const command = typedCommand(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(command.actor);
  const info = await inspectTyped(command.number, command.bank);
  const meta = { ...info, actor: command.actor };
  fs.appendFileSync(process.env.GITHUB_OUTPUT,
    'meta=' + Buffer.from(JSON.stringify(meta)).toString('base64') +
    '\npr=' + info.number + '\nhead=' + info.head + '\nbranch=' + info.branch + '\n');
  report('Authorized typed ' + info.bank + ' source ' + info.sourceBlob +
    ' at independently approved PR HEAD ' + info.head);
}
if (process.argv[1] && process.argv[1].endsWith('/bank-typed-gate.mjs')) {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) {
    throw Error('Usage: bank-typed-gate.mjs resolve');
  }
  resolve().catch(error => {
    report('Typed Bank authorization denied: ' + error.message);
    process.exitCode = 1;
  });
}
