import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAnAtomFromItsPrincipalComponents_Skill_Data, explainAPhotonAsAQuantumOfElectromagneticRadiation_Skill_Data, explainDiscreteAtomicEnergyStates_Skill_Data, explainLightEmissionByAnExcitedAtom_Skill_Data, explainWaveLikeAndParticleLikeBehaviorOfQuantumObjects_Skill_Data } from './skills';

export const atomsAndQuantumPhenomena_SkillGroup_Data = buildSkillGroupConfig({
  slug: "atomsAndQuantumPhenomena",
  id: "9f6d1390-b074-4434-905b-fc3f7a95e0d2",
  name: {
    en: "Atoms and Quantum Phenomena",
  },
  skills: {
    distinguishAnAtomFromItsPrincipalComponents: distinguishAnAtomFromItsPrincipalComponents_Skill_Data,
    explainAPhotonAsAQuantumOfElectromagneticRadiation: explainAPhotonAsAQuantumOfElectromagneticRadiation_Skill_Data,
    explainDiscreteAtomicEnergyStates: explainDiscreteAtomicEnergyStates_Skill_Data,
    explainLightEmissionByAnExcitedAtom: explainLightEmissionByAnExcitedAtom_Skill_Data,
    explainWaveLikeAndParticleLikeBehaviorOfQuantumObjects: explainWaveLikeAndParticleLikeBehaviorOfQuantumObjects_Skill_Data,
  },
  description: {
    methodological: "Atomic models and discrete packets of energy help explain light and properties of matter that cannot be described solely in terms of mechanical motion.",
    frontend: {
      en: "Discover how atomic structure and quantum behavior differ from classical models.",
    },
  },
});
