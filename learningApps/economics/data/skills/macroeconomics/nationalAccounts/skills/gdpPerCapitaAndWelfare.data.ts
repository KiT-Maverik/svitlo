import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const gdpPerCapitaAndWelfare_Skill_Data = buildSkillConfig({
  slug: "gdpPerCapitaAndWelfare",
  id: "e0d150ed-20d3-43bd-b9dd-e050acf4970e",
  name: {
    en: "ВВП на одну особу та добробут",
  },
  description: {
    methodological: "Explain why average output does not measure distribution, unpaid work, environmental effects, or every aspect of quality of life.",
    frontend: {
      en: "Recognize why GDP per person is not a complete measure of wellbeing.",
    },
  },
});
