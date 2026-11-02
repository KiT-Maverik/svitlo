import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainAnOpenCircuit_Skill_Data, explainCurrentBalanceAtACircuitNode_Skill_Data, explainParallelConnectionsOfElectricCircuitComponents_Skill_Data, explainSeriesConnectionsOfElectricCircuitComponents_Skill_Data, identifyAConsumerOfElectricalEnergy_Skill_Data, identifyAnElectricalPowerSource_Skill_Data, identifyTheFunctionOfASwitch_Skill_Data, predictTheEffectOfASwitchInACircuit_Skill_Data, recognizeAClosedElectricCircuit_Skill_Data } from './skills';

export const electricCircuits_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electricCircuits",
  id: "d5d2a4a4-8869-4481-a1b1-b72ada3ac6bb",
  name: {
    en: "Electric Circuits",
  },
  skills: {
    explainAnOpenCircuit: explainAnOpenCircuit_Skill_Data,
    explainCurrentBalanceAtACircuitNode: explainCurrentBalanceAtACircuitNode_Skill_Data,
    explainParallelConnectionsOfElectricCircuitComponents: explainParallelConnectionsOfElectricCircuitComponents_Skill_Data,
    explainSeriesConnectionsOfElectricCircuitComponents: explainSeriesConnectionsOfElectricCircuitComponents_Skill_Data,
    identifyAConsumerOfElectricalEnergy: identifyAConsumerOfElectricalEnergy_Skill_Data,
    identifyAnElectricalPowerSource: identifyAnElectricalPowerSource_Skill_Data,
    identifyTheFunctionOfASwitch: identifyTheFunctionOfASwitch_Skill_Data,
    predictTheEffectOfASwitchInACircuit: predictTheEffectOfASwitchInACircuit_Skill_Data,
    recognizeAClosedElectricCircuit: recognizeAClosedElectricCircuit_Skill_Data,
  },
  description: {
    methodological: "An electric circuit needs a conducting path, a source, and components whose interactions determine the operation of a safe model.",
    frontend: {
      en: "Discover how sources, switches and loads work together in simple circuits.",
    },
  },
});
