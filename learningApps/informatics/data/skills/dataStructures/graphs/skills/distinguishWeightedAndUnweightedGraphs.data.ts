import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishWeightedAndUnweightedGraphs_Skill_Data = buildSkillConfig({
  slug: "distinguishWeightedAndUnweightedGraphs",
  id: "6c7fba6b-cf2e-4189-af8a-71dbcb3319ad",
  name: {
    en: "Distinguish Weighted and Unweighted Graphs",
  },
  description: {
    methodological: "Identify how numeric edge weights can represent time, distance, or cost rather than simply whether a link exists.",
    frontend: {
      en: "Recognize when graph connections carry numbers such as distance or cost.",
    },
  },
});
