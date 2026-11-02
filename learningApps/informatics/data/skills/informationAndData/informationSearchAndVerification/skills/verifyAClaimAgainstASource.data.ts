import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const verifyAClaimAgainstASource_Skill_Data = buildSkillConfig({
  slug: "verifyAClaimAgainstASource",
  id: "08802b0f-6fb7-4daf-8a08-c05a883ac11a",
  name: {
    en: "Verify a Claim Against a Source",
  },
  description: {
    methodological: "Seek evidence for a particular assertion in the primary source or independent reliable material, considering date, context, and provenance. Repetition of an error across websites does not make it true.",
    frontend: {
      en: "Check a claim against appropriate evidence rather than repeated assertions.",
    },
  },
});
