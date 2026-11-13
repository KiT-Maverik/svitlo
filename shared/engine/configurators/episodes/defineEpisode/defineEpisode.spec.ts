import assert from 'node:assert/strict';
import test from 'node:test';

import { mergeForValidation } from '../../_shared__configurators';
import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineCourse } from '../../courses/defineCourse';
import { defineModule } from '../../courses/defineModule';
import { defineChapter } from '../../courses/defineChapter';
import { defineEpisode } from './defineEpisode';
import { episode_Props_Schema, episodeConfigurator_Schema } from './defineEpisode.schemas';

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
  content: { items: { line }, order: ['line'] },
});
const makeEpisode = () => defineEpisode({
  id: id('03'),
  slug: 'arrival',
  type: 'episode',
  params: { languages },
  locale: { title: { en: 'Arrival', uk: 'Прибуття' } },
  section: { items: { intro }, order: ['intro'] },
  events: { enter: { trigger: 'onStart' } },
});

test('Episode is an independent JSON-safe configurator with sparse locale and no Lesson pedagogy', () => {
  const episode = makeEpisode();
  const resource = episode.build.props({ languages: ['en', 'uk'] });
  assert.equal(episodeConfigurator_Schema.safeParse(episode).success, true);
  assert.equal(episode.type, 'episode');
  assert.equal(episode.section.items.intro, intro);
  assert.equal('skills' in episode.config.base, false);
  assert.equal('programId' in episode.config.base, false);
  assert.equal('flashcards' in resource.base, false);
  assert.equal('questions' in resource.base, false);
  assert.deepEqual(resource.base.events, { enter: { trigger: 'onStart' } });
  assert.deepEqual(resource.base.section.map(item => item.slug), ['intro']);
  assert.deepEqual(episode.config.locales(), { locale: { title: { en: 'Arrival', uk: 'Прибуття' } } });
  assert.equal(resource.locale?.uk?.locale?.title, 'Прибуття');
  assert.ok(JSON.stringify(resource.locale?.uk?.section).includes('Ви заходите до зали'));
  assert.equal(
    episode_Props_Schema.safeParse(mergeForValidation(resource.base, resource.locale?.uk ?? {})).success,
    true,
  );
  assert.doesNotThrow(() => JSON.stringify(resource));
});

test('Episode overrides metadata and Section children without modifying the canonical Episode', () => {
  const episode = makeEpisode();
  const original = episode.build.props({ languages: ['en', 'uk'] });
  const result = episode.build.overrides({
    locale: { title: { uk: 'Нове прибуття' } },
    section: {
      items: {
        intro: { content: { items: { line: { locale: { value: { uk: 'Відчиніть двері' } } } } } },
      },
    },
  }, { languages: ['en', 'uk'] });
  assert.deepEqual(result.base.section?.map(item => item.slug), ['intro']);
  assert.equal(result.locale?.uk?.locale?.title, 'Нове прибуття');
  assert.ok(JSON.stringify(result.locale?.uk?.section).includes('Відчиніть двері'));
  assert.ok(JSON.stringify(episode.build.props({ languages: ['en', 'uk'] })).includes('Ви заходите до зали'));
  assert.deepEqual(episode.build.props({ languages: ['en', 'uk'] }), original);

  const extra = defineContentSection<'extra', {}, typeof languages>({
    id: id('04'),
    slug: 'extra',
    type: 'content',
    params: {},
    locale: { title: 'Exit', navigationLabel: '2' },
    content: { items: {}, order: [] },
  });
  const reordered = episode.build.overrides({
    section: { items: { intro: false }, additionalItems: { extra }, order: ['extra'] },
  }, { languages: ['en', 'uk'] });
  assert.deepEqual(reordered.base.section?.map(item => item.slug), ['extra']);
  assert.deepEqual(episode.section.order, ['intro']);
  assert.throws(
    () => episode.build.overrides({ section: { items: { intro: false } } }, { languages: ['en', 'uk'] }),
    /order is required/,
  );
  assert.throws(
    () => episode.build.overrides({ section: { order: ['intro', 'intro'] } }, { languages: ['en', 'uk'] }),
    /Duplicate slug/,
  );
  assert.throws(
    () => episode.build.overrides({ section: { items: { missing: false } } } as never, { languages: ['en', 'uk'] }),
    /Unknown Episode Section/,
  );
  assert.throws(
    () => episode.build.overrides({ params: { languages: ['pl'] } } as never, { languages: ['en', 'uk'] }),
    /Invalid Episode overrides/,
  );
});

test('Episode respects selected publication languages, validates requested scope and remains stateless', () => {
  const episode = makeEpisode();
  const single = episode.build.props({ languages: ['uk'] });
  assert.deepEqual(single.base.params.languages, ['uk']);
  assert.deepEqual(Object.keys(single.locale ?? {}), ['uk']);
  assert.equal(single.locale?.en, undefined);
  const patched = episode.build.overrides({ locale: { title: { uk: 'Новий' } } }, { languages: ['uk'] });
  assert.deepEqual(patched.locale, { uk: { locale: { title: 'Новий' } } });
  assert.throws(() => episode.build.props({ languages: ['pl'] as never }), /does not support publication language/);
  assert.throws(() => episode.build.props({ languages: [] }), /nonempty languages/);
  assert.throws(() => episode.build.props({ languages: ['uk', 'uk'] }), /unique/);
});

test('Course, Module and Chapter accept separately owned Episodes as direct children', () => {
  const episode = makeEpisode();
  const chapterEpisode = defineEpisode({
    id: id('08'),
    slug: 'chapterScene',
    type: 'episode',
    params: { languages },
    locale: { title: 'Chapter scene' },
    section: { items: {}, order: [] },
  });
  const moduleEpisode = defineEpisode({
    id: id('09'),
    slug: 'moduleScene',
    type: 'episode',
    params: { languages },
    locale: { title: 'Module scene' },
    section: { items: {}, order: [] },
  });
  const chapter = defineChapter<'chapter', { chapterScene: typeof chapterEpisode }, typeof languages>({
    id: id('05'),
    slug: 'chapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    content: { items: { chapterScene: chapterEpisode }, order: ['chapterScene'] },
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
    content: { items: { chapter, moduleScene: moduleEpisode }, order: ['chapter', 'moduleScene'] },
  });
  const course = defineCourse<'course', typeof languages, { module: typeof module; arrival: typeof episode }>({
    id: id('07'),
    slug: 'course',
    type: 'course',
    params: { languages, scenarioMode: 'story' },
    locale: { title: 'Story', description: 'A journey' },
    content: { items: { module, arrival: episode }, order: ['module', 'arrival'] },
  });
  const resource = course.build.props({ languages: ['en', 'uk'] });
  assert.equal(course.content.items.arrival, episode);
  assert.equal(chapter.content.items.chapterScene, chapterEpisode);
  assert.equal(module.content.items.moduleScene, moduleEpisode);
  assert.equal(resource.base.content[1]?.type, 'episode');
  assert.ok(JSON.stringify(resource.locale?.uk).includes('Прибуття'));
  const override = course.build.overrides({
    content: { items: { arrival: { locale: { title: { uk: 'Змінена сцена' } } } } },
  }, { languages: ['en', 'uk'] });
  assert.ok(JSON.stringify(override.locale?.uk).includes('Змінена сцена'));
});
