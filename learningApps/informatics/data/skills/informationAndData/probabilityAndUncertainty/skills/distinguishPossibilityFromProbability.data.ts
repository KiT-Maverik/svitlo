import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishPossibilityFromProbability_Skill_Data = buildSkillConfig({
  slug: "distinguishPossibilityFromProbability",
  id: "9917649a-c868-41a3-aba2-00d45a3b750f",
  name: {
    en: "Distinguish Possibility from Probability",
  },
  description: {
    methodological: "Separate 'it can happen' from an estimated chance and from a promised result: two options labeled 'yes' and 'no' do not imply 50/50 odds. A first-try success among 100 equally likely hidden cells is possible but not as likely as a miss.",
    frontend: {
      en: "Understand why an event being possible does not make it likely.",
    },
  },
});
