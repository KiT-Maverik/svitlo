import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adaptationToEnvironments_Skill_Data, emergenceOfHomoSapiens_Skill_Data, originsOfHomo_Skill_Data, peoplingOfContinents_Skill_Data } from './skills';

export const humanOriginsAndDispersal_SkillGroup_Data = buildSkillGroupConfig({
  slug: "humanOriginsAndDispersal",
  id: "34016e25-e0ac-45f4-be94-9db66febf661",
  name: {
    en: "Походження та розселення",
  },
  skills: {
    adaptationToEnvironments: adaptationToEnvironments_Skill_Data,
    emergenceOfHomoSapiens: emergenceOfHomoSapiens_Skill_Data,
    originsOfHomo: originsOfHomo_Skill_Data,
    peoplingOfContinents: peoplingOfContinents_Skill_Data,
  },
  description: {
    methodological: "Paleoanthropology, archaeology, and genetics jointly investigate human origins; major developments occurred at different times across regions.",
    frontend: {
      en: "Discover what evidence reveals about our ancestors and migrations.",
    },
  },
});
