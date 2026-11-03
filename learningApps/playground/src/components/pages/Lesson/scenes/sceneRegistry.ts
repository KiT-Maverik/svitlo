'use client';

import type { SceneRegistry } from '@svitlo/ui-kit/widgets';
import { LightPropagationSimulation } from '@/components/scenes/c/d3048d21-8690-5255-b62c-984c69ac272c/LightPropagationSimulation/LightPropagationSimulation';
import { LightRayDiagram } from '@/components/scenes/c/d3048d21-8690-5255-b62c-984c69ac272c/LightRayDiagram/LightRayDiagram';
import { Showcase } from '@/components/scenes/c/d3048d21-8690-5255-b62c-984c69ac272c/Showcase/Showcase';

export const howLightMovesSceneRegistry: SceneRegistry = {
  'how-light-moves-scene-propagation': LightPropagationSimulation,
  'how-light-moves-scene-ray': LightRayDiagram,
  'how-light-moves-scene-showcase': Showcase,
};
