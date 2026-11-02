import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainBroadClimateDifferencesUsingGeographicFactors_Skill_Data, explainGeographicImpactsOfClimateChange_Skill_Data, explainTheConceptOfClimate_Skill_Data, interpretABasicClimateDiagram_Skill_Data, interpretLongTermClimateTrends_Skill_Data } from './skills';

export const climatePatterns_SkillGroup_Data = buildSkillGroupConfig({
  slug: "climatePatterns",
  id: "19c534a9-0755-459e-a150-38225482f643",
  name: {
    en: "Climate Patterns",
  },
  skills: {
    explainBroadClimateDifferencesUsingGeographicFactors: explainBroadClimateDifferencesUsingGeographicFactors_Skill_Data,
    explainGeographicImpactsOfClimateChange: explainGeographicImpactsOfClimateChange_Skill_Data,
    explainTheConceptOfClimate: explainTheConceptOfClimate_Skill_Data,
    interpretABasicClimateDiagram: interpretABasicClimateDiagram_Skill_Data,
    interpretLongTermClimateTrends: interpretLongTermClimateTrends_Skill_Data,
  },
  description: {
    methodological: "Climate summarizes the long-term distribution and variability of weather, not simply a typical day. Latitude, elevation, land–sea contrast, and circulation contribute to regional differences.",
    frontend: {
      en: "Explore why different regions experience different long-term climate patterns.",
    },
  },
});
