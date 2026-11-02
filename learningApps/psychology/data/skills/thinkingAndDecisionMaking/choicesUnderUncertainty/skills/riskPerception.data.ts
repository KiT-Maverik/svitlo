import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const riskPerception_Skill_Data = buildSkillConfig({
  slug: "riskPerception",
  id: "5fdcee3e-fa42-45b6-ae62-fc6ecb9fcd54",
  name: {
    en: "Risk Perception",
  },
  description: {
    methodological: "Analyze why vividness, familiarity, controllability, and dread affect judgments of risk.",
    frontend: {
      en: "Recognize that perceived danger depends on more than statistical odds.",
    },
  },
});
