import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainThePhysicalRoleOfAMagneticFieldInASystem_Skill_Data } from './skills';

export const magneticEffectsInPhysicalSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "magneticEffectsInPhysicalSystems",
  id: "5148572d-a782-42c7-81e3-cf7f30be6c64",
  name: {
    en: "Magnetic Effects in Physical Systems",
  },
  skills: {
    explainThePhysicalRoleOfAMagneticFieldInASystem: explainThePhysicalRoleOfAMagneticFieldInASystem_Skill_Data,
  },
  description: {
    methodological: "Magnetic forces in real systems are explained by fields and material properties; choosing an engineering design belongs to Engineering.",
    frontend: {
      en: "Explore the effects of magnetic fields on physical systems.",
    },
  },
});
