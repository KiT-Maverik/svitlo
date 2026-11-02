import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { aircraft_SkillGroup_Data } from './aircraft/aircraft.data';
import { roadAndRail_SkillGroup_Data } from './roadAndRail/roadAndRail.data';
import { spacecraft_SkillGroup_Data } from './spacecraft/spacecraft.data';
import { watercraft_SkillGroup_Data } from './watercraft/watercraft.data';

export const transportationAndAerospaceEngineering_SkillDomain_Data = buildSkillDomainConfig({
  slug: "transportationAndAerospaceEngineering",
  id: "c1f92626-c711-4809-81de-1b44b472c738",
  name: {
    en: "Transportation and Aerospace Engineering",
  },
  groups: {
    aircraft: aircraft_SkillGroup_Data,
    roadAndRail: roadAndRail_SkillGroup_Data,
    spacecraft: spacecraft_SkillGroup_Data,
    watercraft: watercraft_SkillGroup_Data,
  },
  description: {
    methodological: "Transport machines coordinate power, support, steering, stopping and protection while moving through land, air, water or space. Each vehicle is a system with characteristic environmental and operating constraints.",
    frontend: {
      en: "Explore the engineering systems that move vehicles on land, water and in space.",
    },
  },
});
