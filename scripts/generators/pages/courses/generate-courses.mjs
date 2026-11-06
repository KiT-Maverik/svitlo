#!/usr/bin/env node
/** Build-time localized Course publication, separate from client runtime. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { createCourse } from '@svitlo/engine/builders';
import { loadLessonData, splitLessonValue, writeLessonFiles } from '@svitlo/engine/utils';
import { mergeLessonResources } from '@svitlo/engine/lesson';

const repo = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const require = createRequire(import.meta.url);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const id = value => {
  if (!uuid.test(value)) throw new Error('Invalid UUID: ' + value);
  return value;
};
function localized(value, languages, language) {
  const { base, locales } = splitLessonValue(value, languages);
  return mergeLessonResources({ data: base }, { data: locales[language] ?? {} }).data;
}
async function loadCourse(filename) {
  const tmp = fs.mkdtempSync(path.join(path.dirname(filename), '.course-load-'));
  const outfile = path.join(tmp, 'course.cjs');
  try {
    await build({
      entryPoints: [filename],
      outfile,
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
    const found = Object.values(require(outfile)).filter(item => item?.type === 'course');
    if (found.length !== 1) throw new Error('Expected one Course export: ' + filename);
    return found[0];
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
async function loadLessons(root) {
  const result = new Map();
  const directory = path.join(root, 'data/lessons');
  if (!fs.existsSync(directory)) return result;
  for (const bucket of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!bucket.isDirectory() || !/^[0-9a-f]$/.test(bucket.name)) continue;
    for (const folder of fs.readdirSync(path.join(directory, bucket.name), { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;
      id(folder.name);
      if (folder.name.at(-1) !== bucket.name) throw new Error('Wrong Lesson bucket');
      const dir = path.join(directory, bucket.name, folder.name);
      const sources = fs.readdirSync(dir).filter(name => name.endsWith('.data.ts'));
      if (sources.length !== 1) continue;
      const lesson = await loadLessonData(path.join(dir, sources[0]));
      if (lesson.id !== folder.name || result.has(lesson.id)) throw new Error('Duplicate Lesson ID');
      result.set(lesson.id, lesson);
    }
  }
  return result;
}
function walk(items, visitor) {
  for (const item of items) {
    if (typeof item === 'string') visitor('lesson', item);
    else if (item.type === 'lessonOverride') visitor('override', item);
    else if (item.type === 'episode') visitor('episode', item);
    else if (item.type === 'module' || item.type === 'chapter') {
      visitor('group', item);
      walk(item.content, visitor);
    } else throw new Error('Invalid Course entry');
  }
}
async function render(root) {
  const folder = path.join(root, 'data/courses'),
    resources = new Map();
  if (!fs.existsSync(folder)) return resources;
  const lessons = await loadLessons(root),
    courseIds = new Set();
  for (const name of fs.readdirSync(folder).filter(name => name.endsWith('.data.ts'))) {
    const course = await loadCourse(path.join(folder, name)),
      languages = course.parameters?.languages;
    id(course.id);
    if (courseIds.has(course.id)) throw new Error('Duplicate Course ID');
    courseIds.add(course.id);
    if (!Array.isArray(languages) || !languages.length || new Set(languages).size !== languages.length) {
      throw new Error('Invalid Course languages');
    }
    const visited = new Set([course.id]),
      usedLessons = new Set();
    walk(course.content, (kind, item) => {
      const key = id(kind === 'lesson' ? item : kind === 'override' ? item.lessonId : item.id);
      if (kind === 'group' || kind === 'episode') {
        if (visited.has(key)) throw new Error('Duplicate Course node ID ' + key);
        visited.add(key);
        if (kind === 'episode' && item.sections.some(section => section.type !== 'scenario')) {
          throw new Error('Episode contains non-scenario Section');
        }
      } else {
        const lesson = lessons.get(key);
        if (!lesson || usedLessons.has(key)) throw new Error('Missing/repeated Lesson: ' + key);
        usedLessons.add(key);
        if (languages.some(language => !lesson.parameters.languages.includes(language))) {
          throw new Error('Lesson languages do not cover Course languages');
        }
      }
    });
    const creator = createCourse(course);
    for (const language of languages) {
      const context = {
        language,
        resolveLesson(key) {
          const lesson = lessons.get(key);
          if (!lesson) throw new Error('Unknown Lesson ' + key);
          return {
            type: 'lesson',
            id: key,
            title: typeof lesson.title === 'string' ? lesson.title : lesson.title[language],
          };
        },
      };
      resources.set(course.id + '/toc/' + language + '.json', JSON.stringify(creator.toToc(context)) + '\n');
      walk(course.content, (kind, item) => {
        if (kind === 'override')
          resources.set(
            course.id + '/overrides/' + item.lessonId + '/' + language + '.json',
            JSON.stringify(localized(item, languages, language)) + '\n',
          );
        if (kind === 'episode')
          resources.set(
            course.id + '/episodes/' + item.id + '/' + language + '.json',
            JSON.stringify(localized(item, languages, language)) + '\n',
          );
      });
    }
  }
  return resources;
}
async function main(args) {
  let workspace, output, action;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--package') workspace = args[++i];
    else if (args[i] === '--output') output = args[++i];
    else if (['--write', '--check'].includes(args[i])) action = args[i];
    else throw new Error('Invalid argument');
  }
  if (!/^content\/[a-z][a-z-]*$/.test(workspace ?? '') || !action)
    throw new Error('Invalid Course generator arguments');
  const root = path.join(repo, workspace),
    target = output ? path.resolve(repo, output) : path.join(root, 'public/data/pages/courses');
  if (!target.startsWith(repo + path.sep)) throw new Error('Unsafe output');
  const resources = await render(root);
  if (action === '--write') writeLessonFiles(target, resources);
  else
    for (const [filename, value] of resources) {
      if (fs.readFileSync(path.join(target, filename), 'utf8') !== value)
        throw new Error('Outdated Course JSON ' + filename);
    }
  console.log('Course resources: ' + resources.size);
}
main(process.argv.slice(2)).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
