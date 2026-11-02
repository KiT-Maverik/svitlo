import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { determineCivilTimeUsingASpecifiedUTCOffset_Skill_Data, explainSeasonalChangesToCivilClockTime_Skill_Data, explainTheConceptOfLocalCivilTime_Skill_Data, explainWhyLocalSolarTimeVariesWithLongitude_Skill_Data, interpretCalendarDateChangesAcrossTheInternationalDateLine_Skill_Data, interpretTimeZonesOnAGeographicMap_Skill_Data } from './skills';

export const timeZones_SkillGroup_Data = buildSkillGroupConfig({
  slug: "timeZones",
  id: "18fb384e-b4d0-4684-8183-d9e1092720ad",
  name: {
    en: "Time Zones",
  },
  skills: {
    determineCivilTimeUsingASpecifiedUTCOffset: determineCivilTimeUsingASpecifiedUTCOffset_Skill_Data,
    explainSeasonalChangesToCivilClockTime: explainSeasonalChangesToCivilClockTime_Skill_Data,
    explainTheConceptOfLocalCivilTime: explainTheConceptOfLocalCivilTime_Skill_Data,
    explainWhyLocalSolarTimeVariesWithLongitude: explainWhyLocalSolarTimeVariesWithLongitude_Skill_Data,
    interpretCalendarDateChangesAcrossTheInternationalDateLine: interpretCalendarDateChangesAcrossTheInternationalDateLine_Skill_Data,
    interpretTimeZonesOnAGeographicMap: interpretTimeZonesOnAGeographicMap_Skill_Data,
  },
  description: {
    methodological: "Earth's rotation gives different longitudes different solar timing, while societies coordinate clocks through geographically assigned civil time rules. The same place can be described by its solar time, legal time-zone assignment, UTC offset and calendar date; these are related but not interchangeable.",
    frontend: {
      en: "Explore how Earth’s rotation and local rules shape the time shown on clocks.",
    },
  },
});
