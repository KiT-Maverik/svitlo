import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const classifySettlementsByTheirGeographicCharacteristics_Skill_Data = buildSkillConfig({
  slug: "classifySettlementsByTheirGeographicCharacteristics",
  id: "c7a4b04b-29ed-4a90-886a-40937cce844e",
  name: {
    en: "Classify settlements by their geographic characteristics",
  },
  description: {
    methodological: "Distinguish categories such as villages, towns and cities using available attributes, explicitly noting that legal and population thresholds differ between countries.",
    frontend: {
      en: "Compare types of settlements while accounting for different national definitions.",
    },
  },
});
