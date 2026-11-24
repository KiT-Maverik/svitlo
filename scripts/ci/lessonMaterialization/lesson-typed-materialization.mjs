#!/usr/bin/env node
/**
 * @fileoverview Typed Lesson Stage 6.1 GitHub PR orchestration.
 * ANALYZE: trusted read token, static TS extraction, real Engine materializer.
 * PUBLISH: dependency-free trusted Git API, exact SHA-attested manifest, one
 * no-clobber Git tree transition at the authorized PR head.
 * No candidate TS runs, no bank/asset/Scene creation, no Props publication.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { inspectTyped, typedPath } from './lesson-typed-gate.mjs';
import { gitBlob, github, requireActor, report } from '../courseMaterialization/course-gate.mjs';

const sha = /^[0-9a-f]{40}$/;
const hash = /^[0-9a-f]{64}$/;
const ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const MAX_COUNT = 512;
const MAX_SINGLE = 4 * 1024 * 1024;
const MAX_TOTAL = 24 * 1024 * 1024;
const digest = bytes => createHash('sha256').update(bytes).digest('hex');

export function typedMeta(encoded = process.env.LESSON_TYPED_META_B64) {
  if (typeof encoded !== 'string' || encoded.length > 24000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded))
    throw Error('Missing or invalid typed Lesson authorization');
  const info = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  if (
    !Number.isSafeInteger(info.number) ||
    info.number < 1 ||
    info.operation !== 'materialize-typed' ||
    info.repo !== process.env.GITHUB_REPOSITORY ||
    !sha.test(info.head || '') ||
    !sha.test(info.sourceBlob || '') ||
    !/^[A-Za-z0-9-]+$/.test(info.actor || '') ||
    !info.identity?.source ||
    !info.identity?.folder ||
    info.identity.source !== info.identity.folder + '/draft.ts' ||
    !Array.isArray(info.reviews) ||
    info.reviews.length !== 3 ||
    !info.reviews.every(
      (item, index) =>
        item.stage === index + 3 &&
        item.verdict === 'accepted' &&
        sha.test(item.commit || '') &&
        sha.test(item.blob || ''),
    ) ||
    info.reviews[2].commit !== info.head ||
    info.reviews[2].blob !== info.sourceBlob
  )
    throw Error('Malformed typed Lesson authorization snapshot');
  return info;
}

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).trim();
}
export function checkedTypedRoot(meta) {
  if (!process.env.LESSON_TYPED_CANDIDATE) throw Error('Candidate root missing');
  const root = fs.realpathSync(process.env.LESSON_TYPED_CANDIDATE);
  if (
    !fs.statSync(root).isDirectory() ||
    !fs.existsSync(path.join(root, '.git')) ||
    git(root, ['rev-parse', 'HEAD']) !== meta.head
  )
    throw Error('Typed candidate is not the pinned Lesson HEAD');
  if (git(root, ['status', '--porcelain=v1', '--untracked-files=all']))
    throw Error('Typed Lesson candidate must be clean');
  return root;
}

/** No symlink/ancestor escape, including untracked source/output folders. */
export function safeTarget(root, relative, requireFile = false) {
  if (
    typeof relative !== 'string' ||
    relative.startsWith('/') ||
    relative.includes('//') ||
    relative.includes('\\') ||
    relative.split('/').some(part => !part || part === '.' || part === '..')
  )
    throw Error('Unsafe Lesson source/output path');
  let target = root;
  for (const part of relative.split('/')) {
    target = path.join(target, part);
    try {
      const stat = fs.lstatSync(target);
      if (stat.isSymbolicLink()) throw Error('Symlink in Lesson source/output ancestry: ' + relative);
      if (target !== path.join(root, relative) && !stat.isDirectory())
        throw Error('Non-directory Lesson source/output ancestor: ' + relative);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  if (requireFile && (!fs.existsSync(target) || !fs.lstatSync(target).isFile()))
    throw Error('Expected regular tracked Lesson source: ' + relative);
  return target;
}
export function indexed(root, pkg) {
  const entries = execFileSync('git', ['ls-files', '-s', '-z', '--', pkg], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
    .split('\0')
    .filter(Boolean);
  const paths = new Set();
  for (const entry of entries) {
    const tab = entry.indexOf('\t');
    if (tab < 0) throw Error('Invalid Git tracked entry');
    const [mode] = entry.slice(0, tab).split(' ');
    if (!['100644', '100755'].includes(mode)) throw Error('Nonregular path in Lesson textbook');
    const name = entry.slice(tab + 1);
    if (paths.has(name)) throw Error('Duplicate tracked Lesson source');
    paths.add(name);
  }
  return paths;
}
export function matchingSnapshot(a, b) {
  return (
    a.number === b.number &&
    a.repo === b.repo &&
    a.head === b.head &&
    a.branch === b.branch &&
    a.base === b.base &&
    a.sourceBlob === b.sourceBlob &&
    JSON.stringify(a.identity) === JSON.stringify(b.identity) &&
    JSON.stringify(a.reviews) === JSON.stringify(b.reviews) &&
    JSON.stringify(a.parent) === JSON.stringify(b.parent)
  );
}
async function fresh(meta) {
  await requireActor(meta.actor);
  const live = await inspectTyped(meta.number, meta.head);
  if (!matchingSnapshot(meta, live)) throw Error('Typed Lesson HEAD, identity, parent or review source changed');
}
function sourceBytes(root, meta) {
  const filename = safeTarget(root, meta.identity.source, true);
  const bytes = fs.readFileSync(filename);
  if (
    bytes.length > MAX_SINGLE ||
    gitBlob(bytes) !== meta.sourceBlob ||
    !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)
  )
    throw Error('Stage 2 source differs from pinned Git blob or is not UTF-8');
  return bytes;
}

function asEntry(pathname, action, bytes) {
  if (!bytes.length || bytes.length > MAX_SINGLE || !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes))
    throw Error('Invalid Lesson Stage 6 output UTF-8 or size: ' + pathname);
  return { path: pathname, action, sha256: digest(bytes), data: bytes.toString('base64') };
}

/** Creating index.ts and deleting the reviewed draft constitute one atomic transition. */
export function typedManifest(plan, meta, original, tracked, root) {
  if (
    plan?.sourcePath !== meta.identity.source ||
    plan.materializedPath !== meta.identity.folder + '/index.ts' ||
    plan.lessonId !== meta.identity.id ||
    plan.sourceBlobSha !== meta.sourceBlob ||
    plan.reviewCommitSha !== meta.reviews[2].commit ||
    plan.publishable !== false ||
    !Array.isArray(plan.files) ||
    plan.files.length < 1 ||
    plan.files.length > MAX_COUNT - 1 ||
    !Array.isArray(plan.diagnostics)
  )
    throw Error('Invalid or unreviewed Engine Lesson Stage 6 result');
  const entries = [];
  const seen = new Set();
  for (const file of plan.files) {
    const filename = file?.path;
    if (
      !typedPath(filename, meta.identity) ||
      seen.has(filename) ||
      filename === meta.identity.source ||
      !['typescript', 'markdown', 'specification', 'code'].includes(file.kind) ||
      typeof file.content !== 'string'
    )
      throw Error('Duplicate, unsupported or out-of-scope Engine Lesson file: ' + filename);
    seen.add(filename);
    safeTarget(root, filename);
    if (tracked.has(filename) || fs.existsSync(path.join(root, filename)))
      throw Error('Existing Lesson source collision: ' + filename);
    const contents = Buffer.from(file.content, 'utf8');
    entries.push(asEntry(filename, 'create', contents));
  }
  if (!seen.has(plan.materializedPath) || !tracked.has(meta.identity.source) || gitBlob(original) !== meta.sourceBlob)
    throw Error('Expected pinned Lesson draft deletion and canonical index.ts creation');
  entries.push(asEntry(meta.identity.source, 'delete', original));
  entries.sort((a, b) => a.path.localeCompare(b.path));
  const manifest = {
    version: 2,
    meta,
    sourceSha256: digest(original),
    reviewEvidenceSha: plan.reviewEvidenceSha,
    publishable: false,
    diagnostics: plan.diagnostics,
    entries,
  };
  verifyTypedManifest(manifest, meta, root, tracked, original);
  return manifest;
}

export function verifyTypedManifest(manifest, meta, root, tracked, original) {
  if (
    manifest?.version !== 2 ||
    !matchingSnapshot(manifest.meta || {}, meta) ||
    manifest.meta?.actor !== meta.actor ||
    manifest.meta?.operation !== 'materialize-typed' ||
    manifest.publishable !== false ||
    manifest.sourceSha256 !== digest(original) ||
    manifest.reviewEvidenceSha !== gitBlob(Buffer.from(JSON.stringify(meta.reviews))) ||
    !Array.isArray(manifest.diagnostics) ||
    manifest.diagnostics.length > MAX_COUNT ||
    !Array.isArray(manifest.entries) ||
    manifest.entries.length < 3 ||
    manifest.entries.length > MAX_COUNT
  )
    throw Error('Typed Lesson artifact failed immutable source/review attestation');
  let total = 0,
    source = false,
    index = false;
  const seen = new Set();
  for (const entry of manifest.entries) {
    if (
      !entry ||
      !typedPath(entry.path, meta.identity) ||
      seen.has(entry.path) ||
      typeof entry.data !== 'string' ||
      entry.data.length > MAX_SINGLE * 1.4 + 16 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(entry.data) ||
      !hash.test(entry.sha256 || '')
    )
      throw Error('Unsafe/duplicate Lesson Stage 6 manifest entry');
    seen.add(entry.path);
    const bytes = Buffer.from(entry.data, 'base64');
    total += bytes.length;
    if (
      !bytes.length ||
      bytes.length > MAX_SINGLE ||
      total > MAX_TOTAL ||
      bytes.toString('base64') !== entry.data ||
      digest(bytes) !== entry.sha256 ||
      !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)
    )
      throw Error('Typed Lesson artifact changed bytes, hash or size: ' + entry.path);
    safeTarget(root, entry.path);
    if (entry.path === meta.identity.source) {
      if (entry.action !== 'delete' || !tracked.has(entry.path) || !bytes.equals(original))
        throw Error('Expected exact reviewed Lesson draft deletion');
      source = true;
    } else {
      if (entry.action !== 'create' || tracked.has(entry.path) || fs.existsSync(path.join(root, entry.path)))
        throw Error('Typed Lesson cannot clobber existing authored source: ' + entry.path);
      if (entry.path === meta.identity.folder + '/index.ts') index = true;
    }
  }
  if (!source || !index) throw Error('Incomplete typed Lesson draft deletion/index creation pair');
  return manifest.entries.length;
}

export function readTypedReport() {
  const filename = process.env.LESSON_TYPED_REPORT;
  const expected = process.env.LESSON_TYPED_REPORT_SHA256;
  if (
    !filename ||
    !fs.existsSync(filename) ||
    fs.lstatSync(filename).isSymbolicLink() ||
    fs.statSync(filename).size > 36 * 1024 * 1024 ||
    !hash.test(expected || '')
  )
    throw Error('Missing or invalid attested typed Lesson artifact');
  const bytes = fs.readFileSync(filename);
  if (digest(bytes) !== expected) throw Error('Typed Lesson artifact SHA256 attestation mismatch');
  return JSON.parse(bytes.toString('utf8'));
}

/** Semantic source-only validation uses the actual Engine declarations.
 * Draft Scene/media/selection blockers remain flagged; never suppress errors.
 */
function syntaxGenerated(files) {
  const requireTrusted = createRequire(import.meta.url);
  const ts = requireTrusted(path.join(ROOT, 'node_modules/typescript'));
  for (const file of files) {
    if (!file.path.endsWith('.ts')) continue;
    const parsed = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.ES2022, true);
    if (parsed.parseDiagnostics.length) throw Error('Engine emitted invalid Lesson TypeScript: ' + file.path);
  }
}

/** Complete, unblocked handoffs must also typecheck against the real built
 * Engine API. Drafts with explicit blockers defer this to Stage 6.2.
 */
function semanticGenerated(files, root) {
  const requireTrusted = createRequire(import.meta.url);
  const ts = requireTrusted(path.join(ROOT, 'node_modules/typescript'));
  const generated = new Map(
    files.filter(file => file.kind === 'typescript').map(file => [path.resolve(root, file.path), file.content]),
  );
  const options = {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    baseUrl: ROOT,
    paths: { '@svitlo/engine/build': [path.join(ROOT, 'shared/engine/dist/build.d.ts')] },
  };
  const host = ts.createCompilerHost(options);
  const originalRead = host.readFile.bind(host);
  const originalExists = host.fileExists.bind(host);
  const originalDirectory = host.directoryExists?.bind(host);
  host.readFile = filename => generated.get(path.resolve(filename)) ?? originalRead(filename);
  host.fileExists = filename => generated.has(path.resolve(filename)) || originalExists(filename);
  host.directoryExists = filename =>
    [...generated.keys()].some(name => name.startsWith(path.resolve(filename) + path.sep)) ||
    originalDirectory?.(filename) === true;
  const program = ts.createProgram([...generated.keys()], options, host);
  const errors = ts.getPreEmitDiagnostics(program).filter(error => error.category === ts.DiagnosticCategory.Error);
  if (errors.length)
    throw Error(
      'Unblocked Stage 6 source failed actual Engine typechecking: ' +
        errors
          .slice(0, 8)
          .map(
            error =>
              (error.file?.fileName || 'global') + ': ' + ts.flattenDiagnosticMessageText(error.messageText, ' '),
          )
          .join(' | '),
    );
  return true;
}

async function analyze(root, meta) {
  await fresh(meta);
  const tracked = indexed(root, meta.identity.pkg);
  const original = sourceBytes(root, meta);
  if (!tracked.has(meta.identity.source)) throw Error('Stage 2 must be committed in the reviewed PR');
  if (tracked.has(meta.identity.folder + '/index.ts')) throw Error('Lesson Stage 6 already materialized; no overwrite');
  const { parseTypedLesson, typecheckTypedLesson } = await import('./lesson-typed-source.mjs');
  const input = parseTypedLesson(root, meta.identity.source, original.toString('utf8'));
  typecheckTypedLesson(root, meta.identity.source);
  if (input.config.slug !== meta.identity.slug) throw Error('Stage 2 reviewed slug disagrees with Lesson PR identity');
  const requireTrusted = createRequire(import.meta.url);
  const { materializeLessonStage6 } = requireTrusted(
    path.join(ROOT, 'shared/engine/dist/generators/materializers/lesson/materializeStage6.js'),
  );
  const reviewEvidenceSha = gitBlob(Buffer.from(JSON.stringify(meta.reviews)));
  const text = original.toString('utf8');
  const plan = materializeLessonStage6(input, {
    sourceText: text,
    review: {
      sourcePath: meta.identity.source,
      sourceBlobSha: meta.sourceBlob,
      reviewCommitSha: meta.reviews[2].commit,
      reviewEvidenceSha,
      stage6Authorized: true,
    },
    verifyReviewedInput: (evaluated, reviewed, bytes) =>
      reviewed.sourceBlobSha === meta.sourceBlob &&
      reviewed.reviewCommitSha === meta.head &&
      bytes === text &&
      JSON.stringify(evaluated) === JSON.stringify(input),
  });
  syntaxGenerated(plan.files);
  if (
    !plan.diagnostics.length &&
    !plan.files.some(file => /TODO\s*\(BLOCKER\)|TODO\(asset\)|feedc0de-/i.test(file.content))
  )
    semanticGenerated(plan.files, root);
  const manifest = typedManifest(plan, meta, original, tracked, root);
  const filename = process.env.LESSON_TYPED_REPORT;
  if (!filename) throw Error('LESSON_TYPED_REPORT is required');
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const bytes = Buffer.from(JSON.stringify(manifest));
  fs.writeFileSync(filename, bytes, { flag: 'wx' });
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, 'report_sha256=' + digest(bytes) + '\n');
  report(
    'Typed Lesson Stage 6.1 analyzed ' +
      manifest.entries.length +
      ' file operations from reviewed HEAD ' +
      meta.head +
      '; generated source remains nonpublishable pending separate gates',
  );
}

export async function publish(root, meta) {
  await fresh(meta);
  const original = sourceBytes(root, meta);
  const tracked = indexed(root, meta.identity.pkg);
  const manifest = readTypedReport();
  const count = verifyTypedManifest(manifest, meta, root, tracked, original);
  if (git(root, ['status', '--porcelain=v1', '--untracked-files=all'])) throw Error('Publisher checkout must be clean');
  const head = await github('git/commits/' + meta.head);
  if (!sha.test(head?.tree?.sha || '')) throw Error('Missing pinned Git tree for Lesson commit');
  const tree = await github('git/trees', 'POST', {
    base_tree: head.tree.sha,
    tree: manifest.entries.map(entry => ({
      path: entry.path,
      mode: '100644',
      type: 'blob',
      ...(entry.action === 'delete' ? { sha: null } : { content: Buffer.from(entry.data, 'base64').toString('utf8') }),
    })),
  });
  if (!sha.test(tree?.sha || '')) throw Error('Unable to create trusted Lesson Git tree');
  const commit = await github('git/commits', 'POST', {
    message:
      'Materialize reviewed typed Lesson ' +
      meta.identity.id +
      '\n\nLesson-PR: #' +
      meta.number +
      '\nLesson-Source-Commit: ' +
      meta.head +
      '\nLesson-Source-Blob: ' +
      meta.sourceBlob +
      '\nLesson-Review-Evidence: ' +
      manifest.reviewEvidenceSha,
    tree: tree.sha,
    parents: [meta.head],
  });
  if (!sha.test(commit?.sha || '')) throw Error('Unable to create typed Lesson commit');
  // Strict recheck immediately before the non-force branch reference lease.
  await fresh(meta);
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', { sha: commit.sha, force: false });
  if (updated?.object?.sha !== commit.sha) throw Error('Lesson branch did not advance to exact commit');
  report(
    'Committed reviewed typed Lesson Stage 6.1 (' +
      count +
      ' operations) to PR #' +
      meta.number +
      ', commit ' +
      commit.sha +
      '. Stages 6.2/6.3, banks, translation and publication remain separate.',
  );
}

async function main() {
  const op = process.argv[2];
  if (process.argv.length !== 3 || !['analyze', 'publish'].includes(op))
    throw Error('Usage: lesson-typed-materialization.mjs analyze|publish');
  const meta = typedMeta();
  const root = checkedTypedRoot(meta);
  if (op === 'analyze') await analyze(root, meta);
  else await publish(root, meta);
}
if (process.argv[1]?.endsWith('/lesson-typed-materialization.mjs')) {
  main().catch(error => {
    report('Typed Lesson Stage 6 denied: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
