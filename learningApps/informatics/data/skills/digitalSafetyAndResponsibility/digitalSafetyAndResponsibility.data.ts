import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { accountProtection_SkillGroup_Data } from './accountProtection/accountProtection.data';
import { ethicsOfDigitalInteraction_SkillGroup_Data } from './ethicsOfDigitalInteraction/ethicsOfDigitalInteraction.data';
import { privacy_SkillGroup_Data } from './privacy/privacy.data';
import { socialAndEnvironmentalImpactOfComputing_SkillGroup_Data } from './socialAndEnvironmentalImpactOfComputing/socialAndEnvironmentalImpactOfComputing.data';

export const digitalSafetyAndResponsibility_SkillDomain_Data = buildSkillDomainConfig({
  slug: "digitalSafetyAndResponsibility",
  id: "dc767f18-884a-4ab2-94ba-78444383a3fd",
  name: {
    en: "Digital Safety and Responsibility",
  },
  groups: {
    accountProtection: accountProtection_SkillGroup_Data,
    ethicsOfDigitalInteraction: ethicsOfDigitalInteraction_SkillGroup_Data,
    privacy: privacy_SkillGroup_Data,
    socialAndEnvironmentalImpactOfComputing: socialAndEnvironmentalImpactOfComputing_SkillGroup_Data,
  },
  description: {
    methodological: "Protection of personal information and accounts, respect for others, and the consequences of digital technologies. Designing and testing digital interface UX belongs to a separate Informatics domain.",
    frontend: {
      en: "Learn to protect information, respect other people and understand digital technology's effects.",
    },
  },
});
