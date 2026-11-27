import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineText } from '../contentBlocks/primitive/defineText/defineText';
import { defineCodingTaskSection } from './defineCodingTaskSection';
import { defineContentSection } from './defineContentSection';
import { defineFlashcardsSection } from './defineFlashcardsSection';
import { defineLearningFlowSection } from './defineLearningFlowSection';
import { definePracticeSection } from './definePracticeSection';

describe('Configurators', () => {
  describe('Sections', () => {
    describe('section configurators', () => {
      const id = (suffix: string) => 'e5235ac2-2c44-4c10-8c48-3c7bad6490' + suffix;
      const prompt = defineText<'prompt', ['en', 'uk']>({
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
        slug: 'unit' as const,
        type,
        params: {},
        locale: { title: { en: 'Title', uk: 'Назва' }, navigationLabel: '1' },
        children: ['prompt'], prompt,
      });
      const textValue = (value: unknown): string | undefined => {
        if (!value || typeof value !== 'object' || !('locale' in value)) return undefined;
        return (value.locale as { value?: string } | undefined)?.value;
      };

      const definitions = [
        () => defineContentSection<'unit', { prompt: typeof prompt }, ['en', 'uk']>(input('content')),
        () => definePracticeSection<'unit', { prompt: typeof prompt }, ['en', 'uk']>(input('practice')),
        () => defineCodingTaskSection<'unit', { prompt: typeof prompt }, ['en', 'uk']>(input('codingTask')),
        () => defineLearningFlowSection<'unit', { prompt: typeof prompt }, ['en', 'uk']>(input('learningFlow')),
        () =>
          defineFlashcardsSection<'unit', { prompt: typeof prompt }, ['en', 'uk']>({
            ...input('flashcards'),
            params: { selection: { flashcardIds: [id('04')] } },
          }),
      ];

      test('every Section publishes ordered JSON-safe ContentBlock Props without mutable override state', () => {
        for (const create of definitions) {
          const section = create();
          assert.equal(section.config.base.type, section.type);
          assert.equal(section.config.base.locale.navigationLabel, '1');
          assert.equal('override' in section, false);
          assert.equal('disable' in section, false);
          assert.equal('overrides' in section.config, false);
          const original = section.build.data({ languages: ['en', 'uk'] });
          assert.equal(original.base.params.skippable, undefined);
          assert.deepEqual(
            section.build.overrides({ params: { skippable: false } }, { languages: ['en', 'uk'] }).base.params,
            { skippable: false },
          );
          assert.deepEqual(
            section.build.overrides({ params: { skippable: true } }, { languages: ['en', 'uk'] }).base.params,
            { skippable: true },
          );
          assert.equal((original.base.prompt as { slug?: string })?.slug, 'prompt');
          assert.equal(textValue(original.locale?.uk?.prompt), 'Питання');
          assert.deepEqual(original.locale?.uk?.locale, { title: 'Назва' });
          assert.equal(original.locale?.en?.locale?.title, 'Title');
          assert.doesNotThrow(() => JSON.stringify(original));

          const changed = section.build.overrides(
            {
              children: ['extra'], prompt: false, extra,
            },
            { languages: ['en', 'uk'] },
          );
          assert.deepEqual(
            changed.base.children,
            ['extra'],
          );
          assert.deepEqual(changed.locale, undefined, 'invariant replacement needs no translated file');
          assert.equal((section.build.data({ languages: ['en', 'uk'] }).base.prompt as {slug?: string})?.slug, 'prompt');
          assert.deepEqual(section.children, ['prompt']);
          assert.deepEqual(
            original.base.children,
            ['prompt'],
          );
          assert.equal(textValue(section.build.data({ languages: ['en', 'uk'] }).locale?.uk?.prompt), 'Питання');

          const sparse = section.build.overrides(
            { locale: { title: { uk: 'Оновлено' } } },
            { languages: ['en', 'uk'] },
          );
          assert.deepEqual(sparse.base, {});
          assert.deepEqual(sparse.locale, { uk: { locale: { title: 'Оновлено' } } });

          assert.throws(
            () =>
              section.build.overrides(
                {
                  prompt: false,
                },
                { languages: ['en', 'uk'] },
              ),
            /children is required/,
          );
          assert.throws(
            () =>
              section.build.overrides(
                {
                  children: ['prompt'], extra,
                },
                { languages: ['en', 'uk'] },
              ),
            /Unlisted|Missing slug|unlisted/i,
          );
          assert.throws(
            () =>
              section.build.overrides(
                {
                  children: ['prompt', 'extra', 'extra'], extra,
                },
                { languages: ['en', 'uk'] },
              ),
            /Duplicate slug|Duplicate placement/i,
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

      test('direct Section children reject unsafe names, missing order entries, wrong kinds and duplicate IDs', () => {
        const author = (patch: Record<string, unknown>) =>
          defineContentSection({
            ...input('content'),
            ...patch,
          } as never).build.data({ languages: ['en', 'uk'] });

        assert.throws(
          () => author({ children: ['prompt', 'prompt'] }),
          /Duplicate placement|Duplicate slug/,
        );
        assert.throws(
          () => author({ children: [] }),
          /Unlisted|Missing slug|unlisted/i,
        );
        assert.throws(
          () => author({ children: ['prompt', 'missing'] }),
          /Unknown or disabled|Unknown child|Missing slug/,
        );
        assert.throws(
          () => author({ content: extra }),
          /Reserved child placement slug|Reserved child/,
        );
        assert.throws(
          () => author({ prompt: { ...prompt, type: 'lesson' } }),
          /Unsupported child type|Unsupported/,
        );
        assert.throws(
          () => author({ children: ['prompt', 'other'], other: { ...prompt, slug: 'other' } }),
          /Duplicate Section ContentBlock ID|Duplicate child ID/,
        );
      });

      test('Section authoring preserves an explicit opt-out from Lesson skipping', () => {
        const section = defineContentSection<'unit', { prompt: typeof prompt }, ['en', 'uk']>({
          ...input('content'),
          params: { skippable: false },
        });
        assert.equal(section.build.data({ languages: ['en'] }).base.params.skippable, false);
        assert.equal(section.config.base.params.skippable, false);
      });

      test('all Sections remain reusable across independently built override contexts', () => {
        for (const create of definitions) {
          const section = create();
          const one = section.build.overrides(
            { prompt: { locale: { value: { uk: 'Один' } } } },
            { languages: ['en', 'uk'] },
          );
          const two = section.build.overrides(
            { prompt: { locale: { value: { uk: 'Два' } } } },
            { languages: ['en', 'uk'] },
          );
          assert.equal(textValue(one.locale?.uk?.prompt), 'Один');
          assert.equal(textValue(two.locale?.uk?.prompt), 'Два');
          const base = section.build.data({ languages: ['en', 'uk'] });
          assert.equal(textValue(base.locale?.uk?.prompt), 'Питання');
          if (typeof one.base.prompt === 'object' && one.base.prompt !== null)
            (one.base.prompt as { slug?: string }).slug = 'tampered';
          assert.equal((section.build.data({ languages: ['en', 'uk'] }).base.prompt as {slug?: string})?.slug, 'prompt');
        }
      });

      test('Sections materialize only selected languages in resources and atomic nested patches', () => {
        for (const create of definitions) {
          const section = create();
          const one = section.build.data({ languages: ['uk'] });
          assert.deepEqual(Object.keys(one.locale ?? {}), ['uk']);
          assert.equal(one.locale?.en, undefined);
          const replacement = section.build.overrides(
            {
              prompt: { locale: { value: { uk: 'Новий текст' } } },
            },
            { languages: ['uk'] },
          );
          assert.deepEqual(Object.keys(replacement.locale ?? {}), ['uk']);
          assert.equal(textValue(replacement.locale?.uk?.prompt), 'Новий текст');
          assert.throws(() => section.build.data({ languages: [] }), /nonempty languages/);
          assert.throws(() => section.build.data({ languages: ['uk', 'uk'] }), /unique/);
        }
      });
    });
  });
});
