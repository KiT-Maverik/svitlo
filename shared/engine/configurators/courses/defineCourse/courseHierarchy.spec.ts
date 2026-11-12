import assert from 'node:assert/strict';
import test from 'node:test';

import { defineChapter } from '../defineChapter';
import { defineModule } from '../defineModule';
import { defineCourse } from './defineCourse';
import { course_Config_Schema } from './defineCourse.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const languages = ['en', 'uk'] as const;

/** Empty Chapter avoids coupling this Agent 3 suite to Agent 1's evolving Lesson API. */
const chapter = defineChapter<'chapter', {}, typeof languages>({
  id: id('c2'),
  type: 'chapter',
  slug: 'chapter',
  params: { iconKey: 'book' },
  locale: { title: { en: 'Chapter', uk: 'Розділ' } },
  content: { items: {}, order: [] },
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
  const resource = course.build.props();
  assert.equal(resource.base.params.scenarioMode, 'story');
  assert.deepEqual(resource.base.content?.map(child => child.slug), ['module']);
  assert.deepEqual(resource.locale?.uk?.content?.map(child => child.slug), ['module']);
  assert.ok(JSON.stringify(resource.locale?.uk).includes('Розділ'));
  assert.equal('items' in resource.base.content[0]!, false);
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

  const removed = course.build.overrides({ content: { items: { module: false }, order: [] } });
  assert.deepEqual(removed.base.content, []);
  assert.deepEqual(removed.locale?.uk?.content, []);

  assert.throws(() => course.build.overrides({ content: { items: { module: false } } }), /order is required/);
  assert.throws(() => course.build.overrides({ content: { order: ['module', 'module'] } }), /Duplicate slug/);
  assert.throws(() => course.build.overrides({ params: { languages: ['en'] } } as never), /Invalid Course overrides/);
  assert.throws(() => course.build.overrides({ slug: 'newSlug' } as never), /Invalid Course overrides/);
});

test('Course supports typed additional Chapters without mutating its original Module', () => {
  const extra = defineChapter<'extra', {}, typeof languages>({
    id: id('c5'), slug: 'extra', type: 'chapter', params: {},
    locale: { title: { en: 'Extra', uk: 'Додатковий' } },
    content: { items: {}, order: [] },
  });
  const patch = course.build.overrides({
    content: { additionalItems: { extra }, order: ['extra', 'module'] },
  });
  assert.deepEqual(patch.base.content?.map(child => child.slug), ['extra', 'module']);
  assert.deepEqual(patch.locale?.uk?.content?.map(child => child.slug), ['extra', 'module']);
  assert.deepEqual(course.build.props().base.content.map(child => child.slug), ['module']);
  assert.throws(
    () => course.build.overrides({ content: { additionalItems: { module: extra } as never, order: ['module'] } }),
    /Duplicate|does not match/,
  );
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
    () => defineModule({ id: id('c6'), slug: 'invalid', type: 'module', params: {}, locale: { title: 'Invalid' }, content: { items: { module }, order: ['module'] } } as never),
    /Unsupported Module child type/,
  );
  assert.throws(
    () => defineChapter({ id: id('c7'), slug: 'invalid', type: 'chapter', params: {}, locale: { title: 'Invalid' }, content: { items: { chapter }, order: ['chapter'] } } as never),
    /Unsupported Chapter child type/,
  );
  assert.throws(
    () => defineCourse({ ...courseInput, params: { languages: ['en', 'en'] as unknown as typeof languages } }),
    /unique/,
  );
});
