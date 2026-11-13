import { defineContentSection, defineLesson, defineMarkdown } from '@svitlo/engine';
import { howLightMoves_languages } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/constants';

const story = defineContentSection({
  id: '63a906a6-8360-50d0-b0a5-1d34ee242ccc',
  slug: 'story',
  type: 'content',
  params: {},
  locale: {
    title: 'A short adventure',
    navigationLabel: 'Story',
  },
  content: {
    items: {
      storyCopy: defineMarkdown({
        id: '29487190-d13e-5f8f-8a41-c22e37d2e0b2',
        slug: 'storyCopy',
        type: 'markdown',
        params: {},
        locale: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      }),
    },
    order: ['storyCopy'],
  },
});

/** Narrative content is a Course-owned Lesson, not an Episode. */
export const lightStory = defineLesson({
  id: '9f417177-1d07-5a9d-ad74-0146c5637e84',
  slug: 'lightStory',
  type: 'lesson',
  skills: [],
  params: {
    requireQuiz: false,
    languages: howLightMoves_languages,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: false,
    },
  },
  locale: { title: 'The secret of light · Story' },
  flashcards: { items: {}, order: [] },
  section: { items: { story }, order: ['story'] },
});
