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
  locale: { value: { en: 'Question', uk: 'Питання' } },
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
const textValue = (blocks: { type: string; locale?: unknown }[] | undefined): string | undefined => {
  const block = blocks?.[0];
  if (block?.type !== 'text') return undefined;
  return (block.locale as { value?: string } | undefined)?.value;
};

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
    const original = section.build.props({ languages: ['en', 'uk'] });
    assert.equal(original.base.params.skippable, undefined);
    assert.deepEqual(
      section.build.overrides({ params: { skippable: false } }, { languages: ['en', 'uk'] }).base.params,
      { skippable: false },
    );
    assert.deepEqual(
      section.build.overrides({ params: { skippable: true } }, { languages: ['en', 'uk'] }).base.params,
      { skippable: true },
    );
    assert.equal(original.base.content[0]?.slug, 'prompt');
    assert.equal(textValue(original.locale?.uk?.content), 'Питання');
    assert.deepEqual(original.locale?.uk?.locale, { title: 'Назва' });
    assert.equal(original.locale?.en?.locale?.title, 'Title');
    assert.doesNotThrow(() => JSON.stringify(original));

    const changed = section.build.overrides(
      {
        content: {
          items: { prompt: false },
          additionalItems: { extra },
          order: ['extra'],
        },
      },
      { languages: ['en', 'uk'] },
    );
    assert.deepEqual(
      changed.base.content?.map(block => block.slug),
      ['extra'],
    );
    assert.deepEqual(changed.locale, undefined, 'invariant replacement needs no translated file');
    assert.equal(section.build.props({ languages: ['en', 'uk'] }).base.content[0]?.slug, 'prompt');
    assert.deepEqual(section.content.order, ['prompt']);
    assert.deepEqual(
      original.base.content.map(block => block.slug),
      ['prompt'],
    );
    assert.equal(textValue(section.build.props({ languages: ['en', 'uk'] }).locale?.uk?.content), 'Питання');

    const sparse = section.build.overrides({ locale: { title: { uk: 'Оновлено' } } }, { languages: ['en', 'uk'] });
    assert.deepEqual(sparse.base, {});
    assert.deepEqual(sparse.locale, { uk: { locale: { title: 'Оновлено' } } });

    assert.throws(
      () =>
        section.build.overrides(
          {
            content: { items: { prompt: false } },
          },
          { languages: ['en', 'uk'] },
        ),
      /order is required/,
    );
    assert.throws(
      () =>
        section.build.overrides(
          {
            content: { additionalItems: { extra }, order: ['prompt'] },
          },
          { languages: ['en', 'uk'] },
        ),
      /Missing slug/,
    );
    assert.throws(
      () =>
        section.build.overrides(
          {
            content: { additionalItems: { extra }, order: ['prompt', 'extra', 'extra'] },
          },
          { languages: ['en', 'uk'] },
        ),
      /Duplicate slug/,
    );
    assert.throws(
      () => section.build.overrides({ id: id('09') } as never, { languages: ['en', 'uk'] }),
      /Invalid .* overrides/,
    );
    assert.throws(
      () => section.build.overrides({ locale: { unexpected: 'x' } } as never, { languages: ['en', 'uk'] }),
      /Invalid .* overrides/,
    );
  }
});

test('Section authoring preserves an explicit opt-out from Lesson skipping', () => {
  const section = defineContentSection({ ...input('content'), params: { skippable: false } });
  assert.equal(section.build.props({ languages: ['en'] }).base.params.skippable, false);
  assert.equal(section.config.base.params.skippable, false);
});

test('all Sections remain reusable across independently built override contexts', () => {
  for (const create of definitions) {
    const section = create();
    const one = section.build.overrides(
      { content: { items: { prompt: { locale: { value: { uk: 'Один' } } } } } },
      { languages: ['en', 'uk'] },
    );
    const two = section.build.overrides(
      { content: { items: { prompt: { locale: { value: { uk: 'Два' } } } } } },
      { languages: ['en', 'uk'] },
    );
    assert.equal(textValue(one.locale?.uk?.content), 'Один');
    assert.equal(textValue(two.locale?.uk?.content), 'Два');
    const base = section.build.props({ languages: ['en', 'uk'] });
    assert.equal(textValue(base.locale?.uk?.content), 'Питання');
    if (one.base.content) one.base.content[0]!.slug = 'tampered';
    assert.equal(section.build.props({ languages: ['en', 'uk'] }).base.content[0]?.slug, 'prompt');
  }
});

test('Sections materialize only selected languages in resources and atomic nested patches', () => {
  for (const create of definitions) {
    const section = create();
    const one = section.build.props({ languages: ['uk'] });
    assert.deepEqual(Object.keys(one.locale ?? {}), ['uk']);
    assert.equal(one.locale?.en, undefined);
    const replacement = section.build.overrides(
      {
        content: { items: { prompt: { locale: { value: { uk: 'Новий текст' } } } } },
      },
      { languages: ['uk'] },
    );
    assert.deepEqual(Object.keys(replacement.locale ?? {}), ['uk']);
    assert.equal(textValue(replacement.locale?.uk?.content), 'Новий текст');
    assert.throws(() => section.build.props({ languages: [] }), /nonempty languages/);
    assert.throws(() => section.build.props({ languages: ['uk', 'uk'] }), /unique/);
  }
});
