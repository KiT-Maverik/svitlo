import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { negativePunishment_Skill_Data, negativeReinforcement_Skill_Data, operantConditioning_Skill_Data, positivePunishment_Skill_Data, positiveReinforcement_Skill_Data, reinforcementSchedules_Skill_Data } from './skills';

export const operantLearning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "operantLearning",
  id: "0d617633-5b85-4638-bbcf-1cc46a199bab",
  name: {
    en: "Operant Learning",
  },
  skills: {
    negativePunishment: negativePunishment_Skill_Data,
    negativeReinforcement: negativeReinforcement_Skill_Data,
    operantConditioning: operantConditioning_Skill_Data,
    positivePunishment: positivePunishment_Skill_Data,
    positiveReinforcement: positiveReinforcement_Skill_Data,
    reinforcementSchedules: reinforcementSchedules_Skill_Data,
  },
  description: {
    methodological: "Consequences influence the future frequency of actions; functional definitions depend on observed behavioral change rather than whether an outcome seems pleasant.",
    frontend: {
      en: "Explore how rewards and consequences influence behavior.",
    },
  },
});
