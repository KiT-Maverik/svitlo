import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { mergeForValidation } from '../../../_shared__configurators';
import { UNRESOLVED_YOUTUBE_HREF } from '../../../../schemas/media.schemas';
import { defineText } from '../../primitive/defineText';
import { defineYoutube } from '../../primitive/defineYoutube';
import { defineCheckpointAnswer } from './defineCheckpointAnswer';
import { defineCheckpointItem } from './defineCheckpointItem';
import { checkpoint_Config_Schema, checkpoint_Data_Schema, defineCheckpoint } from './index';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const scope = { languages: ['en', 'uk'] as const };
const text = <const Slug extends string>(slug: Slug, suffix: string, value: string | { en: string; uk: string }) =>
  defineText<Slug, ['en', 'uk']>({
    id: id(suffix), slug, type: 'text', params: {}, locale: { value },
  });
const item = <const Slug extends string>(
  slug: Slug, suffix: string, questionSuffix: string, answerSuffix: string, textSuffix: string,
  value: string | { en: string; uk: string },
) => {
  const question = text('question', questionSuffix, value);
  const answerText = text('answerText', textSuffix, 'Invariant answer');
  const answer = defineCheckpointAnswer<
    'answer', { answerText: typeof answerText }, ['en', 'uk']
  >({
    id: id(answerSuffix), slug: 'answer', type: 'checkpointAnswer',
    children: ['answerText'], answerText,
  });
  return defineCheckpointItem<Slug, typeof answer, typeof question, ['en', 'uk']>({
    id: id(suffix), slug, type: 'checkpointItem',
    check: true, question, answer,
  });
};

const example = () => {
  const first = item('first', '61', '62', '63', '64', { en: 'First?', uk: 'Перше?' });
  const second = item('second', '65', '66', '67', '68', 'Second?');
  const checkpoint = defineCheckpoint<
    'review', { first: typeof first; second: typeof second }, ['en', 'uk']
  >({
    id: id('60'), slug: 'review', type: 'checkpoint',
    params: { enableChecks: true, requireCompletion: true },
    locale: { title: { en: 'Review', uk: 'Перевірка' } },
    children: ['first', 'second'], first, second,
  });
  return { checkpoint, first, second };
};

describe('defineCheckpoint slug-addressed CheckpointItems', () => {
  test('validates typed Items, preserves author order and publishes direct Data paths', () => {
    const { checkpoint, first, second } = example();
    assert.equal(checkpoint_Config_Schema.safeParse({
      id: checkpoint.id, slug: checkpoint.slug, type: checkpoint.type,
      params: { enableChecks: true, requireCompletion: true },
      locale: { title: 'Review' },
      children: ['second', 'first'], first, second,
    }).success, true);
    const result = checkpoint.build.data(scope);
    assert.deepEqual(result.base.children, ['first', 'second']);
    assert.equal((result.base.first as { type: string }).type, 'checkpointItem');
    assert.equal((result.base.first as { id: string }).id, first.id);
    assert.equal((result.base.second as { id: string }).id, second.id);
    assert.equal(result.base.params.enableChecks, true);
    assert.equal(result.base.params.requireCompletion, true);
    assert.equal((result.base.first as { check: boolean }).check, true);
    assert.deepEqual(result.locale?.uk, {
      locale: { title: 'Перевірка' },
      first: { question: { locale: { value: 'Перше?' } } },
    });
    const localized = mergeForValidation(result.base, result.locale?.uk ?? {});
    assert.equal(checkpoint_Data_Schema.safeParse(localized).success, true);
    const firstData = localized.first as { question: { params: Record<string, unknown> } };
    assert.equal(checkpoint_Data_Schema.safeParse({
      ...localized,
      first: {
        ...firstData,
        question: {
          ...firstData.question,
          params: { ...firstData.question.params, disabled: true },
        },
      },
    }).success, false);
    assert.equal(JSON.stringify(result).includes('"items"'), false);
    assert.equal(JSON.stringify(result).includes('"order"'), false);
  });

  test('publishes only sparse nested Answer and Question locale fragments', () => {
    const question = text('question', '81', { en: 'Where?', uk: 'Де?' });
    const answerText = text('answerText', '82', { en: 'Here', uk: 'Тут' });
    const unchanged = text('unchanged', '83', 'Invariant');
    const answer = defineCheckpointAnswer({
      id: id('84'), slug: 'answer', type: 'checkpointAnswer',
      children: ['answerText', 'unchanged'], answerText, unchanged,
    });
    const first = defineCheckpointItem({
      id: id('85'), slug: 'first', type: 'checkpointItem', question, answer,
    });
    const checkpoint = defineCheckpoint({
      id: id('86'), slug: 'review', type: 'checkpoint',
      params: {}, locale: { title: { en: 'Review', uk: 'Огляд' } },
      children: ['first'], first,
    });
    const published = checkpoint.build.data({ languages: ['uk'] });
    assert.deepEqual(published.locale, {
      uk: {
        locale: { title: 'Огляд' },
        first: {
          question: { locale: { value: 'Де?' } },
          answer: { answerText: { locale: { value: 'Тут' } } },
        },
      },
    });
    assert.equal(published.locale?.uk?.first && (
      (published.locale.uk.first as Record<string, unknown>).id
    ), undefined);
    assert.equal(checkpoint_Data_Schema.safeParse(
      mergeForValidation(published.base, published.locale?.uk ?? {}),
    ).success, true);
  });

  test('publishes sparse metadata and isolated nested Text/Answer locale patches', () => {
    const { checkpoint } = example();
    const before = checkpoint.build.data(scope);
    assert.deepEqual(checkpoint.build.overrides({}, scope), { base: {}, locale: undefined });
    const changed = checkpoint.build.overrides({
      params: { enableChecks: false },
      locale: { title: { uk: 'Новий огляд' } },
      second: {
        question: { locale: { value: { uk: 'Інакше?' } } },
        answer: { answerText: { locale: { value: { uk: 'Відповідь' } } } },
      },
    }, scope);
    assert.deepEqual(changed.base.params, { enableChecks: false });
    assert.equal(changed.base.children, undefined);
    assert.equal(changed.base.first, undefined);
    assert.equal((changed.locale?.uk?.locale as { title: string }).title, 'Новий огляд');
    const second = changed.locale?.uk?.second as {
      question: { locale: { value: string } };
      answer: { answerText: { locale: { value: string } } };
    };
    assert.equal(second.question.locale.value, 'Інакше?');
    assert.equal(second.answer.answerText.locale.value, 'Відповідь');
    assert.deepEqual(checkpoint.build.data(scope), before);
  });

  test('add/remove/reorder uses one replacement children list and no mutable state', () => {
    const { checkpoint } = example();
    const later = item('later', '69', '6a', '6b', '6c', { en: 'Later?', uk: 'Потім?' });
    const before = checkpoint.build.data(scope);
    const patch = checkpoint.build.overrides({
      first: false,
      second: { question: { locale: { value: { uk: 'Інакше?' } } } },
      later,
      children: ['later', 'second'],
    }, scope);
    assert.deepEqual(patch.base.children, ['later', 'second']);
    assert.equal(patch.base.first, false);
    assert.equal((patch.base.later as { id: string }).id, later.id);
    assert.equal(
      (((patch.locale?.uk?.second as Record<string, unknown>).question as { locale: { value: string } }).locale.value),
      'Інакше?',
    );
    assert.equal(checkpoint.build.data(scope).base.children.includes('first'), true);
    assert.deepEqual(checkpoint.build.data(scope), before);
  });

  test('rejects unknown, duplicated, reserved and wrong-kind CheckpointItem keys', () => {
    const { first, second } = example();
    const metadata = {
      id: id('60'), slug: 'review', type: 'checkpoint' as const,
      params: {}, locale: { title: 'Review' },
    };
    const cases = [
      { ...metadata, children: [], first },
      { ...metadata, children: ['first'], first, second },
      { ...metadata, children: ['first', 'first'], first },
      { ...metadata, children: ['unknown'], first },
      { ...metadata, children: ['first'], first, content: first },
      { ...metadata, children: ['bad-key'], 'bad-key': first },
      { ...metadata, children: ['first'], first: text('first', '72', 'Not an Item') },
    ];
    for (const candidate of cases) {
      assert.equal(checkpoint_Config_Schema.safeParse(candidate).success, false);
      assert.throws(() => defineCheckpoint(candidate as never).build.data({ languages: ['en'] }));
    }
    for (const impostor of [
      { id: first.id, slug: first.slug, type: 'checkpointItem' },
      { ...first, build: {} },
      { ...first, config: { base: { id: id('70'), slug: 'first', type: 'checkpointItem' } } },
    ]) {
      assert.equal(checkpoint_Config_Schema.safeParse({
        ...metadata, children: ['first'], first: impostor,
      }).success, false);
    }
  });

  test('rejects malformed overrides, identity changes and disabled mandatory question', () => {
    const { checkpoint, first } = example();
    for (const patch of [
      { id: id('80') },
      { slug: 'renamed' },
      { type: 'checkpoint' },
      { params: { typo: true } },
      { children: ['second', 'unknown'] },
      { children: ['first', 'first', 'second'] },
      { first: false },
      { first: false, second: false, children: [] },
      { another: false },
      { another: first, children: ['first', 'second', 'another'] },
      { first: { question: { params: { disabled: true } } } },
      { content: { items: { first: false } } },
    ])
      assert.throws(() => checkpoint.build.overrides(patch as never, scope), /Invalid Checkpoint overrides/);
  });

  test('keeps pending media in nested Answer draft-only without changing paths or validation', () => {
    const pendingVideo = defineYoutube({
      id: id('70'), slug: 'pendingVideo', type: 'youtube',
      params: { mode: 'link' },
      locale: { href: UNRESOLVED_YOUTUBE_HREF, label: 'Pending video' },
    });
    const answer = defineCheckpointAnswer({
      id: id('71'), slug: 'answer', type: 'checkpointAnswer',
      children: ['pendingVideo'], pendingVideo,
    });
    const question = defineText({
      id: id('72'), slug: 'question', type: 'text',
      params: {}, locale: { value: 'Where is the shadow?' },
    });
    const first = defineCheckpointItem({
      id: id('73'), slug: 'first', type: 'checkpointItem', question, answer,
    });
    const checkpoint = defineCheckpoint({
      id: id('74'), slug: 'review', type: 'checkpoint',
      params: {}, locale: { title: 'Review' },
      children: ['first'], first,
    });
    assert.throws(() => checkpoint.build.data({ languages: ['en'] }), /unresolved video reference/);
    const preview = checkpoint.build.data({ languages: ['en'], mode: 'draft' });
    const item = preview.base.first as { answer: Record<string, unknown> };
    assert.equal((item.answer.pendingVideo as { type: string }).type, 'youtube');
    assert.throws(
      () => checkpoint.build.data({ languages: ['en'], mode: 'production' }),
      /unresolved video reference/,
    );
  });
});
