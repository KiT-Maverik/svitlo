import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyMaterialsByTransparency_Skill_Data } from './skills';

export const transparency_SkillGroup_Data = buildSkillGroupConfig({
  slug: "transparency",
  id: "8e97eed3-4d52-4756-9d6e-e7388ce2510c",
  name: {
    en: "Transparency",
  },
  skills: {
    classifyMaterialsByTransparency: classifyMaterialsByTransparency_Skill_Data,
  },
  description: {
    methodological: "Transparency characterizes the transmission, absorption, and scattering of visible light by a material and its ability to transmit an image.",
    frontend: {
      en: "Learn how materials differ in the amount and clarity of light they transmit.",
    },
  },
});
