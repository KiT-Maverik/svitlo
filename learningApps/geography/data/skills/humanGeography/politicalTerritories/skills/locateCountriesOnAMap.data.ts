import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const locateCountriesOnAMap_Skill_Data = buildSkillConfig({
  slug: "locateCountriesOnAMap",
  id: "6db76bde-5aa4-4a64-80bf-a752b0a9ee16",
  name: {
    en: "Locate countries on a map",
  },
  description: {
    methodological: "Identify the positions of named sovereign states using a political map and stated time/context, recognizing that boundaries, names and political recognition may be disputed or change. Which countries are studied belongs to the Program, not the Skill identity.",
    frontend: {
      en: "Locate countries while recognizing that boundaries and recognition can change.",
    },
  },
});
