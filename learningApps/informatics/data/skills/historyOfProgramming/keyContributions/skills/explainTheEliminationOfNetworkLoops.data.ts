import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTheEliminationOfNetworkLoops_Skill_Data = buildSkillConfig({
  slug: "explainTheEliminationOfNetworkLoops",
  id: "85118226-9961-4f8d-961e-f08abb3ae508",
  name: {
    en: "Explain the Elimination of Network Loops",
  },
  description: {
    methodological: "Use the history of local-area network bridges to explain how redundant physical links can create frame-forwarding loops and how Spanning Tree Protocol creates a loop-free logical topology. Credit Radia Perlman's contribution without mistaking STP for an IP routing algorithm.",
    frontend: {
      en: "Explore how the Spanning Tree Protocol helped prevent loops in local networks.",
    },
  },
});
