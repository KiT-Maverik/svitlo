import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bondEnergyEstimates_Skill_Data, calorimetry_Skill_Data, endothermicProcesses_Skill_Data, entropy_Skill_Data, exothermicProcesses_Skill_Data, gibbsEnergy_Skill_Data, hesssLaw_Skill_Data, reactionEnthalpy_Skill_Data } from './skills';

export const chemicalEnergetics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "chemicalEnergetics",
  id: "b1f1c17b-f136-4bb8-ad70-84521202cf3f",
  name: {
    en: "Chemical Energetics",
  },
  skills: {
    bondEnergyEstimates: bondEnergyEstimates_Skill_Data,
    calorimetry: calorimetry_Skill_Data,
    endothermicProcesses: endothermicProcesses_Skill_Data,
    entropy: entropy_Skill_Data,
    exothermicProcesses: exothermicProcesses_Skill_Data,
    gibbsEnergy: gibbsEnergy_Skill_Data,
    hesssLaw: hesssLaw_Skill_Data,
    reactionEnthalpy: reactionEnthalpy_Skill_Data,
  },
  description: {
    methodological: "Energy changes are properties of a system and its processes, not intrinsic fuel labels or a claim that breaking bonds alone releases energy.",
    frontend: {
      en: "Discover how energy is absorbed, released or redistributed during chemical changes.",
    },
  },
});
