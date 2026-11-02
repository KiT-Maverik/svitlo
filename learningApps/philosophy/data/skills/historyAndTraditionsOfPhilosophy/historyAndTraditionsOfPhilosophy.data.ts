import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { philosophicalTraditions_SkillGroup_Data } from './philosophicalTraditions/philosophicalTraditions.data';
import { readingPhilosophicalWorks_SkillGroup_Data } from './readingPhilosophicalWorks/readingPhilosophicalWorks.data';
import { schoolsAndMovements_SkillGroup_Data } from './schoolsAndMovements/schoolsAndMovements.data';

export const historyAndTraditionsOfPhilosophy_SkillDomain_Data = buildSkillDomainConfig({
  slug: "historyAndTraditionsOfPhilosophy",
  id: "0b8f224a-c4a3-4c26-9e10-d9fd054b2862",
  name: {
    en: "History and Traditions of Philosophy",
  },
  groups: {
    philosophicalTraditions: philosophicalTraditions_SkillGroup_Data,
    readingPhilosophicalWorks: readingPhilosophicalWorks_SkillGroup_Data,
    schoolsAndMovements: schoolsAndMovements_SkillGroup_Data,
  },
  description: {
    methodological: "Historically situated philosophical arguments develop through schools, intellectual movements, and traditions across cultures. Interpretation requires understanding both what a thinker argued and the debate that shaped the argument, without privileging one lineage as philosophy's default.",
    frontend: {
      en: "Explore philosophical ideas across cultures and historical periods through their arguments.",
    },
  },
});
