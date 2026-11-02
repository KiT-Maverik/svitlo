import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const choiceUnderUncertainty_Skill_Data = buildSkillConfig({
  slug: "choiceUnderUncertainty",
  id: "5be4cc74-4266-4789-af8b-76081409213e",
  name: {
    en: "Невизначеність у виборі",
  },
  description: {
    methodological: "Distinguish outcomes known in advance, probabilistic results, and situations in which probabilities or even the outcomes themselves are unknown.",
    frontend: {
      en: "Compare choices when the outcome is certain, risky, or unknown.",
    },
  },
});
