import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const displayHardware_Skill_Data = buildSkillConfig({
  slug: 'displayHardware',
  id: '94465355-c9f8-4245-abce-0febd04832a6',
  name: {
    en: 'Display hardware',
  },
  description: {
    methodological:
      'Identify the physical image-forming panel, drive electronics and light-emission or modulation mechanisms independently from displayed software content.',
    frontend: {
      en: 'Recognize the main hardware functions of a display.',
    },
  },
});
