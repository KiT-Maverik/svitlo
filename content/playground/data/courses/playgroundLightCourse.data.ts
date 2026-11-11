import { defineChapter, defineCourse, defineModule } from '@svitlo/engine';
import { howLightMoves_languages } from '../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/constants';
import { lightDiscovery } from '../lessons/1/f760e7b7-9f77-5027-89ce-4e40d9d031a1/lightDiscovery.data';
import { lightExploration } from '../lessons/2/b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2/lightExploration.data';
import { lightStory } from '../lessons/4/9f417177-1d07-5a9d-ad74-0146c5637e84';
import { courseHowLightMoves } from '../lessons/b/fb3b328a-0dd6-55f1-9bb9-7c80ea1ac91b';

const lightFoundations = defineChapter({
  id: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
  slug: 'lightFoundations',
  type: 'chapter',
  params: { iconKey: 'book-open' },
  locale: { title: 'Light: first steps' },
  content: {
    items: { lightDiscovery, lightStory, courseHowLightMoves },
    order: ['lightDiscovery', 'lightStory', 'courseHowLightMoves'],
  },
});

const lightLaboratory = defineModule({
  id: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
  slug: 'lightLaboratory',
  type: 'module',
  params: { iconKey: 'layers' },
  locale: { title: 'The Light Laboratory' },
  content: {
    items: { lightFoundations, lightExploration },
    order: ['lightFoundations', 'lightExploration'],
  },
});

/** Authoring-time Course; future assembly resolves nested Lesson configurators. */
export const playgroundLightCourse = defineCourse({
  id: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  slug: 'playgroundLightJourney',
  type: 'course',
  params: { languages: howLightMoves_languages },
  locale: {
    title: 'Playground · Light Journey',
    description: 'A demonstration Course with Modules, a Chapter, a Course-owned story Lesson and a Course-specific Lesson composition.',
  },
  content: {
    items: { lightLaboratory },
    order: ['lightLaboratory'],
  },
});
