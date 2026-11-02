import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareMaterialsThermalInsulationProperties_Skill_Data, selectAMaterialForMaintainingTemperature_Skill_Data } from './skills';

export const thermalInsulation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "thermalInsulation",
  id: "c6848cf3-7068-430a-a06c-def5689a40c5",
  name: {
    en: "Thermal Insulation",
  },
  skills: {
    compareMaterialsThermalInsulationProperties: compareMaterialsThermalInsulationProperties_Skill_Data,
    selectAMaterialForMaintainingTemperature: selectAMaterialForMaintainingTemperature_Skill_Data,
  },
  description: {
    methodological: "Insulating materials slow down energy transfer but do not create energy themselves; this differs from describing the three mechanisms of heat exchange.",
    frontend: {
      en: "Explore how insulation slows the transfer of heat.",
    },
  },
});
