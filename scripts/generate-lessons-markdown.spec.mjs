import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { discoverLessons, generate, parseArguments } from './generate-lessons-markdown.mjs';
import { inferBlockType, localizeReviewValue, renderLessonMarkdown, sourceIndex, supportedLanguages } from './lib/lesson-markdown.mjs';

const T = (en, uk) => uk === undefined ? { fallback: 'en', en } : { en, uk };
const text = (id, en, uk) => ({ id, slug: id, value: T(en, uk) });
const fixture = () => ({
  id: 'lesson-1', group: '1', slug: 'light', title: T('Light', 'Світло'),
  parameters: { languages: ['en', 'uk'] },
  sections: {
    theory: {
      id: 'section-theory', slug: 'theory', title: T('Theory', 'Теорія'), navigationLabel: T('Theory', 'Теорія'),
      content: {
        markdown: { intro: { id: 'md-1', slug: 'intro', locales: T('**Light** travels.', '**Світло** рухається.') } },
        checkpoint: { check: {
          id: 'check-1', slug: 'check', title: T('Check', 'Перевірка'),
          items: [{ question: T('Where?', 'Де?'), answer: [text('nested-1', 'Here', 'Тут')] }],
        } },
        scene: { lamp: { id: 'scene-1', slug: 'lamp', locales: { header: { title: T('Lamp', 'Лампа') }, buttons: { reset: T('Reset') } } } },
      },
    },
    quiz: {
      id: 'section-quiz', slug: 'quiz', title: T('Quiz', 'Тест'), navigationLabel: T('Quiz', 'Тест'),
      content: { quiz: { quiz: {
        id: 'quiz-1', slug: 'quiz', welcome: T('Welcome', 'Вітаємо'), questions: {
          q1: { id: 'q1-id', slug: 'q1', type: 'selectOneAnswer', question: [text('prompt-1', 'Which?', 'Який?')],
            answers: { correct: { a: text('answer-1', 'Correct', 'Правильно') }, incorrect: { b: text('answer-2', 'Wrong', 'Неправильно') } },
            explanation: [text('explain-1', 'Explanation', 'Пояснення')],
          },
        },
      } } },
    },
  },
  flashcards: [{ id: 'card-1', front: [text('front-1', 'Front', 'Перед')], back: [text('back-1', 'Back', 'Назад')], hint: [], tags: ['light'], flags: [] }],
  questions: { selectOneAnswer: { q1: { id: 'q1-id', slug: 'q1' } } },
});

function temporaryRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-md-'));
  const languageFile = path.join(root, 'shared/contracts/src/types/languages.ts');
  fs.mkdirSync(path.dirname(languageFile), { recursive: true });
  fs.writeFileSync(languageFile, "export const DEFAULT_SUPPORTED_LANGUAGES = [{ language: 'en' }, { language: 'uk' }] as const;\n");
  const lessonDir = path.join(root, 'learningApps/playground/data/lessons/1/light');
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.writeFileSync(path.join(lessonDir, 'light.data.ts'), "export const light = { id: 'lesson-1' };\n");
  return { root, lessonDir, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

describe('Lesson → Markdown review projection', () => {
  it('generates localized Markdown with ordered sections, blocks, questions, nested answers, scenes, and flashcards', () => {
    const lesson = fixture();
    const en = renderLessonMarkdown({ lesson, locale: 'en', languages: ['en', 'uk'], packagePath: 'learningApps/playground' });
    const uk = renderLessonMarkdown({ lesson, locale: 'uk', languages: ['en', 'uk'], packagePath: 'learningApps/playground' });
    assert.match(en, /^# Light\n/);
    assert.match(uk, /^# Світло\n/);
    assert.match(uk, /\*\*Світло\*\* рухається\./);
    assert.ok(uk.indexOf('Теорія · theory') < uk.indexOf('Тест · quiz'));
    assert.ok(uk.indexOf('1. intro · markdown') < uk.indexOf('2. check · checkpoint'));
    assert.ok(uk.indexOf('Correct') === -1);
    assert.match(uk, /Правильно/);
    assert.match(uk, /Неправильно/);
    assert.match(uk, /Перевірка/);
    assert.match(uk, /Тут/);
    assert.match(uk, /Лампа/);
    assert.match(uk, /Reset/);
    assert.match(uk, /source: en; fallback for uk/);
    assert.match(uk, /Flashcard 1/);
    assert.match(uk, /Перед/);
    assert.match(uk, /Question 1: q1/);
    assert.equal((uk.match(/Question 1: q1/g) ?? []).length, 1, 'quiz and question catalog should not duplicate a question');
    assert.match(uk, /blob\/new-lesson\/learningApps\/playground\/data\/lessons\/1\/light\/light.data.ts/);
    assert.equal(renderLessonMarkdown({ lesson, locale: 'uk', languages: ['en', 'uk'], packagePath: 'learningApps/playground' }), uk);
    assert.doesNotMatch(uk, /undefined|object Object|Date\(/);
  });

  it('requires explicit fallback and rejects invalid locale data', () => {
    assert.throws(() => localizeReviewValue({ t: { en: 'English' } }, 'uk', ['en', 'uk']), /Missing uk locale at \/t/);
    assert.throws(() => localizeReviewValue({ t: { fallback: 'fr', en: 'English' } }, 'uk', ['en', 'uk']), /Invalid fallback/);
    assert.throws(() => localizeReviewValue({ t: { uk: '' } }, 'uk', ['en', 'uk']), /Invalid locale dictionary/);
    assert.deepEqual(localizeReviewValue({ t: { language: 'en', value: 'Only English' } }, 'uk', ['en', 'uk']).sources,
      { '/t': { code: 'en', isFallback: true } });
  });

  it('fails on missing required lesson data, unknown blocks, malformed quiz answers', () => {
    const missing = fixture();
    delete missing.sections.theory.content.markdown.intro.locales.uk;
    assert.throws(() => renderLessonMarkdown({ lesson: missing, locale: 'uk', languages: ['en', 'uk'], packagePath: 'learningApps/playground' }), /Missing uk locale/);
    const bad = fixture();
    bad.sections.theory.content.checkpoint.check.items[0].answer = [];
    assert.throws(() => renderLessonMarkdown({ lesson: bad, locale: 'uk', languages: ['en', 'uk'], packagePath: 'learningApps/playground' }), /Invalid checkpoint answer/);
    const unknown = fixture();
    unknown.sections.theory.content.what = { mystery: { id: 'mystery', slug: 'mystery' } };
    assert.throws(() => renderLessonMarkdown({ lesson: unknown, locale: 'uk', languages: ['en', 'uk'], packagePath: 'learningApps/playground' }), /Unsupported content block type/);
  });

  it('validates paths and stdout cardinality', () => {
    assert.deepEqual(parseArguments(['--package', 'learningApps/playground', '--lesson', '1/light', '--locale', 'uk', '--stdout']),
      { package: 'learningApps/playground', lesson: '1/light', locale: 'uk', stdout: true });
    assert.throws(() => parseArguments(['--package', 'learningApps/../secrets', '--lesson', '1/light', '--locale', 'uk', '--stdout']), /Invalid --package/);
    assert.throws(() => parseArguments(['--package', 'learningApps/playground', '--lesson', '../secrets', '--locale', 'uk', '--stdout']), /Invalid --lesson/);
    assert.throws(() => parseArguments(['--package', 'learningApps/playground', '--locale', 'uk', '--stdout']), /requires --lesson/);
  });

  it('discovers numbered buckets, writes the requested structure, and generates deterministically', async () => {
    const tmp = temporaryRepo();
    try {
      const root = path.join(tmp.root, 'learningApps/playground');
      fs.mkdirSync(path.join(root, 'data/lessons/not-a-number/ignored'), { recursive: true });
      assert.deepEqual(discoverLessons(root).map(item => `${item.group}/${item.slug}`), ['1/light']);
      assert.deepEqual(supportedLanguages(tmp.root), ['en', 'uk']);
      const opts = { package: 'learningApps/playground', lesson: '1/light', locale: 'uk', stdout: true };
      const loader = async () => fixture();
      const first = await generate(opts, { root: tmp.root, loader });
      const second = await generate(opts, { root: tmp.root, loader });
      assert.equal(first, second);
      assert.match(first, /Світло/);
      const count = await generate({ ...opts, stdout: false, output: 'out' }, { root: tmp.root, loader });
      assert.equal(count, 1);
      assert.equal(fs.readFileSync(path.join(tmp.root, 'out/playground/1/light/uk.md'), 'utf8'), first);
      assert.equal(fs.readFileSync(path.join(tmp.lessonDir, 'light.data.ts'), 'utf8'), "export const light = { id: 'lesson-1' };\n");
      await assert.rejects(generate({ ...opts, lesson: '1/doesNotExist' }, { root: tmp.root, loader }), /No matching canonical lessons/);
    } finally { tmp.cleanup(); }
  });

  it('recognizes nested media and scenes without rendering them', () => {
    assert.equal(inferBlockType({ id: 'i', locales: T('asset.png', 'asset.png'), alt: T('Lamp', 'Лампа') }), 'image');
    assert.equal(inferBlockType({ id: 'a', fileLocation: T('audio.mp3'), title: T('Track'), description: T('About') }), 'audio');
    assert.equal(inferBlockType({ id: 'v', fileLocation: T('video.mp4'), poster: T('poster.png') }), 'video');
    assert.equal(inferBlockType({ id: 'y', href: T('https://youtu.be/example') }), 'youtube');
    assert.equal(inferBlockType({ id: 's', locales: { labels: { start: T('Start') } } }), 'scene');
  });

  it('rejects symlink sources instead of traversing them', () => {
    const tmp = temporaryRepo();
    try {
      fs.symlinkSync(tmp.lessonDir, path.join(tmp.lessonDir, 'linked'));
      assert.throws(() => sourceIndex(tmp.root, 'learningApps/playground/data/lessons/1/light'), /Symlink|Invalid/);
      assert.throws(() => sourceIndex(tmp.root, 'learningApps/playground/data/lessons/1/light/../light'), /Invalid/);
    } finally { tmp.cleanup(); }
  });
});