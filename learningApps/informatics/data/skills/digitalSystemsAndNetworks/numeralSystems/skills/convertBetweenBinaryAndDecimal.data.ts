import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const convertBetweenBinaryAndDecimal_Skill_Data = buildSkillConfig({
  slug: "convertBetweenBinaryAndDecimal",
  id: "01f66f87-337b-40b9-b193-b22da9dda836",
  name: {
    en: "Convert Between Binary and Decimal",
  },
  description: {
    methodological: "Represent a small integer as a sum of powers of two and recover a value from its binary positions, distinguishing the notation from the number itself.",
    frontend: {
      en: "Convert small numbers between binary and decimal notation.",
    },
  },
});
