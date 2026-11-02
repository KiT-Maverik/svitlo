import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { commonPoolResources_SkillGroup_Data } from './commonPoolResources/commonPoolResources.data';
import { environmentalIncentivesAndPolicy_SkillGroup_Data } from './environmentalIncentivesAndPolicy/environmentalIncentivesAndPolicy.data';
import { sustainabilityAndIntertemporalChoice_SkillGroup_Data } from './sustainabilityAndIntertemporalChoice/sustainabilityAndIntertemporalChoice.data';

export const environmentalAndResourceEconomics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "environmentalAndResourceEconomics",
  id: "b024a531-e8f6-4eca-abcd-352668390df1",
  name: {
    en: "Економіка довкілля та ресурсів",
  },
  groups: {
    commonPoolResources: commonPoolResources_SkillGroup_Data,
    environmentalIncentivesAndPolicy: environmentalIncentivesAndPolicy_SkillGroup_Data,
    sustainabilityAndIntertemporalChoice: sustainabilityAndIntertemporalChoice_SkillGroup_Data,
  },
  description: {
    methodological: "Production and consumption depend on ecosystems, resources, and the environment's capacity to absorb impacts. This domain examines economic incentives, valuation, and rules governing nature rather than the physics or biology of underlying processes.",
    frontend: {
      en: "Explore how economic decisions affect natural resources and the environment.",
    },
  },
});
