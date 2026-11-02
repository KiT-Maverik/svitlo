import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bankDeposits_Skill_Data, bankLending_Skill_Data, bankLiquidity_Skill_Data } from './skills';

export const banksAndCreditIntermediation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "banksAndCreditIntermediation",
  id: "651971f7-1aaf-4476-8892-562958ccbcff",
  name: {
    en: "Банки та кредитне посередництво",
  },
  skills: {
    bankDeposits: bankDeposits_Skill_Data,
    bankLending: bankLending_Skill_Data,
    bankLiquidity: bankLiquidity_Skill_Data,
  },
  description: {
    methodological: "Financial intermediaries connect savers and borrowers and manage liquidity and payment infrastructure.",
    frontend: {
      en: "Understand how banks connect savings, loans, and payments.",
    },
  },
});
