import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishAPhysicalQuantityFromItsUnitOfMeasurement_Skill_Data = buildSkillConfig({
  slug: "distinguishAPhysicalQuantityFromItsUnitOfMeasurement",
  id: "edafd70f-57d0-427c-8adf-5ff7ab8773fd",
  name: {
    en: "Distinguish a physical quantity from its unit of measurement",
  },
  description: {
    methodological: "A physical quantity describes a property of a body or phenomenon, whereas a unit establishes an agreed scale for expressing it numerically; length and centimeter serve different roles.",
    frontend: {
      en: "Distinguish the property being measured from the unit used to express it.",
    },
  },
});
