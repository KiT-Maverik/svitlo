import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineFlashcard } from './defineFlashcard';
import { flashcard_Config_Schema, flashcard_Props_Schema } from './defineFlashcard.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const text = defineText({
  type: 'text', id: id('a1'), slug: 'front', params: {},
  value: { en: 'What?', uk: 'Що?' },
});
const source = {
  type: 'flashcard' as const,
  id: id('a2'),
  front: [text],
  back: [text],
  hint: [text],
  tags: ['math'],
  flags: [{ type: 'warning' as const }, { type: 'acronym' as const, value: { en: 'ABC', uk: 'АБВ' } }],
  relationships: [{
    relationshipId: 'r1', type: 'reverse' as const,
    relatedFlashcardId: id('a3'), position: 'peer' as const,
  }],
};

test('Flashcard validates nested definitions and preserves ordered blocks', () => {
  const card = defineFlashcard(source);
  assert.equal(card.front[0], text);
  assert.equal(card.back[0], text);
  assert.equal(card.hint[0], text);
  assert.equal(card.config.base.type, 'flashcard');
  assert.equal(card.config.base.relationships?.[0].type, 'reverse');
  assert.deepEqual(card.config.locales(), {
    flags: [{}, { value: { en: 'ABC', uk: 'АБВ' } }],
  });
  assert.equal(JSON.stringify(card.config.base).includes('function'), false);
  assert.equal(flashcard_Config_Schema.safeParse(source).success, true);
});

test('Flashcard rejects raw child configs and invalid relationship variants', () => {
  assert.equal(flashcard_Config_Schema.safeParse({ ...source, front: [text.config.base] }).success, false);
  assert.equal(flashcard_Config_Schema.safeParse({
    ...source, relationships: [{ ...source.relationships[0], type: 'invalid' }],
  }).success, false);
  assert.equal(flashcard_Props_Schema.safeParse(source).success, false);
});
