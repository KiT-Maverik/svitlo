import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { memoryConfidenceAndAccuracy_Skill_Data, memoryRecall_Skill_Data, memoryRecognition_Skill_Data, misinformationEffects_Skill_Data, proactiveInterference_Skill_Data, retrievalCues_Skill_Data, retroactiveInterference_Skill_Data } from './skills';

export const retrievalAndDistortion_SkillGroup_Data = buildSkillGroupConfig({
  slug: "retrievalAndDistortion",
  id: "c9433305-42d1-413e-ac6a-481662936b44",
  name: {
    en: "Retrieval and Distortion",
  },
  skills: {
    memoryConfidenceAndAccuracy: memoryConfidenceAndAccuracy_Skill_Data,
    memoryRecall: memoryRecall_Skill_Data,
    memoryRecognition: memoryRecognition_Skill_Data,
    misinformationEffects: misinformationEffects_Skill_Data,
    proactiveInterference: proactiveInterference_Skill_Data,
    retrievalCues: retrievalCues_Skill_Data,
    retroactiveInterference: retroactiveInterference_Skill_Data,
  },
  description: {
    methodological: "Access is cue-dependent and reconstructive; incorrect recollection does not automatically imply deliberate deception.",
    frontend: {
      en: "Explore why remembering involves retrieval and sometimes distortion.",
    },
  },
});
