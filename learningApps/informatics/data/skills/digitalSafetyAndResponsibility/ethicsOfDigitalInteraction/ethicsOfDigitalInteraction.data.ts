import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { attributeDigitalMaterials_Skill_Data, chooseASafeWayToReportAProblem_Skill_Data, distinguishDigitalContentLicenses_Skill_Data, identifyAppropriateOnlineBehavior_Skill_Data } from './skills';

export const ethicsOfDigitalInteraction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ethicsOfDigitalInteraction",
  id: "3467c890-5d7a-4298-9939-9f8ec5d3b342",
  name: {
    en: "Ethics of Digital Interaction",
  },
  skills: {
    attributeDigitalMaterials: attributeDigitalMaterials_Skill_Data,
    chooseASafeWayToReportAProblem: chooseASafeWayToReportAProblem_Skill_Data,
    distinguishDigitalContentLicenses: distinguishDigitalContentLicenses_Skill_Data,
    identifyAppropriateOnlineBehavior: identifyAppropriateOnlineBehavior_Skill_Data,
  },
  description: {
    methodological: "Respect for other users and creators' rights, including recognizing bullying, attribution, and licensing conditions. Social norms and copyright differ from technical account protection.",
    frontend: {
      en: "Learn to communicate respectfully and respect creators' permissions.",
    },
  },
});
