import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bigFiveTraitModel_Skill_Data, personalityAssessment_Skill_Data, personalityStabilityAndChange_Skill_Data, traitSituationInteraction_Skill_Data, traitVersusState_Skill_Data } from './skills';

export const traitsAndPersonalityModels_SkillGroup_Data = buildSkillGroupConfig({
  slug: "traitsAndPersonalityModels",
  id: "ba17120b-44c3-45af-9cf9-38283e366307",
  name: {
    en: "Traits and Personality Models",
  },
  skills: {
    bigFiveTraitModel: bigFiveTraitModel_Skill_Data,
    personalityAssessment: personalityAssessment_Skill_Data,
    personalityStabilityAndChange: personalityStabilityAndChange_Skill_Data,
    traitSituationInteraction: traitSituationInteraction_Skill_Data,
    traitVersusState: traitVersusState_Skill_Data,
  },
  description: {
    methodological: "Trait models summarize recurring behavioral tendencies while leaving room for situational variation and change.",
    frontend: {
      en: "Discover how personality traits are described and assessed.",
    },
  },
});
