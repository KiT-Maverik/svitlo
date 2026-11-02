import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { barriersToMarketEntry_Skill_Data, marketPower_Skill_Data, typesOfMarketCompetition_Skill_Data } from './skills';

export const competitiveMarketStructures_SkillGroup_Data = buildSkillGroupConfig({
  slug: "competitiveMarketStructures",
  id: "9b682e39-5dc9-44c9-abab-65a58e1a9ad1",
  name: {
    en: "Конкурентні структури",
  },
  skills: {
    barriersToMarketEntry: barriersToMarketEntry_Skill_Data,
    marketPower: marketPower_Skill_Data,
    typesOfMarketCompetition: typesOfMarketCompetition_Skill_Data,
  },
  description: {
    methodological: "Participant numbers and market power, product differentiation, information, and barriers to entry influence competitive behavior and outcomes.",
    frontend: {
      en: "Compare markets with many competitors and markets dominated by a few.",
    },
  },
});
