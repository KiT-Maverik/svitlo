import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  articulatedLinkages_Skill_Data,
  camMechanisms_Skill_Data,
  crankSliderMechanisms_Skill_Data,
  screwMechanisms_Skill_Data,
} from './skills';

export const motionConversion_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'motionConversion',
  id: '8b3c6a1a-737a-4885-914a-3bb3d19a539e',
  name: {
    en: 'Motion Conversion',
  },
  skills: {
    articulatedLinkages: articulatedLinkages_Skill_Data,
    camMechanisms: camMechanisms_Skill_Data,
    crankSliderMechanisms: crankSliderMechanisms_Skill_Data,
    screwMechanisms: screwMechanisms_Skill_Data,
  },
  description: {
    methodological:
      'Mechanical linkages and profiles transform rotation, translation or oscillation into required movement patterns.',
    frontend: {
      en: 'Discover how moving components transform one kind of motion into another.',
    },
  },
});
