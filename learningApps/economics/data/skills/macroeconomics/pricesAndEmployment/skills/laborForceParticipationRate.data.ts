import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const laborForceParticipationRate_Skill_Data = buildSkillConfig({
  slug: "laborForceParticipationRate",
  id: "06790974-77ba-40f6-aba5-3009da233979",
  name: {
    en: "Рівень участі в робочій силі",
  },
  description: {
    methodological: "Calculate and interpret the proportion of a specified age group that is employed or unemployed and seeking work, distinguishing it from the unemployment rate.",
    frontend: {
      en: "Compare labor-force participation with the unemployment rate.",
    },
  },
});
