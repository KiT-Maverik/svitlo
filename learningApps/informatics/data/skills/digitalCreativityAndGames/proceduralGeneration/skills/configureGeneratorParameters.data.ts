import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const configureGeneratorParameters_Skill_Data = buildSkillConfig({
  slug: "configureGeneratorParameters",
  id: "6b88c529-d1d4-4148-808e-01ed7a8e035a",
  name: {
    en: "Configure Generator Parameters",
  },
  description: {
    methodological: "Determine how changing object count, color palette, or another parameter alters generated results while the algorithm stays the same. Parameter adjustment is not rewriting the generation rules.",
    frontend: {
      en: "Change generator settings to control the appearance or quantity of output.",
    },
  },
});
