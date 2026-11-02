import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { lateBronzeAgeCollapse_Skill_Data, minoanCivilization_Skill_Data, mycenaeanCivilization_Skill_Data } from './skills';

export const aegeanBronzeAge_SkillGroup_Data = buildSkillGroupConfig({
  slug: "aegeanBronzeAge",
  id: "ae48e3b7-4b07-423a-868c-6cd00f5d56b5",
  name: {
    en: "Егейська бронзова доба",
  },
  skills: {
    lateBronzeAgeCollapse: lateBronzeAgeCollapse_Skill_Data,
    minoanCivilization: minoanCivilization_Skill_Data,
    mycenaeanCivilization: mycenaeanCivilization_Skill_Data,
  },
  description: {
    methodological: "Island and mainland palace centers are known through archaeology, material exchange, and surviving writing systems.",
    frontend: {
      en: "Discover the palace societies of the Bronze Age Aegean.",
    },
  },
});
