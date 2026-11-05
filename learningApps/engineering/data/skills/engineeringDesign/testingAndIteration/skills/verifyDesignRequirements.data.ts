import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const verifyDesignRequirements_Skill_Data = buildSkillConfig({
  slug: 'verifyDesignRequirements',
  id: '0e1060e6-ff19-4133-808e-0cfb2f703927',
  name: {
    en: 'Verify design requirements',
  },
  description: {
    methodological:
      'Use inspection, test, demonstration or analysis to determine whether stated technical requirements and their acceptance criteria have been met. Passing one test does not establish compliance with untested requirements.',
    frontend: {
      en: 'Check systematically whether a solution satisfies each technical requirement.',
    },
  },
});
