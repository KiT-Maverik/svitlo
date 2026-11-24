import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assembleCourseTree, courseActivities, findCourseEpisode } from './assembleCourseTree';

const id = (n: number) => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const episode = (n: number, slug: string) => ({
  id: id(n),
  slug,
  type: 'episode',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Episode' },
  section: [
    {
      id: id(n + 100),
      slug: 'intro',
      type: 'content',
      params: {},
      locale: { title: 'Intro', navigationLabel: 'Intro' },
      content: [{ id: id(n + 200), slug: 'text', type: 'text', params: {}, locale: { value: 'Hello' } }],
    },
  ],
});
const collection = (items: Record<string, unknown>, order: string[]) => ({ items, order });
const lesson = { id: id(30), type: 'lesson' };
const base = {
  id: id(1),
  type: 'course',
  params: { languages: ['en', 'uk'] },
  locale: { title: 'Course' },
  content: collection(
    {
      start: episode(2, 'start'),
      module: {
        id: id(3),
        type: 'module',
        locale: { title: 'Module' },
        content: collection(
          {
            middle: episode(4, 'middle'),
            nested: {
              id: id(5),
              type: 'chapter',
              locale: { title: 'Nested' },
              content: collection(
                {
                  story: episode(6, 'story'),
                  lesson,
                },
                ['story', 'lesson'],
              ),
            },
          },
          ['middle', 'nested'],
        ),
      },
      chapter: {
        id: id(7),
        type: 'chapter',
        locale: { title: 'Chapter' },
        content: collection({ end: episode(8, 'end') }, ['end']),
      },
      repeat: { ...lesson, overrides: { locale: { title: 'Context' } } },
    },
    ['start', 'module', 'chapter', 'repeat'],
  ),
};
test('localized atomic Sections and four-level mixed order preserve repeated Lesson placements', () => {
  const translated = episode(2, 'start');
  translated.locale.title = 'Оповідь';
  translated.section[0].content[0].locale.value = 'Привіт';
  const course = assembleCourseTree(
    base,
    { content: { items: { start: { locale: translated.locale, section: translated.section } } } },
    id(1),
    'uk',
  );
  assert.deepEqual(
    courseActivities(course).map(item => item.placement),
    ['start', 'module/middle', 'module/nested/story', 'module/nested/lesson', 'chapter/end', 'repeat'],
  );
  assert.equal(findCourseEpisode(course, id(2))?.locale.title, 'Оповідь');
  assert.equal(findCourseEpisode(course, id(30)), undefined);
  assert.equal(
    base.content.items.start && (base.content.items.start as ReturnType<typeof episode>).locale.title,
    'Episode',
  );
});
test('refuses unsupported events, invalid locale block and changed membership', () => {
  for (const start of [
    { events: { story: { branch: 'x' } } },
    { section: [] },
    { id: id(99) },
    {
      section: [
        { ...episode(2, 'start').section[0], content: [{ id: id(202), slug: 'text', type: 'text', params: {} }] },
      ],
    },
  ]) {
    assert.throws(() => assembleCourseTree(base, { content: { items: { start } } }, id(1), 'uk'));
  }
  assert.throws(() => assembleCourseTree(base, { content: { order: ['start'] } }, id(1), 'uk'));
});
