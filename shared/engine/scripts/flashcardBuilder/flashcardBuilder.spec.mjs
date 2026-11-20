import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import yaml from 'yaml';
import { scanSource } from '../../../../scripts/ci/checkBlockerTodos/check-blocker-todos.mjs';
import ts from 'typescript';

import { renderFlashcardBank, runOne } from './flashcardBuilder.mjs';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const block = (slug, index, value) => ({
  id: id(index),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: value } },
});
const card = (slug, index, front, back) => ({
  id: id(index),
  slug,
  parameters: {
    tags: ['recall'],
    disabilities: [],
    flags: [],
  },
  content: {
    front: { items: { front: block('front', index + 100, front) }, order: ['front'] },
    back: { items: { back: block('back', index + 200, back) }, order: ['back'] },
  },
});
const createBank = () => ({
  lessonId,
  documentLanguage: 'en',
  supportedLanguages: ['en', 'uk'],
  flashcards: {
    items: {
      first: card('first', 1, 'What is A?', 'A'),
      second: card('second', 2, 'What represents A?', 'Example A'),
    },
    order: ['first', 'second'],
  },
  relationships: {
    items: { reversePair: { relationshipId: 'reverse-pair', type: 'reverse', source: 'first', target: 'second' } },
    order: ['reversePair'],
  },
});

test('renders deterministic Engine-shaped Flashcard calls and mirrors canonical edges', () => {
  const bank = createBank();
  const first = renderFlashcardBank(bank);
  assert.equal(first, renderFlashcardBank(bank));
  assert.match(first, /defineFlashcard\(/);
  assert.match(first, /defineFlashcardSide\(/);
  assert.match(first, /relatedFlashcardId/);
  assert.match(first, /reverse-pair/);
  assert.match(first, /planned Lesson languages: en, uk/i);
  assert(!first.includes("type: 'flashcard'"), 'the authored kind is derived by the factory');
  const parsed = ts.createSourceFile('flashcards/index.ts', first, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(parsed.parseDiagnostics, []);
  assert.equal(bank.flashcards.items.first.parameters.relationships, undefined, 'input is never mutated');
});

test('reserved-word slugs stay valid map keys but never become JavaScript declaration names', () => {
  const bank = createBank();
  const reserved = bank.flashcards.items.first;
  delete bank.flashcards.items.first;
  reserved.slug = 'default';
  bank.flashcards.items.default = reserved;
  bank.flashcards.order[0] = 'default';
  bank.relationships.items.reversePair.source = 'default';
  const source = renderFlashcardBank(bank);
  assert.match(source, /"default": flashcard_0/);
  assert.doesNotMatch(source, /const default =/);
  assert.deepEqual(
    ts.createSourceFile('flashcards/index.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).parseDiagnostics,
    [],
  );
});

test('rejects invalid IDs, unapproved metadata and stale or ambiguous relationship edges', () => {
  const bad = createBank();
  bad.flashcards.items.first.slug = 'wrong';
  assert.throws(() => renderFlashcardBank(bad), /slug\/map mismatch/);
  const sameIds = createBank();
  sameIds.flashcards.items.second.id = sameIds.flashcards.items.first.id;
  assert.throws(() => renderFlashcardBank(sameIds), /duplicate Flashcard UUID/);
  const extra = createBank();
  extra.status = 'approved';
  assert.throws(() => renderFlashcardBank(extra), /unknown top-level field/);
  const orphan = createBank();
  orphan.relationships.items.reversePair.target = 'unknown';
  assert.throws(() => renderFlashcardBank(orphan), /missing card/);
  const self = createBank();
  self.relationships.items.reversePair.target = 'first';
  assert.throws(() => renderFlashcardBank(self), /self-linked/);
  const duplicate = createBank();
  duplicate.relationships.items.duplicate = {
    relationshipId: 'second',
    type: 'reverse',
    source: 'second',
    target: 'first',
  };
  duplicate.relationships.order.push('duplicate');
  assert.throws(() => renderFlashcardBank(duplicate), /duplicate Flashcard relationship/);
  const identityConflict = createBank();
  identityConflict.relationships.items.secondLink = {
    relationshipId: 'reverse-pair',
    type: 'contrast',
    source: 'first',
    target: 'second',
  };
  identityConflict.relationships.order.push('secondLink');
  assert.throws(() => renderFlashcardBank(identityConflict), /duplicate Flashcard relationship ID/);
  const unsupported = createBank();
  unsupported.flashcards.items.first.content.front.items.front.type = 'image';
  assert.throws(() => renderFlashcardBank(unsupported), /invalid|Invalid|code|type|Required/i);
});

test('accepts Flashcard flag arrays, rejects duplicate types, and preserves authored locales', () => {
  const bank = createBank();
  bank.flashcards.items.first.parameters.flags = [
    { type: 'list', count: 3 },
    { type: 'acronym', value: { en: 'ABC' } },
    { type: 'custom', value: { en: 'Reminder' }, color: 'info' },
    { type: 'custom', value: { en: 'Note' }, color: 'success' },
  ];
  const output = renderFlashcardBank(bank);
  assert(output.includes('"flags": ['), 'builder emits a plain array');
  assert.deepEqual(bank.flashcards.items.first.parameters.flags.map(flag => flag.type),
    ['list', 'acronym', 'custom', 'custom'], 'source is unchanged');

  const legacy = structuredClone(bank);
  legacy.flashcards.items.first.parameters.flags = { items: {}, order: [] };
  assert.throws(() => renderFlashcardBank(legacy));

  const duplicate = structuredClone(bank);
  duplicate.flashcards.items.first.parameters.flags.push({ type: 'list', count: 2 });
  assert.throws(() => renderFlashcardBank(duplicate), /Duplicate built-in Flashcard flag/);

  const foreign = structuredClone(bank);
  foreign.flashcards.items.first.parameters.flags[1].value.uk = 'АБВ';
  assert.throws(() => renderFlashcardBank(foreign), /must author only documentLanguage en/);

  const malformed = structuredClone(bank);
  malformed.flashcards.items.first.parameters.flags[0].count = 1;
  assert.throws(() => renderFlashcardBank(malformed));
});

test('create-only builder never overwrites TS, retains YAML and strictly checks drift', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-flashcard-builder-'));
  try {
    const textbook = path.join(folder, 'content', 'fixture');
    const lesson = path.join(textbook, 'data', 'lessons', lessonId.at(-1), lessonId);
    fs.mkdirSync(lesson, { recursive: true });
    fs.writeFileSync(path.join(textbook, 'package.json'), '{"name":"fixture"}\n');
    fs.writeFileSync(path.join(lesson, 'flashcards.yaml'), yaml.stringify(createBank()));
    const preview = runOne(textbook, lessonId, '--preflight', folder);
    assert.equal(preview.created, false);
    assert.equal(fs.existsSync(path.join(lesson, 'flashcards', 'index.ts')), false);
    assert.throws(() => runOne(textbook, lessonId, '--check', folder), /missing Flashcard TS scaffold/);
    assert.equal(runOne(textbook, lessonId, '--write', folder).created, true);
    assert.equal(runOne(textbook, lessonId, '--write', folder).created, false);
    assert.equal(runOne(textbook, lessonId, '--check', folder).created, false);
    assert.equal(fs.existsSync(path.join(lesson, 'flashcards.yaml')), true);
    const output = path.join(lesson, 'flashcards', 'index.ts');
    fs.appendFileSync(output, '// manually edited\n');
    const handEdited = fs.readFileSync(output, 'utf8');
    assert.deepEqual(runOne(textbook, lessonId, '--write', folder), {
      created: false,
      skipped: true,
      reason: 'existing authored Flashcard entrypoint',
    });
    assert.equal(fs.readFileSync(output, 'utf8'), handEdited);
    assert.throws(() => runOne(textbook, lessonId, '--check', folder), /manually edited/);
    fs.writeFileSync(path.join(lesson, 'flashcards.yaml'), ': invalid [ yaml');
    assert.equal(runOne(textbook, lessonId, '--write', folder).skipped, true);
    assert.equal(fs.readFileSync(output, 'utf8'), handEdited);
    assert.match(fs.readFileSync(output, 'utf8'), /manually edited/);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test('partial Flashcard tree without entrypoint blocks create-only generation', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-flashcards-partial-'));
  try {
    const textbook = path.join(folder, 'content', 'playground');
    const lesson = path.join(textbook, 'data', 'lessons', lessonId.at(-1), lessonId);
    fs.mkdirSync(path.join(lesson, 'flashcards', 'first'), { recursive: true });
    fs.writeFileSync(path.join(textbook, 'package.json'), '{"name":"fixture"}\n');
    fs.writeFileSync(path.join(lesson, 'flashcards.yaml'), yaml.stringify(createBank()));
    const authored = path.join(lesson, 'flashcards', 'first', 'index.ts');
    fs.writeFileSync(authored, '// authored card\n');
    assert.throws(() => runOne(textbook, lessonId, '--write', folder), /Partial Flashcard Bank tree/);
    assert.equal(fs.readFileSync(authored, 'utf8'), '// authored card\n');
    assert.equal(fs.existsSync(path.join(lesson, 'flashcards', 'index.ts')), false);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test('media Config drafts retain independently owned block UUIDs without inventing physical asset paths', () => {
  const bank = createBank();
  const audio = {
    id: id(401),
    slug: 'stimulusAudio',
    type: 'audio',
    params: {},
    locale: { title: { en: 'A bell rings' } },
  };
  const image = {
    id: id(402),
    slug: 'diagram',
    type: 'image',
    params: { fill: true, aspectRatio: 1 },
    locale: { alt: { en: 'One triangle' } },
  };
  const video = {
    id: id(403),
    slug: 'motion',
    type: 'video',
    params: {},
    locale: { label: { en: 'Motion demonstration' } },
  };
  const subtitles = { id: id(404), slug: 'captions', type: 'subtitles', params: {}, locale: {} };
  bank.flashcards.items.first.content.front = {
    items: { stimulusAudio: audio, diagram: image },
    order: ['stimulusAudio', 'diagram'],
  };
  bank.flashcards.items.first.content.back = {
    items: { motion: video, captions: subtitles },
    order: ['motion', 'captions'],
  };
  const source = renderFlashcardBank(bank);
  for (const kind of ['Audio', 'Image', 'Video', 'Subtitles']) {
    assert.match(source, new RegExp('define' + kind + '\\('));
  }
  assert.equal((source.match(/TODO\(asset\)/g) ?? []).length, 4);
  assert.equal((source.match(/TODO \(BLOCKER\):/g) ?? []).length, 4);
  assert.equal(scanSource('flashcards/index.ts', source).length, 4);
  assert.match(source, /locale\.fileName and posterFileName/);
  assert.doesNotMatch(source, /"fileName":|"posterFileName":/);
  assert.deepEqual(
    ts.createSourceFile('flashcards/index.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).parseDiagnostics,
    [],
  );
  assert.equal(bank.flashcards.items.first.content.front.items.stimulusAudio.locale.fileName, undefined);
});

test('source-language drafts reject mixed or foreign locale values without reducing planned Lesson languages', () => {
  const bank = createBank();
  const mixed = structuredClone(bank);
  mixed.flashcards.items.first.content.front.items.front.locale.value.uk = 'Що таке A?';
  assert.throws(() => renderFlashcardBank(mixed), /must author only documentLanguage en/);

  const foreignOnly = structuredClone(bank);
  foreignOnly.flashcards.items.first.content.front.items.front.locale.value = { uk: 'Що таке A?' };
  assert.throws(() => renderFlashcardBank(foreignOnly), /must author only documentLanguage en/);

  const uk = structuredClone(bank);
  uk.documentLanguage = 'uk';
  for (const card of Object.values(uk.flashcards.items)) {
    for (const side of [card.content.front, card.content.back]) {
      for (const item of Object.values(side.items)) {
        item.locale.value.uk = item.locale.value.en;
        delete item.locale.value.en;
      }
    }
  }
  assert.match(renderFlashcardBank(uk), /documentLanguage: uk/);
  assert.match(renderFlashcardBank(bank), /Planned Lesson languages: en, uk/);
});

test('read-only Flashcards Section check accepts reviewed UUID subsets and rejects bad registry/IDs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-flashcards-sections-'));
  try {
    const textbook = path.join(root, 'content', 'playground');
    const lesson = path.join(textbook, 'data', 'lessons', lessonId.at(-1), lessonId);
    const sectionDir = path.join(lesson, 'sections', 'recall');
    fs.mkdirSync(sectionDir, { recursive: true });
    fs.writeFileSync(path.join(textbook, 'package.json'), '{"name":"@svitlo/playground"}\n');
    fs.writeFileSync(path.join(lesson, 'flashcards.yaml'), yaml.stringify(createBank()));
    runOne(textbook, lessonId, '--write', root);
    const entrypoint = path.join(lesson, 'flashcards', 'index.ts');
    const original = fs.readFileSync(entrypoint, 'utf8');
    const registry = path.join(lesson, 'sections', 'index.ts');
    const sectionFile = path.join(sectionDir, 'index.ts');
    fs.writeFileSync(
      registry,
      "import { recall } from './recall';\nexport const section = { items: { recall }, order: ['recall'] };\n",
    );
    const section = ids =>
      "export const recall = defineFlashcardsSection({ id: '" +
      id(700) +
      "', slug: 'recall', params: { selection: { flashcardIds: " +
      JSON.stringify(ids) +
      ' } } });\n';
    fs.writeFileSync(sectionFile, section([id(1)]));
    assert.deepEqual(runOne(textbook, lessonId, '--verify-sections', root), { sections: 1, selectedCards: 1 });
    fs.writeFileSync(sectionFile, section([id(999)]));
    assert.throws(() => runOne(textbook, lessonId, '--verify-sections', root), /absent from complete bank/);
    fs.writeFileSync(sectionFile, section([id(1), id(1)]));
    assert.throws(() => runOne(textbook, lessonId, '--verify-sections', root), /Duplicate selected/);
    fs.writeFileSync(sectionFile, section([id(1)]));
    fs.writeFileSync(registry, 'export const section = { items: {}, order: [] };\n');
    assert.throws(() => runOne(textbook, lessonId, '--verify-sections', root), /absent from static Lesson registry/);
    fs.rmSync(sectionDir, { recursive: true });
    assert.deepEqual(runOne(textbook, lessonId, '--verify-sections', root), { sections: 0, selectedCards: 0 });
    assert.equal(fs.readFileSync(entrypoint, 'utf8'), original);
    assert.equal(fs.existsSync(path.join(lesson, 'flashcards.yaml')), true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
