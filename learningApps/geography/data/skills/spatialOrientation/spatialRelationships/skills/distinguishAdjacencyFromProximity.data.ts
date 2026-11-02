import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishAdjacencyFromProximity_Skill_Data = buildSkillConfig({
  slug: "distinguishAdjacencyFromProximity",
  id: "1c18013c-e48a-4fc6-801c-a69c6c8fd129",
  name: {
    en: "Distinguish adjacency from proximity",
  },
  description: {
    methodological: "Two territories may share a boundary without being close to the same external landmark; nearby places need not touch.",
    frontend: {
      en: "Distinguish places that touch from places that are merely nearby.",
    },
  },
});
