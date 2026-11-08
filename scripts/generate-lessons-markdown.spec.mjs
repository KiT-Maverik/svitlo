import assert from 'node:assert/strict';

import fs from 'node:fs';

import os from 'node:os';

import path from 'node:path';

import { describe, it } from 'node:test';

import { discoverLessons, generate, loadLesson, parseArguments } from './generate-lessons-markdown.mjs';

import { localizeReviewValue, renderLessonMarkdown, sourceIndex, supportedLanguages } from './lib/lesson-markdown.mjs';

function fixture() {
  const localized = (en, uk) => ({ en, uk });
  const text = (id, en, uk) => ({ id, slug: id, type: 'text', value: localized(en, uk) });
  const q = {
    id: 'q-1',
    slug: 'why-light',
    type: 'selectOneAnswer',
    question: [text('prompt', 'Which path?', 'Який шлях?')],
    answers: {
      correct: { straight: text('correct', 'Straight line', 'Пряма лінія') },
      incorrect: { curved: text('incorrect', 'Curved line', 'Крива лінія') },
      distractors: {},
    },
    explanation: [text('explanation', 'Because light propagates.', 'Тому що світло поширюється.')],
  };
  return {
    id: 'd3048d21-8690-5255-b62c-984c69ac272c',
    slug: 'howLightMoves',
    title: localized('How Light Moves', 'Як рухається світло'),
    skills: ['skill-1'],
    parameters: { requireQuiz: true, languages: ['en', 'uk'], sections: { showIndexes: true } },
    sections: [
      {
        id: 'theory-id',
        slug: 'theory',
        type: 'theory',
        title: localized('Theory', 'Теорія'),
        navigationLabel: localized('Theory', 'Теорія'),
        content: [
          {
            id: 'md-id',
            slug: 'intro',
            type: 'markdown',
            locales: localized('**Light** travels.', '**Світло** рухається.'),
          },
          text('basic', 'Light is visible.', 'Світло видиме.'),
          {
            id: 'image-id',
            slug: 'beam',
            type: 'image',
            src: '/images/beam.png',
            alt: localized('A ray', 'Промінь'),
            caption: localized('Ray caption', 'Підпис променя'),
            width: 320,
            height: 240,
            fallback: { unavailable: localized('Image unavailable', 'Зображення недоступне') },
          },
          {
            id: 'video-id',
            slug: 'film',
            type: 'video',
            fileLocation: '/video/beam.mp4',
            poster: '/poster/beam.png',
            title: localized('Demonstration', 'Демонстрація'),
            fallback: { playbackError: localized('Playback failed', 'Помилка відтворення') },
          },
          {
            id: 'youtube-id',
            slug: 'external',
            type: 'youtube',
            href: 'https://www.youtube.com/watch?v=example',
            mode: 'embed',
            hint: localized('Watch refraction', 'Подивіться заломлення'),
          },
          {
            id: 'audio-id',
            slug: 'narration',
            type: 'audio',
            fileLocation: '/narration.ogg',
            title: localized('Narration', 'Озвучення'),
            description: localized('A description', 'Опис'),
          },
          {
            id: 'carousel-id',
            slug: 'slides',
            type: 'carousel',
            title: localized('Gallery', 'Галерея'),
            transition: 'fade',
            slides: [
              {
                src: '/slides/one.png',
                alt: localized('First beam', 'Перший промінь'),
                caption: localized('Slide caption', 'Підпис слайда'),
              },
            ],
          },
          {
            id: 'scene-id',
            slug: 'simulation',
            type: 'scene',
            locales: { controls: { reset: localized('Reset', 'Скинути') } },
          },
          {
            id: 'code-id',
            slug: 'algorithm',
            type: 'code',
            language: 'python',
            code: 'print("ray")',
            title: localized('Code', 'Код'),
            variables: [{ id: 'medium', value: localized('air', 'повітря') }],
          },
          {
            id: 'check-id',
            slug: 'checkpoint',
            type: 'checkpoint',
            title: localized('Check', 'Перевірка'),
            items: [{ question: localized('Where?', 'Де?'), answer: [text('answer', 'Here', 'Тут')] }],
          },
        ],
      },
      {
        id: 'quiz-id',
        slug: 'quiz',
        type: 'quiz',
        title: localized('Quiz', 'Тест'),
        navigationLabel: localized('Quiz', 'Тест'),
        parameters: {
          selection: { mode: 'all', questionSlugs: ['why-light'] },
          layout: { mode: 'stepper', showProgress: true },
          feedbackMode: 'immediate',
          screen: { starting: { showDefaultContent: true } },
        },
      },
    ],
    questions: {
      selectOneAnswer: { 'why-light': q },
      matchBlocks: {
        'match-beams': {
          id: 'q-2',
          slug: 'match-beams',
          type: 'matchBlocks',
          question: [text('match-prompt', 'Match rays', 'Зіставте промені')],
          pairs: { leftRight: { left: text('pair-left', 'A', 'А'), right: text('pair-right', 'B', 'Б') } },
        },
      },
      fillBlanksWithText: {
        'fill-light': {
          id: 'q-3',
          slug: 'fill-light',
          type: 'fillBlanksWithText',
          question: [text('fill-prompt', 'Fill the term', 'Вставте термін')],
          placeholder: localized('type', 'введіть'),
          slots: [{ selector: '{{answer}}', correctAnswers: [localized('light', 'світло')] }],
        },
      },
    },
    flashcards: [
      {
        id: 'flash-1',
        isDefault: true,
        front: [text('front', 'What travels?', 'Що поширюється?')],
        back: [text('back', 'Light', 'Світло')],
        hint: [],
        tags: ['physics'],
        flags: [
          { type: 'list', count: 2 },
          { type: 'custom', value: localized('Review', 'Повторення'), color: 'info', icon: 'bookmark' },
        ],
        relationships: [{ relationshipId: 'r-1', type: 'reverse', relatedFlashcardId: 'flash-2', position: 'peer' }],
      },
    ],
  };
}

function temporaryRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-md-'));
  const languageFile = path.join(root, 'shared/contracts/src/types/languages.ts');
  fs.mkdirSync(path.dirname(languageFile), { recursive: true });
  fs.writeFileSync(
    languageFile,
    "export const DEFAULT_SUPPORTED_LANGUAGES = [{ language: 'en' }, { language: 'uk' }] as const;\n",
  );
  const lessonDir = path.join(root, 'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c');
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.writeFileSync(
    path.join(lessonDir, 'howLightMoves.data.ts'),
    "export const howLightMoves = { id: 'd3048d21-8690-5255-b62c-984c69ac272c' };\n",
  );
  return { root, lessonDir, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

function testSuite() {
  describe('Current typed Lesson → locale-specific Markdown review projection', () => {
    it('emits a single contextual document with all banks, current Quiz Section and media metadata', () => {
      const lesson = fixture();
      const markdown = renderLessonMarkdown({
        lesson,
        locale: 'uk',
        languages: ['en', 'uk'],
        packagePath: 'content/playground',
      });
      assert.match(markdown, /^# Як рухається світло/m);
      assert.match(markdown, /## Lesson/);
      assert.match(markdown, /Теорія/);
      assert.match(markdown, /\*\*Світло\*\* рухається\./);
      assert.ok(markdown.indexOf('Теорія') < markdown.indexOf('Тест'));
      assert.match(markdown, /Quiz uses references into the Question Bank/);
      assert.match(markdown, /why-light/);
      assert.equal((markdown.match(/### 1\. why-light · selectOneAnswer/g) ?? []).length, 1);
      assert.match(markdown, /## Question Bank/);
      assert.match(markdown, /## Flashcard Bank/);
      assert.match(markdown, /Скинути/);
      assert.doesNotMatch(markdown, /rendererKey/);
      assert.match(markdown, /Промінь/);
      assert.match(markdown, /Підпис променя/);
      assert.match(markdown, /Зображення недоступне/);
      assert.match(markdown, /Помилка відтворення/);
      assert.match(markdown, /poster/);
      assert.match(markdown, /Watch refraction|Подивіться заломлення/);
      assert.match(markdown, /Озвучення/);
      assert.match(markdown, /Перший промінь/);
      assert.match(markdown, /Підпис слайда/);
      assert.match(markdown, /Зіставте промені/);
      assert.match(markdown, /Вставте термін/);
      assert.match(markdown, /повітря/);
      assert.match(markdown, /relationshipId/);
      assert.match(markdown, /physics/);
      assert.match(markdown, /Повторення/);
      assert.match(markdown, /bookmark/);
      assert.doesNotMatch(markdown, /Review/);
      assert.doesNotMatch(markdown, /Ray caption|Image unavailable|Playback failed|Straight line|First beam/);
      assert.doesNotMatch(markdown, /undefined|\[object Object\]/);
      assert.equal(
        markdown,
        renderLessonMarkdown({ lesson, locale: 'uk', languages: ['en', 'uk'], packagePath: 'content/playground' }),
      );
    });
    it('requires complete localized dictionaries without language fallback or silent substitutions', () => {
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
      assert.deepEqual(
        localizeReviewValue({ fallback: { unavailable: { en: 'Offline', uk: 'Недоступно' } } }, 'uk', ['en', 'uk'])
          .value,
        { fallback: { unavailable: 'Недоступно' } },
      );
      const lesson = fixture();
      delete lesson.title.uk;
      assert.throws(
        () =>
          renderLessonMarkdown({ lesson, locale: 'en', languages: ['en', 'uk'], packagePath: 'content/playground' }),
        /Incomplete locale dictionary/,
      );
    });
    it('rejects unknown block types and malformed Quiz Sections', () => {
      const lesson = fixture();
      lesson.sections[0].content.push({ type: 'unsupported', id: 'x', slug: 'x' });
      assert.throws(
        () =>
          renderLessonMarkdown({ lesson, locale: 'uk', languages: ['en', 'uk'], packagePath: 'content/playground' }),
        /Unsupported content block type/,
      );
      const broken = fixture();
      delete broken.sections[1].parameters;
      assert.throws(
        () =>
          renderLessonMarkdown({
            lesson: broken,
            locale: 'uk',
            languages: ['en', 'uk'],
            packagePath: 'content/playground',
          }),
        /missing parameters/,
      );
    });
    it('validates CLI arguments and UUID identity', () => {
      const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
      assert.deepEqual(
        parseArguments(['--package', 'content/playground', '--lesson', id, '--locale', 'uk', '--stdout']),
        { package: 'content/playground', lesson: id, locale: 'uk', stdout: true },
      );
      assert.throws(
        () => parseArguments(['--package', 'content/../etc', '--lesson', id, '--locale', 'uk', '--stdout']),
        /Invalid --package/,
      );
      assert.throws(
        () => parseArguments(['--package', 'content/playground', '--lesson', 'c/' + id, '--locale', 'uk', '--stdout']),
        /canonical UUID/,
      );
    });
    it('discovers and generates reproducible documents without altering canonical source', async () => {
      const tmp = temporaryRepo();
      try {
        assert.deepEqual(
          discoverLessons(path.join(tmp.root, 'content/playground')).map(x => x.id),
          ['d3048d21-8690-5255-b62c-984c69ac272c'],
        );
        assert.deepEqual(supportedLanguages(tmp.root), ['en', 'uk']);
        const options = {
          package: 'content/playground',
          lesson: 'd3048d21-8690-5255-b62c-984c69ac272c',
          locale: 'uk',
          stdout: true,
        };
        const loader = async () => fixture();
        const result = await generate(options, { root: tmp.root, loader });
        assert.match(result, /Як рухається світло/);
        assert.equal(result, await generate(options, { root: tmp.root, loader }));
        assert.equal(await generate({ ...options, stdout: false, output: 'out' }, { root: tmp.root, loader }), 1);
        assert.equal(
          fs.readFileSync(path.join(tmp.root, 'out/playground/c/d3048d21-8690-5255-b62c-984c69ac272c/uk.md'), 'utf8'),
          result,
        );
        assert.match(
          fs.readFileSync(path.join(tmp.lessonDir, 'howLightMoves.data.ts'), 'utf8'),
          /export const howLightMoves/,
        );
        assert.throws(() => sourceIndex(tmp.root, '../tmp'), /Invalid/);
      } finally {
        tmp.cleanup();
      }
    });
    it('renders the real Playground Lesson creator with current Question and Flashcard contracts', async () => {
      const root = path.resolve('.');
      const packageDirectory = path.join(root, 'content/playground');
      const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
      const directory = path.join(packageDirectory, 'data/lessons/c', lessonId);
      const source = path.join(directory, 'howLightMoves.data.ts');
      const actual = await loadLesson(source, packageDirectory);
      assert.equal(actual.id, lessonId);
      const markdown = await generate(
        { package: 'content/playground', lesson: lessonId, locale: 'uk', stdout: true },
        { root },
      );
      assert.match(markdown, /## Question Bank/);
      assert.match(markdown, /## Flashcard Bank/);
      assert.match(markdown, /Quiz uses references/);
      assert.match(markdown, /Як рухається світло/);
      assert.doesNotMatch(markdown, /\\[object Object\\]|undefined/);
    });

    it('rejects symlinked canonical sources', () => {
      const tmp = temporaryRepo();
      try {
        fs.symlinkSync(tmp.lessonDir, path.join(tmp.lessonDir, 'self'));
        assert.throws(
          () => sourceIndex(tmp.root, 'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c'),
          /Symlink/,
        );
      } finally {
        tmp.cleanup();
      }
    });
  });
}

testSuite();
