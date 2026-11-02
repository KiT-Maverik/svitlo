import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { operantLearning_SkillGroup_Data } from './operantLearning/operantLearning.data';
import { respondentConditioning_SkillGroup_Data } from './respondentConditioning/respondentConditioning.data';
import { socialLearning_SkillGroup_Data } from './socialLearning/socialLearning.data';
import { transferAndBehavioralFlexibility_SkillGroup_Data } from './transferAndBehavioralFlexibility/transferAndBehavioralFlexibility.data';

export const learningAndBehaviorChange_SkillDomain_Data = buildSkillDomainConfig({
  slug: "learningAndBehaviorChange",
  id: "ccaf830f-559a-4140-b1c0-5affd6741164",
  name: {
    en: "Learning and Behavior Change",
  },
  groups: {
    operantLearning: operantLearning_SkillGroup_Data,
    respondentConditioning: respondentConditioning_SkillGroup_Data,
    socialLearning: socialLearning_SkillGroup_Data,
    transferAndBehavioralFlexibility: transferAndBehavioralFlexibility_SkillGroup_Data,
  },
  description: {
    methodological: "Past experience modifies responding through predictive cues, consequences, and social observation. This domain explains mechanisms of behavioral acquisition and flexibility rather than memory storage or a teaching sequence.",
    frontend: {
      en: "Explore how experience, consequences and observation change behavior over time.",
    },
  },
});
