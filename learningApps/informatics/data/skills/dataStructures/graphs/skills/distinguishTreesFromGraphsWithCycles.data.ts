import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishTreesFromGraphsWithCycles_Skill_Data = buildSkillConfig({
  slug: "distinguishTreesFromGraphsWithCycles",
  id: "8a4de3b6-ea03-4ee3-8c9c-307fa71ef78b",
  name: {
    en: "Distinguish Trees from Graphs with Cycles",
  },
  description: {
    methodological: "A tree has no cycles, whereas a general graph may have cycles and multiple alternative paths between vertices.",
    frontend: {
      en: "Understand why graphs may contain cycles but trees do not.",
    },
  },
});
