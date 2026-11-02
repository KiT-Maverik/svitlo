import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareProbabilitiesOfSimpleEvents_Skill_Data = buildSkillConfig({
  slug: "compareProbabilitiesOfSimpleEvents",
  id: "4916b92e-f8e8-46d6-a83d-dd2b33bc87e7",
  name: {
    en: "Compare Probabilities of Simple Events",
  },
  description: {
    methodological: "Compare two events' likelihoods under consistent assumptions, such as choosing from two sets of equally likely outcomes. A valid comparison needs distribution information, not merely a count of verbally named outcomes.",
    frontend: {
      en: "Compare how likely two outcomes are under the same assumptions.",
    },
  },
});
