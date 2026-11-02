import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeACosmologicalArgument_Skill_Data, analyzeADesignArgument_Skill_Data, analyzeAnArgumentFromEvil_Skill_Data, analyzeAnOntologicalArgument_Skill_Data, analyzeNontheisticReligiousAccountsOfReality_Skill_Data, comparePhilosophicalConceptionsOfDivinity_Skill_Data, evaluateAProposedUltimateExplanation_Skill_Data, reconstructAPhilosophicalArgumentAboutDivinity_Skill_Data } from './skills';

export const ultimateRealityAndDivinity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ultimateRealityAndDivinity",
  id: "3f82449f-d089-4c83-a1f7-0c375b86a18e",
  name: {
    en: "Ultimate Reality and Divinity",
  },
  skills: {
    analyzeACosmologicalArgument: analyzeACosmologicalArgument_Skill_Data,
    analyzeADesignArgument: analyzeADesignArgument_Skill_Data,
    analyzeAnArgumentFromEvil: analyzeAnArgumentFromEvil_Skill_Data,
    analyzeAnOntologicalArgument: analyzeAnOntologicalArgument_Skill_Data,
    analyzeNontheisticReligiousAccountsOfReality: analyzeNontheisticReligiousAccountsOfReality_Skill_Data,
    comparePhilosophicalConceptionsOfDivinity: comparePhilosophicalConceptionsOfDivinity_Skill_Data,
    evaluateAProposedUltimateExplanation: evaluateAProposedUltimateExplanation_Skill_Data,
    reconstructAPhilosophicalArgumentAboutDivinity: reconstructAPhilosophicalArgumentAboutDivinity_Skill_Data,
  },
  description: {
    methodological: "Religious and nonreligious accounts of ultimate reality include competing conceptions of divinity and nontheistic accounts of liberation or existence. Their arguments may invoke experience, explanation, definition, or objections, without settling a worldview by stipulation.",
    frontend: {
      en: "Examine arguments about ultimate explanations and different conceptions of divinity.",
    },
  },
});
