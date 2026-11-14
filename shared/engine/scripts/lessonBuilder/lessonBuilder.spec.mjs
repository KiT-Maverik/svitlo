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
    id: id(2),
    slug: 'slide',
    type: 'carouselSlide',
    locale: { src: { uk: 'img/uk.png', en: 'img/en.png' }, alt: { uk: 'Опис', en: 'Description' } },
  };
  const item = {
    id: id(3),
    slug: 'task',
    type: 'checkpointItem',
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
        id: id(4),
        slug: 'intro',
        type: 'content',
        params: { skippable: false },
        locale: { title: { uk: 'Вступ', en: 'Intro' } },
        content: group({
          body: textBlock('body'),
          gallery: {
            id: id(5),
            slug: 'gallery',
            type: 'carousel',
            slides: group({ first: slide }),
          },
          check: {
            id: id(6),
            slug: 'check',
            type: 'checkpoint',
            content: group({ task: item }),
          },
        }),
      },
      quiz: {
        id: id(7),
        slug: 'quiz',
        type: 'quiz',
        params: { selection: { mode: 'all' } },
        content: group({ prompt: textBlock('prompt') }),
      },
    }),
  };
}

function makeQuestions() {
  const selectOne = {
    id: id(8),
    slug: 'one',
    type: 'selectOneAnswer',
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
    id: id(9),
    slug: 'match',
    type: 'matchBlocks',
    content: {
      question: group({ prompt: textBlock('prompt') }),
      pairs: group({
        pair: { left: textBlock('left'), right: textBlock('right') },
      }),
    },
  };
  const blanks = {
    id: id(10),
    slug: 'blanks',
    type: 'fillBlanksWithBlocks',
    content: {
      question: group({ prompt: textBlock('prompt') }),
      slots: group({ gap: { correctAnswer: textBlock('correctAnswer') } }),
      distractors: group({}),
    },
  };
  return {
    documentLanguage: 'uk',
    questions: {
      selectOneAnswer: { one: selectOne },
      matchBlocks: { match },
      fillBlanksWithBlocks: { blanks },
    },
  };
}

function makeFlashcards() {
  return {
    documentLanguage: 'uk',
    flashcards: group({
      first: {
        id: id(11),
        slug: 'first',
        type: 'flashcard',
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
    }),
  };
}

/** Model the author's single YAML file without changing existing Config fixtures. */
function wrapEntityNodes(value) {
  if (Array.isArray(value)) return value.map(wrapEntityNodes);
  if (!value || typeof value !== 'object') return value;
  const { __production: production, ...fields } = value;
  const config = Object.fromEntries(Object.entries(fields).map(([key, child]) => [key, wrapEntityNodes(child)]));
  if (typeof value.type === 'string' && typeof value.id === 'string') {
    return { config, ...(production ? { production } : {}) };
  }
  return config;
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
    const { documentLanguage, __production, ...authored } = content;
    const wrapped = wrapEntityNodes({
      ...authored,
      questions: questions.questions,
      flashcards: flashcards.flashcards,
      __production: { documentLanguage, ...__production },
    });
    fs.writeFileSync(path.join(lesson, 'config.yaml'), yaml.stringify(wrapped));
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
      'defineLesson',
      'defineContentSection',
      'defineQuizSection',
      'defineText',
      'defineCarousel',
      'defineCarouselSlide',
      'defineCheckpoint',
      'defineCheckpointItem',
      'defineSelectOneAnswer',
      'defineMatchBlocks',
      'defineFillBlanksWithBlocks',
      'defineFlashcard',
    ])
      assert.ok(names.includes(name), 'Missing ' + name);
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
    f.save = () => {
      const { documentLanguage, ...config } = f.content;
      fs.writeFileSync(
        path.join(f.lesson, 'config.yaml'),
        yaml.stringify({ config, production: { documentLanguage } }),
      );
    };
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated(), 'utf8');
    assert.deepEqual(calls(code), ['defineLesson']);
    assert.doesNotMatch(code, /"params":/);
    assert.doesNotMatch(code, /"section":/);
    assert.doesNotMatch(code, /"questions":/);
    assert.doesNotMatch(code, /"flashcards":/);
  }));

test('creation skips existing Lesson data while check remains read-only and strict', () =>
  fixture(f => {
    assert.equal(runOne(f.lesson, 'generate', f.root).changed, 1);
    const first = fs.readFileSync(f.generated(), 'utf8');
    assert.deepEqual(runOne(f.lesson, 'generate', f.root), {
      changed: 0,
      skipped: true,
      files: ['lightLesson.data.ts'],
      lessonId,
    });
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), first);
    f.content.section.items.intro.locale.title.uk = 'Змінений вступ';
    f.save();
    assert.throws(() => runOne(f.lesson, 'check', f.root), /stale draft/);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), first);
    const logged = [];
    const previousLog = console.log;
    try {
      console.log = message => logged.push(message);
      main(['generate', '--source', path.relative(f.root, f.lesson)], f.root);
    } finally {
      console.log = previousLog;
    }
    assert(logged.some(message => /SKIP Lesson .*existing lightLesson.data.ts; no files modified/.test(message)));
  }));

test('missing and unknown polymorphic types produce a local dispatch diagnostic', () =>
  fixture(f => {
    delete f.content.section.items.intro.content.items.body.type;
    f.save();
    assert.throws(
      () => runOne(f.lesson, 'generate', f.root),
      error =>
        error instanceof BuilderDiagnostic &&
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
  const source = renderLessonDraft(
    {
      slug: 'demo',
      type: 'lesson',
      locale: { title: { uk: 'Заголовок', en: 'Title' } },
      params: { languages: ['en', 'uk'], type: 'configValue' },
      flashcards: { items: {}, order: [] },
    },
    'uk',
    loadFactoryRegistry(),
  );
  assert.match(source, /"languages": \[\s*"en",\s*"uk"\s*\]/);
  assert.match(source, /"type": "configValue"/);
  assert.match(source, /"uk": "Заголовок"/);
  assert.doesNotMatch(source, /"en": "Title"/);
});

test('existing authored and modified data files are skipped without any overwrites', () =>
  fixture(f => {
    const manual = path.join(f.lesson, 'other.data.ts');
    fs.writeFileSync(manual, 'export const keep = true;\n');
    assert.deepEqual(runOne(f.lesson, 'generate', f.root).files, ['other.data.ts']);
    assert.equal(fs.readFileSync(manual, 'utf8'), 'export const keep = true;\n');
    assert.equal(fs.existsSync(f.generated()), false);
    fs.rmSync(manual);
    fs.writeFileSync(f.generated(), 'export const handwritten = true;\n');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), 'export const handwritten = true;\n');
    assert.throws(() => runOne(f.lesson, 'check', f.root), /manually authored file/);
    fs.rmSync(f.generated());
    assert.equal(runOne(f.lesson, 'generate', f.root).changed, 1);
    fs.appendFileSync(f.generated(), '// human edit\n');
    const edited = fs.readFileSync(f.generated(), 'utf8');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), edited);
    assert.throws(() => runOne(f.lesson, 'check', f.root), /modified manually/);
  }));

test('generation skips existing Lesson before parsing a stale YAML projection', () =>
  fixture(f => {
    fs.writeFileSync(f.generated(), 'export const alreadyAuthored = true;\n');
    fs.writeFileSync(path.join(f.lesson, 'config.yaml'), 'invalid: [\n');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(f.generated(), 'utf8'), 'export const alreadyAuthored = true;\n');
    assert.throws(() => runOne(f.lesson, 'check', f.root));
  }));

test('requires only dispatch and output essentials, not methodology, review or assets', () =>
  fixture(f => {
    assert.equal(fs.existsSync(path.join(f.lesson, 'methodology.md')), false);
    f.content.section.items.intro.content.items.photo = {
      id: id(99),
      slug: 'photo',
      type: 'image',
      locale: { alt: 'Опис' }, // Intentionally missing src: TS must report this later.
    };
    f.save();
    assert.doesNotThrow(() => runOne(f.lesson, 'generate', f.root));
    assert.ok(calls(fs.readFileSync(f.generated(), 'utf8')).includes('defineImage'));
    assert.doesNotThrow(() => main(['check', '--source', path.relative(f.root, f.lesson)], f.root));
  }));

test('source locale pruning includes localized Flashcard flag values outside locale', () => {
  const draft = renderLessonDraft(
    {
      slug: 'sample',
      type: 'lesson',
      params: { languages: ['uk', 'en'] },
      flashcards: {
        items: {
          card: {
            slug: 'card',
            type: 'flashcard',
            parameters: {
              flags: {
                items: {
                  acronym: { type: 'acronym', value: { uk: 'АБ', en: 'EN_SECRET' } },
                  custom: { type: 'custom', value: { uk: 'Лише УК', en: 'CUSTOM_SECRET' }, color: 'red' },
                },
                order: ['acronym', 'custom'],
              },
            },
          },
        },
        order: ['card'],
      },
    },
    'uk',
  );
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

test('one YAML source creates ID-addressed Scene/media specs and a methodology without inventing assets', () =>
  fixture(f => {
    const sceneId = id(51);
    const imageId = id(52);
    f.content.__production = { methodology: '# Lesson method\\n\\nExplain equality with counters.' };
    f.content.section.items.intro.content.items.visualScene = {
      id: sceneId,
      slug: 'visualScene',
      type: 'scene',
      locale: { value: { uk: { button: 'Показати' } } },
      __production: {
        specification: '# Scene specification\\n\\nLearner compares equal groups.',
      },
    };
    f.content.section.items.intro.content.items.visualImage = {
      id: imageId,
      slug: 'visualImage',
      type: 'image',
      params: { fill: true, aspectRatio: 1.5 },
      locale: { src: null, alt: { uk: 'Дві рівні групи' } },
      __production: { purpose: 'Show equality', prompt: 'Two groups of five counters.' },
    };
    f.save();
    const result = runOne(f.lesson, 'generate', f.root);
    assert.equal(result.changed, 4);
    const workspace = path.join(f.root, 'content/playground');
    const sceneSpec = path.join(workspace, 'scenes', sceneId.at(-1), sceneId, 'specification.md');
    const imageSpec = path.join(workspace, 'data/assets', imageId.at(-1), imageId, 'specification.md');
    assert.match(fs.readFileSync(sceneSpec, 'utf8'), /Learner compares equal groups/);
    assert.match(fs.readFileSync(imageSpec, 'utf8'), /Two groups of five counters/);
    assert.match(fs.readFileSync(path.join(f.lesson, 'methodology.md'), 'utf8'), /Lesson method/);
    const code = fs.readFileSync(f.generated(), 'utf8');
    assert.deepEqual(
      calls(code).filter(x => x === 'defineScene'),
      ['defineScene'],
    );
    assert.match(code, /defineImage\(/);
    assert.doesNotMatch(code, /"__production"|"production"|"specification"/);
    assert(!code.includes('Two groups of five counters.'));
    const imageDraft = code.slice(code.indexOf('"visualImage": defineImage('));
    assert.match(imageDraft, /"src": null/); // Incomplete asset is explicit and will fail the real Config type.
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    const before = fs.readFileSync(sceneSpec, 'utf8');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(sceneSpec, 'utf8'), before);
  }));

test('conflicting previously authored specifications are protected before writing any TS', () =>
  fixture(f => {
    const sceneId = id(53);
    f.content.section.items.intro.content.items.visualScene = {
      id: sceneId,
      slug: 'visualScene',
      type: 'scene',
      __production: { specification: '# Expected spec' },
    };
    f.save();
    const spec = path.join(f.root, 'content/playground/scenes', sceneId.at(-1), sceneId, 'specification.md');
    fs.mkdirSync(path.dirname(spec), { recursive: true });
    fs.writeFileSync(spec, '# Edited by author');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /refusing to overwrite/);
    assert.equal(fs.existsSync(f.generated()), false);
    assert.equal(fs.readFileSync(spec, 'utf8'), '# Edited by author');
  }));

test('single YAML config.id determines the Lesson UUID output path without checking input folder names', () =>
  fixture(f => {
    const staged = path.join(f.root, 'content/playground/staging/config.yaml');
    const authoring = yaml.parse(fs.readFileSync(path.join(f.lesson, 'config.yaml'), 'utf8'));
    const ownId = id(65);
    authoring.config.id = ownId;
    authoring.config.slug = 'stagedLesson';
    fs.mkdirSync(path.dirname(staged), { recursive: true });
    fs.writeFileSync(staged, yaml.stringify(authoring));
    fs.writeFileSync(path.join(path.dirname(staged), 'unrelated.data.ts'), 'export const unrelated = true;\n');
    const expected = path.join(f.root, 'content/playground/data/lessons', ownId.at(-1), ownId);
    assert.equal(runOne(staged, 'generate', f.root).lessonId, ownId);
    assert(fs.existsSync(path.join(expected, 'stagedLesson.data.ts')));
    assert(!fs.existsSync(path.join(path.dirname(staged), 'stagedLesson.data.ts')));
    assert.equal(runOne(staged, 'generate', f.root).skipped, true);
    assert.equal(runOne(staged, 'check', f.root).changed, 0);
  }));

test('staged Lesson rejects malformed IDs and symlinked UUID destinations without writing files', () =>
  fixture(f => {
    const staging = path.join(f.root, 'content/playground/staging/config.yaml');
    const source = yaml.parse(fs.readFileSync(path.join(f.lesson, 'config.yaml'), 'utf8'));
    fs.mkdirSync(path.dirname(staging), { recursive: true });
    source.config.id = '../unsafe';
    fs.writeFileSync(staging, yaml.stringify(source));
    assert.throws(() => runOne(staging, 'generate', f.root), /Lesson UUID is required/);
    const newId = id(66);
    source.config.id = newId;
    fs.writeFileSync(staging, yaml.stringify(source));
    const canonical = path.join(f.root, 'content/playground/data/lessons', newId.at(-1), newId);
    fs.mkdirSync(path.dirname(canonical), { recursive: true });
    const redirected = path.join(f.root, 'unsafe-output');
    fs.symlinkSync(redirected, canonical, 'dir');
    assert.throws(() => runOne(staging, 'generate', f.root), /Refusing symlink/);
    assert.equal(fs.existsSync(redirected), false);
    assert.equal(fs.existsSync(path.join(path.dirname(staging), 'lightLesson.data.ts')), false);
  }));


test('Quest draft instantiates Stage, Task, named media, Subtitles and Scene without positional order', () => {
  const lesson = makeLesson();
  const media = (type, slug, number, locale = {}) => ({
    id: id(number),
    slug,
    type,
    params: {},
    locale,
  });
  lesson.section.items.quest = {
    id: id(80),
    slug: 'quest',
    type: 'quest',
    params: { skippable: false },
    locale: {
      title: { uk: 'Кероване тренування', en: 'Guided practice' },
      navigationLabel: { uk: 'Практика', en: 'Practice' },
    },
    stages: {
      start: {
        id: id(81),
        slug: 'start',
        type: 'questStage',
        content: {
          video: {
            medium: media('video', 'medium', 82, {
              fileLocation: null,
              poster: null,
              label: { uk: 'Пояснення', en: 'Explanation' },
            }),
            small: media('video', 'small', 83, {
              fileLocation: null,
              poster: null,
              label: { uk: 'Пояснення' },
            }),
          },
          audio: {
            dialogue: media('audio', 'dialogue', 84, { fileLocation: null, title: { uk: 'Діалог' } }),
            narration: null,
            background: null,
          },
          image: media('image', 'image', 85, { src: null, alt: { uk: 'Схема' } }),
          subtitles: media('subtitles', 'subtitles', 86, { fileLocation: null }),
        },
      },
    },
    tasks: {
      start: {
        id: id(87),
        slug: 'start',
        type: 'questTask',
        scene: media('scene', 'taskScene', 88, { value: { uk: { action: 'compare' } } }),
      },
    },
  };
  lesson.section.order.push('quest');

  const draft = renderLessonDraft(lesson, 'uk');
  for (const factory of [
    'defineQuestSection',
    'defineStage',
    'defineTask',
    'defineVideo',
    'defineAudio',
    'defineImage',
    'defineSubtitles',
    'defineScene',
  ]) {
    assert.match(draft, new RegExp(factory + '\\('), factory);
  }
  assert.equal((draft.match(/defineStage\(/g) ?? []).length, 1);
  assert.equal((draft.match(/defineTask\(/g) ?? []).length, 1);
  assert.match(draft, /"narration": null/);
  assert.match(draft, /"background": null/);
  assert(!draft.includes('"en": "Guided practice"'), 'do not invent non-source locale output');
  assert(!draft.includes('"order": [\n') || draft.includes('"section"'), 'Quest itself has no order');
  assert.deepEqual(
    ts.createSourceFile('quest.data.ts', draft, ts.ScriptTarget.Latest, true).parseDiagnostics,
    [],
  );

  const broken = structuredClone(lesson);
  broken.section.items.quest.tasks.start.scene.type = 'unknownTaskScene';
  assert.throws(() => renderLessonDraft(broken, 'uk'), /unknown type "unknownTaskScene"/);
});
