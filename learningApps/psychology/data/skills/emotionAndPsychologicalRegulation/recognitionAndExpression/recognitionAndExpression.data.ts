import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { culturalVariationInExpression_Skill_Data, emotionalSelfAwareness_Skill_Data, emotionVocabulary_Skill_Data, readingEmotionalCues_Skill_Data } from './skills';

export const recognitionAndExpression_SkillGroup_Data = buildSkillGroupConfig({
  slug: "recognitionAndExpression",
  id: "a201153b-7b45-4399-b561-8a6ced3c42a0",
  name: {
    en: "Recognition and Expression",
  },
  skills: {
    culturalVariationInExpression: culturalVariationInExpression_Skill_Data,
    emotionalSelfAwareness: emotionalSelfAwareness_Skill_Data,
    emotionVocabulary: emotionVocabulary_Skill_Data,
    readingEmotionalCues: readingEmotionalCues_Skill_Data,
  },
  description: {
    methodological: "Emotional information is conveyed through multiple channels, but neither facial expression nor tone is an infallible window into another mind.",
    frontend: {
      en: "Learn how emotions can be recognized and expressed in different contexts.",
    },
  },
});
