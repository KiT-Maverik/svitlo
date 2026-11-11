import { defineContentSection, defineLesson, defineMarkdown } from '@svitlo/engine';
import {
  howLightMoves,
  howLightMovesTitle,
} from '../../c/d3048d21-8690-5255-b62c-984c69ac272c';
import { contentBlockGallery } from '../../../courses/sections/contentBlockGallery.data';

const storyBridge = defineContentSection({
  id: '5234f750-02c0-54fc-a02f-c9b76b2d680b',
  slug: 'storyBridge',
  type: 'content',
  params: {},
  locale: {
    title: 'A surprise in the laboratory',
    navigationLabel: 'Story bridge',
  },
  content: {
    items: {
      bridgeCopy: defineMarkdown({
        id: '641f0eea-bd05-5db2-bcc4-14a153b7c7a1',
        slug: 'bridgeCopy',
        type: 'markdown',
        params: {},
        locale: {
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A small story between lesson sections.',
        },
      }),
    },
    order: ['bridgeCopy'],
  },
});

/**
 * Course-specific Lesson composition. Reuse universal content without
 * changing the original howLightMoves Lesson or introducing override factories.
 */
export const courseHowLightMoves = defineLesson({
  id: 'fb3b328a-0dd6-55f1-9bb9-7c80ea1ac91b',
  slug: 'courseHowLightMoves',
  type: 'lesson',
  programId: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  skills: howLightMoves.config.base.skills,
  params: {
    ...howLightMoves.config.base.params,
    sections: {
      ...howLightMoves.config.base.params.sections,
      allowSkipping: false,
    },
  },
  locale: { title: howLightMovesTitle },
  flashcards: howLightMoves.flashcards,
  questions: howLightMoves.questions,
  section: {
    items: {
      practice: howLightMoves.section.items.practice,
      storyBridge,
      content: howLightMoves.section.items.content,
      contentBlockGallery,
      quiz: howLightMoves.section.items.quiz,
    },
    order: ['practice', 'storyBridge', 'content', 'contentBlockGallery', 'quiz'],
  },
});
