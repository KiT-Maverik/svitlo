import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { comparePositioningMethods_Skill_Data, inertialNavigationHardware_Skill_Data, satelliteNavigationReceivers_Skill_Data } from './skills';

export const navigationEquipment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "navigationEquipment",
  id: "91acdacb-dbd6-4bf8-8346-87fd8f818292",
  name: {
    en: "Navigation Equipment",
  },
  skills: {
    comparePositioningMethods: comparePositioningMethods_Skill_Data,
    inertialNavigationHardware: inertialNavigationHardware_Skill_Data,
    satelliteNavigationReceivers: satelliteNavigationReceivers_Skill_Data,
  },
  description: {
    methodological: "Positioning methods use different physical measurements, and each has characteristic failures and accuracy limitations.",
    frontend: {
      en: "Explore the hardware used for navigation and positioning.",
    },
  },
});
