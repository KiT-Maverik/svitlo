#!/usr/bin/env node
/**
 * Independently publish a textbook's authored Question and Flashcard resources.
 *
 * Stage B (--kind question) and Stage C (--kind flashcard) are independently
 * checked/generated. --kind all combines their manifests for static hosting.
 * Does not edit Lesson Config/Props or authored TypeScript/YAML.
 * Source inputs here are existing typed bank modules; editorial YAML draft
 * scaffolding is a separate subsequent production stage.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import {
  questionTypes,
  renderAssessmentResourceFiles,
  mergeAssessmentResourceFiles,
  resolveEntityPath,
  loadLessonData,
  projectTextbookMedia,
  assertMediaPublicationReady,
} from '@svitlo/engine/build';
import {
  checkLessonProps,
  publishLessonProps,
  assertSafeDirectoryPath,
} from '../generateLessonProps/publishLessonProps.mjs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const usage = 'Usage: --package content/<textbook> --kind question|flashcard|all [--draft] --write|--check|--preflight';

function directories(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true }).filter(item => item.isDirectory());
}

function authoredLessonSource(dir) {
  const sources = fs.readdirSync(dir).filter(file => file.endsWith('.data.ts'));
  const index = path.join(dir, 'index.ts');
  if (sources.length > 1 || (sources.length && fs.existsSync(index)))
    throw new Error('Ambiguous Lesson source: ' + dir);
  return sources.length ? path.join(dir, sources[0]) : fs.existsSync(index) ? index : null;
}

/** Preserve nested bank groups, but require every leaf to be the intended Build configurator. */
export function collectAssessmentConfigurators(exports, kind) {
  const result = [];
  const seen = new Set();
  const visit = (node, pathParts, group = null) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      throw new Error('Expected slug-keyed ' + kind + ' bank at ' + pathParts.join('/'));
    }
    if (typeof node.build?.props === 'function') {
      if (seen.has(node.id)) throw new Error('Duplicate authored Assessment UUID: ' + node.id);
      if (kind === 'question' ? !questionTypes.includes(node.type) : node.type !== 'flashcard') {
        throw new Error('Invalid ' + kind + ' Configurator type at ' + pathParts.join('/'));
      }
      if (pathParts.length && pathParts.at(-1) !== node.slug) {
        throw new Error('Assessment slug/map mismatch: ' + pathParts.join('/'));
      }
      if (group && questionTypes.includes(group) && group !== node.type) {
        throw new Error('Question Bank kind mismatch: ' + pathParts.join('/'));
      }
      seen.add(node.id);
      result.push(node);
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Unsafe bank slug: ' + key);
      visit(value, [...pathParts, key], group ?? (questionTypes.includes(key) ? key : null));
    }
  };
  for (const value of Object.values(exports)) visit(value, []);
  if (!result.length) throw new Error('Empty authored ' + kind + ' Bank');
  return result;
}

async function loadAssessmentBank(source, kind) {
  const temp = fs.mkdtempSync(path.join(path.dirname(source), '.assessment-load-'));
  const output = path.join(temp, 'assessment.cjs');
  try {
    await build({
      entryPoints: [source],
      outfile: output,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      target: 'node20',
      logLevel: 'silent',
      plugins: [
        {
          name: 'preserve-bank-import-meta',
          setup(builder) {
            builder.onLoad({ filter: /\.tsx?$/ }, async args => ({
              contents: (await fs.promises.readFile(args.path, 'utf8')).replace(
                /\bimport\.meta\.url\b/g,
                JSON.stringify(pathToFileURL(args.path).href),
              ),
              loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
            }));
          },
        },
      ],
    });
    return collectAssessmentConfigurators(require(output), kind);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

export async function render(packageDirectory, kind, mediaMode = 'production') {
  const diagnostics = [];
  const textbookId = path.basename(packageDirectory);
  const byKind = { question: [], flashcard: [] };
  const content = path.join(packageDirectory, 'data/lessons');
  for (const bucket of directories(content)) {
    if (!/^[0-9a-f]$/.test(bucket.name)) throw new Error('Invalid Lesson bucket: ' + bucket.name);
    for (const folder of directories(path.join(content, bucket.name))) {
      const lessonId = folder.name;
      if (resolveEntityPath(lessonId) !== bucket.name + '/' + lessonId)
        throw new Error('Invalid Lesson UUID directory: ' + lessonId);
      const dir = path.join(content, bucket.name, lessonId);
      for (const selectedKind of ['question', 'flashcard']) {
        if (kind !== 'all' && kind !== selectedKind) continue;
        const folderName = selectedKind === 'question' ? 'questions' : 'flashcards';
        const source = path.join(dir, folderName, 'index.ts');
        if (!fs.existsSync(source)) continue;
        if (!fs.statSync(source).isFile() || fs.lstatSync(source).isSymbolicLink())
          throw new Error('Invalid bank entrypoint: ' + source);
        const lessonSource = authoredLessonSource(dir);
        if (!lessonSource) throw new Error('Cannot publish bank without authored Lesson owner: ' + source);
        const lesson = await loadLessonData(lessonSource);
        if (lesson.id !== lessonId) throw new Error('Assessment bank Lesson identity mismatch: ' + source);
        const languages = lesson.config?.base?.params?.languages;
        if (!Array.isArray(languages) || !languages.length) throw new Error('Missing owner languages: ' + source);
        const items = await loadAssessmentBank(source, selectedKind);
        for (const item of items) {
          byKind[selectedKind].push({
            source: path.relative(root, source) + '#' + item.slug,
            lessonId,
            kind: selectedKind,
            languages,
            publication: projectTextbookMedia(item.build.props({ languages }), {
              textbookRoot: packageDirectory,
              textbookId,
              source: path.relative(root, source) + '#' + item.slug,
              mode: mediaMode,
              diagnostics,
            }),
          });
        }
      }
    }
  }
  const batches = [];
  if (kind === 'all' || kind === 'question') batches.push(renderAssessmentResourceFiles(byKind.question));
  if (kind === 'all' || kind === 'flashcard') batches.push(renderAssessmentResourceFiles(byKind.flashcard));
  assertMediaPublicationReady(diagnostics, mediaMode);
  for (const warning of diagnostics) console.warn('Missing draft media: ' + JSON.stringify(warning));
  return mergeAssessmentResourceFiles(batches);
}

export async function main(argv) {
  let packageName;
  let kind;
  let mode;
  let mediaMode = 'production';
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--package' && !packageName) packageName = argv[++i];
    else if (argv[i] === '--kind' && !kind) kind = argv[++i];
    else if (argv[i] === '--draft') mediaMode = 'draft';
    else if (['--check', '--write', '--preflight'].includes(argv[i]) && !mode) mode = argv[i];
    else throw new Error(usage);
  }
  if (!packageName || !['question', 'flashcard', 'all'].includes(kind) || !mode) throw new Error(usage);
  const packageDirectory = path.resolve(root, packageName);
  if (
    !packageDirectory.startsWith(path.join(root, 'content') + path.sep) ||
    !fs.existsSync(path.join(packageDirectory, 'package.json'))
  )
    throw new Error('Invalid textbook package');
  const output = path.join(packageDirectory, 'generated', kind === 'all' ? 'assessments' : 'assessmentStages/' + kind);
  assertSafeDirectoryPath(packageDirectory);
  assertSafeDirectoryPath(output);
  const files = await render(packageDirectory, kind, mediaMode);
  if (mode === '--preflight') {
    console.log('Validated ' + files.size + ' Assessment resources without writing');
    return;
  }
  if (mode === '--write') {
    publishLessonProps(output, files, 'assessment');
    console.log('Published ' + files.size + ' independent ' + kind + ' Assessment files');
  } else {
    checkLessonProps(output, files, 'assessment');
    console.log('Verified ' + files.size + ' independent ' + kind + ' Assessment files');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
