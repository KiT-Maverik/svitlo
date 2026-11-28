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
        children: ['prompt' as const],
        prompt,
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

      /**
       * A union of five unrelated generic Build methods cannot accept a
       * single nested patch by invoking their intersected signatures.
       * Narrow the actual Section discriminator before calling its Build API.
       * This keeps every invocation fully typechecked, without casts.
       */
      const overridePrompt = (
        section: ReturnType<(typeof definitions)[number]>,
        value: string,
        languages: readonly ('en' | 'uk')[],
      ) => {
        const patch = { prompt: { locale: { value: { uk: value } } } };
        const options = { languages };
        switch (section.type) {
          case 'content':
            return section.build.overrides(patch, options);
          case 'practice':
            return section.build.overrides(patch, options);
          case 'codingTask':
            return section.build.overrides(patch, options);
          case 'learningFlow':
            return section.build.overrides(patch, options);
          case 'flashcards':
            return section.build.overrides(patch, options);
        }
      };

      const overrideSkipping = (section: ReturnType<(typeof definitions)[number]>, skippable: boolean) => {
        const options = { languages: ['en', 'uk'] as const };
        switch (section.type) {
          case 'content':
            return section.build.overrides({ params: { skippable } }, options);
          case 'practice':
            return section.build.overrides({ params: { skippable } }, options);
          case 'codingTask':
            return section.build.overrides({ params: { skippable } }, options);
          case 'learningFlow':
            return section.build.overrides({ params: { skippable } }, options);
          case 'flashcards':
            return section.build.overrides({ params: { skippable } }, options);
        }
      };

      const replacePrompt = (section: ReturnType<(typeof definitions)[number]>) => {
        const options = { languages: ['en', 'uk'] as const };
        switch (section.type) {
          case 'content':
            return section.build.overrides({ children: ['extra'], prompt: false, extra }, options);
          case 'practice':
            return section.build.overrides({ children: ['extra'], prompt: false, extra }, options);
          case 'codingTask':
            return section.build.overrides({ children: ['extra'], prompt: false, extra }, options);
          case 'learningFlow':
            return section.build.overrides({ children: ['extra'], prompt: false, extra }, options);
          case 'flashcards':
            return section.build.overrides({ children: ['extra'], prompt: false, extra }, options);
        }
      };

      const overrideTitle = (section: ReturnType<(typeof definitions)[number]>) => {
        const options = { languages: ['en', 'uk'] as const };
        switch (section.type) {
          case 'content':
            return section.build.overrides({ locale: { title: { uk: 'Оновлено' } } }, options);
          case 'practice':
            return section.build.overrides({ locale: { title: { uk: 'Оновлено' } } }, options);
          case 'codingTask':
            return section.build.overrides({ locale: { title: { uk: 'Оновлено' } } }, options);
          case 'learningFlow':
            return section.build.overrides({ locale: { title: { uk: 'Оновлено' } } }, options);
          case 'flashcards':
            return section.build.overrides({ locale: { title: { uk: 'Оновлено' } } }, options);
        }
      };

      /** Exercise invalid dynamically sourced Config patches against every concrete Section. */
      const rejectPatch = (section: ReturnType<(typeof definitions)[number]>, patch: unknown) =>
        Reflect.apply(section.build.overrides, undefined, [patch, { languages: ['en', 'uk'] }]);

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
          assert.deepEqual(overrideSkipping(section, false).base.params, { skippable: false });
          assert.deepEqual(overrideSkipping(section, true).base.params, { skippable: true });
          assert.equal((original.base.prompt as { slug?: string })?.slug, 'prompt');
          assert.equal(textValue(original.locale?.uk?.prompt), 'Питання');
          assert.deepEqual(original.locale?.uk?.locale, { title: 'Назва' });
          assert.equal(original.locale?.en?.locale?.title, 'Title');
          assert.doesNotThrow(() => JSON.stringify(original));

          const changed = replacePrompt(section);
          assert.deepEqual(changed.base.children, ['extra']);
          assert.deepEqual(changed.locale, undefined, 'invariant replacement needs no translated file');
          assert.equal(
            (section.build.data({ languages: ['en', 'uk'] }).base.prompt as { slug?: string })?.slug,
            'prompt',
          );
          assert.deepEqual(section.children, ['prompt']);
          assert.deepEqual(original.base.children, ['prompt']);
          assert.equal(textValue(section.build.data({ languages: ['en', 'uk'] }).locale?.uk?.prompt), 'Питання');

          const sparse = overrideTitle(section);
          assert.deepEqual(sparse.base, {});
          assert.deepEqual(sparse.locale, { uk: { locale: { title: 'Оновлено' } } });

          assert.throws(() => rejectPatch(section, { prompt: false }), /children is required/);
          assert.throws(() => rejectPatch(section, { children: ['prompt'], extra }), /Unlisted|Missing slug|unlisted/i);
          assert.throws(
            () => rejectPatch(section, { children: ['prompt', 'extra', 'extra'], extra }),
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

        assert.throws(() => author({ children: ['prompt', 'prompt'] }), /Duplicate placement|Duplicate slug/);
        assert.throws(() => author({ children: [] }), /Unlisted|Missing slug|unlisted/i);
        assert.throws(
          () => author({ children: ['prompt', 'missing'] }),
          /Unknown or disabled|Unknown child|Missing slug/,
        );
        assert.throws(() => author({ content: extra }), /Reserved child placement slug|Reserved child/);
        assert.throws(() => author({ prompt: { ...prompt, type: 'lesson' } }), /Unsupported child type|Unsupported/);
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
          const one = overridePrompt(section, 'Один', ['en', 'uk']);
          const two = overridePrompt(section, 'Два', ['en', 'uk']);
          assert.equal(textValue(one.locale?.uk?.prompt), 'Один');
          assert.equal(textValue(two.locale?.uk?.prompt), 'Два');
          const base = section.build.data({ languages: ['en', 'uk'] });
          assert.equal(textValue(base.locale?.uk?.prompt), 'Питання');
          if (typeof one.base.prompt === 'object' && one.base.prompt !== null)
            (one.base.prompt as { slug?: string }).slug = 'tampered';
          assert.equal(
            (section.build.data({ languages: ['en', 'uk'] }).base.prompt as { slug?: string })?.slug,
            'prompt',
          );
        }
      });

      test('Sections materialize only selected languages in resources and atomic nested patches', () => {
        for (const create of definitions) {
          const section = create();
          const one = section.build.data({ languages: ['uk'] });
          assert.deepEqual(Object.keys(one.locale ?? {}), ['uk']);
          assert.equal(one.locale?.en, undefined);
          const replacement = overridePrompt(section, 'Новий текст', ['uk']);
          assert.deepEqual(Object.keys(replacement.locale ?? {}), ['uk']);
          assert.equal(textValue(replacement.locale?.uk?.prompt), 'Новий текст');
          assert.throws(() => section.build.data({ languages: [] }), /nonempty languages/);
          assert.throws(() => section.build.data({ languages: ['uk', 'uk'] }), /unique/);
        }
      });
    });
  });
});
