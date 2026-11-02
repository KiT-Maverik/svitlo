import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { guidanceAndRetention_SkillGroup_Data } from './guidanceAndRetention/guidanceAndRetention.data';
import { integratedMachines_SkillGroup_Data } from './integratedMachines/integratedMachines.data';
import { motionConversion_SkillGroup_Data } from './motionConversion/motionConversion.data';
import { transmissions_SkillGroup_Data } from './transmissions/transmissions.data';

export const mechanismsAndMachines_SkillDomain_Data = buildSkillDomainConfig({
  slug: "mechanismsAndMachines",
  id: "88d67d4b-b09b-485e-a0ff-bea7bbb47d58",
  name: {
    en: "Mechanisms and Machines",
  },
  groups: {
    guidanceAndRetention: guidanceAndRetention_SkillGroup_Data,
    integratedMachines: integratedMachines_SkillGroup_Data,
    motionConversion: motionConversion_SkillGroup_Data,
    transmissions: transmissions_SkillGroup_Data,
  },
  description: {
    methodological: "Moving assemblies redirect or transmit force, torque and motion to achieve tasks. This domain investigates how real mechanical arrangements work, not the underlying laws of mechanics as an independent science.",
    frontend: {
      en: "Discover how mechanical components transmit force and transform movement.",
    },
  },
});
