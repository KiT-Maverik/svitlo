import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishAtomicFromCompoundPropositions_Skill_Data = buildSkillConfig({
  slug: "distinguishAtomicFromCompoundPropositions",
  id: "6b4056de-d47a-4c5f-a931-226f4780f8eb",
  name: {
    en: "Distinguish atomic from compound propositions",
  },
  description: {
    methodological: "A proposition can stand alone or form part of a statement built with logical connectives; truth-functional structure differs from the number of words in an ordinary sentence.",
    frontend: {
      en: "Tell a single proposition apart from one assembled with logical connectives.",
    },
  },
});
