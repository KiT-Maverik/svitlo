import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  preventEntrapmentAndSuffocationHazards_Skill_Data,
  preventFallsInLivingSpaces_Skill_Data,
  preventHouseholdPoisoning_Skill_Data,
  safeHandlingOfHotSurfacesAndLiquids_Skill_Data,
  safeUseOfSharpObjects_Skill_Data,
} from './skills';

export const householdHazards_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'householdHazards',
  id: '079a6a37-422d-45bb-9143-0072a0d4ff44',
  name: {
    en: 'Household Hazards',
  },
  skills: {
    preventEntrapmentAndSuffocationHazards: preventEntrapmentAndSuffocationHazards_Skill_Data,
    preventFallsInLivingSpaces: preventFallsInLivingSpaces_Skill_Data,
    preventHouseholdPoisoning: preventHouseholdPoisoning_Skill_Data,
    safeHandlingOfHotSurfacesAndLiquids: safeHandlingOfHotSurfacesAndLiquids_Skill_Data,
    safeUseOfSharpObjects: safeUseOfSharpObjects_Skill_Data,
  },
  description: {
    methodological:
      'Ordinary domestic objects and spaces can cause falls, burns, poisoning, cuts, and injury when access or use is unsafe.',
    frontend: {
      en: 'Explore preventable dangers in ordinary household environments.',
    },
  },
});
