import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const financialRiskAndExpectedReward_Skill_Data = buildSkillConfig({
  slug: "financialRiskAndExpectedReward",
  id: "a0c17b01-0cb7-4b84-be9b-3bfe1a097f7b",
  name: {
    en: "Фінансовий ризик і очікувана винагорода",
  },
  description: {
    methodological: "Evaluate uncertain benefits, possible losses, risk tolerance, and time horizons in personal financial choices without limiting analysis to a single market asset.",
    frontend: {
      en: "Compare possible rewards with the risk of losing money.",
    },
  },
});
