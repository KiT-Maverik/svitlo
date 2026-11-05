import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessSwimmingAndBathingHazards_Skill_Data = buildSkillConfig({
  slug: 'assessSwimmingAndBathingHazards',
  id: '9a781223-1124-401e-8711-2827d03d717a',
  name: {
    en: 'Assess swimming and bathing hazards',
  },
  description: {
    methodological:
      'Assess water-specific conditions such as depth, currents, temperature, supervision, safe access and local warnings before entering; this applies general hazard judgment to an environment with distinct drowning risks.',
    frontend: {
      en: 'Evaluate currents, depth and supervision before entering water.',
    },
  },
});
