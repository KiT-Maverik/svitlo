import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectContradictoryRules_Skill_Data = buildSkillConfig({
  slug: "detectContradictoryRules",
  id: "088c6d02-54c7-4d35-ac1d-e4bbfacb1afe",
  name: {
    en: "Detect Contradictory Rules",
  },
  description: {
    methodological: "Show when two or more requirements cannot hold under the same conditions: for example, an object cannot simultaneously be located exclusively in room A and exclusively in room B. The focus is rule consistency rather than program execution order.",
    frontend: {
      en: "Recognize when two requirements cannot both be true.",
    },
  },
});
