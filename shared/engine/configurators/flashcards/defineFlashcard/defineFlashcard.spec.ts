import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineFlashcard } from './defineFlashcard';
import {
  flashcard_Config_Schema,
  flashcard_Props_Schema,
  flashcardConfigurator_Schema,
} from './defineFlashcard.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const front = defineText({
  type: 'text', id: id('a1'), slug: 'front', params: {},
  locale: { value: { en: 'What?', uk: 'Що?' } },
});
const back = defineText({
  type: 'text', id: id('a2'), slug: 'back', params: {},
  locale: { value: { en: 'Answer', uk: 'Відповідь' } },
});
const hint = defineText({
  type: 'text', id: id('a3'), slug: 'hint', params: {},
  locale: { value: { en: 'Hint', uk: 'Підказка' } },
});

const source = {
  type: 'flashcard' as const,
  id: id('a4'),
  slug: 'lightCard',
  parameters: {
    tags: ['math'],
    flags: {
      items: {
        list: { type: 'list' as const, count: 4 },
        acronym: { type: 'acronym' as const, value: { en: 'ABC', uk: 'АБВ' } },
      },
      order: ['list', 'acronym'],
    },
    relationships: {
      items: {
        reverseLink: {
          relationshipId: 'r1',
          type: 'reverse' as const,
          relatedFlashcardId: id('a5'),
          position: 'peer' as const,
        },
      },
      order: ['reverseLink'],
    },
  },
  content: {
    front: { items: { front }, order: ['front'] },
    back: { items: { back }, order: ['back'] },
    hint: { items: { hint }, order: ['hint'] },
  },
};

test('Flashcard separates identity, metadata, locales and ordered child blocks', () => {
  const card = defineFlashcard(source);
  assert.equal(card.content.front.items.front, front);
  assert.equal(card.content.back.items.back, back);
  assert.equal(card.content.hint?.items.hint, hint);
  assert.equal(card.config.base.slug, 'lightCard');
  assert.equal(card.config.base.parameters.flags.items.list.count, 4);
  assert.deepEqual(card.config.base.parameters.flags.order, ['list', 'acronym']);
  assert.deepEqual(card.config.base.parameters.relationships?.order, ['reverseLink']);
  assert.deepEqual(card.config.locales(), {
    parameters: { flags: { items: { acronym: { value: { en: 'ABC', uk: 'АБВ' } } } } },
  });
  assert.equal(flashcard_Config_Schema.safeParse(source).success, true);
  assert.equal(flashcardConfigurator_Schema.safeParse(card).success, true);
  assert.equal(flashcard_Props_Schema.safeParse(source).success, false);
});

test('Flashcard applies sparse content overrides without changing authored collections', () => {
  const card = defineFlashcard(source);
  const extra = defineText({
    type: 'text', id: id('a6'), slug: 'extra', params: {},
    locale: { value: { en: 'More', uk: 'Більше' } },
  });
  card.override.content.front.add('extra', extra);
  assert.deepEqual(card.content.front.order, ['front']);
  assert.deepEqual(card.config.overrides.content?.front?.order, ['front', 'extra']);
  card.override.content.front.disable(['front']);
  assert.deepEqual(card.config.overrides.content?.front?.order, ['extra']);
  assert.equal(card.config.overrides.content?.front?.items?.front, false);
  card.override.content.front.order(['extra']);
  card.override.parameters({ tags: ['science'] });
  card.disable();
  assert.equal(card.config.overrides.parameters?.disabled, true);
  assert.deepEqual(card.config.overrides.parameters?.tags, ['science']);
});

test('Flashcard rejects invalid child boundary, ordering, flags and relationships', () => {
  assert.throws(() => defineFlashcard({
    ...source,
    content: { ...source.content, front: { items: { front: front.config.base }, order: ['front'] } },
  } as never));
  assert.throws(() => defineFlashcard({
    ...source,
    content: { ...source.content, back: { items: { mislabeled: back }, order: ['mislabeled'] } },
  }));
  assert.throws(() => defineFlashcard({
    ...source,
    content: { ...source.content, front: { items: { front }, order: ['front', 'front'] } },
  }));
  assert.throws(() => defineFlashcard({
    ...source,
    parameters: { ...source.parameters, flags: { ...source.parameters.flags, order: ['list', 'list'] } },
  }));
  assert.equal(flashcard_Config_Schema.safeParse({
    ...source,
    parameters: {
      ...source.parameters,
      relationships: {
        items: { reverseLink: { ...source.parameters.relationships.items.reverseLink, type: 'invalid' } },
        order: ['reverseLink'],
      },
    },
  }).success, false);
  assert.equal(flashcard_Config_Schema.safeParse({
    ...source,
    parameters: {
      ...source.parameters,
      flags: { items: { list: { type: 'list', count: 1 } }, order: ['list'] },
    },
  }).success, false);
});

test('Flashcard permits an omitted hint and rejects duplicate semantic entries', () => {
  const { hint: _hint, ...requiredContent } = source.content;
  const card = defineFlashcard({ ...source, content: requiredContent });
  assert.equal(card.content.hint, undefined);

  assert.throws(() => defineFlashcard({
    ...source,
    parameters: {
      ...source.parameters,
      flags: {
        items: { ...source.parameters.flags.items, secondList: { type: 'list', count: 3 } },
        order: ['list', 'acronym', 'secondList'],
      },
    },
  }));
  assert.throws(() => defineFlashcard({
    ...source,
    parameters: {
      ...source.parameters,
      relationships: {
        items: {
          ...source.parameters.relationships.items,
          otherLink: { ...source.parameters.relationships.items.reverseLink },
        },
        order: ['reverseLink', 'otherLink'],
      },
    },
  }));
});
