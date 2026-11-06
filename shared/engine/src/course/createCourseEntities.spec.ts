import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Course_TocContext, Episode, Locale_Languages } from '@svitlo/contracts/content';
import { createChapter, createEpisode, createModule } from './createCourseEntities';

const languages = ['en', 'uk'] as const;
const title = {
  id: 'nav-title', slug: 'title', type: 'text' as const,
  value: { en: 'Journey', uk: 'Подорож' },
};
const episodeData = {
  type: 'episode' as const,
  id: 'episode-1',
  title,
  iconKey: 'clapperboard',
  sections: [{
    id: 'scenario-1',
    slug: 'scenario',
    type: 'scenario' as const,
    title: { en: 'Story', uk: 'Історія' },
    navigationLabel: { en: 'Story', uk: 'Історія' },
    content: [],
  }],
} satisfies Episode<'data', typeof languages>;
const context: Course_TocContext<typeof languages> = {
  language: 'uk',
  resolveLesson(id) {
    return { type: 'lesson', id, title: `Урок ${id}`, iconKey: 'book' };
  },
};

describe('Course entity creators', () => {
  it('creates typed hierarchical TOC and serializable authoring resource data', () => {
    const episode = createEpisode(episodeData);
    const chapter = createChapter<typeof languages>({
      type: 'chapter', id: 'chapter-1', iconKey: 'bookmark', title,
      content: ['lesson-1', episode],
    });
    const module = createModule<typeof languages>({
      type: 'module', id: 'module-1', iconKey: 'folder', title,
      content: [chapter, 'lesson-2', episode],
    });

    const toc = module.toToc(context);
    assert.equal(toc.type, 'module');
    assert.equal(toc.title, 'Подорож');
    assert.equal(toc.iconKey, 'folder');
    assert.deepEqual(toc.children.map(item => item.type), ['chapter', 'lesson', 'episode']);
    assert.equal(toc.children[0].type, 'chapter');
    if (toc.children[0].type === 'chapter') {
      assert.deepEqual(toc.children[0].children.map(item => item.type), ['lesson', 'episode']);
    }
    assert.equal(episode.toToc(context).iconKey, 'clapperboard');

    const output = module.toResource(context);
    assert.deepEqual(output.toc, toc);
    assert.equal(output.data.content[0].type, 'chapter');
    assert.equal(JSON.stringify(output).includes('getData'), false);
    assert.deepEqual(chapter.getData().content.map(item => typeof item === 'string' ? item : item.type), [
      'lesson-1', 'episode',
    ]);
  });

  it('preserves references and validates requested locale', () => {
    const chapter = createChapter<typeof languages>({
      type: 'chapter', id: 'c', title,
      content: ['lesson-1'],
    });
    assert.deepEqual(chapter.getData().content, ['lesson-1']);
    assert.throws(() => chapter.toToc({
      ...context, language: 'de' as typeof languages[number],
    }), /Missing title/);
  });
});
