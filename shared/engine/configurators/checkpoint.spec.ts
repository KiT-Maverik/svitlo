import assert from 'node:assert/strict';
import test from 'node:test';

import {
  defineCheckpoint, defineText, defineMarkdown,
  checkpoint_Config_Schema, checkpoint_Props_Schema,
} from './contentBlocks';
import { checkCheckpointIntegrity } from './contentBlocks/defineCheckpoint/checkpoint.utils';
import type { ContentBlock_Checkpoint_Config } from './contentBlocks/defineCheckpoint/defineCheckpoint.schemas';

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const secondId = 'b775647f-203d-481a-a1c7-4d331c779d6b';

const question = defineText({
  id, slug: 'questionText', type: 'text', params: {}, locale: { value: { en: 'Why?', uk: 'Чому?' } },
});
const answer = defineText({
  id: secondId, slug: 'answerText', type: 'text', params: {}, locale: { value: 'Because' },
});
const explanation = defineMarkdown({
  id, slug: 'explanation', type: 'markdown', params: {}, locale: { value: 'A longer explanation.' },
});

const first = {
  question,
  answer: { items: { answerText: answer, explanation }, order: ['explanation', 'answerText'] as const },
  check: true as const,
};
const second = {
  question,
  answer: { items: { answerText: answer }, order: ['answerText'] as const },
};

function makeCheckpoint() {
  return defineCheckpoint({
    id: secondId, slug: 'review', type: 'checkpoint',
    params: { enableChecks: true }, locale: { title: 'Review' },
    content: {
      items: { whatIsLight: first, whatIsSound: second },
      order: ['whatIsSound', 'whatIsLight'],
    },
  });
}

test('Checkpoint parses metadata only and retains typed questions and nested answer collections', () => {
  const checkpoint = makeCheckpoint();
  assert.deepEqual(checkpoint.content.order, ['whatIsSound', 'whatIsLight']);
  assert.equal(checkpoint.content.items.whatIsLight.question, question);
  assert.equal(checkpoint.content.items.whatIsLight.answer.items.explanation, explanation);
  assert.deepEqual(checkpoint.content.items.whatIsLight.answer.order, ['explanation', 'answerText']);
  assert.equal(checkpoint.config.base.slug, 'review');
  assert.equal('content' in checkpoint.config.base, false);
  assert.deepEqual(checkpoint.config.locales(), { locale: {} });
  assert.equal(JSON.stringify(checkpoint.config.base).includes('function'), false);

  const metadata = {
    id: secondId, slug: 'review', type: 'checkpoint' as const,
    params: {}, locale: { title: 'Review' },
  };
  assert.equal(checkpoint_Config_Schema.safeParse(metadata).success, true);
  assert.equal(checkpoint_Config_Schema.safeParse({ ...metadata, content: null }).success, true);
  assert.equal(checkpoint_Props_Schema.safeParse(metadata).success, true);
  assert.doesNotThrow(() => checkCheckpointIntegrity({
    ...metadata,
    content: { items: { whatIsLight: first }, order: ['whatIsLight'] },
  }));
});

test('Checkpoint integrity checks keys, ordering, child types and slug identity', () => {
  const metadata = {
    id: secondId, slug: 'review', type: 'checkpoint' as const,
    params: {}, locale: { title: 'Review' },
  };
  function expectInvalid(content: unknown, reason: RegExp) {
    assert.throws(() => checkCheckpointIntegrity({
      ...metadata,
      content,
    } as ContentBlock_Checkpoint_Config), reason);
  }
  const good = { items: { whatIsLight: first }, order: ['whatIsLight'] };
  assert.throws(() => checkCheckpointIntegrity({ ...metadata, id: 'invalid', content: good }), /Invalid UUID/);
  expectInvalid({ ...good, order: [] }, /missing slug/);
  expectInvalid({ ...good, order: ['whatIsLight', 'whatIsLight'] }, /duplicate slug/);
  expectInvalid({ ...good, order: ['missing'] }, /unknown slug/);
  expectInvalid({ items: { bad_slug: first }, order: ['bad_slug'] }, /non-camelCase/);
  expectInvalid({ items: {}, order: [] }, /at least one item/);
  expectInvalid({ items: { whatIsLight: { ...first, question: answer.config.base } }, order: ['whatIsLight'] },
    /must be a ContentBlock configurator/);
  expectInvalid({ items: { whatIsLight: { ...first, question: explanation } }, order: ['whatIsLight'] },
    /must be a Text configurator/);
  expectInvalid({ items: { whatIsLight: { ...first, answer: { items: {}, order: [] } } },
    order: ['whatIsLight'] }, /at least one item/);
  expectInvalid({ items: { whatIsLight: { ...first, answer: { items: { wrongKey: answer }, order: ['wrongKey'] } } },
    order: ['whatIsLight'] }, /does not match configurator slug/);
  expectInvalid({ items: { whatIsLight: { ...first, answer: {
    items: { answerText: answer }, order: ['answerText', 'answerText'],
  } } }, order: ['whatIsLight'] }, /duplicate slug/);

  const nested = makeCheckpoint();
  expectInvalid({ items: { whatIsLight: { ...first, answer: {
    items: { review: nested }, order: ['review'],
  } } }, order: ['whatIsLight'] }, /unsupported type: checkpoint/);
});

test('Checkpoint overrides add/remove/reorder questions and answers atomically', () => {
  const checkpoint = makeCheckpoint();
  const original = checkpoint.content;
  const extended = checkpoint.override.content.add('newQuestion', second);
  assert.equal(checkpoint.content, original);
  assert.deepEqual(checkpoint.content.order, ['whatIsSound', 'whatIsLight', 'newQuestion']);
  extended.override.content.setOrder(['newQuestion', 'whatIsLight', 'whatIsSound']);
  assert.deepEqual(checkpoint.content.order, ['newQuestion', 'whatIsLight', 'whatIsSound']);
  assert.throws(() =>
    checkpoint.override.content.add('whatIsLight' as never, first),
  /duplicate slug/);
  assert.deepEqual(checkpoint.content.order, ['newQuestion', 'whatIsLight', 'whatIsSound']);
  assert.throws(() =>
    checkpoint.override.content.setOrder(['whatIsLight']),
  /missing slug/);
  assert.deepEqual(checkpoint.content.order, ['newQuestion', 'whatIsLight', 'whatIsSound']);

  const answerOverrides = checkpoint.override.content.answers('whatIsSound');
  answerOverrides.add('explanation', explanation);
  assert.deepEqual(checkpoint.content.items.whatIsSound.answer.order, ['answerText', 'explanation']);
  assert.throws(() => answerOverrides.add('explanation', explanation), /duplicate slug/);
  assert.deepEqual(checkpoint.content.items.whatIsSound.answer.order, ['answerText', 'explanation']);
  answerOverrides.setOrder(['explanation', 'answerText']);
  assert.deepEqual(checkpoint.content.items.whatIsSound.answer.order, ['explanation', 'answerText']);
  answerOverrides.remove('answerText');
  assert.deepEqual(checkpoint.content.items.whatIsSound.answer.order, ['explanation']);
  assert.throws(() => answerOverrides.remove('answerText'), /unknown slug|must contain at least one item/);
  assert.deepEqual(checkpoint.content.items.whatIsSound.answer.order, ['explanation']);

  const reduced = extended.override.content.remove('newQuestion');
  assert.deepEqual(reduced.content.order, ['whatIsLight', 'whatIsSound']);
  const secondReduction = reduced.override.content.remove('whatIsSound');
  assert.deepEqual(secondReduction.content.order, ['whatIsLight']);
  assert.throws(() => secondReduction.override.content.remove('whatIsLight'), /at least one item/);
  assert.deepEqual(checkpoint.content.order, ['whatIsLight']);

  checkpoint.override.params({ enableChecks: false });
  checkpoint.override.locale({ title: { uk: 'Перевір себе' } });
  assert.deepEqual(checkpoint.config.overrides.params, { enableChecks: false });
  assert.deepEqual(checkpoint.config.overrides.locale, { title: { uk: 'Перевір себе' } });
  checkpoint.disable();
  assert.deepEqual(checkpoint.config.overrides.params, { disabled: true });
});
