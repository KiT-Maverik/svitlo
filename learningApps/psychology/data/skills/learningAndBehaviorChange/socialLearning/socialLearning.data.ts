import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { modelCharacteristics_Skill_Data, observationalLearning_Skill_Data, vicariousReinforcement_Skill_Data } from './skills';

export const socialLearning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "socialLearning",
  id: "c939f4dc-93c6-4267-b92f-0fd84b56ef8e",
  name: {
    en: "Social Learning",
  },
  skills: {
    modelCharacteristics: modelCharacteristics_Skill_Data,
    observationalLearning: observationalLearning_Skill_Data,
    vicariousReinforcement: vicariousReinforcement_Skill_Data,
  },
  description: {
    methodological: "Observing models informs anticipated outcomes and possible actions even without immediate imitation.",
    frontend: {
      en: "Discover how observing other people changes what we learn.",
    },
  },
});
