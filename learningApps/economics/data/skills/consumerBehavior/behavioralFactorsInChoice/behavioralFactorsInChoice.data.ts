import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { boundedRationality_Skill_Data, choiceArchitecture_Skill_Data, framingEffect_Skill_Data, presentBias_Skill_Data } from './skills';

export const behavioralFactorsInChoice_SkillGroup_Data = buildSkillGroupConfig({
  slug: "behavioralFactorsInChoice",
  id: "9e4fdbbd-1167-4ab8-9c11-7bec96652f08",
  name: {
    en: "Поведінкові чинники вибору",
  },
  skills: {
    boundedRationality: boundedRationality_Skill_Data,
    choiceArchitecture: choiceArchitecture_Skill_Data,
    framingEffect: framingEffect_Skill_Data,
    presentBias: presentBias_Skill_Data,
  },
  description: {
    methodological: "Limited attention and rationality, time preferences, presentation formats, and defaults can alter economic choices even when the formal options are unchanged.",
    frontend: {
      en: "Discover how the way choices are presented influences decisions.",
    },
  },
});
