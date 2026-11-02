import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { consumerSegmentation_Skill_Data, targetAudience_Skill_Data, testingMarketDemand_Skill_Data } from './skills';

export const marketResearch_SkillGroup_Data = buildSkillGroupConfig({
  slug: "marketResearch",
  id: "fedfd6f9-c0b4-4f21-8854-d765fa9c2561",
  name: {
    en: "Дослідження ринку",
  },
  skills: {
    consumerSegmentation: consumerSegmentation_Skill_Data,
    targetAudience: targetAudience_Skill_Data,
    testingMarketDemand: testingMarketDemand_Skill_Data,
  },
  description: {
    methodological: "Audience needs and competitive conditions can be studied using observations, surveys, and tests of assumptions.",
    frontend: {
      en: "Learn how businesses gather evidence about customers and competitors.",
    },
  },
});
