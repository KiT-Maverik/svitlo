#!/usr/bin/env node
/**
 * @fileoverview SHA-pinned bank materialization orchestration.
 * Analyze uses trusted default-branch Engine code to generate a bounded source
 * manifest from a PR checked out as DATA. Publish uses only trusted code,
 * rechecks approval and HEAD, then commits allowed new files via Git Data API.
 * No Lesson modules, YAML files or other bank files are ever changed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { allowedPath, github, inspect, requireActor, gitBlob, sha256, report, supportedBanks } from './bank-gate.mjs';

const MAX_COUNT = 512;
const MAX_SINGLE = 256 * 1024;
const MAX_TOTAL = 6 * 1024 * 1024;
const trustedRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
function meta() {
  const b64 = process.env.BANK_META_B64 || '';
  if (!/^[A-Za-z0-9+/=]+$/.test(b64) || b64.length > 12000) throw Error('Missing or malformed bank metadata');
  const value = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  if (
    !supportedBanks.includes(value.bank) ||
    !Number.isSafeInteger(value.number) ||
    !/^[a-f0-9]{40}$/.test(value.head || '') ||
    !/^[a-f0-9]{40}$/.test(value.sourceBlob || '') ||
    value.repo !== process.env.GITHUB_REPOSITORY ||
    value.identity?.bank !== value.bank ||
    value.identity?.yaml !== value.identity?.folder + '/' + value.bank + '.yaml' ||
    !/^[A-Za-z0-9-]+$/.test(value.actor || '')
  )
    throw Error('Invalid pinned metadata');
  return value;
}
function git(root, ...args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}
function checkedRoot(info) {
  const root = fs.realpathSync(process.env.BANK_CANDIDATE_ROOT || '');
  if (!fs.statSync(root).isDirectory() || !fs.existsSync(path.join(root, '.git')))
    throw Error('Requires immutable Git checkout');
  if (git(root, 'rev-parse', 'HEAD').trim() !== info.head) throw Error('Candidate is not at approved PR head');
  if (git(root, 'status', '--porcelain=v1', '-z', '--untracked-files=all') !== '')
    throw Error('Candidate checkout dirty before operation');
  let current = root;
  for (const piece of info.identity.yaml.split('/')) {
    current = path.join(current, piece);
    if (fs.lstatSync(current).isSymbolicLink()) throw Error('Symlink in bank YAML path');
  }
  if (gitBlob(fs.readFileSync(path.join(root, info.identity.yaml))) !== info.sourceBlob)
    throw Error('Bank YAML blob does not match pinned PR source');
  return root;
}
function collect(root, info) {
  const status = git(root, 'status', '--porcelain=v1', '-z', '--untracked-files=all').split('\0').filter(Boolean);
  if (status.length > MAX_COUNT) throw Error('Too many generated files');
  const files = [];
  const seen = new Set();
  let total = 0;
  for (const entry of status) {
    if (!entry.startsWith('?? ')) throw Error('Generation modified existing file: ' + entry);
    const relative = entry.slice(3);
    if (!allowedPath(relative, info.identity) || seen.has(relative))
      throw Error('Unallowlisted/duplicate generated file: ' + relative);
    seen.add(relative);
    const filename = path.join(root, relative);
    const stat = fs.lstatSync(filename);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_SINGLE)
      throw Error('Unsafe or oversized generated file: ' + relative);
    const bytes = fs.readFileSync(filename);
    total += bytes.length;
    if (total > MAX_TOTAL) throw Error('Generated file limit exceeded');
    if (!Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes))
      throw Error('Generated file not UTF-8: ' + relative);
    files.push({ path: relative, sha256: sha256(bytes), base64: bytes.toString('base64') });
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
export function inspectManifest(result, info) {
  if (
    result?.version !== 1 ||
    !result.files ||
    !Array.isArray(result.files) ||
    result.files.length < 1 ||
    result.files.length > MAX_COUNT ||
    JSON.stringify(result.meta) !== JSON.stringify(info)
  )
    throw Error('Invalid/mismatched analysis report');
  let total = 0;
  const unique = new Set();
  for (const f of result.files) {
    if (
      !allowedPath(f.path, info.identity) ||
      unique.has(f.path) ||
      typeof f.base64 !== 'string' ||
      !/^[a-zA-Z0-9+/]*={0,2}$/.test(f.base64)
    )
      throw Error('Unsafe or duplicate manifest entry');
    unique.add(f.path);
    const bytes = Buffer.from(f.base64, 'base64');
    total += bytes.length;
    if (
      bytes.length > MAX_SINGLE ||
      total > MAX_TOTAL ||
      !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes) ||
      sha256(bytes) !== f.sha256
    )
      throw Error('Manifest byte hash / UTF-8 mismatch: ' + f.path);
  }
  const entry = info.identity.folder + '/' + info.bank + '/index.ts';
  if (!unique.has(entry)) throw Error('Missing bank entrypoint in report');
  if (info.bank === 'flashcards' && unique.size !== 1)
    throw Error('Flashcards builder may create only flashcards/index.ts');
  return result.files;
}
async function analyze(info) {
  const root = checkedRoot(info);
  const lessonRoot = path.join(root, info.identity.folder);
  const bankFolder = path.join(lessonRoot, info.bank);
  // A bank is a child of an already generated, independently owned Lesson.
  if (!fs.existsSync(path.join(lessonRoot, 'index.ts')) || !fs.existsSync(path.join(lessonRoot, 'constants.ts')))
    throw Error('Bank materialization requires the existing typed Lesson entrypoint and language constants');
  if (fs.existsSync(bankFolder) && fs.lstatSync(bankFolder).isSymbolicLink())
    throw Error('Refusing bank output symlink');
  if (fs.existsSync(bankFolder) && fs.readdirSync(bankFolder).length)
    throw Error('Bank already has complete/partial authored source; will not overwrite');
  let expectedCount;
  if (info.bank === 'questions') {
    const { runOne } = await import('../../../shared/engine/scripts/questionsBuilder/questionsBuilder.mjs');
    const source = path.join(root, info.identity.yaml);
    const test = runOne(source, '--preflight', root);
    if (!test.count) throw Error('No Questions generated by preflight');
    const result = runOne(source, '--write', root);
    if (result.skipped || !result.changed) throw Error('Questions Builder returned SKIP');
    runOne(source, '--check', root);
    expectedCount = result.changed;
  } else {
    const { runOne } = await import('../../../shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs');
    const packageRoot = path.join(root, info.identity.pkg);
    const test = runOne(packageRoot, info.identity.id, '--preflight', root);
    if (!test.bytes) throw Error('Empty Flashcards draft');
    const result = runOne(packageRoot, info.identity.id, '--write', root);
    if (!result.created) throw Error('Flashcards Builder returned SKIP');
    runOne(packageRoot, info.identity.id, '--check', root);
    expectedCount = 1;
  }
  if (gitBlob(fs.readFileSync(path.join(root, info.identity.yaml))) !== info.sourceBlob)
    throw Error('Builder modified pinned bank source');
  const files = collect(root, info);
  if (files.length !== expectedCount) throw Error('Generated output count differs from verified builder result');
  const output = { version: 1, meta: info, files };
  inspectManifest(output, info);
  const filename = process.env.BANK_REPORT;
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, JSON.stringify(output) + '\n', { flag: 'wx' });
  report(
    'Verified ' + files.length + ' generated ' + info.bank + ' bank sources for HEAD ' + info.head + '; YAML unchanged',
  );
}
async function publish(info) {
  checkedRoot(info);
  await requireActor(info.actor);
  const expected = { ...info };
  delete expected.actor;
  await inspect(info.number, info.bank, expected);
  const reportData = JSON.parse(fs.readFileSync(process.env.BANK_REPORT, 'utf8'));
  const files = inspectManifest(reportData, info);
  const original = await github('git/commits/' + info.head);
  const index = await github('git/trees/' + original.tree.sha + '?recursive=1');
  if (index.truncated) throw Error('Cannot safely check truncated repository tree');
  const tracked = new Set();
  for (const item of index.tree) {
    if (item.path.startsWith(info.identity.pkg + '/') && (item.type === 'commit' || item.mode === '120000'))
      throw Error('Symlink/submodule in textbook package: ' + item.path);
    tracked.add(item.path);
  }
  if (!tracked.has(info.identity.yaml)) throw Error('Canonical bank YAML not tracked in original commit');
  for (const f of files) {
    if (tracked.has(f.path)) throw Error('Refusing to overwrite tracked authored bank file: ' + f.path);
  }
  const tree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
    tree: files.map(f => ({
      path: f.path,
      mode: '100644',
      type: 'blob',
      content: Buffer.from(f.base64, 'base64').toString('utf8'),
    })),
  });
  const commit = await github('git/commits', 'POST', {
    message:
      'Materialize ' +
      info.bank +
      ' bank for PR #' +
      info.number +
      '\n\nOriginal HEAD: ' +
      info.head +
      '\nSource YAML blob: ' +
      info.sourceBlob,
    tree: tree.sha,
    parents: [info.head],
  });
  // Re-check the read-only gate after constructing the detached commit.
  await inspect(info.number, info.bank, expected);
  await github('git/refs/heads/' + info.branch, 'PATCH', { sha: commit.sha, force: false });
  report(
    'Committed ' +
      files.length +
      ' ' +
      info.bank +
      ' bank file(s) to PR #' +
      info.number +
      ': ' +
      commit.sha +
      '. No YAML, Lesson or other bank changes.',
  );
}
async function main() {
  const operation = process.argv[2];
  if (!['analyze', 'publish'].includes(operation) || process.argv.length !== 3)
    throw Error('Usage: bank-materialization.mjs analyze|publish');
  const info = meta();
  if (operation === 'analyze') await analyze(info);
  else await publish(info);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => {
    report('Bank source materialization denied: ' + e.message);
    process.exitCode = 1;
  });
}
