import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { keyContributions_SkillGroup_Data } from './keyContributions/keyContributions.data';
import { machinesAndCryptanalysis_SkillGroup_Data } from './machinesAndCryptanalysis/machinesAndCryptanalysis.data';

export const historyOfProgramming_SkillDomain_Data = buildSkillDomainConfig({
  slug: "historyOfProgramming",
  id: "2e78bd25-108e-4fc4-9a8a-98376c0efc29",
  name: {
    en: "History of Programming",
  },
  groups: {
    keyContributions: keyContributions_SkillGroup_Data,
    machinesAndCryptanalysis: machinesAndCryptanalysis_SkillGroup_Data,
  },
  description: {
    methodological: "Traces the origins of algorithmic ideas, programming practices, software tools, networking solutions, and computing machines in historical context. Recognizes individual and collaborative contributions, including women's long-undervalued work, without making every biography a separate competency.",
    frontend: {
      en: "Discover how programming ideas and computing machines developed through history.",
    },
  },
});
