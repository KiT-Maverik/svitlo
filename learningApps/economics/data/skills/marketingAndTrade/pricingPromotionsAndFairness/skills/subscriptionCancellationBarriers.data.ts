import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const subscriptionCancellationBarriers_Skill_Data = buildSkillConfig({
  slug: "subscriptionCancellationBarriers",
  id: "fea8e895-0132-44c7-85d3-da7ab9973180",
  name: {
    en: "Перешкоди скасуванню підписки",
  },
  description: {
    methodological: "Identify burdensome cancellation steps, hidden automatic renewal, and imbalance between ease of signing up and canceling; distinguish these from transparent lawful renewal terms.",
    frontend: {
      en: "Recognize when canceling a subscription is made unnecessarily difficult.",
    },
  },
});
