import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { accessibleEnvironments_SkillGroup_Data } from './accessibleEnvironments/accessibleEnvironments.data';
import { physicalInteraction_SkillGroup_Data } from './physicalInteraction/physicalInteraction.data';
import { productErgonomics_SkillGroup_Data } from './productErgonomics/productErgonomics.data';
import { userNeeds_SkillGroup_Data } from './userNeeds/userNeeds.data';

export const humanCenteredEngineeringAndErgonomics_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'humanCenteredEngineeringAndErgonomics',
  id: 'ab2a8472-a7b8-4635-bd64-81026d7b037d',
  name: {
    en: 'Human-Centered Engineering and Ergonomics',
  },
  groups: {
    accessibleEnvironments: accessibleEnvironments_SkillGroup_Data,
    physicalInteraction: physicalInteraction_SkillGroup_Data,
    productErgonomics: productErgonomics_SkillGroup_Data,
    userNeeds: userNeeds_SkillGroup_Data,
  },
  description: {
    methodological:
      'Physical controls and built environments must suit real human capabilities. Engineering UX concerns shape, reach, grip, affordance, safe handling and access; digital navigation and software feedback are separate Informatics competencies.',
    frontend: {
      en: 'Discover how physical products and spaces can work for people with different needs.',
    },
  },
});
