import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const determineCivilTimeUsingASpecifiedUTCOffset_Skill_Data = buildSkillConfig({
  slug: "determineCivilTimeUsingASpecifiedUTCOffset",
  id: "195f08c7-f9cd-427f-8cf1-f231a13a1e94",
  name: {
    en: "Determine civil time using a specified UTC offset",
  },
  description: {
    methodological: "Apply a stated positive or negative offset to a known UTC time for a particular date, including when the resulting local date moves to the previous or next day. Do not infer an offset from longitude alone.",
    frontend: {
      en: "Find local clock time from a specified UTC time and offset, including date changes.",
    },
  },
});
