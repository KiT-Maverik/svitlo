import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  followSafeEquipmentProcedures_Skill_Data,
  readSafetySignsAndInstructions_Skill_Data,
  usePersonalProtectiveEquipment_Skill_Data,
} from './skills';

export const toolsAndWorkplaces_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'toolsAndWorkplaces',
  id: 'e44d3ca8-b5f3-4ed7-a4b7-90bdb204caf4',
  name: {
    en: 'Tools and Workplaces',
  },
  skills: {
    followSafeEquipmentProcedures: followSafeEquipmentProcedures_Skill_Data,
    readSafetySignsAndInstructions: readSafetySignsAndInstructions_Skill_Data,
    usePersonalProtectiveEquipment: usePersonalProtectiveEquipment_Skill_Data,
  },
  description: {
    methodological:
      'Protective procedures depend on the activity, equipment, and conditions; professional work requires role-appropriate training.',
    frontend: {
      en: 'Learn to follow protective practices with tools and equipment.',
    },
  },
});
