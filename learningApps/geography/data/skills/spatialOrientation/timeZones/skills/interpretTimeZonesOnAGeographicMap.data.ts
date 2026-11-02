import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretTimeZonesOnAGeographicMap_Skill_Data = buildSkillConfig({
  slug: "interpretTimeZonesOnAGeographicMap",
  id: "f7c19fb8-bd0c-4aec-8dbf-7f5fd3582d04",
  name: {
    en: "Interpret time zones on a geographic map",
  },
  description: {
    methodological: "Locate places assigned to different civil time zones using a legend or UTC offsets; recognize that boundaries may follow political borders and that some regions use half-hour or quarter-hour offsets.",
    frontend: {
      en: "Read time-zone boundaries and UTC offsets on a map.",
    },
  },
});
