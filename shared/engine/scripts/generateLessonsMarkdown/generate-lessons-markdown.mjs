#!/usr/bin/env node
/**
 * Read-only typed Lesson data → review Markdown. No published JSON or authored data changes.
 *
 * node shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs --package content/playground \
 *   --lesson d3048d21-8690-5255-b62c-984c69ac272c --locale uk --stdout
 * node shared/engine/scripts/generateLessonsMarkdown/generate-lessons-markdown.mjs --package content/playground \
 *   --locale uk --output temp/agent-reference-library/lessons
 */
import fs from 'node:fs';
import { resolveMaterializedEntrypoint } from '../loadAuthoredConfigurators/resolveMaterializedEntrypoint.mjs';
import path from 'node:path';
import process from 'node:process';
import Module from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderLessonMarkdown, sourceIndex, supportedLanguages } from './lesson-markdown.mjs';
import { renderFlashcardReference } from './flashcard-reference.mjs';
import { resolveEntityPath, assembleLessonProps } from '@svitlo/engine/runtime';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const usage =
  'Usage: --package content/<textbook> [--lesson <uuid>] (--locale <language> (--stdout | --output <directory>) [--purpose flashcards] | --lesson <uuid> --list-locales)';

export function parseArguments(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === '--list-locales') {
      if (Object.hasOwn(options, 'listLocales')) throw new Error('Duplicate --list-locales');
      options.listLocales = true;
    } else if (flag === '--stdout') {
      if (Object.hasOwn(options, 'stdout')) throw new Error('Duplicate --stdout');
      options.stdout = true;
    } else if (['--package', '--lesson', '--locale', '--output', '--purpose'].includes(flag)) {
      if (Object.hasOwn(options, flag.slice(2))) throw new Error(`Duplicate ${flag}`);
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(usage);
      options[flag.slice(2)] = value;
    } else throw new Error(`${usage}\nUnknown argument: ${flag}`);
  }
  if (
    !options.package ||
    (options.listLocales
      ? !options.lesson || options.locale || options.stdout || options.output
      : !options.locale || Boolean(options.stdout) === Boolean(options.output))
  )
    throw new Error(usage);
  if (options.stdout && !options.lesson) throw new Error('--stdout requires --lesson to select exactly one document');
  if (options.purpose !== undefined && (options.purpose !== 'flashcards' || options.listLocales || !options.lesson))
    throw new Error('--purpose flashcards requires exactly one --lesson and --locale');
  if (!/^content\/[a-z][a-z0-9-]*$/.test(options.package))
    throw new Error('Invalid --package: expected content/<textbook>');
  if (options.lesson) resolveEntityPath(options.lesson);
  return options;
}

function realDirectory(directory, parent) {
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory() || fs.lstatSync(directory).isSymbolicLink()) {
    throw new Error(`Missing directory or symlink: ${directory}`);
  }
  if (parent && !fs.realpathSync(directory).startsWith(fs.realpathSync(parent) + path.sep)) {
    throw new Error(`Path escapes allowed root: ${directory}`);
  }
}

export function discoverLessons(packageDirectory, lessonId) {
  const root = path.join(packageDirectory, 'data/lessons');
  realDirectory(root, packageDirectory);
  if (lessonId) {
    const relative = resolveEntityPath(lessonId);
    const [bucket, id] = relative.split('/');
    const bucketPath = path.join(root, bucket);
    const directory = path.join(bucketPath, id);
    if (!fs.existsSync(bucketPath) || !fs.existsSync(directory)) return [];
    realDirectory(bucketPath, root);
    realDirectory(directory, bucketPath);
    const { source: entry } = resolveMaterializedEntrypoint(directory, { mode: 'draft', legacyLesson: true });
    return entry ? [{ id, relative, directory, entry }] : [];
  }
  const result = [];
  for (const bucket of fs
    .readdirSync(root, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (!bucket.isDirectory() || !/^[0-9a-f]$/.test(bucket.name)) continue;
    const bucketPath = path.join(root, bucket.name);
    realDirectory(bucketPath, root);
    for (const lesson of fs
      .readdirSync(bucketPath, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (!lesson.isDirectory()) continue;
      const relative = resolveEntityPath(lesson.name);
      if (relative !== `${bucket.name}/${lesson.name}`) throw new Error(`Lesson path mismatch: ${relative}`);
      const directory = path.join(bucketPath, lesson.name);
      realDirectory(directory, bucketPath);
      const { source: entry } = resolveMaterializedEntrypoint(directory, { mode: 'draft', legacyLesson: true });
      if (!entry) continue;
      result.push({ id: lesson.name, relative, directory, entry });
    }
  }
  return result;
}

/** Bundle in memory. Execute only authoring TS in a module whose require root is the textbook workspace. */
export async function loadLesson(entry, packageDirectory) {
  if (path.basename(entry) === 'draft.ts') throw new Error('Editorial draft cannot be loaded as a Lesson');
  let build;
  try {
    ({ build } = await import('esbuild'));
  } catch (error) {
    throw new Error('esbuild is required. Run npm install in the repository.', { cause: error });
  }
  const output = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    target: 'node20',
    logLevel: 'silent',
    plugins: [
      {
        name: 'preserve-markdown-import-meta',
        setup(builder) {
          builder.onLoad({ filter: /\.tsx?$/ }, async args => {
            if (path.basename(args.path) === 'draft.ts')
              throw new Error('Editorial draft cannot be imported by a materialized Lesson: ' + args.path);
            return {
              contents: (await fs.promises.readFile(args.path, 'utf8')).replace(
                /\bimport\.meta\.url\b/g,
                JSON.stringify(pathToFileURL(args.path).href),
              ),
              loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
            };
          });
        },
      },
    ],
  });
  const filename = path.join(packageDirectory, '.lesson-markdown-in-memory.cjs');
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(packageDirectory);
  loaded._compile(output.outputFiles[0].text, filename);
  const lessonExports = Object.values(loaded.exports).filter(
    value =>
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value.type === 'lesson' &&
      typeof value.build?.props === 'function',
  );
  if (lessonExports.length !== 1)
    throw new Error(`Expected exactly one exported Lesson configurator in ${entry}, found ${lessonExports.length}`);
  return lessonExports[0];
}

export async function generate(options, { root = repositoryRoot, loader = loadLesson } = {}) {
  const packageDirectory = path.join(root, options.package);
  realDirectory(path.join(root, 'content'), root);
  realDirectory(packageDirectory, path.join(root, 'content'));
  const locales = supportedLanguages(root);
  if (!options.listLocales && !locales.includes(options.locale))
    throw new Error(`Unsupported locale ${options.locale}; expected one of ${locales.join(', ')}`);
  const selected = discoverLessons(packageDirectory, options.lesson);
  if (!selected.length) throw new Error(`No matching canonical lessons for ${options.lesson ?? options.package}`);
  if (options.listLocales) {
    const item = selected[0];
    const lesson = await loader(item.entry, packageDirectory);
    if (lesson.id !== item.id) throw new Error('Lesson identity mismatch: ' + item.id);
    const languages = lesson.config?.base?.params?.languages;
    if (
      !Array.isArray(languages) ||
      !languages.length ||
      new Set(languages).size !== languages.length ||
      languages.some(code => !locales.includes(code))
    ) {
      throw new Error('Invalid Lesson supported languages: ' + item.id);
    }
    return JSON.stringify(languages) + '\n';
  }
  const generated = [];
  for (const item of selected) {
    const lesson = await loader(item.entry, packageDirectory);
    if (lesson.id !== item.id || resolveEntityPath(lesson.id) !== item.relative)
      throw new Error(`Lesson identity mismatch at ${item.entry}`);
    const sources = sourceIndex(root, path.relative(root, item.directory));
    const commit = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
    const sourceRef =
      commit.status === 0 && /^[0-9a-f]{40}$/.test(commit.stdout.trim()) ? commit.stdout.trim() : 'main';
    if (options.purpose === 'flashcards') {
      if (sourceRef === 'main') throw new Error('Flashcard references require an actual Git revision SHA');
      const relativeLesson = path.relative(root, item.directory);
      const dirty = spawnSync('git', ['status', '--porcelain', '--untracked-files=all', '--', relativeLesson], {
        cwd: root,
        encoding: 'utf8',
      });
      if (dirty.status !== 0 || dirty.stdout.trim())
        throw new Error('Lesson sources have uncommitted changes; flashcard provenance must be SHA-pinned');
      const declared = lesson.config?.base?.params?.languages;
      if (!Array.isArray(declared) || !declared.includes(options.locale))
        throw new Error('Requested locale is not declared in the source Lesson: ' + options.locale);
    }
    if (typeof lesson.build?.props !== 'function') throw new Error('Lesson is missing the Configurator Build API');
    const publication = lesson.build.props({ languages: [options.locale] });
    const resolved = assembleLessonProps(publication, options.locale);
    let markdown = renderLessonMarkdown({
      lesson: resolved,
      locale: options.locale,
      languages: locales,
      packagePath: options.package,
      sourceFiles: sources,
      sourceRef,
      purpose: options.purpose,
    });
    if (options.purpose === 'flashcards') {
      const branch = spawnSync('git', ['symbolic-ref', '--quiet', '--short', 'HEAD'], {
        cwd: root,
        encoding: 'utf8',
      });
      const verifiedMedia = new Map();
      const verifyAtSha = relative => {
        if (!verifiedMedia.has(relative)) {
          const tracked = spawnSync('git', ['cat-file', '-e', sourceRef + ':' + relative], {
            cwd: root,
            encoding: 'utf8',
            timeout: 5000,
          });
          verifiedMedia.set(relative, tracked.status === 0);
        }
        return verifiedMedia.get(relative);
      };
      markdown +=
        '\n' +
        renderFlashcardReference({
          lesson: resolved,
          locale: options.locale,
          packagePath: options.package,
          sourceFiles: sources,
          sourceRef,
          sourceBranch: branch.status === 0 ? branch.stdout.trim() : null,
          root,
          lessonDirectory: item.directory,
          verifyAtSha,
        });
      if (Buffer.byteLength(markdown, 'utf8') > 2 * 1024 * 1024)
        throw new Error('Flashcard Lesson Markdown exceeds the maximum output size');
    }
    generated.push({ path: `${options.package.split('/')[1]}/${item.relative}/${options.locale}.md`, markdown });
  }
  if (options.stdout) return generated[0].markdown;
  const outputRoot = path.resolve(root, options.output);
  if (
    fs.existsSync(outputRoot) &&
    (!fs.statSync(outputRoot).isDirectory() || fs.lstatSync(outputRoot).isSymbolicLink())
  ) {
    throw new Error(`Output must be a real directory: ${outputRoot}`);
  }
  for (const item of generated) {
    const dest = path.resolve(outputRoot, item.path);
    if (!dest.startsWith(outputRoot + path.sep)) throw new Error(`Invalid output path: ${item.path}`);
    let dir = path.dirname(dest);
    while (dir.startsWith(outputRoot + path.sep)) {
      if (fs.existsSync(dir) && fs.lstatSync(dir).isSymbolicLink())
        throw new Error(`Refusing symlink output directory: ${dir}`);
      dir = path.dirname(dir);
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(dest) && fs.lstatSync(dest).isSymbolicLink())
      throw new Error(`Refusing symlink output file: ${dest}`);
    fs.writeFileSync(dest, item.markdown, 'utf8');
  }
  return generated.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const opts = parseArguments(process.argv.slice(2));
    const result = await generate(opts);
    if (opts.stdout || opts.listLocales) process.stdout.write(result);
    else process.stderr.write(`Generated ${result} lesson review document(s).\n`);
  } catch (error) {
    process.stderr.write(
      `Lesson Markdown generation failed: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exitCode = 1;
  }
}
