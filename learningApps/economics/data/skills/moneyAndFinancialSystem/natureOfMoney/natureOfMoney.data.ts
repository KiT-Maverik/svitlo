import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { formsOfMoney_Skill_Data, functionsOfMoney_Skill_Data, purchasingPowerOfMoney_Skill_Data } from './skills';

export const natureOfMoney_SkillGroup_Data = buildSkillGroupConfig({
  slug: "natureOfMoney",
  id: "8c68d53f-7f7c-448d-8be5-b7b62e7bde99",
  name: {
    en: "Природа грошей",
  },
  skills: {
    formsOfMoney: formsOfMoney_Skill_Data,
    functionsOfMoney: functionsOfMoney_Skill_Data,
    purchasingPowerOfMoney: purchasingPowerOfMoney_Skill_Data,
  },
  description: {
    methodological: "Money functions as a generally accepted means of payment and a unit for measuring value across different institutional forms.",
    frontend: {
      en: "Explore what makes something useful as money.",
    },
  },
});
