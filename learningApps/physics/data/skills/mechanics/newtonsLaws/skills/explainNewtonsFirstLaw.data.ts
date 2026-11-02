import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainNewtonsFirstLaw_Skill_Data = buildSkillConfig({
  slug: "explainNewtonsFirstLaw",
  id: "aee7273b-bd77-4bcb-a5ff-5bb34ce10fc9",
  name: {
    en: "Explain Newton's first law",
  },
  description: {
    methodological: "When the net force is zero, a body's velocity in an inertial reference frame remains constant; rest is a special case.",
    frontend: {
      en: "Explain why zero net force means constant velocity in an inertial frame.",
    },
  },
});
