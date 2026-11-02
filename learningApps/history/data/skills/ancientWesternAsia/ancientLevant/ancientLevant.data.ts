import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { israelAndJudah_Skill_Data, phoenicianCities_Skill_Data, phoenicianWriting_Skill_Data, religionsOfTheAncientLevant_Skill_Data } from './skills';

export const ancientLevant_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientLevant",
  id: "f3fc5abb-b868-4b99-8f26-b103ad1d34e7",
  name: {
    en: "Левант",
  },
  skills: {
    israelAndJudah: israelAndJudah_Skill_Data,
    phoenicianCities: phoenicianCities_Skill_Data,
    phoenicianWriting: phoenicianWriting_Skill_Data,
    religionsOfTheAncientLevant: religionsOfTheAncientLevant_Skill_Data,
  },
  description: {
    methodological: "Coastal towns, inland kingdoms, and religious traditions formed at routes connecting Egypt, Anatolia, and Mesopotamia.",
    frontend: {
      en: "Explore the trading kingdoms and traditions of the Levant.",
    },
  },
});
