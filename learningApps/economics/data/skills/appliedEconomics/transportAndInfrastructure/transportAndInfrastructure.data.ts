import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { congestionEconomics_Skill_Data, infrastructureInvestmentAppraisal_Skill_Data, transportDemand_Skill_Data } from './skills';

export const transportAndInfrastructure_SkillGroup_Data = buildSkillGroupConfig({
  slug: "transportAndInfrastructure",
  id: "e9ddae22-2b8e-4528-859e-b785fa71826e",
  name: {
    en: "Транспорт та інфраструктура",
  },
  skills: {
    congestionEconomics: congestionEconomics_Skill_Data,
    infrastructureInvestmentAppraisal: infrastructureInvestmentAppraisal_Skill_Data,
    transportDemand: transportDemand_Skill_Data,
  },
  description: {
    methodological: "Moving people and goods creates direct and external costs, while infrastructure requires large initial investments and lasts for long periods.",
    frontend: {
      en: "Discover the economic trade-offs behind transport and public infrastructure.",
    },
  },
});
