import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeValidConsent_Skill_Data = buildSkillConfig({
  slug: 'recognizeValidConsent',
  id: '2686c087-e56d-4e64-a522-1e8bb2a1664c',
  name: {
    en: 'Recognize valid consent',
  },
  description: {
    methodological:
      'Distinguish voluntary, informed, specific, and reversible permission from pressure or absence of resistance.',
    frontend: {
      en: 'Understand that real consent must be free, informed and reversible.',
    },
  },
});
