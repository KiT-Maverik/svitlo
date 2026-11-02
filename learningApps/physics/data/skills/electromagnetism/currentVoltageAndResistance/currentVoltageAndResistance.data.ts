import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainElectricalPower_Skill_Data, explainElectricalResistance_Skill_Data, explainElectricCurrent_Skill_Data, explainElectricVoltage_Skill_Data, explainOhmsLawForAnOhmicConductor_Skill_Data } from './skills';

export const currentVoltageAndResistance_SkillGroup_Data = buildSkillGroupConfig({
  slug: "currentVoltageAndResistance",
  id: "5dad7c80-6230-420d-880c-f9ef4e5b7775",
  name: {
    en: "Current, Voltage, and Resistance",
  },
  skills: {
    explainElectricalPower: explainElectricalPower_Skill_Data,
    explainElectricalResistance: explainElectricalResistance_Skill_Data,
    explainElectricCurrent: explainElectricCurrent_Skill_Data,
    explainElectricVoltage: explainElectricVoltage_Skill_Data,
    explainOhmsLawForAnOhmicConductor: explainOhmsLawForAnOhmicConductor_Skill_Data,
  },
  description: {
    methodological: "Current describes the flow of electric charge, voltage is a potential difference, and resistance is opposition to current under specified physical conditions.",
    frontend: {
      en: "Discover how current, voltage, resistance and power describe circuits.",
    },
  },
});
