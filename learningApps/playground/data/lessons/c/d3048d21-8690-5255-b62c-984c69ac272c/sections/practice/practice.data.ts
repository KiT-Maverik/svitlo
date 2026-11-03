import { defineContentBlockCatalog, type ContentBlock_Catalog_DataFor, type Section } from '@svitlo/engine/content';
import type { practiceDefinition } from './practice.definition';
import { practice } from './practice';
import { showcaseData } from './scenes/showcase';

export const practiceData = {
  id: '562f4c02-6ea0-55f0-900d-7d90e60bc314',
  type: 'practice' as const,
  slug: 'practice' as const,
  title: practice.name,
  navigationLabel: practice.name,
  skippable: true,
  order: [{ type: 'text', key: 'task' }, { type: 'scene', key: 'showcase' }],
  content: defineContentBlockCatalog({
    scene: { showcase: showcaseData },
    text: {
      task: { id: 'practice-task', slug: 'task' as const, value: practice.task },
    },
  } satisfies ContentBlock_Catalog_DataFor<typeof practiceDefinition.content>),
} satisfies Section<'data'> & { order: { type: string; key: string }[] };
