import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeAIBiasRisks_Skill_Data = buildSkillConfig({
  slug: "recognizeAIBiasRisks",
  id: "c6ec71b6-d08f-4840-adb2-bd25f71746d5",
  name: {
    en: "Recognize AI Bias Risks",
  },
  description: {
    methodological: "Notice how training data or deployment rules may produce systematically different outcomes for groups or individuals. One erroneous output does not necessarily establish systematic bias.",
    frontend: {
      en: "Recognize when AI systems might treat groups or individuals unfairly.",
    },
  },
});
