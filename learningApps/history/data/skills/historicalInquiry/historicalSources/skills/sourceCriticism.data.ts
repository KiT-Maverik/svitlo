import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const sourceCriticism_Skill_Data = buildSkillConfig({
  slug: "sourceCriticism",
  id: "a2588901-2159-428e-bf5a-0ba5fc3aebd0",
  name: {
    en: "Критика джерела",
  },
  description: {
    methodological: "Assess origin, bias, omissions, and contradictions and verify claims with independent evidence.",
    frontend: {
      en: "Check whether a historical source deserves confidence.",
    },
  },
});
