import { defineLessonData } from '@svitlo/engine/content';
import { howLightMoves_Data } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/howLightMoves.data';
import type { HowLightMoves_Languages } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/constants';

/** Playground-only structural copy: shares the existing approved section data and Scenes. */
export const lightExploration_Data = defineLessonData<HowLightMoves_Languages>()({
  ...howLightMoves_Data,
  id: 'b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2',
  slug: 'lightExploration',
  title: 'Light Lab · Exploration (demo)',
});
