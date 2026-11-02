import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAlphaBetaAndGammaRadiation_Skill_Data, distinguishNuclearTransformationFromChemicalChange_Skill_Data, explainHalfLife_Skill_Data, explainNuclearFission_Skill_Data, explainNuclearFusion_Skill_Data, explainRadioactivity_Skill_Data } from './skills';

export const nuclearPhenomena_SkillGroup_Data = buildSkillGroupConfig({
  slug: "nuclearPhenomena",
  id: "03e032d8-030d-438a-9577-852ccdf688bf",
  name: {
    en: "Nuclear Phenomena",
  },
  skills: {
    distinguishAlphaBetaAndGammaRadiation: distinguishAlphaBetaAndGammaRadiation_Skill_Data,
    distinguishNuclearTransformationFromChemicalChange: distinguishNuclearTransformationFromChemicalChange_Skill_Data,
    explainHalfLife: explainHalfLife_Skill_Data,
    explainNuclearFission: explainNuclearFission_Skill_Data,
    explainNuclearFusion: explainNuclearFusion_Skill_Data,
    explainRadioactivity: explainRadioactivity_Skill_Data,
  },
  description: {
    methodological: "Changes in atomic nuclei differ from chemical reactions and may release energy.",
    frontend: {
      en: "Discover how nuclei change and why some transformations release energy.",
    },
  },
});
