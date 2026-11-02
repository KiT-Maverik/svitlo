import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainADatabaseTable_Skill_Data = buildSkillConfig({
  slug: "explainADatabaseTable",
  id: "496da37a-d415-4646-a8d2-9f0018435cf5",
  name: {
    en: "Explain a Database Table",
  },
  description: {
    methodological: "Describe how a relational table stores records of one type using a common set of fields, such as a book catalog. A formatted table in a document is not automatically a database.",
    frontend: {
      en: "Understand how a database table stores similar kinds of records.",
    },
  },
});
