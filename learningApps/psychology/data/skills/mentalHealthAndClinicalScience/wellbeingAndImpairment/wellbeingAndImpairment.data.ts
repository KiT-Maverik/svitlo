import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distressVersusDisorder_Skill_Data, mentalHealthStigma_Skill_Data, psychologicalResilience_Skill_Data, psychologicalWellbeing_Skill_Data } from './skills';

export const wellbeingAndImpairment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "wellbeingAndImpairment",
  id: "8909faa4-31e0-4e46-b06c-67f61890a840",
  name: {
    en: "Wellbeing and Impairment",
  },
  skills: {
    distressVersusDisorder: distressVersusDisorder_Skill_Data,
    mentalHealthStigma: mentalHealthStigma_Skill_Data,
    psychologicalResilience: psychologicalResilience_Skill_Data,
    psychologicalWellbeing: psychologicalWellbeing_Skill_Data,
  },
  description: {
    methodological: "Psychological wellbeing is multidimensional, and the presence of an unpleasant emotion alone is not evidence of a disorder.",
    frontend: {
      en: "Learn how wellbeing and distress differ from clinical impairment.",
    },
  },
});
