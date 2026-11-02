import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const nominalExchangeRate_Skill_Data = buildSkillConfig({
  slug: "nominalExchangeRate",
  id: "3bfc67bd-8972-4ada-bf78-ba1dacb5abd7",
  name: {
    en: "Номінальний валютний курс",
  },
  description: {
    methodological: "Interpret the price of one currency in terms of another, accounting for the direction of the quoted rate.",
    frontend: {
      en: "Read how much one currency is worth in another.",
    },
  },
});
