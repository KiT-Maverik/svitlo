import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  protectPersonalInformationOnline_Skill_Data,
  recognizeUnsafeAccessRequests_Skill_Data,
  secureEverydayAccounts_Skill_Data,
} from './skills';

export const privacyAndAccountProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'privacyAndAccountProtection',
  id: '4fb6f8ce-75ee-4884-8a7e-3561c6250d6a',
  name: {
    en: 'Privacy and Account Protection',
  },
  skills: {
    protectPersonalInformationOnline: protectPersonalInformationOnline_Skill_Data,
    recognizeUnsafeAccessRequests: recognizeUnsafeAccessRequests_Skill_Data,
    secureEverydayAccounts: secureEverydayAccounts_Skill_Data,
  },
  description: {
    methodological:
      'Limiting disclosure and protecting access reduces vulnerabilities even when platforms or other people behave unpredictably.',
    frontend: {
      en: 'Explore sensible choices for privacy and access to digital accounts.',
    },
  },
});
