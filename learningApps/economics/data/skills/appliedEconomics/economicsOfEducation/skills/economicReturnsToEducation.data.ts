import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const economicReturnsToEducation_Skill_Data = buildSkillConfig({
  slug: "economicReturnsToEducation",
  id: "3f272801-44ff-4508-9e3b-10ba51945b2e",
  name: {
    en: "Економічна віддача від освіти",
  },
  description: {
    methodological: "Assess expected changes in earnings, productivity, and opportunity relative to time and schooling costs without automatically interpreting an education–earnings correlation as causal.",
    frontend: {
      en: "Compare the economic value of education with its time and financial costs.",
    },
  },
});
