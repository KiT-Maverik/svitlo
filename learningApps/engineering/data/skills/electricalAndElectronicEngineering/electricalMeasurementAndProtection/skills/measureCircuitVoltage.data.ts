import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const measureCircuitVoltage_Skill_Data = buildSkillConfig({
  slug: "measureCircuitVoltage",
  id: "c063f468-8af5-4933-ae5d-c81ad318f4bd",
  name: {
    en: "Measure circuit voltage",
  },
  description: {
    methodological: "Use a suitable meter across selected terminals to determine a potential difference.",
    frontend: {
      en: "Measure the potential difference between two circuit points safely.",
    },
  },
});
