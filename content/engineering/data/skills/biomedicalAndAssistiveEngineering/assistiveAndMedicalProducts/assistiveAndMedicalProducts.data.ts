import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  evaluateMedicalDeviceDesignConstraints_Skill_Data,
  hearingAssistanceDevices_Skill_Data,
  prostheticDeviceFunctions_Skill_Data,
} from './skills';

export const assistiveAndMedicalProducts_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'assistiveAndMedicalProducts',
  id: 'e38896f4-4a54-4873-b28f-2743fd9b0914',
  name: {
    en: 'Assistive and Medical Products',
  },
  skills: {
    evaluateMedicalDeviceDesignConstraints: evaluateMedicalDeviceDesignConstraints_Skill_Data,
    hearingAssistanceDevices: hearingAssistanceDevices_Skill_Data,
    prostheticDeviceFunctions: prostheticDeviceFunctions_Skill_Data,
  },
  description: {
    methodological:
      'Devices that contact or support human bodies require function, fit and safety considerations beyond an ordinary consumer gadget.',
    frontend: {
      en: 'Discover the engineering functions of assistive and medical devices.',
    },
  },
});
