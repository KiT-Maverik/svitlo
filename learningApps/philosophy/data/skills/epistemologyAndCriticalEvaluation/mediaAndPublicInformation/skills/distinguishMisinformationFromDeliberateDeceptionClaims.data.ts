import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishMisinformationFromDeliberateDeceptionClaims_Skill_Data = buildSkillConfig({
  slug: "distinguishMisinformationFromDeliberateDeceptionClaims",
  id: "a26c8161-2d35-4776-ae77-f89c00431348",
  name: {
    en: "Distinguish misinformation from deliberate deception claims",
  },
  description: {
    methodological: "Identify inaccurate information without asserting an author's intention to deceive unless independent evidence supports that inference.",
    frontend: {
      en: "Identify inaccurate claims without assuming a speaker intended to deceive.",
    },
  },
});
