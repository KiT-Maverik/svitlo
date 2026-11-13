import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import YAML from 'yaml';

import { runOne as runLesson } from '../lessonBuilder/lessonBuilder.mjs';
import { main as runCourse } from '../courseBuilder/courseBuilder.mjs';

const lessonId = '00000000-0000-4000-8000-00000000000c';
const courseId = '00000000-0000-4000-8000-00000000000d';
const uid = last => '00000000-0000-4000-8000-' + String(last).padStart(12, '0');
const items = entries => ({ items: entries, order: Object.keys(entries) });
const textBlock = (slug, value) => ({
  type: 'text',
  id: uid(1),
  slug,
  locale: { value: { uk: value, en: 'SHOULD_NOT_APPEAR' } },
});

test('Studio plan → separate Lesson Config → Course Config emits compatible draft sources', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-yaml-integrated-'));
  const workspace = path.join(root, 'content/playground');
  const lessonFolder = path.join(workspace, 'data/lessons/c', lessonId);
  const courseFolder = path.join(workspace, 'data/courses/d', courseId);
  fs.mkdirSync(lessonFolder, { recursive: true });
  fs.mkdirSync(courseFolder, { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');

  try {
    // A Screenwriter's editorial content.yaml is not a defineLesson Config.
    const editorial = { kind: 'lesson-content-plan', documentLanguage: 'uk',
      sections: [{ key: 'EDITORIAL_ONLY', type: 'content', blocks: [] }] };
    const lesson = {
      id: lessonId, slug: 'introLesson', type: 'lesson',
      params: { languages: ['uk', 'en'] },
      locale: { title: { uk: 'Вступ', en: 'SHOULD_NOT_APPEAR' } },
      section: items({ intro: {
        id: uid(2), slug: 'intro', type: 'content',
        content: items({
          lead: textBlock('lead', 'Привіт'),
          gallery: {
            id: uid(3), slug: 'gallery', type: 'carousel',
            slides: items({ first: { id: uid(4), slug: 'first', type: 'carouselSlide',
              locale: { alt: { uk: 'Фото', en: 'SHOULD_NOT_APPEAR' } } } }),
          },
        }),
      } }),
      flashcards: items({ card: {
        id: uid(5), slug: 'card', type: 'flashcard',
        parameters: {
          flags: items({ mnemonic: { type: 'acronym', value: { uk: 'Л', en: 'SHOULD_NOT_APPEAR' } } }),
        },
        content: { front: items({ front: textBlock('front', 'Що?') }),
          back: items({ back: textBlock('back', 'Світло') }) },
      } }),
    };
    const lessonConfig = YAML.stringify(lesson);
    fs.writeFileSync(path.join(lessonFolder, 'content.yaml'), YAML.stringify(editorial));
    fs.writeFileSync(path.join(lessonFolder, 'lesson.config.yaml'), lessonConfig);
    const lessonResult = runLesson(lessonFolder, 'generate', root);
    assert.equal(lessonResult.changed, 1);
    const lessonText = fs.readFileSync(path.join(lessonFolder, 'introLesson.data.ts'), 'utf8');
    for (const factory of ['defineLesson', 'defineContentSection', 'defineText',
      'defineCarousel', 'defineCarouselSlide', 'defineFlashcard']) {
      assert(lessonText.includes(factory + '('), 'missing Lesson factory: ' + factory);
    }
    assert(!lessonText.includes('EDITORIAL_ONLY'));
    assert(!lessonText.includes('SHOULD_NOT_APPEAR'));
    assert(lessonText.includes('"languages": ['));
    assert(!lessonText.includes('documentLanguage'));

    // Reuse that exact Lesson through a canonical, bounded sibling import.
    const sibling = '../../../lessons/c/' + lessonId + '/introLesson.data.ts';
    const course = {
      id: courseId, slug: 'introCourse', type: 'course', documentLanguage: 'uk',
      params: { languages: ['uk', 'en'] },
      locale: { title: { uk: 'Курс', en: 'SHOULD_NOT_APPEAR' } },
      content: items({
        firstModule: { id: uid(6), slug: 'firstModule', type: 'module',
          content: items({ firstChapter: { id: uid(7), slug: 'firstChapter', type: 'chapter',
            content: items({
              introduction: { id: uid(8), slug: 'introduction', type: 'episode',
                section: items({ scene: { id: uid(9), slug: 'scene', type: 'content',
                  content: items({
                    welcome: textBlock('welcome', 'Вітаю'),
                    carousel: { id: uid(10), slug: 'carousel', type: 'carousel',
                      slides: items({ slide: { id: uid(11), slug: 'slide', type: 'carouselSlide' } }) },
                    checkpoint: { id: uid(12), slug: 'checkpoint', type: 'checkpoint',
                      content: items({ task: { id: uid(13), slug: 'task', type: 'checkpointItem',
                        question: textBlock('question', 'Запитання'),
                        answer: items({ yes: textBlock('yes', 'Так') }),
                      } }) },
                  }),
                } }),
              },
              lesson: { type: 'lesson', lessonId, source: { path: sibling, export: 'introLesson_Lesson' } },
            }),
          } }),
        },
      }),
    };
    fs.writeFileSync(path.join(courseFolder, 'course.yaml'), YAML.stringify(course));
    await runCourse(['--package', 'content/playground', '--course', courseId, '--write'], root);
    const courseText = fs.readFileSync(path.join(courseFolder, 'introCourse.data.ts'), 'utf8');
    for (const factory of [
      'defineCourse', 'defineModule', 'defineChapter', 'defineEpisode', 'defineContentSection',
      'defineText', 'defineCarousel', 'defineCarouselSlide', 'defineCheckpoint', 'defineCheckpointItem',
    ]) assert(courseText.includes(factory + '('), 'missing Course factory: ' + factory);
    assert(courseText.includes(sibling.replace(/\.ts$/, '')));
    assert(courseText.includes('import { introLesson_Lesson as standaloneLesson0 }'));
    assert(!courseText.includes('UNRESOLVED_LESSON_'));
    assert(!courseText.includes('defineLesson('));
    assert(!courseText.includes('SHOULD_NOT_APPEAR'));
    assert(!courseText.includes('documentLanguage'));
    assert(!courseText.includes('generateCourseProps'));
    assert.deepEqual(ts.createSourceFile('lesson.ts', lessonText, ts.ScriptTarget.Latest, true).parseDiagnostics, []);
    assert.deepEqual(ts.createSourceFile('course.ts', courseText, ts.ScriptTarget.Latest, true).parseDiagnostics, []);
    assert.equal(runLesson(lessonFolder, 'check', root).changed, 0);
    await runCourse(['--package', 'content/playground', '--course', courseId, '--check'], root);
    assert.equal(fs.readFileSync(path.join(lessonFolder, 'lesson.config.yaml'), 'utf8'), lessonConfig);
    assert(!fs.existsSync(path.join(lessonFolder, 'generated')));
    assert(!fs.existsSync(path.join(courseFolder, 'generated')));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
