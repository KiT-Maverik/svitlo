import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyGeographicObjectsByNaturalOrHumanMadeOrigin_Skill_Data, classifyPlacesIntoRegionsUsingStatedCriteria_Skill_Data, distinguishFormalAndFunctionalRegions_Skill_Data, explainTheConceptOfAGeographicObject_Skill_Data, explainWhyRegionalBoundariesMayDifferBetweenMaps_Skill_Data } from './skills';

export const classification_SkillGroup_Data = buildSkillGroupConfig({
  slug: "classification",
  id: "0505341b-a757-427e-bf87-c375731353b4",
  name: {
    en: "Classification",
  },
  skills: {
    classifyGeographicObjectsByNaturalOrHumanMadeOrigin: classifyGeographicObjectsByNaturalOrHumanMadeOrigin_Skill_Data,
    classifyPlacesIntoRegionsUsingStatedCriteria: classifyPlacesIntoRegionsUsingStatedCriteria_Skill_Data,
    distinguishFormalAndFunctionalRegions: distinguishFormalAndFunctionalRegions_Skill_Data,
    explainTheConceptOfAGeographicObject: explainTheConceptOfAGeographicObject_Skill_Data,
    explainWhyRegionalBoundariesMayDifferBetweenMaps: explainWhyRegionalBoundariesMayDifferBetweenMaps_Skill_Data,
  },
  description: {
    methodological: "A geographic object is a distinguishable natural or human-made feature or place, while regions group places by an explicit criterion. Classification uses defining properties, not just memorized names; a region's boundary may depend on the chosen rule.",
    frontend: {
      en: "Discover how features and regions are classified by their defining properties.",
    },
  },
});
