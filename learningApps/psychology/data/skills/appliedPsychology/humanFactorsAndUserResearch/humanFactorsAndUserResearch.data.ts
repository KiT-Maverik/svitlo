import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { accessibleInteractionPsychology_Skill_Data, cognitiveLoadInInterfaces_Skill_Data, humanErrorAndSystemDesign_Skill_Data, usabilityResearchMethods_Skill_Data } from './skills';

export const humanFactorsAndUserResearch_SkillGroup_Data = buildSkillGroupConfig({
  slug: "humanFactorsAndUserResearch",
  id: "d3198e57-ffdb-4e21-a96f-78e4bcf03293",
  name: {
    en: "Human Factors and User Research",
  },
  skills: {
    accessibleInteractionPsychology: accessibleInteractionPsychology_Skill_Data,
    cognitiveLoadInInterfaces: cognitiveLoadInInterfaces_Skill_Data,
    humanErrorAndSystemDesign: humanErrorAndSystemDesign_Skill_Data,
    usabilityResearchMethods: usabilityResearchMethods_Skill_Data,
  },
  description: {
    methodological: "Design decisions benefit from evidence about human attention, memory, perception, workload, and error; implementation remains owned by engineering or informatics.",
    frontend: {
      en: "Learn how attention, memory and perception inform the study of usable systems.",
    },
  },
});
