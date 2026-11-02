import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishElectricFromMagneticFields_Skill_Data, explainTheElectricField_Skill_Data, explainTheMagneticField_Skill_Data } from './skills';

export const electricAndMagneticFields_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electricAndMagneticFields",
  id: "d355d665-81df-43f8-9d7b-57eed091c939",
  name: {
    en: "Electric and Magnetic Fields",
  },
  skills: {
    distinguishElectricFromMagneticFields: distinguishElectricFromMagneticFields_Skill_Data,
    explainTheElectricField: explainTheElectricField_Skill_Data,
    explainTheMagneticField: explainTheMagneticField_Skill_Data,
  },
  description: {
    methodological: "Fields describe interactions involving electric charges and magnetic systems without direct contact, but their physical effects differ.",
    frontend: {
      en: "Learn how electric and magnetic fields exert different kinds of forces.",
    },
  },
});
