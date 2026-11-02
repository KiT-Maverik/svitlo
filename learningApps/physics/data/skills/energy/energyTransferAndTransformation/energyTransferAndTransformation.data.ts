import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainEnergyTransformationInAPhysicalProcess_Skill_Data, identifyEnergyTransferBetweenBodies_Skill_Data } from './skills';

export const energyTransferAndTransformation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "energyTransferAndTransformation",
  id: "b72e75f7-9188-4cc3-a5d7-caf2062217e5",
  name: {
    en: "Energy Transfer and Transformation",
  },
  skills: {
    explainEnergyTransformationInAPhysicalProcess: explainEnergyTransformationInAPhysicalProcess_Skill_Data,
    identifyEnergyTransferBetweenBodies: identifyEnergyTransferBetweenBodies_Skill_Data,
  },
  description: {
    methodological: "Energy can pass between objects and change form; the sequence of events matters more than the name of a particular device.",
    frontend: {
      en: "Discover how energy moves between bodies and changes form.",
    },
  },
});
