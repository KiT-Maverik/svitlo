import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import yaml from 'yaml';

import { repoRoot } from '../lessonBuilder/lessonBuilder.mjs';
import {
  finalizeLesson,
  preflightLesson,
  preflightLessonDraft,
  handoffLesson,
  productionHandoff,
  LessonHandoffError,
  main,
} from './finalizeLesson.mjs';
import { scanSource } from '../../../../scripts/ci/checkBlockerTodos/check-blocker-todos.mjs';

const id = tail => '00000000-0000-4000-8000-' + String(tail).padStart(12, '0');
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
        quizRequiredForCompletion: false,
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

function withAssessmentPlan(f, sections) {
  const configItems = f.document.config.section.items;
  f.document.production.quizRequired = sections.some(section => section.type === 'quiz');
  f.document.production.flashcardsRequired = sections.some(section => section.type === 'flashcards');
  for (const [index, { type, slug, params = {} }] of sections.entries()) {
    configItems[slug] = {
      config: {
        id: id(100 + index),
        slug,
        type,
        params,
        locale: { title: { en: 'Practice' }, navigationLabel: { en: 'Continue' } },
        content: { items: {}, order: [] },
      },
      production: { purpose: 'Use the reviewed bank before Lesson publication.' },
    };
    f.document.config.section.order.push(slug);
  }
  f.save();
}

test('zero assessment flags and zero assessment Sections need no machine-readable inventory', () =>
  fixture(f => {
    f.document.production.quizRequired = false;
    f.document.production.flashcardsRequired = false;
    f.save();
    assert.equal(preflightLesson(f.source, f.root).assessment.pending.length, 0);
    assert.throws(() => preflightLessonDraft(f.source, f.root), /no deferred assessment/);
  }));

for (const types of [['quiz'], ['flashcards'], ['quiz', 'flashcards'], ['quiz', 'quiz', 'flashcards', 'flashcards']]) {
  test('draft preflight accepts deferred assessment Sections: ' + types.join(', '), () =>
    fixture(f => {
      withAssessmentPlan(
        f,
        types.map((type, index) => ({ type, slug: type + index })),
      );
      const result = preflightLessonDraft(f.source, f.root);
      assert.equal(result.assessment.pending.length, types.length);
      assert.throws(() => preflightLesson(f.source, f.root), /lesson.yaml:schema:/);
      const key = types[0] + '0';
      delete f.document.config.section.items[key];
      f.document.config.section.order = f.document.config.section.order.filter(name => name !== key);
      f.save();
      const deferred = preflightLessonDraft(f.source, f.root).assessment.pending;
      assert.ok(deferred.some(item => item.type === types[0]));
    }),
  );
}

test('draft handoff creates registered blocked assessment Sections and original bank YAML handoffs', () =>
  fixture(f => {
    withAssessmentPlan(f, [
      { type: 'quiz', slug: 'quizA' },
      { type: 'flashcards', slug: 'cardsB' },
    ]);
    const original = fs.readFileSync(f.source);
    const result = handoffLesson(f.source, { repo: f.root });
    assert.equal(result.removed, null);
    assert.deepEqual(
      result.pending.map(item => item.slug),
      ['quizA', 'cardsB'],
    );
    assert.equal(fs.readFileSync(f.source).equals(original), true);
    for (const [slug, factory] of [
      ['quizA', 'defineQuizSection'],
      ['cardsB', 'defineFlashcardsSection'],
    ]) {
      const filename = path.join(f.folder, 'sections', slug, 'index.ts');
      assert.equal(fs.existsSync(filename), true, 'Missing assessment Section ' + slug);
      const section = fs.readFileSync(filename, 'utf8');
      assert.match(section, new RegExp(factory));
      assert.match(section, /TODO \(BLOCKER\):/);
      assert.match(section, /feedc0de-[0-9a-f]{4}-8[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}/);
      assert.ok(scanSource('sections/' + slug + '/index.ts', section).length >= 2);
    }
    const sectionIndex = fs.readFileSync(path.join(f.folder, 'sections/index.ts'), 'utf8');
    for (const slug of ['intro', 'quizA', 'cardsB'])
      assert.ok(sectionIndex.includes('"' + slug + '"'), 'Assessment order must retain ' + slug);
    const root = fs.readFileSync(path.join(f.folder, 'index.ts'), 'utf8');
    assert.equal(scanSource('index.ts', root).length, 2);
    const quiz = yaml.parse(fs.readFileSync(path.join(f.folder, 'questions.yaml'), 'utf8'));
    const cards = yaml.parse(fs.readFileSync(path.join(f.folder, 'flashcards.yaml'), 'utf8'));
    assert.deepEqual(quiz.sectionDrafts.order, ['quizA']);
    assert.deepEqual(cards.sectionDrafts.order, ['cardsB']);
    assert.equal(quiz.sectionDrafts.items.quizA.config.id, f.document.config.section.items.quizA.config.id);
    assert.equal(fs.existsSync(path.join(f.folder, 'production-handoff.json')), true);
    assert.throws(() => handoffLesson(f.source, { repo: f.root }), /create-only skip/);
  }));

test('bank drafts never overwrite independently authored YAML', () =>
  fixture(f => {
    withAssessmentPlan(f, [{ type: 'quiz', slug: 'quizA' }]);
    const filename = path.join(f.folder, 'questions.yaml');
    fs.writeFileSync(filename, 'independent: already authored\n');
    assert.throws(() => handoffLesson(f.source, { repo: f.root }), /refusing overwrite|refusing to overwrite/);
    assert.equal(fs.readFileSync(filename, 'utf8'), 'independent: already authored\n');
    assert.equal(fs.existsSync(f.source), true);
  }));

test('draft preflight still rejects malformed non-assessment structures', () =>
  fixture(f => {
    withAssessmentPlan(f, [{ type: 'quiz', slug: 'quizA' }]);
    delete f.document.config.section.items.intro.config.locale.title;
    f.save();
    assert.throws(() => preflightLessonDraft(f.source, f.root), /lesson.yaml:schema:/);
  }));

test('complete referenced Flashcards Section satisfies production obligation structurally', () =>
  fixture(f => {
    withAssessmentPlan(f, [{ type: 'flashcards', slug: 'cardsB' }]);
    f.document.config.section.items.cardsB.config.params.selection = { flashcardIds: [id(200)] };
    f.save();
    assert.equal(preflightLesson(f.source, f.root).assessment.pending.length, 0);
    f.document.config.section.items.cardsB.config.params.selection.flashcardIds.push(id(200));
    f.save();
    assert.throws(() => preflightLesson(f.source, f.root), /unique/);
  }));

test('deferred source preserves the original YAML when materialization is interrupted', () =>
  fixture(f => {
    withAssessmentPlan(f, [{ type: 'quiz', slug: 'quizA' }]);
    assert.throws(
      () => handoffLesson(f.source, { repo: f.root, generate: fakeGenerator(f, 'partial') }),
      /missing generated file/,
    );
    assert.equal(fs.existsSync(f.source), true);
  }));

test('finalize --preserve-config retains exact YAML after verified strict source transfer', () =>
  fixture(f => {
    const original = fs.readFileSync(f.source);
    const result = main(['finalize', '--source', path.relative(f.root, f.source), '--preserve-config'], f.root);
    assert.equal(result.removed, null);
    assert.equal(fs.readFileSync(f.source).equals(original), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'index.ts')), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'production-handoff.json')), true);
    assert.throws(
      () => main(['finalize', '--source', path.relative(f.root, f.source), '--preserve-config'], f.root),
      /create-only skip/,
    );
    assert.equal(fs.readFileSync(f.source).equals(original), true);
  }));

test('--preserve-config is strictly finalize-only and refuses malformed combinations without modifying files', () =>
  fixture(f => {
    const source = path.relative(f.root, f.source);
    const before = fs.readFileSync(f.source);
    for (const args of [
      ['preflight', '--source', source, '--preserve-config'],
      ['preflight-draft', '--source', source, '--preserve-config'],
      ['handoff', '--source', source, '--preserve-config'],
      ['finalize', '--source', source, '--unknown'],
      ['finalize', '--source', source, '--preserve-config', '--extra'],
      ['finalize', '--preserve-config', '--source', source],
    ])
      assert.throws(() => main(args, f.root), /Usage:/);
    assert.equal(fs.readFileSync(f.source).equals(before), true);
    assert.equal(fs.existsSync(path.join(f.folder, 'index.ts')), false);
  }));
