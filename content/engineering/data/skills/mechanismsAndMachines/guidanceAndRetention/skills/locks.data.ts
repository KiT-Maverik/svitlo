import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const locks_Skill_Data = buildSkillConfig({
  slug: 'locks',
  id: 'eb87ce34-d9a6-403c-9cba-1f785d167dac',
  name: {
    en: 'Locks',
  },
  description: {
    methodological:
      'Identify how a key, code or other authorization mechanism restricts the operation of a secured closure.',
    frontend: {
      en: 'Recognize how locks limit access to an authorized user.',
    },
  },
});
