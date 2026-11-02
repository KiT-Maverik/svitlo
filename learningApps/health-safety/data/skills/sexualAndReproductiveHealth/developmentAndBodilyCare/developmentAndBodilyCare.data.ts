import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { manageMenstrualHealth_Skill_Data, recognizeReproductiveHealthConcerns_Skill_Data, understandPubertalChanges_Skill_Data } from './skills';

export const developmentAndBodilyCare_SkillGroup_Data = buildSkillGroupConfig({
  slug: "developmentAndBodilyCare",
  id: "0562dc6a-4366-4774-ac8b-8db8684c8eca",
  name: {
    en: "Development and Bodily Care",
  },
  skills: {
    manageMenstrualHealth: manageMenstrualHealth_Skill_Data,
    recognizeReproductiveHealthConcerns: recognizeReproductiveHealthConcerns_Skill_Data,
    understandPubertalChanges: understandPubertalChanges_Skill_Data,
  },
  description: {
    methodological: "Changes through puberty differ in timing and expression; normal variation and symptoms needing assessment should not be conflated.",
    frontend: {
      en: "Explore bodily changes through puberty and appropriate personal care.",
    },
  },
});
