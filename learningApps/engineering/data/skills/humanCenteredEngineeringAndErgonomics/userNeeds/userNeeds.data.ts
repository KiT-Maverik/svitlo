import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyAccessibilityBarriers_Skill_Data, identifyPhysicalUserScenarios_Skill_Data, observePhysicalUsabilityProblems_Skill_Data, translateUseObservationsIntoRequirements_Skill_Data } from './skills';

export const userNeeds_SkillGroup_Data = buildSkillGroupConfig({
  slug: "userNeeds",
  id: "3eff673a-1572-4c17-9e2a-de32d4fc1209",
  name: {
    en: "User Needs",
  },
  skills: {
    identifyAccessibilityBarriers: identifyAccessibilityBarriers_Skill_Data,
    identifyPhysicalUserScenarios: identifyPhysicalUserScenarios_Skill_Data,
    observePhysicalUsabilityProblems: observePhysicalUsabilityProblems_Skill_Data,
    translateUseObservationsIntoRequirements: translateUseObservationsIntoRequirements_Skill_Data,
  },
  description: {
    methodological: "Design briefs must address users with differing abilities and usage contexts rather than projecting the designer's own preferences.",
    frontend: {
      en: "Learn to investigate the practical activities and limitations of product users.",
    },
  },
});
