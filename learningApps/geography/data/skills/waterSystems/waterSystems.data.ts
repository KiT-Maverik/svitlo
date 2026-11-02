import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { frozenAndSubsurfaceWater_SkillGroup_Data } from './frozenAndSubsurfaceWater/frozenAndSubsurfaceWater.data';
import { hydrologicConnections_SkillGroup_Data } from './hydrologicConnections/hydrologicConnections.data';
import { marineAndCoastalProcesses_SkillGroup_Data } from './marineAndCoastalProcesses/marineAndCoastalProcesses.data';
import { riversAndDrainageBasins_SkillGroup_Data } from './riversAndDrainageBasins/riversAndDrainageBasins.data';

export const waterSystems_SkillDomain_Data = buildSkillDomainConfig({
  slug: "waterSystems",
  id: "00317d1d-492a-4491-a387-ef75cd29fb7d",
  name: {
    en: "Water Systems",
  },
  groups: {
    frozenAndSubsurfaceWater: frozenAndSubsurfaceWater_SkillGroup_Data,
    hydrologicConnections: hydrologicConnections_SkillGroup_Data,
    marineAndCoastalProcesses: marineAndCoastalProcesses_SkillGroup_Data,
    riversAndDrainageBasins: riversAndDrainageBasins_SkillGroup_Data,
  },
  description: {
    methodological: "Water connects landscapes through drainage networks, oceans, atmosphere, and underground storage. Geographic questions center on where water moves and accumulates, how its distribution varies, and how water features shape places.",
    frontend: {
      en: "Explore where Earth's water is stored, how it moves and how it shapes places.",
    },
  },
});
