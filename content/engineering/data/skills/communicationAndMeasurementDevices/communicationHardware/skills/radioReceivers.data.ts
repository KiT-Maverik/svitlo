import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const radioReceivers_Skill_Data = buildSkillConfig({
  slug: 'radioReceivers',
  id: '065536cf-4ad4-4b0b-8b4f-3c2ddd3298bc',
  name: {
    en: 'Radio receivers',
  },
  description: {
    methodological:
      'Trace how an antenna and receiving electronics select and recover useful information from a received signal.',
    frontend: {
      en: 'Recognize how a receiver selects and interprets radio signals.',
    },
  },
});
