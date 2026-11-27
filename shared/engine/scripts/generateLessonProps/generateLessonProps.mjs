#!/usr/bin/env node
/**
 * Build-time orchestration for new defineLesson configurators.
 *
 * This command owns discovery and calls build.data(). The Engine generator
 * receives ONLY completed {base, locale} publication results.
 *
 * Completed Props are written to generated/lessons for textbook publication.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadLessonData,
  renderLessonDataFiles,
  resolveEntityPath,
  projectTextbookMedia,
  assertMediaPublicationReady,
} from '@svitlo/engine/build';
import { resolveMaterializedEntrypoint } from '../loadAuthoredConfigurators/resolveMaterializedEntrypoint.mjs';
import { assertSafeDirectoryPath, checkLessonData, publishLessonData } from './publishLessonProps.mjs';

export { checkLessonData as check } from './publishLessonProps.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const usage =
  'Usage: --package content/<textbook> [--output <repo-relative-dir>] [--draft] --write|--check|--preflight';

const directories = directory =>
  fs.existsSync(directory)
    ? fs.readdirSync(directory, { withFileTypes: true }).filter(entry => entry.isDirectory())
    : [];

function lessonDirectories(textbook) {
  const root = path.join(textbook, 'data/lessons');
  const found = [];
  for (const bucket of directories(root)) {
    if (!/^[0-9a-f]$/.test(bucket.name)) {
      throw new Error('Unexpected Lesson bucket: ' + path.join(root, bucket.name));
    }
    for (const lesson of directories(path.join(root, bucket.name))) {
      const relative = resolveEntityPath(lesson.name);
      if (relative !== bucket.name + '/' + lesson.name) {
        throw new Error('Lesson UUID/path mismatch: ' + path.join(root, bucket.name, lesson.name));
      }
      found.push({
        id: lesson.name,
        directory: path.join(root, bucket.name, lesson.name),
      });
    }
  }
  return found;
}

function assertRepositoryLessonIdsUnique() {
  const owners = new Map();
  const contentRoot = path.join(repoRoot, 'content');
  const candidates = [
    ...directories(contentRoot).map(entry => path.join(contentRoot, entry.name)),
    ...directories(path.join(contentRoot, 'languages')).map(entry => path.join(contentRoot, 'languages', entry.name)),
  ];
  for (const packageRoot of candidates) {
    if (!fs.existsSync(path.join(packageRoot, 'package.json'))) continue;
    for (const { id, directory } of lessonDirectories(packageRoot)) {
      const previous = owners.get(id);
      if (previous) throw new Error('Duplicate Lesson ID ' + id + ': ' + previous + ' and ' + directory);
      owners.set(id, directory);
    }
  }
}

const pendingLabels = new Set(['PENDING QUIZ', 'PENDING FLASHCARDS']);
function containsPendingAssessmentLabel(value) {
  if (typeof value === 'string') return pendingLabels.has(value);
  if (!value || typeof value !== 'object') return false;
  return Object.values(value).some(containsPendingAssessmentLabel);
}

export async function render(packageDirectory, mode) {
  const diagnostics = [];
  const textbookId = path.basename(packageDirectory);
  const entries = [];
  let editorialDrafts = 0;
  for (const { id, directory } of lessonDirectories(packageDirectory)) {
    const { source, draft } = resolveMaterializedEntrypoint(directory, { mode, legacyLesson: true });
    if (draft) editorialDrafts++;
    if (!source) continue;
    const lesson = await loadLessonData(source);
    if (!lesson || typeof lesson !== 'object' || !lesson.build || typeof lesson.build.data !== 'function') {
      throw new Error('Lesson source does not export a Build API configurator: ' + source);
    }
    if (lesson.id !== id || lesson.type !== 'lesson') {
      throw new Error('Lesson identity does not match its source directory: ' + source);
    }
    const languages = lesson.config?.base?.params?.languages;
    if (!Array.isArray(languages) || languages.length === 0) {
      throw new Error('Lesson publication languages are missing: ' + source);
    }
    let publication;
    try {
      publication = lesson.build.data({ languages, mode });
    } catch (error) {
      throw new Error('Failed to build Lesson Props: ' + source, { cause: error });
    }
    if (publication?.base?.id !== id) {
      throw new Error('Built Lesson ID differs from authored ID: ' + source);
    }
    if (mode === 'production') {
      // Localized Section labels can live only in publication.locale, not in
      // base.section. Inspect both fragments so a valid real UUID cannot hide
      // unfinished editorial copy from the strict publisher.
      if (containsPendingAssessmentLabel(publication.base) || containsPendingAssessmentLabel(publication.locale)) {
        throw new Error('Unresolved assessment Section draft label in Lesson ' + id);
      }
      // Do not write even intermediate Lesson JSON containing the reserved
      // assessment-draft namespace. The textbook build has a second, strict
      // resource/locale verifier after independent banks are staged.
      for (const section of publication.base.section ?? []) {
        if (typeof section.id === 'string' && section.id.startsWith('feedc0de-')) {
          throw new Error('Unresolved generated Section UUID in Lesson ' + id + ': ' + section.id);
        }
        const key = section.type === 'quiz' ? 'questionIds' : section.type === 'flashcards' ? 'flashcardIds' : null;
        if (!key) continue;
        for (const selectedId of section.params?.selection?.[key] ?? []) {
          if (typeof selectedId === 'string' && selectedId.startsWith('feedc0de-')) {
            throw new Error('Unresolved assessment placeholder in Lesson ' + id + ': ' + selectedId);
          }
        }
      }
    }
    const relativeSource = path.relative(repoRoot, source);
    entries.push({
      source: relativeSource,
      publication: projectTextbookMedia(publication, {
        textbookRoot: packageDirectory,
        textbookId,
        source: relativeSource,
        mode,
        diagnostics,
      }),
    });
  }
  if (entries.length === 0 && !(mode === 'draft' && editorialDrafts > 0)) {
    throw new Error('No authored Lesson configurators found; refusing to replace generated output');
  }
  assertMediaPublicationReady(diagnostics, mode);
  for (const item of diagnostics) {
    console.warn('Missing draft media: ' + JSON.stringify(item));
  }
  return renderLessonDataFiles(entries);
}

export async function main(args) {
  let packageName;
  let outputName;
  let action;
  let mode = 'production';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--package' && !packageName) packageName = args[++i];
    else if (args[i] === '--output' && !outputName) outputName = args[++i];
    else if (args[i] === '--draft') mode = 'draft';
    else if (['--write', '--check', '--preflight'].includes(args[i]) && !action) action = args[i];
    else throw new Error(usage);
  }
  if (!packageName || !action) throw new Error(usage);
  const packageDirectory = path.resolve(repoRoot, packageName);
  if (
    !packageDirectory.startsWith(path.join(repoRoot, 'content') + path.sep) ||
    !fs.existsSync(path.join(packageDirectory, 'package.json'))
  ) {
    throw new Error('Invalid textbook package');
  }
  const output = outputName ? path.resolve(repoRoot, outputName) : path.join(packageDirectory, 'generated/lessons');
  const allowedRoot = path.join(packageDirectory, 'generated');
  if (!output.startsWith(allowedRoot + path.sep)) {
    throw new Error('Generated Lesson output must be under textbook generated/');
  }
  assertSafeDirectoryPath(packageDirectory);
  assertSafeDirectoryPath(output);
  assertRepositoryLessonIdsUnique();
  const files = await render(packageDirectory, mode);
  if (action === '--preflight') {
    console.log('Validated ' + files.size + ' Lesson files without writing output');
    return;
  }
  if (action === '--write') {
    publishLessonData(output, files);
    console.log('Published ' + files.size + ' Props-shaped Lesson files in ' + output);
  } else {
    checkLessonData(output, files);
    console.log('Verified ' + files.size + ' Props-shaped Lesson files in ' + output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
