#!/usr/bin/env node
/** Package-wide Course publication from stateless configurators to generated/courses. */
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolveMaterializedEntrypoint } from '../loadAuthoredConfigurators/resolveMaterializedEntrypoint.mjs';
import { loadAuthoredConfigurators } from '../loadAuthoredConfigurators/loadAuthoredConfigurators.mjs';
import { projectTextbookMedia, assertMediaPublicationReady } from '@svitlo/engine/build';
import { renderCourseFiles } from '../../generators/courses/publishCourseData.mjs';
import { assertSafeDirectoryPath } from '../../generators/safeGeneratedPath/assertSafeDirectoryPath.mjs';
import { scanSource } from '../../../../scripts/ci/checkBlockerTodos/check-blocker-todos.mjs';

const repo = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const usage = 'Usage: --package content/<textbook> [--output <generated-dir>] [--draft] --write|--check|--preflight';

function options(argv) {
  let name,
    output,
    action,
    mode = 'production';
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--package' && !name) name = argv[++i];
    else if (argv[i] === '--output' && !output) output = argv[++i];
    else if (argv[i] === '--draft') mode = 'draft';
    else if (['--write', '--check', '--preflight'].includes(argv[i]) && !action) action = argv[i];
    else throw new Error(usage);
  }
  if (!name || !action) throw new Error(usage);
  const pkg = path.resolve(repo, name);
  if (!pkg.startsWith(path.join(repo, 'content') + path.sep) || !fs.existsSync(path.join(pkg, 'package.json'))) {
    throw new Error('Invalid textbook package');
  }
  const outputDirectory = output ? path.resolve(repo, output) : path.join(pkg, 'generated/courses');
  if (!outputDirectory.startsWith(path.join(pkg, 'generated') + path.sep)) {
    throw new Error('Course output must remain in textbook generated/');
  }
  assertSafeDirectoryPath(pkg);
  assertSafeDirectoryPath(outputDirectory);
  return { pkg, outputDirectory, action, mode };
}

export function readCurrent(root, prefix = '', files = new Map()) {
  assertSafeDirectoryPath(root);
  if (!fs.existsSync(root)) return files;
  if (fs.lstatSync(root).isSymbolicLink()) throw new Error('Symlink in generated Course output: ' + root);
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    const name = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isDirectory()) readCurrent(fullPath, name, files);
    else if (entry.isFile()) files.set(name, fs.readFileSync(fullPath, 'utf8'));
    else throw new Error('Unexpected generated Course entry: ' + name);
  }
  return files;
}

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;

/** Discover one-file Courses and materialized UUID-bucketed Course roots. */
export function discoverCourseSources(directory, mode = 'production') {
  if (!fs.existsSync(directory)) return [];
  assertSafeDirectoryPath(directory);
  const sources = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.data.ts')) {
      sources.push(path.join(directory, entry.name));
    }
    if (!entry.isDirectory() || !/^[0-9a-f]$/.test(entry.name)) continue;
    const bucket = path.join(directory, entry.name);
    assertSafeDirectoryPath(bucket);
    for (const candidate of fs.readdirSync(bucket, { withFileTypes: true })) {
      if (!candidate.isDirectory() || !UUID.test(candidate.name) || candidate.name.at(-1) !== entry.name) continue;
      const { source } = resolveMaterializedEntrypoint(path.join(bucket, candidate.name), { mode });
      if (source) sources.push(source);
    }
  }
  return sources.sort();
}

/** Strict publication must not discard editorial placements or human review/resource blockers.
 * Draft previews intentionally keep materialized content inspectable; pending draft files are never executed.
 */
export function checkCourseSourceReadiness(source, mode) {
  if (path.basename(source) !== 'index.ts') return [];
  const root = path.dirname(source);
  const pending = [];
  function visit(dir) {
    assertSafeDirectoryPath(dir);
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isSymbolicLink()) throw Error('Unsafe Course-owned source: ' + file);
      if (item.isDirectory()) visit(file);
      else if (item.isFile() && item.name.endsWith('.ts')) {
        if (item.name === 'draft.ts') pending.push(path.relative(root, file) + ': editorial source not materialized');
        else {
          const text = fs.readFileSync(file, 'utf8');
          if (scanSource(file, text).some(hit => hit.text.includes('TODO (BLOCKER):')))
            pending.push(path.relative(root, file) + ': unresolved production blocker');
        }
      }
    }
  }
  visit(root);
  if (mode === 'production' && pending.length)
    throw Error('Course source is not release-ready: ' + source + '\n' + pending.join('\n'));
  return pending;
}

/** Refuse old root patches; ignoring them would silently lose Course adaptations. */
export function assertNoLegacyCourseOverrides(exports, source) {
  if (Object.hasOwn(exports, 'authoredCourseOverrides')) {
    throw new Error(
      'Legacy authoredCourseOverrides export is not supported; migrate each Lesson patch to placeLesson at its placement: ' +
      source,
    );
  }
}

export async function render(pkg, mode) {
  const diagnostics = [];
  const textbookId = path.basename(pkg);
  const directory = path.join(pkg, 'data/courses');
  const files = new Map();
  if (!fs.existsSync(directory)) return files;
  const ids = new Set();
  for (const source of discoverCourseSources(directory, mode)) {
    for (const pending of checkCourseSourceReadiness(source, mode)) console.warn('Draft Course preview: ' + pending);
    const { configurators, moduleExports } = await loadAuthoredConfigurators(source, 'course', {
      includeExports: true,
    });
    if (configurators.length !== 1) throw new Error('Expected one Course per source: ' + source);
    const course = configurators[0];
    if (path.basename(source) === 'index.ts' && path.basename(path.dirname(source)) !== course.id) {
      throw new Error('UUID-bucketed Course ID does not match exported configurator: ' + source);
    }
    assertNoLegacyCourseOverrides(moduleExports, source);
    if (ids.has(course.id)) throw new Error('Duplicate Course ID: ' + course.id);
    ids.add(course.id);
    for (const [file, body] of renderCourseFiles(course, {
      mode,
      projectMedia: (entry, language) =>
        projectTextbookMedia(entry, {
          textbookRoot: pkg,
          textbookId,
          source: path.relative(repo, source) + '/' + language,
          mode,
          diagnostics,
        }),
    })) {
      files.set(course.id + '/' + file, body);
    }
  }
  assertMediaPublicationReady(diagnostics, mode);
  for (const item of diagnostics) console.warn('Missing draft media: ' + JSON.stringify(item));
  return files;
}

export function publish(root, files) {
  assertSafeDirectoryPath(root);
  const parent = path.dirname(root);
  fs.mkdirSync(parent, { recursive: true });
  if (fs.existsSync(root) && (!fs.lstatSync(root).isDirectory() || fs.lstatSync(root).isSymbolicLink())) {
    throw new Error('Refusing to replace non-directory Course output: ' + root);
  }
  const staging = fs.mkdtempSync(path.join(parent, '.courses-staging-'));
  const backup = path.join(parent, '.courses-backup-' + randomUUID());
  let backedUp = false;
  try {
    for (const [relative, body] of files) {
      if (!/^[0-9a-f-]{36}[/](?:base|[a-z]{2,8})[.]json$/.test(relative)) {
        throw new Error('Invalid generated Course path: ' + relative);
      }
      const destination = path.join(staging, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, body, 'utf8');
    }
    if (fs.existsSync(root)) {
      fs.renameSync(root, backup);
      backedUp = true;
    }
    try {
      fs.renameSync(staging, root);
    } catch (error) {
      if (backedUp) fs.renameSync(backup, root);
      backedUp = false;
      throw error;
    }
    if (backedUp) fs.rmSync(backup, { recursive: true, force: true });
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
  }
}

export async function main(argv) {
  const { pkg, outputDirectory, action, mode } = options(argv);
  const files = await render(pkg, mode);
  if (action === '--preflight') {
    console.log('Validated ' + files.size + ' Course files without writing output');
    return;
  }
  if (action === '--write') {
    publish(outputDirectory, files);
    console.log('Generated ' + files.size + ' Course files in ' + outputDirectory);
    return;
  }
  const existing = readCurrent(outputDirectory);
  const missing = [...files].filter(([name, body]) => existing.get(name) !== body).map(([name]) => name);
  const stale = [...existing.keys()].filter(name => !files.has(name));
  if (missing.length || stale.length)
    throw new Error('Generated Course files differ: ' + JSON.stringify({ missing, stale }));
  console.log('Verified ' + files.size + ' Course files in ' + outputDirectory);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
