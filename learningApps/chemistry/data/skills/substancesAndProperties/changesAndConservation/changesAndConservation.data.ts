import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalChanges_Skill_Data, massConservation_Skill_Data, physicalChanges_Skill_Data } from './skills';

export const changesAndConservation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "changesAndConservation",
  id: "6e21b5f4-a7d4-48b3-9124-1de198f9e6ff",
  name: {
    en: "Changes and Conservation",
  },
  skills: {
    chemicalChanges: chemicalChanges_Skill_Data,
    massConservation: massConservation_Skill_Data,
    physicalChanges: physicalChanges_Skill_Data,
  },
  description: {
    methodological: "Changes in form and changes in composition are distinct, while matter is conserved in appropriately defined systems.",
    frontend: {
      en: "See how changes to matter differ from the creation of new substances.",
    },
  },
});
