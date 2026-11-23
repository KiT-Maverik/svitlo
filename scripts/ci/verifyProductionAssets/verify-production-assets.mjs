#!/usr/bin/env node
/**
 * @fileoverview Final PR production-resource gate for touched Lesson/Course UUIDs.
 *
 * This is NOT a draft scaffolder, a publisher or an editorial approval check.
 * Draft source may legitimately contain TODO(asset), reserved Nil media UUIDs
 * and temporary YAML. At Ready/merge, those must be resolved. The separate
 * strict textbook package build validates physical media and publishes Props.
 * Inspect only changed entity UUID roots to avoid blocking unrelated drafts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const uuid = '[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}';
const entityRoot = new RegExp(
  '^(content/(?:languages/)?[a-z][a-z0-9-]*/data/(?:lessons|courses)/[0-9a-f]/' + uuid + ')/',
);
const unresolved =
  /00000000-0000-0000-0000-000000000000\.(?:svg|png|jpe?g|webp|gif|avif|mp3|wav|ogg|m4a|flac|mp4|webm|vtt|srt)/i;
const pendingId = /\bfeedc0de-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;
// This source-only check supplements, but does not replace, the actual
// production Build-to-Props and the pending-import lint policy (#774).
const pendingFactory = /\bdefinePending(?:Lesson|QuizSection|FlashcardsSection)\b/;
const sourceExtension = /\.(?:ts|tsx|mts)$/i;

export function affectedEntities(changedPaths) {
  return [...new Set(changedPaths.map(item => item.match(entityRoot)?.[1]).filter(Boolean))].sort();
}

function inspect(root, relative, findings) {
  const full = path.join(root, relative);
  if (!fs.existsSync(full)) return;
  const info = fs.lstatSync(full);
  if (info.isSymbolicLink()) {
    findings.push(relative + ': symlink inside source entity');
    return;
  }
  if (info.isDirectory()) {
    for (const item of fs.readdirSync(full).sort()) inspect(root, relative + '/' + item, findings);
    return;
  }
  if (!info.isFile()) {
    findings.push(relative + ': unsupported filesystem entry');
    return;
  }
  if (!sourceExtension.test(relative)) return;
  const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    if (/TODO\(asset\)/i.test(lines[index]) || unresolved.test(lines[index])) {
      findings.push(relative + ':' + (index + 1) + ': unresolved asset TODO or reserved Nil UUID');
    }
    if (pendingId.test(lines[index]) || pendingFactory.test(lines[index])) {
      findings.push(relative + ':' + (index + 1) + ': unresolved Preview UUID or Draft-only configurator');
    }
  }
}

/**
 * Question/Flashcard child PRs can be Ready before their parent Lesson is.
 * Check each touched bank and its changed Quiz/Flashcards Section source without
 * requiring unrelated parent Lesson media or the sibling bank to be complete.
 * A parent Lesson change still checks the entire Lesson and both banks.
 */
export function affectedProductionScopes(changedPaths) {
  return affectedEntities(changedPaths).map(entity => {
    const changes = changedPaths
      .map(name => (name.startsWith(entity + '/') ? name.slice(entity.length + 1) : null))
      .filter(Boolean);
    if (entity.includes('/data/courses/')) return { entity, mode: 'whole', banks: [], sections: [] };
    const banks = ['questions', 'flashcards'].filter(bank =>
      changes.some(name => name === bank + '.yaml' || name.startsWith(bank + '/')),
    );
    const sections = changes.filter(name => name.startsWith('sections/') && sourceExtension.test(name));
    const unrelated = changes.some(
      name =>
        !name.startsWith('sections/') &&
        !['questions', 'flashcards'].some(bank => name === bank + '.yaml' || name.startsWith(bank + '/')),
    );
    return banks.length && !unrelated
      ? { entity, mode: 'banks', banks, sections }
      : { entity, mode: 'whole', banks: [], sections: [] };
  });
}

export function verifyChangedEntities(root, changedPaths) {
  const findings = [];
  for (const { entity, mode, banks, sections } of affectedProductionScopes(changedPaths)) {
    const full = path.join(root, entity);
    if (!fs.existsSync(full)) continue; // An entity genuinely deleted by this PR.
    if (fs.lstatSync(full).isSymbolicLink()) {
      findings.push(entity + ': symlink entity root');
      continue;
    }
    if (!fs.statSync(full).isDirectory()) {
      findings.push(entity + ': expected directory');
      continue;
    }
    if (mode === 'banks') {
      for (const bank of banks) {
        const bankEntry = path.join(full, bank, 'index.ts');
        if (!fs.existsSync(bankEntry)) {
          findings.push(entity + '/' + bank + '/index.ts: missing authored ' + bank + ' bank entrypoint');
        }
        if (fs.existsSync(path.join(full, bank + '.yaml'))) {
          findings.push(entity + '/' + bank + '.yaml: unfinished temporary bank YAML');
        }
        inspect(root, entity + '/' + bank, findings);
      }
      for (const section of sections) inspect(root, entity + '/' + section, findings);
      continue;
    }
    const isLesson = entity.includes('/data/lessons/');
    const hasRoot =
      fs.existsSync(path.join(full, 'index.ts')) || fs.readdirSync(full).some(name => name.endsWith('.data.ts'));
    if (!hasRoot) {
      findings.push(entity + ': missing authored ' + (isLesson ? 'Lesson' : 'Course') + ' TypeScript entrypoint');
    }
    const temporary = isLesson ? ['lesson.yaml', 'questions.yaml', 'flashcards.yaml'] : ['course.yaml', 'config.yaml'];
    for (const name of temporary) {
      if (fs.existsSync(path.join(full, name))) {
        findings.push(entity + '/' + name + ': unfinished temporary authoring YAML');
      }
    }
    inspect(root, entity, findings);
  }
  return findings;
}

export function changedPaths(base, head, repoRoot) {
  if (![base, head].every(value => /^[0-9a-f]{40}$/.test(value))) {
    throw new Error('Expected two full Git commit SHAs');
  }
  return execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMRD', base, head, '--', 'content'], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
    .split('\n')
    .map(value => value.trim())
    .filter(Boolean);
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    if (process.argv.length !== 4) throw new Error('Usage: verify-production-assets.mjs <base-sha> <head-sha>');
    const root = path.resolve(fileURLToPath(new URL('../../../', import.meta.url)));
    const files = changedPaths(process.argv[2], process.argv[3], root);
    const checked = affectedEntities(files);
    const findings = verifyChangedEntities(root, files);
    for (const finding of findings) console.error('::error::' + finding);
    if (findings.length) throw new Error(findings.length + ' unresolved production asset/source issue(s)');
    console.log(
      'Verified ' +
        checked.length +
        ' changed Lesson/Course entity root(s); physical media and generated Props require the strict content package build.',
    );
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
