import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  biomedicalMeasurementReliability_Skill_Data,
  diagnosticImagingHardware_Skill_Data,
  physiologicalMonitoringDevices_Skill_Data,
} from './skills';

export const medicalMeasurementDevices_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'medicalMeasurementDevices',
  id: '4238e4eb-0fad-48c7-8693-bde20859e3bc',
  name: {
    en: 'Medical Measurement Devices',
  },
  skills: {
    biomedicalMeasurementReliability: biomedicalMeasurementReliability_Skill_Data,
    diagnosticImagingHardware: diagnosticImagingHardware_Skill_Data,
    physiologicalMonitoringDevices: physiologicalMonitoringDevices_Skill_Data,
  },
  description: {
    methodological:
      'Biomedical devices measure physiological or physical signals with specialized coupling, safety and reliability concerns distinct from ordinary industrial sensing.',
    frontend: {
      en: 'Learn how devices measure and image physiological conditions.',
    },
  },
});
