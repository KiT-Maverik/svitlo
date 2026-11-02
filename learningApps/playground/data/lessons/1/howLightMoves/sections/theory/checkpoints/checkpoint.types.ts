import type { ContentBlock_Checkpoint } from '@svitlo/engine/content';

export type Checkpoint_ContentBlock<ConfigType extends 'definition' | 'data' | 'response'> =
  ContentBlock_Checkpoint<ConfigType>;

export const checkpoint = {
  type: 'checkpoint',
} satisfies Checkpoint_ContentBlock<'definition'>;
