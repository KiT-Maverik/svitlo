import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeDrugRelatedRisks_Skill_Data = buildSkillConfig({
  slug: "recognizeDrugRelatedRisks",
  id: "1bd72ab3-d4ee-4dd4-ae41-e11c07f55e44",
  name: {
    en: "Recognize drug-related risks",
  },
  description: {
    methodological: "Distinguish unpredictable potency, impairment, overdose, and interactions without treating all substances as having identical effects.",
    frontend: {
      en: "Identify impairment, overdose and interaction risks from drugs.",
    },
  },
});
