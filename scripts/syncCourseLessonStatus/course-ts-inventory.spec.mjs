import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import { readCourseTsInventory } from './course-ts-inventory.mjs';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const newLesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
const reusedLesson = '20ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const directory = 'content/math/data/courses/7/' + courseId;
const yamlFile = 'content/math/data/lessons/c/' + newLesson + '/lesson.yaml';
const reusedFile = 'content/math/data/lessons/7/' + reusedLesson + '/orbit.data.ts';
const moduleFile = directory + '/modules/foundations.ts';
const indexFile = directory + '/index.ts';
const methodsFile = directory + '/methodology.md';

function fixture(withPlacement = false) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-ts-'));
  const put = (filename, data) => {
    const target = path.join(root, filename);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, data);
  };
  const imported = path.posix.relative(path.posix.dirname(moduleFile), reusedFile).replace(/\.ts$/, '');
  put(indexFile, [
    'import { defineCourse } from "@svitlo/engine/build";',
    'import { foundations_Module } from "./modules/foundations";',
    '// TODO: Deliberately incorrect UUID; comments are not an identity source.',
    'export const main_Course = defineCourse({',
    '  id: "' + courseId + '", type: "course",',
    '  params: { languages: ["en", "uk"] },',
    '  content: { items: { direct: UNRESOLVED_LESSON_0, foundations: foundations_Module },',
    '    order: ["direct", "foundations"] }',
    '});',
    '',
  ].join('\n'));
  put(moduleFile, [
    'import { defineModule } from "@svitlo/engine/build";',
    'import { standaloneLesson as linkedLesson } from ' + JSON.stringify(imported) + ';',
    'export const foundations_Module = defineModule({',
    '  id: "12ecbde1-97fd-5fe7-a353-ea89b9ef4a67",',
    '  slug: "foundations", type: "module",',
    '  content: { items: { reused: linkedLesson, revisit: UNRESOLVED_LESSON_0 },',
    '    order: ["reused", "revisit"] }',
    '});',
    '',
  ].join('\n'));
  put(reusedFile, [
    'import { defineLesson } from "@svitlo/engine/build";',
    'export const standaloneLesson = defineLesson({ id: "' + reusedLesson + '", type: "lesson" });',
    '',
  ].join('\n'));
  put(yamlFile, YAML.stringify({
    config: { id: newLesson, locale: { title: { en: 'First Sky', uk: 'Перше небо' } } },
    production: { documentLanguage: 'en' },
  }));
  function entry(slug, id, title, placement) {
    return [
      '### Lesson ' + slug + ' — ' + title, '',
      'Lesson UUID: ' + id, '',
      ...(withPlacement ? ['Placement: ' + placement, ''] : []),
      'Objective: Observe', '',
    ];
  }
  put(methodsFile, [
    '# Test Course', '',
    ...entry('direct', newLesson, 'First Sky', 'direct'),
    ...entry('reused', reusedLesson, 'Reused Lesson', 'foundations / reused'),
    ...entry('revisit', newLesson, 'First Sky Again', 'foundations / revisit'),
  ].join('\n'));
  return { root, put, close: () => fs.rmSync(root, { recursive: true, force: true }) };
}

for (const withPlacement of [false, true]) {
  test('Course TS inventory recovers persisted Lesson UUIDs, reused imports and placements; placement metadata: ' +
    withPlacement, () => {
    const f = fixture(withPlacement);
    try {
      const inventory = readCourseTsInventory(f.root, directory, courseId);
      assert.deepEqual(inventory.languages, ['en', 'uk']);
      assert.equal(inventory.allocated, true);
      assert.deepEqual(inventory.unresolved, []);
      assert.equal(inventory.lessons.length, 2);
      assert.deepEqual(inventory.lessons.find(x => x.lessonId === newLesson), {
        lessonId: newLesson, title: 'First Sky', placements: ['direct', 'foundations / revisit'],
      });
      assert.deepEqual(inventory.lessons.find(x => x.lessonId === reusedLesson), {
        lessonId: reusedLesson, title: 'Reused Lesson', placements: ['foundations / reused'],
      });
    } finally { f.close(); }
  });
}

test('Reject tampered TypeScript IDs, incomplete mapping, invalid imports and dynamic expressions', () => {
  const f = fixture();
  const original = fs.readFileSync(path.join(f.root, indexFile), 'utf8');
  try {
    for (const content of [
      original.replace('UNRESOLVED_LESSON_0, foundations:', 'MISSING_ID, foundations:'),
      original.replace('id: "' + courseId + '"', 'id: "' + reusedLesson + '"'),
      original.replace('order: ["direct", "foundations"]', 'order: ["direct"]'),
      original.replace('direct: UNRESOLVED_LESSON_0', 'direct: defineLesson({})'),
      original.replace('./modules/foundations', '../escape'),
      original.replace('languages: ["en", "uk"]', 'languages: []'),
    ]) {
      f.put(indexFile, content);
      assert.throws(() => readCourseTsInventory(f.root, directory, courseId));
    }
    f.put(indexFile, original);
    f.put(methodsFile, fs.readFileSync(path.join(f.root, methodsFile), 'utf8')
      .replace('Lesson UUID: ' + newLesson, 'Lesson UUID: ' + courseId));
    assert.throws(() => readCourseTsInventory(f.root, directory, courseId), /Lesson YAML ID|UUID/);
  } finally { f.close(); }
});

test('Reject malformed Lesson YAML and symlinks without evaluating Course TypeScript', () => {
  const f = fixture();
  try {
    f.put(yamlFile, YAML.stringify({ config: { id: courseId } }));
    assert.throws(() => readCourseTsInventory(f.root, directory, courseId), /YAML ID disagrees/);
    f.put(yamlFile, YAML.stringify({
      config: { id: newLesson, locale: { title: { en: 'First Sky' } } },
      production: { documentLanguage: 'en' },
    }));
    const filename = path.join(f.root, moduleFile);
    fs.rmSync(filename);
    fs.symlinkSync('/etc/passwd', filename);
    assert.throws(() => readCourseTsInventory(f.root, directory, courseId), /symlink/);
  } finally { f.close(); }
});

test('Reject mismatched Course UUID bucket or cross-package root', () => {
  const f = fixture();
  try {
    assert.throws(() => readCourseTsInventory(f.root, '../' + directory, courseId));
    assert.throws(() => readCourseTsInventory(f.root, directory, reusedLesson));
    assert.throws(() => readCourseTsInventory(f.root, 'content/other/data/courses/7/' + courseId, courseId));
  } finally { f.close(); }
});
