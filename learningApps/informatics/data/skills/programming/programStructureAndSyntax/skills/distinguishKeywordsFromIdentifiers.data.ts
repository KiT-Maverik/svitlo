import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishKeywordsFromIdentifiers_Skill_Data = buildSkillConfig({
  slug: "distinguishKeywordsFromIdentifiers",
  id: "904f7ab8-8e5a-4b09-a57d-4b87bf21a48b",
  name: {
    en: "Distinguish Keywords from Identifiers",
  },
  description: {
    methodological: "Separate reserved language constructs from programmer-chosen names for variables and functions; naming rules vary by language.",
    frontend: {
      en: "Distinguish language keywords from names chosen by programmers.",
    },
  },
});
