import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adaptiveTradeOffs_Skill_Data, evaluatingEvolutionaryClaims_Skill_Data, selectionAndBehavioralVariation_Skill_Data } from './skills';

export const evolutionaryAccounts_SkillGroup_Data = buildSkillGroupConfig({
  slug: "evolutionaryAccounts",
  id: "3b2fb696-68a0-4ec8-83cb-a3fdacf5c9fb",
  name: {
    en: "Evolutionary Accounts",
  },
  skills: {
    adaptiveTradeOffs: adaptiveTradeOffs_Skill_Data,
    evaluatingEvolutionaryClaims: evaluatingEvolutionaryClaims_Skill_Data,
    selectionAndBehavioralVariation: selectionAndBehavioralVariation_Skill_Data,
  },
  description: {
    methodological: "Evolutionary explanations generate testable hypotheses about behavior but require evidence beyond a plausible adaptation story.",
    frontend: {
      en: "Learn how evolutionary theories make testable proposals about behavior.",
    },
  },
});
