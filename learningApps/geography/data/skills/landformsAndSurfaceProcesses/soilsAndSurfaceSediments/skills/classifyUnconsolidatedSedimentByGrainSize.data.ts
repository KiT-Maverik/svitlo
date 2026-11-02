import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const classifyUnconsolidatedSedimentByGrainSize_Skill_Data = buildSkillConfig({
  slug: "classifyUnconsolidatedSedimentByGrainSize",
  id: "278fd5c5-393b-49f6-81b3-9f92055c9ed8",
  name: {
    en: "Classify unconsolidated sediment by grain size",
  },
  description: {
    methodological: "Distinguish coarser gravel and sand from finer silt and clay by relative particle size and observed texture, without treating soil categories as identical to rock types.",
    frontend: {
      en: "Distinguish gravel, sand, silt and clay by particle size.",
    },
  },
});
