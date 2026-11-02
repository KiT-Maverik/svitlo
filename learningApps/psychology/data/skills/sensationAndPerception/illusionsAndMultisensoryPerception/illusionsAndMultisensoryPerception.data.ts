import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { crossModalIntegration_Skill_Data, eyewitnessPerception_Skill_Data, perceptualExpectations_Skill_Data, visualIllusions_Skill_Data } from './skills';

export const illusionsAndMultisensoryPerception_SkillGroup_Data = buildSkillGroupConfig({
  slug: "illusionsAndMultisensoryPerception",
  id: "aedf27d5-0c7a-43d3-8a94-8e1361e93155",
  name: {
    en: "Illusions and Multisensory Perception",
  },
  skills: {
    crossModalIntegration: crossModalIntegration_Skill_Data,
    eyewitnessPerception: eyewitnessPerception_Skill_Data,
    perceptualExpectations: perceptualExpectations_Skill_Data,
    visualIllusions: visualIllusions_Skill_Data,
  },
  description: {
    methodological: "Systematic distortions and interactions across senses reveal how perception infers likely causes of stimulation.",
    frontend: {
      en: "Discover what sensory illusions reveal about how perception works.",
    },
  },
});
