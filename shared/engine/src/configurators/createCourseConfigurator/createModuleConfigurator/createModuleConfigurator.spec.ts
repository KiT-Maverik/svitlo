import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Episode, Lesson } from '@svitlo/contracts/content';
import { createChapter, createEpisode, createModule } from './createModuleConfigurator';
import { createCourse } from './createCourseConfigurator';
import { mergeLessonResources } from '../lessons/mergeLessonResources';

const languages = ['en', 'uk'] as const;
const title = {
  id: 'nav-title',
  slug: 'title',
  type: 'text' as const,
  value: { en: 'Journey', uk: 'Подорож' },
};
const episodeData = {
  type: 'episode' as const,
  id: 'episode-1',
  title,
  iconKey: 'clapperboard',
  sections: [
    {
      id: 'scenario-1',
      slug: 'scenario',
      type: 'scenario' as const,
      title: { en: 'Story', uk: 'Історія' },
      navigationLabel: { en: 'Story', uk: 'Історія' },
      content: [],
    },
  ],
} satisfies Episode<'data', typeof languages>;
const lesson = (id: string): Lesson<'data', typeof languages> => ({
  id,
  slug: 'sample',
  title: { en: 'Lesson ' + id, uk: 'Урок ' + id },
  skills: [],
  parameters: {
    requireQuiz: false,
    languages,
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  questions: {},
  flashcards: [],
  sections: [],
});
const one = lesson('lesson-1');
const two = lesson('lesson-2');

describe('Course entity creators', () => {
  it('builds localized TOC solely at the Course level from typed nested entities', () => {
    const episode = createEpisode<typeof languages>(episodeData);
    const chapter = createChapter<typeof languages>({
      type: 'chapter',
      id: 'chapter-1',
      iconKey: 'bookmark',
      title,
      content: [one, episode],
    });
    const module = createModule<typeof languages>({
      type: 'module',
      id: 'module-1',
      iconKey: 'folder',
      title,
      content: [chapter, two],
    });
    const course = createCourse<typeof languages>({
      type: 'course',
      id: 'course-1',
      title,
      description: { id: 'description', slug: 'description', type: 'markdown', locales: 'Invariant description' },
      parameters: { languages },
      content: [module],
    });
    const toc = course.toToc({ language: 'uk' });
    assert.equal(toc.type, 'course');
    assert.equal(toc.title, 'Подорож');
    assert.equal(toc.children[0].type, 'module');
    if (toc.children[0].type === 'module') {
      assert.equal(toc.children[0].title, 'Подорож');
      assert.equal(toc.children[0].iconKey, 'folder');
      assert.deepEqual(
        toc.children[0].children.map(item => item.type),
        ['chapter', 'lesson'],
      );
      const first = toc.children[0].children[0];
      if (first.type === 'chapter') {
        assert.equal(first.iconKey, 'bookmark');
        assert.deepEqual(
          first.children.map(item => item.type),
          ['lesson', 'episode'],
        );
      }
    }
    const data = course.getData();
    assert.equal('type' in data.content[0] ? data.content[0].type : 'lesson', 'module');
    assert.equal(JSON.stringify(data).includes('getData'), false);
    assert.deepEqual(
      chapter.getContentEntries().lessons.map(item => item.id),
      ['lesson-1'],
    );
    assert.deepEqual(
      module.getContentEntries().lessons.map(item => item.id),
      ['lesson-1', 'lesson-2'],
    );
    assert.deepEqual(
      module.getContentEntries().groups.map(item => item.type),
      ['chapter'],
    );

    const base = course.getBase();
    const locale = course.getLocale('uk');
    assert.equal((base.toc as { type: string }).type, 'course');
    assert.equal((base.toc as { title?: string }).title, undefined);
    assert.equal(JSON.stringify(locale.toc).includes('course-1'), false);
    assert.deepEqual(mergeLessonResources(base.toc, locale.toc), toc);
    assert.deepEqual(mergeLessonResources(base.episodes['episode-1'], locale.episodes['episode-1']), episodeData);
  });

  it('keeps invariant navigation strings in base and rejects unsupported locales', () => {
    const course = createCourse<typeof languages>({
      type: 'course',
      id: 'course-1',
      title: { ...title, value: 'Invariant title' },
      description: { id: 'description', slug: 'description', type: 'markdown', locales: 'Invariant description' },
      parameters: { languages },
      content: [createChapter<typeof languages>({ type: 'chapter', id: 'c', title, content: [one] })],
    });
    assert.equal((course.getBase().toc as { title: string }).title, 'Invariant title');
    assert.deepEqual(course.getLocale('uk').toc, {
      children: { '0': { title: 'Подорож', children: { '0': { title: 'Урок lesson-1' } } } },
    });
    assert.throws(() => course.getLocale('de' as (typeof languages)[number]), /Unsupported Course language/);
    assert.throws(() => course.toToc({ language: 'de' as (typeof languages)[number] }), /Unsupported Course language/);
  });
});
