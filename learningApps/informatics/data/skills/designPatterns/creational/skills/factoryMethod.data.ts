import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const factoryMethod_Skill_Data = buildSkillConfig({
  slug: "factoryMethod",
  id: "04ab1ac5-582e-451e-9c71-0000946454fc",
  name: {
    en: "Factory Method",
  },
  description: {
    methodological: "Delegate product instantiation to an overridable factory method so clients use a shared contract without knowing the concrete class.",
    frontend: {
      en: "Let subclasses choose which concrete object a factory method creates.",
    },
  },
});
