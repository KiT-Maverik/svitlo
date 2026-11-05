import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  buildingEnvelopes_Skill_Data,
  designAccessibleBuildingCirculation_Skill_Data,
  identifyStructuralBuildingSystems_Skill_Data,
  relateBuildingDesignToASite_Skill_Data,
} from './skills';

export const buildings_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'buildings',
  id: '356dd08c-bff1-4177-8264-a0db71f5e130',
  name: {
    en: 'Buildings',
  },
  skills: {
    buildingEnvelopes: buildingEnvelopes_Skill_Data,
    designAccessibleBuildingCirculation: designAccessibleBuildingCirculation_Skill_Data,
    identifyStructuralBuildingSystems: identifyStructuralBuildingSystems_Skill_Data,
    relateBuildingDesignToASite: relateBuildingDesignToASite_Skill_Data,
  },
  description: {
    methodological:
      'A complete building combines its main structure with weather protection, spatial access and environmental adaptation.',
    frontend: {
      en: 'Explore how buildings combine structural support and environmental protection.',
    },
  },
});
