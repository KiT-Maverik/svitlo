import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { publicProgramEvaluation_Skill_Data, socialTransfers_Skill_Data, targetedAndUniversalBenefits_Skill_Data } from './skills';

export const redistributionAndSocialProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "redistributionAndSocialProtection",
  id: "78be65cd-4f00-4b50-bea4-1982e00aafa9",
  name: {
    en: "Перерозподіл та соціальний захист",
  },
  skills: {
    publicProgramEvaluation: publicProgramEvaluation_Skill_Data,
    socialTransfers: socialTransfers_Skill_Data,
    targetedAndUniversalBenefits: targetedAndUniversalBenefits_Skill_Data,
  },
  description: {
    methodological: "Transfers and public services change resource distribution and insure against specified social risks.",
    frontend: {
      en: "Discover how public support can reduce particular financial risks.",
    },
  },
});
