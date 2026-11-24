#!/usr/bin/env node
/** Source-pinned Course Stage 5 analysis. No candidate AST decoder, custom
 * renderer bundle, semantic TypeScript checker or privileged Git writer here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { gitBlob } from './course-gate.mjs';
import { parseTypedMetadata } from './typed-course-gate.mjs';
import { runIsolatedMaterialization } from '../directMaterialization/run-isolated.mjs';

const sha = /^[a-f0-9]{40}$/i;
const safePath = value =>
  typeof value === 'string' &&
  value.length > 0 &&
  value.length <= 520 &&
  !value.startsWith('/') &&
  !value.includes('\\') &&
  value.split('/').every(x => x && x !== '.' && x !== '..' && !['__proto__', 'prototype', 'constructor'].includes(x));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const git = (root, ...args) =>
  execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
export function checkedSource(meta, checkout) {
  const root = fs.realpathSync(checkout);
  if (
    !fs.statSync(root).isDirectory() ||
    !fs.existsSync(path.join(root, '.git')) ||
    git(root, 'rev-parse', 'HEAD') !== meta.head ||
    git(root, 'status', '--porcelain=v1', '--untracked-files=all')
  )
    throw Error('Expected a clean, SHA-pinned Course candidate checkout');
  const sourcePath = meta.sourcePath;
  if (!safePath(sourcePath) || !sourcePath.startsWith(meta.textbookRoot + '/data/courses/'))
    throw Error('Invalid Course draft source path');
  const indexed = git(root, 'ls-files', '--stage', '--', sourcePath);
  if (!indexed.startsWith('100644 ') || indexed.split('\n').length !== 1)
    throw Error('Course source is not one regular Git blob');
  let location = root;
  for (const segment of sourcePath.split('/')) {
    location = path.join(location, segment);
    if (fs.lstatSync(location).isSymbolicLink()) throw Error('Symlinked Course source');
  }
  const bytes = fs.readFileSync(location);
  if (!Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes) || gitBlob(bytes) !== meta.sourceBlobSha)
    throw Error('Candidate source differs from reviewed Git blob');
  return { root, source: bytes.toString('utf8') };
}
function checkedExistingLesson(meta, root, trustedRoot, row) {
  const prefix = meta.textbookRoot + '/data/lessons/';
  const file = row.sourcePath;
  if (
    !safePath(file) ||
    !file.startsWith(prefix) ||
    !new RegExp('^' + prefix + '([a-f0-9])/([a-f0-9-]{36})/index\\.ts$', 'i').test(file) ||
    file !== prefix + row.id.at(-1) + '/' + row.id + '/index.ts' ||
    !sha.test(row.sourceSha ?? '')
  )
    throw Error('Course tried to reuse an unverified Lesson identity');
  const filename = path.join(root, file);
  if (!fs.existsSync(filename) || !fs.lstatSync(filename).isFile() || fs.lstatSync(filename).isSymbolicLink())
    throw Error('Missing independently authored Lesson source');
  const current = fs.readFileSync(filename);
  if (gitBlob(current) !== git(root, 'rev-parse', 'HEAD:' + file))
    throw Error('Existing Lesson source differs from pinned PR Git tree');
  if (gitBlob(current) !== row.sourceSha) {
    if (
      !git(root, 'cat-file', '-t', row.sourceSha).includes('commit') ||
      git(root, 'show', row.sourceSha + ':' + file) !== current.toString('utf8')
    )
      throw Error('Existing Lesson is not identical to its reviewed source revision');
    execFileSync('git', ['-C', root, 'merge-base', '--is-ancestor', row.sourceSha, 'HEAD']);
  }
  // Reused dependencies must already exist unchanged on the trusted default branch.
  const lessonDir = path.posix.dirname(file);
  const trustedTree = git(trustedRoot, 'ls-tree', '-r', 'HEAD', '--', lessonDir);
  const candidateTree = git(root, 'ls-tree', '-r', 'HEAD', '--', lessonDir);
  if (!trustedTree || trustedTree !== candidateTree)
    throw Error('Existing Lesson differs from independently merged default-branch source');
}
export function verifyCourseDependencies(meta, root, trustedRoot, plan) {
  if (
    plan?.courseId !== meta.courseId ||
    plan?.publishable !== false ||
    !Array.isArray(plan.inventory?.lessons) ||
    !Array.isArray(plan.inventory?.episodes)
  )
    throw Error('Incomplete Course source or placement inventory');
  const keys = new Set();
  for (const row of [...plan.inventory.lessons, ...plan.inventory.episodes]) {
    if (!row || !safePath(row.placementPath) || keys.has(row.placementPath))
      throw Error('Invalid/duplicate Course placement inventory');
    keys.add(row.placementPath);
    if (row.type === 'lesson' && ['reused', 'overridden'].includes(row.kind))
      checkedExistingLesson(meta, root, trustedRoot, row);
  }
}
export function buildTypedCourseManifest(meta, plan) {
  if (
    !plan ||
    plan.sourcePath !== meta.sourcePath ||
    plan.sourceBlobSha !== meta.sourceBlobSha ||
    plan.reviewCommitSha !== meta.reviewCommitSha ||
    plan.courseId !== meta.courseId ||
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    !plan.files.length ||
    plan.files.length > 1500
  )
    throw Error('Invalid reviewed direct Course source plan');
  const seen = new Set();
  let size = 0;
  const entries = plan.files.map(file => {
    if (
      !safePath(file?.path) ||
      seen.has(file.path) ||
      typeof file.content !== 'string' ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind)
    )
      throw Error('Invalid or duplicate generated Course file');
    seen.add(file.path);
    const bytes = Buffer.from(file.content, 'utf8');
    size += bytes.length;
    if (size > 32 * 1024 * 1024 || !bytes.length) throw Error('Oversized/empty Course output');
    return { path: file.path, kind: file.kind, sha256: sha256(bytes), data: bytes.toString('base64') };
  });
  const materializedPath = path.posix.dirname(meta.sourcePath) + '/index.ts';
  if (seen.has(meta.sourcePath) || !seen.has(materializedPath) || plan.materializedPath !== materializedPath)
    throw Error('Missing reviewed Course draft-to-index transition');
  return {
    version: 2,
    operation: 'typed-course-stage5',
    repo: meta.repo,
    number: meta.number,
    head: meta.head,
    branch: meta.branch,
    actor: meta.actor,
    courseId: meta.courseId,
    textbookRoot: meta.textbookRoot,
    sourcePath: meta.sourcePath,
    sourceBlobSha: meta.sourceBlobSha,
    materializedPath,
    reviewCommitSha: meta.reviewCommitSha,
    reviewVerdict: meta.reviewVerdict,
    publishable: false,
    diagnostics: plan.diagnostics,
    inventory: plan.inventory,
    pendingEpisodes: plan.pendingEpisodes,
    pendingPlacements: plan.pendingPlacements,
    entries: entries.sort((a, b) => a.path.localeCompare(b.path)),
  };
}
export function analyzeDirectCourse(meta, candidateRoot, trustedRoot) {
  const { root } = checkedSource(meta, candidateRoot);
  const plan = runIsolatedMaterialization({
    trustedRoot,
    candidateRoot: root,
    textbook: meta.textbookRoot,
    operation: 'course-stage5',
    source: {
      sourcePath: meta.sourcePath,
      sourceBlobSha: meta.sourceBlobSha,
      sourceCommitSha: meta.head,
    },
  });
  verifyCourseDependencies(meta, root, trustedRoot, plan);
  return buildTypedCourseManifest(meta, plan);
}
async function main() {
  if (process.argv.length !== 3 || process.argv[2] !== 'analyze') throw Error('Usage: typed-course-direct.mjs analyze');
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN)
    throw Error('Course source execution cannot receive GitHub credentials');
  const meta = parseTypedMetadata(process.env.COURSE_TYPED_META_B64);
  const trustedRoot = path.resolve(import.meta.dirname, '../../..');
  const manifest = analyzeDirectCourse(meta, process.env.COURSE_HEAD_ROOT, trustedRoot);
  if (!process.env.COURSE_TYPED_REPORT) throw Error('Missing Course report path');
  fs.mkdirSync(path.dirname(process.env.COURSE_TYPED_REPORT), { recursive: true });
  fs.writeFileSync(process.env.COURSE_TYPED_REPORT, JSON.stringify(manifest), { flag: 'wx' });
}
if (process.argv[1]?.endsWith('/typed-course-direct.mjs'))
  main().catch(error => {
    console.error('Direct Course analyze failed: ' + error.message);
    process.exitCode = 1;
  });
