import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { collectiveBargaining_Skill_Data, employmentContracts_Skill_Data, minimumWage_Skill_Data } from './skills';

export const laborInstitutions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "laborInstitutions",
  id: "3256784f-e258-4049-9ea3-41d886351fee",
  name: {
    en: "Трудові інституції",
  },
  skills: {
    collectiveBargaining: collectiveBargaining_Skill_Data,
    employmentContracts: employmentContracts_Skill_Data,
    minimumWage: minimumWage_Skill_Data,
  },
  description: {
    methodological: "Employment relationships operate under contracts, collective bargaining, and legal protections.",
    frontend: {
      en: "Explore how contracts and labor rules shape working conditions.",
    },
  },
});
