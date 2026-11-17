#!/usr/bin/env node
/**
 * @fileoverview Trusted Course-Lesson PR inventory coordinator.
 *
 * 'analyze' reads only static YAML + filename metadata from an immutable,
 * untrusted Course PR checkout, with a read-only GitHub token, and emits a
 * bounded JSON report. It NEVER imports/evaluates authored TypeScript.
 *
 * 'update' runs from trusted default-branch code with pull-requests:write,
 * never executes checked-out PR code, validates the report and replaces only
 * the Course Lessons managed PR-description region. GitHub PATCH is not CAS;
 * the before-write double-read narrows, but cannot eliminate, the race.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { buildLessonIndex } from '../../shared/engine/scripts/generateLessonsBySkill/lesson-index.mjs';
import {
  canonicalUUID, collectInventory, sameInventory, parseParent, parseLessonClaim,
  resolveClaims, outsideHash, validateReport, renderLessonsBlock, replaceManagedBlock,
  REPO, TEXTBOOK, inspectIndexedLesson,
} from './synchronizer.mjs';

const SHA = /^[a-f0-9]{40}$/;
const rootDir = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
const usage = 'Usage: analyze --repo owner/repo --pr N --sha SHA --root DIRECTORY --out FILE ' +
  '| update --repo owner/repo --pr N --sha SHA --report FILE';
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export function parseArgs(argv) {
  const [mode, ...args] = argv;
  if (!['analyze', 'update'].includes(mode)) throw new Error(usage);
  const opts = { mode };
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i], value = args[i + 1];
    if (!['--repo', '--pr', '--sha', '--root', '--out', '--report'].includes(key) ||
        hasOwn(opts, key) || !value || value.startsWith('--')) throw new Error(usage);
    opts[key] = value;
  }
  if (!REPO.test(opts['--repo'] ?? '') || !/^[1-9]\d{0,8}$/.test(opts['--pr'] ?? '') ||
      !SHA.test(opts['--sha'] ?? '') ||
      (mode === 'analyze' && (!opts['--root'] || !opts['--out'] || opts['--report'])) ||
      (mode === 'update' && (!opts['--report'] || opts['--root'] || opts['--out']))) {
    throw new Error(usage);
  }
  return {
    mode, repo: opts['--repo'], pr: Number(opts['--pr']),
    sha: opts['--sha'], root: opts['--root'], out: opts['--out'], report: opts['--report'],
  };
}

async function github(repo, endpoint, method = 'GET', data = undefined) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GitHub token is required');
  const url = 'https://api.github.com/repos/' + repo + '/' + endpoint;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(data ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error('GitHub ' + response.status + ': ' + endpoint);
  return response.json();
}

/** Refuse symlinks/paths escaping the exact checked-out Course snapshot. */
function verifiedPath(root, relative) {
  const base = fs.realpathSync(root);
  const target = path.resolve(base, relative);
  if (!target.startsWith(base + path.sep)) throw new Error('Unsafe Course source path');
  if (!fs.existsSync(target)) return null;
  const real = fs.realpathSync(target);
  if (real !== target || !real.startsWith(base + path.sep)) throw new Error('Symlink or escaped Course source');
  return target;
}
export function parseYamlFile(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  if (Buffer.byteLength(source, 'utf8') > 2 * 1024 * 1024) throw new Error('Course YAML exceeds 2 MiB');
  const document = YAML.parseDocument(source, { strict: true, uniqueKeys: true, version: '1.2' });
  if (document.errors.length) throw new Error(document.errors.map(x => x.message).join('; ').slice(0, 500));
  return document.toJS({ maxAliasCount: 0 });
}
function readInventory(root, relative, mode, courseId) {
  const file = verifiedPath(root, relative);
  if (!file) return null;
  const data = parseYamlFile(file);
  const inventory = collectInventory(data, mode, courseId);
  const languages = mode === 'editorial' ? data.supportedLanguages : data.config?.params?.languages;
  if (!Array.isArray(languages) || !languages.length || !languages.every(x => typeof x === 'string'))
    throw new Error('Course required languages are missing or invalid');
  return { ...inventory, languages };
}
async function mergedAncestry(repo, mergeSha, headSha) {
  if (!SHA.test(mergeSha ?? '')) return 'unknown';
  try {
    const comparison = await github(repo, 'compare/' + mergeSha + '...' + headSha);
    return ['ahead', 'identical'].includes(comparison.status) ? 'present' : 'absent';
  } catch {
    return 'unknown';
  }
}

async function listAllPrs(repo) {
  const result = [];
  // Include merged and closed claims, not only open PRs.
  for (let page = 1; page <= 30; page++) {
    const chunk = await github(repo, 'pulls?state=all&per_page=100&page=' + page);
    if (!Array.isArray(chunk)) throw new Error('Invalid GitHub PR response');
    result.push(...chunk);
    if (chunk.length < 100) return result;
  }
  throw new Error('GitHub PR list exceeds bounded 3000-PR scan');
}

function reportDiagnostic(collection, reason) {
  if (collection.length < 100) collection.push({ reason: String(reason).slice(0, 500) });
}

export async function analyze(options) {
  const parent = await github(options.repo, 'pulls/' + options.pr);
  if (parent.state !== 'open' || parent.head?.repo?.full_name !== options.repo ||
      parent.head?.sha !== options.sha) throw new Error('Open, unchanged same-repository Course PR required');
  const identity = parseParent(parent.body);
  const editor = identity.courseDirectory + '/course.yaml';
  const tech = identity.courseDirectory + '/config.yaml';
  const diagnostics = [], unresolved = [];
  let complete = true, current = null;
  try {
    const planned = readInventory(options.root, editor, 'editorial', identity.courseId);
    const generated = readInventory(options.root, tech, 'technical', identity.courseId);
    if (planned && generated && (!sameInventory(planned, generated) ||
        JSON.stringify(planned.languages) !== JSON.stringify(generated.languages))) {
      reportDiagnostic(diagnostics, 'Editorial and technical Lesson inventories diverge; Stage 5 reconciliation required');
      complete = false;
    }
    current = generated ?? planned;
    if (!current) {
      complete = false;
      reportDiagnostic(diagnostics, 'No verifiable course.yaml or config.yaml Course inventory; TypeScript-only composition is not parsed');
    }
    if (current) unresolved.push(...current.unresolved);
  } catch (error) {
    complete = false;
    reportDiagnostic(diagnostics, 'Course inventory parse failed: ' + String(error.message));
  }
  if (unresolved.length) complete = false;
  if (current && !current.allocated && !current.lessons.length) complete = false;

  let prs = [];
  try { prs = await listAllPrs(options.repo); }
  catch (error) {
    complete = false;
    reportDiagnostic(diagnostics, 'GitHub PR discovery incomplete: ' + String(error.message));
  }
  const claims = [];
  for (const pr of prs) {
    if (typeof pr.body !== 'string' || !pr.body.includes('<!-- svitlo-course-lesson:v1 -->')) continue;
    try {
      const claim = parseLessonClaim(pr.body);
      if (!claim || claim.courseId !== identity.courseId || claim.parentPr !== options.pr) continue;
      if (pr.head?.repo?.full_name !== options.repo ||
          !Number.isSafeInteger(pr.number) || pr.number < 1) {
        throw new Error('Lesson PR must be from the same repository');
      }
      claims.push({
        ...claim, number: pr.number, state: pr.state, draft: Boolean(pr.draft),
        merged: Boolean(pr.merged_at), mergeCommitSha: pr.merge_commit_sha ?? null,
      });
    } catch (error) {
      complete = false;
      reportDiagnostic(diagnostics, 'Invalid Lesson PR marker in #' + pr.number + ': ' + String(error.message));
    }
  }
  const known = new Set(current?.lessons.map(x => x.lessonId) ?? []);
  for (const claim of claims) {
    if (!known.has(claim.lessonId)) {
      complete = false;
      reportDiagnostic(diagnostics, 'Orphaned/removed Lesson PR #' + claim.number + ' claims ' + claim.lessonId);
    }
  }

  let lessonIndex;
  try {
    lessonIndex = buildLessonIndex(options.root, identity.textbook);
    if (!lessonIndex.complete) {
      complete = false;
      for (const d of lessonIndex.diagnostics.slice(0, 15))
        reportDiagnostic(diagnostics, 'Lesson index: ' + d.file + ': ' + d.reason);
    }
  } catch (error) {
    complete = false;
    reportDiagnostic(diagnostics, 'Static Lesson indexing failed: ' + String(error.message));
  }

  const lessons = [];
  for (const entry of current?.lessons ?? []) {
    const match = resolveClaims(entry.lessonId, claims);
    const inspected = inspectIndexedLesson(lessonIndex, identity.textbook, entry.lessonId, current?.languages ?? []);
    const source = inspected.source;
    if (inspected.reason) reportDiagnostic(diagnostics, entry.lessonId + ': ' + inspected.reason);
    if (source !== 'implemented' || inspected.missingLanguages.length || inspected.languageStatus !== 'verified')
      complete = false;
    if (match.diagnostic) {
      reportDiagnostic(diagnostics, entry.lessonId + ': ' + match.diagnostic);
      if (match.status === 'Needs resolution') complete = false;
    }
    let status = match.status;
    if (status === 'Not started' && source === 'implemented') status = 'Reused / existing';
    if (status.startsWith('Merged') && source !== 'implemented') {
      complete = false;
      reportDiagnostic(diagnostics, entry.lessonId +
        ': merged Lesson PR does not have verified implementation in Course head');
    }
    // A merged PR's target ancestry still requires independent verification
    // before claiming the Course branch incorporates the Lesson.
    let ancestry = null;
    if (status.startsWith('Merged')) {
      const claim = claims.find(x => x.number === match.pr);
      ancestry = await mergedAncestry(options.repo, claim?.mergeCommitSha, options.sha);
      if (ancestry !== 'present') {
        complete = false;
        reportDiagnostic(diagnostics, entry.lessonId + ': merged PR commit not contained in Course branch (' + ancestry + ')');
      }
      reportDiagnostic(diagnostics, entry.lessonId +
        ': verify independent Lesson approval, localization and publication gates');
    }
    lessons.push({ ...entry, status, pr: match.pr, source,
      readiness: inspected.readiness, missingLanguages: inspected.missingLanguages, ancestry });
  }
  const report = {
    repo: options.repo, pr: options.pr, sha: options.sha, courseId: identity.courseId,
    textbook: identity.textbook, outsideHash: outsideHash(parent.body),
    complete, allocated: Boolean(current?.allocated), lessons, unresolved,
    diagnostics: diagnostics.slice(0, 100),
  };
  validateReport(report);
  if (Buffer.byteLength(JSON.stringify(report)) > 1024 * 1024) throw new Error('Course report exceeds 1 MiB');
  return report;
}

export async function update(options) {
  const stat = fs.statSync(options.report);
  if (stat.size > 1024 * 1024) throw new Error('Untrusted Course report exceeds 1 MiB');
  const report = validateReport(JSON.parse(fs.readFileSync(options.report, 'utf8')));
  if (report.repo !== options.repo || report.pr !== options.pr || report.sha !== options.sha) {
    throw new Error('Untrusted report PR/repo/SHA binding mismatch');
  }
  const managed = renderLessonsBlock(report);
  // Two fresh reads narrow the race. PATCH cannot guarantee atomic CAS.
  const first = await github(options.repo, 'pulls/' + options.pr);
  const second = await github(options.repo, 'pulls/' + options.pr);
  for (const current of [first, second]) {
    if (current.state !== 'open' || current.head?.repo?.full_name !== report.repo ||
        current.head?.sha !== report.sha) throw new Error('Course parent moved or closed; rerun analysis');
    const identity = parseParent(current.body);
    if (identity.courseId !== report.courseId || identity.textbook !== report.textbook ||
        outsideHash(current.body) !== report.outsideHash) {
      throw new Error('Course PR manual description changed; re-analyze instead of overwriting');
    }
  }
  const updated = replaceManagedBlock(second.body, managed);
  if (updated === second.body) return { updated: false, reason: 'No change' };
  await github(options.repo, 'pulls/' + options.pr, 'PATCH', { body: updated });
  const after = await github(options.repo, 'pulls/' + options.pr);
  if (after.body !== updated) throw new Error('Concurrent Course description edit detected after update');
  return { updated: true, reason: 'Managed Lesson statuses updated' };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const data = options.mode === 'analyze' ? await analyze(options) : await update(options);
  if (options.mode === 'analyze') {
    const destination = path.resolve(options.out);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, JSON.stringify(data, null, 2) + '\n');
  }
  process.stdout.write(JSON.stringify(options.mode === 'analyze' ?
    { complete: data.complete, lessons: data.lessons.length, diagnostics: data.diagnostics.length } : data) + '\n');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(String(error.message ?? error)); process.exitCode = 1; });
}
