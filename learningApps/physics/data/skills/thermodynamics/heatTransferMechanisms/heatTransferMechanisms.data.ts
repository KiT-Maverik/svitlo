import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainConductionAsEnergyTransferThroughMatter_Skill_Data, explainConvectionAsEnergyTransferByFluidFlow_Skill_Data, explainRadiativeHeatTransfer_Skill_Data, identifyTheHeatTransferMechanismFromAPhysicalSituation_Skill_Data, predictTheDirectionOfHeatTransfer_Skill_Data } from './skills';

export const heatTransferMechanisms_SkillGroup_Data = buildSkillGroupConfig({
  slug: "heatTransferMechanisms",
  id: "16a67cce-690b-47b9-bd61-79a3c147cec2",
  name: {
    en: "Heat-Transfer Mechanisms",
  },
  skills: {
    explainConductionAsEnergyTransferThroughMatter: explainConductionAsEnergyTransferThroughMatter_Skill_Data,
    explainConvectionAsEnergyTransferByFluidFlow: explainConvectionAsEnergyTransferByFluidFlow_Skill_Data,
    explainRadiativeHeatTransfer: explainRadiativeHeatTransfer_Skill_Data,
    identifyTheHeatTransferMechanismFromAPhysicalSituation: identifyTheHeatTransferMechanismFromAPhysicalSituation_Skill_Data,
    predictTheDirectionOfHeatTransfer: predictTheDirectionOfHeatTransfer_Skill_Data,
  },
  description: {
    methodological: "Thermal energy is transferred through particle interactions, liquid or gas motion, or electromagnetic radiation. Several mechanisms may act simultaneously in a single process.",
    frontend: {
      en: "Discover how heat transfers through matter, flowing fluids and radiation.",
    },
  },
});
