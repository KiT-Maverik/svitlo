import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';
import { scanSource } from '../../../../scripts/ci/checkBlockerTodos/check-blocker-todos.mjs';

import { BuilderDiagnostic, loadFactoryRegistry, runOne, main, repoRoot } from './lessonBuilder.mjs';
import { renderLessonModules } from './lessonModules.mjs';
import { defineLesson, defineQuizSection, defineFlashcardsSection } from '@svitlo/engine/build';
import { assembleLessonProps } from '@svitlo/engine/runtime';
import { renderLessonMarkdown } from '../generateLessonsMarkdown/lesson-markdown.mjs';
import { generate as generateLessonMarkdown } from '../generateLessonsMarkdown/generate-lessons-markdown.mjs';
import { pendingAssessmentUuid, prepareAssessmentDraft } from './lessonAssessmentDrafts.mjs';
import { splitScaffoldDocument } from '../yamlScaffolding/productionScaffolding.mjs';
import { lessonReviewStageSlugs, renderReviewDraft } from './reviewTemplate.mjs';
import { reviewTypeDiagnostics } from './reviewTypecheck.test-utils.mjs';

const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const lessonId = id(12);
const block = (slug, number, value = 'Текст') => ({
  id: id(number),
  slug,
  type: 'text',
  params: {},
  locale: { value: { uk: value, en: 'Never emit translation' } },
});
const group = items => ({ items, order: Object.keys(items) });
function lessonConfig() {
  return {
    id: lessonId,
    slug: 'lightLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages: ['uk', 'en'],
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { uk: 'Світло', en: 'Light' } },
    section: group({
      intro: {
        id: id(1),
        slug: 'intro',
        type: 'content',
        params: {},
        locale: { title: { uk: 'Вступ' }, navigationLabel: { uk: 'Початок' } },
        content: group({
          prompt: block('prompt', 2),
          gallery: {
            id: id(3),
            slug: 'gallery',
            type: 'carousel',
            params: {},
            slides: group({
              first: {
                id: id(4),
                slug: 'first',
                type: 'image',
                params: { fill: true, aspectRatio: 1.5 },
                locale: { alt: { uk: 'Опис' } },
              },
            }),
          },
          check: {
            id: id(5),
            slug: 'check',
            type: 'checkpoint',
            params: {},
            content: group({
              comparison: {
                id: id(6),
                slug: 'comparison',
                type: 'checkpointItem',
                question: block('checkPrompt', 7),
                answer: {
                  id: id(17),
                  slug: 'answer',
                  type: 'checkpointAnswer',
                  content: group({ correct: block('correct', 8) }),
                },
              },
            }),
          },
        }),
      },
    }),
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
  const save = () =>
    fs.writeFileSync(
      path.join(lesson, 'lesson.yaml'),
      yaml.stringify({ ...wrap(config), production: { documentLanguage: 'uk', ...config.__production } }),
    );
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
  for (const type of [
    'lesson',
    'content',
    'carousel',
    'checkpoint',
    'checkpointItem',
    'checkpointAnswer',
    'image',
    'scene',
    'flashcard',
    'selectOneAnswer',
    'quest',
    'questStage',
    'questTask',
  ])
    assert.equal(typeof registry[type], 'string', type);
});

test('one YAML produces a modular typed Lesson, no type-grouped folders and no invented locales', () =>
  fixture(f => {
    const result = runOne(f.lesson, 'generate', f.root);
    assert.equal(result.lessonId, lessonId);
    const files = readAll(f.lesson);
    assert.equal(result.changed, files.size);
    for (const name of [
      'index.ts',
      'constants.ts',
      'sections/index.ts',
      'sections/intro/index.ts',
      'sections/intro/prompt/index.ts',
      'sections/intro/gallery/index.ts',
      'sections/intro/gallery/first/index.ts',
      'sections/intro/check/index.ts',
      'sections/intro/check/comparison/index.ts',
      'sections/intro/check/comparison/question/index.ts',
      'sections/intro/check/comparison/answer/index.ts',
      'sections/intro/check/comparison/answer/correct/index.ts',
    ]) {
      assert.ok(files.has(name), 'Missing ' + name);
    }
    assert.ok(![...files.keys()].some(name => name.includes('/texts/') || name.includes('/images/')));
    const root = files.get('index.ts');
    assert.match(root, /import \{ languages \} from '\.\/constants'/);
    assert.match(root, /skills: \[\]/);
    assert.match(root, /params: \{\s*languages,/);
    assert.match(root, /defineLesson<"lightLesson", LessonLanguages, typeof section\.items>/);
    assert.doesNotMatch(root, /flashcards|questions/);
    assert.equal(fs.existsSync(f.generated('questions')), false);
    assert.equal(fs.existsSync(f.generated('flashcards')), false);
    assert.doesNotMatch(root, /"id":|"slug":|"section":/);
    const section = files.get('sections/intro/index.ts');
    assert.match(section, /defineContentSection<"intro", typeof content\.items, LessonLanguages>/);
    assert.match(section, /\n  content\n\}\);/);
    assert.match(files.get('sections/index.ts'), /export const section =/);
    assert.match(files.get('constants.ts'), /export type LessonLanguages = typeof languages/);
    assert.match(section, /#lessonsData\/2\/00000000-0000-4000-8000-000000000012\/constants/);
    assert.doesNotMatch([...files.values()].join('\n'), /Scaffolded by|Draft content sha256/);
    assert.match(files.get('sections/intro/prompt/index.ts'), /defineText<"prompt", LessonLanguages>/);
    assert.doesNotMatch([...files.values()].join('\n'), /Never emit translation|Light"|'Never emit translation'/);
    assertTypeScriptSyntax(files);
  }));

test('Lesson constants use documentLanguage, preserving the full planned tuple for manual restoration', () =>
  fixture(f => {
    f.config.params.languages = ['en', 'uk', 'pl', 'qm'];
    f.config.__production = { documentLanguage: 'uk' }; // Deliberately not the first planned language.
    f.save();
    const source = fs.readFileSync(f.generated('lesson.yaml'), 'utf8');
    assert.deepEqual(yaml.parse(source).config.params.languages, ['en', 'uk', 'pl', 'qm']);

    runOne(f.lesson, 'generate', f.root);
    const constantsFile = f.generated('constants.ts');
    const constants = fs.readFileSync(constantsFile, 'utf8');
    assert.equal(
      constants,
      [
        "import type { SupportedLanguages } from '@svitlo/engine/build';",
        '',
        '// TODO (BLOCKER): Restore the complete language set when translations are ready:',
        '// export const languages = ["en","uk","pl","qm"] as const satisfies SupportedLanguages;',
        '',
        'export const languages = ["uk"] as const satisfies SupportedLanguages;',
        'export type LessonLanguages = typeof languages;',
        '',
      ].join('\n'),
    );
    assert.equal([...constants.matchAll(/^export const languages =/gm)].length, 1);
    assert.equal(fs.readFileSync(f.generated('lesson.yaml'), 'utf8'), source, 'Never modify the planned YAML tuple');

    const files = readAll(f.lesson);
    assert.match(files.get('index.ts'), /import \{ languages \} from '\.\/constants'/);
    assert.match(files.get('index.ts'), /defineLesson<"lightLesson", LessonLanguages, typeof section\.items>/);
    assert.match(
      files.get('sections/intro/index.ts'),
      /defineContentSection<"intro", typeof content\.items, LessonLanguages>/,
    );
    assert.match(files.get('sections/intro/prompt/index.ts'), /defineText<"prompt", LessonLanguages>/);
    assert.match(
      files.get('sections/intro/gallery/index.ts'),
      /defineCarousel<"gallery", typeof slides\.items, LessonLanguages>/,
    );
    assert.doesNotMatch([...files.values()].join('\n'), /Never emit translation|"Light"/);
    assertTypeScriptSyntax(files);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);

    const manuallyEdited = constants.replace('export const languages = ["uk"]', 'export const languages = ["en"]');
    assert.notEqual(manuallyEdited, constants);
    fs.writeFileSync(constantsFile, manuallyEdited);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true, 'Create-only must not overwrite constants');
    assert.equal(fs.readFileSync(constantsFile, 'utf8'), manuallyEdited);
    assert.throws(() => runOne(f.lesson, 'check', f.root), /stale or manually edited draft/);
    assert.equal(fs.readFileSync(f.generated('lesson.yaml'), 'utf8'), source);
  }));

test('Carousel Image and Scene children are independently scaffolded below their authored slugs', () =>
  fixture(f => {
    const slides = f.config.section.items.intro.content.items.gallery.slides;
    slides.items.first.__production = { prompt: 'Draw a picture showing equal groups' };
    slides.items.activity = {
      id: id(91),
      slug: 'activity',
      type: 'scene',
      params: {},
      locale: { value: { instruction: { uk: 'Обери групу', en: 'Not a translation' } } },
      __production: { specification: '# Interactive activity\n\nChoose equal groups.' },
    };
    slides.order.push('activity');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const image = fs.readFileSync(f.generated('sections/intro/gallery/first/index.ts'), 'utf8');
    const scene = fs.readFileSync(f.generated('sections/intro/gallery/activity/index.ts'), 'utf8');
    const carousel = fs.readFileSync(f.generated('sections/intro/gallery/index.ts'), 'utf8');
    assert.match(image, /defineImage<"first", LessonLanguages>/);
    assert.match(image, /fileName: "00000000-0000-0000-0000-000000000000.webp"/);
    assert.match(image, /TODO\(asset\)/);
    assert.doesNotMatch(image, /Not a translation/);
    assert.match(scene, /defineScene<"activity", LessonLanguages>/);
    assert.match(scene, /Обери групу/);
    assert.match(carousel, /defineCarousel<"gallery", typeof slides\.items, LessonLanguages>/);
    assert.match(carousel, /\.\/first/);
    assert.match(carousel, /\.\/activity/);
    assert(fs.existsSync(f.generated('sections/intro/gallery/first/specification.md')));
    assert(fs.existsSync(f.generated('sections/intro/gallery/activity/specification.md')));
    assert(!fs.existsSync(f.generated('sections/intro/gallery/slides')));
    assert(!fs.existsSync(f.generated('sections/intro/gallery/image')));
    assert(!fs.existsSync(f.generated('sections/intro/gallery/scene')));
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('omitted media fields create deterministic TODO(asset) placeholders without changing YAML', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.sound = { id: id(80), slug: 'sound', type: 'audio', params: {}, locale: { title: { uk: 'Аудіо' } } };
    items.movie = { id: id(81), slug: 'movie', type: 'video', params: {}, locale: { label: { uk: 'Відео' } } };
    items.captions = { id: id(82), slug: 'captions', type: 'subtitles', params: {}, locale: {} };
    f.config.section.items.intro.content.order.push('sound', 'movie', 'captions');
    f.save();
    const before = fs.readFileSync(f.generated('lesson.yaml'), 'utf8');
    assert(!before.includes('fileName:') && !before.includes('posterFileName:'));
    runOne(f.lesson, 'generate', f.root);
    const files = [
      'sections/intro/gallery/first/index.ts',
      'sections/intro/sound/index.ts',
      'sections/intro/movie/index.ts',
      'sections/intro/captions/index.ts',
    ].map(name => fs.readFileSync(f.generated(name), 'utf8'));
    for (const [i, ext] of ['webp', 'mp3', 'mp4', 'vtt'].entries()) {
      assert(files[i].includes('fileName: "00000000-0000-0000-0000-000000000000.' + ext + '"'));
      assert.match(files[i], /TODO\(asset\)/);
      assert.equal((files[i].match(/TODO \(BLOCKER\):/g) ?? []).length, 1);
      assert.equal(scanSource('media/index.ts', files[i]).length, 1);
    }
    assert.equal(
      scanSource('text/index.ts', fs.readFileSync(f.generated('sections/intro/prompt/index.ts'), 'utf8')).length,
      0,
    );
    assert(files[2].includes('posterFileName: "00000000-0000-0000-0000-000000000000.webp"'));
    assert.equal(fs.readFileSync(f.generated('lesson.yaml'), 'utf8'), before);
    assertTypeScriptSyntax(readAll(f.lesson));
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
  }));

test('Lesson Builder refuses YAML-only media fields even when they are null', () =>
  fixture(f => {
    f.config.section.items.intro.content.items.gallery.slides.items.first.locale.fileName = null;
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /belongs in generated TypeScript, not technical YAML/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('Carousel draft rejects unsupported children without writing anything', () =>
  fixture(f => {
    f.config.section.items.intro.content.items.gallery.slides.items.first.type = 'text';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /Carousel slides must be image or scene/);
    assert.equal(fs.existsSync(f.generated('sections/intro/gallery/index.ts')), false);
  }));

test('Lesson Review draft and Studio stage names match the Engine camelCase contract', () => {
  const source = fs.readFileSync(new URL('../../types/review.types.ts', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('review.types.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = ast.statements.find(
    statement => ts.isTypeAliasDeclaration(statement) && statement.name.text === 'LessonReviewStage',
  );
  assert.ok(declaration);
  assert.ok(ts.isUnionTypeNode(declaration.type));
  const stages = declaration.type.types.map(member => {
    assert.ok(ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal));
    return member.literal.text;
  });
  assert.deepEqual(stages, lessonReviewStageSlugs);
  assert.equal(new Set(stages).size, stages.length);
  for (const language of ['uk', 'en', 'qm']) {
    const pending = renderReviewDraft(language);
    const fields = [...pending.matchAll(/^    ([A-Za-z]+): \{ pr: 0, language: "[a-z]+" \},$/gm)].map(m => m[1]);
    assert.deepEqual(fields, stages);
    assert.match(pending, /^const lessonReview = \{$/m);
    assert.match(pending, /^    locales: 0,$/m);
    assert.match(pending, /^    acceptance: 0,$/m);
    assert.doesNotMatch(pending, /scientific:|export const|\bstages:/);
    assert.deepEqual(ts.createSourceFile('review.ts', pending, ts.ScriptTarget.Latest, true).parseDiagnostics, []);
    assert.deepEqual(reviewTypeDiagnostics(pending), []);
    assert.equal(scanSource('content/math/data/lessons/c/id/review.ts', pending).length, 13);
  }
  assert(reviewTypeDiagnostics(renderReviewDraft('notALanguage')).some(d => /not assignable/.test(d)));
});

test('review.ts starts with valid unreviewed evidence and is not overwritten', () =>
  fixture(f => {
    const result = runOne(f.lesson, 'generate', f.root);
    assert(result.files.includes('review.ts'));
    const file = f.generated('review.ts');
    const pending = fs.readFileSync(file, 'utf8');
    assert.match(pending, /^\/\/ TODO \(BLOCKER\): Conduct review/);
    assert.match(pending, /import type \{ LessonReview \} from '@svitlo\/engine\/build'/);
    assert.match(pending, /experienceReview: \{ pr: 0, language: "uk" \}/);
    assert.match(pending, /methodologyReview: \{ pr: 0, language: "uk" \}/);
    assert.match(pending, /generateSources: \{ pr: 0, language: "uk" \}/);
    assert.match(pending, /resourceProduction: \{ pr: 0, language: "uk" \}/);
    assert.match(pending, /acceptance: 0/);
    assert.match(pending, /locales: \{\}/);
    assert.doesNotMatch(pending, /scientific:|export const|review_/);
    assert.equal(ts.createSourceFile('review.ts', pending, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0);
    assert.deepEqual(reviewTypeDiagnostics(pending), []);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    const edited = pending.replace('acceptance: 0,', 'acceptance: 123,');
    fs.writeFileSync(file, edited);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(file, 'utf8'), edited);
    fs.unlinkSync(file);
    assert.throws(() => runOne(f.lesson, 'check', f.root), /missing Lesson review record/);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
  }));

test('orphan review.ts blocks new scaffold creation', () =>
  fixture(f => {
    fs.writeFileSync(f.generated('review.ts'), 'const manual = {};\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /incomplete Lesson source tree/);
    assert(!fs.existsSync(f.generated('index.ts')));
  }));

test('Skill IDs resolve to imported source symbols rather than hard-coded UUIDs', () =>
  fixture(f => {
    const skillId = id(99);
    const folder = path.join(f.workspace, 'data/skills/algebra/example/skills');
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(
      path.join(folder, 'example.data.ts'),
      "import { defineSkill } from '@svitlo/engine/build';\n" +
        "export const example_Skill_Data = defineSkill({ id: '" +
        skillId +
        "', slug: 'example' });\n",
    );
    f.config.skills = [skillId];
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert.match(
      code,
      /import \{ example_Skill_Data \} from "\.\.\/\.\.\/\.\.\/skills\/algebra\/example\/skills\/example\.data"/,
    );
    assert.match(code, /skills: \[example_Skill_Data\.id\]/);
    assert.doesNotMatch(code, new RegExp(skillId));
  }));

test('canonical .ts Skill sources resolve and test modules do not create duplicate Skill UUIDs', () =>
  fixture(f => {
    const skillId = id(98);
    const folder = path.join(f.workspace, 'data/skills/observingTheSky/observationPractice');
    fs.mkdirSync(folder, { recursive: true });
    const skillSource =
      "import { defineSkill } from '@svitlo/engine/build';\n" +
      "export const safeSolarObservation = defineSkill({ id: '" +
      skillId +
      "', slug: 'safeSolarObservation' });\n";
    fs.writeFileSync(path.join(folder, 'safeSolarObservation.ts'), skillSource);
    fs.writeFileSync(path.join(folder, 'safeSolarObservation.spec.ts'), skillSource);
    f.config.skills = [skillId];
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert(
      code.includes(
        'import { safeSolarObservation } from "../../../skills/observingTheSky/observationPractice/safeSolarObservation"',
      ),
    );
    assert(code.includes('skills: [safeSolarObservation.id]'));
    assert.doesNotMatch(code, new RegExp(skillId));
  }));

test('canonical .ts Skill files resolve to real symbols without a .data suffix', () =>
  fixture(f => {
    const skillId = id(100);
    const folder = path.join(f.workspace, 'data/skills/earthMoonAndSun/lunarAppearance');
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(
      path.join(folder, 'lunarPhases.ts'),
      "import { defineSkill } from '@svitlo/engine/build';\n" +
        "export const lunarPhases = defineSkill({ id: '" +
        skillId +
        "', slug: 'lunarPhases' });\n",
    );
    f.config.skills = [skillId];
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert.ok(
      code.includes('import { lunarPhases } from "../../../skills/earthMoonAndSun/lunarAppearance/lunarPhases";'),
    );
    assert.match(code, /skills: \[lunarPhases\.id\]/);
    assert.doesNotMatch(code, new RegExp(skillId));
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
  }));

test('unknown Skill UUID produces a deterministic unresolved dependency instead of an invented import', () =>
  fixture(f => {
    f.config.skills = [id(88)];
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /Unresolved Skill ID/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('rejects embedded banks without generating Lesson modules or changing sibling YAML files', () =>
  fixture(f => {
    fs.writeFileSync(f.generated('questions.yaml'), '# independent editorial source\n');
    fs.writeFileSync(f.generated('flashcards.yaml'), '# independent editorial source\n');
    f.config.questions = { selectOneAnswer: {} };
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /lesson.yaml:config.questions: embedded banks/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
    delete f.config.questions;
    f.config.flashcards = { items: {} };
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /lesson.yaml:config.flashcards: embedded banks/);
    delete f.config.flashcards;
    f.save();
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, undefined);
    assert.equal(fs.readFileSync(f.generated('questions.yaml'), 'utf8'), '# independent editorial source\n');
    assert.equal(fs.readFileSync(f.generated('flashcards.yaml'), 'utf8'), '# independent editorial source\n');
    assert.equal(fs.existsSync(f.generated('questions')), false);
    assert.equal(fs.existsSync(f.generated('flashcards')), false);
  }));

test('existing independent assessment TypeScript directories do not block Lesson scaffolding', () =>
  fixture(f => {
    for (const kind of ['questions', 'flashcards']) {
      fs.mkdirSync(f.generated(kind));
      fs.writeFileSync(f.generated(kind + '/index.ts'), 'export const keep = true;\n');
    }
    const result = runOne(f.lesson, 'generate', f.root);
    assert(result.changed > 0);
    for (const kind of ['questions', 'flashcards'])
      assert.equal(fs.readFileSync(f.generated(kind + '/index.ts'), 'utf8'), 'export const keep = true;\n');
  }));

test('old technical config.yaml is rejected when supplied explicitly', () =>
  fixture(f => {
    fs.renameSync(f.generated('lesson.yaml'), f.generated('config.yaml'));
    assert.throws(() => runOne(f.generated('config.yaml'), 'generate', f.root), /Expected lesson.yaml source/);
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /legacy technical Lesson source/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('Quest uses distinct stages/tasks namespaces and their nested media remain separate modules', () =>
  fixture(f => {
    const media = (type, slug, n) => ({ id: id(n), slug, type, params: {}, locale: {} });
    f.config.section.items.quest = {
      id: id(20),
      slug: 'quest',
      type: 'quest',
      params: {},
      stages: {
        start: {
          id: id(21),
          slug: 'start',
          type: 'questStage',
          content: {
            video: { medium: media('video', 'medium', 22), small: media('video', 'small', 23) },
            audio: { dialogue: media('audio', 'dialogue', 24), narration: null, background: null },
            image: media('image', 'image', 25),
            subtitles: media('subtitles', 'subtitles', 26),
          },
        },
      },
      tasks: {
        start: { id: id(27), slug: 'start', type: 'questTask', scene: media('scene', 'taskScene', 28) },
      },
    };
    f.config.section.order.push('quest');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const files = readAll(f.lesson);
    for (const name of [
      'sections/quest/stages/start/index.ts',
      'sections/quest/tasks/start/index.ts',
      'sections/quest/stages/start/video/medium/index.ts',
      'sections/quest/stages/start/audio/dialogue/index.ts',
      'sections/quest/tasks/start/taskScene/index.ts',
    ])
      assert.ok(files.has(name), name);
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
      changed: 0,
      skipped: true,
      files: ['index.ts'],
      lessonId,
    });
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    f.config.locale.title.uk = 'Змінено';
    f.save();
    assert.throws(() => runOne(f.lesson, 'check', f.root), /stale or manually edited draft/);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(f.generated('index.ts'), 'utf8'), before);
    fs.writeFileSync(path.join(f.lesson, 'lesson.yaml'), 'invalid: [');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
  }));

test('check refuses manual source modifications and missing nested modules', () =>
  fixture(f => {
    runOne(f.lesson, 'generate', f.root);
    const file = f.generated('sections/intro/prompt/index.ts');
    fs.appendFileSync(file, '// manually edited\n');
    assert.throws(() => runOne(f.lesson, 'check', f.root), /stale or manually edited draft/);
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
    const staged = path.join(f.workspace, 'staging/lesson.yaml');
    fs.mkdirSync(path.dirname(staged), { recursive: true });
    const document = yaml.parse(fs.readFileSync(f.generated('lesson.yaml'), 'utf8'));
    const second = id(45);
    document.config.id = second;
    fs.writeFileSync(staged, yaml.stringify(document));
    const result = runOne(staged, 'generate', f.root);
    assert.equal(result.lessonId, second);
    assert.ok(fs.existsSync(path.join(f.workspace, 'data/lessons', second.at(-1), second, 'index.ts')));
  }));

test('co-locates Scene/media production handoffs with their slug modules', () =>
  fixture(f => {
    const sceneId = id(51);
    const imageId = id(52);
    f.config.__production = { methodology: '# Lesson method\n\nPractice equal groups.' };
    f.config.section.items.intro.content.items.visualScene = {
      id: sceneId,
      slug: 'visualScene',
      type: 'scene',
      __production: {
        specification: '# Scene specification\n\nCompare the groups.',
      },
    };
    f.config.section.items.intro.content.items.visualImage = {
      id: imageId,
      slug: 'visualImage',
      type: 'image',
      locale: {},
      __production: { purpose: 'Show equality', prompt: 'Two groups of counters.' },
    };
    f.save();
    runOne(f.lesson, 'generate', f.root);
    assert.match(
      fs.readFileSync(f.generated('sections/intro/visualScene/specification.md'), 'utf8'),
      /Compare the groups/,
    );
    assert.match(fs.readFileSync(f.generated('sections/intro/visualImage/specification.md'), 'utf8'), /Two groups/);
    assert(!fs.existsSync(path.join(f.workspace, 'scenes', sceneId.at(-1), sceneId, 'specification.md')));
    assert(!fs.existsSync(path.join(f.workspace, 'data/assets', imageId.at(-1), imageId, 'specification.md')));
    const imageModule = fs.readFileSync(f.generated('sections/intro/visualImage/index.ts'), 'utf8');
    assert.match(imageModule, /import \{ defineImage \} from '@svitlo\/engine\/build'/);
    assert.match(imageModule, /fileName: "00000000-0000-0000-0000-000000000000.webp"/);
    assert.match(fs.readFileSync(f.generated('methodology.md'), 'utf8'), /Lesson method/);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
  }));

test('all media kinds and Video posters receive statically generated placeholders', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.videoExplanation = {
      id: id(81),
      slug: 'videoExplanation',
      type: 'video',
      params: {},
      locale: { label: { uk: 'Відеопояснення' } },
      __production: { purpose: 'Visual guidance', script: 'Two groups' },
    };
    items.localAudio = { id: id(82), slug: 'localAudio', type: 'audio', params: {}, locale: { title: { uk: 'Звук' } } };
    items.localCaptions = { id: id(83), slug: 'localCaptions', type: 'subtitles', params: {}, locale: {} };
    items.localPicture = {
      id: id(84),
      slug: 'localPicture',
      type: 'image',
      params: { fill: true, aspectRatio: 1.5 },
      locale: { alt: { uk: 'Картинка' } },
    };
    f.config.section.items.intro.content.order.push('videoExplanation', 'localAudio', 'localCaptions', 'localPicture');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const read = name => fs.readFileSync(f.generated('sections/intro/' + name + '/index.ts'), 'utf8');
    const media = [
      ['videoExplanation', 'mp4'],
      ['localAudio', 'mp3'],
      ['localCaptions', 'vtt'],
      ['localPicture', 'webp'],
    ];
    for (const [name, extension] of media) {
      const content = read(name);
      assert(content.includes('fileName: "00000000-0000-0000-0000-000000000000.' + extension + '"'));
      assert.match(content, /TODO\(asset\)/);
    }
    const video = read('videoExplanation');
    assert(video.includes('posterFileName: "00000000-0000-0000-0000-000000000000.webp"'));
    assertTypeScriptSyntax(readAll(f.lesson));
    assert(fs.existsSync(f.generated('sections/intro/videoExplanation/specification.md')));
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

test('rejects traversing collection names before writing modules', () =>
  fixture(f => {
    f.config.section.items.intro.content.items.prompt.slug = '../escape';
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /unsafe or missing camelCase slug/);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
    assert.equal(fs.existsSync(path.join(f.root, 'escape')), false);
  }));

test('reserved JavaScript keywords remain safe as authored ContentBlock slugs', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    const prompt = items.prompt;
    delete items.prompt;
    items.default = { ...prompt, slug: 'default' };
    f.config.section.items.intro.content.order = f.config.section.items.intro.content.order.map(name =>
      name === 'prompt' ? 'default' : name,
    );
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const code = fs.readFileSync(f.generated('sections/intro/default/index.ts'), 'utf8');
    assert.match(code, /export const item_default = defineText<"default", LessonLanguages>/);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('materializes invariant Markdown in markdown.md and Code in code.py beside their definitions', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.equalityRule = {
      id: id(71),
      slug: 'equalityRule',
      type: 'markdown',
      params: {},
      locale: { value: '# Equal values\n\n**2 + 3 = 5**.\n' },
      __production: { specification: 'Do not generate this instead of real copy.' },
    };
    items.pythonExample = {
      id: id(72),
      slug: 'pythonExample',
      type: 'code',
      params: { language: 'python', codeAsText: 'print(2 + 3 == 5)\n' },
      locale: {},
      __production: { specification: 'Do not create code.specification.md.' },
    };
    f.config.section.items.intro.content.order.push('equalityRule', 'pythonExample');
    f.save();
    const result = runOne(f.lesson, 'generate', f.root);
    const markdown = 'sections/intro/equalityRule/markdown.md';
    const code = 'sections/intro/pythonExample/code.py';
    assert(result.files.includes(markdown));
    assert(result.files.includes(code));
    assert.equal(fs.readFileSync(f.generated(markdown), 'utf8'), '# Equal values\n\n**2 + 3 = 5**.\n');
    assert.equal(fs.readFileSync(f.generated(code), 'utf8'), 'print(2 + 3 == 5)\n');
    const markdownModule = fs.readFileSync(f.generated('sections/intro/equalityRule/index.ts'), 'utf8');
    assert.match(markdownModule, /locale: \{\s*value: readMarkdown\(import\.meta\.url\)/);
    assert.match(markdownModule, /import \{ defineMarkdown, readMarkdown \} from '@svitlo\/engine\/build'/);
    assert.doesNotMatch(markdownModule, /files:/);
    const codeModule = fs.readFileSync(f.generated('sections/intro/pythonExample/index.ts'), 'utf8');
    assert.match(codeModule, /import \{ defineCode, readCodeSource \} from '@svitlo\/engine\/build'/);
    assert.match(codeModule, /codeAsText: readCodeSource\(import\.meta\.url, "py"\)/);
    assert.doesNotMatch(codeModule, /print\(2 \+ 3/);
    assertTypeScriptSyntax(readAll(f.lesson));
    assert.equal(result.changed, readAll(f.lesson).size + 2);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assert(!result.files.some(name => name.endsWith('specification.md') && /equalityRule|pythonExample/.test(name)));
  }));

test('localized Markdown creates only source-language uk.md beside its module, without a fallback', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.sourceExplanation = {
      id: id(73),
      slug: 'sourceExplanation',
      type: 'markdown',
      params: {},
      locale: { value: { uk: '# Значення рівні\n', en: '# Equal values\n' } },
    };
    f.config.section.items.intro.content.order.push('sourceExplanation');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const base = 'sections/intro/sourceExplanation/';
    assert.equal(fs.readFileSync(f.generated(base + 'uk.md'), 'utf8'), '# Значення рівні\n');
    assert(!fs.existsSync(f.generated(base + 'en.md')));
    assert(!fs.existsSync(f.generated(base + 'markdown.md')));
    const rendered = fs.readFileSync(f.generated(base + 'index.ts'), 'utf8');
    assert.match(rendered, /value: readMarkdown\(import\.meta\.url, \["uk"\]\)/);
    assert.doesNotMatch(rendered, /files:/);
    assert.doesNotMatch(rendered, /# Значення рівні|# Equal values/);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('read-only checks reject modified Markdown/Code while generate skips existing root', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.explanation = {
      id: id(74),
      slug: 'explanation',
      type: 'markdown',
      params: {},
      locale: { value: '# Original text\n' },
    };
    f.config.section.items.intro.content.order.push('explanation');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const file = f.generated('sections/intro/explanation/markdown.md');
    fs.writeFileSync(file, '# Human revision\n');
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assert.equal(fs.readFileSync(file, 'utf8'), '# Human revision\n');
    assert.throws(() => runOne(f.lesson, 'check', f.root), /authored source differs from lesson.yaml/);
  }));

test('existing Markdown source blocks all new TS writes instead of being overwritten', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.explanation = {
      id: id(77),
      slug: 'explanation',
      type: 'markdown',
      params: {},
      locale: { value: '# Authored in YAML\n' },
    };
    f.config.section.items.intro.content.order.push('explanation');
    f.save();
    const sourceFile = f.generated('sections/intro/explanation/markdown.md');
    fs.mkdirSync(path.dirname(sourceFile), { recursive: true });
    fs.writeFileSync(sourceFile, '# Previously edited by a human\n');
    assert.throws(
      () => runOne(f.lesson, 'generate', f.root),
      /incomplete Lesson source tree; refusing to mix drafts with existing files/,
    );
    assert.equal(fs.readFileSync(sourceFile, 'utf8'), '# Previously edited by a human\n');
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('invalid Code extension and empty Markdown never create an index.ts draft', () =>
  fixture(f => {
    const items = f.config.section.items.intro.content.items;
    items.invalidCode = {
      id: id(75),
      slug: 'invalidCode',
      type: 'code',
      params: { language: '../../etc', codeAsText: 'print("hi")' },
      locale: {},
    };
    f.config.section.items.intro.content.order.push('invalidCode');
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /Unsupported authored Code language/);
    assert(!fs.existsSync(f.generated('index.ts')));
    delete items.invalidCode;
    f.config.section.items.intro.content.order.pop();
    items.blank = { id: id(76), slug: 'blank', type: 'markdown', params: {}, locale: { value: '  ' } };
    f.config.section.items.intro.content.order.push('blank');
    f.save();
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /Empty authored Markdown source/);
    assert(!fs.existsSync(f.generated('index.ts')));
  }));

test('CLI discovers Lesson configs, generates safely, and reports SKIP', () =>
  fixture(f => {
    const messages = [];
    const old = console.log;
    try {
      console.log = value => messages.push(value);
      main(['generate', '--source', path.relative(f.root, f.lesson)], f.root);
      main(['generate', '--source', path.relative(f.root, f.lesson)], f.root);
    } finally {
      console.log = old;
    }
    assert(messages.some(x => /file\(s\) written/.test(x)));
    assert(messages.some(x => /SKIP Lesson/.test(x)));
  }));

test('partial YAML remains a partial typed draft, without fabricated language or data fields', () =>
  fixture(f => {
    delete f.config.params;
    delete f.config.section;
    f.save();
    const result = runOne(f.lesson, 'generate', f.root);
    assert.deepEqual(result.files, ['review.ts', 'index.ts']);
    const code = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert.match(code, /defineLesson\(\{/);
    assert.doesNotMatch(code, /params:|section:|flashcards:|questions:/);
    assert.equal(fs.existsSync(f.generated('constants.ts')), false);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('production handoff conflict is diagnosed before writing any source module', () =>
  fixture(f => {
    const sceneId = id(70);
    f.config.section.items.intro.content.items.visualScene = {
      id: sceneId,
      slug: 'visualScene',
      type: 'scene',
      __production: { specification: '# Expected Scene specification' },
    };
    f.save();
    const destination = f.generated('sections/intro/visualScene/specification.md');
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, '# Hand-edited specification\n');
    assert.throws(() => runOne(f.lesson, 'generate', f.root), /incomplete Lesson source tree/);
    assert.throws(() => runOne(f.lesson, 'check', f.root), /refusing to overwrite/);
    assert.equal(fs.readFileSync(destination, 'utf8'), '# Hand-edited specification\n');
    assert.equal(fs.existsSync(f.generated('constants.ts')), false);
    assert.equal(fs.existsSync(f.generated('index.ts')), false);
  }));

test('staged sources require valid UUIDs and reject symlinked canonical destinations', () =>
  fixture(f => {
    const staged = path.join(f.workspace, 'staging/lesson.yaml');
    fs.mkdirSync(path.dirname(staged), { recursive: true });
    const doc = yaml.parse(fs.readFileSync(f.generated('lesson.yaml'), 'utf8'));
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

test('Checkpoint question and answer may reuse a block slug without file collisions', () =>
  fixture(f => {
    const checkpointItem = f.config.section.items.intro.content.items.check.content.items.comparison;
    checkpointItem.question.slug = 'text';
    checkpointItem.answer.content.items.correct.slug = 'text';
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const names = [...readAll(f.lesson).keys()];
    assert(names.includes('sections/intro/check/comparison/question/index.ts'));
    assert(!names.some(name => name.includes('/question/text/')));
    assert(names.includes('sections/intro/check/comparison/answer/text/index.ts'));
    assert(names.includes('sections/intro/check/comparison/answer/index.ts'));
    const answerSource = fs.readFileSync(f.generated('sections/intro/check/comparison/answer/index.ts'), 'utf8');
    assert.match(answerSource, /defineCheckpointAnswer<"answer", typeof content\.items, LessonLanguages>/);
    const item = fs.readFileSync(f.generated('sections/intro/check/comparison/index.ts'), 'utf8');
    assert.match(item, /from ".\/question"/);
    assert.match(item, /from ".\/answer"/);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('Engine-owned coverage Lesson stays reproducible across YAML, nested modules, and handoffs', () => {
  const fixtureSource = new URL('./fixtures/coverageLesson/lesson.yaml', import.meta.url);
  const authored = fs.readFileSync(fixtureSource, 'utf8');
  const document = yaml.parse(authored);
  const lesson = document.config;
  const sections = lesson.section.order.map(key => lesson.section.items[key].config);
  const directBlocks = sections.flatMap(section => section.content.order.map(key => section.content.items[key].config));
  assert.equal(sections.length, 2);
  assert.deepEqual(
    sections.map(section => section.content.order.length),
    [6, 6],
  );
  assert.deepEqual(
    [...new Set(directBlocks.map(block => block.type))].sort(),
    [
      'audio',
      'carousel',
      'checkpoint',
      'code',
      'image',
      'markdown',
      'scene',
      'subtitles',
      'text',
      'video',
      'youtube',
    ].sort(),
  );
  assert.equal(document.production.documentLanguage, 'en');

  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-engine-coverage-'));
  const workspace = path.join(root, 'content/playground');
  const staged = path.join(workspace, 'staging/coverageLesson/lesson.yaml');
  const output = path.join(workspace, 'data/lessons', lesson.id.at(-1), lesson.id);
  try {
    fs.mkdirSync(path.dirname(staged), { recursive: true });
    fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');
    fs.writeFileSync(staged, authored);

    // The authoring fixture uses a synthetic Skill identity; resolution must
    // still produce an imported symbol, without depending on Mathematics.
    const skills = path.join(workspace, 'data/skills/algebra/equalities/skills');
    fs.mkdirSync(skills, { recursive: true });
    fs.writeFileSync(
      path.join(skills, 'coverage.data.ts'),
      "import { defineSkill } from '@svitlo/engine/build';\n" +
        "export const coverageSkill_Skill_Data = defineSkill({ id: '" +
        lesson.skills[0] +
        "', slug: 'coverageSkill' });\n",
    );

    const first = runOne(staged, 'generate', root);
    assert.equal(first.lessonId, lesson.id);
    assert(first.changed > 20, 'Representative fixture should emit a full module tree');
    const modules = readAll(output);
    for (const name of [
      'index.ts',
      'constants.ts',
      'sections/index.ts',
      'sections/exploreEquality/index.ts',
      'sections/exploreEquality/meaningOfEquality/index.ts',
      'sections/exploreEquality/explainWithMarkdown/index.ts',
      'sections/exploreEquality/compareValuesCode/index.ts',
      'sections/exploreEquality/counterArrangementsCarousel/index.ts',
      'sections/exploreEquality/counterArrangementsCarousel/fiveCountersSlide/index.ts',
      'sections/exploreEquality/counterArrangementsCarousel/threePlusTwoSlide/index.ts',
      'sections/reviewEquality/index.ts',
      'sections/reviewEquality/verifyEquality/index.ts',
      'sections/reviewEquality/verifyEquality/compareFive/index.ts',
      'sections/reviewEquality/verifyEquality/compareFive/question/index.ts',
      'sections/reviewEquality/verifyEquality/compareFive/answer/index.ts',
      'sections/reviewEquality/verifyEquality/compareFive/answer/whyFiveMatches/index.ts',
      'sections/reviewEquality/verifyEquality/compareFive/answer/answerDiagram/index.ts',
    ])
      assert(modules.has(name), 'Missing generated file ' + name);
    assert.match(modules.get('index.ts'), /skills: \[coverageSkill_Skill_Data\.id\]/);
    assert.equal(fs.existsSync(path.join(output, 'questions')), false);
    assert.equal(fs.existsSync(path.join(output, 'flashcards')), false);
    assert.doesNotMatch([...modules.values()].join('\n'), /Scaffolded by|Draft content sha256/);
    assert.match(
      modules.get('sections/reviewEquality/verifyEquality/compareFive/answer/index.ts'),
      /defineCheckpointAnswer<"answer", typeof content\.items, LessonLanguages>/,
    );
    const carouselRoot = 'sections/exploreEquality/counterArrangementsCarousel';
    const imageSlide = modules.get(carouselRoot + '/fiveCountersSlide/index.ts');
    const sceneSlide = modules.get(carouselRoot + '/threePlusTwoSlide/index.ts');
    assert.match(imageSlide, /defineImage<"fiveCountersSlide", LessonLanguages>/);
    assert.match(imageSlide, /fileName: "00000000-0000-0000-0000-000000000000.webp"/);
    assert.match(sceneSlide, /defineScene<"threePlusTwoSlide", LessonLanguages>/);
    assert.match(sceneSlide, /Arrange three counters and two more to show five/);
    const authoredSlides =
      lesson.section.items.exploreEquality.config.content.items.counterArrangementsCarousel.config.slides;
    assert.deepEqual(authoredSlides.order, ['fiveCountersSlide', 'threePlusTwoSlide']);
    assert.deepEqual(
      authoredSlides.order.map(key => authoredSlides.items[key].config.type),
      ['image', 'scene'],
    );
    assert(fs.existsSync(path.join(output, carouselRoot, 'fiveCountersSlide/specification.md')));
    assert(fs.existsSync(path.join(output, carouselRoot, 'threePlusTwoSlide/specification.md')));
    assert(!fs.existsSync(path.join(output, carouselRoot, 'slides')));

    assert(![...modules.keys()].some(name => /\/(?:texts|images|scenes|slides)\//.test(name)));
    assert.equal(
      fs.readFileSync(path.join(output, 'sections/exploreEquality/explainWithMarkdown/en.md'), 'utf8'),
      '## Compare both sides\n\n**3 + 2 = 4 + 1**, because both sides equal **5**.',
    );
    assert.match(
      fs.readFileSync(path.join(output, 'sections/exploreEquality/compareValuesCode/code.ts'), 'utf8'),
      /const left = 3 \+ 2/,
    );
    assert(fs.existsSync(path.join(output, 'sections/exploreEquality/compareGroupsScene/specification.md')));
    assert(fs.existsSync(path.join(output, 'sections/reviewEquality/equalGroupsVideo/specification.md')));
    assert(
      fs.existsSync(
        path.join(output, 'sections/reviewEquality/verifyEquality/compareFive/answer/answerDiagram/specification.md'),
      ),
    );
    assertTypeScriptSyntax(modules);
    assert.equal(runOne(staged, 'check', root).changed, 0);
    assert.equal(runOne(staged, 'generate', root).skipped, true);
    const target = path.join(output, 'sections/exploreEquality/meaningOfEquality/index.ts');
    fs.appendFileSync(target, '\n// Intentional local author edit\n');
    assert.throws(() => runOne(staged, 'check', root), /stale or manually edited draft/);
    assert.equal(runOne(staged, 'generate', root).skipped, true);
    assert.match(fs.readFileSync(target, 'utf8'), /Intentional local author edit/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('groups generated Lesson imports by package, alias and relative dependencies', () =>
  fixture(f => {
    const files = renderLessonModules(f.config, 'uk');
    const alias = `#lessonsData/${lessonId.at(-1)}/${lessonId}/constants`;

    const section = files.get('sections/intro/index.ts');
    assert.ok(
      section.startsWith(
        [
          "import { defineContentSection } from '@svitlo/engine/build';",
          '',
          `import type { LessonLanguages } from "${alias}";`,
          '',
          'import { check } from "./check";',
          'import { gallery } from "./gallery";',
          'import { prompt } from "./prompt";',
          '',
          'const content =',
        ].join('\n'),
      ),
      section,
    );

    const leaf = files.get('sections/intro/prompt/index.ts');
    assert.ok(
      leaf.startsWith(
        [
          "import { defineText } from '@svitlo/engine/build';",
          '',
          `import type { LessonLanguages } from "${alias}";`,
          '',
          'export const prompt =',
        ].join('\n'),
      ),
      leaf,
    );

    const root = files.get('index.ts');
    assert.ok(
      root.startsWith(
        [
          "import { defineLesson } from '@svitlo/engine/build';",
          '',
          'import { section } from "./sections";',
          "import { languages } from './constants';",
          "import type { LessonLanguages } from './constants';",
          '',
          'export const lightLesson =',
        ].join('\n'),
      ),
      root,
    );
    assertTypeScriptSyntax(files);
  }));

test('module rendering is deterministic and retains only source-language authoring', () =>
  fixture(f => {
    const first = renderLessonModules(f.config, 'uk');
    const second = renderLessonModules(f.config, 'uk');
    assert.deepEqual([...first], [...second]);
    for (const [name, source] of first)
      if (name.endsWith('.ts')) assert.doesNotMatch(source, /Scaffolded by|Draft content sha256/);
    assert.doesNotMatch([...first.values()].join('\n'), /Never emit translation/);
    assert.equal(first.has('questions/index.ts'), false);
    assert.equal(first.has('flashcards/index.ts'), false);
  }));

test('PascalCase Scene slug exports distinct Configurator with textbook-local imports', () =>
  fixture(f => {
    const content = f.config.section.items.intro.content;
    content.items.CompareCountersScene = {
      id: id(70),
      slug: 'CompareCountersScene',
      type: 'scene',
      params: {},
      locale: { value: { instruction: { uk: 'Порівняй групи' } } },
    };
    content.order.push('CompareCountersScene');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const scene = fs.readFileSync(f.generated('sections/intro/CompareCountersScene/index.ts'), 'utf8');
    assert.match(scene, /export const CompareCountersSceneConfig = defineScene/);
    assert.match(scene, /#lessonsData\/2\/00000000-0000-4000-8000-000000000012\/constants/);
    assert.match(fs.readFileSync(f.generated('sections/intro/index.ts'), 'utf8'), /CompareCountersSceneConfig/);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('Lesson root exports reject reserved identifiers rather than producing invalid TypeScript', () =>
  fixture(f => {
    for (const slug of ['class', 'languages', 'defineLesson']) {
      assert.throws(
        () => renderLessonModules({ ...f.config, slug }, 'uk'),
        /reserved or invalid Lesson export identifier/,
      );
    }
  }));

test('unfinished assessment Sections remain enabled, typed and ordered while YAML handoffs retain their approved source', () =>
  fixture(f => {
    const make = (slug, number, type) => ({
      id: id(number),
      slug,
      type,
      params: {},
      locale: { title: { uk: 'Перевірка' }, navigationLabel: { uk: 'Почати' } },
      content: group({ opening: block('opening', number + 20, 'Авторський текст зберігається.') }),
    });
    f.config.section.items.quizOne = make('quizOne', 50, 'quiz');
    f.config.section.items.cardsOne = make('cardsOne', 51, 'flashcards');
    f.config.section.items.quizTwo = make('quizTwo', 52, 'quiz');
    f.config.section.items.cardsTwo = make('cardsTwo', 53, 'flashcards');
    f.config.section.order = ['cardsOne', 'intro', 'quizOne', 'quizTwo', 'cardsTwo'];
    f.config.__production = { quizRequired: true, flashcardsRequired: true };
    f.config.params.quizRequiredForCompletion = true;
    f.save();
    const original = fs.readFileSync(f.generated('lesson.yaml'));
    const generated = runOne(f.lesson, 'generate', f.root);
    const files = readAll(f.lesson);
    const root = files.get('index.ts');
    assert.match(root, /quizRequiredForCompletion: true/);
    assert.match(files.get('sections/index.ts'), /"cardsOne"/);
    const sectionIndex = files.get('sections/index.ts');
    for (const slug of ['cardsOne', 'intro', 'quizOne', 'quizTwo', 'cardsTwo'])
      assert.ok(sectionIndex.includes('"' + slug + '"'), 'preserved order includes ' + slug);
    assert.deepEqual(
      [...sectionIndex.matchAll(/"((?:cards|quiz)(?:One|Two)|intro)"/g)].map(match => match[1]),
      ['cardsOne', 'intro', 'quizOne', 'quizTwo', 'cardsTwo'],
    );
    for (const [slug, type, number] of [
      ['quizOne', 'quiz', 50],
      ['cardsOne', 'flashcards', 51],
      ['quizTwo', 'quiz', 52],
      ['cardsTwo', 'flashcards', 53],
    ]) {
      const section = files.get('sections/' + slug + '/index.ts');
      assert.ok(section, 'Missing typed Section ' + slug);
      assert.match(section, new RegExp('id: "' + id(number) + '"'));
      assert.match(section, /Авторський текст зберігається|const content =/);
      assert.match(section, /TODO \(BLOCKER\):/);
      assert.ok(scanSource('sections/' + slug + '/index.ts', section).length >= 2);
      assert.match(section, type === 'quiz' ? /defineQuizSection/ : /defineFlashcardsSection/);
      assert.match(section, /feedc0de-[0-9a-f]{4}-8[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}/);
    }
    assert.equal((root.match(/TODO \(BLOCKER\):/g) ?? []).length, 4);
    assert.equal(scanSource('index.ts', root).length, 4);
    for (const [filename, names] of [
      ['questions.yaml', ['quizOne', 'quizTwo']],
      ['flashcards.yaml', ['cardsOne', 'cardsTwo']],
    ]) {
      const draft = yaml.parse(fs.readFileSync(f.generated(filename), 'utf8'));
      assert.deepEqual(draft.sectionDrafts.order, names);
      assert.equal(draft.sectionDrafts.items[names[0]].config.id, f.config.section.items[names[0]].id);
      assert.equal(
        draft.sectionDrafts.items[names[0]].config.content.items.opening.config.locale.value.uk,
        'Авторський текст зберігається.',
      );
      assert.ok(generated.files.includes(filename));
    }
    assert.equal(fs.readFileSync(f.generated('lesson.yaml')).equals(original), true);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assertTypeScriptSyntax(files);
  }));

test('required but not-yet-authored Quiz gets deterministic Section identity and retains completion gate', () =>
  fixture(f => {
    f.config.params.quizRequiredForCompletion = true;
    f.config.__production = { quizRequired: true };
    f.save();
    runOne(f.lesson, 'generate', f.root);
    const root = fs.readFileSync(f.generated('index.ts'), 'utf8');
    assert.match(root, /quizRequiredForCompletion: true/);
    assert.equal(scanSource('index.ts', root).length, 1);
    const section = fs.readFileSync(f.generated('sections/assessmentQuiz/index.ts'), 'utf8');
    const expectedId = pendingAssessmentUuid(lessonId, 'quiz', 'assessmentQuiz', 'section-id');
    const expectedQuestionId = pendingAssessmentUuid(lessonId, 'quiz', 'assessmentQuiz', 'questionIds');
    assert.ok(section.includes(expectedId));
    assert.ok(section.includes(expectedQuestionId));
    assert.match(section, /TODO \(BLOCKER\): Generated Section UUID/);
    assert.match(section, /TODO \(BLOCKER\): Provisional assessment/);
    assert.deepEqual(yaml.parse(fs.readFileSync(f.generated('questions.yaml'), 'utf8')).sectionDrafts.order, [
      'assessmentQuiz',
    ]);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assert.equal(runOne(f.lesson, 'generate', f.root).skipped, true);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('fully specified Flashcards Section remains in the ordinary Section collection', () =>
  fixture(f => {
    f.config.section.items.cards = {
      id: id(50),
      slug: 'cards',
      type: 'flashcards',
      params: { selection: { flashcardIds: [id(60)] } },
      locale: { title: { uk: 'Картки' }, navigationLabel: { uk: 'Почати' } },
      content: group({ opening: block('opening', 51, 'Пригадай.') }),
    };
    f.config.section.order.push('cards');
    f.save();
    runOne(f.lesson, 'generate', f.root);
    assert.equal(fs.existsSync(f.generated('sections/cards/index.ts')), true);
    assert.equal(fs.existsSync(f.generated('flashcards.yaml')), false);
    assert.match(fs.readFileSync(f.generated('sections/index.ts'), 'utf8'), /"cards"/);
  }));

test('no assessment requirement creates neither bank YAML nor assessment blocker', () =>
  fixture(f => {
    runOne(f.lesson, 'generate', f.root);
    assert.equal(fs.existsSync(f.generated('questions.yaml')), false);
    assert.equal(fs.existsSync(f.generated('flashcards.yaml')), false);
    assert.doesNotMatch(fs.readFileSync(f.generated('index.ts'), 'utf8'), /Quiz Section|Flashcards Section/);
  }));

test('provisional assessment UUIDs are deterministic, unique, Zod-format UUIDv8, and reserved', () => {
  const one = pendingAssessmentUuid(lessonId, 'quiz', 'assessmentQuiz', 'questionIds');
  const section = pendingAssessmentUuid(lessonId, 'quiz', 'assessmentQuiz', 'section-id');
  const other = pendingAssessmentUuid(lessonId, 'flashcards', 'assessmentFlashcards', 'flashcardIds');
  assert.equal(one, pendingAssessmentUuid(lessonId, 'quiz', 'assessmentQuiz', 'questionIds'));
  assert.equal(new Set([one, section, other]).size, 3);
  for (const value of [one, section, other])
    assert.match(value, /^feedc0de-[0-9a-f]{4}-8[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}$/);
});

test('a required Flashcards Section without an approved identity is generated once, in order', () =>
  fixture(f => {
    f.config.__production = { flashcardsRequired: true };
    f.save();
    const accepted = fs.readFileSync(f.generated('lesson.yaml'));
    runOne(f.lesson, 'generate', f.root);
    const sections = fs.readFileSync(f.generated('sections/index.ts'), 'utf8');
    assert.match(sections, /"assessmentFlashcards"/);
    const section = fs.readFileSync(f.generated('sections/assessmentFlashcards/index.ts'), 'utf8');
    assert.match(section, /defineFlashcardsSection/);
    assert.match(section, /PENDING FLASHCARDS/);
    assert.match(section, /flashcardIds/);
    assert.match(section, /TODO \(BLOCKER\): Provisional assessment/);
    assert.equal(fs.readFileSync(f.generated('lesson.yaml')).equals(accepted), true);
    assert.equal(runOne(f.lesson, 'check', f.root).changed, 0);
    assertTypeScriptSyntax(readAll(f.lesson));
  }));

test('negative requirements do not create assessment Sections or synthetic bank resources', () =>
  fixture(f => {
    f.config.__production = { quizRequired: false, flashcardsRequired: false };
    f.save();
    runOne(f.lesson, 'generate', f.root);
    assert.ok(!fs.existsSync(f.generated('sections/assessmentQuiz/index.ts')));
    assert.ok(!fs.existsSync(f.generated('sections/assessmentFlashcards/index.ts')));
    assert.equal(fs.existsSync(f.generated('questions.yaml')), false);
    assert.equal(fs.existsSync(f.generated('flashcards.yaml')), false);
    assert.ok(!fs.existsSync(f.generated('questions/index.ts')));
    assert.ok(!fs.existsSync(f.generated('flashcards/index.ts')));
  }));

test('an authored complete Quiz remains untouched and no placeholder handoff is produced', () => {
  const doc = { config: lessonConfig(), production: { quizRequired: true, documentLanguage: 'uk' } };
  doc.config.section.items.quiz = {
    id: id(101),
    slug: 'quiz',
    type: 'quiz',
    locale: { title: 'Quiz', navigationLabel: 'Quiz' },
    content: { items: {}, order: [] },
    params: {
      selection: { mode: 'all', questionIds: [id(102)] },
      layout: { mode: 'stack' },
      feedbackMode: 'after-completion',
      interaction: {
        retries: 0,
        showErrors: false,
        showCorrectAnswers: false,
        allowExplanations: false,
        allowDeferring: false,
        allowQuestionNavigation: false,
        skippable: false,
      },
      results: { visibility: 'hidden', showScore: false },
    },
  };
  doc.config.section.order.push('quiz');
  const normalized = wrap(doc.config);
  const result = prepareAssessmentDraft({
    config: normalized.config,
    production: doc.production,
  });
  assert.deepEqual(result.lesson.section.items.quiz.config, doc.config.section.items.quiz);
  assert.deepEqual(result.lesson.section.order, ['intro', 'quiz']);
  assert.deepEqual(result.pending, []);
  assert.equal(result.drafts.size, 0);
});

test('pending Quiz and Flashcards Section drafts pass actual Engine Props and read-only Lesson Markdown CLI', async () => {
  const config = lessonConfig();
  config.params.languages = ['uk'];
  config.params.quizRequiredForCompletion = true;
  config.locale.title = { uk: 'Світло' };
  config.section = { items: {}, order: [] };
  const document = {
    config,
    production: { quizRequired: true, flashcardsRequired: true, documentLanguage: 'uk' },
  };
  const prepared = prepareAssessmentDraft(document);
  const quiz = defineQuizSection(prepared.lesson.section.items.assessmentQuiz.config);
  const flashcards = defineFlashcardsSection(prepared.lesson.section.items.assessmentFlashcards.config);
  const authored = defineLesson({
    ...prepared.lesson,
    section: {
      items: { assessmentQuiz: quiz, assessmentFlashcards: flashcards },
      order: prepared.lesson.section.order,
    },
  });
  const publication = authored.build.props({ languages: ['uk'] });
  const resolved = assembleLessonProps(publication, 'uk');
  assert.equal(resolved.params.quizRequiredForCompletion, true);
  assert.deepEqual(
    resolved.section.map(section => section.type),
    ['quiz', 'flashcards'],
  );
  assert.equal(resolved.section[0].params.selection.questionIds.length, 1);
  assert.equal(resolved.section[1].params.selection.flashcardIds.length, 1);
  assert.ok(resolved.section[0].params.selection.questionIds[0].startsWith('feedc0de-'));
  const markdown = renderLessonMarkdown({
    lesson: resolved,
    locale: 'uk',
    languages: ['uk'],
    packagePath: 'content/playground',
    sourceFiles: { files: [] },
    sourceRef: 'test',
  });
  assert.match(markdown, /PENDING QUIZ/);
  assert.match(markdown, /PENDING FLASHCARDS/);
  assert.match(markdown, /feedc0de-/);
  assert.match(markdown, /Question UUIDs/);

  // Exercise the actual read-only Markdown generator, not only its renderer.
  // The loader is injected solely to avoid executing code from an unfinished
  // source draft; all discovery, locale/Props assembly and rendering paths run.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-pending-lesson-markdown-'));
  try {
    const schema = path.join(root, 'shared/engine/schemas/languages.schemas.ts');
    fs.mkdirSync(path.dirname(schema), { recursive: true });
    fs.copyFileSync(path.join(repoRoot, 'shared/engine/schemas/languages.schemas.ts'), schema);
    const lessonDirectory = path.join(root, 'content/playground/data/lessons', lessonId.at(-1), lessonId);
    fs.mkdirSync(lessonDirectory, { recursive: true });
    fs.writeFileSync(path.join(root, 'content/playground/package.json'), '{"name":"@svitlo/playground"}');
    fs.writeFileSync(path.join(lessonDirectory, 'index.ts'), '// Unfinished source is intentionally not executed.\n');
    const sourceMarkdown = await generateLessonMarkdown(
      { package: 'content/playground', lesson: lessonId, locale: 'uk', stdout: true },
      { root, loader: async () => authored },
    );
    assert.match(sourceMarkdown, /PENDING QUIZ/);
    assert.match(sourceMarkdown, /PENDING FLASHCARDS/);
    assert.match(sourceMarkdown, /feedc0de-/);
    assert.equal(fs.existsSync(path.join(root, '.agent-ci-artifacts')), false);
    assert.equal(
      fs.readdirSync(lessonDirectory).join(','),
      'index.ts',
      'Read-only Markdown must not modify the source tree',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('even with real Question IDs, missing mandatory Section labels/content remain visibly blocked', () => {
  const config = lessonConfig();
  config.section.items.quizPending = {
    id: id(103),
    slug: 'quizPending',
    type: 'quiz',
    params: {
      selection: { mode: 'all', questionIds: [id(104)] },
      layout: { mode: 'stack' },
      feedbackMode: 'after-completion',
      interaction: {
        retries: 1,
        showErrors: true,
        showCorrectAnswers: false,
        allowExplanations: true,
        allowDeferring: false,
        allowQuestionNavigation: true,
        skippable: false,
      },
      results: { visibility: 'after-review', showScore: true },
    },
  };
  config.section.order.push('quizPending');
  const original = wrap(config);
  const draft = prepareAssessmentDraft({
    config: original.config,
    production: { documentLanguage: 'uk' },
  });
  assert.deepEqual(draft.lesson.section.order, ['intro', 'quizPending']);
  const pending = draft.lesson.section.items.quizPending.config;
  assert.deepEqual(pending.params.selection.questionIds, [id(104)]);
  assert.equal(pending.locale.title, 'PENDING QUIZ');
  assert.equal(pending.locale.navigationLabel, 'PENDING QUIZ');
  assert.deepEqual(pending.content, { items: {}, order: [] });
  assert.ok(draft.pending.some(item => item.slug === 'quizPending'));
  assert.ok(draft.pending[0].provisionalFields.includes('$.locale.title'));
  assert.deepEqual(original.config.section.items.quizPending.config.locale, undefined);
});

test('do not silently infer approved ordering for nested Section ContentBlocks', () => {
  const config = lessonConfig();
  config.section.items.quizPending = {
    id: id(105),
    slug: 'quizPending',
    type: 'quiz',
    params: {},
    locale: { title: 'Quiz', navigationLabel: 'Quiz' },
    content: { items: { screen: block('screen', 106) } },
  };
  config.section.order.push('quizPending');
  assert.throws(
    () =>
      prepareAssessmentDraft({
        config: wrap(config).config,
        production: { documentLanguage: 'uk', quizRequired: true },
      }),
    /Approved assessment content.order missing/,
  );
});

test('missing source-language assessment labels retain approved other-language labels', () => {
  const config = lessonConfig();
  config.section.items.cards = {
    id: id(107),
    slug: 'cards',
    type: 'flashcards',
    params: {},
    locale: {
      title: { en: 'Reviewed flashcard title' },
      navigationLabel: { en: 'Reviewed navigation' },
    },
    content: { items: {}, order: [] },
  };
  config.section.order.push('cards');
  const result = prepareAssessmentDraft({
    config: wrap(config).config,
    production: { documentLanguage: 'uk', flashcardsRequired: true },
  });
  const locale = result.lesson.section.items.cards.config.locale;
  assert.deepEqual(locale.title, { en: 'Reviewed flashcard title', uk: 'PENDING FLASHCARDS' });
  assert.deepEqual(locale.navigationLabel, { en: 'Reviewed navigation', uk: 'PENDING FLASHCARDS' });
  assert.ok(result.pending[0].provisionalFields.includes('$.locale.title'));
});

test('mixed assessment selections preserve real UUIDs and block every incomplete entry', () => {
  const config = lessonConfig();
  config.section.items.quizMixed = {
    id: id(108),
    slug: 'quizMixed',
    type: 'quiz',
    params: {
      selection: { mode: 'sample', questionIds: [id(109), 'unresolved', id(109)] },
    },
    locale: { title: { uk: 'Завдання' }, navigationLabel: { uk: 'Почати' } },
    content: group({}),
  };
  config.section.order.push('quizMixed');
  const original = wrap(config);
  const document = { config: original.config, production: { documentLanguage: 'uk', quizRequired: true } };
  const draft = prepareAssessmentDraft(document);
  const ids = draft.lesson.section.items.quizMixed.config.params.selection.questionIds;
  assert.equal(ids[0], id(109), 'An approved real UUID must never be discarded');
  assert.equal(ids.length, 3);
  assert.equal(new Set(ids).size, 3);
  assert.match(ids[1], /^feedc0de-/);
  assert.match(ids[2], /^feedc0de-/);
  assert.deepEqual(
    ids,
    prepareAssessmentDraft(document).lesson.section.items.quizMixed.config.params.selection.questionIds,
    'Every synthetic candidate must be stable on deterministic re-generation',
  );
  assert.deepEqual(
    original.config.section.items.quizMixed.config.params.selection.questionIds,
    [id(109), 'unresolved', id(109)],
    'Pending scaffolding must never mutate approved YAML input',
  );
  const source = splitScaffoldDocument({ ...document, config: draft.lesson }).config;
  const files = renderLessonModules(source, 'uk', { pendingAssessments: draft.pending });
  const section = files.get('sections/quizMixed/index.ts');
  assert.match(section, /Replace \$\.params\.selection\.questionIds\[1\]/);
  assert.match(section, /Replace \$\.params\.selection\.questionIds\[2\]/);
  assert.ok(scanSource('sections/quizMixed/index.ts', section).length >= 4);
  assertTypeScriptSyntax(files);
});
test('assessment Sections use the ordinary nested Section path with exactly one real blocker per Section', () =>
  fixture(f => {
    const make = (slug, number, type) => ({
      id: id(number),
      slug,
      type,
      params: {},
      locale: { title: { uk: 'Перевірка' }, navigationLabel: { uk: 'Почати' } },
      content: group({ opening: block('opening', number + 20, 'Уважно прочитайте інструкцію.') }),
    });
    f.config.section.items.quizOne = make('quizOne', 50, 'quiz');
    f.config.section.items.cardsOne = make('cardsOne', 51, 'flashcards');
    f.config.section.items.quizTwo = make('quizTwo', 52, 'quiz');
    f.config.section.items.cardsTwo = make('cardsTwo', 53, 'flashcards');
    f.config.section.order = ['cardsOne', 'intro', 'quizOne', 'quizTwo', 'cardsTwo'];
    f.save();
    const first = runOne(f.lesson, 'generate', f.root);
    const files = readAll(f.lesson);
    const ordered = files.get('sections/index.ts');
    assert.match(ordered, /order: \[\s*"cardsOne",\s*"intro",\s*"quizOne",\s*"quizTwo",\s*"cardsTwo"/);
    for (const [slug, factory, label] of [
      ['quizOne', 'defineQuizSection', 'Quiz'],
      ['quizTwo', 'defineQuizSection', 'Quiz'],
      ['cardsOne', 'defineFlashcardsSection', 'Flashcards'],
      ['cardsTwo', 'defineFlashcardsSection', 'Flashcards'],
    ]) {
      const file = 'sections/' + slug + '/index.ts';
      const content = files.get(file);
      assert.ok(content, file);
      assert.match(
        content,
        new RegExp(
          '\/\/ TODO \\(BLOCKER\\): This ' +
            label +
            ' Section is required by the Methodologist\\.\\n\/\/ Integrate[^\\n]+\\nexport const ' +
            slug +
            ' = ' +
            factory,
        ),
      );
      assert.match(content, /const content = \{/);
      assert.match(content, /typeof content\.items, LessonLanguages/);
      assert.equal((content.match(/TODO \(BLOCKER\):/g) ?? []).length, 1, file);
      assert.ok(files.has('sections/' + slug + '/opening/index.ts'));
    }
    assert.doesNotMatch(files.get('sections/intro/index.ts'), /TODO \(BLOCKER\):/);
    assert.equal(files.get('sections/quizOne/opening/index.ts').includes('Уважно прочитайте'), true);
    assertTypeScriptSyntax(files);
    const second = runOne(f.lesson, 'generate', f.root);
    assert.equal(second.skipped, true, 'never overwrite a finished draft on a repeat run');
    assert.deepEqual(readAll(f.lesson), files);
    assert.ok(first.files.includes('sections/quizOne/index.ts'));
  }));

test('a Lesson without an assessment Section generates no assessment-specific blocker', () =>
  fixture(f => {
    runOne(f.lesson, 'generate', f.root);
    const files = readAll(f.lesson);
    assert.equal(
      [...files].filter(
        ([name, content]) => name.startsWith('sections/') && content.includes('This Quiz Section is required'),
      ).length,
      0,
    );
    assert.equal(
      [...files].filter(
        ([name, content]) => name.startsWith('sections/') && content.includes('This Flashcards Section is required'),
      ).length,
      0,
    );
  }));

