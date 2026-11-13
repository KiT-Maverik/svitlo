import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { discoverLessons, generate, loadLesson, parseArguments } from './generate-lessons-markdown.mjs';
import { localizeReviewValue, renderLessonMarkdown, sourceIndex, supportedLanguages } from './lesson-markdown.mjs';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const relative = 'c/' + lessonId;
const realLessonEntry = path.resolve('content/playground/data/lessons', relative, 'index.ts');
const realPackage = path.resolve('content/playground');

function fixture(locale = 'uk') {
  const t = (en, uk) => (locale === 'uk' ? uk : en);
  const block = (slug, en, uk) => ({
    id: slug,
    slug,
    type: 'text',
    params: {},
    locale: { value: t(en, uk) },
  });
  return {
    id: lessonId,
    slug: 'howLightMoves',
    type: 'lesson',
    skills: ['skill-1'],
    params: { languages: ['en', 'uk'], requireQuiz: true, sections: { showIndexes: true } },
    locale: { title: t('How Light Moves', 'Як рухається світло') },
    section: [
      {
        id: 'section-id',
        slug: 'theory',
        type: 'content',
        params: {},
        locale: { title: t('Theory', 'Теорія'), navigationLabel: t('Theory', 'Теорія') },
        content: [
          {
            id: 'md-id',
            slug: 'intro',
            type: 'markdown',
            params: {},
            locale: { value: t('**Light** travels.', '**Світло** рухається.') },
          },
          block('basic', 'Light is visible.', 'Світло видиме.'),
          {
            id: 'image-id',
            slug: 'beam',
            type: 'image',
            params: {},
            locale: {
              src: '/images/beam.png',
              alt: t('A ray', 'Промінь'),
              caption: t('Ray caption', 'Підпис променя'),
              fallback: { unavailable: t('Image unavailable', 'Зображення недоступне') },
            },
          },
          {
            id: 'video-id',
            slug: 'film',
            type: 'video',
            params: {},
            locale: {
              fileLocation: '/video/beam.mp4',
              poster: '/poster/beam.png',
              title: t('Demonstration', 'Демонстрація'),
              fallback: { playbackError: t('Playback failed', 'Помилка відтворення') },
            },
          },
          {
            id: 'youtube-id',
            slug: 'external',
            type: 'youtube',
            params: { mode: 'embed' },
            locale: {
              href: 'https://www.youtube.com/watch?v=example',
              label: t('Watch refraction', 'Подивіться заломлення'),
            },
          },
          {
            id: 'audio-id',
            slug: 'narration',
            type: 'audio',
            params: {},
            locale: { fileLocation: '/narration.ogg', title: t('Narration', 'Озвучення') },
          },
          {
            id: 'carousel-id',
            slug: 'slides',
            type: 'carousel',
            params: {},
            locale: {
              title: t('Gallery', 'Галерея'),
              slides: [
                {
                  src: '/slides/one.png',
                  alt: t('First beam', 'Перший промінь'),
                  caption: t('Slide caption', 'Підпис слайда'),
                },
              ],
            },
          },
          {
            id: 'scene-id',
            slug: 'simulation',
            type: 'scene',
            params: {},
            locale: { value: { controls: { reset: t('Reset', 'Скинути') } } },
          },
          {
            id: 'code-id',
            slug: 'algorithm',
            type: 'code',
            params: { language: 'python', codeAsText: 'print("%_%MEDIUM%_%")' },
            locale: { variables: { MEDIUM: t('air', 'повітря') } },
          },
          {
            id: 'check-id',
            slug: 'checkpoint',
            type: 'checkpoint',
            params: {},
            locale: { title: t('Check', 'Перевірка') },
            content: [{ question: block('checkQuestion', 'Where?', 'Де?'), answer: [block('answer', 'Here', 'Тут')] }],
          },
        ],
      },
      {
        id: 'quiz-id',
        slug: 'quiz',
        type: 'quiz',
        locale: { title: t('Quiz', 'Тест'), navigationLabel: t('Quiz', 'Тест') },
        params: { selection: { mode: 'all' }, layout: { mode: 'stepper' } },
        content: [],
      },
    ],
    questions: {
      selectOneAnswer: [
        {
          id: 'q-1',
          slug: 'why-light',
          type: 'selectOneAnswer',
          params: {},
          locale: {},
          content: {
            question: [block('prompt', 'Which path?', 'Який шлях?')],
            answers: {
              correct: { straight: block('straight', 'Straight line', 'Пряма лінія') },
              incorrect: { curved: block('curved', 'Curved line', 'Крива лінія') },
            },
          },
        },
      ],
      matchBlocks: [
        {
          id: 'q-2',
          slug: 'match-beams',
          type: 'matchBlocks',
          params: {},
          locale: {},
          content: { question: [block('matchPrompt', 'Match rays', 'Зіставте промені')] },
        },
      ],
    },
    flashcards: [
      {
        id: 'flash-1',
        slug: 'lightFlashcard',
        type: 'flashcard',
        parameters: {
          tags: ['physics'],
          flags: [
            { type: 'list', count: 2 },
            { type: 'custom', value: t('Review', 'Повторення'), color: 'info', icon: 'bookmark' },
          ],
          relationships: [{ relationshipId: 'r-1', type: 'reverse', relatedFlashcardId: 'flash-2', position: 'peer' }],
        },
        content: {
          front: [block('front', 'What travels?', 'Що поширюється?')],
          back: [block('back', 'Light', 'Світло')],
          hint: [],
        },
      },
    ],
  };
}

function temporaryRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-md-'));
  const languageFile = path.join(root, 'shared/engine/schemas/languages.schemas.ts');
  fs.mkdirSync(path.dirname(languageFile), { recursive: true });
  fs.writeFileSync(
    languageFile,
    "export const DEFAULT_SUPPORTED_LANGUAGES = [{ language: 'en' }, { language: 'uk' }] as const;\n",
  );
  const lessonDir = path.join(root, 'content/playground/data/lessons', relative);
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.writeFileSync(path.join(lessonDir, 'index.ts'), 'export const lesson = {};\n');
  return { root, lessonDir, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

describe('Current Lesson Props → localized Markdown review projection', () => {
  it('renders one complete selected-language document with Question/Flashcard banks and media metadata', () => {
    const markdown = renderLessonMarkdown({
      lesson: fixture('uk'),
      locale: 'uk',
      languages: ['en', 'uk'],
      packagePath: 'content/playground',
    });
    assert.match(markdown, /^# Як рухається світло/m);
    assert.match(markdown, /## Lesson/);
    assert.ok(markdown.indexOf('Теорія') < markdown.indexOf('Тест'));
    assert.match(markdown, /Світло/);
    assert.match(markdown, /Quiz uses references into the Question Bank/);
    assert.match(markdown, /why-light/);
    assert.equal((markdown.match(/### 1\. why-light · selectOneAnswer/g) ?? []).length, 1);
    assert.match(markdown, /## Question Bank/);
    assert.match(markdown, /## Flashcard Bank/);
    for (const expected of [
      'Скинути',
      'Промінь',
      'Підпис променя',
      'Зображення недоступне',
      'Помилка відтворення',
      'poster',
      'Озвучення',
      'Перший промінь',
      'Підпис слайда',
      'Зіставте промені',
      'повітря',
      'relationshipId',
      'physics',
      'Повторення',
      'bookmark',
    ])
      assert.ok(markdown.includes(expected), 'Missing review field: ' + expected);
    assert.doesNotMatch(markdown, /Ray caption|Image unavailable|Playback failed|Straight line|First beam/);
    assert.doesNotMatch(markdown, /undefined|\[object Object\]/);
    assert.equal(
      markdown,
      renderLessonMarkdown({
        lesson: fixture('uk'),
        locale: 'uk',
        languages: ['en', 'uk'],
        packagePath: 'content/playground',
      }),
    );
    assert.match(markdown, /github.com\/KiT-Maverik\/svitlo\/blob/);
  });

  it('does not silently fabricate translations or accept legacy locale fallback dictionaries', () => {
    assert.equal(localizeReviewValue({ alt: { en: '', uk: 'Опис' } }, 'en', ['en', 'uk']).value.alt, '');
    assert.throws(
      () => localizeReviewValue({ text: { en: 'only' } }, 'uk', ['en', 'uk']),
      /Incomplete locale dictionary/,
    );
    assert.throws(
      () => localizeReviewValue({ text: { fallback: 'en', en: 'only' } }, 'uk', ['en', 'uk']),
      /Field-level fallback/,
    );
    assert.throws(
      () => localizeReviewValue({ text: { language: 'en', value: 'only' } }, 'uk', ['en', 'uk']),
      /single-language fallback/,
    );
    const unresolved = fixture('uk');
    delete unresolved.locale.title;
    assert.throws(
      () =>
        renderLessonMarkdown({
          lesson: unresolved,
          locale: 'uk',
          languages: ['en', 'uk'],
          packagePath: 'content/playground',
        }),
      /resolved locale.title/,
    );
  });

  it('rejects unknown blocks and malformed Quiz Props', () => {
    const lesson = fixture();
    lesson.section[0].content.push({ type: 'unsupported', id: 'x', slug: 'x' });
    assert.throws(
      () =>
        renderLessonMarkdown({
          lesson,
          locale: 'uk',
          languages: ['en', 'uk'],
          packagePath: 'content/playground',
        }),
      /Unsupported content block type/,
    );
    const broken = fixture();
    delete broken.section[1].params;
    assert.throws(
      () =>
        renderLessonMarkdown({
          lesson: broken,
          locale: 'uk',
          languages: ['en', 'uk'],
          packagePath: 'content/playground',
        }),
      /missing params/,
    );
  });

  it('validates CLI arguments and canonical UUID identity', () => {
    assert.deepEqual(
      parseArguments(['--package', 'content/playground', '--lesson', lessonId, '--locale', 'uk', '--stdout']),
      { package: 'content/playground', lesson: lessonId, locale: 'uk', stdout: true },
    );
    assert.throws(
      () => parseArguments(['--package', 'content/../etc', '--lesson', lessonId, '--locale', 'uk', '--stdout']),
      /Invalid --package/,
    );
    assert.throws(
      () =>
        parseArguments(['--package', 'content/playground', '--lesson', 'c/' + lessonId, '--locale', 'uk', '--stdout']),
      /canonical UUID/,
    );
  });

  it('discovers canonical index.ts entries and generates reproducible review documents', async () => {
    const tmp = temporaryRepo();
    try {
      assert.deepEqual(
        discoverLessons(path.join(tmp.root, 'content/playground')).map(x => x.id),
        [lessonId],
      );
      assert.equal(
        discoverLessons(path.join(tmp.root, 'content/playground'))[0].entry,
        path.join(tmp.lessonDir, 'index.ts'),
      );
      assert.deepEqual(supportedLanguages(tmp.root), ['en', 'uk']);
      const options = { package: 'content/playground', lesson: lessonId, locale: 'uk', stdout: true };
      // Load the real configurator once and reuse it to isolate discovery and output handling.
      const real = await loadLesson(realLessonEntry, realPackage);
      const loader = async () => real;
      const result = await generate(options, { root: tmp.root, loader });
      assert.match(result, /Як рухається світло/);
      assert.equal(result, await generate(options, { root: tmp.root, loader }));
      assert.equal(await generate({ ...options, stdout: false, output: 'out' }, { root: tmp.root, loader }), 1);
      assert.equal(fs.readFileSync(path.join(tmp.root, 'out/playground', relative, 'uk.md'), 'utf8'), result);
      assert.match(fs.readFileSync(path.join(tmp.lessonDir, 'index.ts'), 'utf8'), /export const lesson/);
      assert.throws(() => sourceIndex(tmp.root, '../tmp'), /Invalid/);
    } finally {
      tmp.cleanup();
    }
  });

  it('renders the actual Playground Lesson configurator and its resolved Question/Flashcard Props', async () => {
    const root = path.resolve('.');
    const lesson = await loadLesson(realLessonEntry, realPackage);
    assert.equal(lesson.id, lessonId);
    const markdown = await generate(
      {
        package: 'content/playground',
        lesson: lessonId,
        locale: 'uk',
        stdout: true,
      },
      { root },
    );
    assert.match(markdown, /## Question Bank/);
    assert.match(markdown, /## Flashcard Bank/);
    assert.match(markdown, /Quiz uses references/);
    assert.match(markdown, /Як рухається світло/);
    assert.doesNotMatch(markdown, /\[object Object\]|undefined/);
  });

  it('rejects symlinked canonical source directories', () => {
    const tmp = temporaryRepo();
    try {
      fs.symlinkSync(tmp.lessonDir, path.join(tmp.lessonDir, 'self'));
      assert.throws(() => sourceIndex(tmp.root, 'content/playground/data/lessons/' + relative), /Symlink/);
    } finally {
      tmp.cleanup();
    }
  });
});
