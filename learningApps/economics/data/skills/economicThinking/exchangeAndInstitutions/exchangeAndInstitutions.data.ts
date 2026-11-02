import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { divisionOfLabor_Skill_Data, gainsFromVoluntaryExchange_Skill_Data, propertyRights_Skill_Data, transactionCosts_Skill_Data } from './skills';

export const exchangeAndInstitutions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "exchangeAndInstitutions",
  id: "50673eda-6225-46e8-beb7-6529231473af",
  name: {
    en: "Обмін та інституції",
  },
  skills: {
    divisionOfLabor: divisionOfLabor_Skill_Data,
    gainsFromVoluntaryExchange: gainsFromVoluntaryExchange_Skill_Data,
    propertyRights: propertyRights_Skill_Data,
    transactionCosts: transactionCosts_Skill_Data,
  },
  description: {
    methodological: "Cooperation and resource allocation depend on specialization, agreements, rights, and mechanisms for enforcing them.",
    frontend: {
      en: "Explore how agreements and rules help people cooperate and exchange.",
    },
  },
});
