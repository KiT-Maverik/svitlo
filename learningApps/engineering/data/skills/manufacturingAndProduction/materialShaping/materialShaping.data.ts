import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  additiveManufacturing_Skill_Data,
  castingProcesses_Skill_Data,
  formingProcesses_Skill_Data,
  machiningProcesses_Skill_Data,
  moldingProcesses_Skill_Data,
} from './skills';

export const materialShaping_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'materialShaping',
  id: 'db80ab66-f290-48a7-8bda-4db02231df64',
  name: {
    en: 'Material Shaping',
  },
  skills: {
    additiveManufacturing: additiveManufacturing_Skill_Data,
    castingProcesses: castingProcesses_Skill_Data,
    formingProcesses: formingProcesses_Skill_Data,
    machiningProcesses: machiningProcesses_Skill_Data,
    moldingProcesses: moldingProcesses_Skill_Data,
  },
  description: {
    methodological:
      'A manufacturing process imposes specific restrictions on geometry, material, waste and achievable accuracy.',
    frontend: {
      en: 'Learn to distinguish methods of creating shapes from raw material.',
    },
  },
});
