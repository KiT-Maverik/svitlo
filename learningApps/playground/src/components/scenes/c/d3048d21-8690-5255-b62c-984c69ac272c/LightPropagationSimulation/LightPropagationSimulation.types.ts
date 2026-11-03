import type { ContentBlock_Scene } from '@svitlo/engine/content';

export type LightPropagationSimulation_Locale = {
  scene: {
    title: string;
    description: string;
    accessibleName: string;
  };
  track: {
    accessibleDescription: string;
    source: string;
    screen: string;
  };
  controls: {
    play: string;
    pause: string;
    speed: string;
    speedAccessibleName: string;
    speedUnit: string;
  };
  hints: {
    scale: string;
  };
};

export type LightPropagationSimulation_ContentBlock<ConfigType extends 'definition' | 'data' | 'response'> =
  ContentBlock_Scene<ConfigType, LightPropagationSimulation_Locale>;
