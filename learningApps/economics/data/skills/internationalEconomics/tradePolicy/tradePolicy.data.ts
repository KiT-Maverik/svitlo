import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { importTariffs_Skill_Data, quotasAndNonTariffBarriers_Skill_Data, tradeAgreements_Skill_Data } from './skills';

export const tradePolicy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "tradePolicy",
  id: "7e77cd80-887c-42de-8d6b-e503613ded7b",
  name: {
    en: "Торговельна політика",
  },
  skills: {
    importTariffs: importTariffs_Skill_Data,
    quotasAndNonTariffBarriers: quotasAndNonTariffBarriers_Skill_Data,
    tradeAgreements: tradeAgreements_Skill_Data,
  },
  description: {
    methodological: "Government barriers and agreements affect prices, competition, revenue, and the interests of different participants.",
    frontend: {
      en: "Explore how trade rules change markets and prices.",
    },
  },
});
