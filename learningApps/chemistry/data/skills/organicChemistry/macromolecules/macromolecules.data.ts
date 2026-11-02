import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { additionPolymers_Skill_Data, condensationPolymers_Skill_Data, polymerization_Skill_Data, polymerStructureAndProperties_Skill_Data } from './skills';

export const macromolecules_SkillGroup_Data = buildSkillGroupConfig({
  slug: "macromolecules",
  id: "cd5a512e-29a2-4a69-92c3-18aef052399c",
  name: {
    en: "Macromolecules",
  },
  skills: {
    additionPolymers: additionPolymers_Skill_Data,
    condensationPolymers: condensationPolymers_Skill_Data,
    polymerization: polymerization_Skill_Data,
    polymerStructureAndProperties: polymerStructureAndProperties_Skill_Data,
  },
  description: {
    methodological: "Repeated subunits and molecular architecture create materials with behaviors not predicted by monomer identities alone.",
    frontend: {
      en: "Understand how repeated building blocks produce large molecules with distinctive properties.",
    },
  },
});
