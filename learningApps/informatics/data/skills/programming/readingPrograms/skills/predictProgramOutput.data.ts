import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictProgramOutput_Skill_Data = buildSkillConfig({
  slug: "predictProgramOutput",
  id: "862987ae-e4dd-46c7-945f-875b48120be1",
  name: {
    en: "Predict Program Output",
  },
  description: {
    methodological: "Determine exactly what a program prints, draws, or returns for particular inputs and execution order. This concerns the externally observable result, not every internal state.",
    frontend: {
      en: "Work out the visible result a program will produce for given inputs.",
    },
  },
});
