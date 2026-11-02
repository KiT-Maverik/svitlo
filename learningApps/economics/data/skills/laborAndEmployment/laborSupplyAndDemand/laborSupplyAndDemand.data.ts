import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { automationAndEmployment_Skill_Data, humanCapital_Skill_Data, laborDemand_Skill_Data, laborSupply_Skill_Data, wageDetermination_Skill_Data, workLeisureTradeoff_Skill_Data } from './skills';

export const laborSupplyAndDemand_SkillGroup_Data = buildSkillGroupConfig({
  slug: "laborSupplyAndDemand",
  id: "97b9982e-cbf5-428f-83e6-a05ee6cfa142",
  name: {
    en: "Пропозиція та попит на працю",
  },
  skills: {
    automationAndEmployment: automationAndEmployment_Skill_Data,
    humanCapital: humanCapital_Skill_Data,
    laborDemand: laborDemand_Skill_Data,
    laborSupply: laborSupply_Skill_Data,
    wageDetermination: wageDetermination_Skill_Data,
    workLeisureTradeoff: workLeisureTradeoff_Skill_Data,
  },
  description: {
    methodological: "Workers and employers make interdependent decisions about working time, skills, wages, and numbers of jobs.",
    frontend: {
      en: "Understand how workers and businesses shape the market for labor.",
    },
  },
});
