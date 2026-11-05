import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  evaluateFrictionAtAnInterface_Skill_Data,
  fitsAndClearances_Skill_Data,
  protectiveSurfaceTreatments_Skill_Data,
} from './skills';

export const surfacesAndFit_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'surfacesAndFit',
  id: '435296b5-31e9-46f8-a590-ccc538eba4ab',
  name: {
    en: 'Surfaces and Fit',
  },
  skills: {
    evaluateFrictionAtAnInterface: evaluateFrictionAtAnInterface_Skill_Data,
    fitsAndClearances: fitsAndClearances_Skill_Data,
    protectiveSurfaceTreatments: protectiveSurfaceTreatments_Skill_Data,
  },
  description: {
    methodological: 'Small variations at contacting surfaces affect motion, grip, sealing, protection and assembly.',
    frontend: {
      en: 'Explore how surface properties and small gaps affect mechanical connections.',
    },
  },
});
