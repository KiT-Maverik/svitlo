import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalDataInterpretation_Skill_Data, measurementUncertainty_Skill_Data, measuringMass_Skill_Data, measuringVolume_Skill_Data, observingChemicalProperties_Skill_Data } from './skills';

export const measurementsAndEvidence_SkillGroup_Data = buildSkillGroupConfig({
  slug: "measurementsAndEvidence",
  id: "3a4b2020-e385-431c-9120-e577693bc73b",
  name: {
    en: "Measurements and Evidence",
  },
  skills: {
    chemicalDataInterpretation: chemicalDataInterpretation_Skill_Data,
    measurementUncertainty: measurementUncertainty_Skill_Data,
    measuringMass: measuringMass_Skill_Data,
    measuringVolume: measuringVolume_Skill_Data,
    observingChemicalProperties: observingChemicalProperties_Skill_Data,
  },
  description: {
    methodological: "Chemical conclusions depend on measured quantities, recorded conditions and the distinction between observed patterns and explanatory claims.",
    frontend: {
      en: "Explore how measurements and careful observation support chemical explanations.",
    },
  },
});
