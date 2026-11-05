import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeAlcoholRelatedRisks_Skill_Data = buildSkillConfig({
  slug: 'recognizeAlcoholRelatedRisks',
  id: '0401fa95-4368-4ac0-90bf-942d26a713e9',
  name: {
    en: 'Recognize alcohol-related risks',
  },
  description: {
    methodological:
      'Identify impaired judgment, coordination, poisoning risk, and longer-term health consequences associated with alcohol.',
    frontend: {
      en: 'Recognize how alcohol can affect safety, judgment and long-term health.',
    },
  },
});
