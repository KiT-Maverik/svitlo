import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const spacecraftAttitudeControl_Skill_Data = buildSkillConfig({
  slug: 'spacecraftAttitudeControl',
  id: '68725c0e-b188-406a-a89c-38fb5503bf61',
  name: {
    en: 'Spacecraft attitude control',
  },
  description: {
    methodological: 'Relate sensors and actuators to changing orientation rather than simply changing orbit.',
    frontend: {
      en: 'Understand how spacecraft control orientation in space.',
    },
  },
});
