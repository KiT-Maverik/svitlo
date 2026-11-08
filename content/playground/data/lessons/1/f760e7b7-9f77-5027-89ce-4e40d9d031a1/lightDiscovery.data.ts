import { createLesson } from '@svitlo/engine';
import { howLightMoves_Data } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c';
import type { HowLightMoves_Languages } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/constants';

/** Playground-only structural copy: shares the existing approved section data and Scenes. */
export const lightDiscovery_Creator = createLesson<HowLightMoves_Languages>()({
  ...howLightMoves_Data,
  id: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
  slug: 'lightDiscovery',
  title: 'Light Lab · Discovery (demo)',
});

export const lightDiscovery_Data = lightDiscovery_Creator.getData();
