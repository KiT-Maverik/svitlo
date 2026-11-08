import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { createLessonFromUnknown } from '../../../lessons/createLesson';
import { resolveEntityPath } from '../../entityPath/resolveEntityPath.utils';

/** Load authoring TypeScript without requiring the application runtime. */
export async function loadLessonData(entry: string): Promise<unknown> {
  const directory = fs.mkdtempSync(path.join(path.dirname(entry), '.lesson-load-'));
  const output = path.join(directory, 'lesson.cjs');
  try {
    const { build } = (await import(['es', 'build'].join(''))) as typeof import('esbuild');
    await build({
      entryPoints: [entry],
      outfile: output,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      target: 'node20',
      logLevel: 'silent',
      plugins: [
        {
          name: 'preserve-import-meta-url',
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
    const exports = require(output) as Record<string, unknown>;
    const entries = Object.values(exports).filter(
      value => value !== null && typeof value === 'object' && 'id' in value && 'slug' in value,
    );
    if (entries.length !== 1) throw new Error(`Expected one exported lesson in ${entry}; found ${entries.length}`);
    return entries[0];
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

/** The generator owns file paths and JSON serialization; the creator provides only data. */
export function renderLessonFiles(lesson: unknown): Map<string, string> {
  const creator = createLessonFromUnknown(lesson);
  const data = creator.getData();
  const basePath = resolveEntityPath(data.id);
  const base = creator.getBase();
  const kinds = ['config', 'flashcards', 'questions'] as const;
  const files = new Map<string, string>();
  for (const kind of kinds) {
    files.set(`${basePath}/${kind}/base.json`, JSON.stringify(base[kind]) + '\n');
  }
  for (const language of data.parameters.languages) {
    const locale = creator.getLocale(language);
    for (const kind of kinds) {
      files.set(`${basePath}/${kind}/${language}.json`, JSON.stringify(locale[kind]) + '\n');
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
      if (relative !== `${bucket.name}/${entry.name}`)
        throw new Error(`Lesson path mismatch: ${bucket.name}/${entry.name}`);
      const lessonDir = path.join(dir, entry.name);
      const candidates = fs.readdirSync(lessonDir).filter(name => name.endsWith('.data.ts'));
      if (!candidates.length) continue; // Editorial draft without authored TS.
      if (candidates.length !== 1) throw new Error(`Ambiguous Lesson files: ${lessonDir}`);
      const creator = createLessonFromUnknown(await loadLessonData(path.join(lessonDir, candidates[0])));
      const lesson = creator.getData();
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
  if (
    fs.existsSync(outputDirectory) &&
    (!fs.statSync(outputDirectory).isDirectory() || fs.lstatSync(outputDirectory).isSymbolicLink())
  ) {
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
