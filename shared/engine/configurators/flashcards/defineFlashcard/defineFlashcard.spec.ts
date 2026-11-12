import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineFlashcard } from './defineFlashcard';
import {
  flashcard_Config_Schema, flashcard_Props_Schema, flashcardConfigurator_Schema,
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
const extra = defineText({
  type: 'text', id: id('a6'), slug: 'extra', params: {},
  locale: { value: 'More' },
});
const source = {
  type: 'flashcard' as const, id: id('a4'), slug: 'lightCard',
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
          relationshipId: 'r1', type: 'reverse' as const,
          relatedFlashcardId: id('a5'), position: 'peer' as const,
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
test('Flashcard composes ordered sides and named flags as JSON-only published Props', () => {
  const card = defineFlashcard(source);
  assert.equal(card.content.front.items.front, front);
  assert.equal(card.build.props().base.slug, 'lightCard');
  assert.deepEqual(card.build.props().base.content.front.map(x => x.slug), ['front']);
  assert.deepEqual(card.build.props().base.parameters.flags.map(x => x.type), ['list', 'acronym']);
  assert.deepEqual(card.build.props().base.parameters.relationships?.map(x => x.relationshipId), ['r1']);
  assert.equal(card.build.props().locale?.uk?.content?.front?.[0]?.locale?.value, 'Що?');
  assert.equal(card.build.props().locale?.en?.parameters?.flags?.[1]?.value, 'ABC');
  assert.equal(card.build.props().locale?.uk?.parameters?.flags?.[1]?.value, 'АБВ');
  assert.doesNotThrow(() => JSON.stringify(card.build.props()));
  assert.equal(flashcard_Config_Schema.safeParse(source).success, true);
  assert.equal(flashcardConfigurator_Schema.safeParse(card).success, true);
  assert.equal(flashcard_Props_Schema.safeParse(source).success, false);
  assert.equal('override' in card, false);
  assert.equal('overrides' in card.config, false);
});

test('Flashcard applies independent side changes and sparse flag updates without mutating authored input', () => {
  const card = defineFlashcard(source);
  const first = card.build.overrides({
    content: { front: { items: { front: false }, additionalItems: { extra }, order: ['extra'] } },
  });
  assert.deepEqual(first.base.content?.front?.map(block => block.slug), ['extra']);
  assert.deepEqual(first.locale, undefined);
  assert.deepEqual(card.build.props().base.content.front.map(block => block.slug), ['front']);
  const second = card.build.overrides({
    parameters: {
      tags: ['science'],
      flags: { items: { acronym: { value: { uk: 'НОВЕ' } } } },
    },
  });
  assert.deepEqual(second.base.parameters?.tags, ['science']);
  assert.equal(second.locale?.uk?.parameters?.flags?.[1]?.value, 'НОВЕ');
  assert.equal(second.locale?.en?.parameters?.flags?.[1]?.value, 'ABC');
  assert.deepEqual(card.build.props().base.parameters.tags, ['math']);
  const reordered = card.build.overrides({
    parameters: { flags: { order: ['acronym', 'list'] } },
  });
  assert.deepEqual(reordered.base.parameters?.flags?.map(x => x.type), ['acronym', 'list']);
  assert.equal(card.content.front.items.front, front);
});

test('Flashcard rejects invalid metadata, identity, duplicate flags, orphan ordering and empty mandatory side', () => {
  const card = defineFlashcard(source);
  assert.throws(() => card.build.overrides({ slug: 'wrong' } as never), /Invalid Flashcard overrides/);
  assert.throws(() => card.build.overrides({
    content: { front: { items: { front: false }, order: [] } },
  }), /At least one item/);
  assert.throws(() => card.build.overrides({
    content: { front: { additionalItems: { extra } } },
  }), /order is required/);
  assert.throws(() => card.build.overrides({
    parameters: { flags: { items: { acronym: { type: 'custom' } } } },
  } as never), /Invalid Flashcard overrides/);
  assert.throws(() => card.build.overrides({
    parameters: { relationships: { items: { reverseLink: { relationshipId: 'changed' } } } },
  } as never), /Invalid Flashcard overrides/);
  assert.throws(() => defineFlashcard({
    ...source, parameters: { ...source.parameters, flags: {
      items: { ...source.parameters.flags.items, duplicate: { type: 'list', count: 3 } },
      order: ['list', 'acronym', 'duplicate'],
    } },
  }), /Duplicate built-in Flashcard flag/);
  assert.throws(() => defineFlashcard({
    ...source,
    content: { ...source.content, front: {
      // @ts-expect-error Raw content must not be nested as a configurator.
      items: { front: front.config.base }, order: ['front'],
    } },
  }));
});

test('Flashcard permits absent hint and provides independent detached results', () => {
  const { hint: _hint, ...requiredContent } = source.content;
  const card = defineFlashcard({ ...source, content: requiredContent });
  assert.equal(card.build.props().base.content.hint, undefined);
  const original = card.build.props();
  const changed = card.build.overrides({ parameters: { tags: ['other'] } });
  assert.deepEqual(changed.base, { parameters: { tags: ['other'] } });
  original.base.parameters.tags.push('mutation');
  assert.deepEqual(card.build.props().base.parameters.tags, ['math']);
});
