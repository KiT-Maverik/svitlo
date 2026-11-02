import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainWhatConstitutesAMineralDeposit_Skill_Data, explainWhyAMineralDepositMayOrMayNotBeAnOre_Skill_Data, identifyGeographicConsequencesOfMineralExtraction_Skill_Data, interpretMineralResourceDistributionOnAMap_Skill_Data, recognizeGeologicalControlsOnMineralOccurrence_Skill_Data } from './skills';

export const mineralDeposits_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mineralDeposits",
  id: "6f0f106a-e902-496f-ac21-9139a97683fa",
  name: {
    en: "Mineral Deposits",
  },
  skills: {
    explainWhatConstitutesAMineralDeposit: explainWhatConstitutesAMineralDeposit_Skill_Data,
    explainWhyAMineralDepositMayOrMayNotBeAnOre: explainWhyAMineralDepositMayOrMayNotBeAnOre_Skill_Data,
    identifyGeographicConsequencesOfMineralExtraction: identifyGeographicConsequencesOfMineralExtraction_Skill_Data,
    interpretMineralResourceDistributionOnAMap: interpretMineralResourceDistributionOnAMap_Skill_Data,
    recognizeGeologicalControlsOnMineralOccurrence: recognizeGeologicalControlsOnMineralOccurrence_Skill_Data,
  },
  description: {
    methodological: "The geological distribution of useful concentrations of minerals is uneven and influenced by rock-forming processes, access and extraction decisions. A deposit is a natural concentration, while whether it can be worked as an ore is partly an economic and technical judgment.",
    frontend: {
      en: "Explore why useful mineral resources are concentrated in particular places.",
    },
  },
});
