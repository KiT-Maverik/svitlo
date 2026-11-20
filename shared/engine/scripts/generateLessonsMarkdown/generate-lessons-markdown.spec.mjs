import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { discoverLessons, generate, loadLesson, parseArguments } from './generate-lessons-markdown.mjs';
import { localizeReviewValue, renderLessonMarkdown, sourceIndex, supportedLanguages } from './lesson-markdown.mjs';
import { renderFlashcardReference } from './flashcard-reference.mjs';

import {
  testingRoot,
  textbook,
  lessonEntry,
  lessonId,
  lessonRelativePath as relative,
  packagePath,
} from '../../testing/fixtures.mjs';

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
    slug: 'fixtureLesson',
    type: 'lesson',
    skills: ['skill-1'],
    params: { languages: ['en', 'uk'], quizRequiredForCompletion: true, sections: { showIndexes: true } },
    locale: { title: t('Engine Test Lesson', 'Тестовий урок Engine') },
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
        params: {
          selection: { mode: 'all', questionIds: ['00000000-0000-4000-8000-000000000001'] },
          layout: { mode: 'stepper' },
        },
        content: [],
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
  const lessonDir = path.join(root, 'content/engine-fixture/data/lessons', relative);
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.writeFileSync(path.join(lessonDir, 'index.ts'), 'export const lesson = {};\n');
  return { root, lessonDir, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

describe('Current Lesson Props → localized Markdown review projection', () => {
  it('renders a selected-language Lesson with independent assessment UUIDs and media metadata', () => {
    const markdown = renderLessonMarkdown({
      lesson: fixture('uk'),
      locale: 'uk',
      languages: ['en', 'uk'],
      packagePath: 'content/engine-fixture',
    });
    assert.match(markdown, /^# Тестовий урок Engine/m);
    assert.match(markdown, /## Lesson/);
    const theoryIndex = markdown.indexOf('Теорія');
    assert.ok(theoryIndex >= 0 && markdown.indexOf('Тест', theoryIndex) > theoryIndex);
    assert.match(markdown, /Світло/);
    assert.match(markdown, /Quiz references independently published Question UUIDs/);
    assert.match(markdown, /00000000-0000-4000-8000-000000000001/);
    assert.match(markdown, /## Assessment resources/);
    assert.doesNotMatch(markdown, /## Question Bank|## Flashcard Bank/);
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
      'повітря',
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
        packagePath: 'content/engine-fixture',
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
          packagePath: 'content/engine-fixture',
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
          packagePath: 'content/engine-fixture',
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
          packagePath: 'content/engine-fixture',
        }),
      /missing params/,
    );
  });

  it('validates CLI arguments and canonical UUID identity', () => {
    assert.deepEqual(
      parseArguments(['--package', 'content/engine-fixture', '--lesson', lessonId, '--locale', 'uk', '--stdout']),
      { package: 'content/engine-fixture', lesson: lessonId, locale: 'uk', stdout: true },
    );
    assert.throws(
      () => parseArguments(['--package', 'content/../etc', '--lesson', lessonId, '--locale', 'uk', '--stdout']),
      /Invalid --package/,
    );
    assert.throws(
      () =>
        parseArguments([
          '--package',
          'content/engine-fixture',
          '--lesson',
          'c/' + lessonId,
          '--locale',
          'uk',
          '--stdout',
        ]),
      /canonical UUID/,
    );
  });

  it('discovers canonical index.ts entries and generates reproducible review documents', async () => {
    const tmp = temporaryRepo();
    try {
      assert.deepEqual(
        discoverLessons(path.join(tmp.root, 'content/engine-fixture')).map(x => x.id),
        [lessonId],
      );
      assert.equal(
        discoverLessons(path.join(tmp.root, 'content/engine-fixture'))[0].entry,
        path.join(tmp.lessonDir, 'index.ts'),
      );
      assert.deepEqual(supportedLanguages(tmp.root), ['en', 'uk']);
      const options = { package: 'content/engine-fixture', lesson: lessonId, locale: 'uk', stdout: true };
      // Load the real configurator once and reuse it to isolate discovery and output handling.
      const real = await loadLesson(lessonEntry, textbook);
      const loader = async () => real;
      const result = await generate(options, { root: tmp.root, loader });
      assert.match(result, /Тестовий урок Engine/);
      assert.equal(result, await generate(options, { root: tmp.root, loader }));
      assert.equal(await generate({ ...options, stdout: false, output: 'out' }, { root: tmp.root, loader }), 1);
      assert.equal(fs.readFileSync(path.join(tmp.root, 'out/engine-fixture', relative, 'uk.md'), 'utf8'), result);
      assert.match(fs.readFileSync(path.join(tmp.lessonDir, 'index.ts'), 'utf8'), /export const lesson/);
      assert.throws(() => sourceIndex(tmp.root, '../tmp'), /Invalid/);
    } finally {
      tmp.cleanup();
    }
  });

  it('renders the Engine-owned Lesson fixture with independent assessment references', async () => {
    const root = testingRoot;
    const lesson = await loadLesson(lessonEntry, textbook);
    assert.equal(lesson.id, lessonId);
    const markdown = await generate(
      {
        package: packagePath,
        lesson: lessonId,
        locale: 'uk',
        stdout: true,
      },
      { root },
    );
    assert.match(markdown, /## Assessment resources/);
    assert.doesNotMatch(markdown, /## Question Bank|## Flashcard Bank/);
    assert.match(markdown, /Quiz references independently published Question UUIDs/);
    assert.match(markdown, /Тестовий урок Engine/);
    assert.doesNotMatch(markdown, /\[object Object\]|undefined/);
  });

  it('rejects symlinked canonical source directories', () => {
    const tmp = temporaryRepo();
    try {
      fs.symlinkSync(tmp.lessonDir, path.join(tmp.lessonDir, 'self'));
      assert.throws(() => sourceIndex(tmp.root, 'content/engine-fixture/data/lessons/' + relative), /Symlink/);
    } finally {
      tmp.cleanup();
    }
  });
});

it('requires an exact Lesson UUID for read-only language inventory', () => {
  const args = parseArguments(['--package', 'content/engine-fixture', '--lesson', lessonId, '--list-locales']);
  assert.equal(args.listLocales, true);
  assert.throws(() => parseArguments(['--package', 'content/engine-fixture', '--list-locales']), /Usage/);
  assert.throws(
    () =>
      parseArguments(['--package', 'content/engine-fixture', '--lesson', lessonId, '--locale', 'it', '--list-locales']),
    /Usage/,
  );
});

describe('Opt-in flashcard reference (independent of the existing review consumer)', () => {
  const sha = 'a'.repeat(40);
  const imgId = '10101010-1010-4010-8010-101010101010';
  const audioId = '20202020-2020-4020-8020-202020202020';
  const videoId = '30303030-3030-4030-8030-303030303030';
  const unusedId = '40404040-4040-4040-8040-404040404040';

  it('recognizes explicit CLI mode and refuses ambiguous or non-lesson invocations', () => {
    assert.equal(
      parseArguments([
        '--package',
        packagePath,
        '--lesson',
        lessonId,
        '--locale',
        'uk',
        '--purpose',
        'flashcards',
        '--stdout',
      ]).purpose,
      'flashcards',
    );
    assert.throws(
      () => parseArguments(['--package', packagePath, '--locale', 'uk', '--purpose', 'flashcards', '--output', 'out']),
      /requires exactly one --lesson/,
    );
    assert.throws(
      () =>
        parseArguments(['--package', packagePath, '--lesson', lessonId, '--list-locales', '--purpose', 'flashcards']),
      /Usage|requires exactly one/,
    );
    assert.throws(
      () =>
        parseArguments([
          '--package',
          packagePath,
          '--lesson',
          lessonId,
          '--locale',
          'uk',
          '--stdout',
          '--purpose',
          'unknown',
        ]),
      /requires exactly one/,
    );
  });

  it('keeps regular Markdown unchanged while opt-in mode includes Quiz and Flashcard Section details', () => {
    const lesson = fixture('uk');
    lesson.section[1].content = [
      {
        id: 'quiz-intro',
        slug: 'quizIntro',
        type: 'text',
        params: {},
        locale: { value: 'Read before the quiz.' },
      },
    ];
    lesson.section.push({
      id: 'cards-id',
      slug: 'flashcards',
      type: 'flashcards',
      params: {
        selection: { flashcardIds: ['00000000-0000-4000-8000-000000000002'] },
      },
      locale: { title: 'Flashcards', navigationLabel: 'Cards' },
      content: [],
    });
    const args = { lesson, locale: 'uk', languages: ['en', 'uk'], packagePath };
    const regular = renderLessonMarkdown(args);
    const specialized = renderLessonMarkdown({ ...args, purpose: 'flashcards' });
    assert.doesNotMatch(regular, /Read before the quiz/);
    assert.match(specialized, /Read before the quiz/);
    assert.match(specialized, /Selected independent Flashcard UUIDs/);
    assert.match(specialized, /00000000-0000-4000-8000-000000000002/);
    assert.match(regular, /Quiz references independently published Question UUIDs/);
  });

  it('indexes only referenced media UUIDs, authored contexts and direct source documents', () => {
    const tmp = temporaryRepo();
    try {
      const createAsset = (type, fileName) => {
        const file = path.join(tmp.root, 'content/engine-fixture/assets', type, fileName);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, 'fixture binary');
      };
      createAsset('audio', audioId + '.ogg');
      createAsset('images', imgId + '.png');
      createAsset('audio', unusedId + '.mp3');
      fs.writeFileSync(path.join(tmp.lessonDir, 'methodology.md'), 'Target: identify the role of an audio example.\n');
      const authoredBlock = path.join(tmp.lessonDir, 'sections/theory/narration');
      fs.mkdirSync(authoredBlock, { recursive: true });
      fs.writeFileSync(path.join(authoredBlock, 'index.ts'), "export const narration = { id: 'audio-id' };\n");
      fs.writeFileSync(
        path.join(authoredBlock, 'specification.md'),
        'A narrated demonstration of light. Human-authored production note.\n',
      );
      const lesson = fixture('uk');
      const audio = lesson.section[0].content.find(block => block.type === 'audio');
      audio.locale.fileLocation = audioId + '.ogg';
      audio.locale.description = 'Explains light travelling through air.';
      const image = lesson.section[0].content.find(block => block.type === 'image');
      image.locale.src = imgId + '.png';
      const video = lesson.section[0].content.find(block => block.type === 'video');
      video.locale.fileLocation = videoId + '.mp4';
      const carousel = lesson.section[0].content.find(block => block.type === 'carousel');
      carousel.locale.slides = [
        {
          id: 'carousel-image-id',
          slug: 'recallPicture',
          type: 'image',
          params: {},
          locale: { src: imgId + '.png', alt: 'Repeated physical image in another role' },
        },
      ];
      const subtitles = {
        id: 'subtitle-block',
        slug: 'captions',
        type: 'subtitles',
        params: {},
        locale: { fileLocation: 'https://example.org/captions.vtt' },
      };
      const checkpoint = lesson.section[0].content.find(block => block.type === 'checkpoint');
      const item = checkpoint.content[0];
      Object.assign(item, { type: 'checkpointItem', id: 'checkpoint-item-id', slug: 'checkpointItem' });
      item.answer.push({
        id: 'checkpoint-audio-id',
        slug: 'listenAgain',
        type: 'audio',
        params: {},
        locale: { fileLocation: audioId + '.ogg', title: 'Listen and recall' },
      });
      lesson.section[0].content.push(subtitles);
      const sources = sourceIndex(tmp.root, path.relative(tmp.root, tmp.lessonDir));
      const props = {
        lesson,
        locale: 'uk',
        packagePath,
        root: tmp.root,
        lessonDirectory: tmp.lessonDir,
        sourceRef: sha,
        sourceBranch: 'tooling/lesson-markdown-flashcard-reference',
        sourceFiles: sources,
        verifyAtSha: relative => relative.endsWith(audioId + '.ogg') || relative.endsWith(imgId + '.png'),
      };
      const output = renderFlashcardReference(props);
      assert.equal(output, renderFlashcardReference(props), 'Source-pinned output must be deterministic');
      assert.match(output, /Target: identify the role of an audio example/);
      assert.match(output, /A narrated demonstration of light/);
      assert.match(output, /Explains light travelling through air/);
      assert.match(output, /20202020-2020-4020-8020-202020202020/);
      assert.match(output, /10101010-1010-4010-8010-101010101010/);
      assert.match(output, /Referenced file missing/);
      assert.match(output, /File on disk and present at source SHA/);
      assert.match(output, new RegExp('blob/' + sha + '/content/engine-fixture/assets/audio/' + audioId));
      assert.match(output, /30303030-3030-4030-8030-303030303030/);
      assert.match(output, /Section:.*theory/);
      assert.match(output, /Owning block:.*narration/);
      assert.match(output, /Previous instructional context/);
      assert.match(output, /carousel-image-id/);
      assert.match(output, /checkpoint \/ checkpointItem \/ listenAgain/);
      assert.match(output, /checkpoint-audio-id/);
      assert.match(output, /External authored URL/);
      assert.match(output, /https:\/\/example.org\/captions\.vtt/);
      assert.match(output, new RegExp('blob/' + sha));
      assert.doesNotMatch(output, new RegExp(unusedId));
      assert.match(output, /Active-recall stimulus: candidate only/);
      assert.match(output, /cannot be inferred|not inferred/);
      assert.equal(fs.existsSync(path.join(tmp.lessonDir, 'flashcards.md')), false);
    } finally {
      tmp.cleanup();
    }
  });

  it('fails closed on invalid SHA, symlinked referenced media and oversized metadata', () => {
    const tmp = temporaryRepo();
    try {
      const lesson = fixture('uk');
      const img = lesson.section[0].content.find(block => block.type === 'image');
      img.locale.src = imgId + '.png';
      const src = sourceIndex(tmp.root, path.relative(tmp.root, tmp.lessonDir));
      const args = {
        lesson,
        locale: 'uk',
        packagePath,
        root: tmp.root,
        lessonDirectory: tmp.lessonDir,
        sourceFiles: src,
        sourceRef: sha,
      };
      assert.throws(() => renderFlashcardReference({ ...args, sourceRef: 'main' }), /exact Git source SHA/);
      const asset = path.join(tmp.root, 'content/engine-fixture/assets/images', imgId + '.png');
      fs.mkdirSync(path.dirname(asset), { recursive: true });
      fs.symlinkSync(path.join(tmp.lessonDir, 'index.ts'), asset);
      assert.throws(() => renderFlashcardReference(args), /Symlinked referenced media/);
      fs.unlinkSync(asset);
      fs.writeFileSync(path.join(tmp.lessonDir, 'methodology.md'), 'x'.repeat(65537));
      assert.throws(() => renderFlashcardReference(args), /Oversized Lesson reference document/);
    } finally {
      tmp.cleanup();
    }
  });

  it('refuses unverified source revisions for the opt-in document without writing output', async () => {
    const tmp = temporaryRepo();
    try {
      const opts = { package: packagePath, lesson: lessonId, locale: 'uk', stdout: true, purpose: 'flashcards' };
      const lesson = await loadLesson(lessonEntry, textbook);
      await assert.rejects(generate(opts, { root: tmp.root, loader: async () => lesson }), /actual Git revision SHA/);
    } finally {
      tmp.cleanup();
    }
  });
});
