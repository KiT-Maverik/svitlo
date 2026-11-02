import type { Section } from '@svitlo/engine/content';

/** Stable scene IDs are resolved at runtime; definition files never serialize JSX. */
export const theoryDefinition = {
  type: 'theory',
  content: {
    markdown: {
      p1: { type: 'markdown' },
      p2: { type: 'markdown' },
      p3: { type: 'markdown' },
    },
    scene: {
      lightRayDiagram: { type: 'scene', component: null },
      lightPropagationSimulation: { type: 'scene', component: null },
    },
    checkpoint: { checkpoint: { type: 'checkpoint' } },
  },
} satisfies Section<'definition'>;
