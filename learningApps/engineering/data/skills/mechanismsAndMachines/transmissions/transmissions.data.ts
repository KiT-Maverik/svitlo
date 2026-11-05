import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  beltDrives_Skill_Data,
  chainDrives_Skill_Data,
  determineAGearRatio_Skill_Data,
  gearTransmission_Skill_Data,
  leverMechanisms_Skill_Data,
  pulleySystems_Skill_Data,
} from './skills';

export const transmissions_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'transmissions',
  id: '6ab9d99d-c8e3-4c63-9af3-b9a526a85db5',
  name: {
    en: 'Transmissions',
  },
  skills: {
    beltDrives: beltDrives_Skill_Data,
    chainDrives: chainDrives_Skill_Data,
    determineAGearRatio: determineAGearRatio_Skill_Data,
    gearTransmission: gearTransmission_Skill_Data,
    leverMechanisms: leverMechanisms_Skill_Data,
    pulleySystems: pulleySystems_Skill_Data,
  },
  description: {
    methodological:
      'Shafts, flexible elements and meshing components connect input motion to a useful output with potentially different speed, force and direction.',
    frontend: {
      en: 'Explore how shafts, gears and flexible drives carry motion between parts.',
    },
  },
});
