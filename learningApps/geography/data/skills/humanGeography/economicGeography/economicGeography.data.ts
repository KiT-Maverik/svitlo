import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainBasicGeographicFactorsAffectingActivityLocation_Skill_Data, explainGeographicInterdependenceBetweenRegions_Skill_Data, explainGeographicSpecializationOfEconomicActivities_Skill_Data, identifyLandUsePatternsInASettlementOrRegion_Skill_Data, traceMovementOfGoodsOrPeopleThroughANetwork_Skill_Data } from './skills';

export const economicGeography_SkillGroup_Data = buildSkillGroupConfig({
  slug: "economicGeography",
  id: "58e41fda-ab15-42de-8115-91f32af27c50",
  name: {
    en: "Economic Geography",
  },
  skills: {
    explainBasicGeographicFactorsAffectingActivityLocation: explainBasicGeographicFactorsAffectingActivityLocation_Skill_Data,
    explainGeographicInterdependenceBetweenRegions: explainGeographicInterdependenceBetweenRegions_Skill_Data,
    explainGeographicSpecializationOfEconomicActivities: explainGeographicSpecializationOfEconomicActivities_Skill_Data,
    identifyLandUsePatternsInASettlementOrRegion: identifyLandUsePatternsInASettlementOrRegion_Skill_Data,
    traceMovementOfGoodsOrPeopleThroughANetwork: traceMovementOfGoodsOrPeopleThroughANetwork_Skill_Data,
  },
  description: {
    methodological: "Production, services, resources, settlement demand and transport networks are unevenly distributed and connect places. Geographic specialization and cross-regional dependence describe spatial relationships rather than prices or financial accounting.",
    frontend: {
      en: "Explore where economic activities happen and how places are linked through transport.",
    },
  },
});
