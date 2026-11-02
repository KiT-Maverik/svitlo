import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const reduceUnnecessaryComplexityKISS_Skill_Data = buildSkillConfig({
  slug: "reduceUnnecessaryComplexityKISS",
  id: "c51781c1-1fda-47a7-9714-bdec0cb50352",
  name: {
    en: "Reduce Unnecessary Complexity (KISS)",
  },
  description: {
    methodological: "Compare a solution with actual requirements and remove mechanisms that add nothing to needed behavior. Simplicity means reducing unjustified complexity, not ignoring important constraints or correctness.",
    frontend: {
      en: "Simplify software by removing mechanisms the requirements do not justify.",
    },
  },
});
