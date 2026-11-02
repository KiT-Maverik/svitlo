import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishPhysicalFeaturesFromPoliticalBoundaries_Skill_Data, interpretAdministrativeTerritoriesAtDifferentLevels_Skill_Data, locateCountriesOnAMap_Skill_Data } from './skills';

export const politicalTerritories_SkillGroup_Data = buildSkillGroupConfig({
  slug: "politicalTerritories",
  id: "3baf0512-af44-4dfe-a0ee-be18f9686e1f",
  name: {
    en: "Political Territories",
  },
  skills: {
    distinguishPhysicalFeaturesFromPoliticalBoundaries: distinguishPhysicalFeaturesFromPoliticalBoundaries_Skill_Data,
    interpretAdministrativeTerritoriesAtDifferentLevels: interpretAdministrativeTerritoriesAtDifferentLevels_Skill_Data,
    locateCountriesOnAMap: locateCountriesOnAMap_Skill_Data,
  },
  description: {
    methodological: "Jurisdictions organize places using legally and socially defined boundaries that may change over time or be disputed. Political borders may follow rivers or mountains, but they are not the same kind of object as those natural features; cultural-landscape interpretation is covered separately in Cultural Geography.",
    frontend: {
      en: "Discover how political borders and administrative areas organize geographic space.",
    },
  },
});
