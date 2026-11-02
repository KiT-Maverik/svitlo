import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { centralPlanning_Skill_Data, marketCoordination_Skill_Data, mixedEconomies_Skill_Data } from './skills';

export const economicSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "economicSystems",
  id: "4f15e5dd-93d8-43ba-b9b4-08126f18c563",
  name: {
    en: "Економічні системи",
  },
  skills: {
    centralPlanning: centralPlanning_Skill_Data,
    marketCoordination: marketCoordination_Skill_Data,
    mixedEconomies: mixedEconomies_Skill_Data,
  },
  description: {
    methodological: "Societies combine markets, planning, public coordination, traditions, and ownership forms in different ways.",
    frontend: {
      en: "Compare how different systems organize economic decisions.",
    },
  },
});
