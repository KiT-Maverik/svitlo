import assert from 'node:assert/strict';
import test from 'node:test';

import { configuratorArrayToSlugMap } from '../../../_shared__configurators';
import { defineText } from '../../defineText';
import { defineCheckpointItem, checkpointItem_Config_Schema, checkpointItem_Props_Schema } from './index';

const makeText = <const Slug extends string>(id: string, slug: Slug, value: string | { en?: string; uk?: string }) =>
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
    id: itemId,
    slug: 'example',
    type: 'checkpointItem',
    check: true,
    question,
    answer: { items: configuratorArrayToSlugMap([first, second]), order: ['second', 'first'] },
  });
  return { question, first, second, item };
};

test('CheckpointItem builds sorted Props without items, order, or configurators', () => {
  const { item } = example();
  const built = item.build.props({ languages: ['en', 'uk'] });
  assert.equal('assemble' in item, false);
  assert.deepEqual(
    built.base.answer.map(child => child.slug),
    ['second', 'first'],
  );
  assert.equal('items' in built.base.answer, false);
  assert.equal('order' in built.base, false);
  assert.deepEqual(built.locale?.uk?.question, { locale: { value: 'Питання?' } });
  assert.deepEqual(
    built.locale?.uk?.answer?.map(child => child.locale),
    [{ value: 'Другий' }, { value: 'Always visible' }],
  );
  assert.deepEqual(
    built.locale?.en?.answer?.map(child => child.locale),
    [{ value: 'Second' }, { value: 'Always visible' }],
  );
  assert.deepEqual(item.build.props({ languages: ['en', 'uk'] }), built);
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
  assert.deepEqual(
    item.build.overrides(
      {
        question: { locale: { value: { uk: 'Оновлене питання?' } } },
      },
      { languages: ['en', 'uk'] },
    ),
    {
      base: {},
      locale: { uk: { question: { locale: { value: 'Оновлене питання?' } } } },
    },
  );
  assert.deepEqual(item.build.overrides({}, { languages: ['en', 'uk'] }), { base: {}, locale: undefined });
  assert.deepEqual(item.build.overrides({ answer: {} }, { languages: ['en', 'uk'] }), { base: {}, locale: undefined });
});

test('CheckpointItem replaces the whole answer array when an existing child changes', () => {
  const { item } = example();
  const built = item.build.overrides(
    {
      answer: {
        items: {
          second: { locale: { value: { uk: 'Друга відповідь' } } },
        },
      },
    },
    { languages: ['en', 'uk'] },
  );
  assert.deepEqual(
    built.base.answer?.map(child => child.slug),
    ['second', 'first'],
  );
  assert.deepEqual(
    built.locale?.uk?.answer?.map(child => child.locale),
    [{ value: 'Друга відповідь' }, { value: 'Always visible' }],
  );
  assert.deepEqual(
    built.locale?.en?.answer?.map(child => child.locale),
    [{ value: 'Second' }, { value: 'Always visible' }],
  );
});

test('CheckpointItem adds, disables, and reorders answers through one stateless override', () => {
  const { item } = example();
  const later = makeText(thirdId, 'later', { en: 'Later', uk: 'Пізніше' });
  const change = {
    answer: {
      items: { first: false as const },
      additionalItems: configuratorArrayToSlugMap([later]),
      order: ['later', 'second'] as ('later' | 'second')[],
    },
  };
  const original = item.build.props({ languages: ['en', 'uk'] });
  const built = item.build.overrides(change, { languages: ['en', 'uk'] });
  assert.deepEqual(
    built.base.answer?.map(child => child.slug),
    ['later', 'second'],
  );
  assert.deepEqual(
    built.locale?.uk?.answer?.map(child => child.locale),
    [{ value: 'Пізніше' }, { value: 'Другий' }],
  );
  assert.equal(JSON.stringify(built).includes('additionalItems'), false);
  assert.equal(JSON.stringify(built).includes('"items"'), false);
  assert.deepEqual(item.build.props({ languages: ['en', 'uk'] }), original);
  assert.deepEqual(item.build.overrides(change, { languages: ['en', 'uk'] }), built);
});

test('CheckpointItem refuses duplicate, missing, disabled, or unordered answer entries', () => {
  const { item, first } = example();
  const later = makeText(thirdId, 'later', 'New');
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { additionalItems: configuratorArrayToSlugMap([later]) },
        },
        { languages: ['en', 'uk'] },
      ),
    /answer.order is required/,
  );
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { items: { first: false } },
        },
        { languages: ['en', 'uk'] },
      ),
    /answer.order is required/,
  );
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { order: ['first', 'first'] },
        },
        { languages: ['en', 'uk'] },
      ),
    /Duplicate slug/,
  );
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { items: { first: false, second: false }, order: [] },
        },
        { languages: ['en', 'uk'] },
      ),
    /At least one active answer/,
  );
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { additionalItems: configuratorArrayToSlugMap([first]), order: ['second', 'first'] },
        } as never,
        { languages: ['en', 'uk'] },
      ),
    /Duplicate answer slug/,
  );
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { items: { unknown: false }, order: ['first', 'second'] },
        } as never,
        { languages: ['en', 'uk'] },
      ),
    /unknown existing answer/,
  );
  assert.throws(
    () =>
      item.build.overrides(
        {
          answer: { items: { second: { id: thirdId } } },
        } as never,
        { languages: ['en', 'uk'] },
      ),
    /Invalid Text overrides/,
  );
});

test('CheckpointItem protects identity and mandatory Text question', () => {
  const { item } = example();
  for (const patch of [
    { id: thirdId },
    { slug: 'other' },
    { type: 'text' },
    { check: false },
    { answer: { additionalItems: { other: false } } },
    { question: { params: { disabled: true } } },
    { question: { slug: 'renamed' } },
  ]) {
    assert.throws(
      () => item.build.overrides(patch as never, { languages: ['en', 'uk'] }),
      /Invalid Checkpoint Item overrides/,
    );
  }
});

test('CheckpointItem Props schema checks concrete answer types', () => {
  const { item } = example();
  const built = item.build.props({ languages: ['en', 'uk'] });
  const resolved = {
    ...built.base,
    question: { ...built.base.question, ...built.locale?.en?.question },
    answer: built.locale?.en?.answer,
  };
  assert.equal(checkpointItem_Props_Schema.safeParse(resolved).success, true);
  assert.equal(
    checkpointItem_Props_Schema.safeParse({
      ...resolved,
      answer: [{ id: firstId, slug: 'first', type: 'checkpoint' }],
    }).success,
    false,
  );
  assert.equal(
    checkpointItem_Props_Schema.safeParse({
      ...resolved,
      answer: [{ id: firstId, slug: 'first', type: 'text', locale: { value: 'Missing params' } }],
    }).success,
    false,
  );
});

test('CheckpointItem Config schema includes nested question and answer', () => {
  const { item } = example();
  const config = {
    id: item.id,
    slug: item.slug,
    type: item.type,
    question: item.question,
    answer: item.answer,
  };
  assert.equal(checkpointItem_Config_Schema.safeParse(config).success, true);
  assert.equal(checkpointItem_Config_Schema.safeParse({ ...config, question: undefined }).success, false);
  assert.equal(checkpointItem_Config_Schema.safeParse({ ...config, answer: undefined }).success, false);
});
