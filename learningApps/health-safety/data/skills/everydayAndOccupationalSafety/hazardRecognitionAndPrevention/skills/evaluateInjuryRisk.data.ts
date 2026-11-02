import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateInjuryRisk_Skill_Data = buildSkillConfig({
  slug: "evaluateInjuryRisk",
  id: "e15f7460-ad4f-45ad-94bb-b36bd3f25953",
  name: {
    en: "Evaluate injury risk",
  },
  description: {
    methodological: "Evaluate how an identifiable hazard could cause immediate accidental injury, who may be exposed and how reliably existing controls reduce that danger; chronic disease-risk estimation belongs to Health and Risk.",
    frontend: {
      en: "Evaluate how a hazard might cause immediate injury.",
    },
  },
});
