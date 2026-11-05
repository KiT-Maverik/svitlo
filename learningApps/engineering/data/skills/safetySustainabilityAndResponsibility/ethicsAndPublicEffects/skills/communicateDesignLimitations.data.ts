import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const communicateDesignLimitations_Skill_Data = buildSkillConfig({
  slug: 'communicateDesignLimitations',
  id: '3807f9fd-f470-4d89-825e-bece47dad37c',
  name: {
    en: 'Communicate design limitations',
  },
  description: {
    methodological: 'State assumptions and unverified safety claims instead of generalizing from limited tests.',
    frontend: {
      en: 'State what a technical solution cannot safely or reliably do.',
    },
  },
});
