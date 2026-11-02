import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareSearchMethodsByCheckCount_Skill_Data = buildSkillConfig({
  slug: "compareSearchMethodsByCheckCount",
  id: "e06b06db-1e17-480b-92ac-d112d1faad1c",
  name: {
    en: "Compare Search Methods by Check Count",
  },
  description: {
    methodological: "Compare the number of opened positions in linear and binary search over the same dataset, distinguishing one lucky result from the algorithm's general guarantees.",
    frontend: {
      en: "Compare how many checks linear and binary searches need.",
    },
  },
});
