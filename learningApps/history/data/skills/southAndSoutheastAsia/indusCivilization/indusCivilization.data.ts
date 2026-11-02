import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { citiesOfTheIndusCivilization_Skill_Data, indusEconomy_Skill_Data, indusSigns_Skill_Data, transformationOfIndusCities_Skill_Data } from './skills';

export const indusCivilization_SkillGroup_Data = buildSkillGroupConfig({
  slug: "indusCivilization",
  id: "2fb73927-8f98-41e4-be76-9179ae3f9426",
  name: {
    en: "Індська цивілізація",
  },
  skills: {
    citiesOfTheIndusCivilization: citiesOfTheIndusCivilization_Skill_Data,
    indusEconomy: indusEconomy_Skill_Data,
    indusSigns: indusSigns_Skill_Data,
    transformationOfIndusCities: transformationOfIndusCities_Skill_Data,
  },
  description: {
    methodological: "Indus cities showed planning, crafts, and trade, while political and linguistic questions remain unresolved.",
    frontend: {
      en: "Discover what makes the Indus cities remarkable and mysterious.",
    },
  },
});
