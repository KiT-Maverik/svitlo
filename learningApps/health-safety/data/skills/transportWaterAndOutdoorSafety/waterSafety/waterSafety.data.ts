import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  assessSwimmingAndBathingHazards_Skill_Data,
  respondToAPersonInDangerInWater_Skill_Data,
  useWaterSafetyMeasures_Skill_Data,
} from './skills';

export const waterSafety_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'waterSafety',
  id: 'f6e99946-af37-40a2-9514-7f9335463f81',
  name: {
    en: 'Water Safety',
  },
  skills: {
    assessSwimmingAndBathingHazards: assessSwimmingAndBathingHazards_Skill_Data,
    respondToAPersonInDangerInWater: respondToAPersonInDangerInWater_Skill_Data,
    useWaterSafetyMeasures: useWaterSafetyMeasures_Skill_Data,
  },
  description: {
    methodological:
      'Drowning can occur quickly and silently; preventing entry into danger and using non-contact rescue options are distinct from trained water rescue.',
    frontend: {
      en: 'Discover how to prevent drowning and respond without creating another casualty.',
    },
  },
});
