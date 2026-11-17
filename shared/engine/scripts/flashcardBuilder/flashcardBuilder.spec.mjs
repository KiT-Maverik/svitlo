import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import yaml from 'yaml';
import ts from 'typescript';

import { renderFlashcardBank, runOne } from './flashcardBuilder.mjs';

const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const id = suffix => '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0');
const block = (slug, index, value) => ({
  id: id(index), slug, type: 'text', params: {}, locale: { value: { en: value } },
});
const card = (slug, index, front, back) => ({
  id: id(index), slug, parameters: {
    tags: ['recall'], disabilities: [], flags: { items: {}, order: [] },
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
  assert(!first.includes('type: \'flashcard\''), 'the authored kind is derived by the factory');
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
  assert.deepEqual(ts.createSourceFile('flashcards/index.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).parseDiagnostics, []);
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
  duplicate.relationships.items.duplicate = { relationshipId: 'second', type: 'reverse', source: 'second', target: 'first' };
  duplicate.relationships.order.push('duplicate');
  assert.throws(() => renderFlashcardBank(duplicate), /duplicate Flashcard relationship/);
  const identityConflict = createBank();
  identityConflict.relationships.items.secondLink = {
    relationshipId: 'reverse-pair', type: 'contrast', source: 'first', target: 'second',
  };
  identityConflict.relationships.order.push('secondLink');
  assert.throws(() => renderFlashcardBank(identityConflict), /duplicate Flashcard relationship ID/);
  const unsupported = createBank();
  unsupported.flashcards.items.first.content.front.items.front.type = 'image';
  assert.throws(() => renderFlashcardBank(unsupported), /invalid|Invalid|code|type|Required/i);
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
    assert.throws(() => runOne(textbook, lessonId, '--write', folder), /refusing overwrite/);
    assert.throws(() => runOne(textbook, lessonId, '--check', folder), /refusing overwrite/);
    assert.match(fs.readFileSync(output, 'utf8'), /manually edited/);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test('TEMPORARY: expose exact Prettier-formatted Flashcard schema for #646 regeneration', async () => {
  const { fileURLToPath } = await import('node:url');
  const prettier = await import('prettier');
  const sourcePath = fileURLToPath(new URL('../../yaml-schemas/flashcard.schema.json', import.meta.url));
  const source = fs.readFileSync(sourcePath, 'utf8');
  const formatted = await prettier.format(source, { filepath: sourcePath });
  console.log('SVITLO_PRETTIER_FLASHCARD_HEX:' + Buffer.from(formatted, 'utf8').toString('hex'));
});
