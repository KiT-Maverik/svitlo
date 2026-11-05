import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const electricalGridDistribution_Skill_Data = buildSkillConfig({
  slug: 'electricalGridDistribution',
  id: 'acc2ef4a-7f21-4601-9718-93553fba31cf',
  name: {
    en: 'Electrical grid distribution',
  },
  description: {
    methodological: 'Trace energy from generation through substations and delivery networks to loads.',
    frontend: {
      en: 'Trace electricity from power stations through distribution networks.',
    },
  },
});
