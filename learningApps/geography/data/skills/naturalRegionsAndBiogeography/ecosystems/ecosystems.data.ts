import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishMarineAndFreshwaterEcosystems_Skill_Data, explainHabitatFragmentationAsAGeographicProcess_Skill_Data, interpretConnectivityBetweenNaturalHabitats_Skill_Data, interpretGeographicPatternsOfBiodiversity_Skill_Data } from './skills';

export const ecosystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ecosystems",
  id: "6906d7a0-bd98-4a35-b568-e7113497b27a",
  name: {
    en: "Ecosystems",
  },
  skills: {
    distinguishMarineAndFreshwaterEcosystems: distinguishMarineAndFreshwaterEcosystems_Skill_Data,
    explainHabitatFragmentationAsAGeographicProcess: explainHabitatFragmentationAsAGeographicProcess_Skill_Data,
    interpretConnectivityBetweenNaturalHabitats: interpretConnectivityBetweenNaturalHabitats_Skill_Data,
    interpretGeographicPatternsOfBiodiversity: interpretGeographicPatternsOfBiodiversity_Skill_Data,
  },
  description: {
    methodological: "Ecosystems develop under different physical conditions on land and in water, and can vary markedly in spatial extent and connectivity. Geography focuses on the distributions of terrestrial, marine and freshwater environments, their boundaries, fragmentation and regional relationships, rather than organism physiology.",
    frontend: {
      en: "Explore where different ecosystems occur and how they connect across landscapes.",
    },
  },
});
