import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  balancedDietaryPatterns_Skill_Data,
  hydration_Skill_Data,
  interpretDietaryEnergyBalance_Skill_Data,
  understandTheRolesOfNutrients_Skill_Data,
} from './skills';

export const nutritionalFoundations_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'nutritionalFoundations',
  id: '1f068013-3f68-4810-b1c6-65c887f0e06c',
  name: {
    en: 'Nutritional Foundations',
  },
  skills: {
    balancedDietaryPatterns: balancedDietaryPatterns_Skill_Data,
    hydration: hydration_Skill_Data,
    interpretDietaryEnergyBalance: interpretDietaryEnergyBalance_Skill_Data,
    understandTheRolesOfNutrients: understandTheRolesOfNutrients_Skill_Data,
  },
  description: {
    methodological:
      'Food supplies energy and essential nutrients; dietary adequacy depends on patterns over time rather than judging a single meal as healthy or unhealthy.',
    frontend: {
      en: 'Explore nutrition as a pattern of choices rather than one perfect meal.',
    },
  },
});
