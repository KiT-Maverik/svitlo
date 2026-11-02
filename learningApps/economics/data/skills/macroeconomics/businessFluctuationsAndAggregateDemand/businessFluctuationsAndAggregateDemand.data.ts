import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { aggregateDemand_Skill_Data, aggregateSupply_Skill_Data, businessCycle_Skill_Data, macroeconomicShocks_Skill_Data, multiplierEffect_Skill_Data } from './skills';

export const businessFluctuationsAndAggregateDemand_SkillGroup_Data = buildSkillGroupConfig({
  slug: "businessFluctuationsAndAggregateDemand",
  id: "839e0bd3-937d-4f69-b8c7-af64e160bca9",
  name: {
    en: "Коливання та сукупний попит",
  },
  skills: {
    aggregateDemand: aggregateDemand_Skill_Data,
    aggregateSupply: aggregateSupply_Skill_Data,
    businessCycle: businessCycle_Skill_Data,
    macroeconomicShocks: macroeconomicShocks_Skill_Data,
    multiplierEffect: multiplierEffect_Skill_Data,
  },
  description: {
    methodological: "Economic shocks affect output and employment through spending, expectations, and firms' responses.",
    frontend: {
      en: "Explore why economies experience periods of expansion and slowdown.",
    },
  },
});
