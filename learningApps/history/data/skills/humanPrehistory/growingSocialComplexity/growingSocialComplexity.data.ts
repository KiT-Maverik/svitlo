import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { copperBronzeAndIron_Skill_Data, emergenceOfUrbanCenters_Skill_Data, exchangeBeforeStates_Skill_Data, prehistoricInequality_Skill_Data } from './skills';

export const growingSocialComplexity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "growingSocialComplexity",
  id: "8e0c5ba0-75c9-40cb-b71f-0841f645de49",
  name: {
    en: "Ускладнення спільнот",
  },
  skills: {
    copperBronzeAndIron: copperBronzeAndIron_Skill_Data,
    emergenceOfUrbanCenters: emergenceOfUrbanCenters_Skill_Data,
    exchangeBeforeStates: exchangeBeforeStates_Skill_Data,
    prehistoricInequality: prehistoricInequality_Skill_Data,
  },
  description: {
    methodological: "Larger communities and exchanges sometimes accompanied inequality and centralization but did not inevitably lead to them.",
    frontend: {
      en: "Explore how larger settlements sometimes changed society.",
    },
  },
});
