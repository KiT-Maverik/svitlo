import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { fraudAndDeceptivePressure_SkillGroup_Data } from './fraudAndDeceptivePressure/fraudAndDeceptivePressure.data';
import { onlineInteractionSafety_SkillGroup_Data } from './onlineInteractionSafety/onlineInteractionSafety.data';
import { privacyAndAccountProtection_SkillGroup_Data } from './privacyAndAccountProtection/privacyAndAccountProtection.data';

export const digitalAndConsumerSafety_SkillDomain_Data = buildSkillDomainConfig({
  slug: "digitalAndConsumerSafety",
  id: "393ba847-2916-407a-bf88-3d3b408af530",
  name: {
    en: "Digital and Consumer Safety",
  },
  groups: {
    fraudAndDeceptivePressure: fraudAndDeceptivePressure_SkillGroup_Data,
    onlineInteractionSafety: onlineInteractionSafety_SkillGroup_Data,
    privacyAndAccountProtection: privacyAndAccountProtection_SkillGroup_Data,
  },
  description: {
    methodological: "Online environments expose people to privacy breaches, coercion, deception, and financial or personal exploitation. Computer security mechanisms belong primarily to Informatics; this domain concerns a person's protective decisions and recourse.",
    frontend: {
      en: "Discover how to protect personal information and respond to deceptive online behavior.",
    },
  },
});
