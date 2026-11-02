import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainGenerativeAI_Skill_Data = buildSkillConfig({
  slug: "explainGenerativeAI",
  id: "33ea7fe5-82a5-41b3-bbf3-8de0b807a8a7",
  name: {
    en: "Explain Generative AI",
  },
  description: {
    methodological: "Describe how models create new text, images, or other content based on input context and patterns learned during training.",
    frontend: {
      en: "Understand how generative models create text, images or other content.",
    },
  },
});
