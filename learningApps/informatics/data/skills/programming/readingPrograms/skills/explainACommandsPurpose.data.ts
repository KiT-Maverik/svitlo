import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainACommandsPurpose_Skill_Data = buildSkillConfig({
  slug: "explainACommandsPurpose",
  id: "c705344f-e98c-4304-ab91-c019c9a5f55f",
  name: {
    en: "Explain a Command's Purpose",
  },
  description: {
    methodological: "Identify the operation performed by an instruction and which values or effects it changes given the initial state. For example, assignment stores a new value but does not necessarily display it.",
    frontend: {
      en: "Explain what an individual programming command does to a program's state.",
    },
  },
});
