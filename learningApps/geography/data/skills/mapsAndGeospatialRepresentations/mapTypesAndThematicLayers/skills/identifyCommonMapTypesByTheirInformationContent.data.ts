import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyCommonMapTypesByTheirInformationContent_Skill_Data = buildSkillConfig({
  slug: "identifyCommonMapTypesByTheirInformationContent",
  id: "89a00d18-137f-4a46-a9d8-66b41fc77acb",
  name: {
    en: "Identify common map types by their information content",
  },
  description: {
    methodological: "Recognize whether a map presents political boundaries, physical relief, topographic detail, geological units, climate, population, resources or transport, using its title, legend and depicted variables. Explain that reference and thematic are broad roles, not mutually exclusive lists of named maps.",
    frontend: {
      en: "Identify what kind of geographic information a map represents.",
    },
  },
});
