import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizePhishingAndImpersonation_Skill_Data = buildSkillConfig({
  slug: 'recognizePhishingAndImpersonation',
  id: 'cb5a3fcf-85a6-4a72-9277-f3e4608c71ec',
  name: {
    en: 'Recognize phishing and impersonation',
  },
  description: {
    methodological:
      'Inspect suspicious messages, sender claims, and links rather than trusting apparent identity or familiar branding.',
    frontend: {
      en: 'Check suspicious links and messages rather than trusting their appearance.',
    },
  },
});
