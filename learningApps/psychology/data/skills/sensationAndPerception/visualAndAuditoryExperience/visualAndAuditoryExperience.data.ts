import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { colorPerception_Skill_Data, depthPerception_Skill_Data, soundLocalization_Skill_Data, speechPerception_Skill_Data } from './skills';

export const visualAndAuditoryExperience_SkillGroup_Data = buildSkillGroupConfig({
  slug: "visualAndAuditoryExperience",
  id: "19eae296-470e-4fdd-b5e1-7a28b17d5d7b",
  name: {
    en: "Visual and Auditory Experience",
  },
  skills: {
    colorPerception: colorPerception_Skill_Data,
    depthPerception: depthPerception_Skill_Data,
    soundLocalization: soundLocalization_Skill_Data,
    speechPerception: speechPerception_Skill_Data,
  },
  description: {
    methodological: "Spatial, chromatic, and speech experiences emerge from interpreting patterns of visual or acoustic information.",
    frontend: {
      en: "Discover how we interpret visual and auditory patterns.",
    },
  },
});
