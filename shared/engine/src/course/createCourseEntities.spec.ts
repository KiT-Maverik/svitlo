import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Course_TocContext, Episode, Lesson, Locale_Languages } from '@svitlo/contracts/content';
import { createChapter, createEpisode, createModule } from './createCourseEntities';

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
const context: Course_TocContext<typeof languages> = { language: 'uk' };

describe('Course entity creators', () => {
  it('creates typed hierarchical TOC and serializable authoring resource data', () => {
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
      content: [chapter, two, episode],
    });

    const toc = module.toToc(context);
    assert.equal(toc.type, 'module');
    assert.equal(toc.title, 'Подорож');
    assert.equal(toc.iconKey, 'folder');
    assert.deepEqual(
      toc.children.map(item => item.type),
      ['chapter', 'lesson', 'episode'],
    );
    assert.equal(toc.children[0].type, 'chapter');
    if (toc.children[0].type === 'chapter') {
      assert.deepEqual(
        toc.children[0].children.map(item => item.type),
        ['lesson', 'episode'],
      );
    }
    assert.equal(episode.toToc(context).iconKey, 'clapperboard');

    const output = module.toResource(context);
    assert.deepEqual(output.toc, toc);
    const firstChild = output.data.content[0];
    assert.equal(typeof firstChild === 'string' ? firstChild : firstChild.type, 'chapter');
    assert.equal(JSON.stringify(output).includes('getData'), false);
    assert.deepEqual(chapter.getPublicationItems().lessons.map(item => item.id), ['lesson-1']);
    assert.deepEqual(module.getPublicationItems().lessons.map(item => item.id), ['lesson-1', 'lesson-2']);
    assert.deepEqual(module.getPublicationItems().groups.map(item => item.type), ['chapter']);
  });

  it('preserves references and validates requested locale', () => {
    const chapter = createChapter<typeof languages>({
      type: 'chapter',
      id: 'c',
      title,
      content: [one],
    });
    assert.deepEqual(chapter.getData().content, [one]);
    assert.throws(
      () =>
        chapter.toToc({
          ...context,
          language: 'de' as (typeof languages)[number],
        }),
      /Missing title/,
    );
  });
});
