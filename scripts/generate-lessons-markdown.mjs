#!/usr/bin/env node
/**
 * Read-only LessonV2 data → review Markdown. No published JSON or authored data changes.
 *
 * node scripts/generate-lessons-markdown.mjs --package learningApps/playground \
 *   --lesson 1/howLightMoves --locale uk --stdout
 * node scripts/generate-lessons-markdown.mjs --package learningApps/playground \
 *   --locale uk --output .agent-ci-artifacts/lessons
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Module from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderLessonMarkdown, sourceIndex, supportedLanguages } from './lib/lesson-markdown.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const usage = 'Usage: --package learningApps/<textbook> [--lesson <number>/<slug>] --locale <language> (--stdout | --output <directory>)';

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
  if (!options.package || !options.locale || Boolean(options.stdout) === Boolean(options.output)) throw new Error(usage);
  if (options.stdout && !options.lesson) throw new Error('--stdout requires --lesson to select exactly one document');
  if (!/^learningApps\/[a-z][a-z0-9-]*$/.test(options.package)) throw new Error('Invalid --package: expected learningApps/<textbook>');
  if (options.lesson && !/^\d+\/[A-Za-z0-9][A-Za-z0-9_-]*$/.test(options.lesson)) throw new Error('Invalid --lesson: expected <number>/<slug>');
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
  for (const group of fs.readdirSync(root, { withFileTypes: true }).sort((a, b) => Number(a.name) - Number(b.name) || a.name.localeCompare(b.name, 'en'))) {
    if (!group.isDirectory() || !/^\d+$/.test(group.name)) continue;
    const bucket = path.join(root, group.name);
    realDirectory(bucket, root);
    for (const lesson of fs.readdirSync(bucket, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (!lesson.isDirectory() || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(lesson.name)) continue;
      const directory = path.join(bucket, lesson.name);
      realDirectory(directory, bucket);
      const entry = path.join(directory, `${lesson.name}.data.ts`);
      if (!fs.existsSync(entry)) throw new Error(`Missing canonical LessonV2 entry: ${entry}`);
      if (fs.lstatSync(entry).isSymbolicLink() || !fs.statSync(entry).isFile()) throw new Error(`Invalid canonical LessonV2 entry: ${entry}`);
      result.push({ group: group.name, slug: lesson.name, directory, entry });
    }
  }
  return result;
}

/** Bundle in memory. Execute only authoring TS in a module whose require root is the textbook workspace. */
export async function loadLesson(entry, packageDirectory) {
  let build;
  try { ({ build } = await import('esbuild')); }
  catch (error) { throw new Error('esbuild is required. Run npm install in the repository.', { cause: error }); }
  const output = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    target: 'node20',
    logLevel: 'silent',
    plugins: [{
      name: 'preserve-markdown-import-meta',
      setup(builder) {
        builder.onLoad({ filter: /\.tsx?$/ }, async args => ({
          contents: (await fs.promises.readFile(args.path, 'utf8'))
            .replace(/\bimport\.meta\.url\b/g, JSON.stringify(pathToFileURL(args.path).href)),
          loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
        }));
      },
    }],
  });
  const filename = path.join(packageDirectory, '.lesson-markdown-in-memory.cjs');
  const loaded = new Module(filename);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(packageDirectory);
  loaded._compile(output.outputFiles[0].text, filename);
  const lessonExports = Object.values(loaded.exports).filter(value => value !== null && typeof value === 'object' && !Array.isArray(value) && 'group' in value && 'slug' in value);
  if (lessonExports.length !== 1) throw new Error(`Expected exactly one exported LessonV2 data object in ${entry}, found ${lessonExports.length}`);
  return lessonExports[0];
}

export async function generate(options, { root = repositoryRoot, loader = loadLesson } = {}) {
  const packageDirectory = path.join(root, options.package);
  realDirectory(path.join(root, 'learningApps'), root);
  realDirectory(packageDirectory, path.join(root, 'learningApps'));
  const locales = supportedLanguages(root);
  if (!locales.includes(options.locale)) throw new Error(`Unsupported locale ${options.locale}; expected one of ${locales.join(', ')}`);
  const candidates = discoverLessons(packageDirectory);
  const selected = options.lesson ? candidates.filter(item => `${item.group}/${item.slug}` === options.lesson) : candidates;
  if (!selected.length) throw new Error(`No matching canonical lessons for ${options.lesson ?? options.package}`);
  const generated = [];
  for (const item of selected) {
    const lesson = await loader(item.entry, packageDirectory);
    if (lesson.group !== item.group || lesson.slug !== item.slug) throw new Error(`Lesson identity mismatch at ${item.entry}`);
    const sources = sourceIndex(root, path.relative(root, item.directory));
    const markdown = renderLessonMarkdown({ lesson, locale: options.locale, languages: locales, packagePath: options.package, sourceFiles: sources });
    generated.push({ path: `${options.package.split('/')[1]}/${item.group}/${item.slug}/${options.locale}.md`, markdown });
  }
  if (options.stdout) return generated[0].markdown;
  const outputRoot = path.resolve(root, options.output);
  if (fs.existsSync(outputRoot) && (!fs.statSync(outputRoot).isDirectory() || fs.lstatSync(outputRoot).isSymbolicLink())) {
    throw new Error(`Output must be a real directory: ${outputRoot}`);
  }
  for (const item of generated) {
    const dest = path.resolve(outputRoot, item.path);
    if (!dest.startsWith(outputRoot + path.sep)) throw new Error(`Invalid output path: ${item.path}`);
    let dir = path.dirname(dest);
    while (dir.startsWith(outputRoot + path.sep)) {
      if (fs.existsSync(dir) && fs.lstatSync(dir).isSymbolicLink()) throw new Error(`Refusing symlink output directory: ${dir}`);
      dir = path.dirname(dir);
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(dest) && fs.lstatSync(dest).isSymbolicLink()) throw new Error(`Refusing symlink output file: ${dest}`);
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
    process.stderr.write(`Lesson Markdown generation failed: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}