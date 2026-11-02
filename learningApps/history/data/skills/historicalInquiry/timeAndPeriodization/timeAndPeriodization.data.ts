import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bceAndCeDating_Skill_Data, historicalChronology_Skill_Data, historicalPeriodization_Skill_Data, synchronizingCivilizations_Skill_Data } from './skills';

export const timeAndPeriodization_SkillGroup_Data = buildSkillGroupConfig({
  slug: "timeAndPeriodization",
  id: "fee37e4b-2452-48e5-8ff3-d4ff63a51e63",
  name: {
    en: "Час і періодизація",
  },
  skills: {
    bceAndCeDating: bceAndCeDating_Skill_Data,
    historicalChronology: historicalChronology_Skill_Data,
    historicalPeriodization: historicalPeriodization_Skill_Data,
    synchronizingCivilizations: synchronizingCivilizations_Skill_Data,
  },
  description: {
    methodological: "Historical time uses relative and absolute dating; period boundaries are analytical conventions, not universal natural transitions occurring everywhere simultaneously.",
    frontend: {
      en: "Explore how dates and historical periods help us organize the past.",
    },
  },
});
