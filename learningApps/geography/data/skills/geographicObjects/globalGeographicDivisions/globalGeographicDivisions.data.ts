import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishContinentsFromPartsOfTheWorld_Skill_Data, explainTheConceptOfAContinent_Skill_Data, explainTheConceptOfAnOcean_Skill_Data, explainTheConceptOfAPartOfTheWorld_Skill_Data, identifyEarthsGeographicHemispheres_Skill_Data, locateContinentsOnAGlobe_Skill_Data, locateOceansOnAGlobe_Skill_Data, locatePartsOfTheWorldOnAGlobe_Skill_Data } from './skills';

export const globalGeographicDivisions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "globalGeographicDivisions",
  id: "004a7690-25f5-49d8-9e8f-b05f4a220638",
  name: {
    en: "Global Geographic Divisions",
  },
  skills: {
    distinguishContinentsFromPartsOfTheWorld: distinguishContinentsFromPartsOfTheWorld_Skill_Data,
    explainTheConceptOfAContinent: explainTheConceptOfAContinent_Skill_Data,
    explainTheConceptOfAnOcean: explainTheConceptOfAnOcean_Skill_Data,
    explainTheConceptOfAPartOfTheWorld: explainTheConceptOfAPartOfTheWorld_Skill_Data,
    identifyEarthsGeographicHemispheres: identifyEarthsGeographicHemispheres_Skill_Data,
    locateContinentsOnAGlobe: locateContinentsOnAGlobe_Skill_Data,
    locateOceansOnAGlobe: locateOceansOnAGlobe_Skill_Data,
    locatePartsOfTheWorldOnAGlobe: locatePartsOfTheWorldOnAGlobe_Skill_Data,
  },
  description: {
    methodological: "Different conventions divide Earth into continental landmasses, historically and culturally recognized parts of the world, ocean basins and hemispheres. These systems answer different geographic questions and should not be collapsed into one supposedly universal continent count.",
    frontend: {
      en: "Explore continents, world regions, oceans and hemispheres using stated conventions.",
    },
  },
});
