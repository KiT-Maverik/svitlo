#!/usr/bin/env node
/**
 * @fileoverview Privileged typed Course Stage 5 publisher. NEVER imports or
 * executes PR-authored TypeScript. Recomputes the complete deterministic plan
 * from a literal AST using trusted Engine code, checks the artifact byte for
 * byte, and consumes the reviewed draft and commits outputs in ONE Git tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { github, requireActor, report, gitBlob } from './course-gate.mjs';
import { inspectTypedCourse, parseTypedMetadata } from './typed-course-gate.mjs';
import {
  checkedSource,
  parseCanonicalCourseSource,
  buildTypedCourseManifest,
  reviewedLessonPatchResolver,
} from './typed-course-source.mjs';
import { materializeCourseStage5 } from '../../../shared/engine/generators/materializers/course/materializeStage5.mjs';
import { materializeCourseEpisodeSection } from './typed-course-section.mjs';
import { createTrustedCourseLessonResolver } from './typed-course-lesson.mjs';
import { checkGeneratedCourseTypes } from './typed-course-semantics.mjs';
import { manifestDigest } from './course-handoff-publish.mjs';

const SHA = /^[a-f0-9]{40}$/;
const UUID_PATTERN = '[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}';
const UUID = new RegExp('^' + UUID_PATTERN + '$');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

function safePath(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length < 300 &&
    !value.startsWith('/') &&
    !value.includes('\\') &&
    value
      .split('/')
      .every(part => part && part !== '.' && part !== '..' && !['__proto__', 'prototype', 'constructor'].includes(part))
  );
}

function allowedOutput(filename, meta) {
  if (!safePath(filename) || !UUID.test(meta.courseId)) return false;
  const course = meta.textbookRoot + '/data/courses/' + meta.courseId.at(-1) + '/' + meta.courseId + '/';
  if (filename.startsWith(course)) {
    const suffix = filename.slice(course.length);
    const parts = suffix.split('/');
    const leaf = parts.at(-1);
    if (parts.slice(0, -1).some(part => !/^[A-Za-z][A-Za-z0-9]*$/.test(part))) return false;
    if (parts.length > 12 || ['workflow.stage3.ts'].includes(leaf)) return false;
    return (
      [
        'index.ts',
        'draft.ts',
        'languages.ts',
        'authoredCourseOverrides.ts',
        'methodology.md',
        'specification.md',
        'markdown.md',
      ].includes(leaf) ||
      /^[a-z]{2}(?:-[A-Z]{2})?\.md$/.test(leaf) ||
      /^code\.[a-z0-9]{1,10}$/.test(leaf)
    );
  }
  const lesson = filename.match(
    new RegExp('^' + meta.textbookRoot + '/data/lessons/([a-f0-9])/(' + UUID_PATTERN + ')/draft\\.ts$'),
  );
  return !!lesson && lesson[1] === lesson[2].at(-1);
}

/** Pure validation: manifest bytes and every path are constrained and hashed. */
export function verifyTypedCourseManifest(manifest, meta) {
  if (
    !manifest ||
    manifest.version !== 2 ||
    manifest.operation !== 'typed-course-stage5' ||
    manifest.repo !== meta.repo ||
    manifest.number !== meta.number ||
    manifest.head !== meta.head ||
    manifest.branch !== meta.branch ||
    manifest.actor !== meta.actor ||
    manifest.courseId !== meta.courseId ||
    manifest.textbookRoot !== meta.textbookRoot ||
    manifest.sourcePath !== meta.sourcePath ||
    manifest.sourceBlobSha !== meta.sourceBlobSha ||
    manifest.reviewCommitSha !== meta.reviewCommitSha ||
    manifest.reviewer !== meta.reviewer ||
    manifest.evidenceUrl !== meta.evidenceUrl ||
    manifest.publishable !== false ||
    manifest.materializedPath !== path.posix.dirname(meta.sourcePath) + '/index.ts' ||
    !Array.isArray(manifest.entries) ||
    !manifest.entries.length ||
    manifest.entries.length > 1500
  )
    throw Error('Typed Course manifest does not match independently reviewed source metadata');
  let bytes = 0;
  const seen = new Set();
  for (const file of manifest.entries) {
    if (
      !file ||
      !allowedOutput(file.path, meta) ||
      seen.has(file.path) ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind) ||
      typeof file.data !== 'string' ||
      file.data.length > 44 * 1024 * 1024 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(file.data)
    )
      throw Error('Unsafe, duplicated or malformed typed Course manifest file');
    seen.add(file.path);
    const content = Buffer.from(file.data, 'base64');
    if (
      !content.length ||
      content.toString('base64') !== file.data ||
      content.toString('utf8').includes('\ufffd') ||
      !Buffer.from(content.toString('utf8'), 'utf8').equals(content) ||
      sha256(content) !== file.sha256
    )
      throw Error('Invalid typed Course manifest content/hash: ' + file.path);
    bytes += content.length;
    if (bytes > 32 * 1024 * 1024) throw Error('Oversized typed Course source plan');
  }
  if (seen.has(meta.sourcePath) || !seen.has(manifest.materializedPath))
    throw Error('Typed Course plan must consume draft.ts and create index.ts');
  return manifest.entries.length;
}

/** Check all targets on the original pinned tree: no symlinks or clobbers. */
export function checkTypedCourseTargets(meta, root, manifest) {
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    }).trim();
  if (git('rev-parse', 'HEAD') !== meta.head) throw Error('Typed Course checkout advanced since Stage 4 review');
  const indexed = new Map();
  for (const row of git('ls-files', '--stage').split('\n').filter(Boolean)) {
    const match = row.match(/^(\d{6}) [a-f0-9]{40} \d+\t(.+)$/);
    if (!match) throw Error('Malformed candidate Git index');
    indexed.set(match[2], match[1]);
  }
  if (indexed.get(meta.sourcePath) !== '100644') throw Error('Expected an ordinary reviewed Course source');
  const targets = manifest.entries.map(entry => entry.path);
  for (const filename of [...targets]) {
    if (filename.endsWith('/draft.ts')) targets.push(path.posix.join(path.posix.dirname(filename), 'index.ts'));
  }
  for (const filename of targets) {
    if (!safePath(filename)) throw Error('Path traversal in Course target');
    const parts = filename.split('/');
    for (let depth = 1; depth < parts.length; depth++) {
      const ancestor = parts.slice(0, depth).join('/');
      const mode = indexed.get(ancestor);
      if (mode && mode !== '040000') throw Error('Tracked symlink/non-directory Course ancestor: ' + ancestor);
      const actual = path.join(root, ancestor);
      try {
        if (!fs.lstatSync(actual).isDirectory())
          throw Error('Symlink/non-directory in Course output path: ' + ancestor);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
    const mode = indexed.get(filename);
    let localExists = false;
    try {
      fs.lstatSync(path.join(root, filename));
      localExists = true;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (mode || localExists) throw Error('Existing authored Course/Lesson target would be overwritten: ' + filename);
  }
  return true;
}

export function oneCommitTree(manifest) {
  return [
    ...manifest.entries.map(file => ({
      path: file.path,
      mode: '100644',
      type: 'blob',
      content: Buffer.from(file.data, 'base64').toString('utf8'),
    })),
    {
      path: manifest.sourcePath,
      mode: '100644',
      type: 'blob',
      sha: null,
    },
  ];
}

/**
 * No PR code evaluation: both read-only analysis and the write-token job
 * compute the identical plan from a strictly literal TypeScript AST.
 */
function replan(meta, source) {
  const resolver = createTrustedCourseLessonResolver({
    trustedRoot: path.resolve(import.meta.dirname, '../../..'),
    candidateRoot: process.env.COURSE_HEAD_ROOT,
    textbookRoot: meta.textbookRoot,
  });
  const patches = [];
  const input = parseCanonicalCourseSource(source, {
    resolveImport: resolver.loadImport,
    patches,
  });
  const plan = materializeCourseStage5(input, {
    textbookRoot: meta.textbookRoot,
    review: {
      sourcePath: meta.sourcePath,
      sourceBlobSha: meta.sourceBlobSha,
      reviewCommitSha: meta.reviewCommitSha,
      reviewer: meta.reviewer,
      evidenceUrl: meta.evidenceUrl,
    },
    verifyReviewedSource: ({ input: candidate, review, textbookRoot }) =>
      candidate === input &&
      review.sourceBlobSha === meta.sourceBlobSha &&
      review.reviewCommitSha === meta.head &&
      textbookRoot === meta.textbookRoot,
    materializeSection: materializeCourseEpisodeSection,
    resolveExistingLesson: reviewedLessonPatchResolver(input, resolver, patches, meta.sourceBlobSha),
  });
  checkGeneratedCourseTypes(plan, meta.textbookRoot);
  return plan;
}

function readManifest(filename) {
  if (
    !filename ||
    !fs.existsSync(filename) ||
    fs.lstatSync(filename).isSymbolicLink() ||
    fs.statSync(filename).size > 48 * 1024 * 1024
  )
    throw Error('Missing or unsafe typed Course read-only analysis artifact');
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function equalMetadata(a, b) {
  return [
    'repo',
    'number',
    'head',
    'branch',
    'courseId',
    'sourcePath',
    'sourceBlobSha',
    'textbookRoot',
    'reviewCommitSha',
    'reviewer',
    'evidenceUrl',
  ].every(key => a[key] === b[key]);
}

async function publish() {
  const meta = parseTypedMetadata(process.env.COURSE_TYPED_META_B64);
  await requireActor(meta.actor);
  const live = await inspectTypedCourse(meta.number, meta.head);
  if (!equalMetadata(live, meta)) throw Error('Course PR/Stage 4 authorization changed before publishing');
  const { root, source } = checkedSource(meta, process.env.COURSE_HEAD_ROOT);
  if (gitBlob(Buffer.from(source, 'utf8')) !== meta.sourceBlobSha) throw Error('Reviewed Course source bytes changed');
  const manifest = readManifest(process.env.COURSE_TYPED_REPORT);
  verifyTypedCourseManifest(manifest, meta);
  const expected = buildTypedCourseManifest(meta, replan(meta, source));
  if (JSON.stringify(manifest) !== JSON.stringify(expected))
    throw Error('Manifest does not reproduce the trusted deterministic Course Stage 5 plan');
  checkTypedCourseTargets(meta, root, manifest);
  const original = await github('git/commits/' + meta.head);
  if (!SHA.test(original?.tree?.sha ?? '')) throw Error('Missing approved parent Git tree');
  const tree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
    tree: oneCommitTree(manifest),
  });
  if (!SHA.test(tree?.sha ?? '')) throw Error('Invalid typed Course commit tree');
  const digest = manifestDigest(manifest);
  const commit = await github('git/commits', 'POST', {
    message:
      'Materialize reviewed typed Course ' +
      meta.courseId +
      '\n\nCourse-PR: #' +
      meta.number +
      '\nSource-Blob: ' +
      meta.sourceBlobSha +
      '\nStage4-Review: ' +
      meta.evidenceUrl +
      '\nCourse-Inventory-Manifest: ' +
      digest,
    tree: tree.sha,
    parents: [meta.head],
  });
  if (!SHA.test(commit?.sha ?? '')) throw Error('Could not create typed Course source commit');
  // The last approval and branch lease check occurs before advancing the ref.
  const latest = await inspectTypedCourse(meta.number, meta.head);
  if (!equalMetadata(latest, meta)) throw Error('Reviewed Course branch/source changed before ref write');
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', {
    sha: commit.sha,
    force: false,
  });
  if (updated?.object?.sha !== commit.sha)
    throw Error('Typed Course Git reference did not advance to exact approved commit');
  report(
    'Typed Course Stage 5: one atomic commit ' +
      commit.sha +
      ' from ' +
      meta.head +
      ', reviewed blob ' +
      meta.sourceBlobSha +
      ', reviewer ' +
      meta.reviewer +
      ', ' +
      manifest.entries.length +
      ' generated sources; reviewed draft consumed, exact bytes retained in Git history.',
  );
  if (process.env.GITHUB_OUTPUT) {
    const proof = {
      repo: meta.repo,
      number: meta.number,
      branch: meta.branch,
      courseId: meta.courseId,
      reviewedHead: meta.head,
      commit: commit.sha,
      digest,
    };
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'proof=' + JSON.stringify(proof) + '\n');
  }
  const placements = manifest.pendingPlacements ?? [];
  for (const placement of placements)
    report('Lesson Stage 1 pending (no automatic PR): ' + placement.lessonId + ' — ' + placement.handoffPath);
  for (const placement of manifest.pendingEpisodes ?? [])
    report('Episode Stage 1 pending (no automatic PR): ' + placement.episodeId + ' — ' + placement.handoffPath);
  report(
    'TODO (BLOCKER): Course is not approved for Props publication; verify all independent child/review/locale/asset gates.',
  );
}

if (process.argv[1]?.endsWith('/typed-course-publish.mjs')) {
  if (process.argv[2] !== 'publish' || process.argv.length !== 3) {
    console.error('Usage: typed-course-publish.mjs publish');
    process.exitCode = 1;
  } else {
    publish().catch(error => {
      report('Typed Course publication transaction rejected: ' + String(error.message ?? error));
      process.exitCode = 1;
    });
  }
}
