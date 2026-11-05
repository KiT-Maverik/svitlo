import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const electricalIsolation_Skill_Data = buildSkillConfig({
  slug: 'electricalIsolation',
  id: '1a536e26-6ee4-4bfa-9060-967cfe17350e',
  name: {
    en: 'Electrical isolation',
  },
  description: {
    methodological:
      'Describe how barriers or isolating components prevent unintended conductive paths between circuits, including hazardous interfaces.',
    frontend: {
      en: 'Recognize why electrical isolation protects separate circuits and users.',
    },
  },
});
