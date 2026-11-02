import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ionicLattices_Skill_Data, molecularGeometry_Skill_Data, molecularPolarity_Skill_Data, networkSolids_Skill_Data } from './skills';

export const molecularAndExtendedStructure_SkillGroup_Data = buildSkillGroupConfig({
  slug: "molecularAndExtendedStructure",
  id: "f680f310-7c99-406f-b347-6b8060e08cf2",
  name: {
    en: "Molecular and Extended Structure",
  },
  skills: {
    ionicLattices: ionicLattices_Skill_Data,
    molecularGeometry: molecularGeometry_Skill_Data,
    molecularPolarity: molecularPolarity_Skill_Data,
    networkSolids: networkSolids_Skill_Data,
  },
  description: {
    methodological: "Spatial arrangement and connectedness influence substance behavior independently of a simple formula.",
    frontend: {
      en: "Learn how the arrangement of particles influences the behavior of materials.",
    },
  },
});
