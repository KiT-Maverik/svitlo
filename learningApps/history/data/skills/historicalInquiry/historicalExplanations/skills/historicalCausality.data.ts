import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const historicalCausality_Skill_Data = buildSkillConfig({
  slug: "historicalCausality",
  id: "9a10ab0f-d3dc-44cf-ad58-3e449b80293d",
  name: {
    en: "Історична причинність",
  },
  description: {
    methodological: "Separate immediate triggers from long-term conditions and consider multiple causes of a historical change.",
    frontend: {
      en: "Explore why historical events usually have more than one cause.",
    },
  },
});
