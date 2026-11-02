import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { justiceAndEquality_SkillGroup_Data } from './justiceAndEquality/justiceAndEquality.data';
import { philosophyOfLaw_SkillGroup_Data } from './philosophyOfLaw/philosophyOfLaw.data';
import { politicalAuthority_SkillGroup_Data } from './politicalAuthority/politicalAuthority.data';
import { publicReasonAndCivicLife_SkillGroup_Data } from './publicReasonAndCivicLife/publicReasonAndCivicLife.data';
import { rightsAndLiberty_SkillGroup_Data } from './rightsAndLiberty/rightsAndLiberty.data';
import { technologyAndSociety_SkillGroup_Data } from './technologyAndSociety/technologyAndSociety.data';

export const socialAndPoliticalPhilosophy_SkillDomain_Data = buildSkillDomainConfig({
  slug: "socialAndPoliticalPhilosophy",
  id: "8b7b2f42-79a4-42ac-b363-f24597ed954e",
  name: {
    en: "Social and Political Philosophy",
  },
  groups: {
    justiceAndEquality: justiceAndEquality_SkillGroup_Data,
    philosophyOfLaw: philosophyOfLaw_SkillGroup_Data,
    politicalAuthority: politicalAuthority_SkillGroup_Data,
    publicReasonAndCivicLife: publicReasonAndCivicLife_SkillGroup_Data,
    rightsAndLiberty: rightsAndLiberty_SkillGroup_Data,
    technologyAndSociety: technologyAndSociety_SkillGroup_Data,
  },
  description: {
    methodological: "Political and social philosophy examines the justification of collective rules, institutions, authority, rights, and distributions of benefits and burdens. It asks normative questions rather than describing the chronology of regimes or the mechanics of markets.",
    frontend: {
      en: "Examine the moral foundations of laws, rights, authority and shared social decisions.",
    },
  },
});
