import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assembleALowVoltageCircuit_Skill_Data, designASwitchingCircuit_Skill_Data, interpretCircuitDiagrams_Skill_Data, parallelCircuitArrangements_Skill_Data, seriesCircuitArrangements_Skill_Data } from './skills';

export const circuitConstruction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "circuitConstruction",
  id: "ce9141c8-327c-4521-9e43-4d0d7a489c82",
  name: {
    en: "Circuit Construction",
  },
  skills: {
    assembleALowVoltageCircuit: assembleALowVoltageCircuit_Skill_Data,
    designASwitchingCircuit: designASwitchingCircuit_Skill_Data,
    interpretCircuitDiagrams: interpretCircuitDiagrams_Skill_Data,
    parallelCircuitArrangements: parallelCircuitArrangements_Skill_Data,
    seriesCircuitArrangements: seriesCircuitArrangements_Skill_Data,
  },
  description: {
    methodological: "A functioning assembly requires compatible sources, loads and connections, including means of switching and independent distribution.",
    frontend: {
      en: "Discover how diagrams guide the construction of practical electrical circuits.",
    },
  },
});
