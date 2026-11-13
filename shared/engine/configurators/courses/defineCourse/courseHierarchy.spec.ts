import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { defineChapter } from '../defineChapter';
import { defineModule } from '../defineModule';
import { defineCourse } from './defineCourse';
import { mergeForValidation } from '../../_shared__configurators';
import { course_Config_Schema, course_Props_Schema } from './defineCourse.schemas';

describe('Configurators', () => {
  describe('Courses', () => {
    describe('defineCourse', () => {
      const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
      const languages = ['en', 'uk'] as const;
      const chapterLanguages = ['en', 'uk', 'pl'] as const;

      /** Empty Chapter avoids coupling this Agent 3 suite to Agent 1's evolving Lesson API. */
      const chapter = defineChapter<'chapter', {}, typeof chapterLanguages>({
        id: id('c2'),
        type: 'chapter',
        slug: 'chapter',
        params: { iconKey: 'book' },
        locale: { title: { en: 'Chapter', uk: 'Розділ', pl: 'Rozdział' } },
        content: { items: {}, order: [] },
      });
      const chapterModule = defineModule<'module', { chapter: typeof chapter }, typeof languages>({
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
        content: { items: { module: chapterModule }, order: ['module'] },
      };
      const course = defineCourse<'course', typeof languages, { module: typeof chapterModule }>(courseInput);

      test('Course hierarchy retains literal slugs and publishes ordered plain Props', () => {
        assert.equal(course.slug, 'course');
        assert.equal(course.content.items.module, chapterModule);
        assert.equal(chapterModule.content.items.chapter, chapter);
        const resource = course.build.props({ languages: ['en', 'uk'] });
        assert.equal(resource.base.params.scenarioMode, 'story');
        assert.deepEqual(
          resource.base.content?.map(child => child!.slug),
          ['module'],
        );
        assert.deepEqual(
          resource.locale?.uk?.content?.map(child => child!.slug),
          ['module'],
        );
        assert.ok(JSON.stringify(resource.locale?.uk).includes('Розділ'));
        assert.equal('items' in resource.base.content[0]!, false);
        assert.equal(JSON.stringify(resource).includes('"order"'), false);
        assert.equal(JSON.stringify(resource).includes('"build"'), false);
        assert.deepEqual(course.config.locales(), { locale: { title: { en: 'Course', uk: 'Курс' } } });
        assert.equal(course_Config_Schema.safeParse(courseInput).success, true);
        assert.equal(
          course_Props_Schema.safeParse(
            mergeForValidation<Record<string, unknown>>(
              resource.base as Record<string, unknown>,
              (resource.locale?.uk ?? {}) as Record<string, unknown>,
            ),
          ).success,
          true,
        );
      });

      test('Course overrides preserve sparse metadata and replace nested ordered child Props atomically', () => {
        const scalar = course.build.overrides(
          { locale: { title: { uk: 'Оновлений курс' } } },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(scalar.base, {});
        assert.deepEqual(scalar.locale, { uk: { locale: { title: 'Оновлений курс' } } });

        const nested = course.build.overrides(
          {
            content: { items: { module: { locale: { title: 'Unit' } } } },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          nested.base.content?.map(child => child!.slug),
          ['module'],
        );
        assert.equal(nested.base.content?.[0]?.locale?.title, 'Unit');
        assert.equal(course.build.props({ languages: ['en', 'uk'] }).base.content[0]?.locale?.title, 'Module');

        const removed = course.build.overrides(
          { content: { items: { module: false }, order: [] } },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(removed.base.content, []);
        assert.equal(removed.locale, undefined, 'invariant deletion must not emit unnecessary locale files');

        assert.throws(
          () => course.build.overrides({ content: { items: { module: false } } }, { languages: ['en', 'uk'] }),
          /order is required/,
        );
        assert.throws(
          () => course.build.overrides({ content: { order: ['module', 'module'] } }, { languages: ['en', 'uk'] }),
          /Duplicate slug/,
        );
        assert.throws(
          () => course.build.overrides({ params: { languages: ['en'] } } as never, { languages: ['en', 'uk'] }),
          /Invalid Course overrides/,
        );
        assert.throws(
          () => course.build.overrides({ slug: 'newSlug' } as never, { languages: ['en', 'uk'] }),
          /Invalid Course overrides/,
        );
      });

      test('Course supports typed additional Chapters without mutating its original Module', () => {
        const extra = defineChapter<'extra', {}, typeof languages>({
          id: id('c5'),
          slug: 'extra',
          type: 'chapter',
          params: {},
          locale: { title: { en: 'Extra', uk: 'Додатковий' } },
          content: { items: {}, order: [] },
        });
        const patch = course.build.overrides(
          {
            content: { additionalItems: { extra }, order: ['extra', 'module'] },
          },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(
          patch.base.content?.map(child => child!.slug),
          ['extra', 'module'],
        );
        assert.deepEqual(
          patch.locale?.uk?.content?.map(child => child!.slug),
          ['extra', 'module'],
        );
        assert.deepEqual(
          course.build.props({ languages: ['en', 'uk'] }).base.content.map(child => child!.slug),
          ['module'],
        );
        assert.throws(
          () =>
            course.build.overrides(
              { content: { additionalItems: { module: extra } as never, order: ['module'] } },
              { languages: ['en', 'uk'] },
            ),
          /Duplicate|does not match/,
        );
      });

      test('Independent Course Build calls do not mutate original children or authored input', () => {
        const first = course.build.props({ languages: ['en', 'uk'] });
        first.base.content[0]!.slug = 'mutated';
        assert.equal(course.build.props({ languages: ['en', 'uk'] }).base.content[0]?.slug, 'module');
        const patch = course.build.overrides({ locale: { title: 'Replacement' } }, { languages: ['en', 'uk'] });
        assert.equal(patch.base.locale?.title, 'Replacement');
        assert.equal(course.build.props({ languages: ['en', 'uk'] }).locale?.uk?.locale?.title, 'Курс');

        const authoredContent = course.content;
        authoredContent.order.push('module');
        assert.throws(() => course.validate({ ...courseInput, content: authoredContent } as never), /Duplicate slug/);
        assert.deepEqual(
          course.build.props({ languages: ['en', 'uk'] }).base.content.map(child => child!.slug),
          ['module'],
        );
        assert.deepEqual(courseInput.content.order, ['module']);
      });

      test('Course, Module and Chapter reject wrong child types and duplicate slugs', () => {
        assert.throws(
          () => defineCourse({ ...courseInput, content: { items: { wrongKey: chapterModule }, order: ['wrongKey'] } }),
          /does not match configurator slug/,
        );
        assert.throws(
          () =>
            defineModule({
              id: id('c6'),
              slug: 'invalid',
              type: 'module',
              params: {},
              locale: { title: 'Invalid' },
              content: { items: { module: chapterModule }, order: ['module'] },
            } as never),
          /Unsupported Module child type/,
        );
        assert.throws(
          () =>
            defineChapter({
              id: id('c7'),
              slug: 'invalid',
              type: 'chapter',
              params: {},
              locale: { title: 'Invalid' },
              content: { items: { chapter }, order: ['chapter'] },
            } as never),
          /Unsupported Chapter child type/,
        );
        assert.throws(
          () => defineCourse({ ...courseInput, params: { languages: ['en', 'en'] as unknown as typeof languages } }),
          /unique/,
        );
        const duplicate = defineChapter<'copy', {}, typeof languages>({
          id: id('c3'),
          slug: 'copy',
          type: 'chapter',
          params: {},
          locale: { title: 'Duplicate ID' },
          content: { items: {}, order: [] },
        });
        assert.throws(
          () =>
            defineCourse({
              ...courseInput,
              content: { items: { module: chapterModule, copy: duplicate }, order: ['module', 'copy'] },
            }),
          /duplicate Course child ID/,
        );
      });

      test('Course scope excludes extra Chapter translations and propagates selected languages', () => {
        const standalone = chapter.build.props({ languages: ['pl'] });
        assert.deepEqual(Object.keys(standalone.locale ?? {}), ['pl']);
        assert.equal(standalone.locale?.pl?.locale?.title, 'Rozdział');

        const resource = course.build.props({ languages: ['uk'] });
        assert.deepEqual(Object.keys(resource.locale ?? {}), ['uk']);
        assert.deepEqual(resource.base.params.languages, ['uk'], 'frontend must not advertise unpublished locales');
        assert.equal(JSON.stringify(resource).includes('Rozdział'), false);
        assert.equal(JSON.stringify(resource).includes('"pl"'), false);
        assert.ok(JSON.stringify(resource.locale?.uk).includes('Розділ'));

        const override = course.build.overrides(
          {
            content: { items: { module: { locale: { title: { uk: 'Розділ модуля', en: 'Hidden' } } } } },
          },
          { languages: ['uk'] },
        );
        assert.deepEqual(Object.keys(override.locale ?? {}), ['uk']);
        assert.equal(JSON.stringify(override).includes('Hidden'), false);

        assert.throws(
          () => course.build.props({ languages: ['pl'] } as never),
          /does not support publication language/,
        );
        assert.throws(() => course.build.props({ languages: [] }), /nonempty languages/);
      });
    });
  });
});
