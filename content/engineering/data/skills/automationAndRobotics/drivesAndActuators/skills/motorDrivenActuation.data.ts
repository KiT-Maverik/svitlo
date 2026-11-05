import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const motorDrivenActuation_Skill_Data = buildSkillConfig({
  slug: 'motorDrivenActuation',
  id: '1bde93c7-443a-4721-a086-b42b3457a7f9',
  name: {
    en: 'Motor-driven actuation',
  },
  description: {
    methodological: 'Trace electrical supply and drive control to a rotating mechanical output.',
    frontend: {
      en: 'Trace how a motor produces useful mechanical action.',
    },
  },
});
