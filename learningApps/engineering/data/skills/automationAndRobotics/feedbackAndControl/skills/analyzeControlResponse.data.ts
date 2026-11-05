import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const analyzeControlResponse_Skill_Data = buildSkillConfig({
  slug: 'analyzeControlResponse',
  id: '86d0182f-60cb-4f89-a9ca-f1c51f847f53',
  name: {
    en: 'Analyze control response',
  },
  description: {
    methodological: 'Identify overshoot, steady error, oscillation or excessive delay in observed behavior.',
    frontend: {
      en: 'Interpret how a control system responds over time to a change.',
    },
  },
});
