import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const formulateAQuestionAboutASpatialPattern_Skill_Data = buildSkillConfig({
  slug: "formulateAQuestionAboutASpatialPattern",
  id: "e7763450-d775-4baa-93e8-21770b414cd6",
  name: {
    en: "Formulate a question about a spatial pattern",
  },
  description: {
    methodological: "Ask a tractable question involving location, distribution, proximity, or change rather than a factual place-name quiz.",
    frontend: {
      en: "Ask an investigable question about where something is or how its pattern changes.",
    },
  },
});
