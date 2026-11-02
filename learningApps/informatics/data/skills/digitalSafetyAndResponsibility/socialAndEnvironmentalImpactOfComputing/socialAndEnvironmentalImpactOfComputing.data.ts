import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessAnAlgorithmsImpactOnUserGroups_Skill_Data, assessComputingsEnvironmentalImpact_Skill_Data } from './skills';

export const socialAndEnvironmentalImpactOfComputing_SkillGroup_Data = buildSkillGroupConfig({
  slug: "socialAndEnvironmentalImpactOfComputing",
  id: "111fbee4-d6da-4865-b0b8-56b6c1c3f39f",
  name: {
    en: "Social and Environmental Impact of Computing",
  },
  skills: {
    assessAnAlgorithmsImpactOnUserGroups: assessAnAlgorithmsImpactOnUserGroups_Skill_Data,
    assessComputingsEnvironmentalImpact: assessComputingsEnvironmentalImpact_Skill_Data,
  },
  description: {
    methodological: "Digital systems may affect social groups and the environment through uneven benefits and harms, energy consumption, material use, and electronic waste. Evaluation requires a specific context, not an abstract 'good/bad' label.",
    frontend: {
      en: "Explore how computing affects fairness, resource use and the environment.",
    },
  },
});
