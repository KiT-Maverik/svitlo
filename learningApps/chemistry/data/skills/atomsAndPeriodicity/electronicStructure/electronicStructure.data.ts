import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { atomicOrbitals_Skill_Data, electronConfigurations_Skill_Data, electronShells_Skill_Data, ionFormation_Skill_Data, valenceElectrons_Skill_Data } from './skills';

export const electronicStructure_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electronicStructure",
  id: "a2603683-b48f-439e-bf47-d93316f85130",
  name: {
    en: "Electronic Structure",
  },
  skills: {
    atomicOrbitals: atomicOrbitals_Skill_Data,
    electronConfigurations: electronConfigurations_Skill_Data,
    electronShells: electronShells_Skill_Data,
    ionFormation: ionFormation_Skill_Data,
    valenceElectrons: valenceElectrons_Skill_Data,
  },
  description: {
    methodological: "Electron occupancy and energetic organization help explain reactivity and the behavior of valence electrons.",
    frontend: {
      en: "Learn how electrons are arranged and why that affects chemical behavior.",
    },
  },
});
