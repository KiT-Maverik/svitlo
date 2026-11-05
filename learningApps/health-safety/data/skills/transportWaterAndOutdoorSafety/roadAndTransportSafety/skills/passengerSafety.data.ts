import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const passengerSafety_Skill_Data = buildSkillConfig({
  slug: 'passengerSafety',
  id: '4519513e-22fa-42ce-89a5-cc6c425a6676',
  name: {
    en: 'Passenger safety',
  },
  description: {
    methodological:
      'Recognize the role of seat belts, appropriate child restraints, safe boarding, and behavior in moving vehicles.',
    frontend: {
      en: 'Understand the protective purpose of seat belts and child restraints.',
    },
  },
});
