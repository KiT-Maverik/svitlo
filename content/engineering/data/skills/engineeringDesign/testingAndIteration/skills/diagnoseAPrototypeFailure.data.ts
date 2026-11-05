import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const diagnoseAPrototypeFailure_Skill_Data = buildSkillConfig({
  slug: 'diagnoseAPrototypeFailure',
  id: 'e5b479a6-c0ac-489c-bf3a-0970a3af8acc',
  name: {
    en: 'Diagnose a prototype failure',
  },
  description: {
    methodological: 'Use symptoms and component relationships to identify a plausible cause of poor performance.',
    frontend: {
      en: 'Investigate which component or condition might explain a prototype failure.',
    },
  },
});
