import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { consumerSurplus_Skill_Data, deadweightLoss_Skill_Data, producerSurplus_Skill_Data } from './skills';

export const marketOutcomes_SkillGroup_Data = buildSkillGroupConfig({
  slug: "marketOutcomes",
  id: "e5058dd8-ca2e-4122-a934-25a36180a04b",
  name: {
    en: "Ринкові результати",
  },
  skills: {
    consumerSurplus: consumerSurplus_Skill_Data,
    deadweightLoss: deadweightLoss_Skill_Data,
    producerSurplus: producerSurplus_Skill_Data,
  },
  description: {
    methodological: "Gains from exchange and forgone opportunities help characterize welfare created or lost through economic choices under given market conditions.",
    frontend: {
      en: "Explore who gains from market exchanges and when benefits are lost.",
    },
  },
});
