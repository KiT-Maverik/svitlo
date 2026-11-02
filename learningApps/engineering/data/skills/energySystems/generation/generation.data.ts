import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { electricalGenerators_Skill_Data, hydropowerInstallations_Skill_Data, photovoltaicSystems_Skill_Data, thermalPowerStations_Skill_Data, windTurbines_Skill_Data } from './skills';

export const generation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "generation",
  id: "0a132a12-8f66-47a2-bbe0-3bb6c20f2b00",
  name: {
    en: "Generation",
  },
  skills: {
    electricalGenerators: electricalGenerators_Skill_Data,
    hydropowerInstallations: hydropowerInstallations_Skill_Data,
    photovoltaicSystems: photovoltaicSystems_Skill_Data,
    thermalPowerStations: thermalPowerStations_Skill_Data,
    windTurbines: windTurbines_Skill_Data,
  },
  description: {
    methodological: "Electricity and heat can be produced through different converter chains with distinct resource and operating constraints.",
    frontend: {
      en: "Explore different technical ways to produce electrical power.",
    },
  },
});
