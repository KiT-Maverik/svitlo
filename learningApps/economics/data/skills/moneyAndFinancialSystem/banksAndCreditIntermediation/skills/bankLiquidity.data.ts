import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const bankLiquidity_Skill_Data = buildSkillConfig({
  slug: "bankLiquidity",
  id: "8799445a-8167-4528-9d94-9cdf5bff9a0b",
  name: {
    en: "Банківська ліквідність",
  },
  description: {
    methodological: "Distinguish the ability to meet payments on time from long-run sufficiency of assets to cover obligations.",
    frontend: {
      en: "Understand why a bank can face a cash shortage even if its assets have value.",
    },
  },
});
