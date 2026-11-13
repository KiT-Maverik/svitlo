import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';

import { BuilderDiagnostic, loadFactoryRegistry, renderLessonDraft, runOne, main } from './lessonBuilder.mjs';

const lessonId = '00000000-0000-4000-8000-00000000000c';
const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const textBlock = (slug, value = 'Текст') => ({
  id: id(1),
  slug,
  type: 'text',
  params: { disabled: false },
  locale: { value: { uk: value, en: 'English value not to emit' } },
});
const group = items => ({ items, order: Object.keys(items) });

function makeLesson() {
  const slide = {
    id: id(2), slug: 'slide', type: 'carouselSlide',
    locale: { src: { uk: 'img/uk.png', en: 'img/en.png' }, alt: { uk: 'Опис', en: 'Description' } },
  };
  const item = {
    id: id(3), slug: 'task', type: 'checkpointItem',
    question: textBlock('question', 'Запитання'),
    answer: group({ answer: textBlock('answer', 'Відповідь') }),
  };
  return {
    documentLanguage: 'uk',
    id: lessonId,
    slug: 'lightLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages: ['uk', 'en'],
      requireQuiz: false,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: { uk: 'Світло', en: 'Light' } },
    section: group({
      intro: {
        id: id(4), slug: 'intro', type: 'content',
        params: { skippable: false },
        locale: { title: { uk: 'Вступ', en: 'Intro' } },
        content: group({
          body: textBlock('body'),
          gallery: {
            id: id(5), slug: 'gallery', type: 'carousel',
            slides: group({ first: slide }),
          },
          check: {
            id: id(6), slug: 'check', type: 'checkpoint',
            content: group({ task: item }),
          },
        }),
      },
      quiz: {
        id: id(7), slug: 'quiz', type: 'quiz',
        params: { selection: { mode: 'all' } },
        content: group({ prompt: textBlock('prompt') }),
      },
    }),
  };
}

function makeQuestions() {
  const selectOne = {
    id: id(8), slug: 'one', type: 'selectOneAnswer',
    params: { disabled: false },
    content: {
      question: group({ prompt: textBlock('prompt') }),
      answers: {
        correct: group({ yes: textBlock('yes') }),
        incorrect: group({ no: textBlock('no') }),
        distractors: group({}),
      },
    },
  };
  const match = {
    id: id(9), slug: 'match', type: 'matchBlocks',
    content: {
      question: group({ prompt: textBlock('prompt') }),
      pairs: group({
        pair: { left: textBlock('left'), right: textBlock('right') },
      }),
    },
  };
  const blanks = {
    id: id(10), slug: 'blanks', type: 'fillBlanksWithBlocks',
    content: {
      question: group({ prompt: textBlock('prompt') }),
      slots: group({ gap: { correctAnswer: textBlock('correctAnswer') } }),
      distractors: group({}),
    },
  };
  return { documentLanguage: 'uk', questions: {
    selectOneAnswer: { one: selectOne },
    matchBlocks: { match },
    fillBlanksWithBlocks: { blanks },
  } };
}

function makeFlashcards() {
  return { documentLanguage: 'uk', flashcards: group({
    first: {
      id: id(11), slug: 'first', type: 'flashcard',
      parameters: {
        tags: ['light'],
        flags: group({ warning: { type: 'warning' } }),
      },
      content: {
        front: group({ front: textBlock('front') }),
        back: group({ back: textBlock('back') }),
        hint: group({ hint: textBlock('hint') }),
      },
    },
  }) };
}

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-scaffolder-'));
  const workspace = path.join(root, 'content/playground');
  const lesson = path.join(workspace, 'data/lessons/c', lessonId);
  fs.mkdirSync(path.join(lesson, 'questions'), { recursive: true });
  fs.mkdirSync(path.join(lesson, 'flashcards'), { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');
  const content = makeLesson();
  const questions = makeQuestions();
  const flashcards = makeFlashcards();
  const save = () => {
    fs.writeFileSync(path.join(lesson, 'lesson.config.yaml'), yaml.stringify({
      ...content, questions: questions.questions, flashcards: flashcards.flashcards,
    }));
    // Specialist-owned editorial files are a different contract and remain
    // untouched by this technical draft scaffolder.
    fs.writeFileSync(path.join(lesson, 'content.yaml'), 'kind: lesson-content-plan\nstatus: draft\n');
    fs.writeFileSync(path.join(lesson, 'questions/questions.yaml'), 'kind: lesson-questions-plan\nstatus: draft\n');
    fs.writeFileSync(path.join(lesson, 'flashcards/flashcards.yaml'), 'kind: lesson-flashcards-plan\nstatus: draft\n');
  };
  const generated = () => path.join(lesson, 'lightLesson.data.ts');
  try {
    save();
    return callback({ root, lesson, content, questions, flashcards, save, generated });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function calls(source) {
  const ast = ts.createSourceFile('lightLesson.data.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(ast.parseDiagnostics, []);
  const found = [];
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) found.push(node.expression.text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return found;
}

test('reads the exhaustive factory registry from the Engine source of truth', () => {
  const factories = loadFactoryRegistry();
  assert.equal(factories.lesson, 'defineLesson');
  assert.equal(factories.content, 'defineContentSection');
  assert.equal(factories.checkpointItem, 'defineCheckpointItem');
  assert.equal(factories.selectOneAnswer, 'defineSelectOneAnswer');
  assert.equal(factories.flashcard, 'defineFlashcard');
});

test('emits named Lesson TS and nested factories, including all Question and Flashcard collections', () =>
  fixture(f => {
    const result = runOne(f.lesson, 'generate', f.root);
    assert.equal(result.changed, 1);
    assert.deepEqual(result.files, ['lightLesson.data.ts']);
    const output = fs.readFileSync(f.generated(), 'utf8');
    assert.match(output, /from '@svitlo\/engine\/build'/);
    assert.match(output, /export const lightLesson_Lesson = defineLesson\(/);
    const names = calls(output);
    for (const name of [
      'defineLesson', 'defineContentSection', 'defineQuizSection',
      'defineText', 'defineCarousel', 'defineCarouselSlide',
      'defineCheckpoint', 'defineCheckpointItem',
      'defineSelectOneAnswer', 'defineMatchBlocks', 'defineFillBlanksWithBlocks',
      'defineFlashcard',
    ]) assert.ok(names.includes(name), 'Missing ' + name);
    assert.equal(names.filter(name => name === 'defineCheckpointItem').length, 1);
    assert.equal(names.filter(name => name === 'defineFlashcard').length, 1);
    assert.ok(names.filter(name => name === 'defineText').length >= 15);
    assert.ok(!names.includes('defineWarning'), 'flags must remain ordinary authored objects');
    assert.match(output, /"order": \[\s*"intro",\s*"quiz"\s*\]/);
    assert.match(output, /"id": "00000000-0000-4000-8000-00000000000c"/);
    assert.match(output, /"slug": "lightLesson"/);
    assert.match(output, /"languages": \[\s*"uk",\s*"en"\s*\]/);
    assert.match(output, /"uk": "Світло"/);
    assert.doesNotMatch(output, /"en": "Light"/);
    assert.doesNotMatch(output, /"en": "English value not to emit"/);
    assert.doesNotMatch(output, /img\/en\.png/);
    assert.doesNotMatch(output, /"documentLanguage"/);
    assert.ok(!fs.existsSync(path.join(f.lesson, 'generated')));
    assert.ok(!fs.existsSync(path.join(f.lesson, 'requirements.json')));
    assert.match(fs.readFileSync(path.join(f.lesson, 'content.yaml'), 'utf8'), /lesson-content-plan/);
  }));

test('preserves partial YAML instead of inventing required fields, locale values or questions', () =>
  fixture(f => {
    delete f.content.params;
    delete f.content.section;
    delete f.content.flashcards;
    fs.rmSync(path.join(f.lesson, 'questions'), { recursive: true });
    fs.rmSync(path.join(f.lesson, 'flashcards'), { recursive: true });
    f.save = () => fs.writeFileSync(path.join(f.lesson, 'lesson.config.yaml'), yaml.stringify(f.content));
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated(), 'utf8');
    assert.deepEqual(calls(code), ['defineLesson']);
    assert.doesNotMatch(code, /"params":/);
    assert.doesNotMatch(code, /"section":/);
    assert.doesNotMatch(code, /"questions":/);
    assert.doesNotMatch(code, /"flashcards":/);
  }));

test('is byte-stable on repeated generation and check is read-only', () =>
  fixture(f => {
    runOne(f.lesson, 'generate', f.root);
    const first = fs.readFileSync(f.generated(), 'utf8');
    assert.equal(runOne(f.lesson, 'generate', f.root).changed, 0);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), first);
    f.content.section.items.intro.locale.title.uk = 'Змінений вступ';
    f.save();
    assert.throws(() => runOne(f.lesson, 'check', f.root), /stale draft/);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), first);
    assert.equal(runOne(f.lesson, 'generate', f.root).changed, 1);
    assert.notEqual(fs.readFileSync(f.generated(), 'utf8'), first);
  }));

test('missing and unknown polymorphic types produce a local dispatch diagnostic', () =>
  fixture(f => {
    delete f.content.section.items.intro.content.items.body.type;
    f.save();
    assert.throws(
      () => runOne(f.lesson, 'generate', f.root),
      error => error instanceof BuilderDiagnostic &&
        /content\.items\.body\.type: missing type discriminator/.test(error.message),
    );
    f.content.section.items.intro.content.items.body.type = 'unknownBlock';
    f.save();
    assert.throws(
      () => runOne(f.lesson, 'generate', f.root),
      /content\.items\.body\.type: unknown type "unknownBlock"/,
    );
    assert.ok(!fs.existsSync(f.generated()));
  }));

test('refuses a non-Lesson root type rather than emitting the wrong factory', () =>
  fixture(f => {
    f.content.type = 'text';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /expected lesson type/);
    assert.ok(!fs.existsSync(f.generated()));
  }));

test('source-localization filtering leaves unrelated type metadata intact', () => {
  const source = renderLessonDraft({
    slug: 'demo',
    type: 'lesson',
    locale: { title: { uk: 'Заголовок', en: 'Title' } },
    params: { languages: ['en', 'uk'], type: 'configValue' },
    flashcards: { items: {}, order: [] },
  }, 'uk', loadFactoryRegistry());
  assert.match(source, /"languages": \[\s*"en",\s*"uk"\s*\]/);
  assert.match(source, /"type": "configValue"/);
  assert.match(source, /"uk": "Заголовок"/);
  assert.doesNotMatch(source, /"en": "Title"/);
});

test('manual data sources and modifications are never overwritten', () =>
  fixture(f => {
    const manual = path.join(f.lesson, 'other.data.ts');
    fs.writeFileSync(manual, 'export const keep = true;\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /competing Lesson data entrypoint/);
    assert.equal(fs.readFileSync(manual, 'utf8'), 'export const keep = true;\n');
    fs.rmSync(manual);
    fs.writeFileSync(f.generated(), 'export const handwritten = true;\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /manually authored file/);
    fs.rmSync(f.generated());
    runOne(f.lesson, 'generate', f.root);
    fs.appendFileSync(f.generated(), '// human edit\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /modified manually/);
  }));

test('requires only dispatch and output essentials, not methodology, review or assets', () =>
  fixture(f => {
    assert.equal(fs.existsSync(path.join(f.lesson, 'methodology.md')), false);
    f.content.section.items.intro.content.items.photo = {
      id: id(99), slug: 'photo', type: 'image', locale: { src: 'missing.png', alt: 'Опис' },
    };
    f.save();
    assert.doesNotThrow(() => runOne(f.lesson, 'generate', f.root));
    assert.ok(calls(fs.readFileSync(f.generated(), 'utf8')).includes('defineImage'));
    assert.doesNotThrow(() => main(['check', '--source', path.relative(f.root, f.lesson)], f.root));
  }));

test('source locale pruning includes localized Flashcard flag values outside locale', () => {
  const draft = renderLessonDraft({
    slug: 'sample',
    type: 'lesson',
    params: { languages: ['uk', 'en'] },
    flashcards: { items: {
      card: {
        slug: 'card', type: 'flashcard',
        parameters: { flags: { items: {
          acronym: { type: 'acronym', value: { uk: 'АБ', en: 'EN_SECRET' } },
          custom: { type: 'custom', value: { uk: 'Лише УК', en: 'CUSTOM_SECRET' }, color: 'red' },
        }, order: ['acronym', 'custom'] } },
      },
    }, order: ['card'] },
  }, 'uk');
  assert.match(draft, /"uk": "АБ"/);
  assert.doesNotMatch(draft, /EN_SECRET|CUSTOM_SECRET/);
  assert.match(draft, /"languages": \[\s*"uk",\s*"en"\s*\]/);
});

test('Lesson Config is independently discovered without repurposing editorial content', () =>
  fixture(f => {
    fs.writeFileSync(path.join(f.lesson, 'content.yaml'), 'kind: lesson-content-plan\nsections: []\n');
    assert.equal(runOne(f.lesson, 'generate', f.root).changed, 1);
    assert.match(fs.readFileSync(path.join(f.lesson, 'content.yaml'), 'utf8'), /lesson-content-plan/);
    assert.match(fs.readFileSync(f.generated(), 'utf8'), /defineLesson\(/);
  }));
