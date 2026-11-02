import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../types/languages';
import type { LanguageCode } from '../../../types/languages';
import { localizeLessonValue } from './localizeLessonData.utils';

type LessonData = {
  group: string;
  slug: string;
  parameters: { languages: readonly LanguageCode[] };
  flashcards: unknown[];
  questions: Record<string, Record<string, unknown>>;
  sections: Record<string, unknown>;
  [key: string]: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function assertLesson(value: unknown, group: string, slug: string): asserts value is LessonData {
  if (!isRecord(value) || value.group !== group || value.slug !== slug) {
    throw new Error(`Lesson ${group}/${slug} must declare group ${group} and slug ${slug}`);
  }
  const parameters = value.parameters;
  if (!isRecord(parameters) || !Array.isArray(parameters.languages) || parameters.languages.length === 0 ||
      !parameters.languages.every(code => typeof code === 'string')) {
    throw new Error(`Lesson ${group}/${slug} has no valid parameters.languages`);
  }
  if (!Array.isArray(value.flashcards) || !isRecord(value.questions) || !isRecord(value.sections)) {
    throw new Error(`Lesson ${group}/${slug} is missing flashcards, questions, or sections`);
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
    const entries = Object.values(exports).filter(value => isRecord(value) && 'group' in value && 'slug' in value);
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
export function renderLessonFiles(lesson: unknown, group: string, slug: string): Map<string, string> {
  assertLesson(lesson, group, slug);
  const supported = new Set(DEFAULT_SUPPORTED_LANGUAGES.map(item => item.language));
  const languages = lesson.parameters.languages;
  if (new Set(languages).size !== languages.length || languages.some(code => !supported.has(code))) {
    throw new Error(`Lesson ${group}/${slug} has duplicate or unsupported languages`);
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
      files.set(`${group}/${slug}/${kind}/${language}.json`, JSON.stringify({ data: value, localeSources: sources }) + '\n');
    }
  }
  return files;
}

/** Discover lessons by group and slug directory. Other files do not become lessons. */
export async function renderTextbookLessonFiles(packageDirectory: string): Promise<Map<string, string>> {
  const lessonsRoot = path.join(packageDirectory, 'data/lessons');
  const files = new Map<string, string>();
  if (!fs.existsSync(lessonsRoot)) return files;
  for (const groupEntry of fs.readdirSync(lessonsRoot, { withFileTypes: true })) {
    if (!groupEntry.isDirectory()) continue;
    for (const lessonEntry of fs.readdirSync(path.join(lessonsRoot, groupEntry.name), { withFileTypes: true })) {
      if (!lessonEntry.isDirectory()) continue;
      const entry = path.join(lessonsRoot, groupEntry.name, lessonEntry.name, `${lessonEntry.name}.data.ts`);
      if (!fs.existsSync(entry)) continue;
      const lesson = await loadLessonData(entry);
      for (const [name, content] of renderLessonFiles(lesson, groupEntry.name, lessonEntry.name)) {
        files.set(name, content);
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
