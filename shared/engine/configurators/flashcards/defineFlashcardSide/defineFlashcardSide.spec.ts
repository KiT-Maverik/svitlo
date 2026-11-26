import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { defineCarousel } from '../../contentBlocks/composite/defineCarousel';
import { defineImage } from '../../contentBlocks/primitive/defineImage';
import { defineText } from '../../contentBlocks/primitive/defineText/defineText';
import { defineFlashcardSide } from './defineFlashcardSide';
import { flashcardSideConfigurator_Schema } from './defineFlashcardSide.schemas';

describe('Configurators', () => {
  describe('Flashcards', () => {
    describe('defineFlashcardSide', () => {
      const first = defineText<'first', ['en', 'uk']>({
        id: '409a419f-5a01-46e0-aee6-4f66db492301',
        slug: 'first',
        type: 'text',
        params: {},
        locale: { value: { en: 'Question', uk: 'Питання' } },
      });
      const second = defineText<'second', ['en', 'uk']>({
        id: '409a419f-5a01-46e0-aee6-4f66db492302',
        slug: 'second',
        type: 'text',
        params: {},
        locale: { value: 'Invariant' },
      });
      const side = defineFlashcardSide<{ first: typeof first }, ['en', 'uk']>({
        items: { first },
        order: ['first'],
      });

      test('publishes ordered children with complete selected locale arrays and no invented identity', () => {
        assert.equal(flashcardSideConfigurator_Schema.safeParse(side).success, true);
        assert.equal('id' in side, false);
        assert.equal('slug' in side, false);
        assert.deepEqual(
          side.build.props({ languages: ['en'] }).base.map(item => item.slug),
          ['first'],
        );
        assert.deepEqual(Object.keys(side.build.props({ languages: ['uk'] }).locale ?? {}), ['uk']);
        const values = side.build.props({ languages: ['uk'] }).locale?.uk;
        assert.equal((values?.[0]?.locale as { value?: string })?.value, 'Питання');
        assert.doesNotThrow(() => JSON.stringify(side.build.props({ languages: ['uk'] })));
      });

      test('supports typed child overrides, additions and ordering without mutating the side', () => {
        const patched = side.build.overrides(
          {
            items: { first: { locale: { value: { uk: 'Нове питання' } } } },
            additionalItems: { second },
            order: ['second', 'first'],
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(
          patched.base.map(item => item.slug),
          ['second', 'first'],
        );
        assert.equal((patched.locale?.uk?.[1]?.locale as { value?: string })?.value, 'Нове питання');
        assert.deepEqual(side.order, ['first']);
        assert.deepEqual(
          side.build.props({ languages: ['uk'] }).base.map(item => item.slug),
          ['first'],
        );
      });

      test('rejects identity patches, invalid additions, unknown keys and structurally invalid order', () => {
        assert.throws(() =>
          side.build.overrides({ items: { first: { slug: 'hacked' } } } as never, { languages: ['en'] }),
        );
        assert.throws(
          () => side.build.overrides({ additionalItems: { second } }, { languages: ['en'] }),
          /order is required/,
        );
        assert.throws(
          () => side.build.overrides({ additionalItems: { first: first } } as never, { languages: ['en'] }),
          /Duplicate/,
        );
        assert.throws(
          () => side.build.overrides({ items: { missing: false } } as never, { languages: ['en'] }),
          /Unknown existing/,
        );
        assert.throws(() => side.build.overrides({ items: { first: false }, order: ['first'] }, { languages: ['en'] }));
        assert.throws(() =>
          defineFlashcardSide<{ first: typeof first }, ['en', 'uk']>({
            items: { first },
            order: ['missing'],
          }).build.props({ languages: ['en'] }),
        );
        assert.throws(() =>
          defineFlashcardSide<{ first: typeof first }, ['en', 'uk']>({
            items: { first: first.config.base } as never,
            order: ['first'],
          }).build.props({ languages: ['en'] }),
        );
      });

      test('rejects Composite ContentBlocks in authored sides and override additions', () => {
        const image = defineImage({
          id: '409a419f-5a01-46e0-aee6-4f66db492303',
          slug: 'image',
          type: 'image',
          params: { fill: true, aspectRatio: 1.5 },
          locale: { fileName: 'https://example.com/image.png', alt: 'Image' },
        });
        const carousel = defineCarousel({
          id: '409a419f-5a01-46e0-aee6-4f66db492304',
          slug: 'carousel',
          type: 'carousel',
          params: {},
          locale: {},
          slides: { items: { image }, order: ['image'] },
        });
        assert.throws(
          () =>
            defineFlashcardSide({
              items: { carousel },
              order: ['carousel'],
            } as never).build.props({ languages: ['en'] }),
          /Primitive ContentBlock Configurator/,
        );
        assert.throws(
          () =>
            side.build.overrides(
              {
                additionalItems: { carousel },
                order: ['first', 'carousel'],
              } as never,
              { languages: ['en'] },
            ),
          /Primitive ContentBlock Configurator/,
        );
      });

      test('supports empty optional side while required sides must remain nonempty', () => {
        const empty = defineFlashcardSide({ items: {}, order: [] });
        assert.doesNotThrow(() => empty.validate());
        assert.throws(() => empty.validate(true), /At least one item/);
        assert.throws(() => side.build.props({ languages: [] }), /nonempty languages/);
        assert.throws(() => side.build.props({ languages: ['en', 'en'] }), /unique/);
      });
    });
  });
});
