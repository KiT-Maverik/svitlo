import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { designASimpleDatabaseSchema_Skill_Data, distinguishRecordsAndFields_Skill_Data, explainADatabaseTable_Skill_Data, explainPrimaryKeys_Skill_Data, modelRelationshipsBetweenTables_Skill_Data } from './skills';

export const databases_SkillGroup_Data = buildSkillGroupConfig({
  slug: "databases",
  id: "981dcc4c-1344-44b6-af1c-18d8a4d3f391",
  name: {
    en: "Databases",
  },
  skills: {
    designASimpleDatabaseSchema: designASimpleDatabaseSchema_Skill_Data,
    distinguishRecordsAndFields: distinguishRecordsAndFields_Skill_Data,
    explainADatabaseTable: explainADatabaseTable_Skill_Data,
    explainPrimaryKeys: explainPrimaryKeys_Skill_Data,
    modelRelationshipsBetweenTables: modelRelationshipsBetweenTables_Skill_Data,
  },
  description: {
    methodological: "Structured storage of interrelated information differs from a table laid out only for human reading. Records and fields define the structure, keys identify records, and relationships connect information across tables.",
    frontend: {
      en: "Discover how databases structure records and connect related information.",
    },
  },
});
