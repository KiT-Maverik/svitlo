import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createLessonPage } from '../dist/lesson.js';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';

test('Lesson page metadata reads the canonical Engine Props locale title', async () => {
  const lesson = {
    id,
    slug: 'sampleLesson',
    type: 'lesson',
    skills: [],
    params: {
      requireQuiz: false,
      languages: ['en'],
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: 'Localized published lesson' },
    section: [],
    flashcards: [],
  };
  assert.equal(Object.hasOwn(lesson, 'title'), false);

  const page = createLessonPage({
    loadLesson: async (requestedId, language) => {
      assert.equal(requestedId, id);
      assert.equal(language, 'en');
      return lesson;
    },
    loadMessages: async () => ({}),
    renderLesson: () => {
      throw new Error('Metadata loading must not invoke the client Lesson renderer');
    },
  });
  const metadata = await page.generateMetadata({
    params: Promise.resolve({ language: 'en', lessonLanguage: 'en', lessonId: id }),
  });

  assert.deepEqual(metadata, {
    title: 'Localized published lesson',
    description: 'Localized published lesson',
  });
});
