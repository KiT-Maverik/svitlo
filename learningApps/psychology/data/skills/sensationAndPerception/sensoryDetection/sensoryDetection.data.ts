import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { detectionThresholds_Skill_Data, differenceThresholds_Skill_Data, sensationVersusPerception_Skill_Data, sensoryAdaptation_Skill_Data, sensoryTransduction_Skill_Data } from './skills';

export const sensoryDetection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sensoryDetection",
  id: "0776705e-3db8-489d-9fdc-009e46b6596e",
  name: {
    en: "Sensory Detection",
  },
  skills: {
    detectionThresholds: detectionThresholds_Skill_Data,
    differenceThresholds: differenceThresholds_Skill_Data,
    sensationVersusPerception: sensationVersusPerception_Skill_Data,
    sensoryAdaptation: sensoryAdaptation_Skill_Data,
    sensoryTransduction: sensoryTransduction_Skill_Data,
  },
  description: {
    methodological: "Sensitivity depends on stimulus intensity, adaptation, and detection conditions rather than a perfectly fixed threshold.",
    frontend: {
      en: "Explore how the strength and conditions of stimulation affect detection.",
    },
  },
});
