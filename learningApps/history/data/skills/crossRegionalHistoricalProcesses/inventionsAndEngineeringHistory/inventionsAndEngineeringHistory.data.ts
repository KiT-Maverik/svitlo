import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientConstructionAndLiftingMachines_Skill_Data, ancientShipbuilding_Skill_Data, ancientWheeledTransport_Skill_Data, historicalWaterEngineering_Skill_Data } from './skills';

export const inventionsAndEngineeringHistory_SkillGroup_Data = buildSkillGroupConfig({
  slug: "inventionsAndEngineeringHistory",
  id: "7ee2d150-c8e0-4c5a-8fb5-f01cf2bc1fd2",
  name: {
    en: "Винаходи та інженерія",
  },
  skills: {
    ancientConstructionAndLiftingMachines: ancientConstructionAndLiftingMachines_Skill_Data,
    ancientShipbuilding: ancientShipbuilding_Skill_Data,
    ancientWheeledTransport: ancientWheeledTransport_Skill_Data,
    historicalWaterEngineering: historicalWaterEngineering_Skill_Data,
  },
  description: {
    methodological: "Investigate the origins, changes, and transmission of technical solutions in relation to materials, needs, and consequences, not modern design practice.",
    frontend: {
      en: "Discover how ancient inventions changed over time.",
    },
  },
});
