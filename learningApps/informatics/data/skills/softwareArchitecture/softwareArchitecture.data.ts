import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { designPrinciples_SkillGroup_Data } from './designPrinciples/designPrinciples.data';
import { objectModel_SkillGroup_Data } from './objectModel/objectModel.data';

export const softwareArchitecture_SkillDomain_Data = buildSkillDomainConfig({
  slug: "softwareArchitecture",
  id: "8a0f1f02-6865-4cfd-b524-13d48e4f3177",
  name: {
    en: "Software Architecture",
  },
  groups: {
    designPrinciples: designPrinciples_SkillGroup_Data,
    objectModel: objectModel_SkillGroup_Data,
  },
  description: {
    methodological: "Explains program structure through objects, contracts, responsibilities, and dependencies. Design patterns form a separate domain of reusable solutions to object creation, composition, and behavior.",
    frontend: {
      en: "Explore how objects, responsibilities and dependencies organize reliable software.",
    },
  },
});
