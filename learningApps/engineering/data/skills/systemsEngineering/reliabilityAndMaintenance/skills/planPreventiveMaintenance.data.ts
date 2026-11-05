import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const planPreventiveMaintenance_Skill_Data = buildSkillConfig({
  slug: 'planPreventiveMaintenance',
  id: '4b23838e-ae7a-4c6f-9a99-f63ad1352910',
  name: {
    en: 'Plan preventive maintenance',
  },
  description: {
    methodological:
      'Identify inspections, cleaning, adjustments or replacements justified by wear and operating conditions.',
    frontend: {
      en: 'Plan inspections and maintenance to reduce predictable failures.',
    },
  },
});
