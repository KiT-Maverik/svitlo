#!/usr/bin/env node
/** Build-time localized Course publication, separate from client runtime. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { createCourse } from '@svitlo/engine/builders';
import { splitLessonValue, writeLessonFiles } from '@svitlo/engine/utils';
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
async function render(root) {
  const folder = path.join(root, 'data/courses'),
    resources = new Map();
  if (!fs.existsSync(folder)) return resources;
  const courseIds = new Set();
  for (const name of fs.readdirSync(folder).filter(name => name.endsWith('.data.ts'))) {
    const course = await loadCourse(path.join(folder, name)),
      languages = course.parameters?.languages;
    id(course.id);
    if (courseIds.has(course.id)) throw new Error('Duplicate Course ID');
    courseIds.add(course.id);
    if (!Array.isArray(languages) || !languages.length || new Set(languages).size !== languages.length) {
      throw new Error('Invalid Course languages');
    }
    // A single unified Course creator API owns authored-tree traversal.
    // Full Lesson Data is build-only; the publisher emits compact references.
    const creator = createCourse(course);
    const { groups, episodes, lessons, overrides } = creator.getPublicationItems();
    const visited = new Set([course.id]);
    const usedLessons = new Set();
    for (const group of groups) {
      const key = id(group.id);
      if (visited.has(key)) throw new Error('Duplicate Course node ID ' + key);
      visited.add(key);
    }
    for (const episode of episodes) {
      const key = id(episode.id);
      if (visited.has(key)) throw new Error('Duplicate Course node ID ' + key);
      visited.add(key);
      if (episode.sections.some(section => section.type !== 'scenario')) {
        throw new Error('Episode contains non-scenario Section');
      }
    }
    for (const lesson of lessons) {
      const key = id(lesson.id);
      if (usedLessons.has(key)) throw new Error('Repeated Lesson: ' + key);
      usedLessons.add(key);
    }
    for (const override of overrides) {
      if (override.lessonId !== override.lesson?.id) throw new Error('Mismatched Lesson override ID');
    }
    for (const language of languages) {
      const { toc } = creator.toResource({ language });
      resources.set(course.id + '/toc/' + language + '.json', JSON.stringify(toc) + '\n');
      for (const item of overrides) {
        // Never publish the full source Lesson again inside an override patch.
        const { lesson, ...patch } = item;
        resources.set(
          course.id + '/overrides/' + item.lessonId + '/' + language + '.json',
          JSON.stringify(localized(patch, languages, language)) + '\n',
        );
      }
      for (const episode of episodes) {
        resources.set(
          course.id + '/episodes/' + episode.id + '/' + language + '.json',
          JSON.stringify(localized(episode, languages, language)) + '\n',
        );
      }
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
