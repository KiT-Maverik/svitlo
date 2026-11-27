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
        children: ['first'], first,
      });

      test('publishes ordered children with complete selected locale arrays and no invented identity', () => {
        assert.equal(flashcardSideConfigurator_Schema.safeParse(side).success, true);
        assert.equal('id' in side, false);
        assert.equal('slug' in side, false);
        assert.deepEqual(
          side.build.data({ languages: ['en'] }).base.children,
          ['first'],
        );
        assert.deepEqual(Object.keys(side.build.data({ languages: ['uk'] }).locale ?? {}), ['uk']);
        const values = side.build.data({ languages: ['uk'] }).locale?.uk;
        assert.equal((values?.first as { locale?: { value?: string } } | undefined)?.locale?.value, 'Питання');
        assert.doesNotThrow(() => JSON.stringify(side.build.data({ languages: ['uk'] })));
      });

      test('supports typed child overrides, additions and ordering without mutating the side', () => {
        const patched = side.build.overrides(
          {
            first: { locale: { value: { uk: 'Нове питання' } } },
            second,
            children: ['second', 'first'],
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(
          patched.base.children,
          ['second', 'first'],
        );
        assert.equal((patched.locale?.uk?.first as { locale?: { value?: string } } | undefined)?.locale?.value, 'Нове питання');
        assert.deepEqual(side.children, ['first']);
        assert.deepEqual(
          side.build.data({ languages: ['uk'] }).base.children,
          ['first'],
        );
      });

      test('rejects identity patches, invalid additions, unknown keys and structurally invalid order', () => {
        assert.throws(() =>
          side.build.overrides({ first: { slug: 'hacked' } } as never, { languages: ['en'] }),
        );
        assert.throws(
          () => side.build.overrides({ second }, { languages: ['en'] }),
          /children.*required/,
        );
        assert.throws(
          () => side.build.overrides({ first } as never, { languages: ['en'] }),
          /patch/,
        );
        assert.throws(
          () => side.build.overrides({ missing: false } as never, { languages: ['en'] }),
          /Invalid Flashcard side child/,
        );
        assert.throws(() => side.build.overrides({ first: false, children: ['first'] }, { languages: ['en'] }));
        assert.throws(() =>
          defineFlashcardSide<{ first: typeof first }, ['en', 'uk']>({
            children: ['missing'] as never, first,
          }).build.data({ languages: ['en'] }),
        );
        assert.throws(() =>
          defineFlashcardSide<{ first: typeof first }, ['en', 'uk']>({
            children: ['first'], first: first.config.base as never,
          }).build.data({ languages: ['en'] }),
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
        const carousel = defineCarousel<'carousel', { image: typeof image }>({
          id: '409a419f-5a01-46e0-aee6-4f66db492304',
          slug: 'carousel',
          type: 'carousel',
          params: {},
          locale: {},
          children: ['image'], image,
        });
        assert.throws(
          () =>
            defineFlashcardSide({
              children: ['carousel'], carousel,
            } as never).build.data({ languages: ['en'] }),
          /Primitive ContentBlock Configurator/,
        );
        assert.throws(
          () =>
            side.build.overrides(
              {
                carousel,
                children: ['first', 'carousel'],
              } as never,
              { languages: ['en'] },
            ),
          /Primitive ContentBlock Configurator/,
        );
      });

      test('supports empty optional side while required sides must remain nonempty', () => {
        const empty = defineFlashcardSide({ children: [] });
        assert.doesNotThrow(() => empty.validate());
        assert.throws(() => empty.validate(true), /At least one item/);
        assert.throws(() => side.build.data({ languages: [] }), /nonempty languages/);
        assert.throws(() => side.build.data({ languages: ['en', 'en'] }), /unique/);
      });
    });
  });
});
