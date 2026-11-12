import assert from 'node:assert/strict';
import test from 'node:test';

import type { LanguageScope } from '#types';
import { defineLesson } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineModule } from '../defineModule';
import { defineCourse } from './defineCourse';
import { course_Config_Schema } from './defineCourse.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const languages = ['en', 'uk'] as const;

/** Integration fixture: Agent 1 supplies this Lesson Build API in the shared integration branch. */
const author = defineLesson({
  id: id('c1'),
  slug: 'lesson',
  type: 'lesson',
  skills: [],
  params: {
    languages,
    requireQuiz: false,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  locale: { title: { en: 'Lesson', uk: 'Урок' } },
  section: { items: {}, order: [] },
  flashcards: [],
});
const lesson = Object.assign({}, author, {
  build: {
    props: () => ({
      base: {
        id: id('c1'),
        slug: 'lesson',
        type: 'lesson' as const,
        skills: [],
        params: {
          languages,
          requireQuiz: false,
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        section: { items: {}, order: [] },
        flashcards: [],
      },
      locale: {
        en: { locale: { title: 'Lesson' } },
        uk: { locale: { title: 'Урок' } },
      },
    }),
    overrides: (patch: { locale?: { title?: string | { en?: string; uk?: string } } }) => {
      const title = patch.locale?.title;
      return {
        base: typeof title === 'string' ? { locale: { title } } : {},
        locale: typeof title === 'object'
          ? Object.fromEntries(Object.entries(title).map(([language, value]) => [language, { locale: { title: value } }]))
          : undefined,
      };
    },
  },
}) as typeof author & LanguageScope<typeof languages> & {
  build: {
    props: () => {
      base: { id: string; slug: string; type: 'lesson'; skills: never[]; params: typeof author.config.base.params; section: { items: {}; order: string[] }; flashcards: never[] };
      locale: { en: { locale: { title: string } }; uk: { locale: { title: string } } };
    };
    overrides: (patch: { locale?: { title?: string | { en?: string; uk?: string } } }) => {
      base: { locale?: { title: string } };
      locale: Record<string, { locale: { title: string } }> | undefined;
    };
  };
};

const chapter = defineChapter<'chapter', { lesson: typeof lesson }, typeof languages>({
  id: id('c2'),
  type: 'chapter',
  slug: 'chapter',
  params: { iconKey: 'book' },
  locale: { title: { en: 'Chapter', uk: 'Розділ' } },
  content: { items: { lesson }, order: ['lesson'] },
});
const module = defineModule<'module', { chapter: typeof chapter }, typeof languages>({
  id: id('c3'),
  type: 'module',
  slug: 'module',
  params: {},
  locale: { title: 'Module' },
  content: { items: { chapter }, order: ['chapter'] },
});
const courseInput = {
  id: id('c4'),
  type: 'course' as const,
  slug: 'course' as const,
  params: { languages, scenarioMode: 'story' as const },
  locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Course introduction' },
  content: { items: { module }, order: ['module'] },
};
const course = defineCourse<'course', typeof languages, { module: typeof module }>(courseInput);

test('Course hierarchy retains literal slugs and publishes ordered plain Props', () => {
  assert.equal(course.slug, 'course');
  assert.equal(course.content.items.module, module);
  assert.equal(module.content.items.chapter, chapter);
  assert.equal(chapter.content.items.lesson, lesson);
  const resource = course.build.props();
  assert.equal(resource.base.params.scenarioMode, 'story');
  assert.deepEqual(resource.base.content?.map(child => child.slug), ['module']);
  assert.deepEqual(resource.locale?.uk?.content?.map(child => child.slug), ['module']);
  assert.deepEqual(resource.locale?.uk?.content?.[0]?.content?.[0]?.content?.[0]?.locale?.title, 'Урок');
  assert.equal('items' in resource.base.content[0], false);
  assert.equal(JSON.stringify(resource).includes('"order"'), false);
  assert.equal(JSON.stringify(resource).includes('"build"'), false);
  assert.deepEqual(course.config.locales(), { locale: { title: { en: 'Course', uk: 'Курс' } } });
  assert.equal(course_Config_Schema.safeParse(courseInput).success, true);
});

test('Course overrides preserve sparse metadata and replace nested ordered child Props atomically', () => {
  const scalar = course.build.overrides({ locale: { title: { uk: 'Оновлений курс' } } });
  assert.deepEqual(scalar.base, {});
  assert.deepEqual(scalar.locale, { uk: { locale: { title: 'Оновлений курс' } } });

  const nested = course.build.overrides({
    content: { items: { module: { locale: { title: 'Unit' } } } },
  });
  assert.deepEqual(nested.base.content?.map(child => child.slug), ['module']);
  assert.equal(nested.base.content?.[0]?.locale?.title, 'Unit');
  assert.equal(course.build.props().base.content[0]?.locale?.title, 'Module');

  assert.throws(() => course.build.overrides({ content: { items: { module: false } } }), /order is required/);
  assert.throws(() => course.build.overrides({ content: { order: ['module', 'module'] } }), /Duplicate slug/);
  assert.throws(() => course.build.overrides({ params: { languages: ['en'] } } as never), /Invalid Course overrides/);
  assert.throws(() => course.build.overrides({ slug: 'newSlug' } as never), /Invalid Course overrides/);
});

test('Independent Course Build calls do not mutate original children or authored input', () => {
  const first = course.build.props();
  first.base.content[0]!.slug = 'mutated';
  assert.equal(course.build.props().base.content[0]?.slug, 'module');
  const patch = course.build.overrides({ locale: { title: 'Replacement' } });
  assert.equal(patch.base.locale?.title, 'Replacement');
  assert.equal(course.build.props().locale?.uk?.locale?.title, 'Курс');

  const authoredContent = course.content;
  authoredContent.order.push('module');
  assert.throws(() => course.validate({ ...courseInput, content: authoredContent }), /Duplicate slug/);
  assert.deepEqual(course.build.props().base.content.map(child => child.slug), ['module']);
  assert.deepEqual(courseInput.content.order, ['module']);
});

test('Course, Module and Chapter reject wrong child types and duplicate slugs', () => {
  assert.throws(
    () => defineCourse({ ...courseInput, content: { items: { wrongKey: module }, order: ['wrongKey'] } }),
    /does not match configurator slug/,
  );
  assert.throws(
    () => defineModule({ id: id('c5'), slug: 'invalid', type: 'module', params: {}, locale: { title: 'Invalid' }, content: { items: { module }, order: ['module'] } } as never),
    /Unsupported Module child type/,
  );
  assert.throws(
    () => defineChapter({ id: id('c6'), slug: 'invalid', type: 'chapter', params: {}, locale: { title: 'Invalid' }, content: { items: { chapter }, order: ['chapter'] } } as never),
    /Unsupported Chapter child type/,
  );
  assert.throws(
    () => defineCourse({ ...courseInput, params: { languages: ['en', 'en'] as unknown as typeof languages } }),
    /unique/,
  );
});
