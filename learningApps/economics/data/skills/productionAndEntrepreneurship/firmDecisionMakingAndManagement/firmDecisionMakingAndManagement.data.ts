import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { firmProfitMaximization_Skill_Data, ownersManagersAndWorkers_Skill_Data } from './skills';

export const firmDecisionMakingAndManagement_SkillGroup_Data = buildSkillGroupConfig({
  slug: "firmDecisionMakingAndManagement",
  id: "026c8b2d-13ae-437e-bb2e-f33580b920bc",
  name: {
    en: "Рішення та управління фірмою",
  },
  skills: {
    firmProfitMaximization: firmProfitMaximization_Skill_Data,
    ownersManagersAndWorkers: ownersManagersAndWorkers_Skill_Data,
  },
  description: {
    methodological: "The incentives and decisions of owners, managers, and workers shape a firm's organization and production; competitive market structure is analyzed separately.",
    frontend: {
      en: "Discover how people inside a company make economic decisions.",
    },
  },
});
