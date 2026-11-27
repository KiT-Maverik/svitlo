import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { defineText } from '../../contentBlocks/primitive/defineText/defineText';
import { defineChapter } from '../../courses/defineChapter';
import { defineCourse } from '../../courses/defineCourse';
import { defineModule } from '../../courses/defineModule';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineEpisode } from './defineEpisode';
import {
  episode_Completed_Data_Schema,
  episode_Draft_Data_Schema,
  episode_Data_Schema,
  episodeConfigurator_Schema,
} from './defineEpisode.schemas';

describe('Configurators', () => {
  describe('Episodes', () => {
    describe('defineEpisode', () => {
      const id = (suffix: string) => 'd275647f-203d-481a-a1c7-4d331c779d' + suffix;
      const languages = ['en', 'uk'] as const;

      const line = defineText<'line', ['en', 'uk']>({
        id: id('01'),
        slug: 'line',
        type: 'text',
        params: {},
        locale: { value: { en: 'You enter the hall', uk: 'Ви заходите до зали' } },
      });
      const intro = defineContentSection<'intro', { line: typeof line }, typeof languages>({
        id: id('02'),
        slug: 'intro',
        type: 'content',
        params: {},
        locale: { title: 'Arrival', navigationLabel: '1' },
        children: ['line'], line,
      });
      const makeEpisode = () =>
        defineEpisode({
          id: id('03'),
          slug: 'arrival',
          type: 'episode',
          params: { languages },
          locale: { title: { en: 'Arrival', uk: 'Прибуття' } },
          children: ['intro'], intro,
          events: { enter: { trigger: 'onStart' } },
        });

      test('completed Episode Data rejects Draft markers, and Draft requires a valid Content Section and Text placeholder', () => {
        const episode = makeEpisode();
        const built = episode.build.data({ languages: ['en'] });
        const completed = mergeForValidation(built.base, built.locale?.en ?? {});
        assert.equal(episode_Completed_Data_Schema.safeParse(completed).success, true);

        // Draft must never fall through the completed arm of the union.
        const missingPlaceholder = { ...completed, draft: true };
        assert.equal(episode_Completed_Data_Schema.safeParse(missingPlaceholder).success, false);
        assert.equal(episode_Draft_Data_Schema.safeParse(missingPlaceholder).success, false);
        assert.equal(episode_Data_Schema.safeParse(missingPlaceholder).success, false);

        const intro = completed.intro as Record<string, unknown>;
        const line = intro.line as Record<string, unknown>;
        const validDraft = {
          ...completed,
          draft: true,
          intro: {
            ...intro,
            line: { ...line, locale: { value: 'Not implemented' } },
          },
        };
        assert.equal(episode_Completed_Data_Schema.safeParse(validDraft).success, false);
        assert.equal(episode_Draft_Data_Schema.safeParse(validDraft).success, true);
        assert.equal(episode_Data_Schema.safeParse(validDraft).success, true);

        // A structural parent cannot treat an arbitrary Section or forged Text as a draft.
        const invalidKind = { ...validDraft, intro: { ...validDraft.intro, type: 'quiz' } };
        assert.equal(episode_Draft_Data_Schema.safeParse(invalidKind).success, false);
        assert.equal(episode_Data_Schema.safeParse(invalidKind).success, false);
        const forgedText = {
          ...validDraft,
          intro: { ...validDraft.intro, line: { type: 'text', locale: { value: 'Not implemented' } } },
        };
        assert.equal(episode_Draft_Data_Schema.safeParse(forgedText).success, false);
        assert.equal(episode_Data_Schema.safeParse(forgedText).success, false);
        const disabled = { ...validDraft, intro: { ...validDraft.intro, params: { disabled: true } } };
        assert.equal(episode_Data_Schema.safeParse(disabled).success, false);
      });

      test('Episode is an independent JSON-safe configurator with sparse locale and no Lesson pedagogy', () => {
        const episode = makeEpisode();
        const resource = episode.build.data({ languages: ['en', 'uk'] });
        assert.equal(episodeConfigurator_Schema.safeParse(episode).success, true);
        assert.equal(episode.type, 'episode');
        assert.equal(episode.intro, intro);
        assert.equal('skills' in episode.config.base, false);
        assert.equal('programId' in episode.config.base, false);
        assert.equal('flashcards' in resource.base, false);
        assert.equal('questions' in resource.base, false);
        assert.deepEqual(resource.base.events, { enter: { trigger: 'onStart' } });
        assert.deepEqual(
          resource.base.children,
          ['intro'],
        );
        assert.deepEqual(episode.config.locales(), { locale: { title: { en: 'Arrival', uk: 'Прибуття' } } });
        assert.equal(resource.locale?.uk?.locale?.title, 'Прибуття');
        assert.ok(JSON.stringify(resource.locale?.uk?.intro).includes('Ви заходите до зали'));
        assert.equal(
          episode_Data_Schema.safeParse(mergeForValidation(resource.base, resource.locale?.uk ?? {})).success,
          true,
        );
        assert.doesNotThrow(() => JSON.stringify(resource));
      });

      test('Episode overrides metadata and Section children without modifying the canonical Episode', () => {
        const episode = makeEpisode();
        const original = episode.build.data({ languages: ['en', 'uk'] });
        const result = episode.build.overrides(
          {
            locale: { title: { uk: 'Нове прибуття' } },
            intro: { line: { locale: { value: { uk: 'Відчиніть двері' } } } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          Object.keys(result.base).filter(key => key === 'intro'),
          ['intro'],
        );
        assert.equal(result.locale?.uk?.locale?.title, 'Нове прибуття');
        assert.ok(JSON.stringify(result.locale?.uk?.intro).includes('Відчиніть двері'));
        assert.ok(JSON.stringify(episode.build.data({ languages: ['en', 'uk'] })).includes('Ви заходите до зали'));
        assert.deepEqual(episode.build.data({ languages: ['en', 'uk'] }), original);

        const extra = defineContentSection<'extra', {}, typeof languages>({
          id: id('04'),
          slug: 'extra',
          type: 'content',
          params: {},
          locale: { title: 'Exit', navigationLabel: '2' },
          children: [],
        });
        const reordered = episode.build.overrides(
          {
            children: ['extra'], intro: false, extra,
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          reordered.base.children,
          ['extra'],
        );
        assert.deepEqual(episode.children, ['intro']);
        assert.throws(
          () => episode.build.overrides({ intro: false }, { languages: ['en', 'uk'] }),
          /children.*required/,
        );
        assert.throws(
          () => episode.build.overrides({ children: ['intro', 'intro'] }, { languages: ['en', 'uk'] }),
          /Duplicate placement slug|Duplicate slug/,
        );
        assert.throws(
          () =>
            episode.build.overrides({ missing: false } as never, { languages: ['en', 'uk'] }),
          /Expected|Build API|child|Unknown Episode Section/,
        );
        assert.throws(
          () => episode.build.overrides({ params: { languages: ['pl'] } } as never, { languages: ['en', 'uk'] }),
          /Invalid Episode overrides/,
        );
      });

      test('Episode rejects Lesson-only authoring fields', () => {
        assert.throws(
          () =>
            defineEpisode<'invalid', typeof languages, {}>({
              id: id('0a'),
              slug: 'invalid',
              type: 'episode',
              params: { languages },
              locale: { title: 'Invalid' },
              children: [],
              skills: [],
            } as never).build.data({ languages: ['en'] }),
          /skills/,
        );
      });

      test('Episode respects selected publication languages, validates requested scope and remains stateless', () => {
        const episode = makeEpisode();
        const single = episode.build.data({ languages: ['uk'] });
        assert.deepEqual(single.base.params.languages, ['uk']);
        assert.deepEqual(Object.keys(single.locale ?? {}), ['uk']);
        assert.equal(single.locale?.en, undefined);
        const patched = episode.build.overrides({ locale: { title: { uk: 'Новий' } } }, { languages: ['uk'] });
        assert.deepEqual(patched.locale, { uk: { locale: { title: 'Новий' } } });
        assert.throws(
          () => episode.build.data({ languages: ['pl'] as never }),
          /does not support publication language/,
        );
        assert.throws(() => episode.build.data({ languages: [] }), /nonempty languages/);
        assert.throws(() => episode.build.data({ languages: ['uk', 'uk'] }), /unique/);
      });

      test('Course, Module and Chapter accept separately owned Episodes as direct children', () => {
        const episode = makeEpisode();
        const chapterEpisode = defineEpisode({
          id: id('08'),
          slug: 'chapterScene',
          type: 'episode',
          params: { languages },
          locale: { title: 'Chapter scene' },
          children: [],
        });
        const moduleEpisode = defineEpisode({
          id: id('09'),
          slug: 'moduleScene',
          type: 'episode',
          params: { languages },
          locale: { title: 'Module scene' },
          children: [],
        });
        const chapter = defineChapter<'chapter', { chapterScene: typeof chapterEpisode }, typeof languages>({
          id: id('05'),
          slug: 'chapter',
          type: 'chapter',
          params: {},
          locale: { title: 'Chapter' },
          children: ['chapterScene'], chapterScene: chapterEpisode,
        });
        const module = defineModule<
          'module',
          { chapter: typeof chapter; moduleScene: typeof moduleEpisode },
          typeof languages
        >({
          id: id('06'),
          slug: 'module',
          type: 'module',
          params: {},
          locale: { title: 'Module' },
          children: ['chapter', 'moduleScene'], chapter, moduleScene: moduleEpisode,
        });
        const course = defineCourse<'course', { module: typeof module; arrival: typeof episode }, typeof languages>({
          id: id('07'),
          slug: 'course',
          type: 'course',
          params: { languages, scenarioMode: 'story' },
          locale: { title: 'Story', description: 'A journey' },
          children: ['module', 'arrival'], module, arrival: episode,
        });
        const resource = course.build.data({ languages: ['en', 'uk'] });
        assert.equal(course.arrival, episode);
        assert.equal(chapter.chapterScene, chapterEpisode);
        assert.equal(module.moduleScene, moduleEpisode);
        assert.deepEqual(resource.base.children, ['module', 'arrival']);
        assert.equal(resource.base.arrival.type, 'episode');
        assert.ok(JSON.stringify(resource.locale?.uk).includes('Прибуття'));
        const override = course.build.overrides(
          {
            arrival: { locale: { title: { uk: 'Змінена сцена' } } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.ok(JSON.stringify(override.locale?.uk).includes('Змінена сцена'));
      });
    });
  });
});
