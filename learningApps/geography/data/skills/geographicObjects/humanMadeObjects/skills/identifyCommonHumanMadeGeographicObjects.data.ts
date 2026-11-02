import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyCommonHumanMadeGeographicObjects_Skill_Data = buildSkillConfig({
  slug: "identifyCommonHumanMadeGeographicObjects",
  id: "86acc10c-8c69-4c10-9edc-31abb845f6dd",
  name: {
    en: "Identify common human-made geographic objects",
  },
  description: {
    methodological: "Recognize constructed features such as roads, bridges, dams, ports and canals by their observable geographic function, rather than assuming all visible landscape elements are natural.",
    frontend: {
      en: "Identify roads, bridges, ports, dams and canals by their geographic functions.",
    },
  },
});
