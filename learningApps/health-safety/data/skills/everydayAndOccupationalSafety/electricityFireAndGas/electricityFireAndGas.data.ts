import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { carbonMonoxideSafety_Skill_Data, electricalSafety_Skill_Data, firePrevention_Skill_Data, gasLeakSafety_Skill_Data, safeUseOfHeatingEquipment_Skill_Data } from './skills';

export const electricityFireAndGas_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electricityFireAndGas",
  id: "fcf34a31-0a82-4f29-89ce-9d4aedec6254",
  name: {
    en: "Electricity, Fire and Gas",
  },
  skills: {
    carbonMonoxideSafety: carbonMonoxideSafety_Skill_Data,
    electricalSafety: electricalSafety_Skill_Data,
    firePrevention: firePrevention_Skill_Data,
    gasLeakSafety: gasLeakSafety_Skill_Data,
    safeUseOfHeatingEquipment: safeUseOfHeatingEquipment_Skill_Data,
  },
  description: {
    methodological: "Electrical hazards, ignition and fire, fuel-gas leaks, carbon monoxide exposure and heating equipment require different prevention and emergency responses; intervening in faulty systems can endanger bystanders.",
    frontend: {
      en: "Discover distinct risks from electricity, fire, gas and combustion appliances.",
    },
  },
});
