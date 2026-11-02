import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const modelRelationshipsBetweenTables_Skill_Data = buildSkillConfig({
  slug: "modelRelationshipsBetweenTables",
  id: "c5a78cb5-08f9-4ca8-8c72-e8bfc889e7bc",
  name: {
    en: "Model Relationships Between Tables",
  },
  description: {
    methodological: "Explain how identifiers link records from different tables, such as a `studentId` in a completed-assignment record referencing a particular student. Distinguish a record's own key from a reference to another record.",
    frontend: {
      en: "Connect information in different tables using identifiers.",
    },
  },
});
