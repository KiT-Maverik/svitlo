import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const vehicleDrivetrains_Skill_Data = buildSkillConfig({
  slug: "vehicleDrivetrains",
  id: "efc24286-bc34-4561-b5b8-98426bfead54",
  name: {
    en: "Vehicle drivetrains",
  },
  description: {
    methodological: "Trace prime-mover output through transmissions to driven wheels.",
    frontend: {
      en: "Trace how a drivetrain transfers power to vehicle wheels.",
    },
  },
});
