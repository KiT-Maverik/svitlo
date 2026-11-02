import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const sleepStages_Skill_Data = buildSkillConfig({
  slug: "sleepStages",
  id: "3834fafb-d14f-48f2-890e-e51c33f28a2b",
  name: {
    en: "Sleep Stages",
  },
  description: {
    methodological: "Differentiate REM and non-REM sleep in terms of characteristic patterns without attributing a single exclusive purpose to each.",
    frontend: {
      en: "Distinguish REM from non-REM sleep without assigning exclusive functions.",
    },
  },
});
