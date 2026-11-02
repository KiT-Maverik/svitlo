import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishConvergingAndDivergingLenses_Skill_Data, explainLightRefractionAtTheBoundaryBetweenMedia_Skill_Data } from './skills';

export const refractionAndLenses_SkillGroup_Data = buildSkillGroupConfig({
  slug: "refractionAndLenses",
  id: "c9296b9c-bb52-4cf4-82ef-1dbfa8d7883d",
  name: {
    en: "Refraction and Lenses",
  },
  skills: {
    distinguishConvergingAndDivergingLenses: distinguishConvergingAndDivergingLenses_Skill_Data,
    explainLightRefractionAtTheBoundaryBetweenMedia: explainLightRefractionAtTheBoundaryBetweenMedia_Skill_Data,
  },
  description: {
    methodological: "Moving between media and the shape of a lens affect ray direction and image formation.",
    frontend: {
      en: "Explore how light bends between materials and through lenses.",
    },
  },
});
