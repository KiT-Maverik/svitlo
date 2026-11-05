import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const feedbackControlLoops_Skill_Data = buildSkillConfig({
  slug: 'feedbackControlLoops',
  id: '23352aed-01cf-4cd2-9ca3-97596254ae14',
  name: {
    en: 'Feedback control loops',
  },
  description: {
    methodological: 'Locate setpoint, sensor, controller, actuator and physical plant in a working system.',
    frontend: {
      en: 'Trace how measured output feeds back into a controller.',
    },
  },
});
