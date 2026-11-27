import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineText } from '../../contentBlocks/primitive/defineText/defineText';
import { defineFlashcardSide } from '../defineFlashcardSide';
import { defineFlashcard } from './defineFlashcard';
import {
  flashcard_Config_Schema,
  flashcard_Data_Schema,
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
      const textValue = (side: ({ children: string[] } & Record<string, unknown>) | undefined): string | undefined => {
        const key = side?.children[0];
        const block = key ? side?.[key] : undefined;
        if (!block || typeof block !== 'object' || !('type' in block) || block.type !== 'text') return undefined;
        return (('locale' in block ? block.locale : undefined) as { value?: string } | undefined)?.value;
      };
      const flagValue = (flags: readonly unknown[] | undefined, index: number): string | undefined => {
        const flag = flags?.[index];
        return flag !== null && typeof flag === 'object' && 'value' in flag && typeof flag.value === 'string'
          ? flag.value
          : undefined;
      };

      const source = {
        id: id('a4'),
        slug: 'lightCard' as const,
        parameters: {
          tags: ['math'],
          flags: [
            { type: 'list' as const, count: 4 },
            { type: 'acronym' as const, value: { en: 'ABC', uk: 'АБВ' } },
          ],
          relationships: {
            children: ['reverseLink'],
            reverseLink: {
              relationshipId: 'r1',
              type: 'reverse' as const,
              relatedFlashcardId: id('a5'),
              position: 'peer' as const,
            },
          },
        },
        content: {
          front: defineFlashcardSide<{ front: typeof front }, ['en', 'uk']>({ children: ['front'], front }),
          back: defineFlashcardSide<{ back: typeof back }, ['en', 'uk']>({ children: ['back'], back }),
          hint: defineFlashcardSide<{ hint: typeof hint }, ['en', 'uk']>({ children: ['hint'], hint }),
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
          Pick<typeof source.content.front, 'front'>,
          Pick<typeof source.content.back, 'back'>,
          Pick<typeof source.content.hint, 'hint'>,
          typeof source.parameters.flags,
          Pick<typeof source.parameters.relationships, 'reverseLink'>,
          ['en', 'uk']
        >(config);

      test('Flashcard accepts empty flags without weakening the default all-language scope', () => {
        const card = defineFlashcard({
          id: id('a7'),
          slug: 'invariantFlashcard',
          parameters: { tags: [], flags: [] },
          content: {
            front: defineFlashcardSide({ children: ['extra'], extra }),
            back: defineFlashcardSide({ children: ['extra'], extra }),
          },
        });
        const resource = card.build.data({ languages: ['en', 'uk'] });
        assert.deepEqual(resource.base.parameters.flags, []);
        assert.deepEqual(resource.base.parameters.disabilities, []);
        assert.equal(resource.locale, undefined);
      });

      test('Flashcard rejects old keyed flags and supports whole-array replacement', () => {
        const card = defineBilingualFlashcard(source);
        const legacy = { items: { list: { type: 'list', count: 3 } }, order: ['list'] };
        assert.equal(
          flashcard_Config_Schema.safeParse({
            ...source,
            parameters: { ...source.parameters, flags: legacy },
          }).success,
          false,
        );
        assert.throws(
          () => card.build.overrides({ parameters: { flags: legacy } } as never, { languages: ['en'] }),
          /Invalid Flashcard overrides/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              { parameters: { flags: [{ type: 'warning' }, { type: 'warning' }] } },
              { languages: ['en'] },
            ),
          /Duplicate built-in Flashcard flag/,
        );
        const changed = card.build.overrides(
          {
            parameters: {
              flags: [
                { type: 'custom', value: { en: 'First', uk: 'Перший' }, color: 'info' },
                { type: 'custom', value: { en: 'Second', uk: 'Другий' }, color: 'success' },
              ],
            },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          changed.base.parameters?.flags?.map(flag => flag?.type),
          ['custom', 'custom'],
        );
        assert.equal(flagValue(changed.locale?.uk?.parameters?.flags, 1), 'Другий');
        assert.deepEqual(
          card.build.data({ languages: ['en'] }).base.parameters.flags.map(x => x!.type),
          ['list', 'acronym'],
        );
      });

      test('Flashcard validates disability restrictions and publishes safe overrides', () => {
        const card = defineFlashcard({
          ...source,
          parameters: { ...source.parameters, disabilities: ['deafness'] },
        });
        assert.deepEqual(card.build.data({ languages: ['en'] }).base.parameters.disabilities, ['deafness']);
        const patch = card.build.overrides({ parameters: { disabilities: ['blindness'] } }, { languages: ['en'] });
        assert.deepEqual(patch.base.parameters?.disabilities, ['blindness']);
        assert.deepEqual(card.build.data({ languages: ['en'] }).base.parameters.disabilities, ['deafness']);
        assert.equal(
          flashcard_Config_Schema.safeParse({
            ...source,
            parameters: { ...source.parameters, disabilities: ['blindness', 'blindness'] },
          }).success,
          false,
        );
      });

      test('Flashcard composes ordered sides and unordered flag arrays as JSON-only published Props', () => {
        const card = defineBilingualFlashcard(source);
        assert.equal(card.content.front.front, front);
        assert.equal(card.build.data({ languages: ['en', 'uk'] }).base.slug, 'lightCard');
        assert.deepEqual(
          card.build.data({ languages: ['en', 'uk'] }).base.content.front.children,
          ['front'],
        );
        assert.deepEqual(
          card.build.data({ languages: ['en', 'uk'] }).base.parameters.flags.map(x => x!.type),
          ['list', 'acronym'],
        );
        assert.deepEqual(
          card.build.data({ languages: ['en', 'uk'] }).base.parameters.relationships?.children,
          ['reverseLink'],
        );
        assert.equal(textValue(card.build.data({ languages: ['en', 'uk'] }).locale?.uk?.content?.front), 'Що?');
        assert.equal(flagValue(card.build.data({ languages: ['en', 'uk'] }).locale?.en?.parameters?.flags, 1), 'ABC');
        assert.equal(flagValue(card.build.data({ languages: ['en', 'uk'] }).locale?.uk?.parameters?.flags, 1), 'АБВ');
        assert.doesNotThrow(() => JSON.stringify(card.build.data({ languages: ['en', 'uk'] })));
        assert.equal(flashcard_Config_Schema.safeParse(source).success, true);
        assert.deepEqual(
          card.config.locales().parameters.flags,
          [{}, { value: { en: 'ABC', uk: 'АБВ' } }],
          'localized Config projection retains positional array entries',
        );
        assert.equal(flashcard_Config_Schema.safeParse({ ...source, type: 'flashcard' }).success, false);
        assert.equal(flashcardConfigurator_Schema.safeParse(card).success, true);
        assert.equal(flashcard_Data_Schema.safeParse(source).success, false);
        assert.equal('override' in card, false);
        assert.equal('overrides' in card.config, false);
      });

      test('Flashcard applies independent side changes and flag array replacements without mutating authored input', () => {
        const card = defineBilingualFlashcard(source);
        const first = card.build.overrides(
          {
            content: { front: { front: false, extra, children: ['extra'] } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          first.base.content?.front?.children,
          ['extra'],
        );
        assert.deepEqual(first.locale, undefined);
        assert.deepEqual(
          card.build.data({ languages: ['en', 'uk'] }).base.content.front.children,
          ['front'],
        );
        const second = card.build.overrides(
          {
            parameters: {
              tags: ['science'],
              flags: [
                { type: 'list', count: 4 },
                { type: 'acronym', value: { en: 'ABC', uk: 'НОВЕ' } },
              ],
            },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(second.base.parameters?.tags, ['science']);
        assert.equal(flagValue(second.locale?.uk?.parameters?.flags, 1), 'НОВЕ');
        assert.equal(flagValue(second.locale?.en?.parameters?.flags, 1), 'ABC');
        assert.deepEqual(card.build.data({ languages: ['en', 'uk'] }).base.parameters.tags, ['math']);
        const cleared = card.build.overrides(
          {
            parameters: { flags: [] },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(cleared.base.parameters?.flags, []);
        assert.equal(cleared.locale, undefined);
        assert.equal(card.content.front.front, front);
      });

      test('Flashcard rejects invalid metadata, identity, duplicate flags and empty mandatory side', () => {
        const card = defineBilingualFlashcard(source);
        assert.throws(
          () => card.build.overrides({ slug: 'wrong' } as never, { languages: ['en', 'uk'] }),
          /Invalid Flashcard overrides/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                content: { front: { front: false, children: [] } },
              },
              { languages: ['en', 'uk'] },
            ),
          /At least one item/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                content: { front: { extra } },
              },
              { languages: ['en', 'uk'] },
            ),
          /children is required/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                parameters: { flags: [{ type: 'custom' }] },
              } as never,
              { languages: ['en', 'uk'] },
            ),
          /Invalid Flashcard overrides/,
        );
        assert.throws(
          () =>
            card.build.overrides(
              {
                parameters: { relationships: { reverseLink: { relationshipId: 'changed' } } },
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
                // Intentionally add an invalid duplicate flag to exercise the runtime validator.
                flags: [...source.parameters.flags, { type: 'list', count: 3 }] as never,
              },
            }).build.data({ languages: ['en'] }),
          /Duplicate built-in Flashcard flag/,
        );
        assert.throws(() =>
          defineBilingualFlashcard({
            ...source,
            content: {
              ...source.content,
              front: defineFlashcardSide({ children: ['front'], front: front.config.base } as never) as unknown as typeof source.content.front,
            },
          }).build.data({ languages: ['en'] }),
        );
      });

      test('Flashcard permits absent hint and provides independent detached results', () => {
        const { hint: _hint, ...requiredContent } = source.content;
        const card = defineBilingualFlashcard({ ...source, content: requiredContent });
        assert.equal(card.build.data({ languages: ['en', 'uk'] }).base.content.hint, undefined);
        const original = card.build.data({ languages: ['en', 'uk'] });
        const changed = card.build.overrides({ parameters: { tags: ['other'] } }, { languages: ['en', 'uk'] });
        assert.deepEqual(changed.base, { parameters: { tags: ['other'] } });
        original.base.parameters.tags.push('mutation');
        assert.deepEqual(card.build.data({ languages: ['en', 'uk'] }).base.parameters.tags, ['math']);
      });

      test('Flashcard publishes selected languages only and checks each requested resolved Props', () => {
        const card = defineBilingualFlashcard(source);
        const single = card.build.data({ languages: ['uk'] });
        assert.deepEqual(Object.keys(single.locale ?? {}), ['uk']);
        assert.equal(single.locale?.en, undefined);
        const patch = card.build.overrides(
          {
            parameters: {
              flags: [
                { type: 'list', count: 4 },
                { type: 'acronym', value: { uk: 'НОВЕ' } },
              ],
            },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(patch.locale ?? {}), ['uk']);
        assert.equal(flagValue(patch.locale?.uk?.parameters?.flags, 1), 'НОВЕ');
        assert.throws(() => card.build.data({ languages: [] }), /nonempty languages/);
        assert.throws(() => card.build.data({ languages: ['uk', 'uk'] }), /unique/);
      });
    });
  });
});
