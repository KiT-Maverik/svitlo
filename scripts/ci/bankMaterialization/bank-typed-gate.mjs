#!/usr/bin/env node
/**
 * Trusted authorization for the opt-in typed Bank Stage 5 command.
 * GitHub PR metadata and accepted, source-pinned review evidence are required.
 * A checked stage box or flag in authored source does not authorize this command.
 */
import fs from 'node:fs';
import { verifyReviewEvidence } from '../reviewEvidence/review-evidence.mjs';
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
    if (
      !event.issue?.pull_request ||
      event.comment?.user?.login !== actor ||
      !Object.hasOwn(COMMANDS, event.comment.body)
    ) {
      throw Error('Requires exact top-level typed Bank PR command');
    }
    number = event.issue.number;
    bank = COMMANDS[event.comment.body];
  } else if (name === 'workflow_dispatch') {
    if (event.inputs?.mode !== 'typed' || !['questions', 'flashcards'].includes(event.inputs?.bank)) {
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
  const match =
    /^- Lesson UUID \/ textbook \/ slug:\s*`?([a-f0-9-]{36})`?\s*\/\s*`?(content\/(?:languages\/)?[a-z][a-z0-9-]*)/m.exec(
      body,
    );
  return match && { id: match[1], pkg: match[2] };
}

export async function inspectTyped(number, bank, expected) {
  const repo = process.env.GITHUB_REPOSITORY;
  const pr = await github('pulls/' + number);
  if (
    !pr ||
    pr.state !== 'open' ||
    !pr.draft ||
    pr.head?.repo?.full_name !== repo ||
    !SHA.test(pr.head?.sha || '') ||
    !safeBranch(pr.head.ref, pr.base?.ref)
  ) {
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
  if (
    !parent ||
    (parent.state !== 'open' && !parent.merged) ||
    !source ||
    source.id !== identity.id ||
    source.pkg !== identity.pkg
  ) {
    throw Error('No verified owning Lesson PR/UUID correspondence');
  }
  if (parent.state === 'open' && pr.base?.ref !== parent.head?.ref) {
    throw Error('Typed Bank child must target its actual Lesson parent branch');
  }
  if (parent.merged) {
    if (
      !SHA.test(parent.merge_commit_sha || '') ||
      (pr.base?.ref !== parent.base?.ref && pr.base?.ref !== process.env.BANK_DEFAULT_BRANCH)
    ) {
      throw Error('Merged Lesson ancestry is not authorized');
    }
    const comparison = await github('compare/' + parent.merge_commit_sha + '...' + pr.base.sha);
    if (!['ahead', 'identical'].includes(comparison?.status)) {
      throw Error('Typed Bank target excludes merged Lesson');
    }
  }
  let parentQuestions = null;
  let parentHeadSha = null;
  let parentQuestionsReview = null;
  if (bank === 'flashcards') {
    const decisions = [...parent.body.matchAll(/^- Questions(?: \(own bank\))?:[ \t]*(Completed|Not Applicable)\b[^\r\n]*$/gim)];
    const decision = decisions[0];
    if (decisions.length !== 1 || !SHA.test(parent.head?.sha || '')) {
      throw Error('Flashcards need a pinned parent Questions-first completion or N/A');
    }
    parentQuestions = decision[1] === 'Completed' ? 'completed' : 'notApplicable';
    parentHeadSha = parent.head.sha;
    if (parentQuestions === 'notApplicable') {
      const lessonPath = identity.folder + '/index.ts';
      const lessonSource = await github(
        'contents/' + lessonPath.split('/').map(encodeURIComponent).join('/') + '?ref=' + parentHeadSha,
      );
      if (lessonSource?.type !== 'file' || !SHA.test(lessonSource.sha || ''))
        throw Error('Questions N/A requires the pinned materialized parent Lesson source');
      [parentQuestionsReview] = await verifyReviewEvidence(parent.body, {
        stages: ['questions-na'],
        allowedStages: [3, 4, 5, 'questions-na'],
        head: parentHeadSha,
        blob: lessonSource.sha,
      });
    }
  }
  const sourcePath = identity.folder + '/' + bank + '/draft.ts';
  const sourceFile = await github(
    'contents/' + sourcePath.split('/').map(encodeURIComponent).join('/') + '?ref=' + pr.head.sha,
  );
  if (sourceFile?.type !== 'file' || !SHA.test(sourceFile.sha || '')) {
    throw Error('Exact reviewed Stage 3 bank draft.ts is missing');
  }
  const [review] = await verifyReviewEvidence(pr.body, {
    stages: [4],
    head: pr.head.sha,
    blob: sourceFile.sha,
  });
  const again = await github('pulls/' + number);
  if (
    again?.head?.sha !== pr.head.sha || again.head.ref !== pr.head.ref ||
    again.head.repo?.full_name !== repo || again.base?.ref !== pr.base?.ref ||
    again.base?.sha !== pr.base?.sha || again.state !== 'open' || !again.draft || again.body !== pr.body
  ) throw Error('Bank PR changed during review evidence verification');
  const parentAgain = await github('pulls/' + identity.parent);
  if (
    parentAgain?.state !== parent.state || parentAgain.merged !== parent.merged ||
    parentAgain.head?.ref !== parent.head?.ref || parentAgain.head?.sha !== parent.head?.sha ||
    parentAgain.body !== parent.body || parentAgain.merge_commit_sha !== parent.merge_commit_sha
  ) throw Error('Owning Lesson PR changed during Bank review evidence verification');
  const result = {
    repo,
    number,
    bank,
    actor: undefined,
    branch: pr.head.ref,
    base: pr.base.ref,
    head: pr.head.sha,
    sourceBlob: sourceFile.sha,
    sourcePath,
    reviewVerdict: review.verdict,
    reviewCommitSha: review.commit,
    parentQuestions,
    parentHeadSha,
    parentQuestionsReview,
    identity: {
      id: identity.id,
      pkg: identity.pkg,
      parent: identity.parent,
      folder: identity.folder,
      bank,
    },
  };
  if (expected && JSON.stringify(expected) !== JSON.stringify(result)) {
    throw Error('Reviewed Bank SHA/evidence/branch/identity changed: rerun command');
  }
  return result;
}

async function resolve() {
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
  report(
    'Authorized typed ' + info.bank + ' source ' + info.sourceBlob + ' at independently approved PR HEAD ' + info.head,
  );
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
