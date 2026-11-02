import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { carbohydrateChemistry_Skill_Data, lipidChemistry_Skill_Data, nucleicAcidChemistry_Skill_Data, proteinChemistry_Skill_Data } from './skills';

export const moleculesOfLife_SkillGroup_Data = buildSkillGroupConfig({
  slug: "moleculesOfLife",
  id: "8d2574a8-f62f-4a76-a2e7-6c364869bdcd",
  name: {
    en: "Molecules of Life",
  },
  skills: {
    carbohydrateChemistry: carbohydrateChemistry_Skill_Data,
    lipidChemistry: lipidChemistry_Skill_Data,
    nucleicAcidChemistry: nucleicAcidChemistry_Skill_Data,
    proteinChemistry: proteinChemistry_Skill_Data,
  },
  description: {
    methodological: "Chemical structure explains molecular behavior that biology may later place in cellular or organismal context.",
    frontend: {
      en: "Explore the molecular structures behind important biological materials.",
    },
  },
});
