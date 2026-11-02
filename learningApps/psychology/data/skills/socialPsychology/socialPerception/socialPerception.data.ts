import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compassion_Skill_Data, empathy_Skill_Data, firstImpressions_Skill_Data, perspectiveTaking_Skill_Data, socialAttribution_Skill_Data, stereotypeActivation_Skill_Data } from './skills';

export const socialPerception_SkillGroup_Data = buildSkillGroupConfig({
  slug: "socialPerception",
  id: "6d157f4e-e68d-44ed-ae37-eefc03f307c4",
  name: {
    en: "Social Perception",
  },
  skills: {
    compassion: compassion_Skill_Data,
    empathy: empathy_Skill_Data,
    firstImpressions: firstImpressions_Skill_Data,
    perspectiveTaking: perspectiveTaking_Skill_Data,
    socialAttribution: socialAttribution_Skill_Data,
    stereotypeActivation: stereotypeActivation_Skill_Data,
  },
  description: {
    methodological: "Judgments about other people are inferred from limited evidence and shaped by expectations, roles, and context.",
    frontend: {
      en: "Explore how we interpret people's actions, intentions and feelings.",
    },
  },
});
