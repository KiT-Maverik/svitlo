import type { ContentBlock_Scene } from '@svitlo/engine/content';

export type LightRayDiagram_Locale = {
  scene: {
    title: string;
    description: string;
  };
  labels: {
    source: string;
    direction: string;
    screen: string;
  };
};

export type LightRayDiagram_ContentBlock<ConfigType extends 'definition' | 'data' | 'response'> =
  ContentBlock_Scene<ConfigType, LightRayDiagram_Locale>;
