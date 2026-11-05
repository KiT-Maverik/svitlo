import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chemicalReactorSystems_Skill_Data = buildSkillConfig({
  slug: 'chemicalReactorSystems',
  id: '8e4132d7-1988-41d3-b2d4-691206bd945c',
  name: {
    en: 'Chemical reactor systems',
  },
  description: {
    methodological:
      'Identify containment, feed, mixing, heat control and product removal functions in a vessel designed for a controlled transformation.',
    frontend: {
      en: 'Identify the controlled functions of chemical reaction vessels.',
    },
  },
});
