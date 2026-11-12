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
  id: id('01'), slug: 'prompt', type: 'text', params: {},
  locale: { value: { en: 'Question', uk: 'Питання' } },
});
const extra = defineText({
  id: id('02'), slug: 'extra', type: 'text', params: {},
  locale: { value: 'Additional content' },
});
const input = <const Type extends 'content' | 'practice' | 'codingTask' | 'learningFlow' | 'flashcards'>(
  type: Type,
) => ({
  id: id('03'), slug: 'unit', type, params: {},
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

test('every Section publishes ordered JSON-safe ContentBlock Props without mutable override state', () => {
  for (const create of definitions) {
    const section = create();
    assert.equal(section.config.base.type, section.type);
    assert.equal(section.config.base.locale.navigationLabel, '1');
    assert.equal('override' in section, false);
    assert.equal('disable' in section, false);
    assert.equal('overrides' in section.config, false);
    const original = section.build.props();
    assert.equal(original.base.content[0]?.slug, 'prompt');
    assert.equal(original.locale?.uk?.content?.[0]?.locale?.value, 'Питання');
    assert.deepEqual(original.locale?.uk?.locale, { title: 'Назва' });
    assert.equal(original.locale?.en?.locale?.title, 'Title');
    assert.doesNotThrow(() => JSON.stringify(original));

    const changed = section.build.overrides({
      content: {
        items: { prompt: false },
        additionalItems: { extra },
        order: ['extra'],
      },
    });
    assert.deepEqual(changed.base.content?.map(block => block.slug), ['extra']);
    assert.deepEqual(changed.locale, undefined, 'invariant replacement needs no translated file');
    assert.equal(section.build.props().base.content[0]?.slug, 'prompt');
    assert.deepEqual(section.content.order, ['prompt']);
    assert.deepEqual(original.base.content.map(block => block.slug), ['prompt']);
    assert.equal(section.build.props().locale?.uk?.content?.[0]?.locale?.value, 'Питання');

    const sparse = section.build.overrides({ locale: { title: { uk: 'Оновлено' } } });
    assert.deepEqual(sparse.base, {});
    assert.deepEqual(sparse.locale, { uk: { locale: { title: 'Оновлено' } } });

    assert.throws(() => section.build.overrides({
      content: { items: { prompt: false } },
    }), /order is required/);
    assert.throws(() => section.build.overrides({
      content: { additionalItems: { extra }, order: ['prompt'] },
    }), /Missing slug/);
    assert.throws(() => section.build.overrides({
      content: { additionalItems: { extra }, order: ['prompt', 'extra', 'extra'] },
    }), /Duplicate slug/);
    assert.throws(() => section.build.overrides({ id: id('09') } as never), /Invalid .* overrides/);
    assert.throws(() => section.build.overrides({ locale: { unexpected: 'x' } } as never), /Invalid .* overrides/);
  }
});

test('all Sections remain reusable across independently built override contexts', () => {
  for (const create of definitions) {
    const section = create();
    const one = section.build.overrides({ content: { items: { prompt: { locale: { value: { uk: 'Один' } } } } } });
    const two = section.build.overrides({ content: { items: { prompt: { locale: { value: { uk: 'Два' } } } } } });
    assert.equal(one.locale?.uk?.content?.[0]?.locale?.value, 'Один');
    assert.equal(two.locale?.uk?.content?.[0]?.locale?.value, 'Два');
    const base = section.build.props();
    assert.equal(base.locale?.uk?.content?.[0]?.locale?.value, 'Питання');
    if (one.base.content) one.base.content[0]!.slug = 'tampered';
    assert.equal(section.build.props().base.content[0]?.slug, 'prompt');
  }
});
