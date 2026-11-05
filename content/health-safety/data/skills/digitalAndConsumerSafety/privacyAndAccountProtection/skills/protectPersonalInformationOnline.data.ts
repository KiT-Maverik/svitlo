import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const protectPersonalInformationOnline_Skill_Data = buildSkillConfig({
  slug: 'protectPersonalInformationOnline',
  id: '767d243f-3d71-4ac5-980d-1900dde8746b',
  name: {
    en: 'Protect personal information online',
  },
  description: {
    methodological:
      'Identify sensitive details and consider audience, persistence, and consequences before sharing location, documents, or images.',
    frontend: {
      en: 'Consider who might access sensitive information before posting it.',
    },
  },
});
