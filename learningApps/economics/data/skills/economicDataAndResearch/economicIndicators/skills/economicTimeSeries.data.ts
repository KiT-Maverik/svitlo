import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const economicTimeSeries_Skill_Data = buildSkillConfig({
  slug: "economicTimeSeries",
  id: "a3edd45b-5bc9-4bf3-96db-4de358fb6e52",
  name: {
    en: "Читання економічних часових рядів",
  },
  description: {
    methodological: "Distinguish an indicator's level, absolute change, rate of change, and possible seasonality.",
    frontend: {
      en: "Read how an economic measure changes over time.",
    },
  },
});
