import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { archaeologicalDating_Skill_Data, archaeologicalSources_Skill_Data, sourceCriticism_Skill_Data, visualHistoricalSources_Skill_Data, writtenHistoricalSources_Skill_Data } from './skills';

export const historicalSources_SkillGroup_Data = buildSkillGroupConfig({
  slug: "historicalSources",
  id: "fc29c26b-6ca0-40b1-9246-a06a13396dbb",
  name: {
    en: "Джерела",
  },
  skills: {
    archaeologicalDating: archaeologicalDating_Skill_Data,
    archaeologicalSources: archaeologicalSources_Skill_Data,
    sourceCriticism: sourceCriticism_Skill_Data,
    visualHistoricalSources: visualHistoricalSources_Skill_Data,
    writtenHistoricalSources: writtenHistoricalSources_Skill_Data,
  },
  description: {
    methodological: "Material, written, and visual traces differ in how they were created, preserved, and interpreted and in their reliability.",
    frontend: {
      en: "Explore what artifacts, texts and images can reveal about history.",
    },
  },
});
