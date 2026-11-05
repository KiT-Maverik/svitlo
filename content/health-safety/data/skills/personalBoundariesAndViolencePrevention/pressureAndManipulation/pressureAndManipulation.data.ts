import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  recognizeGroomingAndExploitation_Skill_Data,
  recognizePsychologicalPressure_Skill_Data,
  resistUnsafePeerPressure_Skill_Data,
  setBoundariesInUnequalRelationships_Skill_Data,
} from './skills';

export const pressureAndManipulation_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'pressureAndManipulation',
  id: 'cb387d75-231c-49d7-a416-ce0009a08306',
  name: {
    en: 'Pressure and Manipulation',
  },
  skills: {
    recognizeGroomingAndExploitation: recognizeGroomingAndExploitation_Skill_Data,
    recognizePsychologicalPressure: recognizePsychologicalPressure_Skill_Data,
    resistUnsafePeerPressure: resistUnsafePeerPressure_Skill_Data,
    setBoundariesInUnequalRelationships: setBoundariesInUnequalRelationships_Skill_Data,
  },
  description: {
    methodological:
      'Coercion can use threats, secrecy, guilt, status, dependency, or urgency; a protective response need not persuade the aggressor.',
    frontend: {
      en: 'Discover how coercion may use guilt, threats or secrecy rather than free choice.',
    },
  },
});
