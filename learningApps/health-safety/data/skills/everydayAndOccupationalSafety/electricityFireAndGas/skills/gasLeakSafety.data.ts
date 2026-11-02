import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const gasLeakSafety_Skill_Data = buildSkillConfig({
  slug: "gasLeakSafety",
  id: "abdc04d1-b141-45ae-95fe-f20724dc5578",
  name: {
    en: "Gas leak safety",
  },
  description: {
    methodological: "Recognize suspected leakage of combustible fuel gas and the risk of fire or explosion; withdraw from danger, seek appropriate assistance and avoid unsafe attempts to inspect or repair the system.",
    frontend: {
      en: "Recognize gas-leak concerns and seek safety rather than attempting repairs.",
    },
  },
});
