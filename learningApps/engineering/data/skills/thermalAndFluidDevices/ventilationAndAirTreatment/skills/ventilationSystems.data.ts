import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const ventilationSystems_Skill_Data = buildSkillConfig({
  slug: "ventilationSystems",
  id: "974f3258-9b52-4f2a-8661-8faddfc2739c",
  name: {
    en: "Ventilation systems",
  },
  description: {
    methodological: "Distinguish outdoor-air exchange from recirculating existing indoor air.",
    frontend: {
      en: "Distinguish bringing in fresh air from circulating the same indoor air.",
    },
  },
});
