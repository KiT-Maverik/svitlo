import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { encodingAndConsolidation_SkillGroup_Data } from './encodingAndConsolidation/encodingAndConsolidation.data';
import { memorySystems_SkillGroup_Data } from './memorySystems/memorySystems.data';
import { monitoringAndLearningStrategies_SkillGroup_Data } from './monitoringAndLearningStrategies/monitoringAndLearningStrategies.data';
import { retrievalAndDistortion_SkillGroup_Data } from './retrievalAndDistortion/retrievalAndDistortion.data';

export const memoryAndMetacognition_SkillDomain_Data = buildSkillDomainConfig({
  slug: "memoryAndMetacognition",
  id: "c8e7be39-97ef-4f96-9577-4525e5bc6659",
  name: {
    en: "Memory and Metacognition",
  },
  groups: {
    encodingAndConsolidation: encodingAndConsolidation_SkillGroup_Data,
    memorySystems: memorySystems_SkillGroup_Data,
    monitoringAndLearningStrategies: monitoringAndLearningStrategies_SkillGroup_Data,
    retrievalAndDistortion: retrievalAndDistortion_SkillGroup_Data,
  },
  description: {
    methodological: "Remembering involves encoding, retention, retrieval, reconstruction, and monitoring. Memory science explains why familiar material can be difficult to recall and why subjective confidence may mislead.",
    frontend: {
      en: "Discover how memories form, change and can be monitored during learning.",
    },
  },
});
