import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { ancientSoutheastAsia_SkillGroup_Data } from './ancientSoutheastAsia/ancientSoutheastAsia.data';
import { indusCivilization_SkillGroup_Data } from './indusCivilization/indusCivilization.data';
import { religiousAndIntellectualTraditions_SkillGroup_Data } from './religiousAndIntellectualTraditions/religiousAndIntellectualTraditions.data';
import { societiesAndStatesOfAncientIndia_SkillGroup_Data } from './societiesAndStatesOfAncientIndia/societiesAndStatesOfAncientIndia.data';

export const southAndSoutheastAsia_SkillDomain_Data = buildSkillDomainConfig({
  slug: "southAndSoutheastAsia",
  id: "7cae92ab-143d-4cc9-9389-f5e1d9d659e9",
  name: {
    en: "Південна та Південно-Східна Азія",
  },
  groups: {
    ancientSoutheastAsia: ancientSoutheastAsia_SkillGroup_Data,
    indusCivilization: indusCivilization_SkillGroup_Data,
    religiousAndIntellectualTraditions: religiousAndIntellectualTraditions_SkillGroup_Data,
    societiesAndStatesOfAncientIndia: societiesAndStatesOfAncientIndia_SkillGroup_Data,
  },
  description: {
    methodological: "From Indus cities to South Asian empires and early Southeast Asian states, the region followed diverse urban, religious, and commercial trajectories.",
    frontend: {
      en: "Explore the ancient societies of South and Southeast Asia.",
    },
  },
});
