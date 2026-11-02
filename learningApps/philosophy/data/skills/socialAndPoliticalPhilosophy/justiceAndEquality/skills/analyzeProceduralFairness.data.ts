import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const analyzeProceduralFairness_Skill_Data = buildSkillConfig({
  slug: "analyzeProceduralFairness",
  id: "c7a245c5-d9ef-4f83-bad0-e739d6166bf8",
  name: {
    en: "Analyze procedural fairness",
  },
  description: {
    methodological: "Assess the transparency, consistency, and opportunity to contest a decision independent of who benefits from its outcome.",
    frontend: {
      en: "Decide whether a decision-making process is fair even when its result is disputed.",
    },
  },
});
