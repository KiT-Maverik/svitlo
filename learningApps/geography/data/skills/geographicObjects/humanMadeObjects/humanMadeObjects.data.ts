import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifySettlementsByTheirGeographicCharacteristics_Skill_Data, identifyCommonHumanMadeGeographicObjects_Skill_Data, locateHumanMadeGeographicObjectsOnAMap_Skill_Data } from './skills';

export const humanMadeObjects_SkillGroup_Data = buildSkillGroupConfig({
  slug: "humanMadeObjects",
  id: "86224b4e-f36f-4767-9eb9-fc3886d25f8f",
  name: {
    en: "Human-Made Objects",
  },
  skills: {
    classifySettlementsByTheirGeographicCharacteristics: classifySettlementsByTheirGeographicCharacteristics_Skill_Data,
    identifyCommonHumanMadeGeographicObjects: identifyCommonHumanMadeGeographicObjects_Skill_Data,
    locateHumanMadeGeographicObjectsOnAMap: locateHumanMadeGeographicObjectsOnAMap_Skill_Data,
  },
  description: {
    methodological: "People build or organize identifiable features such as settlements, roads, bridges, ports and waterways. Their classification concerns recognizably different physical or functional types; networks, economics and governance are studied in other Domains.",
    frontend: {
      en: "Recognize settlements and infrastructure as human-made geographic features.",
    },
  },
});
