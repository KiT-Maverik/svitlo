import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { developmentalPlasticity_Skill_Data, developmentalResearchDesigns_Skill_Data, individualDevelopmentalVariation_Skill_Data, maturationAndExperience_Skill_Data } from './skills';

export const mechanismsOfDevelopment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mechanismsOfDevelopment",
  id: "b177bbfd-8b58-4c2b-9176-4d3967867187",
  name: {
    en: "Mechanisms of Development",
  },
  skills: {
    developmentalPlasticity: developmentalPlasticity_Skill_Data,
    developmentalResearchDesigns: developmentalResearchDesigns_Skill_Data,
    individualDevelopmentalVariation: individualDevelopmentalVariation_Skill_Data,
    maturationAndExperience: maturationAndExperience_Skill_Data,
  },
  description: {
    methodological: "Research examines change over time, developmental diversity, and how environments interact with biological processes.",
    frontend: {
      en: "Discover how biology, experience and context shape developmental changes.",
    },
  },
});
