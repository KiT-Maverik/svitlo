import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const generalizeARepeatedMethod_Skill_Data = buildSkillConfig({
  slug: "generalizeARepeatedMethod",
  id: "d2716a77-b2a1-4dc4-895f-2f9fd06703e1",
  name: {
    en: "Generalize a Repeated Method",
  },
  description: {
    methodological: "Extract an invariant sequence of actions from several specific solutions and formulate a rule applicable to new cases. This requires separating the method from incidental numbers or objects in the examples.",
    frontend: {
      en: "Find a reusable method shared by several specific problems.",
    },
  },
});
