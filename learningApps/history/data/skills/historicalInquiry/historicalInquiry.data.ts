import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { historicalExplanations_SkillGroup_Data } from './historicalExplanations/historicalExplanations.data';
import { historicalGeography_SkillGroup_Data } from './historicalGeography/historicalGeography.data';
import { historicalSources_SkillGroup_Data } from './historicalSources/historicalSources.data';
import { timeAndPeriodization_SkillGroup_Data } from './timeAndPeriodization/timeAndPeriodization.data';

export const historicalInquiry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "historicalInquiry",
  id: "15c40ab9-112c-47f4-b106-4ff75ad99b1e",
  name: {
    en: "Історичне пізнання",
  },
  groups: {
    historicalExplanations: historicalExplanations_SkillGroup_Data,
    historicalGeography: historicalGeography_SkillGroup_Data,
    historicalSources: historicalSources_SkillGroup_Data,
    timeAndPeriodization: timeAndPeriodization_SkillGroup_Data,
  },
  description: {
    methodological: "Methods for establishing and checking knowledge of past societies through chronology, geography, source evidence, and historical inference. These competencies apply across ancient regions rather than defining a lesson sequence.",
    frontend: {
      en: "Learn how historians investigate the past and evaluate what we know.",
    },
  },
});
