import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { dynamicEquilibrium_Skill_Data, equilibriumConstants_Skill_Data, equilibriumShifts_Skill_Data, reactionReversibility_Skill_Data, solubilityEquilibrium_Skill_Data } from './skills';

export const chemicalEquilibrium_SkillGroup_Data = buildSkillGroupConfig({
  slug: "chemicalEquilibrium",
  id: "4e5a9f8e-754b-4988-8ad8-108ff06fc370",
  name: {
    en: "Chemical Equilibrium",
  },
  skills: {
    dynamicEquilibrium: dynamicEquilibrium_Skill_Data,
    equilibriumConstants: equilibriumConstants_Skill_Data,
    equilibriumShifts: equilibriumShifts_Skill_Data,
    reactionReversibility: reactionReversibility_Skill_Data,
    solubilityEquilibrium: solubilityEquilibrium_Skill_Data,
  },
  description: {
    methodological: "Forward and reverse processes may continue while bulk composition becomes steady; equilibrium responds to conditions.",
    frontend: {
      en: "Explore what happens when forward and reverse reactions reach equilibrium.",
    },
  },
});
