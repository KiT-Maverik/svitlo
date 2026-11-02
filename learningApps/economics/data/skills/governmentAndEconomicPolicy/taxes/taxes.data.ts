import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { directAndIndirectTaxes_Skill_Data, taxIncidence_Skill_Data, taxProgressivity_Skill_Data } from './skills';

export const taxes_SkillGroup_Data = buildSkillGroupConfig({
  slug: "taxes",
  id: "9cf49796-f5b6-4d6d-b3da-9c297159ed0a",
  name: {
    en: "Податки",
  },
  skills: {
    directAndIndirectTaxes: directAndIndirectTaxes_Skill_Data,
    taxIncidence: taxIncidence_Skill_Data,
    taxProgressivity: taxProgressivity_Skill_Data,
  },
  description: {
    methodological: "Mandatory payments finance public revenue and can change the behavior of buyers, workers, and firms.",
    frontend: {
      en: "Understand how taxes raise public funds and influence decisions.",
    },
  },
});
