import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const physicalProperties_Skill_Data = buildSkillConfig({
  slug: "physicalProperties",
  id: "ad17514c-76be-4c42-a4bf-02a0d07b1dae",
  name: {
    en: "Physical Properties",
  },
  description: {
    methodological: "Use density, conductivity, hardness, melting point or other properties that do not require changing chemical identity.",
    frontend: {
      en: "Identify properties that can be measured without changing a substance's identity.",
    },
  },
});
