import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const collectDataConsistently_Skill_Data = buildSkillConfig({
  slug: "collectDataConsistently",
  id: "e8d82925-d952-4f95-b26a-21e5cbfa5ba6",
  name: {
    en: "Collect Data Consistently",
  },
  description: {
    methodological: "Gather records using a predefined procedure with the same units and attributes for each observation. Changing the procedure midway may make parts of the dataset difficult to compare.",
    frontend: {
      en: "Collect measurements using consistent rules and units.",
    },
  },
});
