import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { mergeForValidation } from '../../../../_shared__configurators';
import { defineImage } from '../../../primitive/defineImage';
import { defineScene } from '../../../primitive/defineScene';
import { defineText } from '../../../primitive/defineText';
import { defineCarousel } from '../../defineCarousel';
import { checkpointAnswer_Config_Schema, checkpointAnswer_Data_Schema, defineCheckpointAnswer } from './index';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const scope = { languages: ['en', 'uk'] as const };
const text = <const Slug extends string>(slug: Slug, suffix: string, value: string | { en: string; uk: string }) =>
  defineText<Slug, ['en', 'uk']>({
    id: id(suffix), slug, type: 'text', params: {}, locale: { value },
  });

const example = () => {
  const first = text('first', '71', 'Invariant');
  const second = text('second', '72', { en: 'Second', uk: 'Другий' });
  const answer = defineCheckpointAnswer<'answer', { first: typeof first; second: typeof second }, ['en', 'uk']>({
    id: id('73'), slug: 'answer', type: 'checkpointAnswer',
    children: ['second', 'first'], first, second,
  });
  return { answer, first, second };
};

const en = (output: ReturnType<ReturnType<typeof example>['answer']['build']['data']>) =>
  mergeForValidation(output.base, output.locale?.en ?? {}) as Record<string, unknown>;

describe('defineCheckpointAnswer slug-addressed Primitive children', () => {
  test('preserves identity, author order and directly addressable Data', () => {
    const { answer, first, second } = example();
    const config = { id: answer.id, slug: answer.slug, type: answer.type, children: ['second', 'first'], first, second };
    assert.equal(checkpointAnswer_Config_Schema.safeParse(config).success, true);
    for (const fake of [
      { id: first.id, slug: first.slug, type: 'text' },
      { ...first, build: {} },
      { ...first, config: { base: { id: id('74'), slug: 'first', type: 'text' } } },
    ]) {
      assert.equal(checkpointAnswer_Config_Schema.safeParse({ ...config, first: fake }).success, false);
    }
    const built = answer.build.data(scope);
    assert.deepEqual(built.base.children, ['second', 'first']);
    assert.equal((built.base.second as { type: string }).type, 'text');
    assert.equal((built.base.first as { id: string }).id, first.id);
    assert.equal((en(built).second as { locale: { value: string } }).locale.value, 'Second');
    assert.equal(checkpointAnswer_Data_Schema.safeParse(en(built)).success, true);
    assert.equal(JSON.stringify(built).includes('"items"'), false);
    assert.equal(JSON.stringify(built).includes('"order"'), false);
    assert.equal(JSON.stringify(built).includes('"content"'), false);
  });

  test('publishes only requested languages and leaves unchanged invariant child in base', () => {
    const { answer } = example();
    const built = answer.build.data({ languages: ['uk'] });
    assert.equal(built.locale?.en, undefined);
    assert.equal((built.locale?.uk?.second as { locale: { value: string } }).locale.value, 'Другий');
    assert.deepEqual(built.locale?.uk, { second: { locale: { value: 'Другий' } } });
    assert.equal(built.locale?.uk?.first, undefined);
    assert.equal((built.base.first as { locale: { value: string } }).locale.value, 'Invariant');
  });

  test('emits sparse nested patches and explicit replacement order for add/remove', () => {
    const { answer } = example();
    const third = text('third', '75', { en: 'Third', uk: 'Третій' });
    const original = answer.build.data(scope);
    assert.deepEqual(answer.build.overrides({}, scope), { base: {}, locale: undefined });
    const patch = answer.build.overrides({
      first: false,
      second: { locale: { value: { uk: 'Змінено' } } },
      third,
      children: ['third', 'second'],
    }, scope);
    assert.deepEqual(patch.base.children, ['third', 'second']);
    assert.equal(patch.base.first, false);
    assert.equal((patch.base.third as { id: string }).id, third.id);
    assert.equal((patch.locale?.uk?.second as { locale: { value: string } }).locale.value, 'Змінено');
    assert.equal(patch.locale?.en?.second, undefined);
    assert.equal(JSON.stringify(patch).includes('additionalItems'), false);
    assert.deepEqual(answer.build.data(scope), original);
    assert.deepEqual(answer.build.overrides({
      first: false, second: { locale: { value: { uk: 'Змінено' } } },
      third, children: ['third', 'second'],
    }, scope), patch);
  });

  test('disabling a live Primitive requires a replacement order and publishes a tombstone', () => {
    const { answer } = example();
    assert.throws(
      () => answer.build.overrides({ first: { params: { disabled: true } } }, scope),
      /children is required/,
    );
    assert.throws(
      () => answer.build.overrides({
        first: { params: { disabled: true } }, children: ['second', 'first'],
      }, scope),
      /Invalid Checkpoint Answer overrides/,
    );
    const patch = answer.build.overrides({
      first: { params: { disabled: true } }, children: ['second'],
    }, scope);
    assert.deepEqual(patch, { base: { children: ['second'], first: false }, locale: undefined });
    const merged = mergeForValidation(answer.build.data(scope).base, patch.base);
    delete merged.first;
    assert.equal(checkpointAnswer_Data_Schema.safeParse(merged).success, true);
    assert.deepEqual(answer.build.data(scope).base.children, ['second', 'first']);
  });

  test('authored disabled Primitives stay in Config but are absent from published Data', () => {
    const { second } = example();
    const first = defineText({
      id: id('75'), slug: 'first', type: 'text',
      params: { disabled: true }, locale: { value: { en: 'Hidden', uk: 'Сховано' } },
    });
    const answer = defineCheckpointAnswer({
      id: id('76'), slug: 'answer', type: 'checkpointAnswer',
      children: ['first', 'second'], first, second,
    });
    const data = answer.build.data({ languages: ['uk'] });
    assert.deepEqual(data.base.children, ['second']);
    assert.equal(data.base.first, undefined);
    assert.deepEqual(data.locale?.uk, { second: { locale: { value: 'Другий' } } });
    assert.equal(checkpointAnswer_Data_Schema.safeParse(
      mergeForValidation(data.base, data.locale?.uk ?? {}),
    ).success, true);
    assert.deepEqual(answer.build.overrides({}, { languages: ['uk'] }), {
      base: {}, locale: undefined,
    });
    assert.throws(() => answer.build.overrides({
      first: { locale: { value: { uk: 'Ще' } } },
    } as never, { languages: ['uk'] }), /already disabled/);
    assert.throws(() => defineCheckpointAnswer({
      id: id('77'), slug: 'allHidden', type: 'checkpointAnswer',
      children: ['first'], first,
    }).build.data({ languages: ['uk'] }));
  });

  test('rejects missing, repeated, orphaned, reserved, and unsafe placements', () => {
    const { first, second } = example();
    const metadata = { id: id('74'), slug: 'answer', type: 'checkpointAnswer' as const };
    const invalid: unknown[] = [
      { ...metadata, children: [] },
      { ...metadata, children: ['first'], first, second },
      { ...metadata, children: ['first', 'first'], first },
      { ...metadata, children: ['missing'], first },
      { ...metadata, children: ['first'], first, content: first },
      { ...metadata, children: ['first'], first, ['__proto__']: first },
      { ...metadata, children: ['unsafe-key'], 'unsafe-key': first },
      { ...metadata, children: ['first'], first: { ...first, type: 'checkpoint' } },
    ];
    for (const candidate of invalid) {
      assert.equal(checkpointAnswer_Config_Schema.safeParse(candidate).success, false);
      assert.throws(() => defineCheckpointAnswer(candidate as never).build.data({ languages: ['en'] }));
    }
  });

  test('rejects Carousel/Checkpoint composites, but accepts Scene Primitive', () => {
    const { answer } = example();
    const image = defineImage({
      id: id('76'), slug: 'image', type: 'image',
      params: { fill: true, aspectRatio: 1.5 },
      locale: { fileName: 'https://example.com/image.png', alt: 'An image' },
    });
    const carousel = defineCarousel({
      id: id('77'), slug: 'carousel', type: 'carousel', params: {}, locale: {},
      children: ['image'], image,
    });
    assert.throws(() => answer.build.overrides({ carousel, children: ['second', 'first', 'carousel'] } as never, scope));
    assert.throws(() => defineCheckpointAnswer({
      id: id('78'), slug: 'bad', type: 'checkpointAnswer', children: ['carousel'], carousel,
    } as never).build.data({ languages: ['en'] }));
    const scene = defineScene<'activity', ['en', 'uk']>({
      id: id('79'), slug: 'activity', type: 'scene', params: {},
      locale: { value: { en: 'Choose', uk: 'Обери' } },
    });
    const valid = defineCheckpointAnswer({
      id: id('80'), slug: 'sceneAnswer', type: 'checkpointAnswer',
      children: ['activity'], activity: scene,
    });
    const built = valid.build.data({ languages: ['uk'], mode: 'draft' });
    assert.equal((built.base.activity as { type: string }).type, 'scene');
    assert.equal(checkpointAnswer_Data_Schema.safeParse(
      mergeForValidation(built.base, built.locale?.uk ?? {}),
    ).success, true);
  });

  test('rejects unknown, identity and invalid child override mutations', () => {
    const { answer, first } = example();
    const invalid = [
      { id: id('79') },
      { type: 'checkpoint' },
      { slug: 'renamed' },
      { children: ['second', 'missing'] },
      { children: ['second', 'second', 'first'] },
      { first: false },
      { first: false, second: false, children: [] },
      { first: { id: id('80') } },
      { other: false },
      { other: first, children: ['second', 'first', 'other'] },
      { content: { order: ['first'] } },
    ];
    for (const patch of invalid)
      assert.throws(() => answer.build.overrides(patch as never, scope), /Invalid Checkpoint Answer overrides/);
  });
});
