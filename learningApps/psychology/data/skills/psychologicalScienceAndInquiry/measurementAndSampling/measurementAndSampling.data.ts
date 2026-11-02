import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { constructValidity_Skill_Data, measurementBias_Skill_Data, operationalDefinitions_Skill_Data, reliabilityOfMeasures_Skill_Data, representativeSampling_Skill_Data } from './skills';

export const measurementAndSampling_SkillGroup_Data = buildSkillGroupConfig({
  slug: "measurementAndSampling",
  id: "c1b0a767-00bf-4109-afa4-519074f43600",
  name: {
    en: "Measurement and Sampling",
  },
  skills: {
    constructValidity: constructValidity_Skill_Data,
    measurementBias: measurementBias_Skill_Data,
    operationalDefinitions: operationalDefinitions_Skill_Data,
    reliabilityOfMeasures: reliabilityOfMeasures_Skill_Data,
    representativeSampling: representativeSampling_Skill_Data,
  },
  description: {
    methodological: "Operational measures offer imperfect indicators of psychological constructs, and recruitment choices limit generalization.",
    frontend: {
      en: "Explore how psychologists measure constructs and choose research participants.",
    },
  },
});
