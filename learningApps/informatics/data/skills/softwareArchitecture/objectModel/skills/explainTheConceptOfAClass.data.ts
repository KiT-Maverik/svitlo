import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTheConceptOfAClass_Skill_Data = buildSkillConfig({
  slug: "explainTheConceptOfAClass",
  id: "3268486b-813b-436b-b76a-a541d3db002f",
  name: {
    en: "Explain the Concept of a Class",
  },
  description: {
    methodological: "Understand a class as a definition of the structure and available operations of objects instantiated from it, such as the properties and methods of a hypothetical Counter. The class definition itself is not an instance with its own current count.",
    frontend: {
      en: "Understand a class as a definition from which individual objects are created.",
    },
  },
});
