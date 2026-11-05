import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  bodyHygiene_Skill_Data,
  handHygiene_Skill_Data,
  hygieneOfPersonalItems_Skill_Data,
  oralHygiene_Skill_Data,
} from './skills';

export const personalHygiene_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'personalHygiene',
  id: 'a0d84427-7a8d-45fa-93a0-21b930c5e107',
  name: {
    en: 'Personal Hygiene',
  },
  skills: {
    bodyHygiene: bodyHygiene_Skill_Data,
    handHygiene: handHygiene_Skill_Data,
    hygieneOfPersonalItems: hygieneOfPersonalItems_Skill_Data,
    oralHygiene: oralHygiene_Skill_Data,
  },
  description: {
    methodological:
      'Effective routines reflect how contamination spreads between hands, body surfaces, shared objects, and everyday environments.',
    frontend: {
      en: 'Build useful routines that limit contamination of hands and everyday objects.',
    },
  },
});
