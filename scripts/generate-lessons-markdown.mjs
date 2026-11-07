#!/usr/bin/env node
/**
 * Read-only typed Lesson data → review Markdown. No published JSON or authored data changes.
 *
 * node scripts/generate-lessons-markdown.mjs --package content/playground \
 *   --lesson d3048d21-8690-5255-b62c-984c69ac272c --locale uk --stdout
 * node scripts/generate-lessons-markdown.mjs --package content/playground \
 *   --locale uk --output .agent-ci-artifacts/lessons
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Module from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderLessonMarkdown, sourceIndex, supportedLanguages } from './lib/lesson-markdown.mjs';
import { resolveEntityPath } from '@svitlo/engine/utils';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const usage =
  'Usage: --package content/<textbook> [--lesson <uuid>] --locale <language> (--stdout | --output <directory>)';

export function parseArguments(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === '--stdout') {
      if (Object.hasOwn(options, 'stdout')) throw new Error('Duplicate --stdout');
      options.stdout = true;
    } else if (['--package', '--lesson', '--locale', '--output'].includes(flag)) {
      if (Object.hasOwn(options, flag.slice(2))) throw new Error(`Duplicate ${flag}`);
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(usage);
      options[flag.slice(2)] = value;
    } else throw new Error(`${usage}\nUnknown argument: ${flag}`);
  }
  if (!options.package || !options.locale || Boolean(options.stdout) === Boolean(options.output))
    throw new Error(usage);
  if (options.stdout && !options.lesson) throw new Error('--stdout requires --lesson to select exactly one document');
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

export function discoverLessons(packageDirectory) {
  const root = path.join(packageDirectory, 'data/lessons');
  realDirectory(root, packageDirectory);
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
      const candidates = fs.readdirSync(directory).filter(name => name.endsWith('.data.ts'));
      if (!candidates.length) continue;
      if (candidates.length !== 1) throw new Error(`Ambiguous Lesson entry in ${directory}`);
      const entry = path.join(directory, candidates[0]);
      if (fs.lstatSync(entry).isSymbolicLink() || !fs.statSync(entry).isFile())
        throw new Error(`Invalid Lesson entry: ${entry}`);
      result.push({ id: lesson.name, relative, directory, entry });
    }
  }
  return result;
}

/** Bundle in memory. Execute only authoring TS in a module whose require root is the textbook workspace. */
export async function loadLesson(entry, packageDirectory) {
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
  const filename = path.join(packageDirectory, '.lesson-markdown-in-memory.cjs');
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(packageDirectory);
  loaded._compile(output.outputFiles[0].text, filename);
  const lessonExports = Object.values(loaded.exports).filter(
    value => value !== null && typeof value === 'object' && !Array.isArray(value) && 'id' in value && 'slug' in value,
  );
  if (lessonExports.length !== 1)
    throw new Error(`Expected exactly one exported LessonV2 data object in ${entry}, found ${lessonExports.length}`);
  return lessonExports[0];
}

export async function generate(options, { root = repositoryRoot, loader = loadLesson } = {}) {
  const packageDirectory = path.join(root, options.package);
  realDirectory(path.join(root, 'content'), root);
  realDirectory(packageDirectory, path.join(root, 'content'));
  const locales = supportedLanguages(root);
  if (!locales.includes(options.locale))
    throw new Error(`Unsupported locale ${options.locale}; expected one of ${locales.join(', ')}`);
  const candidates = discoverLessons(packageDirectory);
  const selected = options.lesson ? candidates.filter(item => item.id === options.lesson) : candidates;
  if (!selected.length) throw new Error(`No matching canonical lessons for ${options.lesson ?? options.package}`);
  const generated = [];
  for (const item of selected) {
    const lesson = await loader(item.entry, packageDirectory);
    if (lesson.id !== item.id || resolveEntityPath(lesson.id) !== item.relative)
      throw new Error(`Lesson identity mismatch at ${item.entry}`);
    const sources = sourceIndex(root, path.relative(root, item.directory));
    const commit = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
    const sourceRef = commit.status === 0 && /^[0-9a-f]{40}$/.test(commit.stdout.trim()) ? commit.stdout.trim() : 'main';
    const markdown = renderLessonMarkdown({
      lesson,
      locale: options.locale,
      languages: locales,
      packagePath: options.package,
      sourceFiles: sources,
      sourceRef,
    });
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
    if (opts.stdout) process.stdout.write(result);
    else process.stderr.write(`Generated ${result} lesson review document(s).\n`);
  } catch (error) {
    process.stderr.write(
      `Lesson Markdown generation failed: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exitCode = 1;
  }
}
