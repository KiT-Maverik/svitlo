import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { acuteStress_Skill_Data, chronicStress_Skill_Data, emotionFocusedCoping_Skill_Data, problemFocusedCoping_Skill_Data, stressAppraisal_Skill_Data } from './skills';

export const stressAndCoping_SkillGroup_Data = buildSkillGroupConfig({
  slug: "stressAndCoping",
  id: "e7a36c94-1542-4777-98fe-57feb03de94b",
  name: {
    en: "Stress and Coping",
  },
  skills: {
    acuteStress: acuteStress_Skill_Data,
    chronicStress: chronicStress_Skill_Data,
    emotionFocusedCoping: emotionFocusedCoping_Skill_Data,
    problemFocusedCoping: problemFocusedCoping_Skill_Data,
    stressAppraisal: stressAppraisal_Skill_Data,
  },
  description: {
    methodological: "Stress is shaped by demands and perceived resources, with psychological consequences depending partly on duration and opportunities for recovery.",
    frontend: {
      en: "Discover how people appraise, experience and cope with stress.",
    },
  },
});
