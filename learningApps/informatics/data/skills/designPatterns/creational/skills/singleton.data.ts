import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const singleton_Skill_Data = buildSkillConfig({
  slug: "singleton",
  id: "75b52db2-e571-4fae-89ef-02bf9e4141c2",
  name: {
    en: "Singleton",
  },
  description: {
    methodological: "Maintain one shared instance within a defined scope and control access to it while recognizing the risks of hidden global state.",
    frontend: {
      en: "Control access to a single shared instance while considering global-state risks.",
    },
  },
});
