import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { mergeForValidation } from '../../../_shared__configurators';
import { defineImage } from '../../primitive/defineImage';
import { defineScene } from '../../primitive/defineScene';
import { defineText } from '../../primitive/defineText';
import { carousel_Config_Schema, carousel_Data_Schema, defineCarousel } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCarousel', () => {
      const ids = Array.from({ length: 8 }, (_, index) => 'b775647f-203d-481a-a1c7-4d331c779d7' + index);
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
        const second = image('second', ids[2], {
          fileName: 'https://example.com/b.png',
          alt: 'Second',
        });
        const carousel = defineCarousel<
          'gallery',
          { first: typeof first; second: typeof second },
          ['en', 'uk']
        >({
          id: ids[0],
          slug: 'gallery',
          type: 'carousel',
          params: { loop: true, startIndex: 1, allowSwipe: true },
          locale: { title: 'Gallery' },
          children: ['second', 'first'],
          first,
          second,
        });
        return { first, second, carousel };
      };

      test('direct Zod Config accepts only slug-addressed Image and Scene slides', () => {
        const { first } = example();
        const activity = defineScene({
          id: ids[3],
          slug: 'activity',
          type: 'scene',
          params: {},
          locale: { value: 'Choose' },
        });
        const base = {
          id: ids[0],
          slug: 'gallery',
          type: 'carousel',
          params: {},
          locale: {},
        };
        assert.equal(carousel_Config_Schema.safeParse({
          ...base, children: ['first', 'activity'], first, activity,
        }).success, true);

        const text = defineText({ id: ids[5], slug: 'text', type: 'text', params: {}, locale: { value: 'No' } });
        for (const forbidden of [
          text,
          { id: ids[4], slug: 'invalid', type: 'carousel' },
          { id: ids[4], slug: 'invalid', type: 'checkpoint' },
          false,
          null,
        ]) {
          assert.equal(carousel_Config_Schema.safeParse({
            ...base, children: ['invalid'], invalid: forbidden,
          }).success, false);
        }
        assert.equal(carousel_Config_Schema.safeParse({
          ...base, children: ['first'], first, slides: { items: { first }, order: ['first'] },
        }).success, false, 'Legacy parallel slide collection must be rejected');
      });

      test('publishes direct, ordered, sparse Data with immutable slide identities', () => {
        const { carousel } = example();
        const resource = carousel.build.data(scope);
        assert.deepEqual(resource.base.children, ['second', 'first']);
        assert.deepEqual(resource.base.params, { loop: true, startIndex: 1, allowSwipe: true });
        assert.deepEqual(
          ['id', 'slug', 'type'].map(key => (resource.base.second as Record<string, unknown>)[key]),
          [ids[2], 'second', 'image'],
        );
        assert.equal((resource.base.first as Record<string, unknown>).id, ids[1]);
        assert.deepEqual(resource.locale?.en?.first, {
          locale: { src: 'https://example.com/en-a.png' },
        });
        assert.deepEqual(resource.locale?.uk?.first, {
          locale: { src: 'https://example.com/uk-a.png' },
        });
        assert.equal(resource.locale?.en?.second, undefined, 'Invariant child is not duplicated');
        assert.equal(JSON.stringify(resource).includes('"slides"'), false);
        assert.equal(JSON.stringify(resource).includes('"items"'), false);
        assert.equal(JSON.stringify(resource).includes('"order"'), false);
        assert.equal(
          carousel_Data_Schema.safeParse(
            mergeForValidation(resource.base, (resource.locale?.uk ?? {}) as never),
          ).success,
          true,
        );
      });

      test('preserves Scene type and recursive locale fragments', () => {
        const picture = image('picture', ids[1], {
          fileName: 'https://example.com/p.png',
          alt: 'Picture',
        });
        const activity = defineScene<'activity', ['en', 'uk']>({
          id: ids[3],
          slug: 'activity',
          type: 'scene',
          params: {},
          locale: { value: { instruction: { en: 'Choose', uk: 'Обери' } } },
        });
        const carousel = defineCarousel<
          'mixed',
          { picture: typeof picture; activity: typeof activity },
          ['en', 'uk']
        >({
          id: ids[0],
          slug: 'mixed',
          type: 'carousel',
          params: {},
          locale: { title: { en: 'Explore', uk: 'Досліди' } },
          children: ['picture', 'activity'],
          picture,
          activity,
        });
        const built = carousel.build.data(scope);
        assert.deepEqual(built.base.children, ['picture', 'activity']);
        assert.equal((built.base.activity as Record<string, unknown>).type, 'scene');
        assert.deepEqual(built.locale?.uk?.activity, { locale: { value: { instruction: 'Обери' } } });
        assert.equal(
          carousel_Data_Schema.safeParse(
            mergeForValidation(built.base, (built.locale?.uk ?? {}) as never),
          ).success,
          true,
        );
      });

      test('keeps invariant slides exclusively in base and does not duplicate locale files', () => {
        const first = image('first', ids[1], {
          fileName: 'https://example.com/base.png', alt: 'Base',
        });
        const carousel = defineCarousel<'gallery', { first: typeof first }, ['en', 'uk']>({
          id: ids[0], slug: 'gallery', type: 'carousel',
          params: {}, locale: {}, children: ['first'], first,
        });
        assert.deepEqual(carousel.build.data(scope).base.children, ['first']);
        assert.deepEqual((carousel.build.data(scope).base.first as Record<string, unknown>).locale, {
          src: 'https://example.com/base.png', alt: 'Base',
        });
        assert.equal(carousel.build.data(scope).locale, undefined);
        assert.deepEqual(carousel.build.overrides({}, scope), { base: {}, locale: undefined });
      });

      test('patches children sparsely; structural changes require explicit order', () => {
        const { carousel } = example();
        const later = defineScene<'later', ['en', 'uk']>({
          id: ids[4], slug: 'later', type: 'scene', params: {},
          locale: { value: { en: 'Later', uk: 'Пізніше' } },
        });
        const before = carousel.build.data(scope);
        const nonstructural = carousel.build.overrides({
          second: { locale: { alt: { uk: 'Другий' } } },
        }, scope);
        assert.equal(nonstructural.base.children, undefined);
        assert.deepEqual(nonstructural.base.second, {});
        assert.deepEqual(nonstructural.locale?.uk?.second, { locale: { alt: 'Другий' } });
        assert.equal(nonstructural.locale?.en?.second, undefined);

        const patch = {
          first: false as const,
          second: { locale: { alt: { uk: 'Другий' } } },
          later,
          children: ['later', 'second'] as ('later' | 'second')[],
        };
        const built = carousel.build.overrides(patch, scope);
        assert.deepEqual(built.base.children, ['later', 'second']);
        assert.equal(built.base.first, false, 'Removed child uses an explicit tombstone');
        assert.equal((built.base.later as Record<string, unknown>).type, 'scene');
        assert.deepEqual(built.locale?.uk?.later, { locale: { value: 'Пізніше' } });
        assert.deepEqual(built.locale?.uk?.second, { locale: { alt: 'Другий' } });
        assert.deepEqual(carousel.build.data(scope), before);
        assert.deepEqual(carousel.build.overrides(patch, scope), built);
      });

      test('rejects malformed order, unsafe placements, invalid kinds and immutable identity patches', () => {
        const { carousel, first } = example();
        const invalid: [unknown, RegExp][] = [
          [{ children: ['first'] }, /Missing slug: second/],
          [{ children: ['first', 'first', 'second'] }, /Duplicate slug: first|Duplicate placement slug/],
          [{ children: ['first', 'second', 'unknown'] }, /Unknown slug: unknown|Unknown or disabled child/],
          [{ first: false }, /children is required/],
          [{ first: false, second: false, children: [] }, /At least one active Carousel slide|At least one item is required/],
          [{ missing: false }, /Carousel slide|matching/],
          [{ first: { locale: { typo: 'invalid' } } }, /Invalid Image overrides/],
          [{ first: { id: ids[6] } }, /Invalid Image overrides/],
          [{ first: { params: { disabled: true } } }, /children is required/],
          [{ slides: { items: { first }, order: ['first'] } }, /Carousel slide|matching|Invalid/],
          [{ locale: { slides: [] } }, /Invalid Carousel overrides/],
          [{ id: ids[5] }, /Immutable Carousel override field/],
          [{ children: ['second', 'first'], first: { slug: 'changed' } }, /Invalid Image overrides/],
          [{ other: first, children: ['other', 'first', 'second'] }, /Carousel slide|slug/],
          [{ constructor: first, children: ['second', 'first', 'constructor'] }, /Reserved child/],
          [{ another: image('another', ids[1], { fileName: 'https://example.com/c.png', alt: 'C' }),
             children: ['second', 'first', 'another'] }, /Duplicate child ID|Duplicate Carousel slide ID/],
        ];
        for (const [patch, reason] of invalid) {
          assert.throws(() => carousel.build.overrides(patch as never, scope), reason);
        }
        const text = defineText({
          id: ids[5], slug: 'text', type: 'text', params: {}, locale: { value: 'No' },
        });
        assert.throws(() => defineCarousel({
          id: ids[0], slug: 'bad', type: 'carousel', params: {}, locale: {},
          children: ['text'], text: text as never,
        }).build.data({ languages: ['en'] }), /Invalid Carousel slides/);
      });

      test('disabled slides do not publish and an empty effective Carousel is invalid', () => {
        const { carousel } = example();
        const disabled = carousel.build.overrides({
          first: { params: { disabled: true } },
          children: ['second'],
        }, scope);
        assert.deepEqual(disabled.base.children, ['second']);
        assert.equal(disabled.base.first, false);

        assert.throws(() => carousel.build.overrides({
          first: { params: { disabled: true } },
          second: { params: { disabled: true } },
          children: [],
        }, scope), /At least one active Carousel slide/);

        const only = defineImage({
          id: ids[4], slug: 'only', type: 'image',
          params: { fill: true, aspectRatio: 1, disabled: true },
          locale: { fileName: 'https://example.com/a.png', alt: 'A' },
        });
        const invalid = defineCarousel({
          id: ids[0], slug: 'bad', type: 'carousel', params: {}, locale: {},
          children: ['only'], only,
        });
        assert.throws(() => invalid.build.data({ languages: ['en'] }), /At least one active Carousel slide/);
      });

      test('disabled authored slides do not constrain requested language scope', () => {
        const available = image('available', ids[1], {
          fileName: 'https://example.com/available.png', alt: 'Available',
        });
        const disabled = defineImage<'disabled', ['en']>({
          id: ids[6],
          slug: 'disabled',
          type: 'image',
          params: { fill: true, aspectRatio: 1, disabled: true },
          locale: {
            fileName: { en: 'https://example.com/only-en.png' },
            alt: { en: 'Only English' },
          },
        });
        const carousel = defineCarousel<
          'gallery', { disabled: typeof disabled; available: typeof available }, ['en']
        >({
          id: ids[0], slug: 'gallery', type: 'carousel', params: {}, locale: {},
          children: ['disabled', 'available'], disabled, available,
        });
        // Simulate an untyped caller: explicit parent/child authoring scopes remain
        // statically enforced, but a disabled child must not block runtime selection.
        const built = carousel.build.data({ languages: ['uk'] } as never);
        assert.deepEqual(built.base.children, ['available']);
        assert.equal(built.base.disabled, undefined);
        assert.equal(built.locale, undefined);
      });

      test('keeps the authored snapshot isolated from consumer mutation', () => {
        const { carousel, first } = example();
        const before = carousel.build.data(scope);
        carousel.children.reverse();
        (carousel as unknown as { first: unknown }).first = first;
        assert.deepEqual(carousel.build.data(scope), before);
        assert.deepEqual(carousel.build.data({ languages: ['uk'] as const }).base.children, ['second', 'first']);
      });
    });
  });
});
