import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { accessToFinanceAndBasicServices_Skill_Data, corruptionAndEconomicIncentives_Skill_Data, inclusiveEconomicInstitutions_Skill_Data } from './skills';

export const institutionsAndDevelopment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "institutionsAndDevelopment",
  id: "fa842ffe-51ee-44f4-afb0-5d10d36f149f",
  name: {
    en: "Інституції та розвиток",
  },
  skills: {
    accessToFinanceAndBasicServices: accessToFinanceAndBasicServices_Skill_Data,
    corruptionAndEconomicIncentives: corruptionAndEconomicIncentives_Skill_Data,
    inclusiveEconomicInstitutions: inclusiveEconomicInstitutions_Skill_Data,
  },
  description: {
    methodological: "Rules, trust, state capacity, and access to resources influence investment and economic opportunity.",
    frontend: {
      en: "Explore how institutions affect a society's chances of prosperity.",
    },
  },
});
