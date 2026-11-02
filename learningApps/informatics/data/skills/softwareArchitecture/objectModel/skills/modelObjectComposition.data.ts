import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const modelObjectComposition_Skill_Data = buildSkillConfig({
  slug: "modelObjectComposition",
  id: "b61d2c5d-b157-4614-9e65-cd7f86506ef2",
  name: {
    en: "Model Object Composition",
  },
  description: {
    methodological: "Construct a system from components with distinct roles, such as a robot comprising a controller, sensors, and actuators. Composition is a 'has a part' relationship, unlike inheritance's 'is a kind of' relationship.",
    frontend: {
      en: "Build larger software objects from smaller parts with distinct responsibilities.",
    },
  },
});
