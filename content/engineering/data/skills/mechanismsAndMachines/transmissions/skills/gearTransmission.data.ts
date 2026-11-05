import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const gearTransmission_Skill_Data = buildSkillConfig({
  slug: 'gearTransmission',
  id: 'b826705e-a712-42d5-b95b-88c8fbc12e05',
  name: {
    en: 'Gear transmission',
  },
  description: {
    methodological: 'Trace rotational transfer between meshing gears and the effect of tooth counts.',
    frontend: {
      en: 'Trace rotation through connected gears.',
    },
  },
});
