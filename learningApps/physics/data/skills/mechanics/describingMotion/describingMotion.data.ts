import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareSpeedsOfMotion_Skill_Data, describeTheDirectionOfMotion_Skill_Data, identifyMotionRelativeToAReferencePoint_Skill_Data, recognizePeriodicMotion_Skill_Data } from './skills';

export const describingMotion_SkillGroup_Data = buildSkillGroupConfig({
  slug: "describingMotion",
  id: "60a0fc2f-85cd-4712-8cd1-a2a2de88270d",
  name: {
    en: "Describing Motion",
  },
  skills: {
    compareSpeedsOfMotion: compareSpeedsOfMotion_Skill_Data,
    describeTheDirectionOfMotion: describeTheDirectionOfMotion_Skill_Data,
    identifyMotionRelativeToAReferencePoint: identifyMotionRelativeToAReferencePoint_Skill_Data,
    recognizePeriodicMotion: recognizePeriodicMotion_Skill_Data,
  },
  description: {
    methodological: "Position, direction, speed, and repetition are needed for a qualitative description of a trajectory; motion is always considered relative to a chosen reference.",
    frontend: {
      en: "Learn to describe where things move and how motion changes with time.",
    },
  },
});
