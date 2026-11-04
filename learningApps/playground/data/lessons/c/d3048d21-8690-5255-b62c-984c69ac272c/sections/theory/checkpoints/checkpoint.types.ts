import type { HowLightMoves_Languages } from '../../../constants';
import type { ContentBlock_Checkpoint } from '@svitlo/engine/content';

export type Checkpoint_ContentBlock<ConfigType extends 'definition' | 'data' | 'response'> =
  ContentBlock_Checkpoint<ConfigType, HowLightMoves_Languages>;

export const checkpoint = {
  type: 'checkpoint',
} satisfies Checkpoint_ContentBlock<'definition'>;
