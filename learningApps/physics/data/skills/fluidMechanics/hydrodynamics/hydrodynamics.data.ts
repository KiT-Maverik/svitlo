import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareResistanceToMotionInWaterAndAir_Skill_Data, explainContinuityOfIncompressibleFluidFlow_Skill_Data, explainWaterFlowBetweenContainersAtDifferentLevels_Skill_Data } from './skills';

export const hydrodynamics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "hydrodynamics",
  id: "45ba85be-1a0a-47ee-896e-585e6c29fa5f",
  name: {
    en: "Hydrodynamics",
  },
  skills: {
    compareResistanceToMotionInWaterAndAir: compareResistanceToMotionInWaterAndAir_Skill_Data,
    explainContinuityOfIncompressibleFluidFlow: explainContinuityOfIncompressibleFluidFlow_Skill_Data,
    explainWaterFlowBetweenContainersAtDifferentLevels: explainWaterFlowBetweenContainersAtDifferentLevels_Skill_Data,
  },
  description: {
    methodological: "Water and other liquids flow under certain conditions and resist bodies moving through the stream; comparison with air explains differences between the media.",
    frontend: {
      en: "Understand how water flows and resists objects moving through it.",
    },
  },
});
