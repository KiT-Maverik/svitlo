import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { personalHygiene_SkillGroup_Data } from './personalHygiene/personalHygiene.data';
import { sanitaryEnvironments_SkillGroup_Data } from './sanitaryEnvironments/sanitaryEnvironments.data';
import { transmissionAndProtection_SkillGroup_Data } from './transmissionAndProtection/transmissionAndProtection.data';

export const hygieneAndInfectionPrevention_SkillDomain_Data = buildSkillDomainConfig({
  slug: "hygieneAndInfectionPrevention",
  id: "7f26dddd-06b5-4492-bbc6-68cfb13f54c9",
  name: {
    en: "Hygiene and Infection Prevention",
  },
  groups: {
    personalHygiene: personalHygiene_SkillGroup_Data,
    sanitaryEnvironments: sanitaryEnvironments_SkillGroup_Data,
    transmissionAndProtection: transmissionAndProtection_SkillGroup_Data,
  },
  description: {
    methodological: "Disease prevention includes reducing contact with infectious agents and maintaining sanitary conditions. This domain concerns personal and environmental prevention, not microbiological taxonomy or clinical infection treatment.",
    frontend: {
      en: "Explore practical ways to reduce infections through hygiene and safer environments.",
    },
  },
});
