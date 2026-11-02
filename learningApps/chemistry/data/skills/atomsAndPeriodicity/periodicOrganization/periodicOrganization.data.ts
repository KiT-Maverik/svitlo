import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { elementFamilies_Skill_Data, metalsNonmetalsAndMetalloids_Skill_Data, periodicity_Skill_Data, periodicTableStructure_Skill_Data } from './skills';

export const periodicOrganization_SkillGroup_Data = buildSkillGroupConfig({
  slug: "periodicOrganization",
  id: "361850a5-27c3-4f80-b35b-0491f0986100",
  name: {
    en: "Periodic Organization",
  },
  skills: {
    elementFamilies: elementFamilies_Skill_Data,
    metalsNonmetalsAndMetalloids: metalsNonmetalsAndMetalloids_Skill_Data,
    periodicity: periodicity_Skill_Data,
    periodicTableStructure: periodicTableStructure_Skill_Data,
  },
  description: {
    methodological: "The periodic table encodes repeating patterns in electron configurations and useful chemical categories.",
    frontend: {
      en: "Discover how the periodic table organizes elements into useful patterns.",
    },
  },
});
