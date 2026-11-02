import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const moveLoopInvariantComputationsOutsideALoop_Skill_Data = buildSkillConfig({
  slug: "moveLoopInvariantComputationsOutsideALoop",
  id: "0bc8deff-de57-478d-beab-37db128170c6",
  name: {
    en: "Move Loop-Invariant Computations Outside a Loop",
  },
  description: {
    methodological: "Recognize an expression whose value remains unchanged between iterations and safely calculate it once outside the loop, provided that doing so does not change required side effects or execution order.",
    frontend: {
      en: "Move calculations out of loops when they do not change during repetition.",
    },
  },
});
