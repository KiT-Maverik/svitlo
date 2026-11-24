#!/usr/bin/env node
/**
 * @fileoverview Read-only authorization of the typed Lesson Stage 6.1 command.
 * Only trusted default-branch code executes. Candidate TypeScript is data.
 * Independent review attestations belong to this existing Lesson PR.
 */
import fs from 'node:fs';
import { github, requireActor, report, safeBranch } from '../courseMaterialization/course-gate.mjs';

const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const sha = /^[0-9a-f]{40}$/;
const marker = '<!-- svitlo-create-lesson-flow:v1 -->';
const courseMarker = '<!-- svitlo-course-lesson:v1 -->';
const reviewMarker = '<!-- svitlo-lesson-review:v1 -->';

function single(body, regex, name) {
  const matches = [...body.matchAll(regex)];
  if (matches.length !== 1) throw Error('Expected exactly one ' + name);
  return matches[0][1].trim();
}

function exactlyOne(body, expression, label) {
  const found = [...body.matchAll(expression)];
  if (found.length !== 1) throw Error('Exactly one ' + label + ' required in Lesson PR');
  return found[0];
}

/** Verify the typed ten-stage Lesson tracker and separate pending Stage 6 checks. */
export function requireStageSixPending(body) {
  const heading = exactlyOne(body, /^## Lesson stages[ \t]*$/gm, 'Lesson stages heading');
  const start = heading.index + heading[0].length;
  const after = body.slice(start);
  const end = after.search(/^##[ \t]+/m);
  const section = end < 0 ? after : after.slice(0, end);
  const stages = [
    'Methodology',
    'Content Creation',
    'Content Review',
    'Experience Review',
    'Methodology Compliance',
    'Resource Production',
    'Questions',
    'Flashcards',
    'Translation',
    'Translation Review',
  ];
  const items = [...section.matchAll(/^-\s*\[([ xX])\]\s*(10|[1-9])\.\s*([^\r\n]*)$/gm)];
  if (items.length !== stages.length) throw Error('Exactly ten canonical Lesson stages are required');
  for (let i = 0; i < stages.length; i++) {
    const current = items.filter(item => Number(item[2]) === i + 1);
    if (
      current.length !== 1 ||
      !current[0][3].startsWith(stages[i]) ||
      !/^(?:$|[ \t]+(?:—|–|-|:))/.test(current[0][3].slice(stages[i].length))
    )
      throw Error('Exactly one canonical Lesson Stage ' + (i + 1) + ' is required');
    if (i < 5 && current[0][1].toLowerCase() !== 'x')
      throw Error('Lesson Stage ' + (i + 1) + ' is not completed in the PR');
    if (i === 5 && current[0][1] !== ' ')
      throw Error('Stage 6 must be pending: materialization alone is not completion');
  }

  {
    const subNames = [
      'Materialize Lesson sources',
      'Complete generated Lesson resources',
      'Implement and integrate Scenes',
    ];
    const subitems = [...section.matchAll(/^ {2,}-\s*\[([ xX])\]\s*6\.(\d+)\s+([^\r\n]*)$/gm)];
    if (subitems.length !== subNames.length) throw Error('Exactly three separate Stage 6 subchecks are required');
    let previousPosition = items.find(item => Number(item[2]) === 6).index;
    const nextStagePosition = items.find(item => Number(item[2]) === 7).index;
    for (let i = 0; i < subNames.length; i++) {
      const current = subitems.filter(item => Number(item[2]) === i + 1);
      if (
        current.length !== 1 ||
        !current[0][3].startsWith(subNames[i]) ||
        !/^(?:$|[ \t]+(?:\(|—|–|-|:))/.test(current[0][3].slice(subNames[i].length))
      )
        throw Error('Canonical Lesson Stage 6.' + (i + 1) + ' subcheck is required');
      if (current[0].index <= previousPosition || current[0].index >= nextStagePosition)
        throw Error('Stage 6 subchecks must appear in order between Stage 6 and Stage 7');
      previousPosition = current[0].index;
    }
  }
  return true;
}

export function parseTypedIdentity(body) {
  if (typeof body !== 'string' || body.split(marker).length !== 2)
    throw Error('Exactly one typed Lesson Flow marker required');
  const fields = single(body, /^- Lesson UUID \/ textbook \/ slug:\s*(.+)$/gm, 'Lesson UUID / textbook / slug')
    .replaceAll(String.fromCharCode(96), '')
    .split(/\s+\/\s+/);
  if (fields.length !== 3) throw Error('Typed Lesson identity must contain exactly three fields');
  const [id, pkg, slug] = fields;
  if (!uuid.test(id || '') || !/^content\/[a-z][a-z0-9-]*$/.test(pkg || '') || !/^[a-z][A-Za-z0-9]*$/.test(slug || ''))
    throw Error('Invalid Lesson UUID / textbook / slug');
  const folder = pkg + '/data/lessons/' + id.at(-1) + '/' + id;
  const source = folder + '/draft.ts';
  const recorded = single(body, /^- (?:Source path|Canonical source):\s*(.+)$/gm, 'canonical typed source')
    .replaceAll(String.fromCharCode(96), '')
    .split(/\s+\(/)[0]
    .trim();
  if (recorded !== source) throw Error('Lesson source path is not the canonical Stage 2 draft.ts');
  const count = body.split(courseMarker).length - 1;
  if (count > 1) throw Error('Duplicate Course Lesson marker');
  let parent = null;
  if (count === 1) {
    const courseId = single(body, /^Course:\s*([0-9a-f-]+)\s*$/gm, 'Course UUID');
    const lesson = single(body, /^Lesson:\s*([0-9a-f-]+)\s*$/gm, 'Course Lesson UUID');
    const parentPr = Number(single(body, /^Parent PR:\s*#([1-9]\d*)\s*$/gm, 'parent Course PR'));
    if (!uuid.test(courseId) || lesson !== id || !Number.isSafeInteger(parentPr))
      throw Error('Invalid Course/Lesson/Parent PR provenance');
    parent = { courseId, parentPr };
  }
  return { id, pkg, slug, folder, source, parent };
}

export function parseTypedTrigger(event, type, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor || '')) throw Error('Invalid actor');
  let number;
  if (type === 'issue_comment') {
    if (
      !event.issue?.pull_request ||
      event.comment?.user?.login !== actor ||
      event.comment?.body !== '/lesson materialize typed'
    )
      throw Error('Only exact top-level typed Lesson command allowed');
    number = event.issue.number;
  } else if (type === 'workflow_dispatch') {
    if (event.inputs?.operation !== 'materialize-typed' || !/^[1-9]\d*$/.test(String(event.inputs?.pr_number ?? '')))
      throw Error('Invalid typed Lesson dispatch');
    number = Number(event.inputs.pr_number);
  } else throw Error('Unsupported Lesson trigger');
  if (!Number.isSafeInteger(number) || number < 1 || number > 999999999) throw Error('Invalid Lesson PR number');
  return { number, actor };
}

/** Accepted review attestations must be written by authorized collaborators.
 * GitHub cannot verify that two external AI chat contexts were independent:
 * that assertion must be audited by the owner before authorizing the command.
 */
export function parseReviewEvidence(comments) {
  const entries = [];
  for (const comment of comments) {
    if (typeof comment?.body !== 'string' || !comment.body.includes(reviewMarker)) continue;
    const body = comment.body;
    if (body.split(reviewMarker).length !== 2) throw Error('Duplicated review marker');
    const stage = Number(single(body, /^Stage:\s*([345])\s*$/gm, 'review stage'));
    const commit = single(body, /^Source commit:\s*([a-f0-9]{40})\s*$/gm, 'review commit');
    const blob = single(body, /^Source blob:\s*([a-f0-9]{40})\s*$/gm, 'review blob');
    const verdict = single(body, /^Verdict:\s*(accepted)\s*$/gm, 'review verdict');
    const reviewerContext = single(body, /^Reviewer context:\s*([A-Za-z0-9._/-]+)\s*$/gm, 'reviewer context');
    const authorContext =
      stage === 3 ? single(body, /^Author context:\s*([A-Za-z0-9._/-]+)\s*$/gm, 'author context') : null;
    if (
      !sha.test(commit) ||
      !sha.test(blob) ||
      verdict !== 'accepted' ||
      !/^[A-Za-z0-9-]+$/.test(comment.user?.login || '') ||
      (stage === 3 && reviewerContext === authorContext)
    )
      throw Error('Invalid source-pinned review evidence or independence declaration');
    entries.push({ stage, commit, blob, reviewerContext, actor: comment.user.login, commentId: comment.id });
  }
  if (entries.length !== 3 || [3, 4, 5].some(stage => entries.filter(item => item.stage === stage).length !== 1))
    throw Error('Three unique accepted Stage 3/4/5 reviews are required');
  return [3, 4, 5].map(stage => entries.find(item => item.stage === stage));
}

async function reviewsFor(number, source, head, sourceBlob) {
  const comments = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await github('issues/' + number + '/comments?per_page=100&page=' + page);
    if (!Array.isArray(batch)) throw Error('Unable to read review comments');
    comments.push(...batch);
    if (batch.length < 100) break;
    if (page === 10) throw Error('Review comment count exceeds safe bound');
  }
  const evidence = parseReviewEvidence(comments);
  for (let i = 0; i < evidence.length; i++) {
    const item = evidence[i];
    await requireActor(item.actor);
    const entry = await github(
      'contents/' + source.split('/').map(encodeURIComponent).join('/') + '?ref=' + item.commit,
    );
    if (entry?.type !== 'file' || entry.sha !== item.blob)
      throw Error('Stage ' + item.stage + ' evidence does not match reviewed source');
    if (i) {
      const comparison = await github('compare/' + evidence[i - 1].commit + '...' + item.commit);
      if (!['ahead', 'identical'].includes(comparison?.status)) throw Error('Review commits are not in ancestry order');
    }
  }
  if (evidence[2].commit !== head || evidence[2].blob !== sourceBlob)
    throw Error('Latest Stage 5 review is stale relative to the PR head');
  return evidence;
}

async function courseProvenance(pr, identity, repo) {
  if (!identity.parent) {
    if (pr.base?.ref !== (process.env.LESSON_DEFAULT_BRANCH || 'develop'))
      throw Error('Standalone Lesson must target the default branch');
    return null;
  }
  const { parentPr, courseId } = identity.parent;
  if (parentPr === pr.number) throw Error('A Lesson cannot parent itself');
  const parent = await github('pulls/' + parentPr);
  if (
    !parent ||
    parent.state !== 'open' ||
    parent.head?.repo?.full_name !== repo ||
    parent.base?.repo?.full_name !== repo ||
    pr.base?.ref !== parent.head?.ref ||
    !safeBranch(parent.head?.ref, parent.base?.ref)
  )
    throw Error('Lesson must target its verified open Course parent branch');
  if (
    typeof parent.body !== 'string' ||
    parent.body.split('<!-- svitlo-course-flow:v1 -->').length !== 2 ||
    single(parent.body, /^- Course UUID:\s*([a-f0-9-]{36})\s*$/gm, 'parent Course identity') !== courseId ||
    single(parent.body, /^- Textbook:\s*(content\/[a-z][a-z0-9-]*)\s*$/gm, 'parent textbook') !== identity.pkg
  )
    throw Error('Course parent PR identity is incompatible with the Lesson handoff');
  const handoff = await github(
    'contents/' + identity.source.split('/').map(encodeURIComponent).join('/') + '?ref=' + parent.head.sha,
  );
  if (handoff?.type !== 'file' || !sha.test(handoff.sha || '') || !handoff.content || handoff.size > 1024 * 1024)
    throw Error('Course parent lacks the canonical initial Stage 1 Lesson handoff');
  const bytes = Buffer.from(handoff.content.replace(/\s/g, ''), 'base64').toString('utf8');
  if (!bytes.includes('LessonWorkflowStage1') || !bytes.includes(identity.id) || !bytes.includes(identity.slug))
    throw Error('Course Stage 1 handoff content does not match Lesson identity');
  return { parentPr, courseId, parentHead: parent.head.sha, handoffBlob: handoff.sha };
}

export async function inspectTyped(number, expectedHead) {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo || '')) throw Error('Invalid repository');
  const pr = await github('pulls/' + number);
  if (
    !pr ||
    pr.state !== 'open' ||
    !pr.draft ||
    !sha.test(pr.head?.sha || '') ||
    pr.head?.repo?.full_name !== repo ||
    pr.base?.repo?.full_name !== repo ||
    !safeBranch(pr.head?.ref, pr.base?.ref)
  )
    throw Error('Open same-repository Draft typed Lesson PR required');
  if (expectedHead && pr.head.sha !== expectedHead) throw Error('Lesson HEAD advanced; rerun command');
  const identity = parseTypedIdentity(pr.body);
  requireStageSixPending(pr.body);
  if (!/^- \[ \] 10\. Translation Review/m.test(pr.body))
    throw Error('Typed workflow requires ten-stage Lesson tracker');
  const parent = await courseProvenance(pr, identity, repo);
  const source = await github(
    'contents/' + identity.source.split('/').map(encodeURIComponent).join('/') + '?ref=' + pr.head.sha,
  );
  if (
    source?.type !== 'file' ||
    !sha.test(source.sha || '') ||
    !Number.isSafeInteger(source.size) ||
    source.size < 1 ||
    source.size > 4 * 1024 * 1024
  )
    throw Error('Reviewed Stage 2 Lesson draft.ts missing or oversized');
  const reviews = await reviewsFor(number, identity.source, pr.head.sha, source.sha);
  const again = await github('pulls/' + number);
  if (
    again?.head?.sha !== pr.head.sha ||
    again.head.ref !== pr.head.ref ||
    again.base?.ref !== pr.base?.ref ||
    !again.draft ||
    again.state !== 'open'
  )
    throw Error('Lesson PR changed during source/review discovery');
  return {
    number,
    repo,
    head: pr.head.sha,
    branch: pr.head.ref,
    base: pr.base.ref,
    identity,
    sourceBlob: source.sha,
    reviews,
    parent,
  };
}

export function typedPath(filename, identity) {
  if (
    typeof filename !== 'string' ||
    filename.length > 500 ||
    !filename.startsWith(identity.folder + '/') ||
    filename.includes('//') ||
    filename.includes('..') ||
    filename.includes('\\') ||
    filename.includes('\0')
  )
    return false;
  const relative = filename.slice(identity.folder.length + 1);
  if (['index.ts', 'draft.ts', 'languages.ts', 'methodology.md', 'specification.md'].includes(relative))
    return true;
  return /^sections\/(?:[A-Za-z][A-Za-z0-9]*\/){1,22}(?:index\.ts|specification\.md|methodology\.md|markdown\.md|[a-z]{2,3}(?:-[A-Za-z0-9]+)?\.md|code\.[A-Za-z0-9]+)$/.test(
    relative,
  );
}

async function main() {
  if (process.argv[2] !== 'resolve' || process.argv.length !== 3) throw Error('Usage: lesson-typed-gate.mjs resolve');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const action = parseTypedTrigger(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  await requireActor(action.actor);
  const snapshot = await inspectTyped(action.number);
  const meta = { ...snapshot, actor: action.actor, operation: 'materialize-typed' };
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    'meta=' +
      Buffer.from(JSON.stringify(meta)).toString('base64') +
      '\npr=' +
      action.number +
      '\nhead=' +
      meta.head +
      '\n',
  );
  report(
    'Authorized typed Lesson Stage 6.1 for #' +
      action.number +
      ', HEAD ' +
      meta.head +
      ', reviewed blob ' +
      meta.sourceBlob,
  );
}
if (process.argv[1]?.endsWith('/lesson-typed-gate.mjs')) {
  main().catch(error => {
    report('Typed Lesson authorization denied: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
