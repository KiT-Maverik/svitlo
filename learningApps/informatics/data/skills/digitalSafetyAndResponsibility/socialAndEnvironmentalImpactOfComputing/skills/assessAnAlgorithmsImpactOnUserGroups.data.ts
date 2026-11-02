import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessAnAlgorithmsImpactOnUserGroups_Skill_Data = buildSkillConfig({
  slug: "assessAnAlgorithmsImpactOnUserGroups",
  id: "0dc61117-ff0c-4434-92db-942f95611079",
  name: {
    en: "Assess an Algorithm's Impact on User Groups",
  },
  description: {
    methodological: "Compare whether an automated rule produces different consequences for people with different characteristics or needs, and explain potential reasons. An identical formal rule does not necessarily yield an equally fair outcome.",
    frontend: {
      en: "Consider whether an algorithm's outcomes differ unfairly between user groups.",
    },
  },
});
