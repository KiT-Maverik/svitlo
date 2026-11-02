import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainElectricVoltage_Skill_Data = buildSkillConfig({
  slug: "explainElectricVoltage",
  id: "44d6bdfa-c713-4010-be3b-deffeea15d99",
  name: {
    en: "Explain electric voltage",
  },
  description: {
    methodological: "Voltage specifies the difference in electric potential between two points and is not current itself.",
    frontend: {
      en: "Explain voltage as an electric potential difference between two points.",
    },
  },
});
