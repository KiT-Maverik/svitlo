import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const robotDegreesOfFreedom_Skill_Data = buildSkillConfig({
  slug: "robotDegreesOfFreedom",
  id: "b30fb4bc-65d7-4a6a-ad06-d1a59431e161",
  name: {
    en: "Robot degrees of freedom",
  },
  description: {
    methodological: "Connect the axes and joints of a mechanism to its possible independent movements.",
    frontend: {
      en: "Understand how the degrees of freedom describe a robot's possible movement.",
    },
  },
});
