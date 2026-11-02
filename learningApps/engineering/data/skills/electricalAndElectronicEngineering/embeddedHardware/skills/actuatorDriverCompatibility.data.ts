import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const actuatorDriverCompatibility_Skill_Data = buildSkillConfig({
  slug: "actuatorDriverCompatibility",
  id: "096f69e5-265e-4448-b444-40a99825cd04",
  name: {
    en: "Actuator-driver compatibility",
  },
  description: {
    methodological: "Determine whether voltage, current, protection and command characteristics suit the drive and the expected actuator load.",
    frontend: {
      en: "Recognize when an actuator needs a suitable driver circuit.",
    },
  },
});
