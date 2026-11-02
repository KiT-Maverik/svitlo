import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compoundInterest_Skill_Data, emergencySavings_Skill_Data, investmentDiversification_Skill_Data, realReturn_Skill_Data, simpleInterest_Skill_Data } from './skills';

export const savingAndInvesting_SkillGroup_Data = buildSkillGroupConfig({
  slug: "savingAndInvesting",
  id: "ffbe5d73-9743-4bcd-8b75-ea58ff5e71d2",
  name: {
    en: "Заощадження й інвестування",
  },
  skills: {
    compoundInterest: compoundInterest_Skill_Data,
    emergencySavings: emergencySavings_Skill_Data,
    investmentDiversification: investmentDiversification_Skill_Data,
    realReturn: realReturn_Skill_Data,
    simpleInterest: simpleInterest_Skill_Data,
  },
  description: {
    methodological: "Moving purchasing power into the future involves liquidity, returns, risk, and inflation.",
    frontend: {
      en: "Explore why saving and investing involve different risks and benefits.",
    },
  },
});
