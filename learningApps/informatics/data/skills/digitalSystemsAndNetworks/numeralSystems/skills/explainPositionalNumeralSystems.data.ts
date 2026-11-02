import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainPositionalNumeralSystems_Skill_Data = buildSkillConfig({
  slug: "explainPositionalNumeralSystems",
  id: "e02a99c1-3a90-4c83-9411-55df84c217a3",
  name: {
    en: "Explain Positional Numeral Systems",
  },
  description: {
    methodological: "Explain that digit values depend on position and base, so `10` denotes different quantities in binary and decimal.",
    frontend: {
      en: "Understand why the place of a digit changes its value in a number.",
    },
  },
});
