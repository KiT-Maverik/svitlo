import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { discoverLessons, generate, parseArguments } from './generate-lessons-markdown.mjs';
import {
  inferBlockType,
  localizeReviewValue,
  renderLessonMarkdown,
  sourceIndex,
  supportedLanguages,
} from './lib/lesson-markdown.mjs';

const T = (en, uk) => (uk === undefined ? { fallback: 'en', en } : { en, uk });
const text = (id, en, uk) => ({ type: 'text', id, slug: id, value: T(en, uk) });
const fixture = () => ({
  id: 'd3048d21-8690-5255-b62c-984c69ac272c',
  slug: 'light',
  title: T('Light', 'Світло'),
  parameters: { languages: ['en', 'uk'] },
  sections: [
    {
      id: 'section-theory',
      slug: 'theory',
      type: 'theory',
      title: T('Theory', 'Теорія'),
      navigationLabel: T('Theory', 'Теорія'),
      content: [
        { type: 'markdown', id: 'md-1', slug: 'intro', locales: T('**Light** travels.', '**Світло** рухається.') },
        {
          type: 'checkpoint',
          id: 'check-1',
          slug: 'check',
          title: T('Check', 'Перевірка'),
          items: [{ question: T('Where?', 'Де?'), answer: [text('nested-1', 'Here', 'Тут')] }],
        },
        {
          type: 'scene',
          id: 'scene-1',
          slug: 'lamp',
          locales: { header: { title: T('Lamp', 'Лампа') }, buttons: { reset: T('Reset') } },
        },
      ],
    },
    {
      id: 'section-quiz',
      slug: 'quiz',
      type: 'quiz',
      title: T('Quiz', 'Тест'),
      navigationLabel: T('Quiz', 'Тест'),
      content: [
        {
          type: 'quiz',
          id: 'quiz-1',
          slug: 'quiz',
          welcome: T('Welcome', 'Вітаємо'),
          questions: {
            q1: {
              id: 'q1-id',
              slug: 'q1',
              type: 'selectOneAnswer',
              question: [text('prompt-1', 'Which?', 'Який?')],
              answers: {
                correct: { a: text('answer-1', 'Correct', 'Правильно') },
                incorrect: { b: text('answer-2', 'Wrong', 'Неправильно') },
              },
              explanation: [text('explain-1', 'Explanation', 'Пояснення')],
            },
          },
        },
      ],
    },
  ],
  flashcards: [
    {
      id: 'card-1',
      front: [text('front-1', 'Front', 'Перед')],
      back: [text('back-1', 'Back', 'Назад')],
      hint: [],
      tags: ['light'],
      flags: [],
    },
  ],
  questions: { selectOneAnswer: { q1: { id: 'q1-id', slug: 'q1' } } },
});

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
    path.join(lessonDir, 'light.data.ts'),
    "export const light = { id: 'd3048d21-8690-5255-b62c-984c69ac272c' };\n",
  );
  return { root, lessonDir, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}

describe('Lesson → Markdown review projection', () => {
  it('generates localized Markdown with ordered sections, blocks, questions, nested answers, scenes, and flashcards', () => {
    const lesson = fixture();
    const en = renderLessonMarkdown({
      lesson,
      locale: 'en',
      languages: ['en', 'uk'],
      packagePath: 'content/playground',
    });
    const uk = renderLessonMarkdown({
      lesson,
      locale: 'uk',
      languages: ['en', 'uk'],
      packagePath: 'content/playground',
    });
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
    assert.equal(
      (uk.match(/Question 1: q1/g) ?? []).length,
      1,
      'quiz and question catalog should not duplicate a question',
    );
    assert.match(
      uk,
      /blob\/new-lesson\/content\/playground\/data\/lessons\/c\/d3048d21-8690-5255-b62c-984c69ac272c\/light.data.ts/,
    );
    assert.equal(
      renderLessonMarkdown({ lesson, locale: 'uk', languages: ['en', 'uk'], packagePath: 'content/playground' }),
      uk,
    );
    assert.doesNotMatch(uk, /undefined|object Object|Date\(/);
  });

  it('requires explicit fallback and rejects invalid locale data', () => {
    assert.throws(() => localizeReviewValue({ t: { en: 'English' } }, 'uk', ['en', 'uk']), /Missing uk locale at \/t/);
    assert.throws(
      () => localizeReviewValue({ t: { fallback: 'fr', en: 'English' } }, 'uk', ['en', 'uk']),
      /Invalid fallback/,
    );
    assert.throws(() => localizeReviewValue({ t: { uk: '' } }, 'uk', ['en', 'uk']), /Invalid locale dictionary/);
    assert.deepEqual(
      localizeReviewValue({ t: { language: 'en', value: 'Only English' } }, 'uk', ['en', 'uk']).sources,
      { '/t': { code: 'en', isFallback: true } },
    );
  });

  it('fails on missing required lesson data, unknown blocks, malformed quiz answers', () => {
    const missing = fixture();
    delete missing.sections[0].content[0].locales.uk;
    assert.throws(
      () =>
        renderLessonMarkdown({
          lesson: missing,
          locale: 'uk',
          languages: ['en', 'uk'],
          packagePath: 'content/playground',
        }),
      /Missing uk locale/,
    );
    const bad = fixture();
    bad.sections[0].content[1].items[0].answer = [];
    assert.throws(
      () =>
        renderLessonMarkdown({
          lesson: bad,
          locale: 'uk',
          languages: ['en', 'uk'],
          packagePath: 'content/playground',
        }),
      /Invalid checkpoint answer/,
    );
    const unknown = fixture();
    unknown.sections[0].content.push({ type: 'what', id: 'mystery', slug: 'mystery' });
    assert.throws(
      () =>
        renderLessonMarkdown({
          lesson: unknown,
          locale: 'uk',
          languages: ['en', 'uk'],
          packagePath: 'content/playground',
        }),
      /Unsupported content block type/,
    );
  });

  it('validates paths and stdout cardinality', () => {
    assert.deepEqual(
      parseArguments([
        '--package',
        'content/playground',
        '--lesson',
        'd3048d21-8690-5255-b62c-984c69ac272c',
        '--locale',
        'uk',
        '--stdout',
      ]),
      {
        package: 'content/playground',
        lesson: 'd3048d21-8690-5255-b62c-984c69ac272c',
        locale: 'uk',
        stdout: true,
      },
    );
    assert.throws(
      () =>
        parseArguments([
          '--package',
          'content/../secrets',
          '--lesson',
          'd3048d21-8690-5255-b62c-984c69ac272c',
          '--locale',
          'uk',
          '--stdout',
        ]),
      /Invalid --package/,
    );
    assert.throws(
      () =>
        parseArguments([
          '--package',
          'content/playground',
          '--lesson',
          '../secrets',
          '--locale',
          'uk',
          '--stdout',
        ]),
      /canonical UUID/,
    );
    assert.throws(
      () => parseArguments(['--package', 'content/playground', '--locale', 'uk', '--stdout']),
      /requires --lesson/,
    );
  });

  it('discovers UUID buckets, writes the requested structure, and generates deterministically', async () => {
    const tmp = temporaryRepo();
    try {
      const root = path.join(tmp.root, 'content/playground');
      fs.mkdirSync(path.join(root, 'data/lessons/not-a-number/ignored'), { recursive: true });
      assert.deepEqual(
        discoverLessons(root).map(item => item.relative),
        ['c/d3048d21-8690-5255-b62c-984c69ac272c'],
      );
      assert.deepEqual(supportedLanguages(tmp.root), ['en', 'uk']);
      const opts = {
        package: 'content/playground',
        lesson: 'd3048d21-8690-5255-b62c-984c69ac272c',
        locale: 'uk',
        stdout: true,
      };
      const loader = async () => fixture();
      const first = await generate(opts, { root: tmp.root, loader });
      const second = await generate(opts, { root: tmp.root, loader });
      assert.equal(first, second);
      assert.match(first, /Світло/);
      const count = await generate({ ...opts, stdout: false, output: 'out' }, { root: tmp.root, loader });
      assert.equal(count, 1);
      assert.equal(
        fs.readFileSync(path.join(tmp.root, 'out/playground/c/d3048d21-8690-5255-b62c-984c69ac272c/uk.md'), 'utf8'),
        first,
      );
      assert.equal(
        fs.readFileSync(path.join(tmp.lessonDir, 'light.data.ts'), 'utf8'),
        "export const light = { id: 'd3048d21-8690-5255-b62c-984c69ac272c' };\n",
      );
      await assert.rejects(
        generate({ ...opts, lesson: '00000000-0000-5000-8000-000000000004' }, { root: tmp.root, loader }),
        /No matching canonical lessons/,
      );
    } finally {
      tmp.cleanup();
    }
  });

  it('uses the explicit discriminant for nested content blocks', () => {
    for (const type of ['image', 'audio', 'video', 'youtube', 'scene', 'text']) {
      assert.equal(inferBlockType({ id: 'x', type }), type);
    }
    assert.throws(() => inferBlockType({ id: 'missing-type', value: T('Hello') }), /type discriminant/);
  });

  it('rejects symlink sources instead of traversing them', () => {
    const tmp = temporaryRepo();
    try {
      fs.symlinkSync(tmp.lessonDir, path.join(tmp.lessonDir, 'linked'));
      assert.throws(
        () => sourceIndex(tmp.root, 'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c'),
        /Symlink|Invalid/,
      );
      assert.throws(
        () =>
          sourceIndex(tmp.root, 'content/playground/data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/../light'),
        /Invalid/,
      );
    } finally {
      tmp.cleanup();
    }
  });
});
