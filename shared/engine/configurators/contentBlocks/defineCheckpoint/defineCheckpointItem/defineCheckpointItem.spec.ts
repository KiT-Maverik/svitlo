import assert from 'node:assert/strict';
import test from 'node:test';

import { configuratorArrayToSlugMap } from '../../../_shared__configurators';
import { defineText } from '../../defineText';
import { defineCheckpointItem, checkpointItem_Props_Schema } from './index';

const makeText = (id: string, slug: string, value: string | { en?: string; uk?: string }) =>
  defineText({ id, slug, type: 'text', params: {}, locale: { value } });

const questionId = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const firstId = 'b775647f-203d-481a-a1c7-4d331c779d6b';
const secondId = 'b775647f-203d-481a-a1c7-4d331c779d6c';
const thirdId = 'b775647f-203d-481a-a1c7-4d331c779d6d';
const itemId = 'b775647f-203d-481a-a1c7-4d331c779d6e';

const example = () => {
  const question = makeText(questionId, 'question', { en: 'Question?', uk: 'Питання?' });
  const first = makeText(firstId, 'first', 'Always visible');
  const second = makeText(secondId, 'second', { en: 'Second', uk: 'Другий' });
  const item = defineCheckpointItem({
    id: itemId, slug: 'example', type: 'checkpointItem', check: true, question,
    answer: { items: configuratorArrayToSlugMap([first, second]), order: ['second', 'first'] },
  });
  return { question, first, second, item };
};

test('CheckpointItem builds sorted Props without items, order, or configurators', () => {
  const { item } = example();
  const built = item.build.props();
  assert.equal('assemble' in item, false);
  assert.deepEqual(built.base.answer.map(child => child.slug), ['second', 'first']);
  assert.equal('items' in built.base.answer, false);
  assert.equal('order' in built.base, false);
  assert.deepEqual(built.locale?.uk?.question, { locale: { value: 'Питання?' } });
  assert.deepEqual(built.locale?.uk?.answer?.map(child => child.locale), [
    { value: 'Другий' }, { value: 'Always visible' },
  ]);
  assert.deepEqual(built.locale?.en?.answer?.map(child => child.locale), [
    { value: 'Second' }, { value: 'Always visible' },
  ]);
  assert.deepEqual(item.build.props({ embed: true }), built);
  assert.equal(
    checkpointItem_Props_Schema.safeParse({
      ...built.base,
      question: { ...built.base.question, ...built.locale?.uk?.question },
      answer: built.locale?.uk?.answer,
    }).success,
    true,
  );
});

test('CheckpointItem publishes sparse question-only overrides without touching answers', () => {
  const { item } = example();
  assert.deepEqual(item.build.overrides({
    question: { locale: { value: { uk: 'Оновлене питання?' } } },
  }), {
    base: {},
    locale: { uk: { question: { locale: { value: 'Оновлене питання?' } } } },
  });
  assert.deepEqual(item.build.overrides({}), { base: {}, locale: undefined });
});

test('CheckpointItem replaces the whole answer array when an existing child changes', () => {
  const { item } = example();
  const built = item.build.overrides({ answer: { items: {
    second: { locale: { value: { uk: 'Друга відповідь' } } },
  } } });
  assert.deepEqual(built.base.answer?.map(child => child.slug), ['second', 'first']);
  assert.deepEqual(built.locale?.uk?.answer?.map(child => child.locale), [
    { value: 'Друга відповідь' }, { value: 'Always visible' },
  ]);
  assert.deepEqual(built.locale?.en?.answer?.map(child => child.locale), [
    { value: 'Second' }, { value: 'Always visible' },
  ]);
});

test('CheckpointItem adds, disables, and reorders answers through one stateless override', () => {
  const { item } = example();
  const later = makeText(thirdId, 'later', { en: 'Later', uk: 'Пізніше' });
  const change = {
    answer: { items: { first: false as const }, order: ['later', 'second'] as ('later' | 'second')[] },
    additionalContentBlocks: configuratorArrayToSlugMap([later]),
  };
  const original = item.build.props();
  const built = item.build.overrides(change);
  assert.deepEqual(built.base.answer?.map(child => child.slug), ['later', 'second']);
  assert.deepEqual(built.locale?.uk?.answer?.map(child => child.locale), [
    { value: 'Пізніше' }, { value: 'Другий' },
  ]);
  assert.equal(JSON.stringify(built).includes('additionalContentBlocks'), false);
  assert.equal(JSON.stringify(built).includes('"items"'), false);
  assert.deepEqual(item.build.props(), original);
  assert.deepEqual(item.build.overrides(change), built);
});

test('CheckpointItem refuses duplicate, missing, disabled, or unordered answer entries', () => {
  const { item, first } = example();
  const later = makeText(thirdId, 'later', 'New');
  assert.throws(() => item.build.overrides({
    additionalContentBlocks: configuratorArrayToSlugMap([later]),
  }), /answer.order is required/);
  assert.throws(() => item.build.overrides({
    answer: { items: { first: false } },
  }), /answer.order is required/);
  assert.throws(() => item.build.overrides({
    answer: { order: ['first', 'first'] },
  }), /Duplicate slug/);
  assert.throws(() => item.build.overrides({
    answer: { items: { first: false, second: false }, order: [] },
  }), /At least one active answer/);
  assert.throws(() => item.build.overrides({
    additionalContentBlocks: configuratorArrayToSlugMap([first]),
    answer: { order: ['second', 'first'] },
  } as never), /Duplicate answer slug/);
  assert.throws(() => item.build.overrides({
    answer: { items: { unknown: false }, order: ['first', 'second'] },
  } as never), /unknown existing answer/);
  assert.throws(() => item.build.overrides({
    answer: { items: { second: { id: thirdId } } },
  } as never), /Invalid Text overrides/);
});

test('CheckpointItem protects identity and mandatory Text question', () => {
  const { item } = example();
  for (const patch of [
    { id: thirdId }, { slug: 'other' }, { type: 'text' },
    { check: false }, { additionalContentBlocks: { other: false } },
    { question: { params: { disabled: true } } },
    { question: { slug: 'renamed' } },
  ]) {
    assert.throws(() => item.build.overrides(patch as never), /Invalid Checkpoint Item overrides/);
  }
});
