import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { agriculturalEconomics_SkillGroup_Data } from './agriculturalEconomics/agriculturalEconomics.data';
import { economicsOfEducation_SkillGroup_Data } from './economicsOfEducation/economicsOfEducation.data';
import { healthEconomics_SkillGroup_Data } from './healthEconomics/healthEconomics.data';
import { housingAndRealEstate_SkillGroup_Data } from './housingAndRealEstate/housingAndRealEstate.data';
import { transportAndInfrastructure_SkillGroup_Data } from './transportAndInfrastructure/transportAndInfrastructure.data';
import { urbanAndRegionalEconomics_SkillGroup_Data } from './urbanAndRegionalEconomics/urbanAndRegionalEconomics.data';

export const appliedEconomics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "appliedEconomics",
  id: "260ae4e0-2cb0-473c-b241-bf6b0a1ca7a3",
  name: {
    en: "Прикладна економіка",
  },
  groups: {
    agriculturalEconomics: agriculturalEconomics_SkillGroup_Data,
    economicsOfEducation: economicsOfEducation_SkillGroup_Data,
    healthEconomics: healthEconomics_SkillGroup_Data,
    housingAndRealEstate: housingAndRealEstate_SkillGroup_Data,
    transportAndInfrastructure: transportAndInfrastructure_SkillGroup_Data,
    urbanAndRegionalEconomics: urbanAndRegionalEconomics_SkillGroup_Data,
  },
  description: {
    methodological: "Specialized markets and institutional conditions in cities, housing, transport, education, healthcare, and agriculture create distinct economic mechanisms. This domain examines sector-specific choices and consequences without duplicating geographic, medical, educational, or agricultural competencies.",
    frontend: {
      en: "Explore how economic principles apply to cities, housing, transport, education, healthcare, and farming.",
    },
  },
});
