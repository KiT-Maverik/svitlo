import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { defineImage } from '../../primitive/defineImage';
import { defineScene } from '../../primitive/defineScene';
import { defineText } from '../../primitive/defineText';
import { carousel_Config_Schema, carousel_Props_Schema, defineCarousel } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCarousel', () => {
      const ids = Array.from({ length: 6 }, (_, index) => 'b775647f-203d-481a-a1c7-4d331c779d7' + index);
      const scope = { languages: ['en', 'uk'] as const };
      const image = <const Slug extends string>(
        slug: Slug,
        id: string,
        locale: {
          fileName: string | Record<'en' | 'uk', string>;
          alt: string | Record<'en' | 'uk', string>;
          caption?: string | Record<'en' | 'uk', string>;
        },
      ) =>
        defineImage<Slug, ['en', 'uk']>({
          id,
          slug,
          type: 'image',
          params: { fill: true, aspectRatio: 1.5 },
          locale,
        });

      const example = () => {
        const first = image('first', ids[1], {
          fileName: { en: 'https://example.com/en-a.png', uk: 'https://example.com/uk-a.png' },
          alt: 'First',
        });
        const second = image('second', ids[2], { fileName: 'https://example.com/b.png', alt: 'Second' });
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

      test('direct Carousel Config Zod rejects non-slide kinds while retaining Image and Scene', () => {
        const { first } = example();
        const activity = defineScene({
          id: ids[4],
          slug: 'activity',
          type: 'scene',
          params: {},
          locale: { value: { instruction: 'Choose' } },
        });
        const base = {
          id: ids[0],
          slug: 'gallery',
          type: 'carousel',
          params: {},
          locale: {},
        };
        assert.equal(
          carousel_Config_Schema.safeParse({
            ...base,
            slides: { items: { first, activity }, order: ['first', 'activity'] },
          }).success,
          true,
        );
        const text = defineText({ id: ids[5], slug: 'text', type: 'text', params: {}, locale: { value: 'No' } });
        for (const forbidden of [
          text,
          { id: ids[3], slug: 'invalid', type: 'carousel' },
          { id: ids[3], slug: 'invalid', type: 'checkpoint' },
          false,
          null,
        ]) {
          assert.equal(
            carousel_Config_Schema.safeParse({
              ...base,
              slides: { items: { invalid: forbidden }, order: ['invalid'] },
            }).success,
            false,
            'Reject non-Image/Scene slide at direct Zod boundary',
          );
        }
      });

      test('publishes complete, ordered Image Props with their stable identity', () => {
        const { carousel } = example();
        const resource = carousel.build.props(scope);
        assert.equal(resource.base.locale?.slides, undefined);
        const en = resource.locale?.en?.locale.slides;
        assert.deepEqual(
          en?.map(slide => (slide ? [slide.id, slide.slug, slide.type] : undefined)),
          [
            [ids[2], 'second', 'image'],
            [ids[1], 'first', 'image'],
          ],
        );
        assert.deepEqual(
          en?.map(slide => (slide?.type === 'image' ? slide.locale : undefined)),
          [
            { src: 'https://example.com/b.png', alt: 'Second' },
            { src: 'https://example.com/en-a.png', alt: 'First' },
          ],
        );
        assert.deepEqual(
          resource.locale?.uk?.locale.slides?.map(slide => (slide?.type === 'image' ? slide.locale?.src : undefined)),
          ['https://example.com/b.png', 'https://example.com/uk-a.png'],
        );
        assert.equal(
          resource.locale?.en?.locale.slides?.[0]?.type === 'image'
            ? resource.locale.en.locale.slides[0]?.params?.fill
            : undefined,
          true,
        );
        assert.equal(JSON.stringify(resource).includes('"additionalItems"'), false);
        assert.equal(JSON.stringify(resource).includes('"order"'), false);
        assert.equal(
          carousel_Props_Schema.safeParse({
            ...resource.base,
            locale: { ...resource.base.locale, ...resource.locale?.uk?.locale },
          }).success,
          true,
        );
      });

      test('publishes Image and Scene discriminants, including localized Scene data', () => {
        const picture = image('picture', ids[1], { fileName: 'https://example.com/p.png', alt: 'Picture' });
        const activity = defineScene<'activity', ['en', 'uk']>({
          id: ids[4],
          slug: 'activity',
          type: 'scene',
          params: {},
          locale: { value: { instruction: { en: 'Choose', uk: 'Обери' } } },
        });
        const carousel = defineCarousel<'mixed', { picture: typeof picture; activity: typeof activity }, ['en', 'uk']>({
          id: ids[0],
          slug: 'mixed',
          type: 'carousel',
          params: {},
          locale: { title: { en: 'Explore', uk: 'Досліди' } },
          slides: { items: { picture, activity }, order: ['picture', 'activity'] },
        });
        const built = carousel.build.props(scope);
        assert.deepEqual(
          built.locale?.uk?.locale.slides?.map(slide => slide?.type),
          ['image', 'scene'],
        );
        const scene = built.locale?.uk?.locale.slides?.[1];
        assert.equal(scene?.id, ids[4]);
        assert.equal(scene?.type, 'scene');
        if (scene?.type === 'scene' && scene.locale && 'value' in scene.locale)
          assert.deepEqual(scene.locale.value, { instruction: 'Обери' });
        assert.equal(
          carousel_Props_Schema.safeParse({
            ...built.base,
            locale: { ...built.base.locale, ...built.locale?.uk?.locale },
          }).success,
          true,
        );
      });

      test('keeps invariant children in base without redundant translated slide arrays', () => {
        const first = image('first', ids[1], { fileName: 'https://example.com/base.png', alt: 'Base' });
        const carousel = defineCarousel<'gallery', { first: typeof first }, ['en', 'uk']>({
          id: ids[0],
          slug: 'gallery',
          type: 'carousel',
          params: {},
          locale: {},
          slides: { items: { first }, order: ['first'] },
        });
        assert.deepEqual(carousel.build.props(scope).base.locale?.slides, [
          {
            id: ids[1],
            slug: 'first',
            type: 'image',
            params: { fill: true, aspectRatio: 1.5 },
            locale: { src: 'https://example.com/base.png', alt: 'Base' },
          },
        ]);
        assert.equal(carousel.build.props(scope).locale, undefined);
        assert.deepEqual(carousel.build.overrides({}, scope), { base: {}, locale: undefined });
      });

      test('adds Scenes, disables and reorders Images, and resolves sparse child patches', () => {
        const { carousel } = example();
        const later = defineScene<'later', ['en', 'uk']>({
          id: ids[3],
          slug: 'later',
          type: 'scene',
          params: {},
          locale: { value: { en: 'Later', uk: 'Пізніше' } },
        });
        const before = carousel.build.props(scope);
        const patch = {
          slides: {
            items: { first: false as const, second: { locale: { alt: { uk: 'Другий' } } } },
            additionalItems: { later },
            order: ['later', 'second'] as ('later' | 'second')[],
          },
        };
        const built = carousel.build.overrides(patch, scope);
        assert.deepEqual(
          built.locale?.uk?.locale.slides?.map(slide => slide?.type),
          ['scene', 'image'],
        );
        const second = built.locale?.uk?.locale.slides?.[1];
        if (second?.type === 'image' && second.locale && 'alt' in second.locale)
          assert.equal(second.locale.alt, 'Другий');
        assert.deepEqual(carousel.build.props(scope), before);
        assert.deepEqual(carousel.build.overrides(patch, scope), built);
      });

      test('rejects invalid map keys, ordering, unsupported child kinds and identity overrides', () => {
        const { carousel, first } = example();
        const invalid: [unknown, RegExp][] = [
          [{ slides: { order: ['first'] } }, /Missing slug: second/],
          [{ slides: { order: ['first', 'first', 'second'] } }, /Duplicate slug: first/],
          [{ slides: { order: ['first', 'second', 'unknown'] } }, /Unknown slug: unknown/],
          [{ slides: { items: { first: false } } }, /slides.order is required/],
          [{ slides: { items: { first: false, second: false }, order: [] } }, /At least one active Carousel slide/],
          [{ slides: { items: { missing: false } } }, /unknown existing Carousel slide/],
          [{ slides: { additionalItems: { first }, order: ['first', 'second'] } }, /Duplicate Carousel slide slug/],
          [{ slides: { additionalItems: { other: first }, order: ['first', 'second', 'other'] } }, /slug/],
          [{ slides: { additionalItems: { other: false } } }, /Carousel slide/],
          [{ slides: { items: { first: { locale: { typo: 'invalid' } } } } }, /Invalid Image overrides/],
          [{ slides: { items: { first: { id: ids[3] } } } }, /Invalid Image overrides/],
          [{ slides: { extra: 'field' } }, /Unknown Carousel slides override field/],
          [{ locale: { slides: [] } }, /Invalid Carousel overrides/],
          [{ type: 'carousel' }, /Unknown Carousel override field/],
        ];
        for (const [patch, reason] of invalid) {
          assert.throws(() => carousel.build.overrides(patch as never, scope), reason);
        }
        const text = defineText({ id: ids[5], slug: 'text', type: 'text', params: {}, locale: { value: 'No' } });
        assert.throws(
          () =>
            defineCarousel({
              id: ids[0],
              slug: 'bad',
              type: 'carousel',
              params: {},
              locale: {},
              slides: { items: { text: text as never }, order: ['text'] },
            }).build.props({ languages: ['en'] }),
          /expected.*image|expected.*scene|Unsupported.*type|Invalid Carousel (?:slides|Config)|must be/i,
        );
      });

      test('excludes disabled Image/Scene children and rejects an empty active Carousel', () => {
        const { carousel } = example();
        const disabled = carousel.build.overrides(
          { slides: { items: { first: { params: { disabled: true } } } } },
          scope,
        );
        assert.deepEqual(
          disabled.locale?.en?.locale.slides?.map(slide => slide?.slug),
          ['second'],
        );
        assert.deepEqual(
          disabled.locale?.uk?.locale.slides?.map(slide => slide?.slug),
          ['second'],
        );

        assert.throws(
          () =>
            carousel.build.overrides(
              {
                slides: {
                  items: {
                    first: { params: { disabled: true } },
                    second: { params: { disabled: true } },
                  },
                },
              },
              scope,
            ),
          /At least one active Carousel slide/,
        );
      });

      test('keeps an isolated authored snapshot and enforces matching slugs', () => {
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
            }).build.props({ languages: ['en'] }),
          /key does not match configurator slug/,
        );
        const before = carousel.build.props(scope);
        carousel.slides.order.reverse();
        const exposed = carousel.slides as { items: Record<string, unknown>; order: string[] };
        exposed.items.first = exposed.items.second;
        assert.deepEqual(carousel.build.props(scope), before);
      });
    });
  });
});
