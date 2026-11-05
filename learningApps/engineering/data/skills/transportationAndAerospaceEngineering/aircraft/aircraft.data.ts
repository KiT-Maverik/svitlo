import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  compareAircraftPropulsionTechnologies_Skill_Data,
  fixedWingAircraftArchitecture_Skill_Data,
  flightControlSurfaces_Skill_Data,
  rotorcraftControl_Skill_Data,
} from './skills';

export const aircraft_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'aircraft',
  id: 'acbc287e-750d-4f24-a738-0d59e3f523fb',
  name: {
    en: 'Aircraft',
  },
  skills: {
    compareAircraftPropulsionTechnologies: compareAircraftPropulsionTechnologies_Skill_Data,
    fixedWingAircraftArchitecture: fixedWingAircraftArchitecture_Skill_Data,
    flightControlSurfaces: flightControlSurfaces_Skill_Data,
    rotorcraftControl: rotorcraftControl_Skill_Data,
  },
  description: {
    methodological:
      'Aircraft incorporate propulsion, lifting surfaces, stabilization and control; different layouts solve different flight missions.',
    frontend: {
      en: 'Explore the major assemblies used to support and control aircraft.',
    },
  },
});
