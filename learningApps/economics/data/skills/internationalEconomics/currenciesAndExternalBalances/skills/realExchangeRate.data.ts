import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const realExchangeRate_Skill_Data = buildSkillConfig({
  slug: "realExchangeRate",
  id: "6c3b5e76-2e5f-493d-98dc-beb3133f9aad",
  name: {
    en: "Реальний валютний курс",
  },
  description: {
    methodological: "Connect nominal exchange rates and relative price levels to assess international competitiveness.",
    frontend: {
      en: "Compare prices across countries after allowing for exchange rates.",
    },
  },
});
