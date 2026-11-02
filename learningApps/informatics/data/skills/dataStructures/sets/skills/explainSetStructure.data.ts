import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainSetStructure_Skill_Data = buildSkillConfig({
  slug: "explainSetStructure",
  id: "4eb8ec63-1695-49cb-ab91-cb26136d67ad",
  name: {
    en: "Explain Set Structure",
  },
  description: {
    methodological: "A set consists of unique elements under a defined equality rule; inserting an existing value does not add another copy.",
    frontend: {
      en: "Understand why a set stores only one copy of each distinct element.",
    },
  },
});
