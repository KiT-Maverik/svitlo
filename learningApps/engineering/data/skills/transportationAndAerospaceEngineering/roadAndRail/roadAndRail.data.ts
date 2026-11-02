import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { steeringSystems_Skill_Data, suspensionSystems_Skill_Data, vehicleBrakingSystems_Skill_Data, vehicleDrivetrains_Skill_Data } from './skills';

export const roadAndRail_SkillGroup_Data = buildSkillGroupConfig({
  slug: "roadAndRail",
  id: "38105895-524b-4840-a2fa-4f5b6fa8aa27",
  name: {
    en: "Road and Rail",
  },
  skills: {
    steeringSystems: steeringSystems_Skill_Data,
    suspensionSystems: suspensionSystems_Skill_Data,
    vehicleBrakingSystems: vehicleBrakingSystems_Skill_Data,
    vehicleDrivetrains: vehicleDrivetrains_Skill_Data,
  },
  description: {
    methodological: "Surface vehicles depend on transmitting traction, guiding movement, supporting loads and maintaining control during stopping.",
    frontend: {
      en: "Discover the connected systems that move and control land vehicles.",
    },
  },
});
