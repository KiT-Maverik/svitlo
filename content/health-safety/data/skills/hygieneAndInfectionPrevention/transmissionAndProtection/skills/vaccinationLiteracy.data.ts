import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const vaccinationLiteracy_Skill_Data = buildSkillConfig({
  slug: 'vaccinationLiteracy',
  id: 'b1214ba1-48cf-4ada-8da1-e6e33118f180',
  name: {
    en: 'Vaccination literacy',
  },
  description: {
    methodological:
      'Distinguish how immunization reduces specified disease risks from claims of absolute protection and recognize the role of recommended schedules.',
    frontend: {
      en: 'Understand what vaccination can and cannot protect against.',
    },
  },
});
