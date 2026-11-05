import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  bearings_Skill_Data,
  brakingMechanisms_Skill_Data,
  latches_Skill_Data,
  locks_Skill_Data,
  lubrication_Skill_Data,
} from './skills';

export const guidanceAndRetention_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'guidanceAndRetention',
  id: '3ed9a99c-8635-4a5b-b232-ca17743ee80e',
  name: {
    en: 'Guidance and Retention',
  },
  skills: {
    bearings: bearings_Skill_Data,
    brakingMechanisms: brakingMechanisms_Skill_Data,
    latches: latches_Skill_Data,
    locks: locks_Skill_Data,
    lubrication: lubrication_Skill_Data,
  },
  description: {
    methodological:
      'Motion must be supported and limited while interfaces are protected from damaging friction or unintended release.',
    frontend: {
      en: 'Explore the parts that support motion and prevent accidental release.',
    },
  },
});
