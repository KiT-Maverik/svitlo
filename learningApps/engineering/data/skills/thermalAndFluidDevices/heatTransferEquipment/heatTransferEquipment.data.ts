import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { heatExchangers_Skill_Data, heatPumps_Skill_Data, refrigerationEquipment_Skill_Data, thermalInsulationSuitability_Skill_Data } from './skills';

export const heatTransferEquipment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "heatTransferEquipment",
  id: "dd8d5349-d66f-4634-847b-2470ce2fe04d",
  name: {
    en: "Heat Transfer Equipment",
  },
  skills: {
    heatExchangers: heatExchangers_Skill_Data,
    heatPumps: heatPumps_Skill_Data,
    refrigerationEquipment: refrigerationEquipment_Skill_Data,
    thermalInsulationSuitability: thermalInsulationSuitability_Skill_Data,
  },
  description: {
    methodological: "Temperature-control devices combine energy input, circulation and insulation to maintain useful thermal conditions.",
    frontend: {
      en: "Learn how equipment transfers heat and maintains chosen temperatures.",
    },
  },
});
