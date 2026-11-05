import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluatePrototypePerformance_Skill_Data = buildSkillConfig({
  slug: 'evaluatePrototypePerformance',
  id: 'f594beb7-879c-46cc-95af-1e21e8c80279',
  name: {
    en: 'Evaluate prototype performance',
  },
  description: {
    methodological:
      'Interpret observed prototype-test results under defined conditions and compare measured outputs with expected performance. This analysis alone does not establish full design verification or validate user needs.',
    frontend: {
      en: "Compare a prototype's measured performance with its expected performance.",
    },
  },
});
