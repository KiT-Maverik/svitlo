import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifySatelliteSubsystems_Skill_Data = buildSkillConfig({
  slug: "identifySatelliteSubsystems",
  id: "d220fcea-9c61-457f-a592-d66be8cea5f5",
  name: {
    en: "Identify satellite subsystems",
  },
  description: {
    methodological: "Distinguish payload, power, communications, thermal and attitude-control equipment.",
    frontend: {
      en: "Identify power, communication, structure and control subsystems on a satellite.",
    },
  },
});
