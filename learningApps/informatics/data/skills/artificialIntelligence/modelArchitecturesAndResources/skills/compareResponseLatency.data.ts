import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareResponseLatency_Skill_Data = buildSkillConfig({
  slug: "compareResponseLatency",
  id: "9b2f8f6c-617a-4f84-b6e3-7a659a211f7c",
  name: {
    en: "Compare Response Latency",
  },
  description: {
    methodological: "Compare the time between submitting a request and receiving the first useful output under consistent conditions. Time to first token is different from subsequent generation speed: a short initial delay does not guarantee that a long response finishes quickly.",
    frontend: {
      en: "Compare the delay before an AI response begins separately from generation speed.",
    },
  },
});
