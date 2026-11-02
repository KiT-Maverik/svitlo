import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareResourceStorageAndGeneration_Skill_Data, configureGeneratorParameters_Skill_Data, explainProceduralResourceGeneration_Skill_Data, reproduceResultsUsingAGenerationSeed_Skill_Data } from './skills';

export const proceduralGeneration_SkillGroup_Data = buildSkillGroupConfig({
  slug: "proceduralGeneration",
  id: "9db6f9e5-6ec4-45dc-b07d-907575574e25",
  name: {
    en: "Procedural Generation",
  },
  skills: {
    compareResourceStorageAndGeneration: compareResourceStorageAndGeneration_Skill_Data,
    configureGeneratorParameters: configureGeneratorParameters_Skill_Data,
    explainProceduralResourceGeneration: explainProceduralResourceGeneration_Skill_Data,
    reproduceResultsUsingAGenerationSeed: reproduceResultsUsingAGenerationSeed_Skill_Data,
  },
  description: {
    methodological: "Produce images, sounds, objects, or game worlds through rules and parameters instead of storing every finished variant. Distinguish parameter changes, reproducibility through a seed, and resource trade-offs.",
    frontend: {
      en: "Discover how algorithms can create many content variations from compact rules.",
    },
  },
});
