import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  distinguishComponentAndSystemFailures_Skill_Data,
  planPreventiveMaintenance_Skill_Data,
  systemRedundancy_Skill_Data,
  traceTechnicalFaults_Skill_Data,
} from './skills';

export const reliabilityAndMaintenance_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'reliabilityAndMaintenance',
  id: 'd38a799a-5bc5-4823-b551-986f5971c5dc',
  name: {
    en: 'Reliability and Maintenance',
  },
  skills: {
    distinguishComponentAndSystemFailures: distinguishComponentAndSystemFailures_Skill_Data,
    planPreventiveMaintenance: planPreventiveMaintenance_Skill_Data,
    systemRedundancy: systemRedundancy_Skill_Data,
    traceTechnicalFaults: traceTechnicalFaults_Skill_Data,
  },
  description: {
    methodological:
      'Operating systems face wear and faults, so diagnosis and continued service require explicit understanding of possible failure paths.',
    frontend: {
      en: 'Explore how engineers manage failures and maintain reliable operation.',
    },
  },
});
