import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { economicDataQuality_Skill_Data, economicTimeSeries_Skill_Data, nominalAndRealMeasures_Skill_Data, perCapitaMeasuresAndShares_Skill_Data } from './skills';

export const economicIndicators_SkillGroup_Data = buildSkillGroupConfig({
  slug: "economicIndicators",
  id: "c78a911b-7e92-4041-bfd5-709596e7b5ea",
  name: {
    en: "Економічні показники",
  },
  skills: {
    economicDataQuality: economicDataQuality_Skill_Data,
    economicTimeSeries: economicTimeSeries_Skill_Data,
    nominalAndRealMeasures: nominalAndRealMeasures_Skill_Data,
    perCapitaMeasuresAndShares: perCapitaMeasuresAndShares_Skill_Data,
  },
  description: {
    methodological: "Numbers alone cannot explain economic circumstances without knowing the base, units, collection methods, and period.",
    frontend: {
      en: "Learn how to interpret economic statistics in context.",
    },
  },
});
