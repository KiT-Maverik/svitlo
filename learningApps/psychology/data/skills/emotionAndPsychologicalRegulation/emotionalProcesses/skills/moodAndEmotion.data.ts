import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const moodAndEmotion_Skill_Data = buildSkillConfig({
  slug: "moodAndEmotion",
  id: "1ffa6d9c-6235-41fc-bcab-e64a781373f5",
  name: {
    en: "Mood and Emotion",
  },
  description: {
    methodological: "Distinguish relatively persistent affective states from briefer reactions focused on a specific event.",
    frontend: {
      en: "Distinguish a short emotional episode from a longer-lasting mood.",
    },
  },
});
