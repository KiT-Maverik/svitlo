import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { emotionalAppraisal_Skill_Data, emotionFunctions_Skill_Data, emotionTheories_Skill_Data, moodAndEmotion_Skill_Data, physiologyOfEmotion_Skill_Data } from './skills';

export const emotionalProcesses_SkillGroup_Data = buildSkillGroupConfig({
  slug: "emotionalProcesses",
  id: "30801456-e62b-422e-8c5b-58809ad131b6",
  name: {
    en: "Emotional Processes",
  },
  skills: {
    emotionalAppraisal: emotionalAppraisal_Skill_Data,
    emotionFunctions: emotionFunctions_Skill_Data,
    emotionTheories: emotionTheories_Skill_Data,
    moodAndEmotion: moodAndEmotion_Skill_Data,
    physiologyOfEmotion: physiologyOfEmotion_Skill_Data,
  },
  description: {
    methodological: "Emotions emerge from interpretations, physiological changes, and situational information that interact in complex ways.",
    frontend: {
      en: "Discover the functions, bodily responses and interpretations involved in emotion.",
    },
  },
});
