#!/usr/bin/env node
/**
 * Build-time orchestration for new defineLesson configurators.
 *
 * This command owns discovery and calls build.props(). The Engine generator
 * receives ONLY completed {base, locale} publication results.
 *
 * Completed Props are written to generated/lessons for textbook publication.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLessonData, renderLessonPropsFiles, resolveEntityPath, writeLessonFiles } from '@svitlo/engine/build';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const usage = 'Usage: --package content/<textbook> [--output <repo-relative-dir>] --write|--check';

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

function lessonSource(directory) {
  const authoredFiles = fs.readdirSync(directory).filter(name => name.endsWith('.data.ts'));
  if (authoredFiles.length > 1) throw new Error('Ambiguous Lesson entrypoints: ' + directory);
  if (authoredFiles.length === 1) return path.join(directory, authoredFiles[0]);
  const index = path.join(directory, 'index.ts');
  return fs.existsSync(index) ? index : undefined;
}

async function render(packageDirectory) {
  const entries = [];
  for (const { id, directory } of lessonDirectories(packageDirectory)) {
    const source = lessonSource(directory);
    if (!source) continue; // Editorial-only drafts have no authored Lesson configurator.
    const lesson = await loadLessonData(source);
    if (!lesson || typeof lesson !== 'object' || !lesson.build || typeof lesson.build.props !== 'function') {
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
      publication = lesson.build.props({ languages });
    } catch (error) {
      throw new Error('Failed to build Lesson Props: ' + source, { cause: error });
    }
    if (publication?.base?.id !== id) {
      throw new Error('Built Lesson ID differs from authored ID: ' + source);
    }
    entries.push({ source: path.relative(repoRoot, source), publication });
  }
  if (entries.length === 0) {
    throw new Error('No authored Lesson configurators found; refusing to replace generated output');
  }
  return renderLessonPropsFiles(entries);
}

function check(output, files) {
  const actual = new Set();
  const visit = (folder, prefix = '') => {
    if (!fs.existsSync(folder)) return;
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const relative = path.join(prefix, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Unexpected symlink in generated Lessons: ' + relative);
      if (entry.isDirectory()) visit(path.join(folder, entry.name), relative);
      else if (entry.isFile()) actual.add(relative.replaceAll(path.sep, '/'));
    }
  };
  visit(output);
  const changed = [...files]
    .filter(
      ([relative, content]) =>
        !actual.has(relative) || fs.readFileSync(path.join(output, relative), 'utf8') !== content,
    )
    .map(([name]) => name);
  const stale = [...actual].filter(name => !files.has(name));
  if (changed.length || stale.length) {
    throw new Error('Generated Lessons differ: ' + JSON.stringify({ changed, stale }));
  }
}

async function main(args) {
  let packageName;
  let outputName;
  let action;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--package' && !packageName) packageName = args[++i];
    else if (args[i] === '--output' && !outputName) outputName = args[++i];
    else if (['--write', '--check'].includes(args[i]) && !action) action = args[i];
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
  assertRepositoryLessonIdsUnique();
  const files = await render(packageDirectory);
  if (action === '--write') {
    writeLessonFiles(output, files);
    console.log('Published ' + files.size + ' Props-shaped Lesson files in ' + output);
  } else {
    check(output, files);
    console.log('Verified ' + files.size + ' Props-shaped Lesson files in ' + output);
  }
}

main(process.argv.slice(2)).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
