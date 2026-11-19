#!/usr/bin/env node
/**
 * @fileoverview Read-only, trusted authorization for Lesson Stage 6 PR commands.
 * PR checkboxes are declarations of editorial progress, not signed reviews.
 * Never execute files from the PR head or infer paths from its title/comment.
 */
import fs from 'node:fs';
import {
  github, requireActor, report, safeBranch, gitBlob, parseIdentity as parseCourseIdentity,
} from '../courseMaterialization/course-gate.mjs';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const SHA = /^[a-f0-9]{40}$/;
const PACKAGE = /^content\/(?:languages\/)?[a-z][a-z0-9-]*$/;
const SLUG = /^[a-z][A-Za-z0-9]*$/;
const LESSON_MARKER = '<!-- svitlo-create-lesson-flow:v1 -->';
const COURSE_MARKER = '<!-- svitlo-course-lesson:v1 -->';

function exactlyOne(body, expression, label) {
  const found = [...body.matchAll(expression)];
  if (found.length !== 1) throw Error('Exactly one ' + label + ' required in Lesson PR');
  return found[0];
}

/** The explicit PR identity and UUID bucket are the only acceptable file selector. */
export function parseIdentity(body) {
  if (typeof body !== 'string' || body.split(LESSON_MARKER).length !== 2)
    throw Error('Exactly one Lesson Flow marker required');
  const [, id, pkg, slug] = exactlyOne(
    body,
    /^- Lesson UUID \/ textbook \/ slug:\s*\x60([^\x60]+)\x60\s*\/\s*\x60([^\x60]+)\x60\s*\/\s*\x60([^\x60]+)\x60\s*$/gm,
    'Lesson UUID / textbook / slug',
  );
  if (!UUID.test(id) || !PACKAGE.test(pkg) || !SLUG.test(slug))
    throw Error('Malformed Lesson UUID, workspace or slug');
  const yaml = pkg + '/data/lessons/' + id.at(-1) + '/' + id + '/lesson.yaml';
  const source = exactlyOne(body, /^- Canonical source:\s*\x60([^\x60]+)\x60.*$/gm, 'canonical Lesson source');
  if (source[1] !== yaml) throw Error('Canonical Lesson path/bucket differs from identity');
  const courseMarkers = body.split(COURSE_MARKER).length - 1;
  if (courseMarkers > 1) throw Error('Duplicate Course-to-Lesson marker');
  let parent = null;
  if (courseMarkers === 1) {
    const courseId = exactlyOne(body, /^Course:\s*([0-9a-f-]+)\s*$/gm, 'parent Course UUID')[1];
    const lessonId = exactlyOne(body, /^Lesson:\s*([0-9a-f-]+)\s*$/gm, 'parent Lesson UUID')[1];
    const parentPr = Number(exactlyOne(body, /^Parent PR:\s*#([0-9]+)\s*$/gm, 'parent Course PR')[1]);
    if (!UUID.test(courseId) || lessonId !== id || !Number.isSafeInteger(parentPr) || parentPr < 1)
      throw Error('Invalid Course-originated Lesson identity');
    parent = { courseId, parentPr };
  }
  return { id, pkg, slug, yaml, parent };
}

/** Require editorial Stages 1–5 and pending Stage 6. New PRs use ten stages with four
 * explicit Stage 6 subchecks. Historical eight-stage PRs remain materializable
 * during in-place tracker migration; old 7/8 translation ticks NEVER prove banks.
 */
export function requireStageSixPending(body) {
  const heading = exactlyOne(body, /^## Lesson stages[ \t]*$/gm, 'Lesson stages heading');
  const start = heading.index + heading[0].length;
  const after = body.slice(start);
  const end = after.search(/^##[ \t]+/m);
  const section = end < 0 ? after : after.slice(0, end);
  const stages = [
    'Methodology', 'Content Creation', 'Content Review', 'Experience Review',
    'Methodology Compliance', 'Resource Production', 'Questions', 'Flashcards',
    'Translation', 'Translation Review',
  ];
  const oldStages = [
    'Methodology', 'Content Creation', 'Content Review', 'Experience Review',
    'Methodology Compliance', 'Resource Production', 'Translation', 'Translation Review',
  ];
  const items = [...section.matchAll(/^-\s*\[([ xX])\]\s*(10|[1-9])\.\s*([^\r\n]*)$/gm)];
  const isCurrent = items.some(item => Number(item[2]) >= 9);
  const expected = isCurrent ? stages : oldStages;
  if (items.length !== expected.length)
    throw Error('Exactly one checkbox for each canonical Lesson stage is required');
  for (let i = 0; i < expected.length; i++) {
    const current = items.filter(item => Number(item[2]) === i + 1);
    if (current.length !== 1 || !current[0][3].startsWith(expected[i]) ||
        !/^(?:$|[ \t]+(?:—|–|-|:))/.test(current[0][3].slice(expected[i].length)))
      throw Error('Exactly one canonical Lesson Stage ' + (i + 1) + ' is required');
    if (i < 5 && current[0][1].toLowerCase() !== 'x')
      throw Error('Lesson Stage ' + (i + 1) + ' is not completed in the PR');
    if (i === 5 && current[0][1] !== ' ')
      throw Error('Stage 6 must be pending: materialization alone is not completion');
  }

  if (isCurrent) {
    const subNames = [
      'Materialize Lesson sources',
      'Accessibility source audit',
      'Offline source audit',
      'Validate source and handoff',
    ];
    const subitems = [...section.matchAll(/^ {2,}-\s*\[([ xX])\]\s*6\.(\d+)\s+([^\r\n]*)$/gm)];
    if (subitems.length !== subNames.length)
      throw Error('Exactly four separate Stage 6 subchecks are required');
    for (let i = 0; i < subNames.length; i++) {
      const current = subitems.filter(item => Number(item[2]) === i + 1);
      if (current.length !== 1 || !current[0][3].startsWith(subNames[i]) ||
          !/^(?:$|[ \t]+(?:\(|—|–|-|:))/.test(current[0][3].slice(subNames[i].length)))
        throw Error('Canonical Lesson Stage 6.' + (i + 1) + ' subcheck is required');
    }
  }
  return true;
}

export function parseTrigger(event, kind, actor) {
  if (!/^[A-Za-z0-9-]+$/.test(actor ?? '')) throw Error('Invalid invoking actor');
  let number, operation;
  if (kind === 'issue_comment') {
    if (!event.issue?.pull_request || event.comment?.user?.login !== actor)
      throw Error('Only exact top-level actor comments on PRs are accepted');
    if (!['/lesson materialize', '/lesson finalize'].includes(event.comment?.body))
      throw Error('Unknown Lesson command');
    number = event.issue.number;
    operation = event.comment.body.slice('/lesson '.length);
  } else if (kind === 'workflow_dispatch') {
    if (!/^[1-9][0-9]*$/.test(String(event.inputs?.pr_number ?? '')))
      throw Error('Invalid dispatched PR number');
    number = Number(event.inputs.pr_number);
    operation = event.inputs.operation;
    if (!['materialize', 'finalize'].includes(operation)) throw Error('Invalid dispatch operation');
  } else throw Error('Unsupported event kind');
  if (!Number.isSafeInteger(number) || number < 1 || number > 999999999)
    throw Error('Invalid Lesson PR number');
  return { number, operation, actor };
}

/** Only one canonical Lesson UUID tree; bank roots remain independently owned. */
export function validateArtifactPath(filename, identity, operation = 'materialize') {
  if (operation === 'finalize') return filename === identity.yaml;
  if (operation !== 'materialize' || typeof filename !== 'string' || filename.length > 450 ||
      filename.includes('..') || filename.includes('\') || filename.includes('//') ||
      filename.includes('\0') || filename.startsWith('/')) return false;
  const base = identity.yaml.slice(0, -'lesson.yaml'.length);
  if (!filename.startsWith(base)) return false;
  const relative = filename.slice(base.length);
  if (['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json'].includes(relative))
    return true;
  return /^sections\/(?:[a-z][A-Za-z0-9]*\/)*(?:index\.ts|specification\.md|markdown\.md|[a-z]{2,3}(?:-[a-z0-9]+)?\.md|code\.[a-z0-9]+)$/.test(relative);
}

export async function inspect(number, expectedHead) {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? '')) throw Error('Invalid repository');
  const pr = await github('pulls/' + number);
  const defaultBranch = process.env.LESSON_DEFAULT_BRANCH || 'main';
  if (!pr || pr.state !== 'open' || !pr.draft ||
      pr.head?.repo?.full_name !== repo || pr.base?.repo?.full_name !== repo ||
      !SHA.test(pr.head?.sha ?? '') || !safeBranch(pr.head?.ref, pr.base?.ref))
    throw Error('Open same-repository Draft Lesson PR required');
  if (expectedHead && pr.head.sha !== expectedHead) throw Error('Lesson PR HEAD advanced; retry from latest source');
  const identity = parseIdentity(pr.body);
  requireStageSixPending(pr.body);
  if (identity.parent) {
    if (identity.parent.parentPr === number) throw Error('Lesson PR cannot be its parent');
    const parent = await github('pulls/' + identity.parent.parentPr);
    if (!parent || parent.state !== 'open' ||
        parent.head?.repo?.full_name !== repo || parent.base?.repo?.full_name !== repo ||
        !safeBranch(parent.head?.ref, parent.base?.ref) ||
        pr.base?.ref !== parent.head?.ref ||
        !parent.body?.includes('<!-- svitlo-course-flow:v1 -->'))
      throw Error('Course Lesson must target its verified parent integration branch');
    const courseIdentity = parseCourseIdentity(parent.body);
    if (courseIdentity.id !== identity.parent.courseId || courseIdentity.pkg !== identity.pkg)
      throw Error('Parent Course UUID/textbook does not match Lesson linkage');
    // The Course-owned inventory must actually register this Lesson UUID.
    if (!parent.body.includes(identity.id))
      throw Error('Parent Course PR does not register this Lesson UUID');
  } else if (pr.base?.ref !== defaultBranch) {
    throw Error('Standalone Lesson PR without parent marker must target the default branch');
  }
  const encoded = identity.yaml.split('/').map(encodeURIComponent).join('/');
  const source = await github('contents/' + encoded + '?ref=' + pr.head.sha);
  if (!source || source.type !== 'file' || !SHA.test(source.sha ?? '') ||
      !Number.isSafeInteger(source.size) || source.size < 1 || source.size > 4 * 1024 * 1024)
    throw Error('Canonical Lesson YAML is missing, nonregular or oversized');
  return {
    number, head: pr.head.sha, branch: pr.head.ref, base: pr.base.ref,
    identity, sourceBlob: source.sha, repo,
  };
}

export { github, requireActor, report, gitBlob };

async function main() {
  if (process.argv.length !== 3 || process.argv[2] !== 'resolve')
    throw Error('Usage: lesson-gate.mjs resolve');
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const command = parseTrigger(event, process.env.GITHUB_EVENT_NAME, process.env.GITHUB_ACTOR);
  if (command.operation === 'finalize')
    throw Error('/lesson finalize is disabled until verified post-materialization retirement exists; YAML retained');
  await requireActor(command.actor);
  const pr = await inspect(command.number);
  const meta = Buffer.from(JSON.stringify({
    ...pr, operation: command.operation, actor: command.actor,
  })).toString('base64');
  fs.appendFileSync(process.env.GITHUB_OUTPUT,
    'meta=' + meta + '\npr=' + command.number + '\nhead=' + pr.head + '\n');
  report('Authorized Lesson ' + command.operation + ' PR #' + command.number +
    ' at HEAD ' + pr.head + ', YAML blob ' + pr.sourceBlob);
}

if (process.argv[1] && process.argv[1].endsWith('/lesson-gate.mjs')) {
  main().catch(error => {
    report('Lesson Stage 6 gate denied: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
