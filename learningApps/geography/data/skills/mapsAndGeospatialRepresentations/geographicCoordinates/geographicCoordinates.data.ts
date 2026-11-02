import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { interpretLatitude_Skill_Data, interpretLongitude_Skill_Data, locateAPointFromALatitudeLongitudePair_Skill_Data } from './skills';

export const geographicCoordinates_SkillGroup_Data = buildSkillGroupConfig({
  slug: "geographicCoordinates",
  id: "c7a49433-a463-4c5e-a372-2ffefaf4fb51",
  name: {
    en: "Geographic Coordinates",
  },
  skills: {
    interpretLatitude: interpretLatitude_Skill_Data,
    interpretLongitude: interpretLongitude_Skill_Data,
    locateAPointFromALatitudeLongitudePair: locateAPointFromALatitudeLongitudePair_Skill_Data,
  },
  description: {
    methodological: "The graticule provides a worldwide angular reference for positions. Latitude and longitude are distinct measurements whose ordered combination identifies a location.",
    frontend: {
      en: "Use latitude and longitude to describe locations on Earth.",
    },
  },
});
