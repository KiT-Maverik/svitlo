import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainPressureTransmissionInAnEnclosedLiquid_Skill_Data, explainWhyWaterPressureIncreasesWithDepth_Skill_Data, identifyGasPressureInExamples_Skill_Data, recognizeLiquidPressureActingInDifferentDirections_Skill_Data } from './skills';

export const pressureInLiquidsAndGases_SkillGroup_Data = buildSkillGroupConfig({
  slug: "pressureInLiquidsAndGases",
  id: "d9f21356-a542-4937-8c0d-47906d0e042a",
  name: {
    en: "Pressure in Liquids and Gases",
  },
  skills: {
    explainPressureTransmissionInAnEnclosedLiquid: explainPressureTransmissionInAnEnclosedLiquid_Skill_Data,
    explainWhyWaterPressureIncreasesWithDepth: explainWhyWaterPressureIncreasesWithDepth_Skill_Data,
    identifyGasPressureInExamples: identifyGasPressureInExamples_Skill_Data,
    recognizeLiquidPressureActingInDifferentDirections: recognizeLiquidPressureActingInDifferentDirections_Skill_Data,
  },
  description: {
    methodological: "Pressure is transmitted through a medium and changes with depth in still water; container examples help distinguish pressure from the mere amount of water.",
    frontend: {
      en: "Discover how liquid and gas pressure acts and changes with conditions.",
    },
  },
});
