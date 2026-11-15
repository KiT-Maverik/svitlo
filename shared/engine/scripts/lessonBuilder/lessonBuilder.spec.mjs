import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';

import { BuilderDiagnostic, loadFactoryRegistry, runOne, main } from './lessonBuilder.mjs';
import { renderLessonModules } from './lessonModules.mjs';

const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const lessonId = id(12);
const block = (slug, number, value = 'Текст') => ({
  id: id(number), slug, type: 'text', params: {},
  locale: { value: { uk: value, en: 'Never emit translation' } },
});
const group = items => ({ items, order: Object.keys(items) });
function lessonConfig() {
  return {
    id: lessonId, slug: 'lightLesson', type: 'lesson', skills: [],
    params: {
      languages: ['uk', 'en'], requireQuiz: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { uk: 'Світло', en: 'Light' } },
    section: group({
      intro: {
        id: id(1), slug: 'intro', type: 'content', params: {},
        locale: { title: { uk: 'Вступ' }, navigationLabel: { uk: 'Початок' } },
        content: group({
          prompt: block('prompt', 2),
          gallery: {
            id: id(3), slug: 'gallery', type: 'carousel', params: {},
            slides: group({
              first: { id: id(4), slug: 'first', type: 'carouselSlide',
                locale: { src: { uk: '/example.svg', en: '/never.svg' }, alt: { uk: 'Опис' } } },
            }),
          },
          check: {
            id: id(5), slug: 'check', type: 'checkpoint', params: {},
            content: group({
              comparison: {
                id: id(6), slug: 'comparison', type: 'checkpointItem',
                question: block('checkPrompt', 7),
                answer: group({ correct: block('correct', 8) }),
              },
            }),
          },
        }),
      },
    }),
    flashcards: group({
      remember: {
        id: id(9), slug: 'remember', type: 'flashcard',
        parameters: { tags: [], flags: group({}), relationships: group({}) },
        content: { front: group({ front: block('front', 10) }),
          back: group({ back: block('back', 11) }) },
      },
    }),
    questions: {
      selectOneAnswer: {
        choice: {
          id: id(13), slug: 'choice', type: 'selectOneAnswer', params: {},
          content: {
            question: group({ questionPrompt: block('questionPrompt', 14) }),
            answers: {
              correct: group({ yes: block('yes', 15) }),
              incorrect: group({ no: block('no', 16) }),
              distractors: group({}),
            },
          },
        },
      },
    },
  };
}
function wrap(value) {
  if (Array.isArray(value)) return value.map(wrap);
  if (value === null || typeof value !== 'object') return value;
  const { __production, ...rest } = value;
  const children = Object.fromEntries(Object.entries(rest).map(([key, v]) => [key, wrap(v)]));
  if (typeof value.id === 'string' && typeof value.type === 'string')
    return { config: children, ...(__production ? { production: __production } : {}) };
  return children;
}
function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-modules-'));
  const workspace = path.join(root, 'content/playground');
  const lesson = path.join(workspace, 'data/lessons', lessonId.at(-1), lessonId);
  fs.mkdirSync(lesson, { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');
  const config = lessonConfig();
  const save = () => fs.writeFileSync(path.join(lesson, 'config.yaml'),
    yaml.stringify({ ...wrap(config), production: { documentLanguage: 'uk', ...config.__production } }));
  try {
    save();
    return callback({ root, workspace, lesson, config, save, generated: name => path.join(lesson, name) });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}
function readAll(lesson) {
  const output = new Map();
  function visit(dir, prefix) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const location = path.join(dir, item.name);
      const name = prefix ? prefix + '/' + item.name : item.name;
      if (item.isDirectory()) visit(location, name);
      else if (item.name.endsWith('.ts')) output.set(name, fs.readFileSync(location, 'utf8'));
    }
  }
  visit(lesson, '');
  return output;
}
function assertTypeScriptSyntax(files) {
  for (const [name, content] of files) {
    if (!name.endsWith('.ts')) continue;
    const ast = ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    assert.deepEqual(ast.parseDiagnostics, [], name);
  }
}

test('factory dispatch uses the canonical Engine registry', () => {
  const registry = loadFactoryRegistry();
  for (const type of ['lesson', 'content', 'carousel', 'checkpoint', 'checkpointItem',
    'carouselSlide', 'flashcard', 'selectOneAnswer', 'quest', 'questStage', 'questTask'])
    assert.equal(typeof registry[type], 'string', type);
});

test('one YAML produces a modular typed Lesson, no type-grouped folders and no invented locales', () =>
  fixture(f => {
    const result = runOne(f.lesson, 'generate', f.root);
    assert.equal(result.lessonId, lessonId);
    const files = readAll(f.lesson);
    assert.equal(result.changed, files.size);
    for (const name of ['index.ts', 'constants.ts', 'sections/index.ts', 'sections/intro/index.ts',
      'sections/intro/prompt/index.ts', 'sections/intro/gallery/index.ts',
      'sections/intro/gallery/first/index.ts',
      'sections/intro/check/index.ts', 'sections/intro/check/comparison/index.ts',
      'sections/intro/check/comparison/checkPrompt/index.ts',
      'sections/intro/check/comparison/correct/index.ts',
      'flashcards/index.ts', 'flashcards/remember/index.ts',
      'flashcards/remember/front/front/index.ts', 'flashcards/remember/back/back/index.ts',
      'questions/index.ts', 'questions/selectOneAnswer/choice/index.ts']) {
      assert.ok(files.has(name), 'Missing ' + name);
    }
    assert.ok(![...files.keys()].some(name => name.includes('/texts/') || name.includes('/images/')));
    const root = files.get('index.ts');
    assert.match(root, /import \{ languages \} from '\.\/constants'/);
    assert.match(root, /skills: \[\]/);
    assert.match(root, /params: \{\s*languages,/);
    assert.match(root, /section,\s*flashcards,\s*questions/);
    assert.match(root, /defineLesson<"lightLesson", LessonLanguages, typeof section\.items, typeof flashcards\.items, typeof questions>/);
    assert.doesNotMatch(root, /"id":|"slug":|"section":/);
    const section = files.get('sections/intro/index.ts');
    assert.match(section, /defineContentSection<"intro", typeof content\.items, LessonLanguages>/);
    assert.match(section, /\n  content\n\}\);/);
    assert.match(files.get('sections/index.ts'), /export const section =/);
    assert.match(files.get('constants.ts'), /export type LessonLanguages = typeof languages/);
    assert.match(files.get('sections/intro/prompt/index.ts'), /defineText<"prompt", LessonLanguages>/);
    assert.doesNotMatch([...files.values()].join('\n'), /Never emit translation|Light"|'Never emit translation'/);
    assertTypeScriptSyntax(files);
  }));

test('Skill IDs resolve to imported source symbols rather than hard-coded UUIDs', () =>
  fixture(f => {
    const skillId = id(99);
    const folder = path.join(f.workspace, 'data/skills/algebra/example/skills');
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'example.data.ts'),
      "import { defineSkill } from '@svitlo/engine/build';\n" +
      "export const example_Skill_Data = defineSkill({ id: '" + skillId + "', slug: 'example' });\n");
    f.config.skills = [skillId];
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert.match(code, /import \{ example_Skill_Data \} from "\.\.\/\.\.\/\.\.\/skills\/algebra\/example\/skills\/example\.data"/);
    assert.match(code, /skills: \[example_Skill_Data\.id\]/);
    assert.doesNotMatch(code, new RegExp(skillId));
  }));

test('unknown Skill UUID produces a deterministic unresolved dependency instead of an invented import', () =>
  fixture(f => {
    f.config.skills = [id(88)];
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /Unresolved Skill ID/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('Question and Flashcard nested objects receive real item imports and appropriate generic types', () =>
  fixture(f => {
    runOne(f.lesson, 'generate', f.root);
    const question = fs.readFileSync(f.generated('questions/selectOneAnswer/choice/index.ts'), 'utf8');
    assert.match(question, /defineSelectOneAnswer<"choice", typeof content, LessonLanguages>/);
    assert.match(question, /questionPrompt/);
    assert.match(question, /yes/);
    const card = fs.readFileSync(f.generated('flashcards/remember/index.ts'), 'utf8');
    assert.match(card, /defineFlashcard<"remember", typeof content\.front\.items, typeof content\.back\.items/);
    assert.match(card, /LessonLanguages>/);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('Quest uses distinct stages/tasks namespaces and their nested media remain separate modules', () =>
  fixture(f => {
    const media = (type, slug, n) => ({ id: id(n), slug, type, params: {}, locale: {} });
    f.config.section.items.quest = {
      id: id(20), slug: 'quest', type: 'quest', params: {},
      stages: {
        start: { id: id(21), slug: 'start', type: 'questStage', content: {
          video: { medium: media('video', 'medium', 22), small: media('video', 'small', 23) },
          audio: { dialogue: media('audio', 'dialogue', 24), narration: null, background: null },
          image: media('image', 'image', 25), subtitles: media('subtitles', 'subtitles', 26),
        } },
      },
      tasks: {
        start: { id: id(27), slug: 'start', type: 'questTask',
          scene: media('scene', 'taskScene', 28) },
      },
    };
    f.config.section.order.push('quest');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const files = readAll(f.lesson);
    for (const name of ['sections/quest/stages/start/index.ts', 'sections/quest/tasks/start/index.ts',
      'sections/quest/stages/start/video/medium/index.ts',
      'sections/quest/stages/start/audio/dialogue/index.ts',
      'sections/quest/tasks/start/taskScene/index.ts']) assert.ok(files.has(name), name);
    assert.match(files.get('sections/quest/index.ts'), /typeof stages, typeof tasks, LessonLanguages/);
    assert.match(files.get('sections/quest/stages/start/index.ts'), /narration: null/);
    assertTypeScriptSyntax(files);
  }));

test('create-only generate skips index.ts before parsing stale YAML; check detects changes without writes', () =>
  fixture(f => {
    const first = runOne(f.lesson, 'generate', f.root);
    const before = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert(first.changed > 1);
    assert.deepEqual(runOne(f.lesson, 'generate', f.root), {
      changed: 0, skipped: true, files: ['index.ts'], lessonId,
    });
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    f.config.locale.title.uk = 'Змінено';
    f.save();
    assert.throws(() => runOne(f.lesson, 'check', f.root), /stale draft/);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(f.generated('index.ts'), 'utf8'), before);
    fs.writeFileSync(path.join(f.lesson, 'config.yaml'), 'invalid: [');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
  }));

test('check refuses manual source modifications and missing nested modules', () =>
  fixture(f => {
    runOne(f.lesson, 'generate', f.root);
    const file = f.generated('sections/intro/prompt/index.ts');
    fs.appendFileSync(file, '// manually edited\n');
    assert.throws(() => runOne(f.lesson, 'check', f.root), /modified manually/);
    fs.unlinkSync(file);
    assert.throws(() => runOne(f.lesson, 'check', f.root), /missing draft/);
  }));

test('preflight protects manually authored entrypoints, orphan trees and staged destinations', () =>
  fixture(f => {
    const manual = f.generated('manual.data.ts');
    fs.writeFileSync(manual, 'export const keep = true;\n');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(manual, 'utf8'), 'export const keep = true;\n');
    fs.unlinkSync(manual);
    fs.mkdirSync(f.generated('sections/manual'), { recursive: true });
    fs.writeFileSync(f.generated('sections/manual/index.ts'), 'export const neverErase = true;\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /incomplete Lesson source tree/);
    fs.rmSync(f.generated('sections'), { recursive: true });
    const staged = path.join(f.workspace, 'staging/config.yaml');
    fs.mkdirSync(path.dirname(staged), { recursive: true });
    const document = yaml.parse(fs.readFileSync(f.generated('config.yaml'), 'utf8'));
    const second = id(45);
    document.config.id = second;
    fs.writeFileSync(staged, yaml.stringify(document));
    const result = runOne(staged, 'generate', f.root);
    assert.equal(result.lessonId, second);
    assert.ok(fs.existsSync(path.join(f.workspace, 'data/lessons', second.at(-1), second, 'index.ts')));
  }));

test('keeps Scene/media production handoffs at their existing UUID locations until Stage 4', () =>
  fixture(f => {
    const sceneId = id(51);
    const imageId = id(52);
    f.config.__production = { methodology: '# Lesson method\n\nPractice equal groups.' };
    f.config.section.items.intro.content.items.visualScene = {
      id: sceneId, slug: 'visualScene', type: 'scene', __production: {
        specification: '# Scene specification\n\nCompare the groups.',
      },
    };
    f.config.section.items.intro.content.items.visualImage = {
      id: imageId, slug: 'visualImage', type: 'image', locale: { src: null },
      __production: { purpose: 'Show equality', prompt: 'Two groups of counters.' },
    };
    f.save();
    runOne(f.lesson, 'generate', f.root);
    assert.match(fs.readFileSync(path.join(f.workspace, 'scenes', sceneId.at(-1), sceneId, 'specification.md'), 'utf8'), /Compare the groups/);
    assert.match(fs.readFileSync(path.join(f.workspace, 'data/assets', imageId.at(-1), imageId, 'specification.md'), 'utf8'), /Two groups/);
    assert.match(fs.readFileSync(f.generated('methodology.md'), 'utf8'), /Lesson method/);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
  }));

test('never writes files for unsafe slugs, unknown nested factories or symlinked output destinations', () =>
  fixture(f => {
    f.config.section.items.intro.content.items.prompt.type = 'badType';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /unknown type "badType"/);
    f.config.section.items.intro.content.items.prompt.type = 'text';
    f.config.section.items.intro.content.items.prompt.slug = '../breakout';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /unsafe or missing camelCase slug/);
    f.config.section.items.intro.content.items.prompt.slug = 'prompt';
    f.save();
    const dest = f.generated('index.ts');
    fs.symlinkSync(path.join(f.root, 'elsewhere'), dest);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.lstatSync(dest).isSymbolicLink(), true);
  }));

test('CLI discovers Lesson configs, generates safely, and reports SKIP', () =>
  fixture(f => {
    const messages = [];
    const old = console.log;
    try {
      console.log = value => messages.push(value);
      main(['generate', '--source', path.relative(f.root, f.lesson)], f.root);
      main(['generate', '--source', path.relative(f.root, f.lesson)], f.root);
    } finally { console.log = old; }
    assert(messages.some(x => /file\(s\) written/.test(x)));
    assert(messages.some(x => /SKIP Lesson/.test(x)));
  }));

test('partial YAML remains a partial typed draft, without fabricated language or data fields', () =>
  fixture(f => {
    delete f.config.params;
    delete f.config.section;
    delete f.config.flashcards;
    delete f.config.questions;
    f.save();
    const result = runOne(f.lesson, 'generate', f.root);
    assert.deepEqual(result.files, ['index.ts']);
    const code = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert.match(code, /defineLesson\(\{/);
    assert.doesNotMatch(code, /params:|section:|flashcards:|questions:/);
    assert.equal(fs.existsSync(f.generated('constants.ts')), false);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('Flashcard flag localization prunes non-source languages and retains literal type/color discriminants', () =>
  fixture(f => {
    f.config.flashcards.items.remember.parameters.flags = group({
      custom: { type: 'custom', color: 'red', value: { uk: 'Лише українська', en: 'SECRET' } },
    });
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated('flashcards/remember/index.ts'), 'utf8');
    assert.match(code, /type: "custom" as const/);
    assert.match(code, /color: "red" as const/);
    assert.match(code, /Лише українська/);
    assert.doesNotMatch(code, /SECRET/);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('matching Question pairs with repeated child slugs are isolated by pair and role', () =>
  fixture(f => {
    f.config.questions.matchBlocks = {
      match: {
        id: id(60), slug: 'match', type: 'matchBlocks', params: {},
        content: {
          question: group({ question: block('questionText', 61) }),
          pairs: group({
            first: {
              left: block('label', 62, 'Ліва A'),
              right: block('label', 63, 'Права A'),
            },
            second: {
              left: block('label', 64, 'Ліва B'),
              right: block('label', 65, 'Права B'),
            },
          }),
        },
      },
    };
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const names = [...readAll(f.lesson).keys()];
    for (const location of [
      'questions/matchBlocks/match/first/left/label/index.ts',
      'questions/matchBlocks/match/first/right/label/index.ts',
      'questions/matchBlocks/match/second/left/label/index.ts',
      'questions/matchBlocks/match/second/right/label/index.ts',
    ]) assert.ok(names.includes(location), location);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('production handoff conflict is diagnosed before writing any source module', () =>
  fixture(f => {
    const sceneId = id(70);
    f.config.section.items.intro.content.items.visualScene = {
      id: sceneId, slug: 'visualScene', type: 'scene',
      __production: { specification: '# Expected Scene specification' },
    };
    f.save();
    const destination = path.join(f.workspace, 'scenes', sceneId.at(-1), sceneId, 'specification.md');
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, '# Hand-edited specification\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /refusing to overwrite/);
    assert.equal(fs.existsSync(f.generated('constants.ts')), false);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('staged sources require valid UUIDs and reject symlinked canonical destinations', () =>
  fixture(f => {
    const staged = path.join(f.workspace, 'staging/config.yaml');
    fs.mkdirSync(path.dirname(staged), { recursive: true });
    const doc = yaml.parse(fs.readFileSync(f.generated('config.yaml'), 'utf8'));
    doc.config.id = '../malicious';
    fs.writeFileSync(staged, yaml.stringify(doc));
    assert.throws(() => runOne(staged, 'generate', f.root), /Lesson UUID is required/);
    const uuid = id(71);
    doc.config.id = uuid;
    fs.writeFileSync(staged, yaml.stringify(doc));
    const canonical = path.join(f.workspace, 'data/lessons', uuid.at(-1), uuid);
    fs.mkdirSync(path.dirname(canonical), { recursive: true });
    const elsewhere = path.join(f.root, 'untrusted');
    fs.symlinkSync(elsewhere, canonical, 'dir');
    assert.throws(() => runOne(staged, 'generate', f.root), /Refusing symlink/);
    assert.equal(fs.existsSync(elsewhere), false);
  }));

test('module path collision is diagnosed without overwriting any existing file', () =>
  fixture(f => {
    f.config.section.items.intro.content.items.extra = block('prompt', 75);
    f.config.section.items.intro.content.order.push('extra');
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /Duplicate generated Lesson destination/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));
