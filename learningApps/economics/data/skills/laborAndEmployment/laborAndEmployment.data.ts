import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { employmentAndMobility_SkillGroup_Data } from './employmentAndMobility/employmentAndMobility.data';
import { laborInstitutions_SkillGroup_Data } from './laborInstitutions/laborInstitutions.data';
import { laborSupplyAndDemand_SkillGroup_Data } from './laborSupplyAndDemand/laborSupplyAndDemand.data';

export const laborAndEmployment_SkillDomain_Data = buildSkillDomainConfig({
  slug: "laborAndEmployment",
  id: "4b9fa7b8-6993-4e94-8654-59396cae6193",
  name: {
    en: "Праця та зайнятість",
  },
  groups: {
    employmentAndMobility: employmentAndMobility_SkillGroup_Data,
    laborInstitutions: laborInstitutions_SkillGroup_Data,
    laborSupplyAndDemand: laborSupplyAndDemand_SkillGroup_Data,
  },
  description: {
    methodological: "Labor markets connect working time, qualifications, pay, vacancies, and hiring rules. This domain distinguishes individual work decisions from aggregate unemployment.",
    frontend: {
      en: "Explore how workers and employers make decisions about jobs, skills, and pay.",
    },
  },
});
