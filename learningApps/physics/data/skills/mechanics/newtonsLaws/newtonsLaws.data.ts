import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainNewtonsFirstLaw_Skill_Data, explainNewtonsSecondLaw_Skill_Data, explainNewtonsThirdLaw_Skill_Data } from './skills';

export const newtonsLaws_SkillGroup_Data = buildSkillGroupConfig({
  slug: "newtonsLaws",
  id: "665f18c6-b5fe-4777-85fc-8d3b880b6a61",
  name: {
    en: "Newton's Laws",
  },
  skills: {
    explainNewtonsFirstLaw: explainNewtonsFirstLaw_Skill_Data,
    explainNewtonsSecondLaw: explainNewtonsSecondLaw_Skill_Data,
    explainNewtonsThirdLaw: explainNewtonsThirdLaw_Skill_Data,
  },
  description: {
    methodological: "Newton's laws establish the relationships among forces, inertia, and changes in bodies' motion in the appropriate reference frames.",
    frontend: {
      en: "Learn how Newton's laws connect forces with changes in motion.",
    },
  },
});
