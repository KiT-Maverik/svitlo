import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const heritabilityInterpretation_Skill_Data = buildSkillConfig({
  slug: "heritabilityInterpretation",
  id: "6aead28b-b544-4e2f-8006-1790433d9d9c",
  name: {
    en: "Heritability Interpretation",
  },
  description: {
    methodological: "Distinguish statistical variation within a studied population from a fixed percentage of one individual's trait attributed to genes.",
    frontend: {
      en: "Understand why heritability is a population statistic, not a person's percentage.",
    },
  },
});
