import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  planRegularPhysicalActivity_Skill_Data,
  prepareForPhysicalExertion_Skill_Data,
  preventExerciseRelatedInjury_Skill_Data,
  recognizeWarningSignsDuringActivity_Skill_Data,
} from './skills';

export const physicalActivity_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'physicalActivity',
  id: '3244da43-c224-40e6-b362-92f3d33dc09b',
  name: {
    en: 'Physical Activity',
  },
  skills: {
    planRegularPhysicalActivity: planRegularPhysicalActivity_Skill_Data,
    prepareForPhysicalExertion: prepareForPhysicalExertion_Skill_Data,
    preventExerciseRelatedInjury: preventExerciseRelatedInjury_Skill_Data,
    recognizeWarningSignsDuringActivity: recognizeWarningSignsDuringActivity_Skill_Data,
  },
  description: {
    methodological:
      'Activity can vary by intensity, form, and personal ability; protective choices include gradual progression and responding to warning signals.',
    frontend: {
      en: 'Discover how to stay active while respecting personal capacities.',
    },
  },
});
