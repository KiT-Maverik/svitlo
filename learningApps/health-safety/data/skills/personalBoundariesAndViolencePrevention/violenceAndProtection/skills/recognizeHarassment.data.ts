import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeHarassment_Skill_Data = buildSkillConfig({
  slug: 'recognizeHarassment',
  id: '646a2b40-c9ee-49bc-b9da-396bdbd624b4',
  name: {
    en: 'Recognize harassment',
  },
  description: {
    methodological:
      'Identify intimidating, degrading, discriminatory or otherwise unwanted targeted conduct, which may be serious even without a repeated bullying pattern.',
    frontend: {
      en: 'Identify harassment that can cause harm even when it is not repeated.',
    },
  },
});
