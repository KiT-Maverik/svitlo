import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { controlRelevantExperimentalConditions_Skill_Data, evaluateResearchEthics_Skill_Data, explainAPlaceboControl_Skill_Data, explainDoubleBlinding_Skill_Data, explainRandomAssignment_Skill_Data, explainSingleBlinding_Skill_Data, explainThePurposeOfAControlGroup_Skill_Data, identifyADependentVariable_Skill_Data, identifyAnIndependentVariable_Skill_Data } from './skills';

export const experimentalDesign_SkillGroup_Data = buildSkillGroupConfig({
  slug: "experimentalDesign",
  id: "7cc7abaa-73ff-4500-b0b1-c18b01b22012",
  name: {
    en: "Experimental Design",
  },
  skills: {
    controlRelevantExperimentalConditions: controlRelevantExperimentalConditions_Skill_Data,
    evaluateResearchEthics: evaluateResearchEthics_Skill_Data,
    explainAPlaceboControl: explainAPlaceboControl_Skill_Data,
    explainDoubleBlinding: explainDoubleBlinding_Skill_Data,
    explainRandomAssignment: explainRandomAssignment_Skill_Data,
    explainSingleBlinding: explainSingleBlinding_Skill_Data,
    explainThePurposeOfAControlGroup: explainThePurposeOfAControlGroup_Skill_Data,
    identifyADependentVariable: identifyADependentVariable_Skill_Data,
    identifyAnIndependentVariable: identifyAnIndependentVariable_Skill_Data,
  },
  description: {
    methodological: "Controlled investigations attempt to isolate explanatory factors while managing confounding, expectations, and ethical constraints. Particular safeguards solve different problems and are not interchangeable.",
    frontend: {
      en: "Discover how research designs can make comparisons more trustworthy.",
    },
  },
});
