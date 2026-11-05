import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../types/languages';
import type { LanguageCode } from '../../../types/languages';
import { localizeLessonValue } from './localizeLessonData.utils';
import { resolveEntityPath } from '../../entityPath/resolveEntityPath.utils';

type LessonData = {
  id: string;
  slug: string;
  parameters: { languages: readonly LanguageCode[] };
  flashcards: unknown[];
  questions: Record<string, Record<string, unknown>>;
  sections: unknown[];
  [key: string]: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function assertLesson(value: unknown): asserts value is LessonData {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.slug !== 'string' ||
      !/^[a-z][A-Za-z0-9]*$/.test(value.slug)) {
    throw new Error('Lesson must declare a canonical UUID id and camelCase slug');
  }
  const relativePath = resolveEntityPath(value.id);
  const parameters = value.parameters;
  if (!isRecord(parameters) || !Array.isArray(parameters.languages) || parameters.languages.length === 0 ||
      !parameters.languages.every(code => typeof code === 'string')) {
    throw new Error(`Lesson ${relativePath} has no valid parameters.languages`);
  }
  if (!Array.isArray(value.flashcards) || !isRecord(value.questions) || !Array.isArray(value.sections)) {
    throw new Error(`Lesson ${relativePath} is missing flashcards, questions, or sections`);
  }
  const sectionSlugs = new Set<string>();
  for (const [index, entry] of value.sections.entries()) {
    if (!isRecord(entry) || typeof entry.slug !== 'string' || !Array.isArray(entry.content)) {
      throw new Error(`Invalid ordered section at ${relativePath}/sections[${index}]`);
    }
    if (sectionSlugs.has(entry.slug)) throw new Error(`Duplicate section slug: ${entry.slug}`);
    sectionSlugs.add(entry.slug);
    const blockKeys = new Set<string>();
    for (const [blockIndex, item] of entry.content.entries()) {
      if (!isRecord(item) || typeof item.id !== 'string' || typeof item.slug !== 'string' ||
          typeof item.type !== 'string') {
        throw new Error(`Invalid content block at ${relativePath}/sections[${index}]/content[${blockIndex}]`);
      }
      const key = item.type + '/' + item.slug;
      if (blockKeys.has(key)) throw new Error(`Duplicate content block: ${key}`);
      blockKeys.add(key);
    }
  }
}

/** Load authoring TypeScript without requiring the application runtime. */
export async function loadLessonData(entry: string): Promise<unknown> {
  const directory = fs.mkdtempSync(path.join(path.dirname(entry), '.lesson-load-'));
  const output = path.join(directory, 'lesson.cjs');
  try {
    await build({
      entryPoints: [entry],
      outfile: output,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      target: 'node20',
      logLevel: 'silent',
      plugins: [{
        name: 'preserve-import-meta-url',
        setup(builder) {
          builder.onLoad({ filter: /\.tsx?$/ }, async args => ({
            contents: (await fs.promises.readFile(args.path, 'utf8'))
              .replace(/\bimport\.meta\.url\b/g, JSON.stringify(pathToFileURL(args.path).href)),
            loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
          }));
        },
      }],
    });
    const exports = require(output) as Record<string, unknown>;
    const entries = Object.values(exports).filter(value => isRecord(value) && 'id' in value && 'slug' in value);
    if (entries.length !== 1) throw new Error(`Expected one exported lesson in ${entry}; found ${entries.length}`);
    return entries[0];
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function compactQuizQuestions(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(compactQuizQuestions);
  if (!isRecord(value)) return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => {
    if (key === 'questions' && isRecord(child) && Object.values(child).every(item => isRecord(item) && typeof item.slug === 'string')) {
      return ['questionSlugs', Object.values(child).map(item => (item as { slug: string }).slug)];
    }
    return [key, compactQuizQuestions(child)];
  }));
}

/** Render three independently fetchable collections for every language of one lesson. */
export function renderLessonFiles(lesson: unknown): Map<string, string> {
  assertLesson(lesson);
  const relativePath = resolveEntityPath(lesson.id);
  const supported = new Set(DEFAULT_SUPPORTED_LANGUAGES.map(item => item.language));
  const languages = lesson.parameters.languages;
  if (new Set(languages).size !== languages.length || languages.some(code => !supported.has(code))) {
    throw new Error(`Lesson ${relativePath} has duplicate or unsupported languages`);
  }

  const { flashcards, questions, sections, ...config } = lesson;
  const files = new Map<string, string>();
  for (const language of languages) {
    const collections = {
      config: { ...config, sections: compactQuizQuestions(sections) },
      flashcards,
      questions,
    };
    for (const [kind, source] of Object.entries(collections)) {
      const { value, sources } = localizeLessonValue(source, language, languages);
      files.set(`${relativePath}/${kind}/${language}.json`, JSON.stringify({ data: value, localeSources: sources }) + '\n');
    }
  }
  return files;
}

/** Discover authored lessons by UUID path; editorial-only directories are not generated. */
export async function renderTextbookLessonFiles(packageDirectory: string): Promise<Map<string, string>> {
  const root = path.join(packageDirectory, 'data/lessons');
  const files = new Map<string, string>();
  if (!fs.existsSync(root)) return files;
  for (const bucket of fs.readdirSync(root, { withFileTypes: true })) {
    if (!bucket.isDirectory() || !/^[0-9a-f]$/.test(bucket.name)) continue;
    const dir = path.join(root, bucket.name);
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const relative = resolveEntityPath(entry.name);
      if (relative !== `${bucket.name}/${entry.name}`) throw new Error(`Lesson path mismatch: ${bucket.name}/${entry.name}`);
      const lessonDir = path.join(dir, entry.name);
      const candidates = fs.readdirSync(lessonDir).filter(name => name.endsWith('.data.ts'));
      if (!candidates.length) continue; // Editorial draft without authored TS.
      if (candidates.length !== 1) throw new Error(`Ambiguous Lesson files: ${lessonDir}`);
      const lesson = await loadLessonData(path.join(lessonDir, candidates[0]));
      assertLesson(lesson);
      if (lesson.id.toLowerCase() !== entry.name) throw new Error(`Lesson UUID/path mismatch: ${lessonDir}`);
      for (const [key, value] of renderLessonFiles(lesson)) {
        if (files.has(key)) throw new Error(`Duplicate Lesson publication: ${key}`);
        files.set(key, value);
      }
    }
  }
  return files;
}

export function writeLessonFiles(outputDirectory: string, files: ReadonlyMap<string, string>): void {
  const parent = path.dirname(outputDirectory);
  fs.mkdirSync(parent, { recursive: true });
  if (fs.existsSync(outputDirectory) &&
      (!fs.statSync(outputDirectory).isDirectory() || fs.lstatSync(outputDirectory).isSymbolicLink())) {
    throw new Error(`Refusing to replace non-directory or symlink: ${outputDirectory}`);
  }
  const staging = fs.mkdtempSync(path.join(parent, '.lessons-staging-'));
  const backup = path.join(parent, `.lessons-backup-${randomUUID()}`);
  let backedUp = false;
  try {
    for (const [relative, content] of files) {
      if (path.isAbsolute(relative) || relative.split(/[\\/]/).includes('..')) {
        throw new Error(`Invalid generated path: ${relative}`);
      }
      const destination = path.join(staging, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, content);
    }
    if (fs.existsSync(outputDirectory)) {
      fs.renameSync(outputDirectory, backup);
      backedUp = true;
    }
    try {
      fs.renameSync(staging, outputDirectory);
    } catch (error) {
      if (backedUp) fs.renameSync(backup, outputDirectory);
      throw error;
    }
    if (backedUp) fs.rmSync(backup, { recursive: true, force: true });
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}
