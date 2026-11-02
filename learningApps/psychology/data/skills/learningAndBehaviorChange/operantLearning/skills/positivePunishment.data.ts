import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const positivePunishment_Skill_Data = buildSkillConfig({
  slug: "positivePunishment",
  id: "48e29b60-24a6-4de1-9b9a-93e55b18afc0",
  name: {
    en: "Positive Punishment",
  },
  description: {
    methodological: "Identify an added consequence followed by a reduction in the future occurrence of a behavior.",
    frontend: {
      en: "Recognize when adding a consequence reduces the chance of an action.",
    },
  },
});
