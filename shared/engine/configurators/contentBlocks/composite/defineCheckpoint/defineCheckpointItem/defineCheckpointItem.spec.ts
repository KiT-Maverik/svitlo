import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { mergeForValidation } from '../../../../_shared__configurators';
import { defineText } from '../../../primitive/defineText';
import { defineCheckpointAnswer } from '../defineCheckpointAnswer';
import { checkpointItem_Config_Schema, checkpointItem_Data_Schema, defineCheckpointItem } from './index';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const scope = { languages: ['en', 'uk'] as const };
const text = <const Slug extends string>(slug: Slug, suffix: string, value: string | { en: string; uk: string }) =>
  defineText<Slug, ['en', 'uk']>({
    id: id(suffix), slug, type: 'text', params: {}, locale: { value },
  });

const example = () => {
  const question = text('question', '6a', { en: 'Question?', uk: 'Питання?' });
  const first = text('first', '6b', 'Always visible');
  const second = text('second', '6c', { en: 'Second', uk: 'Другий' });
  const answer = defineCheckpointAnswer<
    'answerContent', { first: typeof first; second: typeof second }, ['en', 'uk']
  >({
    id: id('6f'), slug: 'answerContent', type: 'checkpointAnswer',
    children: ['second', 'first'], first, second,
  });
  const item = defineCheckpointItem<'example', typeof answer, typeof question, ['en', 'uk']>({
    id: id('6e'), slug: 'example', type: 'checkpointItem',
    check: true, question, answer,
  });
  return { item, question, answer, first, second };
};

describe('defineCheckpointItem named question/answer roles', () => {
  test('preserves a typed Text question and one identified, addressable Answer', () => {
    const { item, question, answer } = example();
    const config = {
      id: item.id, slug: item.slug, type: item.type, check: true, question, answer,
    };
    assert.equal(checkpointItem_Config_Schema.safeParse(config).success, true);
    const built = item.build.data(scope);
    assert.deepEqual(built.base.answer.children, ['second', 'first']);
    assert.equal(built.base.answer.id, answer.id);
    assert.equal(built.base.answer.type, 'checkpointAnswer');
    assert.equal((built.base.answer.second as { id: string }).id, id('6c'));
    assert.equal((built.locale?.uk?.question as { locale: { value: string } }).locale.value, 'Питання?');
    const localized = mergeForValidation(built.base, built.locale?.uk ?? {});
    assert.equal(checkpointItem_Data_Schema.safeParse(localized).success, true);
    assert.equal(
      ((localized.answer as Record<string, unknown>).second as { locale: { value: string } }).locale.value,
      'Другий',
    );
    assert.equal(JSON.stringify(built).includes('"content"'), false);
  });

  test('validates both mandatory roles, their types and Question enabled state', () => {
    const { item, question, answer } = example();
    const config = { id: item.id, slug: item.slug, type: item.type, question, answer };
    for (const invalid of [null, { type: 'image' }, { type: 'carousel' }]) {
      assert.equal(checkpointItem_Config_Schema.safeParse({ ...config, question: invalid }).success, false);
      assert.equal(checkpointItem_Config_Schema.safeParse({ ...config, answer: invalid }).success, false);
    }
    assert.equal(checkpointItem_Config_Schema.safeParse({ ...config, question: undefined }).success, false);
    assert.equal(checkpointItem_Config_Schema.safeParse({ ...config, answer: undefined }).success, false);
    // Public Config schema must reject type-only impostors and identity mismatches.
    assert.equal(checkpointItem_Config_Schema.safeParse({
      ...config, question: { id: question.id, slug: question.slug, type: 'text' },
    }).success, false);
    assert.equal(checkpointItem_Config_Schema.safeParse({
      ...config, answer: { id: answer.id, slug: answer.slug, type: 'checkpointAnswer' },
    }).success, false);
    assert.equal(checkpointItem_Config_Schema.safeParse({
      ...config, question: { ...question, build: {} },
    }).success, false);
    assert.equal(checkpointItem_Config_Schema.safeParse({
      ...config, answer: { ...answer, config: { base: { id: id('79'), slug: answer.slug, type: 'checkpointAnswer' } } },
    }).success, false);
    const disabledQuestion = defineText<'question', ['en', 'uk']>({
      id: id('70'), slug: 'question', type: 'text',
      params: { disabled: true }, locale: { value: 'Disabled' },
    });
    assert.throws(() => defineCheckpointItem<'invalidItem', typeof answer, typeof disabledQuestion, ['en', 'uk']>({
      id: id('71'), slug: 'invalidItem', type: 'checkpointItem',
      question: disabledQuestion, answer,
    }).build.data({ languages: ['en'] }), /Question must remain enabled/);
  });

  test('publishes isolated sparse question and nested Answer locale overrides', () => {
    const { item } = example();
    assert.deepEqual(item.build.overrides({}, scope), { base: {}, locale: undefined });
    const before = item.build.data(scope);
    const question = item.build.overrides({
      question: { locale: { value: { uk: 'Оновлене питання?' } } },
    }, scope);
    assert.deepEqual(question, {
      base: {}, locale: { uk: { question: { locale: { value: 'Оновлене питання?' } } } },
    });
    const answer = item.build.overrides({
      answer: { second: { locale: { value: { uk: 'Друга відповідь' } } } },
    }, scope);
    assert.deepEqual(answer.base, {});
    assert.equal(
      ((answer.locale?.uk?.answer as Record<string, unknown>).second as { locale: { value: string } }).locale.value,
      'Друга відповідь',
    );
    assert.equal(answer.locale?.en, undefined);
    assert.deepEqual(item.build.data(scope), before);
  });

  test('nested Answer additions and removals retain its identity and independent order', () => {
    const { item } = example();
    const later = text('later', '6d', { en: 'Later', uk: 'Пізніше' });
    const built = item.build.overrides({
      answer: {
        first: false, later, children: ['later', 'second'],
      },
    }, scope);
    const patch = built.base.answer as Record<string, unknown>;
    assert.equal(patch.first, false);
    assert.deepEqual(patch.children, ['later', 'second']);
    assert.equal((patch.later as { id: string }).id, later.id);
    assert.equal(
      ((built.locale?.uk?.answer as Record<string, unknown>).later as { locale: { value: string } }).locale.value,
      'Пізніше',
    );
    assert.equal(item.build.data(scope).base.answer.children.includes('first'), true);
  });

  test('rejects identity changes, disableable question, bad roles and invalid answer order', () => {
    const { item } = example();
    for (const invalid of [
      { id: id('79') },
      { slug: 'renamed' },
      { type: 'text' },
      { check: false },
      { question: { id: id('80') } },
      { question: { slug: 'changed' } },
      { question: { params: { disabled: true } } },
      { answer: { id: id('81') } },
      { answer: { first: false } },
      { answer: { first: false, second: false, children: [] } },
      { answer: { children: ['second', 'second', 'first'] } },
      { answer: { other: false } },
    ])
      assert.throws(() => item.build.overrides(invalid as never, scope), /Invalid Checkpoint Item overrides/);
  });

  test('resolved Data rejects composite and malformed answer child roles', () => {
    const { item } = example();
    const built = item.build.data(scope);
    const localized = mergeForValidation(built.base, built.locale?.uk ?? {});
    assert.equal(checkpointItem_Data_Schema.safeParse(localized).success, true);
    const question = localized.question as { params: Record<string, unknown> };
    assert.equal(checkpointItem_Data_Schema.safeParse({
      ...localized,
      question: { ...question, params: { ...question.params, disabled: true } },
    }).success, false);
    assert.equal(checkpointItem_Data_Schema.safeParse({
      ...localized,
      answer: { ...localized.answer, second: { id: id('6c'), slug: 'second', type: 'carousel' } },
    }).success, false);
    assert.equal(checkpointItem_Data_Schema.safeParse({
      ...localized,
      answer: { id: id('6f'), slug: 'answerContent', type: 'checkpointAnswer', children: [] },
    }).success, false);
  });
});
