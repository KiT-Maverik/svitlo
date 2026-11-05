import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const radioTransmitters_Skill_Data = buildSkillConfig({
  slug: 'radioTransmitters',
  id: '04c8780c-790e-4bc6-b797-09f8a7c0e9db',
  name: {
    en: 'Radio transmitters',
  },
  description: {
    methodological:
      'Trace how circuitry prepares a signal and supplies suitable electrical excitation to an antenna for radiation.',
    frontend: {
      en: 'Understand the main functional parts of a radio transmitter.',
    },
  },
});
