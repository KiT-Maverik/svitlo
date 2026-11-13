import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineFlashcard } from './defineFlashcard';
import {
  flashcard_Config_Schema,
  flashcard_Props_Schema,
  flashcardConfigurator_Schema,
} from './defineFlashcard.schemas';

describe('Configurators', () => {
  describe('Flashcards', () => {
    describe('defineFlashcard', () => {
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
      const front = defineText<'front', ['en', 'uk']>({
        type: 'text',
        id: id('a1'),
        slug: 'front',
        params: {},
        locale: { value: { en: 'What?', uk: 'Що?' } },
      });
      const back = defineText<'back', ['en', 'uk']>({
        type: 'text',
        id: id('a2'),
        slug: 'back',
        params: {},
        locale: { value: { en: 'Answer', uk: 'Відповідь' } },
      });
      const hint = defineText<'hint', ['en', 'uk']>({
        type: 'text',
        id: id('a3'),
        slug: 'hint',
        params: {},
        locale: { value: { en: 'Hint', uk: 'Підказка' } },
      });
      const extra = defineText({
        type: 'text',
        id: id('a6'),
        slug: 'extra',
        params: {},
        locale: { value: 'More' },
      });
      const textValue = (blocks: { type: string; locale?: unknown }[] | undefined): string | undefined => {
        const block = blocks?.[0];
        if (block?.type !== 'text') return undefined;
        return (block.locale as { value?: string } | undefined)?.value;
      };
      const flagValue = (flags: readonly unknown[] | undefined, index: number): string | undefined => {
        const flag = flags?.[index];
        return flag !== null && typeof flag === 'object' && 'value' in flag && typeof flag.value === 'string'
          ? flag.value
          : undefined;
      };

      const source = {
        type: 'flashcard' as const,
        id: id('a4'),
        slug: 'lightCard' as const,
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
      const defineBilingualFlashcard = (
        config: Omit<typeof source, 'content'> & {
          content: {
            front: typeof source.content.front;
            back: typeof source.content.back;
            hint?: typeof source.content.hint;
          };
        },
      ) =>
        defineFlashcard<
          typeof source.slug,
          typeof source.content.front.items,
          typeof source.content.back.items,
          typeof source.content.hint.items,
          typeof source.parameters.flags.items,
          typeof source.parameters.relationships.items,
          ['en', 'uk']
        >(config);

      test('Flashcard composes ordered sides and named flags as JSON-only published Props', () => {
        const card = defineBilingualFlashcard(source);
        assert.equal(card.content.front.items.front, front);
        assert.equal(card.build.props({ languages: ['en', 'uk'] }).base.slug, 'lightCard');
        assert.deepEqual(
          card.build.props({ languages: ['en', 'uk'] }).base.content.front.map(x => x.slug),
          ['front'],
        );
        assert.deepEqual(
          card.build.props({ languages: ['en', 'uk'] }).base.parameters.flags.map(x => x!.type),
          ['list', 'acronym'],
        );
        assert.deepEqual(
          card.build.props({ languages: ['en', 'uk'] }).base.parameters.relationships?.map(x => x.relationshipId),
          ['r1'],
        );
        assert.equal(textValue(card.build.props({ languages: ['en', 'uk'] }).locale?.uk?.content?.front), 'Що?');
        assert.equal(flagValue(card.build.props({ languages: ['en', 'uk'] }).locale?.en?.parameters?.flags, 1), 'ABC');
        assert.equal(flagValue(card.build.props({ languages: ['en', 'uk'] }).locale?.uk?.parameters?.flags, 1), 'АБВ');
        assert.doesNotThrow(() => JSON.stringify(card.build.props({ languages: ['en', 'uk'] })));
        assert.equal(flashcard_Config_Schema.safeParse(source).success, true);
        assert.equal(flashcardConfigurator_Schema.safeParse(card).success, true);
        assert.equal(flashcard_Props_Schema.safeParse(source).success, false);
        assert.equal('override' in card, false);
        assert.equal('overrides' in card.config, false);
      });

      test('Flashcard applies independent side changes and sparse flag updates without mutating authored input', () => {
        const card = defineBilingualFlashcard(source);
        const first = card.build.overrides(
          {
            content: { front: { items: { front: false }, additionalItems: { extra }, order: ['extra'] } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          first.base.content?.front?.map(block => block.slug),
          ['extra'],
        );
        assert.deepEqual(first.locale, undefined);
        assert.deepEqual(
          card.build.props({ languages: ['en', 'uk'] }).base.content.front.map(block => block.slug),
          ['front'],
        );
        const second = card.build.overrides(
          {
            parameters: {
              tags: ['science'],
              flags: { items: { acronym: { value: { uk: 'НОВЕ' } } } },
            },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(second.base.parameters?.tags, ['science']);
        assert.equal(flagValue(second.locale?.uk?.parameters?.flags, 1), 'НОВЕ');
        assert.equal(flagValue(second.locale?.en?.parameters?.flags, 1), 'ABC');
        assert.deepEqual(card.build.props({ languages: ['en', 'uk'] }).base.parameters.tags, ['math']);
        const reordered = card.build.overrides(
          {
            parameters: { flags: { order: ['acronym', 'list'] } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          reordered.base.parameters?.flags?.map(x => x!.type),
          ['acronym', 'list'],
        );
        assert.equal(card.content.front.items.front, front);
      });

      test('Flashcard rejects invalid metadata, identity, duplicate flags, orphan ordering and empty mandatory side', () => {
        const card = defineBilingualFlashcard(source);
        assert.throws(
          () => card.build.overrides({ slug: 'wrong' } as never, { languages: ['en', 'uk'] }),
          /Invalid Flashcard overrides/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                content: { front: { items: { front: false }, order: [] } },
              },
              { languages: ['en', 'uk'] },
            ),
          /At least one item/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                content: { front: { additionalItems: { extra } } },
              },
              { languages: ['en', 'uk'] },
            ),
          /order is required/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                parameters: { flags: { items: { acronym: { type: 'custom' } } } },
              } as never,
              { languages: ['en', 'uk'] },
            ),
          /Invalid Flashcard overrides/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                parameters: { relationships: { items: { reverseLink: { relationshipId: 'changed' } } } },
              } as never,
              { languages: ['en', 'uk'] },
            ),
          /Invalid Flashcard overrides/,
        );
        assert.throws(
          () =>
            defineBilingualFlashcard({
              ...source,
              parameters: {
                ...source.parameters,
                flags: {
                  // Intentionally add an invalid duplicate flag to exercise the runtime validator.
                  items: { ...source.parameters.flags.items, duplicate: { type: 'list', count: 3 } } as never,
                  order: ['list', 'acronym', 'duplicate'],
                },
              },
            }),
          /Duplicate built-in Flashcard flag/,
        );
        assert.throws(() =>
          defineBilingualFlashcard({
            ...source,
            content: {
              ...source.content,
              front: {
                // @ts-expect-error Raw content must not be nested as a configurator.
                items: { front: front.config.base },
                order: ['front'],
              },
            },
          }),
        );
      });

      test('Flashcard permits absent hint and provides independent detached results', () => {
        const { hint: _hint, ...requiredContent } = source.content;
        const card = defineBilingualFlashcard({ ...source, content: requiredContent });
        assert.equal(card.build.props({ languages: ['en', 'uk'] }).base.content.hint, undefined);
        const original = card.build.props({ languages: ['en', 'uk'] });
        const changed = card.build.overrides({ parameters: { tags: ['other'] } }, { languages: ['en', 'uk'] });
        assert.deepEqual(changed.base, { parameters: { tags: ['other'] } });
        original.base.parameters.tags.push('mutation');
        assert.deepEqual(card.build.props({ languages: ['en', 'uk'] }).base.parameters.tags, ['math']);
      });

      test('Flashcard publishes selected languages only and checks each requested resolved Props', () => {
        const card = defineBilingualFlashcard(source);
        const single = card.build.props({ languages: ['uk'] });
        assert.deepEqual(Object.keys(single.locale ?? {}), ['uk']);
        assert.equal(single.locale?.en, undefined);
        const patch = card.build.overrides(
          {
            parameters: { flags: { items: { acronym: { value: { uk: 'НОВЕ' } } } } },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.equal(flagValue(patch.locale?.uk?.parameters?.flags, 1), 'НОВЕ');
        assert.throws(() => card.build.props({ languages: [] }), /nonempty languages/);
        assert.throws(() => card.build.props({ languages: ['uk', 'uk'] }), /unique/);
      });
    });
  });
});
