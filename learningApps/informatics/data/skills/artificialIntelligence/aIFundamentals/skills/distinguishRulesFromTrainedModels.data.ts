import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishRulesFromTrainedModels_Skill_Data = buildSkillConfig({
  slug: "distinguishRulesFromTrainedModels",
  id: "014446e9-1ee1-4797-85ce-869b67208166",
  name: {
    en: "Distinguish Rules from Trained Models",
  },
  description: {
    methodological: "Distinguish systems governed by explicitly programmed rules from models whose parameters are adjusted through training on data. Both use algorithms and may be combined in one product; not every AI system necessarily relies on machine learning.",
    frontend: {
      en: "Distinguish explicitly programmed decision rules from systems trained on data.",
    },
  },
});
