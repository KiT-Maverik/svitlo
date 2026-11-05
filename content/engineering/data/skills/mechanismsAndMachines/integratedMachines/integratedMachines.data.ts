import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  diagnoseTransmissionFaults_Skill_Data,
  motionMechanismSuitability_Skill_Data,
  traceMechanicalPowerTransmission_Skill_Data,
} from './skills';

export const integratedMachines_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'integratedMachines',
  id: '017492af-88e9-4e95-b81e-762a0a488f28',
  name: {
    en: 'Integrated Machines',
  },
  skills: {
    diagnoseTransmissionFaults: diagnoseTransmissionFaults_Skill_Data,
    motionMechanismSuitability: motionMechanismSuitability_Skill_Data,
    traceMechanicalPowerTransmission: traceMechanicalPowerTransmission_Skill_Data,
  },
  description: {
    methodological:
      'Machines combine multiple components in a working sequence, so their behavior cannot be inferred from a single named part.',
    frontend: {
      en: 'Explore how several mechanical mechanisms work together in a machine.',
    },
  },
});
