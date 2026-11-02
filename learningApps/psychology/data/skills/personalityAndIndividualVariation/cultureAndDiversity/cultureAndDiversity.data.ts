import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { avoidingPsychologicalEssentialism_Skill_Data, biasInPsychologicalNorms_Skill_Data, crossCulturalResearchComparability_Skill_Data, culturalVariationInBehavior_Skill_Data } from './skills';

export const cultureAndDiversity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "cultureAndDiversity",
  id: "344b7dfb-067a-425a-afcb-3e9d60ddc72b",
  name: {
    en: "Culture and Diversity",
  },
  skills: {
    avoidingPsychologicalEssentialism: avoidingPsychologicalEssentialism_Skill_Data,
    biasInPsychologicalNorms: biasInPsychologicalNorms_Skill_Data,
    crossCulturalResearchComparability: crossCulturalResearchComparability_Skill_Data,
    culturalVariationInBehavior: culturalVariationInBehavior_Skill_Data,
  },
  description: {
    methodological: "Human psychological patterns must be examined against differences in context, institutions, and ways of interpreting experience.",
    frontend: {
      en: "Learn how culture and diversity affect psychological experience.",
    },
  },
});
