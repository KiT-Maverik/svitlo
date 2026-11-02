import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishAttractionFromRepulsionBetweenElectricCharges_Skill_Data, explainConservationOfElectricCharge_Skill_Data, recognizeTheChargingOfObjectsByFriction_Skill_Data } from './skills';

export const electricChargesAndInteractions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electricChargesAndInteractions",
  id: "6675b50e-4ced-4075-afd3-3d8831b023dd",
  name: {
    en: "Electric Charges and Interactions",
  },
  skills: {
    distinguishAttractionFromRepulsionBetweenElectricCharges: distinguishAttractionFromRepulsionBetweenElectricCharges_Skill_Data,
    explainConservationOfElectricCharge: explainConservationOfElectricCharge_Skill_Data,
    recognizeTheChargingOfObjectsByFriction: recognizeTheChargingOfObjectsByFriction_Skill_Data,
  },
  description: {
    methodological: "Electrification, interactions between charged bodies, and charge transfer obey conservation of electric charge. Electric interaction can occur without direct contact.",
    frontend: {
      en: "Learn how electric charges are transferred and exert forces.",
    },
  },
});
