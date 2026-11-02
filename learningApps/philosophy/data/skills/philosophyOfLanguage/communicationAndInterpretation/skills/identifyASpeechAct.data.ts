import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyASpeechAct_Skill_Data = buildSkillConfig({
  slug: "identifyASpeechAct",
  id: "dac97a90-5597-4d16-8192-77eabe5bf35e",
  name: {
    en: "Identify a speech act",
  },
  description: {
    methodological: "Recognize how an utterance functions as a promise, request, warning, or assertion beyond its sentence structure.",
    frontend: {
      en: "Recognize when saying something performs an action such as promising or requesting.",
    },
  },
});
