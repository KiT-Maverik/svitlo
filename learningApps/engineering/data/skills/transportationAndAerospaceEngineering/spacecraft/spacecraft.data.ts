import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { atmosphericReEntryProtection_Skill_Data, identifySatelliteSubsystems_Skill_Data, rocketPropulsionSystems_Skill_Data, spacecraftAttitudeControl_Skill_Data } from './skills';

export const spacecraft_SkillGroup_Data = buildSkillGroupConfig({
  slug: "spacecraft",
  id: "bd4a3a5e-9709-4bf7-bacc-2a8f6dc4a0b0",
  name: {
    en: "Spacecraft",
  },
  skills: {
    atmosphericReEntryProtection: atmosphericReEntryProtection_Skill_Data,
    identifySatelliteSubsystems: identifySatelliteSubsystems_Skill_Data,
    rocketPropulsionSystems: rocketPropulsionSystems_Skill_Data,
    spacecraftAttitudeControl: spacecraftAttitudeControl_Skill_Data,
  },
  description: {
    methodological: "Space systems must coordinate propulsion and precision orientation with energy supply, thermal protection and mission hardware.",
    frontend: {
      en: "Learn how spacecraft operate beyond ordinary atmospheric conditions.",
    },
  },
});
