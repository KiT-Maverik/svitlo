import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';

import { runOne } from '../lessonBuilder/lessonBuilder.mjs';
import { productionFiles, splitScaffoldDocument } from './productionScaffolding.mjs';

const lessonId = '00000000-0000-4000-8000-00000000000c';
const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const group = items => ({ items, order: Object.keys(items) });

function calls(source) {
  const tree = ts.createSourceFile('draft.data.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(tree.parseDiagnostics, [], 'generated draft must be syntactically valid');
  const names = [];
  const walk = node => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) names.push(node.expression.text);
    ts.forEachChild(node, walk);
  };
  walk(tree);
  return names;
}

/** Wrap every technical node with its Config, retaining the sole authored ID. */
function wrapNode(value) {
  if (Array.isArray(value)) return value.map(wrapNode);
  if (!value || typeof value !== 'object') return value;
  const fields = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, wrapNode(child)]));
  return typeof value.type === 'string' && (typeof value.id === 'string' || typeof value.lessonId === 'string')
    ? { config: fields }
    : fields;
}

function questNode(slug, offset) {
  const block = (type, key, index, locale, params = {}) => ({
    id: id(offset + index),
    slug: key,
    type,
    params,
    locale,
  });
  return {
    id: id(offset),
    slug,
    type: 'quest',
    params: {},
    locale: { title: { uk: 'Практика' }, navigationLabel: { uk: 'Завдання' } },
    stages: {
      start: {
        id: id(offset + 1),
        slug: 'start',
        type: 'questStage',
        content: {
          video: {
            medium: block('video', 'medium', 2, {
              fileLocation: null,
              poster: null,
              label: { uk: 'Приклад' },
            }),
            small: block('video', 'small', 3, {
              fileLocation: null,
              poster: null,
              label: { uk: 'Приклад' },
            }),
          },
          audio: {
            dialogue: null,
            narration: block('audio', 'narration', 4, {
              fileLocation: null,
              title: { uk: 'Опис' },
            }),
            background: null,
          },
          image: block(
            'image',
            'image',
            5,
            { src: null, alt: { uk: 'Схема' } },
            {
              fill: true,
              aspectRatio: 1.5,
            },
          ),
          subtitles: block('subtitles', 'subtitles', 6, { fileLocation: null }),
        },
      },
    },
    tasks: {
      start: {
        id: id(offset + 7),
        slug: 'start',
        type: 'questTask',
        scene: block('scene', 'interaction', 8, { value: { instruction: { uk: 'Спробуй' } } }),
      },
    },
  };
}

test('Lesson YAML emits nested source drafts without mutating independent bank YAMLs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-yaml-integrated-'));
  const workspace = path.join(root, 'content/playground');
  const lessonDir = path.join(workspace, 'data/lessons/c', lessonId);
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');
  try {
    const sourceBlock = {
      id: id(1),
      slug: 'text',
      type: 'text',
      locale: { value: { uk: 'Привіт', en: 'EN_NOT_AUTHORED' } },
    };
    const lesson = {
      documentLanguage: 'uk',
      type: 'lesson',
      id: lessonId,
      slug: 'lightLesson',
      params: { languages: ['uk', 'en'] },
      section: group({
        intro: {
          id: id(2),
          type: 'content',
          slug: 'intro',
          content: group({
            welcome: sourceBlock,
            gallery: {
              id: id(3),
              type: 'carousel',
              slug: 'gallery',
              slides: group({ slide: {
                id: id(4), type: 'image', slug: 'slide',
                params: { fill: true, aspectRatio: 1.5 },
                locale: { src: null, alt: { uk: 'Діаграма' } },
              } }),
            },
            checkpoint: {
              id: id(5),
              type: 'checkpoint',
              slug: 'checkpoint',
              content: group({
                item: {
                  id: id(6),
                  type: 'checkpointItem',
                  slug: 'item',
                  question: structuredClone(sourceBlock),
                  answer: {
                    id: id(13),
                    type: 'checkpointAnswer',
                    slug: 'answer',
                    content: group({ correct: structuredClone(sourceBlock) }),
                  },
                },
              }),
            },
          }),
        },
      }),
    };
    lesson.section.items.guided = questNode('guided', 70);
    lesson.section.order.push('guided');
    const { documentLanguage: lessonLanguage, ...lessonConfig } = lesson;
    fs.writeFileSync(
      path.join(lessonDir, 'lesson.yaml'),
      yaml.stringify({
        ...wrapNode(lessonConfig),
        production: { documentLanguage: lessonLanguage },
      }),
    );
    fs.writeFileSync(path.join(lessonDir, 'questions.yaml'), '# independent question source\n');
    fs.writeFileSync(path.join(lessonDir, 'flashcards.yaml'), '# independent flashcard source\n');
    const lessonDraft = runOne(lessonDir, 'generate', root);
    const sourceFiles = lessonDraft.files.filter(file => file.endsWith('.ts'));
    assert(sourceFiles.length > 1, 'Lesson Builder must emit multiple named draft modules');
    assert.equal(lessonDraft.changed, sourceFiles.length);
    assert.equal(fs.readFileSync(path.join(lessonDir, 'questions.yaml'), 'utf8'), '# independent question source\n');
    assert.equal(fs.readFileSync(path.join(lessonDir, 'flashcards.yaml'), 'utf8'), '# independent flashcard source\n');
    assert.equal(fs.existsSync(path.join(lessonDir, 'questions')), false);
    assert.equal(fs.existsSync(path.join(lessonDir, 'flashcards')), false);
    // Review register must parse, with unresolved evidence and a blocking TODO.
    // Syntactically valid TypeScript is not evidence of independent approval.
    assert(sourceFiles.includes('review.ts'), 'Lesson Builder must scaffold the Review register');
    const reviewDraft = fs.readFileSync(path.join(lessonDir, 'review.ts'), 'utf8');
    assert.equal(
      ts.createSourceFile('review.ts', reviewDraft, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
        .parseDiagnostics.length,
      0,
      'Review register must be syntax-valid until verified review evidence is supplied',
    );
    assert.match(reviewDraft, /TODO \(BLOCKER\): Conduct review/);
    assert.match(reviewDraft, /acceptance: 0/);
    const modules = sourceFiles
      .filter(file => file !== 'review.ts')
      .map(file => fs.readFileSync(path.join(lessonDir, file), 'utf8'));
    const lessonCode = modules.join('\n');
    const lessonCalls = modules.flatMap(calls);
    for (const name of [
      'defineLesson',
      'defineContentSection',
      'defineText',
      'defineCarousel',
      'defineCheckpoint',
      'defineCheckpointItem',
      'defineCheckpointAnswer',
      'defineQuestSection',
      'defineStage',
      'defineTask',
      'defineVideo',
      'defineAudio',
      'defineImage',
      'defineSubtitles',
      'defineScene',
    ]) {
      assert(lessonCalls.includes(name), name + ' missing in Lesson draft');
    }
    assert(!lessonCode.includes('EN_NOT_AUTHORED'));
    assert(lessonCode.includes('import { '));
    assert(lessonCode.includes("from '@svitlo/engine/build'"));

    assert(!fs.existsSync(path.join(lessonDir, 'generated')));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Quest Stage caption production creates a UUID-addressed Subtitles handoff', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'quest-subtitles-handoff-'));
  try {
    const captionId = id(151);
    const lessonPath = path.join(root, 'content/math/data/lessons/c', lessonId);
    const node = {
      config: {
        id: lessonId,
        slug: 'questLesson',
        type: 'lesson',
        section: {
          items: {
            guided: {
              config: {
                id: id(150),
                slug: 'guided',
                type: 'quest',
                stages: {
                  start: {
                    config: {
                      id: id(152),
                      slug: 'start',
                      type: 'questStage',
                      content: {
                        subtitles: {
                          config: {
                            id: captionId,
                            slug: 'subtitles',
                            type: 'subtitles',
                            params: {},
                            locale: { fileLocation: null },
                          },
                          production: { script: 'WEBVTT\n\n00:00:00.000 --> 00:00:02.000\nNarrator: Begin.' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      production: { documentLanguage: 'en' },
    };
    const split = splitScaffoldDocument(node);
    assert.equal(split.config.section.items.guided.stages.start.content.subtitles.type, 'subtitles');
    const handoffs = productionFiles(lessonPath, split.tasks);
    assert.equal(handoffs.length, 1);
    assert.equal(
      handoffs[0].file,
      path.join(root, 'content/math/data/assets', captionId.at(-1), captionId, 'specification.md'),
    );
    assert.match(handoffs[0].content, /WEBVTT/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
