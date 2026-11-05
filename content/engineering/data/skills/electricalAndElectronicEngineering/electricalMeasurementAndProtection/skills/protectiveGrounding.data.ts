import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const protectiveGrounding_Skill_Data = buildSkillConfig({
  slug: 'protectiveGrounding',
  id: 'fa9d0440-9dc1-4825-bf93-efa881b60989',
  name: {
    en: 'Protective grounding',
  },
  description: {
    methodological:
      'Identify intentional fault-current or equipotential connections that reduce electric-shock risk in appropriately designed equipment.',
    frontend: {
      en: 'Understand how protective grounding supports electrical safety.',
    },
  },
});
