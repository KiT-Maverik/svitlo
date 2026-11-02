import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientAstronomicalKnowledge_Skill_Data, ancientCalendarSystems_Skill_Data, ancientMeasurementSystems_Skill_Data, earlyUrbanInfrastructure_Skill_Data, historyOfAncientMedicine_Skill_Data, metallurgyAndHistoricalEffects_Skill_Data, originsOfWriting_Skill_Data } from './skills';

export const productionAndKnowledge_SkillGroup_Data = buildSkillGroupConfig({
  slug: "productionAndKnowledge",
  id: "742b4358-b545-4895-9856-453f918343d0",
  name: {
    en: "Виробництво та знання",
  },
  skills: {
    ancientAstronomicalKnowledge: ancientAstronomicalKnowledge_Skill_Data,
    ancientCalendarSystems: ancientCalendarSystems_Skill_Data,
    ancientMeasurementSystems: ancientMeasurementSystems_Skill_Data,
    earlyUrbanInfrastructure: earlyUrbanInfrastructure_Skill_Data,
    historyOfAncientMedicine: historyOfAncientMedicine_Skill_Data,
    metallurgyAndHistoricalEffects: metallurgyAndHistoricalEffects_Skill_Data,
    originsOfWriting: originsOfWriting_Skill_Data,
  },
  description: {
    methodological: "Evaluate material inventions and systems of information transmission by function, spread, and historical context rather than claims of being first.",
    frontend: {
      en: "Explore how ancient societies made things and shared knowledge.",
    },
  },
});
