import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';

import { loadFactoryRegistry } from './yamlScaffolding.mjs';
import { MaterializeDiagnostic, materialize, writeMaterialized } from './recursiveMaterializer.mjs';

const id = n => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
const group = items => ({ items, order: Object.keys(items) });
const node = (type, slug, n, rest = {}, production) => ({
  config: { id: id(n), slug, type, ...rest },
  ...(production ? { production } : {}),
});
const textBlock = (slug, n) => node('text', slug, n, { locale: { value: { uk: 'Вітаємо', en: 'UNREVIEWED' } } });
const source = (config, production = { documentLanguage: 'uk' }) => ({ config, production });
const registry = loadFactoryRegistry();

function compile(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-recursive-types-'));
  try {
    const names = [...new Set([
      ...Object.values(registry),
      'definePendingLesson', 'definePendingQuizSection', 'definePendingFlashcardsSection',
      'defineFlashcardSide',
    ])].sort();
    const mock = [
      'export type SupportedLanguages = readonly string[];',
      ...names.map(name =>
        'export declare function ' + name +
        '<A = unknown, B = unknown, C = unknown, D = unknown, E = unknown, F = unknown, G = unknown>' +
        '(config: unknown): any;'),
      'export declare function readMarkdown(url: string, languages?: string[]): any;',
      'export declare function readCodeSource(url: string, extension: string): string;',
    ].join('\n');
    fs.writeFileSync(path.join(root, 'engine-mock.ts'), mock);
    for (const file of files) {
      const target = path.join(root, file.path);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, file.content);
    }
    const paths = files.filter(item => item.path.endsWith('.ts')).map(item => path.join(root, item.path));
    const program = ts.createProgram([...paths, path.join(root, 'engine-mock.ts')], {
      noEmit: true,
      strict: true,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2022,
      skipLibCheck: true,
      baseUrl: root,
      paths: { '@svitlo/engine/build': ['engine-mock.ts'] },
    });
    const errors = ts.getPreEmitDiagnostics(program);
    assert.deepEqual(errors.map(error =>
      (error.file?.fileName ?? '') + ':' + ts.flattenDiagnosticMessageText(error.messageText, '\n')), []);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('canonical registry has one factory for each implemented type', () => {
  for (const name of ['course', 'module', 'chapter', 'episode', 'lesson', 'content',
    'image', 'scene', 'checkpoint', 'checkpointItem', 'checkpointAnswer',
    'quest', 'questStage', 'questTask', 'flashcard', 'selectOneAnswer']) {
    assert.equal(typeof registry[name], 'string', name);
  }
  assert.equal(registry.lessonReference, undefined);
});

test('one recursive renderer emits ordered Course → Module → Chapter → Episode → Section modules', () => {
  const quiz = node('quiz', 'assessment', 7, {}, { pending: true, specification: 'Bank awaits review' });
  const intro = node('content', 'intro', 6, {
    content: group({ welcome: textBlock('welcome', 8) }),
  });
  const episode = node('episode', 'episodeOne', 5, {
    params: { languages: ['uk', 'en'] },
    section: group({ intro, assessment: quiz }),
  });
  const reference = { config: { type: 'lessonReference', lessonId: id(110), slug: 'otherLesson' } };
  const chapter = node('chapter', 'chapterOne', 4, {
    content: group({ episodeOne: episode, lessonOne: reference }),
  });
  const module = node('module', 'moduleOne', 3, {
    content: group({ chapterOne: chapter }),
  });
  const course = node('course', 'courseOne', 2, {
    params: { languages: ['uk', 'en'] },
    content: group({ moduleOne: module }),
    locale: { title: { uk: 'Курс', en: 'Unreviewed' } },
  }, { methodology: 'Editorial context' });
  const output = materialize(source(course.config, { documentLanguage: 'uk', methodology: 'Editorial context' }),
    { registry });
  const paths = output.files.map(file => file.path);
  for (const file of [
    'index.ts', 'languages.ts', 'specification.md',
    'content/items/moduleOne/index.ts',
    'content/items/moduleOne/content/items/chapterOne/index.ts',
    'content/items/moduleOne/content/items/chapterOne/content/items/episodeOne/index.ts',
    'content/items/moduleOne/content/items/chapterOne/content/items/episodeOne/section/items/intro/index.ts',
    'content/items/moduleOne/content/items/chapterOne/content/items/episodeOne/section/items/assessment/index.ts',
    'content/items/moduleOne/content/items/chapterOne/content/items/lessonOne/index.ts',
  ]) assert(paths.includes(file), 'Missing ' + file);
  assert.equal(output.files.at(-1).path, 'index.ts', 'entrypoint must be emitted last');
  assert.match(output.files.find(file => file.path === 'index.ts').content, /defineCourse/);
  assert(!output.files.find(file => file.path === 'index.ts').content.includes('defineModule'));
  assert.match(output.files.find(file => file.path.endsWith('/lessonOne/index.ts')).content, /definePendingLesson/);
  assert.match(output.files.find(file => file.path.endsWith('/assessment/index.ts')).content, /definePendingQuizSection/);
  assert(output.diagnostics.some(item => item.code === 'pending-assessment'));
  assert(output.diagnostics.some(item => item.code === 'pending-lesson'));
  assert(output.diagnostics.some(item => item.code === 'pending-locales'));
  assert(!output.files.some(file => file.content.includes('Unreviewed') || file.content.includes('UNREVIEWED')));
  assert.match(output.files.find(file => file.path.includes('/episodeOne/index.ts')).content, /order: \['intro', 'assessment'\]|order: \["intro", "assessment"\]/);
  compile(output.files);
  const repeat = materialize(source(course.config, { documentLanguage: 'uk', methodology: 'Editorial context' }), { registry });
  assert.deepEqual(repeat, output, 'same input must produce byte-identical output and diagnostics');
});

test('nested Carousel, Checkpoint, Quest and file-backed Markdown/Code preserve Config identity', () => {
  const carousel = node('carousel', 'gallery', 10, {
    slides: group({
      diagram: node('image', 'diagram', 11, {
        params: { fill: true, aspectRatio: 1.4 },
        locale: { alt: { uk: 'Схема' } },
      }, { specification: 'Draw actual diagram' }),
    }),
  });
  const checkpoint = node('checkpoint', 'check', 12, {
    content: group({
      first: node('checkpointItem', 'first', 13, {
        question: textBlock('prompt', 14),
        answer: node('checkpointAnswer', 'answer', 15, { content: group({ correct: textBlock('correct', 16) }) }),
      }),
    }),
  });
  const quest = node('quest', 'journey', 20, {
    stages: {
      start: node('questStage', 'start', 21, {
        content: {
          video: {
            medium: node('video', 'medium', 22, { locale: {} }),
            small: node('video', 'small', 23, { locale: {} }),
          },
          audio: { dialogue: null, narration: node('audio', 'narration', 24, { locale: {} }), background: null },
          image: node('image', 'sceneImage', 25, { locale: {} }),
          subtitles: node('subtitles', 'captions', 26, { locale: {} }),
        },
      }),
    },
    tasks: {
      start: node('questTask', 'start', 27, { scene: node('scene', 'decision', 28,
        { locale: { value: { uk: { instruction: 'Обери' } } } }, { specification: 'Build a keyboard-controlled task' }) }),
    },
  });
  const lesson = node('lesson', 'lessonOne', 1, {
    params: { languages: ['uk'], quizRequiredForCompletion: false },
    section: group({
      topic: node('content', 'topic', 2, {
        content: group({
          gallery: carousel,
          check: checkpoint,
          prose: node('markdown', 'prose', 17, { locale: { value: { uk: '# Привіт', en: '# UNREVIEWED' } } }),
          code: node('code', 'code', 18, { params: { language: 'typescript', codeAsText: 'const x = 1;\n' } }),
        }),
      }),
      journey: quest,
    }),
    skills: [],
  });
  const result = materialize(source(lesson.config), { registry });
  const all = result.files.map(file => file.path);
  assert(all.some(file => file.endsWith('/gallery/slides/items/diagram/index.ts')));
  assert(all.some(file => file.endsWith('/check/content/items/first/answer/index.ts')));
  assert(all.some(file => file.endsWith('/journey/stages/start/content/video/medium/index.ts')));
  assert(all.some(file => file.endsWith('/journey/tasks/start/scene/index.ts')));
  assert(result.files.some(file => file.kind === 'markdown' && file.content === '# Привіт'));
  assert(result.files.some(file => file.kind === 'code' && file.content === 'const x = 1;\n'));
  const code = result.files.find(file => file.path.endsWith('/code/index.ts')).content;
  assert.match(code, /readCodeSource\(import.meta.url, "ts"\)/);
  assert(!result.files.some(file => file.content.includes('UNREVIEWED')));
  assert(result.diagnostics.some(item => item.code === 'pending-media'));
  assert(result.files.some(file => file.content.includes('TODO (BLOCKER): Supply verified')));
  assert(result.files.some(file => file.content.includes('TODO (BLOCKER):') && file.path.endsWith('/decision/specification.md')) === false);
  compile(result.files);
});

test('Question and Flashcard child boundaries emit independent blocks', () => {
  const question = node('selectOneAnswer', 'choice', 1, {
    content: {
      question: group({ prompt: textBlock('prompt', 2) }),
      answers: {
        correct: group({ yes: textBlock('yes', 3) }),
        incorrect: group({ no: textBlock('no', 4) }),
        distractors: group({ extra: textBlock('extra', 5) }),
      },
    },
  });
  const q = materialize(source(question.config), { registry });
  assert(q.files.some(file => file.path === 'content/answers/correct/items/yes/index.ts'));
  compile(q.files);
  const card = node('flashcard', 'memory', 20, {
    content: {
      front: group({ heading: textBlock('heading', 21) }),
      back: group({ detail: textBlock('detail', 22) }),
    },
    parameters: { flags: [] },
  });
  const f = materialize(source(card.config), { registry });
  assert(f.files.some(file => file.path === 'content/front/items/heading/index.ts'));
  assert.match(f.files.find(file => file.path === 'index.ts').content, /defineFlashcardSide/);
  compile(f.files);
});

test('schema-known boundaries reject unknown types, mismatched slugs, missing order and reused IDs', () => {
  const base = fields => source(node('lesson', 'sample', 1, {
    section: group({ first: node('content', 'first', 2, { content: group(fields) }) }),
    params: { languages: ['uk'] },
  }).config);
  assert.throws(() => materialize(base({ x: node('unknown', 'x', 3) }), { registry }), /disallowed child type/);
  assert.throws(() => materialize(base({ x: node('text', 'different', 3) }), { registry }), /slug must match/);
  const dup = base({ x: node('text', 'x', 1) });
  assert.throws(() => materialize(dup, { registry }), /Configurator UUID reused/);
  const unordered = base({ x: textBlock('x', 3) });
  unordered.config.section.config = { unexpected: true };
  unordered.config.section.order = [];
  assert.throws(() => materialize(unordered, { registry }), /order must include each items key/);
  const unknownRoot = source({ id: id(1), slug: 'unsupported', type: 'unknown' });
  assert.throws(() => materialize(unknownRoot, { registry }), /unknown root Config type/);
});

test('metadata objects named type are not interpreted as nested factories', () => {
  const root = source(node('text', 'copy', 1, {
    params: { feature: { type: 'unknown', id: id(2), slug: 'plainMetadata' } },
  }).config);
  const result = materialize(root, { registry });
  assert.equal(result.files.filter(file => file.path.endsWith('index.ts')).length, 1);
  assert.match(result.files.find(file => file.path === 'index.ts').content, /type: "unknown"/);
  compile(result.files);
});

test('write/check are atomic-preflight, create-only and idempotent', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-recursive-write-'));
  try {
    const tree = materialize(source(node('text', 'copy', 1).config), { registry });
    assert.throws(() => writeMaterialized(tree.files, dir, 'check'), /Missing generated file/);
    const first = writeMaterialized(tree.files, dir, 'generate');
    assert.equal(first.changed, tree.files.length);
    assert.deepEqual(writeMaterialized(tree.files, dir, 'check'), { changed: 0, skipped: false });
    assert.deepEqual(writeMaterialized(tree.files, dir, 'generate'), { changed: 0, skipped: true });
    fs.unlinkSync(path.join(dir, 'index.ts'));
    fs.writeFileSync(path.join(dir, 'languages.ts'), '// hand edited');
    assert.throws(() => writeMaterialized(tree.files, dir, 'generate'), /refusing to overwrite/);
    assert.equal(fs.existsSync(path.join(dir, 'index.ts')), false, 'failed preflight must write nothing');
    assert.equal(fs.readFileSync(path.join(dir, 'languages.ts'), 'utf8'), '// hand edited');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('unsafe generated paths and symlink targets are rejected', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-recursive-safe-'));
  try {
    assert.throws(() => writeMaterialized([{ path: '../escape.ts', content: '' }], dir, 'generate'), /Unsafe/);
    fs.symlinkSync(os.tmpdir(), path.join(dir, 'redirect'), 'dir');
    assert.throws(() => writeMaterialized([{ path: 'redirect/inside.ts', content: '' }], dir, 'generate'), /Refusing symlink/);
    assert.throws(() => materialize(source(node('text', '../escape', 1).config), { registry }),
      MaterializeDiagnostic);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
