import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const thermalPowerStations_Skill_Data = buildSkillConfig({
  slug: "thermalPowerStations",
  id: "e3723d07-d449-4dcf-9a6d-7b52c85021fe",
  name: {
    en: "Thermal power stations",
  },
  description: {
    methodological: "Trace a heat source and working process to a generator rather than assuming a single fuel.",
    frontend: {
      en: "Explore how thermal power plants convert heat into electrical output.",
    },
  },
});
