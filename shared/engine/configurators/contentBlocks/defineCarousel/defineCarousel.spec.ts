import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { defineCarousel, defineCarouselSlide, carousel_Props_Schema } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCarousel', () => {
      const ids = Array.from({ length: 4 }, (_, index) => 'b775647f-203d-481a-a1c7-4d331c779d7' + index);
      const slide = <const Slug extends string>(
        slug: Slug,
        id: string,
        locale: {
          src: string | Record<'en' | 'uk', string>;
          alt: string | Record<'en' | 'uk', string>;
          caption?: string | Record<'en' | 'uk', string>;
        },
      ) => defineCarouselSlide<Slug, ['en', 'uk']>({ id, slug, type: 'carouselSlide', locale });

      const example = () => {
        const first = slide('first', ids[1], {
          src: { en: 'https://example.com/en-a.png', uk: 'https://example.com/uk-a.png' },
          alt: 'First',
        });
        const second = slide('second', ids[2], { src: 'https://example.com/b.png', alt: 'Second' });
        const carousel = defineCarousel<'gallery', { first: typeof first; second: typeof second }, ['en', 'uk']>({
          id: ids[0],
          slug: 'gallery',
          type: 'carousel',
          params: { loop: true },
          locale: { title: 'Gallery' },
          slides: { items: { first, second }, order: ['second', 'first'] },
        });
        return { first, second, carousel };
      };

      test('Carousel publishes ordered UI slide arrays, never child configurators or slug maps', () => {
        const { carousel } = example();
        const resource = carousel.build.props({ languages: ['en', 'uk'] });
        assert.equal(resource.base.locale?.slides, undefined);
        assert.deepEqual(resource.locale?.en?.locale.slides, [
          { src: 'https://example.com/b.png', alt: 'Second' },
          { src: 'https://example.com/en-a.png', alt: 'First' },
        ]);
        assert.deepEqual(
          resource.locale?.uk?.locale.slides?.map(item => item?.src),
          ['https://example.com/b.png', 'https://example.com/uk-a.png'],
        );
        assert.equal(JSON.stringify(resource).includes('additionalItems'), false);
        assert.equal(JSON.stringify(resource).includes('"order"'), false);
        assert.equal(JSON.stringify(resource).includes('"items"'), false);
        assert.equal(
          carousel_Props_Schema.safeParse({
            ...resource.base,
            locale: { ...resource.base.locale, ...resource.locale?.uk?.locale },
          }).success,
          true,
        );
      });

      test('Carousel keeps invariant slides in base with no redundant locale arrays', () => {
        const first = slide('first', ids[1], { src: 'https://example.com/base.png', alt: 'Base' });
        const carousel = defineCarousel<'gallery', { first: typeof first }, ['en', 'uk']>({
          id: ids[0],
          slug: 'gallery',
          type: 'carousel',
          params: {},
          locale: {},
          slides: { items: { first }, order: ['first'] },
        });
        assert.deepEqual(carousel.build.props({ languages: ['en', 'uk'] }).base.locale?.slides, [
          { src: 'https://example.com/base.png', alt: 'Base' },
        ]);
        assert.equal(carousel.build.props({ languages: ['en', 'uk'] }).locale, undefined);
        assert.deepEqual(carousel.build.overrides({}, { languages: ['en', 'uk'] }), { base: {}, locale: undefined });
      });

      test('Carousel adds, disables, reorders, and overrides slides using complete Props replacements', () => {
        const { carousel } = example();
        const later = slide('later', ids[3], {
          src: 'https://example.com/c.png',
          alt: { en: 'Later', uk: 'Пізніше' },
        });
        const before = carousel.build.props({ languages: ['en', 'uk'] });
        const patch = {
          slides: {
            items: { first: false as const, second: { locale: { alt: { uk: 'Другий' } } } },
            additionalItems: { later },
            order: ['later', 'second'] as ('later' | 'second')[],
          },
        };
        const built = carousel.build.overrides(patch, { languages: ['en', 'uk'] });
        assert.deepEqual(built.locale?.uk?.locale.slides, [
          { src: 'https://example.com/c.png', alt: 'Пізніше' },
          { src: 'https://example.com/b.png', alt: 'Другий' },
        ]);
        assert.deepEqual(built.locale?.en?.locale.slides, [
          { src: 'https://example.com/c.png', alt: 'Later' },
          { src: 'https://example.com/b.png', alt: 'Second' },
        ]);
        assert.deepEqual(carousel.build.props({ languages: ['en', 'uk'] }), before);
        assert.deepEqual(carousel.build.overrides(patch, { languages: ['en', 'uk'] }), built);
        assert.equal(JSON.stringify(built).includes('"additionalItems"'), false);
        assert.equal(JSON.stringify(built).includes('"items"'), false);
        assert.equal(JSON.stringify(built).includes('"order"'), false);
      });

      test('Carousel rejects invalid collection boundaries, unknown fields, and identity overrides', () => {
        const { carousel, first } = example();
        const invalid: [unknown, RegExp][] = [
          [{ slides: { order: ['first'] } }, /Missing slug: second/],
          [{ slides: { order: ['first', 'first', 'second'] } }, /Duplicate slug: first/],
          [{ slides: { order: ['first', 'second', 'unknown'] } }, /Unknown slug: unknown/],
          [{ slides: { items: { first: false } } }, /slides.order is required/],
          [{ slides: { items: { first: false }, order: ['first', 'second'] } }, /Unknown slug: first/],
          [{ slides: { items: { first: false, second: false }, order: [] } }, /At least one active Carousel slide/],
          [{ slides: { items: { missing: false } } }, /unknown existing Carousel slide/],
          [{ slides: { additionalItems: { first }, order: ['first', 'second'] } }, /Duplicate Carousel slide slug/],
          [{ slides: { additionalItems: { other: first }, order: ['first', 'second', 'other'] } }, /slug/],
          [{ slides: { additionalItems: { other: false } } }, /Carousel slide/],
          [{ slides: { items: { first: { locale: { typo: 'not-allowed' } } } } }, /Invalid Carousel Slide overrides/],
          [{ slides: { items: { first: { id: ids[3] } } } }, /Invalid Carousel Slide overrides/],
          [{ slides: { extra: 'field' } }, /Unknown Carousel slides override field/],
          [{ locale: { slides: [{ src: 'https://example.com/a.png', alt: 'A' }] } }, /Invalid Carousel overrides/],
          [{ type: 'carousel' }, /Unknown Carousel override field/],
        ];
        for (const [patch, reason] of invalid) {
          assert.throws(() => carousel.build.overrides(patch as never, { languages: ['en', 'uk'] }), reason);
        }
      });

      test('Carousel rejects invalid authored slugs and preserves its snapshot', () => {
        const { carousel, first } = example();
        assert.throws(
          () =>
            defineCarousel<'invalid', { different: typeof first }, ['en', 'uk']>({
              id: ids[0],
              slug: 'invalid',
              type: 'carousel',
              params: {},
              locale: {},
              slides: { items: { different: first }, order: ['different'] },
            }),
          /key does not match configurator slug/,
        );
        const resource = carousel.build.props({ languages: ['en', 'uk'] });
        carousel.slides.order.reverse();
        const exposed = carousel.slides as { items: Record<string, unknown>; order: string[] };
        exposed.items.first = exposed.items.second;
        assert.deepEqual(carousel.build.props({ languages: ['en', 'uk'] }), resource);
      });

      test('Carousel child patches cannot modify slide identity and support sparse locale overrides', () => {
        const child = slide('one', ids[1], {
          src: 'https://example.com/one.png',
          alt: { en: 'One', uk: 'Один' },
        });
        assert.deepEqual(child.build.overrides({ locale: { alt: { uk: 'Перший' } } }, { languages: ['en', 'uk'] }), {
          base: {},
          locale: { uk: { locale: { alt: 'Перший' } } },
        });
        for (const patch of [{ id: ids[2] }, { slug: 'changed' }, { type: 'carouselSlide' }]) {
          assert.throws(
            () => child.build.overrides(patch as never, { languages: ['en', 'uk'] }),
            /Invalid Carousel Slide overrides/,
          );
        }
      });
    });
  });
});
