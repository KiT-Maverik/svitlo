import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const electricMotorConstruction_Skill_Data = buildSkillConfig({
  slug: 'electricMotorConstruction',
  id: '82e13252-c0ab-4621-bb10-8665c02c9dae',
  name: {
    en: 'Electric motor construction',
  },
  description: {
    methodological:
      'Identify rotor, stator, magnets or windings, bearings and commutation arrangements that produce rotation in an electrical machine. This differs from incorporating a finished motor into a controlled mechanism.',
    frontend: {
      en: 'Explore the internal parts that let an electric motor rotate.',
    },
  },
});
