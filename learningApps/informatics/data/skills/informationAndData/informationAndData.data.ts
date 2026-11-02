import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { databases_SkillGroup_Data } from './databases/databases.data';
import { dataCollectionAndOrganization_SkillGroup_Data } from './dataCollectionAndOrganization/dataCollectionAndOrganization.data';
import { informationSearchAndVerification_SkillGroup_Data } from './informationSearchAndVerification/informationSearchAndVerification.data';
import { probabilityAndUncertainty_SkillGroup_Data } from './probabilityAndUncertainty/probabilityAndUncertainty.data';
import { statisticalInvestigation_SkillGroup_Data } from './statisticalInvestigation/statisticalInvestigation.data';

export const informationAndData_SkillDomain_Data = buildSkillDomainConfig({
  slug: "informationAndData",
  id: "a6147899-9aae-4981-988a-8f3562a72a47",
  name: {
    en: "Information and Data",
  },
  groups: {
    databases: databases_SkillGroup_Data,
    dataCollectionAndOrganization: dataCollectionAndOrganization_SkillGroup_Data,
    informationSearchAndVerification: informationSearchAndVerification_SkillGroup_Data,
    probabilityAndUncertainty: probabilityAndUncertainty_SkillGroup_Data,
    statisticalInvestigation: statisticalInvestigation_SkillGroup_Data,
  },
  description: {
    methodological: "Obtaining and verifying information, organizing datasets, finding patterns, and reasoning about uncertain events. A digital setting may overlap with mathematics, but these skills are classified locally within Informatics.",
    frontend: {
      en: "Explore how to find trustworthy information, organize data and reason about uncertainty.",
    },
  },
});
