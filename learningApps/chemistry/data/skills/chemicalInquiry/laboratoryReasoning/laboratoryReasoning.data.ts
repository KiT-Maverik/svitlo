import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalHandlingDecisions_Skill_Data, chemicalHazardSymbols_Skill_Data, evidenceBasedChemicalConclusions_Skill_Data, experimentalVariables_Skill_Data } from './skills';

export const laboratoryReasoning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "laboratoryReasoning",
  id: "e5cbb556-153e-4068-91b4-4812f46f4de7",
  name: {
    en: "Laboratory Reasoning",
  },
  skills: {
    chemicalHandlingDecisions: chemicalHandlingDecisions_Skill_Data,
    chemicalHazardSymbols: chemicalHazardSymbols_Skill_Data,
    evidenceBasedChemicalConclusions: evidenceBasedChemicalConclusions_Skill_Data,
    experimentalVariables: experimentalVariables_Skill_Data,
  },
  description: {
    methodological: "Working with substances involves controlling exposure, maintaining traceability of samples and drawing conclusions that do not exceed the evidence.",
    frontend: {
      en: "Learn how to reason safely and draw justified conclusions when working with substances.",
    },
  },
});
