import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const robotLocalizationHardware_Skill_Data = buildSkillConfig({
  slug: 'robotLocalizationHardware',
  id: '9c3e78cd-f278-48f2-8266-e8442efb6aa3',
  name: {
    en: 'Robot localization hardware',
  },
  description: {
    methodological: 'Describe how sensing surroundings or movement contributes to estimating physical position.',
    frontend: {
      en: "Recognize hardware used to estimate a robot's location.",
    },
  },
});
