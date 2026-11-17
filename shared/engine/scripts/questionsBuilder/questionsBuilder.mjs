#!/usr/bin/env node
/**
 * @fileoverview Question Bank YAML -> modular TypeScript draft scaffolder.
 *
 * Reads only an approved, Lesson-root questions.yaml. Reuses the Lesson
 * source renderer, Engine's Question Zod projections and type/factory registry.
 * Does not create/edit Lesson Sections, publish Props, translate, delete YAML,
 * perform editorial approval, or mutate an existing bank. A reviewed Quiz
 * selection is a handoff for the Section owner, not a bank-filtering operation.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';

import { renderLessonModules } from '../lessonBuilder/lessonModules.mjs';
import { loadFactoryRegistry } from '../yamlScaffolding/yamlScaffolding.mjs';
import { verifyQuizSelections } from './verifyQuizSelections.mjs';

const require = createRequire(import.meta.url);
const { questionTypes, yamlQuestion_Schema } = require('../../dist/build.js');
const repoRoot = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const slug = /^[a-z][A-Za-z0-9]*$/;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export class QuestionsBuilderDiagnostic extends Error {
  constructor(location, message) {
    super('questions.yaml:' + location + ': ' + message);
    this.name = 'QuestionsBuilderDiagnostic';
  }
}

function reject(location, message) {
  throw new QuestionsBuilderDiagnostic(location, message);
}

function assertNoSymlinks(location) {
  const absolute = path.resolve(location);
  let part = path.parse(absolute).root;
  for (const piece of absolute.slice(part.length).split(path.sep).filter(Boolean)) {
    part = path.join(part, piece);
    try {
      if (fs.lstatSync(part).isSymbolicLink()) throw new Error('Refusing symlink: ' + part);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

/** Parse one editorial source, never an obsolete questions/questions.yaml. */
export function readQuestionsYaml(source) {
  assertNoSymlinks(source);
  const parsed = yaml.parseDocument(fs.readFileSync(source, 'utf8'), {
    strict: true,
    uniqueKeys: true,
    version: '1.2',
  });
  if (parsed.errors.length) reject('$', parsed.errors.map(error => error.message).join('; '));
  const document = parsed.toJS({ maxAliasCount: 0 });
  if (!record(document)) reject('$', 'expected a mapping');
  const allowed = ['documentLanguage', 'questions', 'quizSelections'];
  const unknown = Object.keys(document).filter(key => !allowed.includes(key));
  if (unknown.length) reject('$', 'unsupported top-level fields: ' + unknown.join(', '));
  if (typeof document.documentLanguage !== 'string' || !document.documentLanguage.trim())
    reject('documentLanguage', 'a real authored source locale is required');
  if (!record(document.questions) || !Object.keys(document.questions).length)
    reject('questions', 'expected at least one Question group');
  return document;
}

/**
 * Validate exactly the current Engine Question authoring shapes at the
 * Resource Production handoff. Do not invent an overlapping editorial schema.
 */
export function inspectQuestions(document) {
  const questionIds = new Set();
  const questionCount = Object.keys(document.questions).reduce((total, type) => {
    if (!questionTypes.includes(type)) reject('questions.' + type, 'unsupported Engine Question type');
    const items = document.questions[type];
    if (!record(items) || !Object.keys(items).length) reject('questions.' + type, 'expected a nonempty slug map');
    for (const [key, config] of Object.entries(items)) {
      const location = 'questions.' + type + '.' + key;
      if (!slug.test(key) || !record(config) || config.slug !== key || config.type !== type)
        reject(location, 'Question type/group/slug mismatch or unsafe slug');
      if (!uuid.test(config.id ?? '')) reject(location + '.id', 'expected a stable UUID');
      if (questionIds.has(config.id)) reject(location + '.id', 'duplicate Question UUID');
      const result = yamlQuestion_Schema.safeParse(config);
      if (!result.success)
        reject(location, result.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message).join('; '));
      questionIds.add(config.id);
    }
    return total + Object.keys(items).length;
  }, 0);
  const selections = document.quizSelections ?? {};
  if (!record(selections)) reject('quizSelections', 'expected Section UUID to Question UUID map');
  for (const [sectionId, ids] of Object.entries(selections)) {
    if (!uuid.test(sectionId)) reject('quizSelections', 'Section key must be UUID: ' + sectionId);
    if (!Array.isArray(ids) || !ids.length || ids.some(id => !uuid.test(id ?? '')))
      reject('quizSelections.' + sectionId, 'expected nonempty Question UUID array');
    if (new Set(ids).size !== ids.length) reject('quizSelections.' + sectionId, 'duplicate selected Question UUID');
    for (const id of ids) {
      if (!questionIds.has(id))
        reject('quizSelections.' + sectionId, 'selected Question not present in full bank: ' + id);
    }
  }
  return { questionCount, questionIds, selections };
}

function verifyLocation(source, root) {
  const file = path.resolve(source);
  assertNoSymlinks(file);
  if (path.basename(file) !== 'questions.yaml' || path.basename(path.dirname(file)) === 'questions')
    throw new Error('Expected Lesson-root questions.yaml (not questions/questions.yaml)');
  const folder = path.dirname(file);
  const relative = path.relative(path.resolve(root), folder).split(path.sep).join('/');
  const match = /^content\/((?:languages\/)?[a-z][a-z-]*)\/data\/lessons\/([0-9a-f])\/([0-9a-f-]{36})$/.exec(relative);
  if (!match || !uuid.test(match[3]) || match[3].at(-1) !== match[2])
    throw new Error('Expected canonical UUID-addressed Lesson source: ' + relative);
  const packageRoot = path.join(root, 'content', match[1]);
  if (!fs.existsSync(path.join(packageRoot, 'package.json')))
    throw new Error('No textbook workspace at ' + packageRoot);
  if (!fs.existsSync(path.join(folder, 'index.ts')) && !fs.readdirSync(folder).some(name => name.endsWith('.data.ts')))
    throw new Error('Cannot create a Question Bank without an authored Lesson owner: ' + folder);
  if (!fs.existsSync(path.join(folder, 'constants.ts')))
    throw new Error('Missing LessonLanguages constants.ts; integrate the modular Lesson first: ' + folder);
  return { folder, lessonId: match[3], output: path.join(folder, 'questions') };
}

/** Never write into an existing or partially authored bank tree. */
function existingFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const entries = [];
  function walk(folder) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const location = path.join(folder, entry.name);
      assertNoSymlinks(location);
      if (entry.isDirectory()) walk(location);
      else if (entry.isFile()) entries.push(path.relative(directory, location));
      else throw new Error('Unsupported Question Bank filesystem entry: ' + location);
    }
  }
  walk(directory);
  return entries.sort();
}

/** Return a deterministic bank-only file map, reusing canonical Lesson rendering. */
export function renderQuestions(document, lessonId, factories = loadFactoryRegistry()) {
  const { questionCount, selections } = inspectQuestions(document);
  const synthetic = {
    id: lessonId,
    slug: 'questionBankDraft',
    type: 'lesson',
    params: { languages: [document.documentLanguage] },
    questions: document.questions,
  };
  const files = renderLessonModules(synthetic, document.documentLanguage, {
    factories,
    questionBankOnly: true,
  });
  if (!files.has('questions/index.ts')) reject('questions', 'renderer did not emit bank entrypoint');
  return { files, questionCount, selections };
}

/**
 * --write creates only absent files; --check compares all expected bytes.
 * On an existing bank --write skips before reading stale YAML. On a partial
 * bank without entrypoint, fail rather than mixing old and new sources.
 * YAML is never deleted here; removal requires independent verification of
 * the complete generated bank and all materialized Quiz Section selections.
 */
export function runOne(source, mode = '--check', root = repoRoot) {
  if (!['--write', '--check', '--preflight'].includes(mode))
    throw new Error('Mode must be --write, --check or --preflight');
  const { output, lessonId } = verifyLocation(source, root);
  const filesAlready = existingFiles(output);
  if (mode === '--write' && filesAlready.includes('index.ts'))
    return { lessonId, skipped: true, changed: 0, existing: filesAlready };
  if (mode === '--write' && filesAlready.length)
    throw new Error('Partial Question Bank tree exists; refusing to mix generated drafts: ' + output);
  const document = readQuestionsYaml(source);
  const { files, questionCount, selections } = renderQuestions(document, lessonId);
  const expected = new Map(
    [...files].map(([relative, body]) => {
      if (!relative.startsWith('questions/') || relative.split('/').includes('..'))
        throw new Error('Unsafe Question Bank output: ' + relative);
      return [path.join(path.dirname(output), relative), body];
    }),
  );
  for (const [target, body] of expected) {
    assertNoSymlinks(target);
    if (mode === '--check' && (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== body))
      throw new Error('Stale/missing Question Bank module: ' + target);
    if (mode === '--write' && fs.existsSync(target))
      throw new Error('Existing Question Bank module; refusing overwrite: ' + target);
  }
  if (mode === '--check' && filesAlready.some(relative => !files.has('questions/' + relative)))
    throw new Error('Question Bank contains unexpected authored files; review manually: ' + output);
  if (mode === '--write') {
    for (const [target, body] of expected) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, body, { flag: 'wx' });
    }
  }
  return {
    lessonId,
    changed: mode === '--write' ? expected.size : 0,
    count: questionCount,
    selections,
    skipped: false,
  };
}

export function main(argv = process.argv.slice(2), root = repoRoot) {
  if (
    argv.length !== 3 ||
    !['--write', '--check', '--preflight', '--verify-sections'].includes(argv[0]) ||
    argv[1] !== '--source'
  )
    throw new Error(
      'Usage: questionsBuilder.mjs --write|--check|--preflight|--verify-sections --source content/<book>/data/lessons/<bucket>/<uuid>/questions.yaml',
    );
  const source = path.resolve(root, argv[2]);
  if (argv[0] === '--verify-sections') {
    const { folder, output } = verifyLocation(source, root);
    const document = readQuestionsYaml(source);
    const { files, selections } = renderQuestions(document, path.basename(folder));
    for (const relative of files.keys()) {
      const target = path.join(path.dirname(output), relative);
      assertNoSymlinks(target);
      if (!fs.existsSync(target)) throw new Error('Missing generated Question module: ' + target);
    }
    console.log(JSON.stringify(verifyQuizSelections(folder, selections), null, 2));
    return;
  }
  const result = runOne(source, argv[0], root);
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
