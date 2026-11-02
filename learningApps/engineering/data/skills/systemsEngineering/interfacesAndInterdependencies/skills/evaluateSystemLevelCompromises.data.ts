import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateSystemLevelCompromises_Skill_Data = buildSkillConfig({
  slug: "evaluateSystemLevelCompromises",
  id: "d4b6ce17-2b70-4b59-9d6c-78f79adfec51",
  name: {
    en: "Evaluate system-level compromises",
  },
  description: {
    methodological: "Explain why optimizing one part may worsen total cost, complexity, efficiency or reliability.",
    frontend: {
      en: "Recognize why making one component better can worsen the complete system.",
    },
  },
});
