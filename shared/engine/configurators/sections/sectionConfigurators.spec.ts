import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../contentBlocks/defineText/defineText';
import { defineContentSection } from './defineContentSection';
import { definePracticeSection } from './definePracticeSection';
import { defineCodingTaskSection } from './defineCodingTaskSection';
import { defineLearningFlowSection } from './defineLearningFlowSection';
import { defineFlashcardsSection } from './defineFlashcardsSection';

const id = (suffix: string) => 'e5235ac2-2c44-4c10-8c48-3c7bad6490' + suffix;

const prompt = defineText({
  id: id('01'),
  slug: 'prompt',
  type: 'text',
  params: {},
  locale: { value: 'Question' },
});
const extra = defineText({
  id: id('02'),
  slug: 'extra',
  type: 'text',
  params: {},
  locale: { value: 'Additional content' },
});

const input = <const Type extends 'content' | 'practice' | 'codingTask' | 'learningFlow' | 'flashcards'>(
  type: Type,
) => ({
  id: id('03'),
  slug: 'unit',
  type,
  params: {},
  locale: { title: { en: 'Title', uk: 'Назва' }, navigationLabel: '1' },
  content: { items: { prompt }, order: ['prompt'] },
});

const definitions = [
  () => defineContentSection(input('content')),
  () => definePracticeSection(input('practice')),
  () => defineCodingTaskSection(input('codingTask')),
  () => defineLearningFlowSection(input('learningFlow')),
  () => defineFlashcardsSection(input('flashcards')),
];

test('each Section owns the same public lifecycle without a shared factory', () => {
  for (const create of definitions) {
    const section = create();
    assert.equal(section.config.base.type, section.type);
    assert.equal(section.config.base.locale.navigationLabel, '1');
    assert.deepEqual(section.config.locales(), {
      locale: { title: { en: 'Title', uk: 'Назва' } },
    });
    assert.equal(section.content.items.prompt, prompt);

    section.override.content.add('extra', extra);
    assert.equal(section.config.overrides.content?.items?.extra, extra);
    assert.deepEqual(section.config.overrides.content?.order, ['prompt', 'extra']);
    assert.throws(() => section.override.content.add('extra', extra), /duplicate/);

    section.override.content.disable(['prompt']);
    assert.equal(section.config.overrides.content?.items?.prompt, false);
    assert.deepEqual(section.config.overrides.content?.order, ['extra']);
    assert.throws(() => section.override.content.order(['prompt']), /order/);

    assert.deepEqual(section.content.order, ['prompt'], 'authored content must remain unchanged');
    section.override.params({ skippable: true });
    assert.deepEqual(section.config.overrides.params, { skippable: true });
    section.disable();
    assert.deepEqual(section.config.overrides.params, { disabled: true });
  }
});
