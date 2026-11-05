import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const physiologicalMonitoringDevices_Skill_Data = buildSkillConfig({
  slug: 'physiologicalMonitoringDevices',
  id: '76779ba3-19ac-44c9-b79e-0e771f4d833f',
  name: {
    en: 'Physiological monitoring devices',
  },
  description: {
    methodological:
      'Identify the sensing, acquisition and physical protection subsystems used to measure temperature, electrical activity or oxygen saturation without inferring clinical diagnoses.',
    frontend: {
      en: 'Trace how monitoring equipment converts physical signals into measurements.',
    },
  },
});
