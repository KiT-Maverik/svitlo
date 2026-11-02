import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evidenceBasedChemicalConclusions_Skill_Data = buildSkillConfig({
  slug: "evidenceBasedChemicalConclusions",
  id: "b85b22fc-a1cb-45ad-8b6b-cb4d9b2e42f8",
  name: {
    en: "Evidence-Based Chemical Conclusions",
  },
  description: {
    methodological: "Evaluate whether observations justify a claim about composition or reaction, including alternative explanations.",
    frontend: {
      en: "Decide whether chemical observations really support a proposed explanation.",
    },
  },
});
