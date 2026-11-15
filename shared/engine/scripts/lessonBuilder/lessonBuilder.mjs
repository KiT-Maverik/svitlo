#!/usr/bin/env node
/**
 * @fileoverview Lesson YAML -> TypeScript draft scaffolder.
 *
 * This build-time script saves AI authoring tokens by emitting mechanically
 * authored define* calls. Its output is a draft, not publishable Lesson Props:
 * missing fields and translations are deliberately left for the AI editor and
 * normal TypeScript diagnostics. No approvals, schemas, content checks,
 * TypeScript typechecks, asset resolution, or publication run here.
 *
 * Polymorphic children require type for factory dispatch. The only dispatch
 * table is Engine's yamlFactoryByType.ts (read as TypeScript syntax, not
 * executed or validated). Output contains only the source documentLanguage's
 * authored locale values; other languages are never invented.
 * Reads one config.yaml with { config, production } at each entity node.
 * Production is authoring-only; TypeScript is intentionally incomplete.
 *
 * The separate generateLessonProps publisher is not invoked by this script.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';
import { loadFactoryRegistry } from '../yamlScaffolding/yamlScaffolding.mjs';
import { renderLessonModules } from './lessonModules.mjs';
import {
  splitScaffoldDocument,
  productionFiles,
  checkProductionFiles,
  writeProductionFiles,
} from '../yamlScaffolding/productionScaffolding.mjs';
export { loadFactoryRegistry };

export const repoRoot = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const header = '// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.\n';
const checksumLabel = '// Draft content sha256: ';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export class BuilderDiagnostic extends Error {
  constructor(file, field, message) {
    super(file + ':' + field + ': ' + message);
    this.name = 'BuilderDiagnostic';
    this.file = file;
    this.field = field;
  }
}

function fail(file, field, message) {
  throw new BuilderDiagnostic(file, field, message);
}

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const digest = text => crypto.createHash('sha256').update(text).digest('hex');

function noSymlinks(location) {
  let current = path.parse(path.resolve(location)).root;
  for (const segment of path.resolve(location).slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Refusing symlink: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

function parseYaml(file, relative) {
  noSymlinks(file);
  let document;
  try {
    document = yaml.parseDocument(fs.readFileSync(file, 'utf8'), {
      strict: true,
      uniqueKeys: true,
      version: '1.2',
    });
    if (document.errors.length) throw new Error(document.errors.map(error => error.message).join('; '));
    const result = document.toJS({ maxAliasCount: 0 });
    if (!isRecord(result)) fail(relative, '$', 'expected a YAML mapping');
    return result;
  } catch (error) {
    if (error instanceof BuilderDiagnostic) throw error;
    fail(relative, '$', error.message);
  }
}

/** The UUID path is an output-safety boundary, not editorial validation. */
function targetFor(source, repo) {
  const location = path.resolve(source);
  noSymlinks(location);
  const root = fs.statSync(location).isDirectory() ? location : path.dirname(location);
  if (fs.statSync(location).isFile() && path.basename(location) !== 'config.yaml')
    throw new Error('Expected config.yaml source: ' + location);
  const relative = path.relative(path.resolve(repo), root).split(path.sep).join('/');
  const match = /^content\/((?:languages\/)?[a-z][a-z-]*)\/(.+)$/.exec(relative);
  if (!match) throw new Error('Expected source inside a textbook workspace: ' + relative);
  const bookRoot = path.join(repo, 'content', match[1]);
  if (!fs.existsSync(path.join(bookRoot, 'package.json')))
    throw new Error('Expected a textbook workspace for ' + relative);
  return { root, bookRoot, lessonId: uuidPattern.test(path.basename(root)) ? path.basename(root) : 'unresolved' };
}

/** The single YAML tree separates Engine Config from production guidance at every node. */
function combineSources(root) {
  const document = parseYaml(path.join(root, 'config.yaml'), 'config.yaml');
  const { config: lesson, documentLanguage, tasks } = splitScaffoldDocument(document);
  if (typeof documentLanguage !== 'string' || !documentLanguage)
    fail('config.yaml', 'production.documentLanguage', 'required source-language provenance');
  if (typeof lesson.slug !== 'string' || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(lesson.slug))
    fail('config.yaml', 'config.slug', 'a safe camelCase slug is required for the output filename');
  return { lesson, language: documentLanguage, tasks };
}

function writeDraft(file, content, mode) {
  const body = content;
  const rendered = header + checksumLabel + digest(body) + '\n' + body;
  noSymlinks(file);
  if (fs.existsSync(file)) {
    // Creation never updates an existing draft, regardless of its provenance.
    if (mode === 'generate') return 0;
    const original = fs.readFileSync(file, 'utf8');
    const expectedHeader = header + checksumLabel;
    if (!original.startsWith(expectedHeader))
      fail(path.basename(file), '$', 'refusing to overwrite a manually authored file');
    const split = original.indexOf('\n', expectedHeader.length);
    const checksum = original.slice(expectedHeader.length, split);
    if (split < 0 || !/^[a-f0-9]{64}$/.test(checksum) || digest(original.slice(split + 1)) !== checksum)
      fail(path.basename(file), '$', 'generated file was modified manually');
    if (original === rendered) return 0;
    if (mode === 'check')
      fail(
        path.basename(file),
        '$',
        'stale draft: existing file differs from YAML; generator will skip, so review manually',
      );
  }
  if (mode === 'check') fail(path.basename(file), '$', 'missing draft; run content:generate:lessons');
  fs.writeFileSync(file, rendered, { flag: 'wx' });
  return 1;
}

export function runOne(source, mode = 'check', repo = repoRoot) {
  if (!['generate', 'check'].includes(mode)) throw new Error('Mode must be generate or check');
  const target = targetFor(source, repo);
  // An existing root index.ts or *.data.ts marks an authored Lesson. Do not
  // parse stale YAML in generate mode and never overwrite manual edits.
  const sourceRelative = path.relative(target.bookRoot, target.root).split(path.sep).join('/');
  const canonicalSource = /^data\/lessons\/[0-9a-f]\/[0-9a-f-]{36}$/.test(sourceRelative);
  const existing = canonicalSource
    ? fs.readdirSync(target.root).filter(name => name.endsWith('.data.ts') || name === 'index.ts').sort()
    : [];
  if (mode === 'generate' && existing.length) {
    return { changed: 0, skipped: true, files: existing, lessonId: target.lessonId };
  }

  const { lesson, language, tasks } = combineSources(target.root);
  if (typeof lesson.id !== 'string' || !uuidPattern.test(lesson.id))
    fail('config.yaml', 'config.id', 'a Lesson UUID is required for ID-addressed output');
  const outputFolder = path.join(target.bookRoot, 'data/lessons', lesson.id.at(-1), lesson.id);
  noSymlinks(outputFolder);
  const destinationData = fs.existsSync(outputFolder)
    ? fs.readdirSync(outputFolder).filter(name => name.endsWith('.data.ts') || name === 'index.ts').sort()
    : [];
  if (mode === 'generate' && destinationData.length) {
    return { changed: 0, skipped: true, files: destinationData, lessonId: lesson.id };
  }
  if (destinationData.some(name => name.endsWith('.data.ts'))) {
    fail(destinationData[0], '$', 'competing legacy Lesson entrypoint; modular layout requires a clean UUID folder');
  }
  const modules = renderLessonModules(lesson, language, { bookRoot: target.bookRoot, outputFolder });
  const artifacts = productionFiles(outputFolder, tasks);

  // A partial previous run may have left modules without the root entrypoint.
  // Never mix their contents with newly generated modules.
  if (mode === 'generate') {
    const draftDirectories = ['sections', 'flashcards', 'questions'];
    const hasOrphans = fs.existsSync(path.join(outputFolder, 'constants.ts')) ||
      draftDirectories.some(name => fs.existsSync(path.join(outputFolder, name)));
    if (hasOrphans) fail('index.ts', '$', 'incomplete Lesson source tree; refusing to mix drafts with existing files');
  }
  for (const relative of modules.keys()) {
    const destination = path.join(outputFolder, relative);
    noSymlinks(destination);
    if (mode === 'generate' && fs.existsSync(destination)) {
      fail(relative, '$', 'existing Lesson source; refusing to overwrite or mix drafts');
    }
  }
  checkProductionFiles(artifacts, mode);

  if (mode === 'generate') fs.mkdirSync(outputFolder, { recursive: true });
  let changed = 0;
  for (const [relative, body] of modules) {
    const destination = path.join(outputFolder, relative);
    if (mode === 'generate') fs.mkdirSync(path.dirname(destination), { recursive: true });
    changed += writeDraft(destination, body, mode);
  }
  const specs = mode === 'generate' ? writeProductionFiles(artifacts) : 0;
  return {
    changed: changed + specs,
    files: [...modules.keys(), ...artifacts.map(item => item.file)],
    lessonId: lesson.id,
  };
}

function discover(repo) {
  const content = path.join(repo, 'content');
  if (!fs.existsSync(content)) return [];
  const roots = [];
  for (const entry of fs.readdirSync(content, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const folder = path.join(content, entry.name);
    const workspaces =
      entry.name === 'languages'
        ? fs
            .readdirSync(folder, { withFileTypes: true })
            .filter(item => item.isDirectory())
            .map(item => path.join(folder, item.name))
        : [folder];
    for (const workspace of workspaces) {
      const lessons = path.join(workspace, 'data/lessons');
      if (!fs.existsSync(lessons)) continue;
      for (const bucket of fs.readdirSync(lessons, { withFileTypes: true })) {
        if (!bucket.isDirectory() || !/^[0-9a-f]$/.test(bucket.name)) continue;
        for (const entry of fs.readdirSync(path.join(lessons, bucket.name), { withFileTypes: true })) {
          if (!entry.isDirectory()) continue;
          const location = path.join(lessons, bucket.name, entry.name);
          if (fs.existsSync(path.join(location, 'config.yaml'))) roots.push(location);
        }
      }
    }
  }
  return roots.sort();
}

export function main(args = process.argv.slice(2), repo = repoRoot) {
  const [mode, ...rest] = args;
  if (!['generate', 'check'].includes(mode) || (rest.length && !(rest.length === 2 && rest[0] === '--source')))
    throw new Error(
      'Usage: node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate|check [--source content/<book>/.../config.yaml|<canonical-lesson-folder>]',
    );
  const roots = rest.length ? [path.resolve(repo, rest[1])] : discover(repo);
  for (const root of roots) {
    const result = runOne(root, mode, repo);
    console.log(
      result.skipped
        ? 'SKIP Lesson ' + result.lessonId + ': existing ' + result.files.join(', ') + '; no files modified'
        : result.lessonId + ': ' + (mode === 'check' ? 'up to date' : result.changed + ' file(s) written'),
    );
  }
  console.log('Processed ' + roots.length + ' Lesson draft source(s)');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
