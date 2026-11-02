import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { predictTheDirectionOfAReflectedRay_Skill_Data, recognizeLightReflection_Skill_Data } from './skills';

export const lightReflection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "lightReflection",
  id: "8d5fbd39-1a3f-464b-80f9-379725d27dbe",
  name: {
    en: "Light Reflection",
  },
  skills: {
    predictTheDirectionOfAReflectedRay: predictTheDirectionOfAReflectedRay_Skill_Data,
    recognizeLightReflection: recognizeLightReflection_Skill_Data,
  },
  description: {
    methodological: "A surface changes the direction of a light ray; mirrors provide a visible model of this behavior.",
    frontend: {
      en: "Discover how light changes direction when it meets a reflecting surface.",
    },
  },
});
