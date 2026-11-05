import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  floodControlStructures_Skill_Data,
  stormwaterDrainage_Skill_Data,
  traceWastewaterCollection_Skill_Data,
  wastewaterTreatment_Skill_Data,
} from './skills';

export const wastewaterAndDrainage_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'wastewaterAndDrainage',
  id: '548774f2-1fa8-4313-ae4c-77a9c2946222',
  name: {
    en: 'Wastewater and Drainage',
  },
  skills: {
    floodControlStructures: floodControlStructures_Skill_Data,
    stormwaterDrainage: stormwaterDrainage_Skill_Data,
    traceWastewaterCollection: traceWastewaterCollection_Skill_Data,
    wastewaterTreatment: wastewaterTreatment_Skill_Data,
  },
  description: {
    methodological:
      'Sewage, storm runoff and treated discharge have different handling requirements; networks must account for capacity and contamination.',
    frontend: {
      en: 'Explore how wastewater and rainwater are collected and managed.',
    },
  },
});
