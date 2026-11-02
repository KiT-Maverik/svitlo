import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { economicSystems_SkillGroup_Data } from './economicSystems/economicSystems.data';
import { historicalEconomicTransformations_SkillGroup_Data } from './historicalEconomicTransformations/historicalEconomicTransformations.data';
import { schoolsOfEconomicThought_SkillGroup_Data } from './schoolsOfEconomicThought/schoolsOfEconomicThought.data';

export const economicHistoryAndIdeas_SkillDomain_Data = buildSkillDomainConfig({
  slug: "economicHistoryAndIdeas",
  id: "54e286e8-7e77-4af3-b029-72d463ded63e",
  name: {
    en: "Економічна історія та ідеї",
  },
  groups: {
    economicSystems: economicSystems_SkillGroup_Data,
    historicalEconomicTransformations: historicalEconomicTransformations_SkillGroup_Data,
    schoolsOfEconomicThought: schoolsOfEconomicThought_SkillGroup_Data,
  },
  description: {
    methodological: "Economic systems, institutions, and theories evolved alongside production, trade, and social conflicts. Historical interpretations require context and comparisons of sources.",
    frontend: {
      en: "Explore how economies and economic ideas have changed through history.",
    },
  },
});
