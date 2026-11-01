import type { Section } from '@svitlo/engine/content';

export const practiceDefinition = {
  type: 'practice',
  content: {
    text: { task: { type: 'text' } },
    scene: { showcase: { type: 'scene', component: null } },
  },
} satisfies Section<'definition'>;
