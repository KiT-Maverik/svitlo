import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { humanEnvironmentInteractions_SkillGroup_Data } from './humanEnvironmentInteractions/humanEnvironmentInteractions.data';
import { naturalResources_SkillGroup_Data } from './naturalResources/naturalResources.data';

export const environmentAndSociety_SkillDomain_Data = buildSkillDomainConfig({
  slug: "environmentAndSociety",
  id: "2dba802b-84f8-48a6-90da-d115e9628407",
  name: {
    en: "Environment and Society",
  },
  groups: {
    humanEnvironmentInteractions: humanEnvironmentInteractions_SkillGroup_Data,
    naturalResources: naturalResources_SkillGroup_Data,
  },
  description: {
    methodological: "Natural resources, environmental constraints and human decisions influence one another across space. Geography examines rates of resource renewal, adaptation to local conditions, transformations of land and the travel of impacts between connected regions.",
    frontend: {
      en: "Explore how natural resources, local conditions and human decisions affect one another.",
    },
  },
});
