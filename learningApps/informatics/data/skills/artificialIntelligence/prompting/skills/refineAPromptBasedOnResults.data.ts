import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const refineAPromptBasedOnResults_Skill_Data = buildSkillConfig({
  slug: "refineAPromptBasedOnResults",
  id: "058e7465-1cff-43db-a856-613fa36df599",
  name: {
    en: "Refine a Prompt Based on Results",
  },
  description: {
    methodological: "Compare output with the original goal and adjust specific parts of a prompt responsible for discrepancies. Rewording cannot substitute for fact-checking the model's claims.",
    frontend: {
      en: "Improve an AI request after checking what its previous response missed.",
    },
  },
});
