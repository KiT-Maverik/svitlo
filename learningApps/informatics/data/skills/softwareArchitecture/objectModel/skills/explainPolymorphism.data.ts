import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainPolymorphism_Skill_Data = buildSkillConfig({
  slug: "explainPolymorphism",
  id: "3b41f995-9c0d-4baa-99c2-0c18d97f9f29",
  name: {
    en: "Explain Polymorphism",
  },
  description: {
    methodological: "Explain how different implementations fulfill a shared operation under the same contract, such as `draw()` for a circle and rectangle. The call remains consistent although concrete behavior depends on the implementation.",
    frontend: {
      en: "See how different objects can fulfill the same operation in different ways.",
    },
  },
});
