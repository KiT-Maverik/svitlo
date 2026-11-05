import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const openLoopControl_Skill_Data = buildSkillConfig({
  slug: 'openLoopControl',
  id: '2a02a615-0b4d-4abb-a217-93440de78fa2',
  name: {
    en: 'Open-loop control',
  },
  description: {
    methodological:
      'Describe a control process whose command is set without measuring the resulting output for correction, and explain the consequences of changing loads or other disturbances.',
    frontend: {
      en: 'Understand systems that operate without measuring the result.',
    },
  },
});
