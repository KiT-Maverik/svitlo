#!/usr/bin/env node
/**
 * @fileoverview Privileged typed Course Stage 5 publisher. NEVER imports or
 * executes PR-authored TypeScript. Verifies the previously sealed, scoped
 * source manifest and commits its files in ONE guarded Git tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { github, requireActor, report, gitBlob } from './course-gate.mjs';
import { inspectTypedCourse, parseTypedMetadata } from './typed-course-gate.mjs';
import { manifestDigest } from './course-handoff-publish.mjs';
import { deriveCourseEntityId } from '../../../shared/engine/generators/materializers/course/deriveCourseEntityId.mjs';
import { checkedSource, verifyCourseDependencies } from './typed-course-direct.mjs';

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
      (leaf !== 'constants.ts' || parts.length === 1) &&
      [
        'index.ts',
        'draft.ts',
        'constants.ts',
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

/** Bind generated Course-owned handoffs one-to-one to the sealed inventory.
 * This examines only fixed, JSON-literal outputs from trusted seed generators.
 * It never reads or parses candidate entrypoint TypeScript, or regenerates it.
 */
function assertCourseInventory(manifest, meta, entries) {
  const root = meta.textbookRoot + '/data/courses/' + meta.courseId.at(-1) + '/' + meta.courseId;
  const inventory = manifest.inventory;
  if (
    !inventory ||
    !Array.isArray(inventory.lessons) ||
    !Array.isArray(inventory.episodes) ||
    !Array.isArray(inventory.assessments) ||
    inventory.lessons.some(row => row?.type !== 'lesson') ||
    inventory.episodes.some(row => row?.type !== 'episode') ||
    inventory.assessments.some(row => row?.type !== 'assessment') ||
    !Array.isArray(manifest.pendingPlacements) ||
    !Array.isArray(manifest.pendingEpisodes)
  )
    throw Error('Missing complete Course inventory');
  const seen = new Set(),
    seenOrder = new Set();
  const seeds = new Set(
    [...entries.keys()].filter(p => p.startsWith(meta.textbookRoot + '/data/lessons/') && p.endsWith('/draft.ts')),
  );
  const episodes = new Set(
    [...entries.keys()].filter(p => p.startsWith(root + '/content/') && p.endsWith('/draft.ts')),
  );
  const pendingLessons = new Map(),
    pendingEpisodes = new Map();
  const isSlug = s => typeof s === 'string' && /^[A-Za-z][A-Za-z0-9]*$/.test(s);
  function outputLiteral(filename, symbol, marker) {
    const entry = entries.get(filename);
    if (entry?.kind !== 'typescript') throw Error('Missing canonical Course source handoff: ' + filename);
    const source = Buffer.from(entry.data, 'base64').toString('utf8');
    const head = 'export const ' + symbol + ' = ';
    const begin = source.indexOf(head);
    const end = source.indexOf(marker, begin + head.length);
    if (begin < 0 || end < 0 || source.indexOf(head, begin + head.length) !== -1)
      throw Error('Malformed generated handoff: ' + filename);
    try {
      return JSON.parse(source.slice(begin + head.length, end));
    } catch {
      throw Error('Invalid JSON seed handoff: ' + filename);
    }
  }
  /** A placement source belongs to the immediate Course/Module/Chapter parent,
   * never to a shadow Lesson re-export or draft handoff. */
  function expectedParent(row) {
    const parts = row.placementPath.slice(root.length + 1).split('/');
    // The Assessment kind, not an ambiguous parent slug, selects the extra segment.
    const ancestors = parts.slice(0, row.type === 'assessment' ? -2 : -1);
    const parent = ancestors.length === 1 && ancestors[0] === 'content' ? '' : ancestors.join('/');
    return root + '/' + (parent ? parent + '/' : '') + 'index.ts';
  }
  function parentSource(row) {
    const expected = expectedParent(row);
    if (row.placementSourcePath !== expected || entries.get(expected)?.kind !== 'typescript')
      throw Error('Course placement does not identify the owning parent index.ts');
    return Buffer.from(entries.get(expected).data, 'base64').toString('utf8');
  }
  function requireStub(row) {
    const name = row.type === 'lesson'
      ? 'defineLessonStub'
      : row.type === 'episode'
        ? 'defineEpisodeStub'
        : 'defineAssessmentStub';
    const expected = JSON.stringify(row.slug) + ': ' + name +
      '({ id: ' + JSON.stringify(row.id) + ', slug: ' + JSON.stringify(row.slug) + ' })';
    const source = parentSource(row);
    if (!source.includes(expected) || !source.includes(name))
      throw Error('Missing or displaced Course ' + row.type + ' stub at ' + row.placementPath);
  }
  for (const row of [...inventory.lessons, ...inventory.episodes, ...inventory.assessments]) {
    if (
      !row ||
      !['lesson', 'episode', 'assessment'].includes(row.type) ||
      !UUID.test(row.id) ||
      typeof row.placementPath !== 'string' ||
      !row.placementPath.startsWith(root + '/content/') ||
      !isSlug(row.slug) ||
      row.placementPath.split('/').at(-1) !== row.slug ||
      !row.placementPath
        .slice(root.length + 1)
        .split('/')
        .every(isSlug) ||
      !Array.isArray(row.orderPath) ||
      !row.orderPath.length ||
      row.orderPath.length > 4 ||
      row.orderPath.some(n => !Number.isSafeInteger(n) || n < 0)
    )
      throw Error('Invalid Course inventory identity, placement or order');
    const order = JSON.stringify(row.orderPath);
    if (seen.has(row.placementPath) || seenOrder.has(order))
      throw Error('Duplicate Course inventory placement or order');
    seen.add(row.placementPath);
    seenOrder.add(order);
    const rel = row.placementPath.slice(root.length + 1);
    // Course's deterministic UUID namespace excludes the top-level content/ segment.
    const allocationPath = rel.slice('content/'.length);
    if (row.type === 'lesson') {
      const lessonRoot = meta.textbookRoot + '/data/lessons/' + row.id.at(-1) + '/' + row.id;
      if (row.kind === 'new') {
        const draft = lessonRoot + '/draft.ts';
        if (
          row.id !== deriveCourseEntityId(meta.courseId, 'lesson', allocationPath) ||
          row.status !== 'pending-lesson-stage1' ||
          row.sourcePath !== draft ||
          row.placementSourcePath !== expectedParent(row) ||
          !seeds.delete(draft)
        )
          throw Error('Course Lesson inventory does not match a unique generated seed');
        const source = outputLiteral(draft, 'lessonSeed', ' as const satisfies CourseWorkflowLessonSeed;');
        if (
          source?.config?.id !== row.id ||
          source.config.slug !== row.slug ||
          source.config.type !== 'lesson' ||
          !source.proposal ||
          !source.languageContext
        )
          throw Error('Generated Lesson seed differs from Course inventory identity');
        requireStub(row);
        pendingLessons.set(rel, row);
      } else if (['reused', 'overridden'].includes(row.kind)) {
        if (
          row.status !== 'verified-reference' ||
          row.sourcePath !== lessonRoot + '/index.ts' ||
          row.placementSourcePath !== expectedParent(row) ||
          !SHA.test(row.sourceSha || '') ||
          !isSlug(row.sourceExportName)
        )
          throw Error('Course reused Lesson inventory does not match generated direct reference');
        const parent = parentSource(row);
        const expectedImport = '#lessonsData/' + row.id.at(-1) + '/' + row.id + '/index';
        const quoted = JSON.stringify(expectedImport);
        const normalized = parent.replaceAll("'" + expectedImport + "'", quoted);
        const expectedLine = 'import { ' + row.sourceExportName + ' as child_' + row.slug +
          ' } from ' + quoted + ';';
        const expectedPlacement = JSON.stringify(row.slug) + ': ' +
          (row.kind === 'overridden' ? 'placeLesson(child_' + row.slug + ', ' : 'child_' + row.slug);
        if (
          normalized.split('\n').filter(line => line === expectedLine).length !== 1 ||
          !parent.includes(expectedPlacement)
        )
          throw Error('Course Lesson direct import or placement-local Config patch missing');
      } else throw Error('Invalid Course Lesson kind');
    } else if (row.type === 'episode') {
      if (
        row.kind !== 'new' ||
        !['pending-episode-scenario', 'materialized-source'].includes(row.status) ||
        row.id !== deriveCourseEntityId(meta.courseId, 'episode', allocationPath)
      )
        throw Error('Invalid Course Episode inventory');
      const filename = row.placementPath + (row.status === 'pending-episode-scenario' ? '/draft.ts' : '/index.ts');
      if (row.sourcePath !== filename || row.placementSourcePath !== expectedParent(row) || !entries.has(filename))
        throw Error('Episode inventory source missing or displaced');
      if (row.status === 'pending-episode-scenario') {
        if (!episodes.delete(filename)) throw Error('Duplicate Episode handoff');
        const source = outputLiteral(filename, 'episodeStage1', ' as const satisfies EpisodeWorkflowStage1Handoff;');
        // Ownership, source SHA and original position belong to this sealed
        // Course manifest and parent stub, not duplicated Episode narrative.
        const production = source?.production;
        if (
          source?.config?.id !== row.id ||
          source.config.slug !== row.slug ||
          source.config.type !== 'episode' ||
          !production ||
          typeof production.focus !== 'string' ||
          !production.focus.trim() ||
          typeof production.purpose !== 'string' ||
          !production.purpose.trim() ||
          typeof production.languages?.document !== 'string' ||
          !Array.isArray(production.languages.planned) ||
          !production.languages.planned.includes(production.languages.document) ||
          Object.keys(production).some(key => !['focus', 'purpose', 'languages'].includes(key))
        )
          throw Error('Episode handoff differs from Course inventory identity');
        requireStub(row);
        pendingEpisodes.set(rel, row);
      }
    } else {
      // Assessment Stage 5 is intentionally only a typed seed plus an inline
      // Not implemented Configurator. No fake bank IDs or completed Quiz.
      const draft = row.placementPath + '/draft.ts';
      if (
        row.kind !== 'new' ||
        row.status !== 'pending-assessment-design' ||
        row.id !== deriveCourseEntityId(meta.courseId, 'assessment', allocationPath) ||
        row.sourcePath !== draft ||
        row.placementSourcePath !== expectedParent(row) ||
        !episodes.delete(draft) ||
        !Array.isArray(row.lessonDependencies) ||
        !row.lessonDependencies.length ||
        row.lessonDependencies.some(value => typeof value !== 'string' || !value.startsWith('content/'))
      )
        throw Error('Invalid Course Assessment pending seed or inline parent placement');
      const seed = outputLiteral(draft, 'assessmentSeed', ' as const satisfies AssessmentWorkflowSeed;');
      if (
        seed?.config?.id !== row.id ||
        seed.config.slug !== row.slug ||
        seed.config.type !== 'assessment' ||
        seed.production?.placement?.courseId !== meta.courseId ||
        seed.production.placement.path !== rel ||
        JSON.stringify(seed.production.placement.orderPath) !== order ||
        seed.production.placement.reviewedCourseSourceBlobSha !== meta.sourceBlobSha ||
        seed.production.languages?.document === undefined ||
        !Array.isArray(seed.production.languages?.planned) ||
        !seed.production.languages.planned.includes(seed.production.languages.document) ||
        JSON.stringify(seed.production.lessonDependencies) !== JSON.stringify(row.lessonDependencies)
      )
        throw Error('Assessment seed differs from pinned Course inventory');
      requireStub(row);
    }
  }
  function checkPending(list, expected, idField, filename) {
    const seen = new Set();
    for (const item of list) {
      const row = expected.get(item?.path);
      if (
        !row ||
        seen.has(item.path) ||
        item.slug !== row.slug ||
        item[idField] !== row.id ||
        item.orderIndex !== row.orderPath.at(-1) ||
        item.handoffPath !== filename(row)
      )
        throw Error('Invalid or duplicated pending Course handoff record');
      seen.add(item.path);
    }
    if (seen.size !== expected.size) throw Error('Unregistered pending Course handoff');
  }
  checkPending(manifest.pendingPlacements, pendingLessons, 'lessonId', row => row.sourcePath);
  checkPending(manifest.pendingEpisodes, pendingEpisodes, 'episodeId', row => row.sourcePath.slice(root.length + 1));
  if (seeds.size || episodes.size) throw Error('Unregistered Course Lesson, Episode or Assessment draft');
}

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
    manifest.publishable !== false ||
    manifest.materializedPath !== path.posix.dirname(meta.sourcePath) + '/index.ts' ||
    !Array.isArray(manifest.entries) ||
    !manifest.entries.length ||
    manifest.entries.length > 1500
  )
    throw Error('Typed Course manifest does not match independently reviewed source metadata');
  let bytes = 0;
  const seen = new Set();
  const entries = new Map();
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
    entries.set(file.path, file);
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
  assertCourseInventory(manifest, meta, entries);
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
  return ['repo', 'number', 'head', 'branch', 'courseId', 'sourcePath', 'sourceBlobSha', 'textbookRoot'].every(
    key => a[key] === b[key],
  );
}

/** Format the source transaction's commit proof from the same digest used by reconciliation. */
export function buildCourseCommitMetadata(meta, manifest) {
  const digest = manifestDigest(manifest);
  return {
    digest,
    message:
      'Materialize reviewed typed Course ' +
      meta.courseId +
      '\n\nCourse-PR: #' +
      meta.number +
      '\nSource-Blob: ' +
      meta.sourceBlobSha +
      '\nCourse-Inventory-Manifest: ' +
      digest,
  };
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
  // The write-token job NEVER executes authored code or recomputes a plan.
  // Reauthorize and verify the exact SHA-pinned manifest and existing Lesson dependencies.
  verifyCourseDependencies(meta, root, path.resolve(import.meta.dirname, '../../..'), {
    courseId: meta.courseId,
    publishable: false,
    inventory: manifest.inventory,
  });
  checkTypedCourseTargets(meta, root, manifest);
  const original = await github('git/commits/' + meta.head);
  if (!SHA.test(original?.tree?.sha ?? '')) throw Error('Missing approved parent Git tree');
  const tree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
    tree: oneCommitTree(manifest),
  });
  if (!SHA.test(tree?.sha ?? '')) throw Error('Invalid typed Course commit tree');
  const { digest, message } = buildCourseCommitMetadata(meta, manifest);
  const commit = await github('git/commits', 'POST', {
    message,
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
  // Post-commit inventory reconciliation is a separate, independently retryable job.
  // Its failure cannot roll back or invalidate an already authorized source commit.
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
  report(
    'Typed Course Stage 5: one atomic commit ' +
      commit.sha +
      ' from ' +
      meta.head +
      ', reviewed blob ' +
      meta.sourceBlobSha +
      ', ' +
      manifest.entries.length +
      ' generated sources; reviewed draft consumed, exact bytes retained in Git history.',
  );
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
