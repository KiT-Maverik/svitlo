import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { electricalIsolation_Skill_Data, measureCircuitCurrent_Skill_Data, measureCircuitVoltage_Skill_Data, overcurrentProtection_Skill_Data, protectiveGrounding_Skill_Data } from './skills';

export const electricalMeasurementAndProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electricalMeasurementAndProtection",
  id: "e1010bac-5dbe-4d67-9461-de50a0b1b608",
  name: {
    en: "Electrical Measurement and Protection",
  },
  skills: {
    electricalIsolation: electricalIsolation_Skill_Data,
    measureCircuitCurrent: measureCircuitCurrent_Skill_Data,
    measureCircuitVoltage: measureCircuitVoltage_Skill_Data,
    overcurrentProtection: overcurrentProtection_Skill_Data,
    protectiveGrounding: protectiveGrounding_Skill_Data,
  },
  description: {
    methodological: "Measurements must be connected correctly, while protective devices prevent harmful operating conditions rather than simply switching equipment normally.",
    frontend: {
      en: "Learn how electrical measurements and protection devices support safety.",
    },
  },
});
