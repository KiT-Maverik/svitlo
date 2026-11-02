import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { collectDataConsistently_Skill_Data, groupDataByAttribute_Skill_Data, identifyDataNeededForATask_Skill_Data, presentDataInATable_Skill_Data } from './skills';

export const dataCollectionAndOrganization_SkillGroup_Data = buildSkillGroupConfig({
  slug: "dataCollectionAndOrganization",
  id: "c32c008f-12e8-4595-abbd-ee17221cf40c",
  name: {
    en: "Data Collection and Organization",
  },
  skills: {
    collectDataConsistently: collectDataConsistently_Skill_Data,
    groupDataByAttribute: groupDataByAttribute_Skill_Data,
    identifyDataNeededForATask: identifyDataNeededForATask_Skill_Data,
    presentDataInATable: presentDataInATable_Skill_Data,
  },
  description: {
    methodological: "Identify required fields, record observations consistently, classify by an attribute, and organize a table. Collecting data generates records; tabulation structures existing records.",
    frontend: {
      en: "Learn to collect relevant information and organize comparable records.",
    },
  },
});
