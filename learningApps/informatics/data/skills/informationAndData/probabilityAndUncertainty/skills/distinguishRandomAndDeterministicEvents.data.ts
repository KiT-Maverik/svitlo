import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishRandomAndDeterministicEvents_Skill_Data = buildSkillConfig({
  slug: "distinguishRandomAndDeterministicEvents",
  id: "40612c6f-e017-4758-b0b5-abd3171df718",
  name: {
    en: "Distinguish Random and Deterministic Events",
  },
  description: {
    methodological: "Determine whether a model's known conditions fully determine its outcome or allow several possible outcomes with an unspecified selection. An outcome unknown to an observer does not itself prove physical randomness.",
    frontend: {
      en: "Distinguish outcomes determined by a rule from those selected randomly.",
    },
  },
});
