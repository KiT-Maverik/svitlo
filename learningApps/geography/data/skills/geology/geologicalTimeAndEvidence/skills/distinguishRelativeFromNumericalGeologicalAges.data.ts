import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishRelativeFromNumericalGeologicalAges_Skill_Data = buildSkillConfig({
  slug: "distinguishRelativeFromNumericalGeologicalAges",
  id: "fa7ae4ae-9a83-47e8-a091-57119ce1a62b",
  name: {
    en: "Distinguish relative from numerical geological ages",
  },
  description: {
    methodological: "Recognize that 'older than this layer' orders events, whereas an estimated age in years gives a measured time range; different evidence and uncertainty apply to each.",
    frontend: {
      en: "Distinguish saying one rock is older from estimating its age in years.",
    },
  },
});
