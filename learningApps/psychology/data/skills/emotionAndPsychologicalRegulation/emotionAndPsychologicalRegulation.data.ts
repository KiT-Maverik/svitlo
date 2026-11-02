import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { emotionalProcesses_SkillGroup_Data } from './emotionalProcesses/emotionalProcesses.data';
import { recognitionAndExpression_SkillGroup_Data } from './recognitionAndExpression/recognitionAndExpression.data';
import { regulationStrategies_SkillGroup_Data } from './regulationStrategies/regulationStrategies.data';
import { stressAndCoping_SkillGroup_Data } from './stressAndCoping/stressAndCoping.data';

export const emotionAndPsychologicalRegulation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "emotionAndPsychologicalRegulation",
  id: "73a0c114-3219-4229-b19f-d67cf632abb7",
  name: {
    en: "Emotion and Psychological Regulation",
  },
  groups: {
    emotionalProcesses: emotionalProcesses_SkillGroup_Data,
    recognitionAndExpression: recognitionAndExpression_SkillGroup_Data,
    regulationStrategies: regulationStrategies_SkillGroup_Data,
    stressAndCoping: stressAndCoping_SkillGroup_Data,
  },
  description: {
    methodological: "Emotional responses combine appraisal, bodily activation, expression, and action tendencies. Regulation concerns responding flexibly to emotions, not suppressing every uncomfortable experience.",
    frontend: {
      en: "Explore how emotions arise, communicate information and can be managed.",
    },
  },
});
