import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishEvaporationFromBoiling_Skill_Data = buildSkillConfig({
  slug: "distinguishEvaporationFromBoiling",
  id: "06f53641-deed-48d2-a42d-7a30d3799491",
  name: {
    en: "Distinguish evaporation from boiling",
  },
  description: {
    methodological: "Boiling produces vapor bubbles throughout the volume of a liquid, whereas evaporation occurs at its surface.",
    frontend: {
      en: "Distinguish bubbles formed during boiling from surface evaporation.",
    },
  },
});
