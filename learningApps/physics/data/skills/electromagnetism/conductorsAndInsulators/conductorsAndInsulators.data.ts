import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyElectricallyConductiveMaterials_Skill_Data, identifyElectricallyInsulatingMaterials_Skill_Data } from './skills';

export const conductorsAndInsulators_SkillGroup_Data = buildSkillGroupConfig({
  slug: "conductorsAndInsulators",
  id: "2e1318e6-5678-474c-925b-967e0cad957f",
  name: {
    en: "Conductors and Insulators",
  },
  skills: {
    identifyElectricallyConductiveMaterials: identifyElectricallyConductiveMaterials_Skill_Data,
    identifyElectricallyInsulatingMaterials: identifyElectricallyInsulatingMaterials_Skill_Data,
  },
  description: {
    methodological: "Materials differ in how readily they permit electric charge to move; distinguish an electrical property of a material from a device's purpose.",
    frontend: {
      en: "Explore why some materials let charges move more easily than others.",
    },
  },
});
