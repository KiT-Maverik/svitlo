import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const vehicleBrakingSystems_Skill_Data = buildSkillConfig({
  slug: "vehicleBrakingSystems",
  id: "74d7c698-df9c-4c09-9f2e-08f5510095d4",
  name: {
    en: "Vehicle braking systems",
  },
  description: {
    methodological: "Trace control input to braking torque and recognize traction limitations.",
    frontend: {
      en: "Understand how braking systems slow or stop vehicles.",
    },
  },
});
