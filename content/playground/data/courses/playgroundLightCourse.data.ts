import { createChapter, createContentBlock, createEpisode, createLessonOverrides, createModule, createSection } from '@svitlo/engine/builders';
import type { Course } from '@svitlo/engine/content';
import { contentBlockGallery_Section } from './sections/contentBlockGallery.data';
import {
  howLightMoves_languages,
  type HowLightMoves_Languages,
} from '../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/constants';
import { howLightMoves_Data } from '../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/howLightMoves.data';
import { lightDiscovery_Data } from '../lessons/1/f760e7b7-9f77-5027-89ce-4e40d9d031a1/lightDiscovery.data';
import { lightExploration_Data } from '../lessons/2/b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2/lightExploration.data';

const episode = createEpisode<HowLightMoves_Languages>({
  type: 'episode',
  id: '9f417177-1d07-5a9d-ad74-0146c5637e84',
  iconKey: 'sparkles',
  title: {
    id: 'episode-title',
    slug: 'episodeTitle',
    type: 'text',
    value: 'The secret of light · Episode',
  },
  sections: [
    {
      id: '63a906a6-8360-50d0-b0a5-1d34ee242ccc',
      slug: 'story',
      type: 'scenario',
      title: 'A short adventure',
      navigationLabel: 'Story',
      content: [
        createContentBlock<HowLightMoves_Languages>()({
          id: 'episode-markdown',
          slug: 'storyCopy',
          type: 'markdown',
          locales:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        }).getData(),
      ],
    },
  ],
});

const storyInsideLesson = createSection<HowLightMoves_Languages>()({
  id: '5234f750-02c0-54fc-a02f-c9b76b2d680b',
  slug: 'storyBridge',
  type: 'scenario',
  title: 'A surprise in the laboratory',
  navigationLabel: 'Story bridge',
  content: [
    {
      id: 'bridge-markdown',
      slug: 'bridgeCopy',
      type: 'markdown',
      locales: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A small story between lesson sections.',
    },
  ],
}).getData();

const reorderedLesson = createLessonOverrides(howLightMoves_Data)
  .setParams({ sections: { allowSkipping: false } })
  .sections.setOrder(['practice', storyInsideLesson, 'theory', contentBlockGallery_Section, 'quiz'])
  .build();

const chapter = createChapter<HowLightMoves_Languages>({
  type: 'chapter',
  id: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
  iconKey: 'book-open',
  title: {
    id: 'chapter-title',
    slug: 'chapterTitle',
    type: 'text',
    value: 'Light: first steps',
  },
  content: [lightDiscovery_Data, episode, reorderedLesson],
});

const module = createModule<HowLightMoves_Languages>({
  type: 'module',
  id: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
  iconKey: 'layers',
  title: {
    id: 'module-title',
    slug: 'moduleTitle',
    type: 'text',
    value: 'The Light Laboratory',
  },
  content: [chapter, lightExploration_Data],
});

/** Course source is never imported into client/runtime bundles. */
export const playgroundLightCourse_Data = {
  type: 'course',
  id: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  parameters: { languages: howLightMoves_languages },
  title: {
    id: 'course-title',
    slug: 'courseTitle',
    type: 'text',
    value: 'Playground · Light Journey',
  },
  description: {
    id: 'course-description',
    slug: 'courseDescription',
    type: 'markdown',
    locales:
      'A demonstration Course with modules, a chapter, a Lorem Ipsum Episode and a course-local Lesson override.',
  },
  content: [module.getData()],
} satisfies Course<'data', HowLightMoves_Languages>;
