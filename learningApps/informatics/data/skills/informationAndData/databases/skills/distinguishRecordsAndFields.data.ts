import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishRecordsAndFields_Skill_Data = buildSkillConfig({
  slug: "distinguishRecordsAndFields",
  id: "9a87da4e-6ba1-4bb8-9dbb-da5cdccac9ef",
  name: {
    en: "Distinguish Records and Fields",
  },
  description: {
    methodological: "Identify a row as a record of one entity or occurrence, and a column as a named field describing an attribute. A cell's particular value is not the definition of a field.",
    frontend: {
      en: "Distinguish a record from the fields that describe it.",
    },
  },
});
