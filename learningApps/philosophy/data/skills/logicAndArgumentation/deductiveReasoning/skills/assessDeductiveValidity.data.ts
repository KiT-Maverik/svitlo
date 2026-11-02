import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessDeductiveValidity_Skill_Data = buildSkillConfig({
  slug: "assessDeductiveValidity",
  id: "96f9b6c3-b770-4753-aa7b-cdbefddefd0d",
  name: {
    en: "Assess deductive validity",
  },
  description: {
    methodological: "Determine whether a conclusion must hold if the premises hold, using logical structure rather than agreement with the conclusion.",
    frontend: {
      en: "Check whether premises could all be true while a conclusion is false.",
    },
  },
});
