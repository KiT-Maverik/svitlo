import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const radiologicalEmergencyProtection_Skill_Data = buildSkillConfig({
  slug: 'radiologicalEmergencyProtection',
  id: '2c71f2cc-1d6c-4cd8-9cc9-de6cea302cc2',
  name: {
    en: 'Radiological emergency protection',
  },
  description: {
    methodological:
      'Distinguish external radiation exposure and contamination, following official instructions on shelter, movement, and decontamination.',
    frontend: {
      en: 'Recognize why radiological emergencies require guidance about exposure and contamination.',
    },
  },
});
