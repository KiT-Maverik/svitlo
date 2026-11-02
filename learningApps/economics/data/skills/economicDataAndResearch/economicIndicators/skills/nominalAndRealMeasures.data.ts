import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const nominalAndRealMeasures_Skill_Data = buildSkillConfig({
  slug: "nominalAndRealMeasures",
  id: "a3dfe606-9e90-4776-99a9-5e258ead9f3f",
  name: {
    en: "Номінальні та реальні величини",
  },
  description: {
    methodological: "Convert monetary indicators using appropriate price indexes while considering reference bases, periods, and comparability. This general measurement technique applies to earnings, wages, output, and other quantities.",
    frontend: {
      en: "Adjust monetary figures for price changes to compare their real value.",
    },
  },
});
