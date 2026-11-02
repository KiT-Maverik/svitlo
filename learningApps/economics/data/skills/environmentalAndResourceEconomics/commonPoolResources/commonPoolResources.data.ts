import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { commonPoolResourceCharacteristics_Skill_Data, commonResourceGovernance_Skill_Data, renewableResourceDepletion_Skill_Data } from './skills';

export const commonPoolResources_SkillGroup_Data = buildSkillGroupConfig({
  slug: "commonPoolResources",
  id: "fde81938-6b51-4c84-ab2a-564dcb36a018",
  name: {
    en: "Спільні ресурси",
  },
  skills: {
    commonPoolResourceCharacteristics: commonPoolResourceCharacteristics_Skill_Data,
    commonResourceGovernance: commonResourceGovernance_Skill_Data,
    renewableResourceDepletion: renewableResourceDepletion_Skill_Data,
  },
  description: {
    methodological: "Competition for use and difficulty excluding access create the risk of extracting too much from shared resources.",
    frontend: {
      en: "Discover why commonly used resources can be overused.",
    },
  },
});
