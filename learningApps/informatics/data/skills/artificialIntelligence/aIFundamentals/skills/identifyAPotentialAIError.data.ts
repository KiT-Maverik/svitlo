import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyAPotentialAIError_Skill_Data = buildSkillConfig({
  slug: "identifyAPotentialAIError",
  id: "f93aa878-a1ad-4820-82a3-30f4b182f147",
  name: {
    en: "Identify a Potential AI Error",
  },
  description: {
    methodological: "Recognize signs of an unreliable response, such as implausibly specific details, contradictions with context, or unverifiable references. A confident tone is not evidence of truth; material claims need independent verification.",
    frontend: {
      en: "Spot warning signs that an AI answer may need independent checking.",
    },
  },
});
