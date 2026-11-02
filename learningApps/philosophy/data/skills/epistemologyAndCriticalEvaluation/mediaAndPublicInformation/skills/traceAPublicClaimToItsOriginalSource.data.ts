import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const traceAPublicClaimToItsOriginalSource_Skill_Data = buildSkillConfig({
  slug: "traceAPublicClaimToItsOriginalSource",
  id: "968bd359-751e-428a-a3ea-853cffe01fd7",
  name: {
    en: "Trace a public claim to its original source",
  },
  description: {
    methodological: "Follow citations or reposts to determine what a primary document, recording, or dataset actually says.",
    frontend: {
      en: "Follow a claim back to what its original document or recording actually says.",
    },
  },
});
