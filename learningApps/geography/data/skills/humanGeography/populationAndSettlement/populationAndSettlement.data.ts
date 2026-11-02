import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { describeMigrationAsMovementBetweenPlaces_Skill_Data, explainGeographicDriversOfMigration_Skill_Data, explainGeographicFactorsShapingSettlementPatterns_Skill_Data, explainUrbanizationAsGeographicChange_Skill_Data, interpretAPopulationDensityMap_Skill_Data } from './skills';

export const populationAndSettlement_SkillGroup_Data = buildSkillGroupConfig({
  slug: "populationAndSettlement",
  id: "b68dee87-461a-40d1-a265-2d4dc12aa2ac",
  name: {
    en: "Population and Settlement",
  },
  skills: {
    describeMigrationAsMovementBetweenPlaces: describeMigrationAsMovementBetweenPlaces_Skill_Data,
    explainGeographicDriversOfMigration: explainGeographicDriversOfMigration_Skill_Data,
    explainGeographicFactorsShapingSettlementPatterns: explainGeographicFactorsShapingSettlementPatterns_Skill_Data,
    explainUrbanizationAsGeographicChange: explainUrbanizationAsGeographicChange_Skill_Data,
    interpretAPopulationDensityMap: interpretAPopulationDensityMap_Skill_Data,
  },
  description: {
    methodological: "Population counts, density, migration, and settlement forms show how human presence is unevenly distributed. The same total population can occupy very different spatial patterns.",
    frontend: {
      en: "Discover why populations and settlements are spread unevenly across regions.",
    },
  },
});
