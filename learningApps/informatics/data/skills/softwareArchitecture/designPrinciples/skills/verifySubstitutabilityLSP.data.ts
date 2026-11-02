import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const verifySubstitutabilityLSP_Skill_Data = buildSkillConfig({
  slug: "verifySubstitutabilityLSP",
  id: "31afe799-ad12-4cfa-98a0-1ed99d1a1c1a",
  name: {
    en: "Verify Substitutability (LSP)",
  },
  description: {
    methodological: "Identify where a subtype or new implementation violates the expected preconditions, outcomes, or invariants of a shared contract. For example, replacing ordinary storage with read-only storage can break a client legitimately attempting a write.",
    frontend: {
      en: "Check whether an implementation respects the promises of a shared contract.",
    },
  },
});
