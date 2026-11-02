import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHowAShadowForms_Skill_Data, predictChangesInShadowSize_Skill_Data, predictThePositionOfAShadow_Skill_Data } from './skills';

export const lightAndShadows_SkillGroup_Data = buildSkillGroupConfig({
  slug: "lightAndShadows",
  id: "70f653d9-a3de-4ebc-84e4-d7aac98b02f6",
  name: {
    en: "Light and Shadows",
  },
  skills: {
    explainHowAShadowForms: explainHowAShadowForms_Skill_Data,
    predictChangesInShadowSize: predictChangesInShadowSize_Skill_Data,
    predictThePositionOfAShadow: predictThePositionOfAShadow_Skill_Data,
  },
  description: {
    methodological: "Obstacles and the source's position determine a shadow's appearance, direction, and size; a model enables qualitative predictions.",
    frontend: {
      en: "Explore how the arrangement of objects and light sources creates shadows.",
    },
  },
});
