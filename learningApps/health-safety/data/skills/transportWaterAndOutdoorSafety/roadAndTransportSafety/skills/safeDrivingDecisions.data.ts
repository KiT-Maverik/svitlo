import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const safeDrivingDecisions_Skill_Data = buildSkillConfig({
  slug: "safeDrivingDecisions",
  id: "4a68b2ab-4e14-40b8-9940-1950ffbe25fe",
  name: {
    en: "Safe driving decisions",
  },
  description: {
    methodological: "Recognize how fatigue, impairment, speed, distraction, and environmental conditions affect driving risk and the duty not to drive unsafely.",
    frontend: {
      en: "Recognize why distraction, speed and impairment make driving unsafe.",
    },
  },
});
