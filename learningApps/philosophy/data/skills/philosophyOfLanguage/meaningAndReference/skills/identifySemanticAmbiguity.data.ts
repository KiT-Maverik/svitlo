import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifySemanticAmbiguity_Skill_Data = buildSkillConfig({
  slug: "identifySemanticAmbiguity",
  id: "ec2e5bd8-cc62-411e-9b9b-c53dc4846d5f",
  name: {
    en: "Identify semantic ambiguity",
  },
  description: {
    methodological: "Recognize when a sentence admits multiple readings due to a word or syntactic structure rather than simply lacking evidence.",
    frontend: {
      en: "Find sentences with more than one possible meaning.",
    },
  },
});
