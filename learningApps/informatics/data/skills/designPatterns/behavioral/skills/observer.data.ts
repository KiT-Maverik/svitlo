import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const observer_Skill_Data = buildSkillConfig({
  slug: "observer",
  id: "54077d59-4091-478a-ba0a-e92f9311d281",
  name: {
    en: "Observer",
  },
  description: {
    methodological: "Notify subscribers when a source changes without knowing which particular action each subscriber will take.",
    frontend: {
      en: "Notify interested subscribers when an observed object changes.",
    },
  },
});
