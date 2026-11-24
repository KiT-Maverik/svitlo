/** Trusted Episode Stage 5: read-only analysis, manifest replay and one Git commit.
 * Candidate source is read as Git blobs and parsed/typechecked, never executed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { github, gitBlob, requireActor, safeBranch, report } from '../courseMaterialization/course-gate.mjs';
import { checkGeneratedCourseTypes } from '../courseMaterialization/typed-course-semantics.mjs';
import { materializeCourseEpisodeSection } from '../courseMaterialization/typed-course-section.mjs';
import { discoverEpisodeDraft, inspectEpisode } from './episode-gate.mjs';
import { parseEpisodeDraft, planEpisode } from './episode-source.mjs';

const SHA = /^[a-f0-9]{40}$/;
const maxBytes = 32 * 1024 * 1024;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const ordinary = entry => entry?.type === 'blob' && entry.mode === '100644';
const metadataKeys = [
  'repo',
  'number',
  'parentNumber',
  'branch',
  'parentBranch',
  'head',
  'parentHead',
  'sourcePath',
  'courseRoot',
  'courseId',
  'placement',
  'parentPath',
  'textbookRoot',
  'sourceBlobSha',
  'handoffBlobSha',
  'parentBlobSha',
  'reviews',
];
export const sameMeta = (a, b) => metadataKeys.every(key =>
  key === 'reviews' ? JSON.stringify(a[key]) === JSON.stringify(b[key]) : a[key] === b[key],
);
export function parseEpisodeMetadata(encoded) {
  if (typeof encoded !== 'string' || !/^[A-Za-z0-9+/=]{1,16384}$/.test(encoded))
    throw Error('Missing Episode metadata');
  const meta = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  const identity = discoverEpisodeDraft([{ filename: meta.sourcePath, status: 'modified' }]);
  if (
    Object.keys(identity).some(key => identity[key] !== meta[key]) ||
    meta.repo !== process.env.GITHUB_REPOSITORY ||
    !Number.isSafeInteger(meta.number) ||
    meta.number < 1 ||
    !Number.isSafeInteger(meta.parentNumber) ||
    meta.parentNumber < 1 ||
    meta.number === meta.parentNumber ||
    !safeBranch(meta.branch, meta.parentBranch) ||
    !safeBranch(meta.parentBranch, process.env.COURSE_DEFAULT_BRANCH) ||
    !['head', 'parentHead', 'sourceBlobSha', 'handoffBlobSha', 'parentBlobSha'].every(key =>
      SHA.test(meta[key] ?? ''),
    ) ||
    !/^[A-Za-z0-9-]+$/.test(meta.actor ?? '') ||
    !Array.isArray(meta.reviews) || meta.reviews.length !== 2 ||
    !meta.reviews.every((item, i) =>
      item?.stage === i + 3 && item.verdict === 'accepted' &&
      SHA.test(item.commit ?? '') && SHA.test(item.blob ?? ''),
    ) ||
    meta.reviews[1].commit !== meta.head || meta.reviews[1].blob !== meta.sourceBlobSha
  )
    throw Error('Invalid pinned Episode transaction metadata');
  return meta;
}

function gitReader(root) {
  const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: maxBytes, encoding: 'utf8' });
  const tree = (sha, scope) => {
    const result = new Map();
    for (const row of git('ls-tree', '-r', '-z', sha, '--', scope).split('\0').filter(Boolean)) {
      const match = row.match(/^(\d{6}) (blob|tree|commit) ([a-f0-9]{40})\t(.+)$/s);
      if (!match || result.has(match[4])) throw Error('Invalid pinned Git tree entry');
      result.set(match[4], { mode: match[1], type: match[2], sha: match[3] });
    }
    return result;
  };
  const blob = (entry, name) => {
    if (!ordinary(entry) || !SHA.test(entry.sha)) throw Error('Expected ordinary non-symlink source: ' + name);
    const bytes = execFileSync('git', ['cat-file', 'blob', entry.sha], { cwd: root, maxBuffer: maxBytes });
    const value = bytes.toString('utf8');
    if (!Buffer.from(value, 'utf8').equals(bytes) || gitBlob(bytes) !== entry.sha)
      throw Error('Pinned source is not exact UTF-8: ' + name);
    return value;
  };
  return { git, tree, blob };
}

function safeOutput(file, meta) {
  const prefix = meta.courseRoot + '/' + meta.placement + '/';
  if (file === meta.parentPath) return true;
  if (typeof file !== 'string' || !file.startsWith(prefix) || file.length > 500) return false;
  const parts = file.slice(prefix.length).split('/');
  if (
    parts
      .slice(0, -1)
      .some(p => !/^[A-Za-z][A-Za-z0-9]*$/.test(p) || ['__proto__', 'prototype', 'constructor'].includes(p))
  )
    return false;
  const leaf = parts.at(-1);
  return (
    ['index.ts', 'languages.ts', 'specification.md', 'methodology.md', 'markdown.md'].includes(leaf) ||
    /^[a-z]{2}(?:-[A-Z]{2})?\.md$/.test(leaf) ||
    /^code\.[a-z0-9]{1,10}$/.test(leaf)
  );
}
export function checkEpisodeTargets(meta, files, tree) {
  if (
    !ordinary(tree.get(meta.sourcePath)) ||
    tree.get(meta.sourcePath).sha !== meta.sourceBlobSha ||
    !ordinary(tree.get(meta.parentPath)) ||
    tree.get(meta.parentPath).sha !== meta.parentBlobSha
  )
    throw Error('Reviewed Episode draft or parent source differs from pinned Git blob');
  const seen = new Set();
  for (const file of files) {
    if (
      !safeOutput(file.path, meta) ||
      seen.has(file.path) ||
      file.path === meta.sourcePath ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind) ||
      typeof file.content !== 'string' ||
      !file.content.length
    )
      throw Error('Invalid or duplicate Episode materializer target: ' + file.path);
    seen.add(file.path);
    if (file.path !== meta.parentPath && tree.has(file.path))
      throw Error('Episode target would overwrite existing authored source: ' + file.path);
    const segments = file.path.split('/');
    for (let depth = 1; depth < segments.length; depth++) {
      const ancestor = segments.slice(0, depth).join('/');
      if (tree.has(ancestor)) throw Error('Non-directory or symlink ancestor: ' + ancestor);
    }
    if ([...tree.keys()].some(existing => existing.startsWith(file.path + '/')))
      throw Error('Episode target would replace an existing directory: ' + file.path);
  }
  if (!seen.has(meta.parentPath) || !seen.has(meta.sourcePath.replace(/draft\.ts$/, 'index.ts')))
    throw Error('Episode transaction must restore exact parent and create final index');
  return true;
}
export function buildEpisodeManifest(meta, plan) {
  if (
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    !plan.files.length ||
    plan.files.length > 1500 ||
    !/^[a-f0-9-]{36}$/.test(plan.episodeId ?? '')
  )
    throw Error('Invalid Episode source plan');
  let bytes = 0;
  const entries = plan.files
    .map(file => {
      const data = Buffer.from(file.content, 'utf8');
      bytes += data.length;
      if (bytes > maxBytes) throw Error('Oversized Episode source plan');
      return { path: file.path, kind: file.kind, sha256: hash(data), data: data.toString('base64') };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
  return {
    version: 1,
    operation: 'typed-episode-stage5',
    meta,
    episodeId: plan.episodeId,
    publishable: false,
    entries,
    diagnostics: plan.diagnostics,
  };
}
export function episodeCommitTree(manifest) {
  return [
    ...manifest.entries.map(file => ({
      path: file.path,
      mode: '100644',
      type: 'blob',
      content: Buffer.from(file.data, 'base64').toString('utf8'),
    })),
    { path: manifest.meta.sourcePath, mode: '100644', type: 'blob', sha: null },
  ];
}

export function prepareEpisode(
  meta,
  root,
  renderSection = materializeCourseEpisodeSection,
  checkTypes = checkGeneratedCourseTypes,
) {
  const reader = gitReader(root);
  if (
    reader.git('rev-parse', 'HEAD').trim() !== meta.head ||
    reader.git('status', '--porcelain=v1', '--untracked-files=all').trim() ||
    reader.git('merge-base', meta.parentHead, meta.head).trim() !== meta.parentHead
  )
    throw Error('Candidate checkout must be clean and pinned to current reviewed Episode and parent HEAD');
  const changes = reader.git('diff', '--name-status', '-z', meta.parentHead, meta.head).split('\0').filter(Boolean);
  if (changes.length !== 2 || changes[0] !== 'M' || changes[1] !== meta.sourcePath)
    throw Error('Reviewed Episode changes must contain exactly the allocated draft');
  const tree = reader.tree(meta.head, meta.courseRoot);
  const base = reader.tree(meta.parentHead, meta.courseRoot);
  if (
    base.get(meta.sourcePath)?.sha !== meta.handoffBlobSha ||
    base.get(meta.parentPath)?.sha !== meta.parentBlobSha ||
    tree.get(meta.sourcePath)?.sha !== meta.sourceBlobSha ||
    tree.get(meta.parentPath)?.sha !== meta.parentBlobSha
  )
    throw Error('Source/parent Git tree does not match independent review and allocated handoff');
  const original = reader.blob(base.get(meta.sourcePath), meta.sourcePath);
  const source = reader.blob(tree.get(meta.sourcePath), meta.sourcePath);
  const parent = reader.blob(tree.get(meta.parentPath), meta.parentPath);
  const handoff = parseEpisodeDraft(original, 'EpisodeWorkflowStage1Handoff');
  const reviewed = parseEpisodeDraft(source, 'EpisodeWorkflowMaterializerInput');
  checkTypes({ files: [{ path: meta.sourcePath, kind: 'typescript', content: source }] }, meta.textbookRoot);
  const plan = planEpisode(handoff, reviewed, meta, parent, renderSection);
  checkEpisodeTargets(meta, plan.files, tree);
  // Supply pinned authored dependency modules as virtual TS files, never import/execute them.
  const replace = new Set(plan.files.map(file => file.path));
  const context = [];
  let total = 0;
  function addContext(filename, entry) {
    if (
      !filename.endsWith('.ts') ||
      filename.endsWith('/draft.ts') ||
      /\/workflow\.stage\d+\.ts$/.test(filename) ||
      replace.has(filename)
    )
      return;
    if (
      !filename.startsWith(meta.textbookRoot + '/') ||
      filename.split('/').some(part => !/^[A-Za-z0-9_.-]+$/.test(part) || part === '.' || part === '..')
    )
      throw Error('Unsafe virtual authored dependency path');
    const content = reader.blob(entry, filename);
    total += Buffer.byteLength(content);
    if (total > maxBytes || context.length >= 5000)
      throw Error('Episode dependency scope exceeds trusted analysis bound');
    context.push({ path: filename, kind: 'typescript', content });
  }
  for (const [filename, entry] of tree) addContext(filename, entry);
  const lessonRefs = new Set();
  for (const file of [...context, ...plan.files]) {
    for (const match of file.content.matchAll(
      /#lessonsData\/([a-f0-9]\/([a-f0-9-]{36}))\/(?:index|[A-Za-z0-9_/-]+)(?=['"])/g,
    )) {
      if (match[1][0] !== match[2].at(-1)) throw Error('Invalid Lesson dependency bucket');
      lessonRefs.add(meta.textbookRoot + '/data/lessons/' + match[1]);
    }
  }
  for (const lesson of lessonRefs)
    for (const [filename, entry] of reader.tree(meta.head, lesson)) addContext(filename, entry);
  checkTypes({ files: [...context, ...plan.files] }, meta.textbookRoot);
  return buildEpisodeManifest(meta, plan);
}

function readManifest(filename) {
  if (
    !filename ||
    fs.lstatSync(filename).isSymbolicLink() ||
    !fs.statSync(filename).isFile() ||
    fs.statSync(filename).size > 48 * 1024 * 1024
  )
    throw Error('Missing or unsafe Episode analysis manifest');
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}
async function main() {
  const mode = process.argv[2];
  if (!['analyze', 'publish'].includes(mode) || process.argv.length !== 3)
    throw Error('Usage: episode-transaction.mjs analyze|publish');
  const meta = parseEpisodeMetadata(process.env.EPISODE_META_B64);
  const filename = process.env.EPISODE_MANIFEST;
  if (mode === 'analyze') {
    if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN)
      throw Error('Read-only Episode analysis must not receive write token');
    const manifest = prepareEpisode(meta, process.env.EPISODE_HEAD_ROOT);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, JSON.stringify(manifest));
    report('Read-only Episode plan: ' + manifest.entries.length + ' generated/parent files; no publication approval.');
    return;
  }
  await requireActor(meta.actor);
  if (!sameMeta(await inspectEpisode(meta.number, meta.parentNumber, meta), meta))
    throw Error('Episode authorization changed before source publication');
  const manifest = readManifest(filename);
  const expected = prepareEpisode(meta, process.env.EPISODE_HEAD_ROOT);
  if (JSON.stringify(manifest) !== JSON.stringify(expected))
    throw Error('Episode manifest differs from trusted deterministic plan');
  const original = await github('git/commits/' + meta.head);
  if (original?.sha !== meta.head || !SHA.test(original.tree?.sha ?? ''))
    throw Error('Missing reviewed parent Git tree');
  const tree = await github('git/trees', 'POST', { base_tree: original.tree.sha, tree: episodeCommitTree(manifest) });
  if (!SHA.test(tree?.sha ?? '')) throw Error('Invalid Episode Git tree');
  const commit = await github('git/commits', 'POST', {
    message:
      'Materialize reviewed Episode ' +
      manifest.episodeId +
      '\n\nEpisode-PR: #' +
      meta.number +
      '\nCourse-PR: #' +
      meta.parentNumber +
      '\nReviewed-Draft-Blob: ' +
      meta.sourceBlobSha +
      '\nStage4-Review: ' +
      meta.reviews[1].verdict + ' at ' + meta.reviews[1].commit +
      '\nStage3-Review: ' + meta.reviews[0].verdict + ' at ' + meta.reviews[0].commit +
      '\nStage3-Review-Blob: ' + meta.reviews[0].blob,
    tree: tree.sha,
    parents: [meta.head],
  });
  if (!SHA.test(commit?.sha ?? '')) throw Error('Could not create Episode commit');
  if (!sameMeta(await inspectEpisode(meta.number, meta.parentNumber, meta), meta))
    throw Error('Episode/parent branch or review changed before ref write');
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', { sha: commit.sha, force: false });
  if (updated?.object?.sha !== commit.sha)
    throw Error('Episode branch did not advance to exact materialization commit');
  report(
    'Episode Stage 5 committed ' +
      commit.sha +
      '; consumed exact draft ' +
      meta.sourceBlobSha +
      ', restored reserved parent placement, source only. Human Media Generation and QA remain incomplete.',
  );
}
if (process.argv[1]?.endsWith('/episode-transaction.mjs'))
  main().catch(error => {
    report('Episode transaction rejected: ' + error.message);
    process.exitCode = 1;
  });
