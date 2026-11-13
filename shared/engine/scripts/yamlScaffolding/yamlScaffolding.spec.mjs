import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';

import { runOne } from '../lessonBuilder/lessonBuilder.mjs';
import { parseCourseYaml, renderCourseSource, verifyOrWriteGenerated } from '../courseBuilder/courseBuilder.mjs';

const lessonId = '00000000-0000-4000-8000-00000000000c';
const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const group = items => ({ items, order: Object.keys(items) });

function calls(source) {
  const tree = ts.createSourceFile('draft.data.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(tree.parseDiagnostics, [], 'generated draft must be syntactically valid');
  const names = [];
  const walk = node => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) names.push(node.expression.text);
    ts.forEachChild(node, walk);
  };
  walk(tree);
  return names;
}

test('Studio editorial YAML remains intact while both builders emit nested TS drafts', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-yaml-integrated-'));
  const workspace = path.join(root, 'content/playground');
  const lessonDir = path.join(workspace, 'data/lessons/c', lessonId);
  const courseDir = path.join(workspace, 'data/courses/7', courseId);
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.mkdirSync(courseDir, { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');
  try {
    const sourceBlock = { id: id(1), slug: 'text', type: 'text',
      locale: { value: { uk: 'Привіт', en: 'EN_NOT_AUTHORED' } } };
    const lesson = {
      documentLanguage: 'uk', type: 'lesson', id: lessonId, slug: 'lightLesson',
      params: { languages: ['uk', 'en'] },
      section: group({
        intro: { id: id(2), type: 'content', slug: 'intro', content: group({
          welcome: sourceBlock,
          gallery: { id: id(3), type: 'carousel', slug: 'gallery',
            slides: group({ slide: { id: id(4), type: 'carouselSlide', slug: 'slide' } }) },
          checkpoint: { id: id(5), type: 'checkpoint', slug: 'checkpoint', content: group({
            item: { id: id(6), type: 'checkpointItem', slug: 'item',
              question: { ...sourceBlock }, answer: group({ correct: { ...sourceBlock } }) },
          }) },
        }) },
      }),
    };
    fs.writeFileSync(path.join(lessonDir, 'lesson.config.yaml'), yaml.stringify(lesson));
    const editorial = 'kind: lesson-content-plan\nstatus: draft\nsections: []\n';
    fs.writeFileSync(path.join(lessonDir, 'content.yaml'), editorial);
    assert.equal(runOne(lessonDir, 'generate', root).changed, 1);
    assert.equal(fs.readFileSync(path.join(lessonDir, 'content.yaml'), 'utf8'), editorial);
    const lessonCode = fs.readFileSync(path.join(lessonDir, 'lightLesson.data.ts'), 'utf8');
    const lessonCalls = calls(lessonCode);
    for (const name of ['defineLesson', 'defineContentSection', 'defineText',
      'defineCarousel', 'defineCarouselSlide', 'defineCheckpoint', 'defineCheckpointItem']) {
      assert(lessonCalls.includes(name), name + ' missing in Lesson draft');
    }
    assert(!lessonCode.includes('EN_NOT_AUTHORED'));
    assert(lessonCode.includes('import { '));
    assert(lessonCode.includes("from '@svitlo/engine/build'"));

    const lessonImport = '../../../lessons/c/' + lessonId + '/lightLesson.data.ts';
    assert(fs.existsSync(path.resolve(courseDir, lessonImport)));
    const course = {
      documentLanguage: 'uk', type: 'course', id: courseId, slug: 'lightCourse',
      params: { languages: ['uk', 'en'] },
      locale: { title: { uk: 'Курс світла', en: 'EN_COURSE' } },
      content: group({
        module: { id: id(7), slug: 'module', type: 'module', content: group({
          chapter: { id: id(8), slug: 'chapter', type: 'chapter', content: group({
            episode: { id: id(9), slug: 'episode', type: 'episode', section: group({
              section: { id: id(10), slug: 'section', type: 'content', content: group({
                gallery: { id: id(11), slug: 'gallery', type: 'carousel',
                  slides: group({ slide: { id: id(12), slug: 'slide', type: 'carouselSlide' } }) },
              }) },
            }) },
            lesson: { type: 'lesson', lessonId,
              source: { path: lessonImport, export: 'lightLesson_Lesson' } },
          }) },
        }) },
      }),
    };
    const courseYaml = yaml.stringify(course);
    fs.writeFileSync(path.join(courseDir, 'course.yaml'), courseYaml);
    const courseCode = renderCourseSource(parseCourseYaml(courseYaml));
    const courseOutput = path.join(courseDir, 'lightCourse.data.ts');
    assert.equal(verifyOrWriteGenerated(courseOutput, courseCode, '--write'), true);
    assert.equal(verifyOrWriteGenerated(courseOutput, courseCode, '--check'), false);
    assert.equal(verifyOrWriteGenerated(courseOutput, courseCode, '--write'), false);
    const courseCalls = calls(courseCode);
    for (const name of ['defineCourse', 'defineModule', 'defineChapter',
      'defineEpisode', 'defineContentSection', 'defineCarousel', 'defineCarouselSlide']) {
      assert(courseCalls.includes(name), name + ' missing in Course draft');
    }
    assert(courseCode.includes('lightLesson_Lesson as standaloneLesson0'));
    assert(!courseCode.includes('UNRESOLVED_LESSON'));
    assert(!courseCode.includes('EN_COURSE'));
    assert(!courseCode.includes('"documentLanguage"'));
    assert.equal(fs.readFileSync(path.join(courseDir, 'course.yaml'), 'utf8'), courseYaml);
    assert(!fs.existsSync(path.join(courseDir, 'generated')));
    assert(!fs.existsSync(path.join(lessonDir, 'generated')));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
