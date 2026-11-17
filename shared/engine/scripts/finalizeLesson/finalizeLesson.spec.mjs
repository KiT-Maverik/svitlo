import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import yaml from 'yaml';

import { repoRoot } from '../lessonBuilder/lessonBuilder.mjs';
import { finalizeLesson, preflightLesson, productionHandoff, LessonHandoffError } from './finalizeLesson.mjs';

const id = tail => '00000000-0000-4000-8000-' + tail.padStart(12, '0');
const lessonId = id('12');
const sectionId = id('13');
const textId = id('14');

function validDocument() {
  return {
    config: {
      id: lessonId,
      slug: 'testLesson',
      type: 'lesson',
      skills: [],
      params: {
        languages: ['en', 'uk'],
        requireQuiz: false,
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
      },
      locale: { title: { en: 'Test Lesson' } },
      section: {
        items: {
          intro: {
            config: {
              id: sectionId,
              slug: 'intro',
              type: 'content',
              params: {},
              locale: { title: { en: 'Introduction' }, navigationLabel: { en: 'Start' } },
              content: {
                items: {
                  story: {
                    config: {
                      id: textId,
                      slug: 'story',
                      type: 'text',
                      params: {},
                      locale: { value: { en: 'A complete source-language explanation.' } },
                    },
                    production: { purpose: 'Ground a difficult idea in experience.' },
                  },
                },
                order: ['story'],
              },
            },
            production: { purpose: 'Activate prior knowledge.', pedagogicalIntent: 'Use a familiar example.' },
          },
        },
        order: ['intro'],
      },
    },
    production: {
      documentLanguage: 'en',
      methodology: '# Objectives\n\nA carefully authored, reviewed methodology.',
      audience: 'Beginner learner',
      productionNotes: 'Preserve the actual lesson intent.',
    },
  };
}

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-finalize-lesson-'));
  const folder = path.join(root, 'content/math/data/lessons', lessonId.at(-1), lessonId);
  const source = path.join(folder, 'lesson.yaml');
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(root, 'content/math/package.json'), '{"name":"@svitlo/math"}\n');
  const schema = path.join(root, 'shared/engine/yaml-schemas/lesson.scaffold.schema.json');
  fs.mkdirSync(path.dirname(schema), { recursive: true });
  fs.copyFileSync(path.join(repoRoot, 'shared/engine/yaml-schemas/lesson.scaffold.schema.json'), schema);
  let document = validDocument();
  const save = () => fs.writeFileSync(source, yaml.stringify(document));
  save();
  try {
    return callback({
      root,
      folder,
      source,
      get document() {
        return document;
      },
      save,
    });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('preflight validates full Zod-derived Lesson schema, source locale, and canonical path', () =>
  fixture(f => {
    const found = preflightLesson(f.source, f.root);
    assert.equal(found.lessonId, lessonId);
    assert.equal(found.document.production.documentLanguage, 'en');
    assert.equal(fs.existsSync(path.join(f.folder, 'index.ts')), false);
    assert.equal(fs.existsSync(f.source), true, 'preflight is read-only');

    delete f.document.config.locale.title;
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /lesson.yaml:schema:/);

    f.document.config.locale.title = { en: 'Test Lesson', uk: 'Actual translation that would be silently pruned' };
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /non-source localized data/);
  }));

test('preflight rejects duplicate/unknown/missing order keys, duplicate IDs and omitted methodology', () =>
  fixture(f => {
    f.document.config.section.order = ['intro', 'intro'];
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /duplicate collection keys/);

    f.document.config.section.order = ['unknown'];
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /unknown collection key/);

    f.document.config.section.order = [];
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /missing enabled item/);

    f.document.config.section.order = ['intro'];
    f.document.config.section.items.intro.config.id = textId;
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /duplicate entity UUID/);

    f.document.config.section.items.intro.config.id = sectionId;
    delete f.document.production.methodology;
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /complete Methodology/);
  }));

test('production handoff retains root, Section, and Text production instructions without Config duplication', () => {
  const handoff = JSON.parse(productionHandoff(validDocument()));
  assert.equal(handoff.kind, 'svitlo-lesson-production-handoff');
  assert.equal(handoff.lessonId, lessonId);
  assert.deepEqual(
    handoff.nodes.map(n => n.type),
    ['lesson', 'content', 'text'],
  );
  assert.equal(handoff.nodes[1].production.pedagogicalIntent, 'Use a familiar example.');
  assert.equal(handoff.nodes[2].production.purpose, 'Ground a difficult idea in experience.');
  assert.equal(handoff.nodes[0].production.methodology.startsWith('# Objectives'), true);
  assert.equal(handoff.nodes[0].config, undefined, 'no second canonical Config');
});

test('finalize uses real create-only Lesson Builder, checks files, retains banks and deletes only YAML', () =>
  fixture(f => {
    const questions = path.join(f.folder, 'questions.yaml');
    const flashcards = path.join(f.folder, 'flashcards.yaml');
    fs.writeFileSync(questions, 'independent: question bank\n');
    fs.writeFileSync(flashcards, 'independent: flashcard bank\n');

    const result = finalizeLesson(f.source, { repo: f.root });
    assert.equal(result.lessonId, lessonId);
    assert.equal(fs.existsSync(f.source), false);
    assert.equal(fs.existsSync(path.join(f.folder, 'index.ts')), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'methodology.md')), true);
    assert.equal(fs.readFileSync(questions, 'utf8'), 'independent: question bank\n');
    assert.equal(fs.readFileSync(flashcards, 'utf8'), 'independent: flashcard bank\n');
    const metadata = JSON.parse(fs.readFileSync(path.join(f.folder, 'production-handoff.json'), 'utf8'));
    assert.equal(metadata.nodes.length, 3);
  }));

test('existing authored entrypoint blocks finalize before touching source or independent banks', () =>
  fixture(f => {
    fs.writeFileSync(path.join(f.folder, 'index.ts'), '// human-edited\n');
    assert.throws(() => finalizeLesson(f.source, { repo: f.root }), /create-only skip/);
    assert.equal(fs.existsSync(f.source), true);
    assert.equal(fs.readFileSync(path.join(f.folder, 'index.ts'), 'utf8'), '// human-edited\n');
  }));

function fakeGenerator(f, behavior) {
  return (file, mode) => {
    if (mode === 'generate') {
      if (behavior === 'skip') return { skipped: true, lessonId, files: ['index.ts'] };
      fs.writeFileSync(path.join(f.folder, 'index.ts'), '// generated\n');
      if (behavior !== 'missing-method') fs.writeFileSync(path.join(f.folder, 'methodology.md'), 'method\n');
      if (behavior === 'partial') return { lessonId, files: ['index.ts', 'missing.ts'] };
      return { lessonId, files: ['index.ts', 'methodology.md'] };
    }
    if (behavior === 'divergent') throw new Error('stale or manually edited draft');
    return { lessonId, files: [] };
  };
}

for (const [behavior, expected] of [
  ['skip', /builder skipped/],
  ['partial', /missing generated file/],
  ['missing-method', /missing generated file/],
  ['divergent', /stale or manually edited draft/],
]) {
  test('finalize retains YAML on ' + behavior + ' scaffold', () =>
    fixture(f => {
      assert.throws(() => finalizeLesson(f.source, { repo: f.root, generate: fakeGenerator(f, behavior) }), expected);
      assert.equal(fs.existsSync(f.source), true, 'recoverable YAML source must survive');
    }),
  );
}

test('finalize retains YAML when source changes after scaffold', () =>
  fixture(f => {
    assert.throws(
      () =>
        finalizeLesson(f.source, {
          repo: f.root,
          generate: fakeGenerator(f, 'complete'),
          afterGenerate: () => fs.appendFileSync(f.source, '\n# revised during generation\n'),
        }),
      /source changed/,
    );
    assert.equal(fs.existsSync(f.source), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'production-handoff.json')), false);
  }));

test('finalize refuses divergent existing production handoff, before generating', () =>
  fixture(f => {
    fs.writeFileSync(path.join(f.folder, 'production-handoff.json'), '{"unexpected":"content"}\n');
    assert.throws(
      () => finalizeLesson(f.source, { repo: f.root, generate: fakeGenerator(f, 'complete') }),
      /existing handoff differs/,
    );
    assert.equal(fs.existsSync(f.source), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'index.ts')), false);
  }));

test('LessonHandoffError identifies path-specific diagnostics', () => {
  const diagnostic = new LessonHandoffError('config.id', 'not a UUID');
  assert.match(diagnostic.message, /lesson.yaml:config.id: not a UUID/);
});

test('empty source-language dictionaries block finalization even when editor schema permits them', () =>
  fixture(f => {
    f.document.config.locale.title = {};
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /config.locale.title: empty locale dictionary/);
    assert.throws(() => finalizeLesson(f.source, { repo: f.root }), /empty locale dictionary/);
    assert.equal(fs.existsSync(f.source), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'index.ts')), false);

    f.document.config.locale.title = { en: 'Test Lesson' };
    f.document.config.section.items.intro.config.content.items.story.config.locale.value = {};
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /config.locale.value: empty locale dictionary/);
    assert.equal(fs.existsSync(f.source), true);
  }));
