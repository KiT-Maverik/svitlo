import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishNecessaryFromSufficientConditions_Skill_Data = buildSkillConfig({
  slug: "distinguishNecessaryFromSufficientConditions",
  id: "fa7a23aa-5680-4edc-ac28-c1fd48bdfa46",
  name: {
    en: "Distinguish necessary from sufficient conditions",
  },
  description: {
    methodological: "Determine whether a proposed property is required for a concept to apply, enough for it to apply, or both; a condition can fail one test and pass the other.",
    frontend: {
      en: "Determine whether a condition is required, sufficient, both or neither.",
    },
  },
});
