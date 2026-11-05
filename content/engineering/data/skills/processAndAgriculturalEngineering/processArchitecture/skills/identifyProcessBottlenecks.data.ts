import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyProcessBottlenecks_Skill_Data = buildSkillConfig({
  slug: 'identifyProcessBottlenecks',
  id: 'ae29ef55-d22a-4d64-92cd-bc1852ac56a9',
  name: {
    en: 'Identify process bottlenecks',
  },
  description: {
    methodological:
      'Recognize how limited capacity or interruptions at one processing stage affect the output of a connected plant.',
    frontend: {
      en: 'Identify which process stage limits the output of the whole system.',
    },
  },
});
