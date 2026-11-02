import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { businessFluctuationsAndAggregateDemand_SkillGroup_Data } from './businessFluctuationsAndAggregateDemand/businessFluctuationsAndAggregateDemand.data';
import { growthAndProductivity_SkillGroup_Data } from './growthAndProductivity/growthAndProductivity.data';
import { nationalAccounts_SkillGroup_Data } from './nationalAccounts/nationalAccounts.data';
import { pricesAndEmployment_SkillGroup_Data } from './pricesAndEmployment/pricesAndEmployment.data';

export const macroeconomics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "macroeconomics",
  id: "572a8336-64b9-4c0e-9636-0f10cd4ab653",
  name: {
    en: "Макроекономіка",
  },
  groups: {
    businessFluctuationsAndAggregateDemand: businessFluctuationsAndAggregateDemand_SkillGroup_Data,
    growthAndProductivity: growthAndProductivity_SkillGroup_Data,
    nationalAccounts: nationalAccounts_SkillGroup_Data,
    pricesAndEmployment: pricesAndEmployment_SkillGroup_Data,
  },
  description: {
    methodological: "Aggregate production, employment, inflation, and economic change describe economy-wide relationships; their measures and models are not the same as each individual's wellbeing.",
    frontend: {
      en: "Explore how national output, prices, employment, and growth are connected.",
    },
  },
});
