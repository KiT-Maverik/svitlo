import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { causalityAndExperiments_SkillGroup_Data } from './causalityAndExperiments/causalityAndExperiments.data';
import { economicIndicators_SkillGroup_Data } from './economicIndicators/economicIndicators.data';
import { economicModels_SkillGroup_Data } from './economicModels/economicModels.data';
import { empiricalConclusionsAndForecasts_SkillGroup_Data } from './empiricalConclusionsAndForecasts/empiricalConclusionsAndForecasts.data';

export const economicDataAndResearch_SkillDomain_Data = buildSkillDomainConfig({
  slug: "economicDataAndResearch",
  id: "feb1ad22-0cd9-4aea-b1c6-9865a07880e0",
  name: {
    en: "Економічні дані та дослідження",
  },
  groups: {
    causalityAndExperiments: causalityAndExperiments_SkillGroup_Data,
    economicIndicators: economicIndicators_SkillGroup_Data,
    economicModels: economicModels_SkillGroup_Data,
    empiricalConclusionsAndForecasts: empiricalConclusionsAndForecasts_SkillGroup_Data,
  },
  description: {
    methodological: "Economic claims are tested through measurement, models, comparison, and causal analysis. The emphasis is on the validity of conclusions rather than programming data-processing tools.",
    frontend: {
      en: "Discover how economists use data and models to test claims.",
    },
  },
});
